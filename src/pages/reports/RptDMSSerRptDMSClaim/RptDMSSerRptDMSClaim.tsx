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
import { DateRangeBox, Form } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useCallback, useReducer, useRef, useState } from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useColumns } from "./components/columns";
import { PageHeader } from "./components/page-header";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { Search_RptDMSSerRptDMSClaim_Params } from "@/packages/types/report/RptDMSSerRptDMSClaim";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { nanoid } from "nanoid";
import {
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { usePermissions } from "@/packages/contexts/permission";
import { HeaderForm } from "./components/header-form";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const RptDMSSerRptDMSClaimPage = () => {
  const { t } = useI18n("RptDMSSerRptDMSClaim");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const { isHQ, DealerCode } = usePermissions();
  const setLoad = useSetAtom(loadPanelAtom);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();
  const gridRef: any = useRef();
  const searchCondition = useRef<Partial<Search_RptDMSSerRptDMSClaim_Params>>({
    TDate_FromFromTo: [validateTimeStartDayOfMonth, new Date()],
    DealerCode: [],
    FlagDataWH: false,
  });

  const [formData, setFormData] = useState({
    TotalSell: "0",
    SLKNXeMoi: "0",
    TiLe: "0",
    SLKNChatLuong: "0",
  });
  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.RptDMSSerRptDMSClaim_SearchHQ({
      TDate_From: searchCondition.current.TDate_FromFromTo[0]
        ? format(searchCondition.current.TDate_FromFromTo[0] as Date, "yyyy-MM")
        : "",
      TDate_To: searchCondition.current.TDate_FromFromTo[1]
        ? format(searchCondition.current.TDate_FromFromTo[1] as Date, "yyyy-MM")
        : "",

      DealerCode: searchCondition.current.DealerCode ?? [],
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.Lst_DMSClaimByClaimType?.length ?? 0;

    if (resp?.isSuccess) {
      setFormData({
        TotalSell: resp?.Data?.TotalSell,
        SLKNXeMoi: resp?.Data?.SLKNXeMoi,
        TiLe: resp?.Data?.TiLe,
        SLKNChatLuong: resp?.Data?.SLKNChatLuong,
      });
      return {
        DataList: resp?.Data?.Lst_DMSClaimByClaimType,
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
    ["Dealer_GetAllActive-RptDMSSerRptDMSClaim"],
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
      TDate_From: searchCondition.current.TDate_FromFromTo[0]
        ? format(searchCondition.current.TDate_FromFromTo[0] as Date, "yyyy-MM")
        : "",
      TDate_To: searchCondition.current.TDate_FromFromTo[1]
        ? format(searchCondition.current.TDate_FromFromTo[1] as Date, "yyyy-MM")
        : "",
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
  const handleExportDetail = async () => {};
  const handleExport = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      setLoad(true);
      const resp = await api.RptDMSSerRptDMSClaim_ExportSearchHQ({
        TDate_From: searchCondition.current.TDate_FromFromTo[0]
          ? format(
              searchCondition.current.TDate_FromFromTo[0] as Date,
              "yyyy-MM"
            )
          : "",
        TDate_To: searchCondition.current.TDate_FromFromTo[1]
          ? format(
              searchCondition.current.TDate_FromFromTo[1] as Date,
              "yyyy-MM"
            )
          : "",

        DealerCode: searchCondition.current.DealerCode ?? [],
        FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
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
      setLoad(false);
    } else {
      toast.warning("PleaseSearchBeforeExportExcel");
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
    // {
    //   dataField: "TDate_FromFromTo",
    //   caption: t("TDate_FromFromTo"),
    //   visible: true,
    //   render: (param: any) => {
    //     const { dataField, component: formComponent } = param;
    //     return (
    //       <div className={"flex flex-row"}>
    //         <DateRangeBox
    //           width={"100%"}
    //           className="dateRange "
    //           displayFormat=" yyyy-MM-dd"
    //           showClearButton={true}
    //           defaultStartDate={searchCondition?.current.TDate_FromFromTo[0]}
    //           defaultEndDate={searchCondition?.current.TDate_FromFromTo[1]}
    //           useMaskBehavior={true}
    //           openOnFieldClick={true}
    //           labelMode="hidden"
    //           onValueChanged={(e: any) => {
    //             formComponent.updateData(dataField, e.value);
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      dataField: "TDate_FromFromTo",
      label: {
        text: t("TDate_FromFromTo"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <DateRangeBox
            width={"100%"}
            className="dateRange"
            displayFormat="yyyy-MM"
            showClearButton={true}
            defaultStartDate={formData[dataField][0]}
            defaultEndDate={formData[dataField][1]}
            calendarOptions={{
              maxZoomLevel: "year",
            }}
            useMaskBehavior={true}
            openOnFieldClick={true}
            labelMode="hidden"
            onValueChanged={(e: any) => {
              formComponent.updateData(dataField, e.value);
            }}
          />
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

  const columns = useColumns();

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
                storeKey={"RptDMSSerRptDMSClaim-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <HeaderForm formData={formData} />
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]}
              columns={columns}
              fetchData={fetchData}
              keyExpr={"ORDERPLANNO"}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              isHidenHeaderFilter
              customToolbarItems={[]}
              storeKey={"RptDMSSerRptDMSClaim-columns"}
              editMode={false}
              customHeight={windowSize.height - 110}
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
