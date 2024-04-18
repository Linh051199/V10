import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useI18n } from "@/i18n/useI18n";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useClientgateApi } from "@packages/api";
import {
  format,
  formatDistance,
  getMonth,
  isAfter,
  isBefore,
  set,
} from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { toast } from "react-toastify";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { PageHeader } from "../components";
import Form, { IItemProps } from "devextreme-react/form";
import { DateRangeBox, LoadPanel, ScrollView } from "devextreme-react";
import { nanoid } from "nanoid";
import { ColumnOptions } from "@/types";
import DataGrid, {
  HeaderFilter,
  Item,
  Toolbar,
  Scrolling,
  Sorting,
  Column,
  Paging,
  Search,
  ColumnFixing,
} from "devextreme-react/data-grid";
import CustomColumnChooser from "@/packages/ui/column-toggler/custom-column-chooser";
import { useSavedState } from "@/packages/ui/base-gridview/components";
import { useSetAtom } from "jotai";
import { Data_Grid } from "../components/data-grid";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { showErrorAtom } from "@/packages/store";
import { GridViewStandard } from "@/packages/components/gridview-standard/gridview-standard";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

interface ReportParam {
  DateFrom: Date;
  DateTo: Date;
  Status: "A" | "P" | "";
  VinNo: string;
  FlagDataWH: 1 | 0;
  DateFromTo: Date[] | null[];
}

export const Rpt_ThongKeKhachHangKhongQuayLaiLamDichVuPage = () => {
  const { t } = useI18n("Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu");
  const gridRef: any = useRef();
  const searchCondition = useRef<any>({
    NgayNhapKhoFromTo: [validateTimeStartDayOfMonth, null],
    NgayDLNhanXeFromTo: [validateTimeStartDayOfMonth, null],
    FlagDataWH: 0,
  });
  const windowSize: any = useWindowSize();
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();

  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const fetchData = async () => {
    // const response = await api.Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu_SearchHQ({
    //   ...searchCondition.current.current,
    //   VinNo: searchCondition.current.VinNo ?? "",
    //   DateFrom: searchCondition.current.DateFromTo[0]
    //     ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
    //     : "",
    //   DateTo: searchCondition.current.DateFromTo[1]
    //     ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
    //     : "",
    //   Status: searchCondition.current.Status ?? "",
    //   FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    // });
    // if (response?.isSuccess) {
    //   return {
    //     ...response,
    //     DataList: response?.Data?.Lst_Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu?.map(
    //       (item: any, index: any) => {
    //         return {
    //           ...item,
    //         };
    //       }
    //     ),
    //   };
    // }
  };

  const handleSearch = async (data: any) => {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      // setGettingData(true);
      gridRef?.current?.refetchData();
      // setGettingData(false);
    }
  };

  const showError = useSetAtom(showErrorAtom);
  const handleExport = async () => {
    // const crData = gridRef?.current?.getData();
    // if (crData && crData?.length > 0) {
    //   const result = await api.Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu_ExportSearchHQ({
    //     VinNo: searchCondition.current.VinNo ?? "",
    //     DateFrom: searchCondition.current.DateFromTo[0]
    //       ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
    //       : "",
    //     DateTo: searchCondition.current.DateFromTo[1]
    //       ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
    //       : "",
    //     Status: searchCondition.current.Status ?? "",
    //     FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    //   });
    //   if (result.isSuccess && result.Data) {
    //     toast.success(t("Download successfully!"));
    //     window.location.href = result.Data;
    //   } else {
    //     showError({
    //       message: t(result._strErrCode),
    //       _strErrCode: result._strErrCode,
    //       _strTId: result._strTId,
    //       _strAppTId: result._strAppTId,
    //       _objTTime: result._objTTime,
    //       _strType: result._strType,
    //       _dicDebug: result._dicDebug,
    //       _dicExcs: result._dicExcs,
    //     });
    //   }
    // } else {
    //   toast.warning("PleaseSearchBeforeExportExcelDetail");
    // }
  };

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const searchFields: IItemProps[] = [
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
      dataField: "TGChuaQuayLaiLamDichVu",
      visible: true,
      caption: t("TGChuaQuayLaiLamDichVu"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "6",
            text: "6 tháng",
          },
          {
            value: "12",
            text: "12 tháng",
          },
          {
            value: "24",
            text: "24 tháng",
          },
          {
            value: "36",
            text: "36 tháng",
          },
        ],
      },
    },
  ];

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        caption: t("STT"),
        dataField: "STT",
        cellRender: ({ rowIndex }) => {
          return <span>{rowIndex + 1}</span>;
        },
        visible: true,
        alignment: "center",
        allowSorting: false,
        allowFiltering: false,
      },
      {
        dataField: "MaDaiLy",
        caption: t("MaDaiLy"),
        visible: true,
      },
      {
        dataField: "TenDL",
        caption: t("TenDL"),
        visible: true,
      },
      {
        dataField: "HoTenKH",
        caption: t("HoTenKH"),
        visible: true,
      },
      {
        dataField: "SDT",
        caption: t("SDT"),
        visible: true,
      },
      {
        dataField: "DiaChi",
        caption: t("DiaChi"),
        visible: true,
      },
      {
        dataField: "TinhThanhPho",
        caption: t("TinhThanhPho"),
        visible: true,
      },
      {
        dataField: "Quan/Huyen",
        caption: t("Quan/Huyen"),
        visible: true,
      },
      {
        dataField: "BienSoXe",
        caption: t("BienSoXe"),
        visible: true,
      },
      {
        dataField: "VIN",
        caption: t("VIN"),
        visible: true,
      },
      {
        dataField: "Model",
        caption: t("Model"),
        visible: true,
      },
      {
        dataField: "MauXe",
        caption: t("MauXe"),
        visible: true,
      },
      {
        dataField: "NgayHetHanBH",
        caption: t("NgayHetHanBH"),
        visible: true,
      },
      {
        dataField: "SoKMGanNhatVaoLamDichVu",
        caption: t("SoKMGanNhatVaoLamDichVu"),
        visible: true,
      },
      {
        dataField: "NgayVaoLamDichVuGanNhat",
        caption: t("NgayVaoLamDichVuGanNhat"),
        visible: true,
      },
    ];
  }, []);

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
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
                storeKey={"Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu-search"}
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
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]} // cars
              columns={columns}
              fetchData={fetchData}
              keyExpr={"MaDaiLy"}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              storeKey={"Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu-colums"}
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
