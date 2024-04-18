import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  validateMajorTimeStartDayOfMonth,
  validateTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { DateRangeBox, Form, ScrollView } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useColumns } from "./components/columns";
import { PageHeader } from "./components/page-header";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import {
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Rpt_VehicleServiceFrequencyParam } from "@/packages/api/clientgate/report/Rpt_VehicleServiceFrequencyApi";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { Alignment, ColumnOptions } from "@/types";
import { useRpt_VehicleServiceFrequencyColumns } from "../BaoCaoTanSuatXeLamDichVu/components/useReportColumns";
import { HeaderFormView } from "./components/header-form-view";

export const RptVehicleServiceFrequencyHTVPage = () => {
  const { t } = useI18n("RptVehicleServiceFrequencyHTV");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();
  const headerFormViewRef = useRef<any>(null);
  const gridRef1: any = useRef();
  const gridRef2: any = useRef();
  const searchCondition = useRef<Rpt_VehicleServiceFrequencyParam>({
    FlagDataWH: 0,
    DealerCode: [],
    DateFromTo: [validateMajorTimeStartDayOfMonth, new Date()],
  } as Rpt_VehicleServiceFrequencyParam);

  const columns = useRpt_VehicleServiceFrequencyColumns({
    data: [],
  });
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "RptVehicleServiceFrequencyHTV-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

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
  //====================================CallAPI========================================
  const fetchDataTable1 = async () => {
    const resp = await api.Rpt_VehicleServiceFrequency_SearchHQ({
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
      DealerCode: searchCondition.current.DealerCode.join(",") ?? "",
    } as Rpt_VehicleServiceFrequencyParam);
    const pageSize = gridRef1?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.Lst_Rpt_Vehicle_Service_Frequency?.length ?? 0;

    if (resp?.isSuccess) {
      headerFormViewRef?.current?.setDataForm(resp?.Data);
      return {
        DataList: resp?.Data?.Lst_Rpt_Vehicle_Service_Frequency,
        PageCount: length / pageSize,
        ItemCount: length,
        PageSize: 99999,
      };
    } else {
      showError({
        message: t(resp!._strErrCode),
        _strErrCode: resp!._strErrCode,
        _strTId: resp!._strTId,
        _strAppTId: resp!._strAppTId,
        _objTTime: resp!._objTTime,
        _strType: resp!._strType,
        _dicDebug: resp!._dicDebug,
        _dicExcs: resp!._dicExcs,
      });
    }

    return {
      DataList: [],
      PageCount: 0,
      ItemCount: 0,
      PageSize: 99999,
    };
  };
  const fetchDataTable2 = async () => {
    const resp = await api.Rpt_VehicleServiceFrequency_SearchHQ({
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
      DealerCode: searchCondition.current.DealerCode.join(",") ?? "",
    } as Rpt_VehicleServiceFrequencyParam);
    const pageSize = gridRef2?.current?.getDxInstance()?.pageSize();

    const length =
      resp?.Data?.Lst_Rpt_Vehicle_Service_FrequencyDtl?.length ?? 0;

    if (resp?.isSuccess) {
      headerFormViewRef?.current?.setDataForm(resp?.Data);
      return {
        DataList: resp?.Data?.Lst_Rpt_Vehicle_Service_FrequencyDtl,
        PageCount: length / pageSize,
        ItemCount: length,
        PageSize: 99999,
      };
    } else {
      showError({
        message: t(resp!._strErrCode),
        _strErrCode: resp!._strErrCode,
        _strTId: resp!._strTId,
        _strAppTId: resp!._strAppTId,
        _objTTime: resp!._objTTime,
        _strType: resp!._strType,
        _dicDebug: resp!._dicDebug,
        _dicExcs: resp!._dicExcs,
      });
    }

    return {
      DataList: [],
      PageCount: 0,
      ItemCount: 0,
      PageSize: 99999,
    };
  };

  const { data: Dealer_GetAllActive, isLoading } = useQuery(
    ["Dealer_GetAllActive-SerInvReportTotalStockOutDetailRptHTV"],
    async () => {
      const resp = await api.Dealer_GetAllActive();
      if (resp.DataList) {
        return resp.DataList;
      }
    }
  );
  //====================================CallAPI-end========================================

  //====================================handle========================================

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...data,
      FromDate: data.DateFromTo[0] ? data.DateFromTo[0] : "",
      ToDate: data.DateFromTo[1] ? data.DateFromTo[1] : "",
    };
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      gridRef1?.current?.refetchData();
      gridRef2?.current?.refetchData();
    }
  };
  const handleSearchWH = () => {
    gridRef1?.current?.refetchData();
    gridRef2?.current?.refetchData();
  };
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };
  const handleExportDetail = async () => {
    // const crData = gridRef?.current?.getData();
    // if (crData && crData?.length > 0) {
    //   const response = await api.Rpt_OrdOrderPlanHTMV_ExprortDetailHQ({
    //     CreatedDateFrom: searchCondition.current.CreatedDateFromTo[0]
    //       ? format(
    //           searchCondition.current.CreatedDateFromTo[0] as Date,
    //           "yyyy-MM-dd"
    //         )
    //       : "",
    //     CreatedDateTo: searchCondition.current.CreatedDateFromTo[1]
    //       ? format(
    //           searchCondition.current.CreatedDateFromTo[1] as Date,
    //           "yyyy-MM-dd"
    //         )
    //       : "",
    //     ReportType: searchCondition.current.ReportType ?? "",
    //     Code: searchCondition.current.Code ?? "",
    //   } as Rpt_OrdOrderPlanHTMVParam);
    //   if (response.isSuccess && response.Data) {
    //     toast.success(t("Download successfully!"));
    //     window.location.href = response.Data;
    //   } else {
    //     toast.error(t("DownloadUnsuccessfully"));
    //     showError({
    //       message: t(response._strErrCode),
    //       _strErrCode: response._strErrCode,
    //       _strTId: response._strTId,
    //       _strAppTId: response._strAppTId,
    //       _objTTime: response._objTTime,
    //       _strType: response._strType,
    //       _dicDebug: response._dicDebug,
    //       _dicExcs: response._dicExcs,
    //     });
    //   }
    // } else {
    //   toast.warning("PleaseSearchBeforeExportExcel");
    // }
    toast.warning("Chưa có api nhé!");
  };
  const handleExport = async () => {
    const response = await api.Rpt_VehicleServiceFrequency_ExportSearchHQ({
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      DealerCode: searchCondition.current.DealerCode.join(",") ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    } as Rpt_VehicleServiceFrequencyParam);
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
  //====================================handle-end========================================

  //====================================searchField========================================
  const searchFields: IItemProps[] = [
    {
      dataField: "DealerCode",
      visible: true,
      caption: t("DealerCode"),
      editorType: "dxTagBox",
      editorOptions: {
        multiline: true,
        hideSelectedItems: true,
        showSelectionControls: true,
        applyValueMode: "useButtons",
        searchEnabled: true,
        height: "auto", // để height auto thì đỡ bị vỡ giao diện
        dataSource: Dealer_GetAllActive ?? [],
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
        validationRules: [RequiredField("IsRequired")],
        validationMessageMode: "always",
        validationGroup: "form",
      },
      validationRules: [requiredType],
    },
    {
      dataField: "DateFromTo",
      caption: t("DateFromTo"),
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              width={"100%"}
              className="dateRange "
              displayFormat=" yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={searchCondition?.current.DateFromTo[0]}
              defaultEndDate={searchCondition?.current.DateFromTo[1]}
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

  //====================================searchField-end========================================

  const columnsDetail: ColumnOptions[] = [
    {
      caption: t("STT"),
      dataField: "STT",
      cellRender: ({ rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
      },
      visible: true,
      alignment: "center",
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      visible: true,
    },
    {
      dataField: "FrameNo",
      caption: t("FrameNo"),
      visible: true,
    },
    {
      dataField: "CusName",
      caption: t("CusName"),
      visible: true,
    },
    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      visible: true,
    },
    {
      dataField: "VIN",
      caption: t("VIN"),
      visible: true,
    },
    {
      dataField: "ModelName",
      caption: t("ModelName"),
      visible: true,
    },
    {
      dataField: "Km",
      caption: t("Km"),
      visible: true,
    },
    {
      dataField: "Creator",
      caption: t("Creator"),
      visible: true,
    },
    {
      dataField: "CheckInDate",
      caption: t("CheckInDate"),
      visible: true,
    },
    {
      dataField: "ActualDeliveryDate",
      caption: t("ActualDeliveryDate"),
      visible: true,
    },
    {
      dataField: "CusRequest",
      caption: t("CusRequest"),
      visible: true,
    },
  ];
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onExportExcelDetail={handleExportDetail}
          onExportExcel={handleExport}
          toggleSearchPanel={handleToggleSearchPanel}
        ></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition.current}
                onSearch={handleSearch}
                storeKey={"RptVehicleServiceFrequencyHTV-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <ScrollView height={windowSize.height - 120}>
              <HeaderFormView ref={headerFormViewRef} />
              <GridViewOne
                ref={gridRef1}
                toolbarItems={[]}
                dataSource={[]}
                columns={columns}
                fetchData={fetchDataTable1}
                keyExpr={"FrameNo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                isHidenHeaderFilter
                customToolbarItems={[]}
                storeKey={"RptVehicleServiceFrequencyHTV-columns"}
                editMode={false}
                customHeight={windowSize.height - 500}
                defaultPageSize={9999999}
                isHiddenCheckBox
              />
              <GridViewOne
                ref={gridRef2}
                toolbarItems={[]}
                dataSource={[]} // cars
                columns={columnsDetail}
                fetchData={fetchDataTable2}
                keyExpr={"BienSo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={"RptVehicleServiceFrequencyHTV-Detail"}
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
