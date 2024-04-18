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
import { RequiredField } from "@/packages/common/Validation_Rules";

interface ReportParam {
  DateFrom: Date;
  DateTo: Date;
  Status: "A" | "P" | "";
  VinNo: string;
  FlagDataWH: 1 | 0;
  DealerCode: any;
  WarrantyDateStartFromTo: Date[] | null[];
  WarrantyDateEndFromTo: Date[] | null[];
}

export const ThongKeXeConHanBaoHanhPage = () => {
  const { t } = useI18n("ThongKeXeConHanBaoHanh");
  const gridRef: any = useRef();
  const searchCondition = useRef<any>({
    WarrantyDateStartFromTo: [validateTimeStartDayOfMonth, null],
    WarrantyDateEndFromTo: [validateTimeStartDayOfMonth, null],
    DealerCode: "",
    FlagDataWH: 0,
  } as ReportParam);
  const windowSize: any = useWindowSize();
  const api = useClientgateApi();
  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const fetchData = async () => {
    const response = await api.Rpt_DMSSerXeConHanBaoHanh_SearchHQ({
      ...searchCondition.current,
      WarrantyDateStartFrom: searchCondition.current.WarrantyDateStartFromTo[0]
        ? format(
          searchCondition.current.WarrantyDateStartFromTo[0],
          "yyyy-MM-dd"
        )
        : "",
      WarrantyDateStartTo: searchCondition.current.WarrantyDateStartFromTo[1]
        ? format(
          searchCondition.current.WarrantyDateStartFromTo[1],
          "yyyy-MM-dd"
        )
        : "",
      WarrantyDateEndFrom: searchCondition.current.WarrantyDateEndFromTo[0]
        ? format(searchCondition.current.WarrantyDateEndFromTo[0], "yyyy-MM-dd")
        : "",
      WarrantyDateEndTo: searchCondition.current.WarrantyDateEndFromTo[1]
        ? format(searchCondition.current.WarrantyDateEndFromTo[1], "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    });
    if (response?.isSuccess) {
      return {
        ...response,
        DataList: response.Data.lst_Rpt_DMSSer_XeConHanBaoHanh,
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

  const { data: dealerList } = useQuery({
    queryKey: ["DeliveryOrder", "dealerList"],
    queryFn: async () => {
      const resp = await api.Mst_Dealer_GetAllActive();
      if (resp.isSuccess) {
        const newCondition = [
          ...resp.DataList!,
        ];
        return newCondition;
      }
      return [];
    },
  });
  const handleSearch = async (data: any) => {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      searchCondition.current = {
        ...data
      }
      gridRef?.current?.refetchData();
    }
  };

  const showError = useSetAtom(showErrorAtom);
  const handleExport = async () => {
    // const crData = gridRef?.current?.getData();
    // if (crData && crData?.length > 0) {
    const result = await api.Rpt_DMSSerXeConHanBaoHanh_ExportSearchHQ({
      DealerCode: searchCondition.current.DealerCode ?? "",
      Orginal: searchCondition.current.Orginal ?? "",
      ModelCode: searchCondition.current.ModelCode ?? "",
      VIN: searchCondition.current.VIN ?? "",
      WarrantyDateStartFrom: searchCondition.current.WarrantyDateStartFromTo[0]
        ? format(
          searchCondition.current.WarrantyDateStartFromTo[0],
          "yyyy-MM-dd"
        )
        : "",
      WarrantyDateStartTo: searchCondition.current.WarrantyDateStartFromTo[1]
        ? format(
          searchCondition.current.WarrantyDateStartFromTo[1],
          "yyyy-MM-dd"
        )
        : "",
      WarrantyDateEndFrom: searchCondition.current.WarrantyDateEndFromTo[0]
        ? format(searchCondition.current.WarrantyDateEndFromTo[0], "yyyy-MM-dd")
        : "",
      WarrantyDateEndTo: searchCondition.current.WarrantyDateEndFromTo[1]
        ? format(searchCondition.current.WarrantyDateEndFromTo[1], "yyyy-MM-dd")
        : "",
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
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: (item: any) =>
          item.DealerCode === ""
            ? `${item.DealerName}`
            : item
              ? `${item.DealerCode} - ${item.DealerName}`
              : "",
        valueExpr: "DealerCode",
        defaultValue: "",
        items: dealerList ?? [],
      },
    },
    {
      dataField: "Orginal",
      visible: true,
      caption: t("Orginal"),
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
            value: "HMC",
            text: "HMC",
          },
          {
            value: "HMI",
            text: "HMI",
          },
          {
            value: "HTMV",
            text: "HTMV",
          },
        ],
      },
    },
    {
      dataField: "ModelCode",
      visible: true,
      caption: t("ModelCode"),
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
      dataField: "WarrantyDateStartFromTo",
      caption: t("WarrantyDateStartFromTo"),
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
              defaultStartDate={
                searchCondition.current?.WarrantyDateStartFromTo[0]
              }
              // defaultEndDate={searchCondition.current?.WarrantyDateStartFromTo[1]}
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            >
              <Validator
                validationGroup={formComponent.option("validationGroup")}
                validationRules={[
                  RequiredField(t("DateFromToToIsRequired")),
                ]}
              >
                <RequiredRule message={t("WarrantyDateStartFromToIsRequired")} />
              </Validator>

            </DateRangeBox>
          </div>
        );
      },
    },
    {
      dataField: "WarrantyDateEndFromTo",
      caption: t("WarrantyDateEndFromTo"),
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
              defaultStartDate={
                searchCondition.current?.WarrantyDateEndFromTo[0]
              }
              // defaultEndDate={searchCondition.current?.WarrantyDateEndFromTo[1]}
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
      dataField: "VIN",
      visible: true,
      caption: t("VIN"),
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
        dataField: "ModelCode",
        caption: t("ModelCode"),
        visible: true,
      },
      {
        dataField: "VIN",
        caption: t("VIN"),
        visible: true,
      },
      {
        dataField: "StoreDate",
        caption: t("StoreDate"),
        visible: true,
      },
      {
        dataField: "DeliveryDate",
        caption: t("DeliveryDate"),
        visible: true,
      },
      {
        dataField: "KM",
        caption: t("KM"),
        visible: true,
      },
      {
        dataField: "ExpiredDateWarranty",
        caption: t("ExpiredDateWarranty"),
        visible: true,
      },
    ];
  }, []);
  1;

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
            <div className={"w-[300px]"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition.current}
                onSearch={handleSearch}
                storeKey={"ThongKeXeConHanBaoHanh-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={false}
            />
            <ScrollView height={windowSize.height - 120}>
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
                storeKey={"ThongKeXeConHanBaoHanh-colums"}
                editMode={false}
                defaultPageSize={9999999}
                isHiddenCheckBox
                isHidenHeaderFilter
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
