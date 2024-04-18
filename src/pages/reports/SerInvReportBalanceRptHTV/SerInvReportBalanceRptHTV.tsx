import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { DateRangeBox, Form } from "devextreme-react";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useReducer, useRef } from "react";
import { toast } from "react-toastify";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useColumns } from "./components/columns";
import { PageHeader } from "./components/page-header";
import { Search_SerInvReportBalanceRpt_Params } from "@/packages/types/report/SerInvReportBalanceRpt";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import usePrint from "@/components/print/usePrint";

export const SerInvReportBalanceRptHTVPage = () => {
  const { t } = useI18n("SerInvReportBalanceRptHTV");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { quickPrint, previewPrint } = usePrint();

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const gridRef: any = useRef();
  const searchCondition = useRef<Partial<Search_SerInvReportBalanceRpt_Params>>(
    {
      TypeReport: "1",
      PartCode: "",
      ToDate: new Date(),
      DealerCode: "",
      FlagDataWH: false,
    }
  );
  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.SerInvReportBalanceRpt_SearchHQ({
      ToDate: searchCondition.current.ToDate
        ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
      DealerCode: searchCondition.current.DealerCode ?? "",
      TypeReport: searchCondition.current.TypeReport ?? "1",
      PartCode: searchCondition.current.PartCode ?? "",
    });
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.lst_Ser_InvReportBalanceRpt?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Ser_InvReportBalanceRpt,
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
    };
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      gridRef?.current?.refetchData();
    }
  };

  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
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
    const resp = await api.SerInvReportBalanceRpt_ExportSearchHQ({
      ToDate: searchCondition.current.ToDate
        ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
      DealerCode: searchCondition.current.DealerCode ?? "",
      TypeReport: searchCondition.current.TypeReport ?? "1",
      PartCode: searchCondition.current.PartCode ?? "",
    });

    if (resp?.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = resp.Data as any;
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
  };
  const handlePrint = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      const response = await api.SerInvReportBalanceRpt_PrintHQ({
        ToDate: searchCondition.current.ToDate
          ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
          : "",
        FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
        DealerCode: searchCondition.current.DealerCode ?? "",
        TypeReport: searchCondition.current.TypeReport ?? "1",
        PartCode: searchCondition.current.PartCode ?? "",
      });

      if (response.isSuccess && response.Data) {
        toast.success(t("Download successfully!"));
        quickPrint({
          url: response.Data!,
        });
      } else {
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
    } else {
      toast.warning("PleaseSearchBeforeExportExcel");
    }
  };
  //====================================handle-end========================================

  //====================================searchField========================================
  const searchFields: IItemProps[] = [
    {
      dataField: "TypeReport",
      visible: true,
      caption: t("TypeReport"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "1",
            text: t("Tồn kho theo mã phụ tùng và vị trí"),
          },
          {
            value: "2",
            text: t("Tồn kho theo mã phụ tùng"),
          },
        ],
      },
    },
    {
      dataField: "DealerCode",
      visible: true,
      caption: t("DealerCode"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
        items: Dealer_GetAllActive,
        validationRules: [RequiredField("IsRequired")],
        validationMessageMode: "always",
        validationGroup: "form",
      },
      validationRules: [requiredType],
    },
    {
      dataField: "PartCode",
      visible: true,
      caption: t("PartCode"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "ToDate",
      caption: t("ToDate"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
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

  const columns = useColumns();

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onPrint={handlePrint}
          onExportExcel={handleExport}
          toggleSearchPanel={handleToggleSearchPanel}
        ></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchPanelV2
                ref={formRef.current}
                conditionFields={searchFields}
                data={searchCondition.current}
                onSearch={handleSearch}
                storeKey={"SerInvReportBalanceRptHTV-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]}
              columns={columns}
              fetchData={fetchData}
              keyExpr={"PartCode"}
              autoFetchData={false}
              allowSelection={false}
              isHidenHeaderFilter
              isLoading={false}
              customToolbarItems={[]}
              storeKey={"SerInvReportBalanceRptHTV-columns"}
              customHeight={windowSize.height - 110}
              editMode={false}
              defaultPageSize={9999999}
              isHiddenCheckBox
            />
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
