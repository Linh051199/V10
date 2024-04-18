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
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useColumns } from "./components/columns";
import { PageHeader } from "./components/page-header";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { Search_RptSerCamMarketingHTCSummary_Params } from "@/packages/types/report/RptSerCamMarketingHTCSummary";
import {
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { useQuery } from "@tanstack/react-query";
import { SearchForm } from "./components/search-form";
import { format } from "date-fns";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { usePermissions } from "@/packages/contexts/permission";

export const RptSerCamMarketingHTCSummaryPage = () => {
  const { t } = useI18n("RptSerCamMarketingHTCSummary");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const setLoad = useSetAtom(loadPanelAtom);
  const { isHQ, DealerCode } = usePermissions();

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const gridRef: any = useRef();
  const searchCondition = useRef<
    Partial<Search_RptSerCamMarketingHTCSummary_Params>
  >({
    CheckInDateFromTo: [validateTimeStartDayOfMonth, new Date()],
    DealerCode: DealerCode,
    CamMarketingNo: "",
    FlagDataWH: false,
  });

  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.RptSerCamMarketingHTCSummary_SearchHQ({
      DealerCode: searchCondition?.current?.DealerCode ?? "",
      CheckInDateFrom: searchCondition.current.CheckInDateFromTo[0]
        ? format(
          searchCondition.current.CheckInDateFromTo[0] as Date,
          "yyyy-MM-dd"
        )
        : "",
      CheckInDateTo: searchCondition.current.CheckInDateFromTo[1]
        ? format(
          searchCondition.current.CheckInDateFromTo[1] as Date,
          "yyyy-MM-dd"
        )
        : "",
      CamMarketingNo: searchCondition.current.CamMarketingNo ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });

    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.lst_Rpt_SerCamMarketingHTC_Summary?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Rpt_SerCamMarketingHTC_Summary,
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

  //====================================CallAPI-end========================================

  //====================================handle========================================

  // const handleSearch = async (data: any) => {
  //   searchCondition.current = {
  //     ...data,
  //     CreatedDateFrom: data.CheckInDateFromTo[0]
  //       ? data.CheckInDateFromTo[0]
  //       : "",
  //     CreatedDateTo: data.CheckInDateFromTo[1] ? data.CheckInDateFromTo[1] : "",
  //   };
  //   gridRef?.current?.refetchData();
  // };

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };
  const handleExportDetail = async () => { };
  const handleExport = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      const resp = await api.RptSerCamMarketingHTCSummary_ExportSearchHQ({
        DealerCode: searchCondition?.current?.DealerCode ?? "",
        CheckInDateFrom: searchCondition.current.CheckInDateFromTo[0]
          ? format(
              searchCondition.current.CheckInDateFromTo[0] as Date,
              "yyyy-MM-dd"
            )
          : "",
        CheckInDateTo: searchCondition.current.CheckInDateFromTo[1]
          ? format(
              searchCondition.current.CheckInDateFromTo[1] as Date,
              "yyyy-MM-dd"
            )
          : "",
        CamMarketingNo: searchCondition.current.CamMarketingNo ?? "",
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
  const handleSearch = (condition: Partial<any>) => {
    searchCondition.current = {
      ...condition,
      CheckInDateFrom: condition.CheckInDateFromTo[0]
        ? condition.CheckInDateFromTo[0]
        : "",
      CheckInDateTo: condition.CheckInDateFromTo[1]
        ? condition.CheckInDateFromTo[1]
        : "",
    };
    gridRef?.current?.refetchData();
  };

  //====================================handle-end========================================

  //====================================searchField========================================
  // const searchFields: IItemProps[] = [
  //   {
  //     dataField: "DealerCode",
  //     visible: true,
  //     caption: t("DealerCode"),
  //     editorType: "dxSelectBox",
  //     editorOptions: {
  //       displayExpr: "DealerName",
  //       valueExpr: "DealerCode",
  //       items: Dealer_GetAllActive,
  //       validationRules: [RequiredField("IsRequired")],
  //       validationMessageMode: "always",
  //       validationGroup: "form",
  //     },
  //     validationRules: [requiredType],
  //   },
  //   {
  //     dataField: "CamMarketingNo",
  //     visible: true,
  //     caption: t("CamMarketingNo"),
  //     editorType: "dxSelectBox",
  //     editorOptions: {
  //       displayExpr: "DealerName",
  //       valueExpr: "DealerCode",
  //       items: Dealer_GetAllActive,
  //       validationRules: [RequiredField("IsRequired")],
  //       validationMessageMode: "always",
  //       validationGroup: "form",
  //     },
  //     validationRules: [requiredType],
  //   },
  //   // {
  //   //   dataField: "CamMarketingNo",
  //   //   visible: true,
  //   //   caption: t("CamMarketingNo"),
  //   //   editorType: "dxSelectBox",
  //   //   editorOptions: {
  //   //     displayExpr: "text",
  //   //     valueExpr: "value",
  //   //     items: [
  //   //       {
  //   //         value: "",
  //   //         text: "Tất cả",
  //   //       },
  //   //     ],
  //   //   },
  //   // },
  //   {
  //     dataField: "CheckInDateFromTo",
  //     caption: t("CheckInDateFromTo"),
  //     visible: true,
  //     render: (param: any) => {
  //       const { dataField, component: formComponent } = param;
  //       return (
  //         <div className={"flex flex-row"}>
  //           <DateRangeBox
  //             width={"100%"}
  //             className="dateRange "
  //             displayFormat=" yyyy-MM-dd"
  //             showClearButton={true}
  //             defaultStartDate={searchCondition?.current.CheckInDateFromTo[0]}
  //             defaultEndDate={searchCondition?.current.CheckInDateFromTo[1]}
  //             useMaskBehavior={true}
  //             openOnFieldClick={true}
  //             labelMode="hidden"
  //             onValueChanged={(e: any) => {
  //               formComponent.updateData(dataField, e.value);
  //             }}
  //           />
  //         </div>
  //       );
  //     },
  //   },
  // ];

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
              {/* <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition.current}
                onSearch={handleSearch}
                storeKey={"RptSerCamMarketingHTCSummary-search"}
              /> */}
              <SearchForm
                data={searchCondition.current}
                // data={
                //   JSON.stringify(data) === "{}" ? searchCondition.current : data
                // }
                onSearch={handleSearch}
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
              isHidenHeaderFilter
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              storeKey={"RptSerCamMarketingHTCSummary-columns"}
              editMode={false}
              customHeight={windowSize.height - 110}
              defaultPageSize={9999999}
              isHiddenCheckBox
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
