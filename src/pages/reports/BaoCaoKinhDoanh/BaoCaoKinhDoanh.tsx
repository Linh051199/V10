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
import { Search_BaoCaoKinhDoanh_Params } from "@/packages/types/report/BaoCaoKinhDoanh";

export const BaoCaoKinhDoanhPage = () => {
  const { t } = useI18n("BaoCaoKinhDoanh");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const gridRef: any = useRef();
  const searchCondition = useRef<Partial<Search_BaoCaoKinhDoanh_Params>>({
    NgayVaoXuongFromTo: [validateTimeStartDayOfMonth, new Date()],
    NgayThanhToanFromTo: [validateTimeStartDayOfMonth, new Date()],
  });
  //====================================CallAPI========================================
  const fetchData = async () => {
    // const resp = await api.Rpt_OrdOrderPlanHTMV_SearchHQ({
    //   CreatedDateFrom: searchCondition.current.CreatedDateFromTo[0]
    //     ? format(
    //         searchCondition.current.CreatedDateFromTo[0] as Date,
    //         "yyyy-MM-dd"
    //       )
    //     : "",
    //   CreatedDateTo: searchCondition.current.CreatedDateFromTo[1]
    //     ? format(
    //         searchCondition.current.CreatedDateFromTo[1] as Date,
    //         "yyyy-MM-dd"
    //       )
    //     : "",
    //   ReportType: searchCondition.current.ReportType ?? "",
    //   Code: searchCondition.current.Code ?? "",
    // } as Rpt_OrdOrderPlanHTMVParam);
    // const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    // const length = resp?.Data?.Lst_Ord_OrderPlan_HTMV?.length ?? 0;

    // if (resp?.isSuccess) {
    //   return {
    //     DataList: resp?.Data?.Lst_Ord_OrderPlan_HTMV,
    //     PageCount: length / pageSize,
    //     ItemCount: length,
    //     PageSize: 99999,
    //   };
    // } else {
    //   showError({
    //     message: t(resp._strErrCode),
    //     _strErrCode: resp._strErrCode,
    //     _strTId: resp._strTId,
    //     _strAppTId: resp._strAppTId,
    //     _objTTime: resp._objTTime,
    //     _strType: resp._strType,
    //     _dicDebug: resp._dicDebug,
    //     _dicExcs: resp._dicExcs,
    //   });

    //   return {
    //     DataList: [],
    //     PageCount: 0,
    //     ItemCount: 0,
    //     PageSize: 99999,
    //   };
    // }
    return [];
  };
  //====================================CallAPI-end========================================

  //====================================handle========================================

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...data,
      CreatedDateFrom: data.NgayVaoXuongFromTo[0]
        ? data.NgayVaoXuongFromTo[0]
        : "",
      CreatedDateTo: data.NgayVaoXuongFromTo[1]
        ? data.NgayVaoXuongFromTo[1]
        : "",
    };
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
  const handleExport = useCallback(async () => {
    toast.warning("Chưa có api nhé!");
  }, []);

  //====================================handle-end========================================

  //====================================searchField========================================
  const searchFields: IItemProps[] = [
    {
      dataField: "NgayVaoXuongFromTo",
      caption: t("NgayVaoXuongFromTo"),
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
              defaultStartDate={searchCondition?.current.NgayVaoXuongFromTo[0]}
              defaultEndDate={searchCondition?.current.NgayVaoXuongFromTo[1]}
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
      dataField: "NgayThanhToanFromTo",
      caption: t("NgayThanhToanFromTo"),
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
              defaultStartDate={searchCondition?.current.NgayThanhToanFromTo[0]}
              defaultEndDate={searchCondition?.current.NgayThanhToanFromTo[1]}
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
                storeKey={"BaoCaoKinhDoanh-search"}
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
              customToolbarItems={[]}
              storeKey={"BaoCaoKinhDoanh-columns"}
              customHeight={windowSize.height - 110}
              editMode={false}
              defaultPageSize={9999999}
              isHiddenCheckBox
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
