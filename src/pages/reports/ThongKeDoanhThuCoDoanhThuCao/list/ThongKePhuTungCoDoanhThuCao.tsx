import { AdminContentLayout } from "@layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { useI18n } from "@/i18n/useI18n";
import React, { useRef } from "react";
import { useSetAtom } from "jotai";
import { useClientgateApi } from "@packages/api";
import { format, set } from "date-fns";
import { ScrollView } from "devextreme-react";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { toast } from "react-toastify";
import { showErrorAtom } from "@packages/store";
import { PageHeader } from "../components";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchForm } from "../search-form";
import { useRpt_ThongKePhuTungCoDoanhThuCaoColumns } from "../components/useReportColumns";
import { useGetTime } from "@/packages/hooks/useGetTime";

interface ReportParam {
  DealerCode: string;
  FlagDataWH: 0 | 1;
  ToFrom: Date[] | any;
  Top: string;
}
export const Rpt_ThongKePhuTungCoDoanhThuCaoCaoPage = () => {
  const { t } = useI18n("Rpt_ThongKePhuTungCoDoanhThuCaoCaoPage");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { endDate, firstDay } = useGetTime();

  const searchCondition = useRef<ReportParam>({
    FlagDataWH: 0,
    DealerCode: "",
    ToFrom: [firstDay, endDate],
    Top: "",
  } as ReportParam);

  const handleExport = async () => {
    const response = await api.Ser_InvReportPartTopRevenue_ExportSearchDL({
      ...searchCondition.current,
      FromDate: searchCondition?.current?.ToFrom[0]
        ? typeof searchCondition?.current?.ToFrom[0] === "object"
          ? format(searchCondition.current?.ToFrom[0], "yyyy-MM-dd")
          : searchCondition.current?.ToFrom[0]
        : "",
      ToDate: searchCondition?.current?.ToFrom[1]
        ? typeof searchCondition?.current?.ToFrom[1] === "object"
          ? format(searchCondition.current?.ToFrom[1], "yyyy-MM-dd")
          : searchCondition.current?.ToFrom[1]
        : "",
      FlagDataWH: searchCondition?.current?.FlagDataWH ? "1" : "0",
    } as any);
    if (response.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = response.Data as string;
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
  };

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...data,
      ToFrom: [data.ToFrom[0], data.ToFrom[1]],
    };
    gridRef?.current?.refetchData();
  };

  const handleExportDetail = async () => {};

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const columns = useRpt_ThongKePhuTungCoDoanhThuCaoColumns({
    data: [],
  });

  const fetchData = async () => {
    const resp = await api.Ser_InvReportPartTopRevenue_SearchDL({
      ...searchCondition.current,
      FromDate: searchCondition?.current?.ToFrom[0]
        ? typeof searchCondition?.current?.ToFrom[0] === "object"
          ? format(searchCondition.current?.ToFrom[0], "yyyy-MM-dd")
          : searchCondition.current?.ToFrom[0]
        : "",
      ToDate: searchCondition?.current?.ToFrom[1]
        ? typeof searchCondition?.current?.ToFrom[1] === "object"
          ? format(searchCondition.current?.ToFrom[1], "yyyy-MM-dd")
          : searchCondition.current?.ToFrom[1]
        : "",
      FlagDataWH: searchCondition?.current?.FlagDataWH ? "1" : "0",
    } as any);

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Ser_InvReportPartTopRevenue || [],
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
          onExportExcelDetail={handleExportDetail}
          onExportExcel={handleExport}
          toggleSearchPanel={handleToggleSearchPanel}
        ></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchForm
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
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
                storeKey={"Rpt_ThongKePhuTungCoDoanhThuCaoCao"}
                editMode={false}
                isHidenHeaderFilter={true}
                defaultPageSize={9999999999}
                isHiddenCheckBox
                // allowInlineEdit
                // inlineEditMode="row"
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
