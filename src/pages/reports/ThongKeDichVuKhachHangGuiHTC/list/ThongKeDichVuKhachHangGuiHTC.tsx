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
import { useRpt_ThongKeDichVuKhachHangGuiHTCColumns } from "../components/useReportColumns";
import { PageHeader } from "../components";
import { RequiredField } from "@packages/common/Validation_Rules";
import { nanoid } from "nanoid";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Rpt_TongHopChienDichKhuyenMaiParam } from "@/packages/api/clientgate/report/Ser_Campaign_Dealer_RptApi";
import { validateMajorTimeStartDayOfMonth } from "@/packages/common/date_utils";

const dateBoxOptions = {
  displayFormat: "yyyy-MM-dd",
  openOnFieldClick: true,
  validationMessageMode: "always",
  showClearButton: true,
};
const now = new Date();
const firstDayOfMonth = set(now, { date: 1 });
interface ReportParam {
  TDate_From: any;
  TDate_To: any;
  FlagDataWH: 0 | 1;
  TDate_FromTo: Date[] | null[];
}
export const Rpt_ThongKeDichVuKhachHangGuiHTCPage = () => {
  const { t } = useI18n("Rpt_ThongKeDichVuKhachHangGuiHTC");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi

  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<ReportParam>({
    FlagDataWH: 0,
    TDate_FromTo: [validateMajorTimeStartDayOfMonth, new Date()],
  } as ReportParam);

  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const { data: dealerList, isLoading: isGettingDealerDs } = useQuery(
    ["MstDealer", "withAllOption"],
    async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.DataList) {
        return [{ DealerCode: "", DealerName: "Tất Cả" }, ...resp.DataList];
      }
    }
  );

  const searchFields: IItemProps[] = [
    {
      dataField: "NgayVaoXuong",
      caption: t("NgayVaoXUong"),
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
              defaultStartDate={searchCondition?.current?.TDate_FromTo[0]}
              defaultEndDate={searchCondition?.current?.TDate_FromTo[1]}
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
      dataField: "XeHuyndai",
      caption: t("XeHuynDai"),
      visible: true,
      label: {
        visible: false,
        text: t("XeHuynDai"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              checkBoxRef={checkBoxRef}
              label={t("XeHuynDai")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={true}
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

  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ["report", "Rpt_NXTQuyenDoiNo", JSON.stringify(searchCondition)],
  //   queryFn: async () => {
  //     if (loadingKey !== "0") {
  //       const resp = api.Rpt_NXTQuyenDoiNo_SearchHQ({
  //         TDate_From: searchCondition.TDate_FromTo[0]
  //           ? format(searchCondition.TDate_FromTo[0], "yyyy-MM-dd")
  //           : "",
  //         TDate_To: searchCondition.TDate_FromTo[1]
  //           ? format(searchCondition.TDate_FromTo[1], "yyyy-MM-dd")
  //           : "",
  //         FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
  //       } as Rpt_NXTQuyenDoiNoParam);
  //       return resp;
  //     } else {
  //       return null;
  //     }
  //   },
  // });
  const handleExport = async () => {
    if (loadingKey !== "0") {
      setGettingData(true);
      const response = await api.Rpt_TongHopChienDichKhuyenMai_ExportSearchHQ({
        TDate_From: searchCondition.current.TDate_FromTo[0]
          ? format(searchCondition.current.TDate_FromTo[0], "yyyy-MM-dd")
          : "",
        TDate_To: searchCondition.current.TDate_FromTo[1]
          ? format(searchCondition.current.TDate_FromTo[1], "yyyy-MM-dd")
          : "",
        FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
      } as Rpt_TongHopChienDichKhuyenMaiParam);
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
      setGettingData(false);
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
        TDate_From: data.TDate_FromTo[0] !== null ? data.TDate_FromTo[0] : "",
        TDate_To: data.TDate_FromTo[1] !== null ? data.TDate_FromTo[1] : "",
      };
      gridRef?.current?.refetchData();
    }
  };

  const handleExportDetail = async () => {
    if (loadingKey !== "0") {
      setGettingData(true);
      const respone =
        await api.Rpt_TongHopChienDichKhuyenMai_ExportDetailSearchHQ({
          TDate_From: searchCondition.current.TDate_FromTo[0]
            ? format(searchCondition.current.TDate_FromTo[0], "yyyy-MM-dd")
            : "",
          TDate_To: searchCondition.current.TDate_FromTo[1]
            ? format(searchCondition.current.TDate_FromTo[1], "yyyy-MM-dd")
            : "",
          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as Rpt_TongHopChienDichKhuyenMaiParam);
      if (respone.isSuccess) {
        toast.success(t("Download successfully!"));
        window.location.href = respone.Data as string;
      } else {
        toast.error(t("DownloadUnsuccessfully"));
        showError({
          message: t(respone._strErrCode),
          _strErrCode: respone._strErrCode,
          _strTId: respone._strTId,
          _strAppTId: respone._strAppTId,
          _objTTime: respone._objTTime,
          _strType: respone._strType,
          _dicDebug: respone._dicDebug,
          _dicExcs: respone._dicExcs,
        });
      }
      setGettingData(false);
    } else {
      toast.warning("PleaseSearchBeforeExportExcel");
    }
  };

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const columns = useRpt_ThongKeDichVuKhachHangGuiHTCColumns({
    data: [],
  });
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_ThongKeDichVuKhachHangGuiHTC-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

  const fetchData = async () => {
    const resp = await api.Rpt_TongHopChienDichKhuyenMai_SearchHQ({
      TDate_From: searchCondition.current.TDate_FromTo?.[0]
        ? format(searchCondition.current.TDate_FromTo[0] as Date, "yyyy-MM-dd")
        : "",
      TDate_To: searchCondition.current.TDate_FromTo?.[1]
        ? format(searchCondition.current.TDate_FromTo[1] as Date, "yyyy-MM-dd")
        : "",

      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    } as ReportParam);

    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.Lst_Rpt_NXT_QuyenDoiNo?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.Lst_Rpt_NXT_QuyenDoiNo,
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
          onExportExcelDetail={handleExportDetail}
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
                storeKey={"Rpt_ThongKeDichVuKhachHang-search"}
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
            {/* <DataGrid
              id="gridContainer"
              dataSource={data?.Data?.Lst_Rpt_NXT_QuyenDoiNo ?? []}
              showBorders={true}
              showRowLines={true}
              showColumnLines={true}
              remoteOperations={false}
              columnAutoWidth={true}
              cacheEnabled={true}
              noDataText={
                data?.Data?.Lst_Rpt_NXT_QuyenDoiNo.length === 0
                  ? "Không có dữ liệu"
                  : ""
              }
              height={windowSize.height - 110}
              onToolbarPreparing={onToolbarPreparing}
              columnResizingMode="widget"
              allowColumnResizing={true}
            >
              <ColumnChooser enabled={true} />
              <ColumnFixing enabled={true} />
              <HeaderFilter allowSearch={true} visible={true} />
              <Scrolling
                showScrollbar={"always"}
                mode={"standard"}
                rowRenderingMode={"standard"}
              />
              <Paging enabled={false} />
              <Pager visible={false} />
              <Toolbar>
                {!!allToolbarItems &&
                  allToolbarItems.map((item, index) => {
                    return (
                      <ToolbarItem key={index} location={item.location}>
                        {item.widget === "dxButton" && (
                          <Button {...item.options} />
                        )}
                        {!!item.render && item.render()}
                      </ToolbarItem>
                    );
                  })}
              </Toolbar>

              {realColumns.map((column: ColumnOptions, index: number) => (
                <Column key={index} {...column} />
              ))}
            </DataGrid> */}

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
                keyExpr={"BienSo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={"Rpt_ThongKeDichVuKhachHangGuiHTC"}
                editMode={false}
                defaultPageSize={9999999}
                isHiddenCheckBox
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
