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
import { NumberRangeField } from "@/packages/components/number-range-field";
import { DateField } from "@/packages/components/date-field";

interface ReportParam {
  DateFrom: Date;
  DateTo: Date;
  Status: "A" | "P" | "";
  VinNo: string;
  FlagDataWH: 1 | 0;
  DateFromTo: Date[] | null[];
}

export const Rpt_KhaNangCungUngPhuTungDLKHPage = () => {
  const { t } = useI18n("Rpt_KhaNangCungUngPhuTungDLKH");
  const gridRef: any = useRef();
  const searchCondition = useRef<any>({
    NgayGDGanNhatFromTo: [validateTimeStartDayOfMonth, new Date()],
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
    // const response = await api.Rpt_KhaNangCungUngPhuTungDLKH_SearchHQ({
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
    //     DataList: response?.Data?.Lst_Rpt_KhaNangCungUngPhuTungDLKH?.map(
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
    //   const result = await api.Rpt_KhaNangCungUngPhuTungDLKH_ExportSearchHQ({
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
      dataField: "ThangBaoCao",
      visible: true,
      caption: t("ThangBaoCao"),
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row "}>
            <DateField
              formInstance={formComponent}
              showClearButton={true}
              dataField={dataField}
              width={270}
              defaultValue={new Date() ?? null}
              onValueChanged={(e: any) => {
                formComponent.updateData(
                  dataField,
                  e.value ? format(e.value, "yyyy-MM") : null
                );
              }}
              displayFormat={"yyyy-MM"}
              calendarOptions={{
                maxZoomLevel: "year",
              }}
            ></DateField>
          </div>
        );
      },
    },
    {
      dataField: "MaPhuTung",
      visible: true,
      caption: t("MaPhuTung"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "TenPhuTung",
      visible: true,
      caption: t("TenPhuTung"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
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
        dataField: "NgayTaoLenh",
        caption: t("NgayTaoLenh"),
        visible: true,
      },
      {
        dataField: "SoLenhSuaChua",
        caption: t("SoLenhSuaChua"),
        visible: true,
      },
      {
        dataField: "BienSoXe",
        caption: t("BienSoXe"),
        visible: true,
      },
      {
        dataField: "MaPhuTung",
        caption: t("MaPhuTung"),
        visible: true,
      },
      {
        dataField: "TenPhuTung",
        caption: t("TenPhuTung"),
        visible: true,
      },
      {
        dataField: "DonViTinh",
        caption: t("DonViTinh"),
        visible: true,
      },
      {
        dataField: "SoLuongYeuCau",
        caption: t("SoLuongYeuCau"),
        visible: true,
      },
      {
        dataField: "SoLuongDapUng",
        caption: t("SoLuongDapUng"),
        visible: true,
      },
      {
        dataField: "SoLuongKhongDapUng",
        caption: t("SoLuongKhongDapUng"),
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
                storeKey={"Rpt_KhaNangCungUngPhuTungDLKH-search"}
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
              storeKey={"Rpt_KhaNangCungUngPhuTungDLKH-colums"}
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
