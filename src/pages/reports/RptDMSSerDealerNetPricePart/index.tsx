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

export const RptDMSSerDealerNetPricePart = () => {
  const { t } = useI18n("RptDMSSerDealerNetPricePart");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const { isHQ, DealerCode } = usePermissions();

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
    const resp = await api.RptDMSSerDealerNetPricePart_Search({
      FromDate: searchCondition.current.TDate_FromFromTo[0]
        ? format(
            searchCondition.current.TDate_FromFromTo[0] as Date,
            "yyyy-MM-dd"
          )
        : "",
      ToDate: searchCondition.current.TDate_FromFromTo[1]
        ? format(
            searchCondition.current.TDate_FromFromTo[1] as Date,
            "yyyy-MM-dd"
          )
        : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "",
    });
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    // const length = resp?.Data?.Lst_DMSClaimByClaimType?.length ?? 0;

    console.log(
      "resp ",
      resp._objResult.Data.lst_Rpt_DMSSer_DealerNetPrice_Part
    );

    if (resp?.isSuccess) {
      // setFormData({
      //   TotalSell: resp?.Data?.TotalSell,
      //   SLKNXeMoi: resp?.Data?.SLKNXeMoi,
      //   TiLe: resp?.Data?.TiLe,
      //   SLKNChatLuong: resp?.Data?.SLKNChatLuong,
      // });
      // return {
      //   DataList: [],
      //   PageCount: length / pageSize,
      //   ItemCount: length,
      //   PageSize: 99999,
      // };
      return {
        DataList:
          resp?._objResult?.Data?.lst_Rpt_DMSSer_DealerNetPrice_Part ?? [],
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
        ? format(
            searchCondition.current.TDate_FromFromTo[0] as Date,
            "yyyy-MM-dd"
          )
        : "",
      TDate_To: searchCondition.current.TDate_FromFromTo[1]
        ? format(
            searchCondition.current.TDate_FromFromTo[1] as Date,
            "yyyy-MM-dd"
          )
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
  const onSign = async () => {};
  const handleExport = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      const resp = await api.RptDMSSerRptDMSClaim_ExportSearchHQ({
        TDate_From: searchCondition.current.TDate_FromFromTo[0]
          ? format(
              searchCondition.current.TDate_FromFromTo[0] as Date,
              "yyyy-MM-dd"
            )
          : "",
        TDate_To: searchCondition.current.TDate_FromFromTo[1]
          ? format(
              searchCondition.current.TDate_FromFromTo[1] as Date,
              "yyyy-MM-dd"
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
    } else {
      toast.warning("PleaseSearchBeforeExportExcel");
    }
  };

  //====================================handle-end========================================

  //====================================searchField========================================
  const searchFields: IItemProps[] = [
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
            // displayFormat="yyyy-MM"
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
        <PageHeader onSign={onSign}></PageHeader>
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
