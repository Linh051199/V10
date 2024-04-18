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
  TextBox,
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
import { validateMajorTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { useSer_ReportHistoryCostColumns } from "../components/useReportColumns";
import { Ser_ReportHistoryCostParam } from "@/packages/api/clientgate/report/Ser_ReportHistoryCostApi";
import { SearchForm } from "../search-form";
import usePrint from "@/components/print/usePrint";

export const Ser_ReportHistoryCostPage = () => {
  const { t } = useI18n("Ser_ReportHistoryCost");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { quickPrint, previewPrint } = usePrint();
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<Ser_ReportHistoryCostParam>({
    DealerCode: "",
    PartCode: "",
    FlagDataWH: false,
    DateFromTo: [validateMajorTimeStartDayOfMonth, new Date()],
  } as Ser_ReportHistoryCostParam);

  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const searchFormRef = useRef<any>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

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
        (a: any, b: any) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setColumnsState(outputColumns);
    }
  }, []);

  const handleExport = async () => {
    const response = await api.Ser_ReportHistoryCost_ExportSearchDL({
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      DealerCode: searchCondition.current.DealerCode ?? "",
      PartCode: searchCondition.current.PartCode ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    } as Ser_ReportHistoryCostParam);
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

  const handlePrint = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      const response = await api.Ser_ReportHistoryCost_PrintDL({
        FromDate: searchCondition.current.DateFromTo[0]
          ? format(searchCondition.current.DateFromTo[0] as Date, "yyyy-MM-dd")
          : "",
        ToDate: searchCondition.current.DateFromTo[1]
          ? format(searchCondition.current.DateFromTo[1] as Date, "yyyy-MM-dd")
          : "",

        DealerCode: searchCondition.current.DealerCode ?? "",
        PartCode: searchCondition.current.PartCode ?? "",
        FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
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

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const columns = useSer_ReportHistoryCostColumns({
    data: [],
  });
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Ser_ReportHistoryCost-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

  const fetchData = async () => {
    const resp = await api.Ser_ReportHistoryCost_SearchDL({
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      DealerCode: searchCondition.current.DealerCode ?? "",
      PartCode: searchCondition.current.PartCode ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    } as Ser_ReportHistoryCostParam);

    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.lst_Ser_ReportHistoryCost?.length ?? 0;

    if (resp?.isSuccess) {
      searchFormRef?.current?.setDataForm(resp?.Data);
      return {
        DataList: resp?.Data?.lst_Ser_ReportHistoryCost,
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
          onPrint={handlePrint}
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
              ref={searchFormRef}
            />
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
                keyExpr={"RefNo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={""}
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
