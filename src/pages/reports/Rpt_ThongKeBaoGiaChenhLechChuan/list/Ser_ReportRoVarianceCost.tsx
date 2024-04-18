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
import {
  formatDate,
  validateTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { NumberRangeField } from "@/packages/components/number-range-field";
import { DateField } from "@/packages/components/date-field";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { Search_Ser_ReportRoVarianceCost_Params } from "@/packages/types/report/Ser_ReportRoVarianceCost";

interface ReportParam {
  DateFrom: Date;
  DateTo: Date;
  Status: "A" | "P" | "";
  VinNo: string;
  FlagDataWH: 1 | 0;
  DateFromTo: Date[] | null[];
}

export const Ser_ReportRoVarianceCostPage = () => {
  const { t } = useI18n("Ser_ReportRoVarianceCost");
  const gridRef: any = useRef();
  const searchCondition = useRef<Search_Ser_ReportRoVarianceCost_Params>({
    FromDate: "",
    ToDate: "",
    DealerCode: "",
    FromDateFromTo: [validateTimeStartDayOfMonth, new Date()],
    FlagDataWH: 0,
    FlagStockOut: 1,
    FlagQueryFullHistory: 0,
    RoNo: "",

    //DealerCode:
    //FromDate: 2023-12 - 22
    // ToDate: 2024-01-01
    // FlagDataWH: 0
    // PlateNo:
    //FlagStockOut: 1
    // FlagQueryFullHistory: 0
  });
  const windowSize: any = useWindowSize();
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();
  const { isHQ } = usePermissions();
  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const fetchData = async () => {
    if (
      searchCondition.current.FromDateFromTo &&
      searchCondition.current.FromDateFromTo.length > 0
    ) {
      searchCondition.current.FromDate = searchCondition.current
        .FromDateFromTo[0]
        ? formatDate(searchCondition.current.FromDateFromTo[0])
        : undefined;
      searchCondition.current.ToDate = searchCondition.current.FromDateFromTo[1]
        ? formatDate(searchCondition.current.FromDateFromTo[1])
        : undefined;
    }
    // delete searchCondition.current["FromDateFromTo"];
    const resp = await match(isHQ())
      .with(true, async () => {
        const resp = await api.Ser_ReportRoVarianceCostHQ(
          searchCondition.current
        );
        return resp;
      })
      .with(false, async () => {
        const resp = await api.Ser_ReportRoVarianceCostDL(
          searchCondition.current
        );
        return resp;
      })
      .otherwise(() => null);

    if (resp?.isSuccess) {
      return resp;
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
  };

  const handleSearch = async (data: any) => {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      gridRef?.current?.refetchData();
    }
  };

  const showError = useSetAtom(showErrorAtom);
  const handleExport = async () => {
    // const crData = gridRef?.current?.getData();
    // if (crData && crData?.length > 0) {
    //   const result = await api.Ser_ReportRoVarianceCost_ExportSearchHQ({
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

  const { data: listDealerCode } = useQuery({
    queryKey: ["allDealerCode"],
    queryFn: async () => {
      const resp = await api.XemBaoCaoKPI_PhanThang_GetAllActive();
      return [{ DealerCode: "", DealerName: "All" }, ...(resp.DataList as any)];
    },
  });

  const searchFields: IItemProps[] = [
    {
      dataField: "FromDateFromTo",
      visible: true,
      caption: t("FromDateFromTo"),
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              width={"100%"}
              className="dateRange"
              displayFormat=" yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={searchCondition?.current?.FromDateFromTo[0]}
              defaultEndDate={searchCondition?.current?.FromDateFromTo[1]}
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
      dataField: "RoNo",
      visible: true,
      caption: t("RoNo"),
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
        items: [listDealerCode ?? []],
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
    {
      dataField: "FlagDataWH",
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
              label={t("FlagDataWH")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField] == 1 ? true : false}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
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
        dataField: "SoBaoGia",
        caption: t("SoBaoGia"),
        visible: true,
      },
      {
        dataField: "SoLenhSuaChua",
        caption: t("SoLenhSuaChua"),
        visible: true,
      },
      {
        dataField: "NgayVaoXuong",
        caption: t("NgayVaoXuong"),
        visible: true,
      },
      {
        dataField: "NgayGiaoXe",
        caption: t("NgayGiaoXe"),
        visible: true,
      },
      {
        dataField: "BienSoXe",
        caption: t("BienSoXe"),
        visible: true,
      },
      {
        dataField: "Model",
        caption: t("Model"),
        visible: true,
      },
      {
        dataField: "MaPT-CV",
        caption: t("MaPT-CV"),
        visible: true,
      },
      {
        dataField: "TenPT-CV",
        caption: t("TenPT-CV"),
        visible: true,
      },
      {
        dataField: "GiaBan",
        caption: t("GiaBan"),
        visible: true,
      },
      {
        dataField: "SoLuong",
        caption: t("SoLuong"),
        visible: true,
      },
      {
        dataField: "VAT",
        caption: t("VAT"),
        visible: true,
      },
      {
        dataField: "HeSo",
        caption: t("HeSo"),
        visible: true,
      },
      {
        dataField: "GiaChuan",
        caption: t("GiaChuan"),
        visible: true,
      },
      {
        dataField: "VATChuan",
        caption: t("VATChuan"),
        visible: true,
      },
      {
        dataField: "GiaTri",
        caption: t("GiaTri"),
        visible: true,
      },
      {
        dataField: "GiaTriChenhLech",
        caption: t("GiaTriChenhLech"),
        visible: true,
      },
      {
        dataField: "CVDV",
        caption: t("CVDV"),
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
                storeKey={"Ser_ReportRoVarianceCost-search"}
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
              keyExpr={"RoNo"}
              autoFetchData={true}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              storeKey={"Ser_ReportRoVarianceCost-colums"}
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
