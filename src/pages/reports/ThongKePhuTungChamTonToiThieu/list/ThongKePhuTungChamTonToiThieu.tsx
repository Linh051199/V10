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
import Form, { IItemProps } from "devextreme-react/form";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { useSavedState } from "@packages/ui/base-gridview/components/use-saved-state";
import { toast } from "react-toastify";
import { showErrorAtom } from "@packages/store";
import { useRpt_ThongKePhuTungChamTonToiThieuColumns } from "../components/useReportColumns";
import { PageHeader } from "../components";
import { RequiredField } from "@packages/common/Validation_Rules";
import { nanoid } from "nanoid";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { validateMajorTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { SearchForm } from "../search-form";

interface ReportParam {
  DealerCode: string;
  FlagDataWH: 0 | 1;
  ToDate: Date | null;
}
export const Rpt_ThongKePhuTungChamTonToiThieuPage = () => {
  const { t } = useI18n("Rpt_ThongKePhuTungChamTonToiThieu");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi

  const searchCondition = useRef<ReportParam>({
    FlagDataWH: 0,
    DealerCode: "",
    ToDate: new Date(),
  } as ReportParam);

  const handleExport = async () => {
    const response = await api.Rpt_SerInvReportPartMinQuantity_ExportSearchDL({
      ...searchCondition.current,
      ToDate: searchCondition.current.ToDate
        ? format(searchCondition.current.ToDate, "yyyy-MM-dd")
        : "",
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
    };
    gridRef?.current?.refetchData();
  };

  const handleExportDetail = async () => {};

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const columns = useRpt_ThongKePhuTungChamTonToiThieuColumns({
    data: [],
  });

  const fetchData = async () => {
    const resp = await api.Rpt_SerInvReportPartMinQuantity_SearchDL({
      ...searchCondition.current,
      ToDate: searchCondition.current.ToDate
        ? format(searchCondition.current.ToDate, "yyyy-MM-dd")
        : "",
    } as any);

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Ser_InvReportPartMinQuantity || [],
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
                storeKey={"Rpt_ThongKePhuTungChamTonToiThieu"}
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
