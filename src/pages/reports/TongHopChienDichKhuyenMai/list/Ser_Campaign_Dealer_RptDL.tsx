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
import { ColumnOptions, ToolbarItemProps } from "@/types";
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
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import Form, { IItemProps } from "devextreme-react/form";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { useSavedState } from "@packages/ui/base-gridview/components/use-saved-state";
import { toast } from "react-toastify";
import { showErrorAtom } from "@packages/store";
import { useSer_Campaign_Dealer_RptColumns } from "../components/useReportColumns";
import { PageHeader } from "../components";
import { RequiredField } from "@packages/common/Validation_Rules";
import { nanoid } from "nanoid";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Ser_Campaign_Dealer_RptParam } from "@/packages/api/clientgate/report/Ser_Campaign_Dealer_RptApi";
import { HeaderFormView } from "../components/header-form-view";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";

export const Ser_Campaign_Dealer_RptDLPage = () => {
  const { t } = useI18n("Ser_Campaign_Dealer_Rpt");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const formRef = useRef<any>(null);
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const { isHQ } = usePermissions();
  const checkBoxRef = useRef<Form>(null);
  const headerFormViewRef = useRef<any>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const permission = usePermissions();
  const currentUrl = window.location.href;
  const infoIndex = currentUrl.indexOf("&");
  const infoValue = currentUrl.substring(infoIndex + 1);

  const searchCondition = useRef<Ser_Campaign_Dealer_RptParam>({
    DealerCode: infoValue === "DL" ? permission.DealerCode : "",
    CamID: "",
    FlagDataWH: 0,
  } as Ser_Campaign_Dealer_RptParam);

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

  const { data: camIDList, isLoading: isGettingcamIDList } = useQuery(
    ["CamID", "withAllOption"],
    async () => {
      const resp = await api.Ser_Campaign_GetAllActive();
      if (resp.DataList) {
        return [...resp.DataList];
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
        readOnly: infoValue === "DL" ? true : false,
      },
    },
    {
      dataField: "CamID",
      visible: true,
      caption: t("CamID"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: (item: any) =>
          item ? `${item.CamID} - ${item.CamName}` : "",
        valueExpr: "CamID",
        dataSource: camIDList ?? [],
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
    const response = await match(infoValue === "HQ")
      .with(true, async () => {
        const response = await api.Ser_Campaign_Dealer_Rpt_ExportSearchHQ({
          DealerCode: searchCondition.current.DealerCode ?? "",
          CamID: searchCondition.current.CamID ?? "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Ser_Campaign_Dealer_RptParam);
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_Campaign_Dealer_Rpt_ExportSearchDL({
          DealerCode: searchCondition.current.DealerCode ?? "",
          CamID: searchCondition.current.CamID ?? "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Ser_Campaign_Dealer_RptParam);
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

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const columns = useSer_Campaign_Dealer_RptColumns({
    data: [],
  });
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Ser_Campaign_Dealer_Rpt-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

  const fetchData = async () => {
    const resp = await match(infoValue === "HQ")
      .with(true, async () => {
        const response = await api.Ser_Campaign_Dealer_Rpt_SearchHQ({
          DealerCode: searchCondition.current.DealerCode ?? "",
          CamID: searchCondition.current.CamID ?? "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Ser_Campaign_Dealer_RptParam);
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_Campaign_Dealer_Rpt_SearchDL({
          CamID: searchCondition.current.CamID ?? "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Ser_Campaign_Dealer_RptParam);
        return response;
      });

    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.Lst_Rpt_Campaign_ForDealerSend?.length ?? 0;

    if (resp?.isSuccess) {
      headerFormViewRef?.current?.setDataForm(resp?.Data);
      return {
        DataList: resp?.Data?.Lst_Rpt_Campaign_ForDealerSend,
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
                storeKey={"Ser_Campaign_Dealer_Rpt_search_DL"}
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
                keyExpr={"plateNo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={"Ser_Campaign_Dealer_Rpt"}
                editMode={false}
                defaultPageSize={9999999}
                isHiddenCheckBox
                isHidenHeaderFilter
                customHeight={windowSize.height - 120}
              >
                <Summary>
                  <TotalItem
                    column={"PartAmount"}
                    summaryType={"sum"}
                    displayFormat={`${t("Sum")} : {0}`}
                  ></TotalItem>
                  <TotalItem
                    column={"ServiceAmount"}
                    summaryType={"sum"}
                    displayFormat={`${t("Sum")} : {0}`}
                  ></TotalItem>
                  <TotalItem
                    column={"SumAmount"}
                    summaryType={"sum"}
                    displayFormat={`${t("Sum")} : {0}`}
                  ></TotalItem>
                </Summary>
              </GridViewOne>
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
