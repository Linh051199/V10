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
  DateBox,
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
import { useRpt_Rpt_SlowRotationPartsColumns } from "../components/useReportColumns";
import { NumberRangeField } from "@/packages/components/number-range-field/number-range-field";
import { validateMajorTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { Rpt_SlowRotationPartsParam } from "@/packages/api/clientgate/report/Rpt_SlowRotationPartsApi";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";

export const Rpt_SlowRotationPartsPage = () => {
  const { t } = useI18n("Rpt_SlowRotationParts");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const { isHQ } = usePermissions();
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const searchCondition = useRef<Rpt_SlowRotationPartsParam>({
    DealerCode: "",
    PartCode: "",
    VieName: "",
    FlagDataWH: 0,
    RotationTimeValueFromTo: [null, null],
    TradingDateFromTo: [validateMajorTimeStartDayOfMonth, new Date()],
  } as Rpt_SlowRotationPartsParam);

  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  // const { data: dealerList, isLoading: isGettingDealerDs } = useQuery(
  //   ["MstDealer", "withAllOption"],
  //   async () => {
  //     const resp = await api.Mst_Dealer_GetAllActive();
  //     if (resp.DataList) {
  //       return [{ DealerCode: "", DealerName: "Tất Cả" }, ...resp.DataList];
  //     }
  //   }
  // );

  const searchFields: IItemProps[] = [
    {
      caption: t("DealerCode"),
      dataField: "DealerCode",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource:
          [
            // ...dealerList,
            { DealerCode: "VS058", DealerName: "Hyundai Bình Dương" },
          ] ?? [],
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
      },
    },
    {
      dataField: "RotationTimeValueFromTo",
      label: {
        text: t("RotationTimeValueFromTo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <NumberRangeField
              widthFrom={"100%"}
              widthTo={"100%"}
              width={270}
              // min={0}
              // max={100}
              className="dateRange"
              dataField={dataField}
              defaultValue={formData?.[dataField]}
              formInstance={formComponent}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },

    {
      caption: "PartCode",
      dataField: "PartCode",
      visible: true,
      editorType: "dxTextBox",
    },

    {
      caption: "VieName",
      dataField: "VieName",
      visible: true,
      editorType: "dxTextBox",
    },
    {
      dataField: "TradingDateFromTo",
      caption: t("TradingDateFromTo"),
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
              defaultStartDate={searchCondition?.current?.TradingDateFromTo[0]}
              defaultEndDate={searchCondition?.current?.TradingDateFromTo[1]}
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
        const response = await api.Rpt_SlowRotationParts_ExportSearchHQ({
          DealerCode: searchCondition.current.DealerCode ?? "",
          PartCode: searchCondition.current.PartCode ?? "",
          VieName: searchCondition.current.VieName ?? "",
          RotationTimeValueFrom:
            searchCondition.current.RotationTimeValueFromTo[0] ?? "",
          RotationTimeValueTo:
            searchCondition.current.RotationTimeValueFromTo[1] ?? "",
          TradingDateFrom: searchCondition.current.TradingDateFromTo[0]
            ? format(searchCondition.current.TradingDateFromTo[0], "yyyy-MM-dd")
            : "",
          TradingDateTo: searchCondition.current.TradingDateFromTo[1]
            ? format(searchCondition.current.TradingDateFromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_SlowRotationPartsParam);
        return response;
      })
      .otherwise(async () => {
        const response = await api.Rpt_SlowRotationParts_ExportSearchDL({
          DealerCode: searchCondition.current.DealerCode ?? "",
          PartCode: searchCondition.current.PartCode ?? "",
          VieName: searchCondition.current.VieName ?? "",
          RotationTimeValueFrom:
            searchCondition.current.RotationTimeValueFromTo[0] ?? "",
          RotationTimeValueTo:
            searchCondition.current.RotationTimeValueFromTo[1] ?? "",
          TradingDateFrom: searchCondition.current.TradingDateFromTo[0]
            ? format(searchCondition.current.TradingDateFromTo[0], "yyyy-MM-dd")
            : "",
          TradingDateTo: searchCondition.current.TradingDateFromTo[1]
            ? format(searchCondition.current.TradingDateFromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_SlowRotationPartsParam);
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
    console.log("data", data);
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

  const columns = useRpt_Rpt_SlowRotationPartsColumns({
    data: [],
  });

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_Rpt_SlowRotationParts-columns",
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
        const response = await api.Rpt_SlowRotationParts_SearchHQ({
          DealerCode: searchCondition.current.DealerCode ?? "",
          PartCode: searchCondition.current.PartCode ?? "",
          VieName: searchCondition.current.VieName ?? "",
          RotationTimeValueFrom:
            searchCondition?.current?.RotationTimeValueFromTo?.from ?? "",
          RotationTimeValueTo:
            searchCondition.current.RotationTimeValueFromTo?.to ?? "",
          TradingDateFrom: searchCondition.current.TradingDateFromTo[0]
            ? format(searchCondition.current.TradingDateFromTo[0], "yyyy-MM-dd")
            : "",
          TradingDateTo: searchCondition.current.TradingDateFromTo[1]
            ? format(searchCondition.current.TradingDateFromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_SlowRotationPartsParam);
        return response;
      })
      .otherwise(async () => {
        const response = await api.Rpt_SlowRotationParts_SearchDL({
          DealerCode: searchCondition.current.DealerCode ?? "",
          PartCode: searchCondition.current.PartCode ?? "",
          VieName: searchCondition.current.VieName ?? "",
          RotationTimeValueFrom:
            searchCondition?.current?.RotationTimeValueFromTo?.from ?? "",
          RotationTimeValueTo:
            searchCondition.current.RotationTimeValueFromTo?.to ?? "",
          TradingDateFrom: searchCondition.current.TradingDateFromTo[0]
            ? format(searchCondition.current.TradingDateFromTo[0], "yyyy-MM-dd")
            : "",
          TradingDateTo: searchCondition.current.TradingDateFromTo[1]
            ? format(searchCondition.current.TradingDateFromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_SlowRotationPartsParam);
        return response;
      });

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Rpt_SlowRotationParts,
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
                storeKey={"Rpt_SlowRotationParts-search"}
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
              <GridViewOne
                ref={gridRef}
                // allowColumnResizing={true}
                // columnResizingMode={"widget"}
                // modeSelection="none"
                toolbarItems={[]}
                dataSource={[]} // cars
                columns={columns}
                fetchData={fetchData}
                keyExpr={"PartCode"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={"Rpt_SlowRotationParts"}
                editMode={false}
                defaultPageSize={9999999}
                isHiddenCheckBox
                isHidenHeaderFilter
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
