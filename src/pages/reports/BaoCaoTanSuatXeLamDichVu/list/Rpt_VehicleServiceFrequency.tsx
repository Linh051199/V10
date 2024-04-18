import { AdminContentLayout } from "@layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { useI18n } from "@/i18n/useI18n";
import { ReportPageHeader } from "@packages/ui/report-page-header";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import { SearchPanelV2 } from "@packages/ui/search-panel";
import { useSetAtom } from "jotai";
import { useFlagOptions, useVisibilityControl } from "@packages/hooks";
import { Alignment, ColumnOptions, ToolbarItemProps } from "@/types";
import { useClientgateApi } from "@packages/api";
import { useQuery } from "@tanstack/react-query";
import { format, set } from "date-fns";
import {
  Button,
  DataGrid,
  DateRangeBox,
  LoadPanel,
  ScrollView,
} from "devextreme-react";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  HeaderFilter,
  Item as ToolbarItem,
  Pager,
  Paging,
  Scrolling,
  Toolbar,
} from "devextreme-react/data-grid";
import Form, { IItemProps } from "devextreme-react/form";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { useSavedState } from "@packages/ui/base-gridview/components/use-saved-state";
import { toast } from "react-toastify";
import { showErrorAtom } from "@packages/store";
import { PageHeader } from "../components";
import { RequiredField } from "@packages/common/Validation_Rules";
import { nanoid } from "nanoid";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { HeaderFormView } from "../components/header-form-view";
import { validateMajorTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { useRpt_VehicleServiceFrequencyColumns } from "../components/useReportColumns";
import { Rpt_VehicleServiceFrequencyParam } from "@/packages/api/clientgate/report/Rpt_VehicleServiceFrequencyApi";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";

export const Rpt_VehicleServiceFrequencyPage = () => {
  const { t } = useI18n("Rpt_VehicleServiceFrequency");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const gridDetailRef = useRef<any>(null);
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { isHQ } = usePermissions();
  const permission = usePermissions();

  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  var listValueDetail: any = [];
  const searchCondition = useRef<Rpt_VehicleServiceFrequencyParam>({
    FlagDataWH: 0,
    DealerCode: isHQ() ? "" : permission.DealerCode,
    DateFromTo: [validateMajorTimeStartDayOfMonth, new Date()],
  } as Rpt_VehicleServiceFrequencyParam);

  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const headerFormViewRef = useRef<any>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const { data: dealerList, isLoading: isGettingDealerDs } = useQuery(
    ["MstDealer", "withAllOption"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList) {
        return [{ DealerCode: "", DealerName: "Tất Cả" }, ...resp.DataList];
      }
    }
  );

  const searchFields: IItemProps[] = [
    {
      caption: t("DealerCode"),
      dataField: "DealerCode",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: dealerList ?? [],
        displayExpr: (item: any) =>
          item ? `${item.DealerCode} - ${item.DealerName}` : "",
        valueExpr: "DealerCode",
        readOnly: isHQ() ? false : true,
      },
    },
    {
      dataField: "DateFromTo",
      caption: t("DateFromTo"),
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              width={"100%"}
              className="dateRange "
              displayFormat=" yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={searchCondition?.current?.DateFromTo[0]}
              defaultEndDate={searchCondition?.current?.DateFromTo[1]}
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },

    {
      dataField: "FlagDataWH",
      caption: t("FlagDataWH"),
      visible: true,
      label: {
        visible: false,
        text: t("FlagDataWH"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              checkBoxRef={checkBoxRef}
              label={t("FlagDataWH")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const savedState = loadState() === undefined ? columns : loadState();

    // const savedState = loadState()?.filter((item) => {
    //   return item.dataField;
    // });
    if (savedState) {
      const columnOrders = savedState.map(
        (column: ColumnOptions) => column.dataField
      );
      const outputColumns = columns.map((column: ColumnOptions) => {
        const filterResult = savedState.find(
          (c: ColumnOptions) => c.dataField === column.dataField
        );
        return {
          ...column,
          visible: filterResult ? filterResult.visible ?? true : false,
        };
      });
      outputColumns.sort(
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setColumnsState(outputColumns);
    }
  }, []);

  const handleExport = async () => {
    const response = await match(isHQ())
      .with(true, async () => {
        const response = await api.Rpt_VehicleServiceFrequency_ExportSearchHQ({
          DealerCode: searchCondition.current.DealerCode ?? "",
          FromDate: searchCondition.current.DateFromTo[0]
            ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
            : "",
          ToDate: searchCondition.current.DateFromTo[1]
            ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_VehicleServiceFrequencyParam);
        return response;
      })
      .otherwise(async () => {
        const response = await api.Rpt_VehicleServiceFrequency_ExportSearchDL({
          DealerCode: searchCondition.current.DealerCode ?? "",
          FromDate: searchCondition.current.DateFromTo[0]
            ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
            : "",
          ToDate: searchCondition.current.DateFromTo[1]
            ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_VehicleServiceFrequencyParam);
        return response;
      });

    if (response.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = response.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
      showError({
        message: t(response._strErrCode),
        _strErrCode: response._strErrCode,
        _strTId: response._strTId,
        _strAppTId: response._strAppTId,
        _objTTime: response._objTTime,
        _strType: response._strType,
        _dicDebug: response._dicDebug,
        _dicExcs: response._dicExcs,
      });
    }
  };

  const handleSearch = async (data: any) => {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      searchCondition.current = {
        ...data,
      };
      gridRef?.current?.refetchData();
    }
  };

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const handleShowDetail = (e: any) => {};

  const columns = useRpt_VehicleServiceFrequencyColumns({
    data: [],
    handleShowDetail: handleShowDetail,
  });

  const columnsDetail: ColumnOptions[] = [
    {
      dataField: "MyIdxSeq",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "RONo",
      caption: t("RONo"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CusName",
      caption: t("CusName"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "FrameNo",
      caption: t("FrameNo"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "ModelName",
      caption: t("ModelName"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "Km",
      caption: t("Km"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CVDV",
      caption: t("CVDV"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CheckInDate",
      caption: t("CheckInDate"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "ActualDeliveryDate",
      caption: t("ActualDeliveryDate"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CusRequest",
      caption: t("CusRequest"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
  ];

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_VehicleServiceFrequency-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Rpt_VehicleServiceFrequency_SearchHQ({
          DealerCode: searchCondition.current.DealerCode ?? "",
          FromDate: searchCondition.current.DateFromTo[0]
            ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
            : "",
          ToDate: searchCondition.current.DateFromTo[1]
            ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_VehicleServiceFrequencyParam);
        return response;
      })
      .otherwise(async () => {
        const response = await api.Rpt_VehicleServiceFrequency_SearchDL({
          DealerCode: searchCondition.current.DealerCode ?? "",
          FromDate: searchCondition.current.DateFromTo[0]
            ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
            : "",
          ToDate: searchCondition.current.DateFromTo[1]
            ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_VehicleServiceFrequencyParam);
        return response;
      });

    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.Lst_Rpt_Vehicle_Service_Frequency?.length ?? 0;

    if (resp?.isSuccess) {
      headerFormViewRef?.current?.setDataForm(resp?.Data);
      listValueDetail = resp?.Data?.Lst_Rpt_Vehicle_Service_FrequencyDtl;

      return {
        DataList: resp?.Data?.Lst_Rpt_Vehicle_Service_Frequency,
        PageCount: length / pageSize,
        ItemCount: length,
        PageSize: 99999,
      };
    } else {
      showError({
        message: t(resp._strErrCode),
        _strErrCode: resp._strErrCode,
        _strTId: resp._strTId,
        _strAppTId: resp._strAppTId,
        _objTTime: resp._objTTime,
        _strType: resp._strType,
        _dicDebug: resp._dicDebug,
        _dicExcs: resp._dicExcs,
      });

      return {
        DataList: [],
        PageCount: 0,
        ItemCount: 0,
        PageSize: 99999,
      };
    }
  };

  const handleRowClick = (e: any) => {
    const listFilter = listValueDetail.filter(
      (item: any) => item.PlateNo === e?.data?.PlateNo
    );
    gridDetailRef?.current?.setData(listFilter);
  };

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onExportExcel={handleExport}
          toggleSearchPanel={handleToggleSearchPanel}
        ></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px]"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition.current}
                onSearch={handleSearch}
                storeKey={"Rpt_VehicleServiceFrequency-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isGetingData}
            />

            <ScrollView height={windowSize.height - 120}>
              <HeaderFormView gridRef={gridRef} ref={headerFormViewRef} />
              <GridViewOne
                ref={gridRef}
                toolbarItems={[]}
                dataSource={[]} // cars
                columns={columns}
                fetchData={fetchData}
                keyExpr={"PlateNo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={"Rpt_VehicleServiceFrequency"}
                editMode={false}
                defaultPageSize={9999999}
                isHiddenCheckBox
                isHidenHeaderFilter={true}
                onRowClick={handleRowClick}
              />
              <GridViewOne
                ref={gridDetailRef}
                toolbarItems={[]}
                dataSource={[]} // cars
                columns={columnsDetail}
                fetchData={() => {}}
                keyExpr={"PlateNo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={"Rpt_VehicleServiceFrequency-Detail"}
                editMode={false}
                defaultPageSize={9999999}
                isHiddenCheckBox
                isHidenHeaderFilter={true}

                // allowInlineEdit
                // inlineEditMode="row"
              />
            </ScrollView>

            <GetDataWH
              onSearch={handleSearchWH}
              formRef={formRef}
              checkBoxRef={checkBoxRef}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
