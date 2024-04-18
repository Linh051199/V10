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
import { DateRangeBox, LoadPanel, ScrollView, Validator } from "devextreme-react";
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
  RequiredRule,
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
import { RequiredField, requiredType } from "@/packages/common/Validation_Rules";
import { DateRangeBoxFieldOne } from "@/packages/ui/hook-form-field/DateRangeBoxFieldOne/DateRangeBoxFieldOne";

interface ReportParam {
  DateFrom: Date;
  DateTo: Date;
  FlagDataWH: 1 | 0;
  DateFromTo: Date[] | null[];
  PlateNo: any
  DealerCode: any
}

export const Rpt_BaoHanhXeHTMVPage = () => {
  const { t } = useI18n("Rpt_BaoHanhXeHTMV");
  const gridRef: any = useRef();
  const searchCondition = useRef<any>({
    DateFromTo: [validateTimeStartDayOfMonth, new Date()],
    FlagDataWH: 0,
    PlateNo: "",
    DealerCode: "",
  } as ReportParam);
  const windowSize: any = useWindowSize();
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();
  const [isLoading, setLoading] = useState(false)
  const formRef = useRef<any>();
  const refFormSearch = useRef<any>();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const fetchData = async () => {
    const response = await api.Ser_ROWarrantyReportHTMV_SearchHQ({
      DealerCode: searchCondition.current.DealerCode ?? "",
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      PlateNo: searchCondition.current.PlateNo ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    });
    if (response?.isSuccess) {
      // console.log(99, response)
      return {
        ...response,
        DataList: response?.Data?.Lst_Rpt_BaoHanhXeHTMV?.map(
          (item: any, index: any) => {
            return {
              ...item,
            };
          }
        ),
      };
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

  // if (formRef.current?.instance.validate().isValid) {
  //   if (formData.FlagDataWH) {
  //     setOpenPopupWH(true);
  //   } else {
  //     onSearch(formData);
  //   }
  // } else {
  //   return;
  // }

  const handleSearch = async (data: any) => {
    console.log(138, refFormSearch)
    // if (formRef.current?.instance.validate().isValid) {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      // setGettingData(true);
      gridRef?.current?.refetchData();
      // setGettingData(false);
    }
    // } else {
    //   return
    // }
  };

  const showError = useSetAtom(showErrorAtom);
  const handleExport = async () => {
    // const crData = gridRef?.current?.getData();
    // if (crData && crData?.length > 0) {
    const result = await api.Ser_ROWarrantyReportHTMV_ExportSearchHQ({
      DealerCode: searchCondition.current.DealerCode ?? "",
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      PlateNo: searchCondition.current.PlateNo ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    });
    if (result.isSuccess && result.Data) {
      toast.success(t("Download successfully!"));
      window.location.href = result.Data;
    } else {
      showError({
        message: t(result._strErrCode),
        _strErrCode: result._strErrCode,
        _strTId: result._strTId,
        _strAppTId: result._strAppTId,
        _objTTime: result._objTTime,
        _strType: result._strType,
        _dicDebug: result._dicDebug,
        _dicExcs: result._dicExcs,
      });
    }
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
      dataField: "DealerCode",
      visible: true,
      caption: t("DealerCode"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("input"),
      },
    },
    {
      dataField: "SoKhung",
      visible: true,
      caption: t("SoKhung"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("input"),
      },
    },
    {
      dataField: "DateFromTo",
      caption: t("DateFromTo"),
      validationRules: [requiredType],
      visible: true,
      // validationRules: [RequiredField(t("DateFromToIsRequired"))],
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <DateRangeBoxFieldOne
              // requireDateFrom={true}
              dataField='DateFromTo'
              required={true}
              error={'DateFromTo'}
              disabled={true}
              showClearButton={false}
              // value={searchCondition.current.DateFromTo}
              formComponent={formComponent}
            >
            </DateRangeBoxFieldOne>
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
        dataField: "DealerCode",
        caption: t("DealerCode"),
        visible: true,
      },
      {
        dataField: "DealerName",
        caption: t("DealerName"),
        visible: true,
      },
      {
        dataField: "RONo",
        caption: t("RONo"),
        visible: true,
      },
      {
        dataField: "HTCROWNo",
        caption: t("HTCROWNo"),
        visible: true,
      },
      {
        dataField: "FrameNo",
        caption: t("FrameNo"),
        visible: true,
      },
      {
        dataField: "PlateNo",
        caption: t("PlateNo"),
        visible: true,
      },
      {
        dataField: "WarrantyRegistrationDate",
        caption: t("WarrantyRegistrationDate"),
        visible: true,
      },
      {
        dataField: "ExpiredDateWarranty",
        caption: t("ExpiredDateWarranty"),
        visible: true,
      },
      {
        dataField: "Km",
        caption: t("Km"),
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
                ref={refFormSearch}
                storeKey={"Rpt_BaoHanhXeHTMV-search"}
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
              keyExpr={"DealerCode"}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              storeKey={"Rpt_BaoHanhXeHTMV-colums"}
              editMode={false}
              defaultPageSize={9999999}
              isHidenHeaderFilter={true}
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
