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
  NumberBox,
  ScrollView,
  TextBox,
} from "devextreme-react";
import { useWindowSize } from "@packages/hooks/useWindowSize";
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
import {
  formatDate,
  validateMajorTimeStartDayOfMonth,
  validateTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { useRpt_ThongKeBaoGiaChenhLechChuanColumns } from "../components/useReportColumns";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { BButton } from "@/packages/components/buttons";

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
export const Rpt_ThongKeBaoGiaChenhLechChuanPage = () => {
  const { t } = useI18n("Rpt_ThongKeBaoGiaChenhLechChuan");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi

  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<any>({
    NgayVaoXuong: [validateTimeStartDayOfMonth, new Date()],
    FlagDataWH: 0,
    DealerCode: "",
    PlateNo: "",
    RoNo: "",
  });

  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };
  const { isHQ } = usePermissions();
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
      visible: true,
      caption: t("NgayVaoXuong"),
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
              defaultStartDate={searchCondition.current?.NgayVaoXuong[0]}
              defaultEndDate={searchCondition.current?.NgayVaoXuong[1]}
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
      dataField: "SoBaoGia",
      visible: true,
      caption: t("SoBaoGia"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "Dealer",
      visible: true,
      caption: t("Dealer"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "",
            text: "Tất cả",
          },
          {
            value: "Thang",
            text: "Thang",
          },
          {
            value: "Tuan",
            text: "Tuan",
          },
        ],
      },
    },
    {
      dataField: "BienSo",
      visible: true,
      caption: t("BienSo"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
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

  const handleExport = async () => {
    // setGettingData(true);
    const response = await api.ThongKeBaoGiaChenhLechChuanApiExportSearch({
      FromDate: searchCondition.current.NgayVaoXuong[0]
        ? format(searchCondition.current.NgayVaoXuong[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.NgayVaoXuong[1]
        ? format(searchCondition.current.NgayVaoXuong[1], "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
      DealerCode: searchCondition.current.DealerCode,
      PartCode: searchCondition.current.PartCode,
    });
    if (response.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = response.Data!;
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
    // setGettingData(false);
  };

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...data,
      FromDate:
        data.NgayVaoXuong[0] !== null ? formatDate(data.NgayVaoXuong[0]) : "",
      ToDate:
        data.NgayVaoXuong[1] !== null ? formatDate(data.NgayVaoXuong[1]) : "",
    };
    gridRef?.current?.refetchData();
  };

  const handleExportDetail = async () => {
    // if (loadingKey !== "0") {
    //   setGettingData(true);
    //   const respone =
    //     await api.Rpt_TongHopChienDichKhuyenMai_ExportDetailSearchHQ({
    //       TDate_From: searchCondition.current.TDate_FromTo[0]
    //         ? format(searchCondition.current.TDate_FromTo[0], "yyyy-MM-dd")
    //         : "",
    //       TDate_To: searchCondition.current.TDate_FromTo[1]
    //         ? format(searchCondition.current.TDate_FromTo[1], "yyyy-MM-dd")
    //         : "",
    //       FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    //     } as Rpt_TongHopChienDichKhuyenMaiParam);
    //   if (respone.isSuccess) {
    //     toast.success(t("Download successfully!"));
    //     window.location.href = respone.Data as string;
    //   } else {
    //     toast.error(t("DownloadUnsuccessfully"));
    //     showError({
    //       message: t(respone._strErrCode),
    //       _strErrCode: respone._strErrCode,
    //       _strTId: respone._strTId,
    //       _strAppTId: respone._strAppTId,
    //       _objTTime: respone._objTTime,
    //       _strType: respone._strType,
    //       _dicDebug: respone._dicDebug,
    //       _dicExcs: respone._dicExcs,
    //     });
    //   }
    //   setGettingData(false);
    // } else {
    //   toast.warning("PleaseSearchBeforeExportExcel");
    // }
  };

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const columns = useRpt_ThongKeBaoGiaChenhLechChuanColumns({
    data: [],
  });
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_ThongKeBaoGiaChenhLechChuan-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.ThongKeBaoGiaChenhLechChuanApiSearchHQ({
          ...searchCondition.current,
          Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef.current?.getDxInstance().pageSize() ?? 100,
        } as ReportParam);
        return response;
      })
      .otherwise(async () => {
        const response = await api.ThongKeBaoGiaChenhLechChuanApiSearchDL({
          TDate_From: searchCondition.current.TDate_FromTo?.[0]
            ? format(
              searchCondition.current.TDate_FromTo[0] as Date,
              "yyyy-MM-dd"
            )
            : "",
          TDate_To: searchCondition.current.TDate_FromTo?.[1]
            ? format(
              searchCondition.current.TDate_FromTo[1] as Date,
              "yyyy-MM-dd"
            )
            : "",

          FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
        } as ReportParam);
        return response;
      });
    if (resp?.isSuccess) {
      return resp;
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

  const subGridToolbars: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return (
          <BButton
            label={t("ExportExcel")}
            onClick={handleExport}
            visible={true}
          />
        );
      },
    },
  ];

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
                storeKey={"Rpt_ThongKeBaoGiaChenhLechChuan-search"}
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

            <ScrollView height={windowSize.height - 120}>
              <GridViewOne
                ref={gridRef}
                // allowColumnResizing={true}
                // columnResizingMode={"widget"}
                // modeSelection="none"
                toolbarItems={subGridToolbars}
                dataSource={[]} // cars
                columns={columns}
                fetchData={fetchData}
                keyExpr={"RoNo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={"Rpt_ThongKeBaoGiaChenhLechChuan"}
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
