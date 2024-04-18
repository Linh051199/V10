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
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

interface ReportParam {
  DateFrom: Date;
  DateTo: Date;
  Status: "A" | "P" | "";
  VinNo: string;
  FlagDataWH: 1 | 0;
  DateFromTo: any;
}

export const ThongKeBaoHanhTheoModelPage = () => {
  const { t } = useI18n("ThongKeBaoHanhTheoModel");
  const gridRef: any = useRef();
  const searchCondition = useRef<any>({
    DateFromTo: [validateTimeStartDayOfMonth, new Date()],
    DealerCode: "",
    ModelCode: "",
    FlagDataWH: 0,
  });
  const setLoad = useSetAtom(loadPanelAtom);
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
    const response = await api.Rpt_DMSSerThongKeBaoHanhTheoModel_SearchHQ({
      DealerCode: searchCondition.current.DealerCode ?? "",
      DeliveryDateFrom: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      DeliveryDateTo: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      ModelCode: searchCondition.current.ModelCode ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    });
    if (response?.isSuccess) {
      console.log(97, response.Data.lst_Rpt_DMSSer_ThongKeBaoHanhTheoModel_HQ);
      return {
        ...response,
        DataList: response.Data.lst_Rpt_DMSSer_ThongKeBaoHanhTheoModel_HQ,
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

  const handleSearch = async (data: any) => {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      // setGettingData(true);
      console.log(115, data);
      searchCondition.current = data;
      gridRef?.current?.refetchData();
      // setGettingData(false);
    }
  };

  const showError = useSetAtom(showErrorAtom);
  const handleExport = async () => {
    setLoad(true)
    const result = await api.Rpt_DMSSerThongKeBaoHanhTheoModel_ExportSearchHQ({
      DealerCode: searchCondition.current.DealerCode ?? "",
      DeliveryDateFrom: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      DeliveryDateTo: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
      ModelCode: searchCondition.current.ModelCode ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    });
    if (result.isSuccess && result.Data) {
      setLoad(false)
      toast.success(t("Download successfully!"));
      window.location.href = result.Data;
    } else {
      setLoad(false)
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
  const handleExportDetail = async () => {
    setLoad(true)
    const result =
      await api.Rpt_DMSSerThongKeBaoHanhTheoModel_ExportDetailSearchHQ({
        DealerCode: searchCondition.current.DealerCode ?? "",
        DeliveryDateFrom: searchCondition.current.DateFromTo[0]
          ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
          : "",
        DeliveryDateTo: searchCondition.current.DateFromTo[1]
          ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
          : "",
        ModelCode: searchCondition.current.ModelCode ?? "",
        FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
      });
    if (result.isSuccess && result.Data) {
      setLoad(false)
      toast.success(t("Download successfully!"));
      window.location.href = result.Data;
    } else {
      setLoad(false);
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

  const { data: listModelCode, isLoading: isGettingModelCode } = useQuery({
    queryKey: ["getallactiveModelCode"],
    queryFn: async () => {
      const response = await api.Ser_Mst_ModelAudImageApi_GetActive();
      if (response.isSuccess) {
        return [
          {
            ModelCode: "",
            ModelName: "All"
          },
          ...response.DataList!
        ];
      }
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
      return null;
    },
  });


  const { data: dealerList, isLoading: isGettingDealerList } = useQuery({
    queryKey: ["dealer-list"],
    queryFn: async () => {
      const response = await api.Mst_Dealer_GetAllActive();
      if (response.isSuccess) {
        return [
          {
            DealerCode: "",
            DealerName: "All"
          },
          ...response.DataList!
        ]
      }
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
      return null;
    },
  });

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
        // item ? `${item.DealerCode} - ${item.DealerName}` : "",
        { return item ? item.DealerCode === "" ? `${item.DealerName}` : `${item.DealerCode} - ${item.DealerName}` : "" },
        valueExpr: "DealerCode",
        showClearButton: true,
        items: dealerList ?? []
      },
    },
    {
      dataField: "ModelCode",
      visible: true,
      caption: t("ModelCode"),
      editorType: "dxSelectBox",
      editorOptions: {
        showClearButton: true,
        displayExpr: (item: any) =>
        // item.ModelCode == "" ? item.ModelName : 
        {
          return item ? item.ModelCode === "" ? `${item.ModelName}` : `${item.ModelCode} - ${item.ModelName}` : ""
        },
        valueExpr: "ModelCode",
        items: listModelCode ?? []
      },
    },
    {
      dataField: "DateFromTo",
      caption: t("DateFromTo"),
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
              defaultStartDate={searchCondition.current?.DateFromTo[0]}
              defaultEndDate={searchCondition.current?.DateFromTo[1]}
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
        width: 130,
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
        dataField: "TotalAmount",
        caption: t("TotalAmount"),
        visible: true,
      },
      {
        dataField: "CountBH",
        caption: t("CountBH"),
        visible: true,
      },
      {
        dataField: "TOTALAMOUNT",
        caption: t("TOTALAMOUNT"),
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
          onExportExcelDetail={handleExportDetail}
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
                storeKey={"ThongKeBaoHanhTheoModel-search"}
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
              isHidenHeaderFilter={true}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              storeKey={"ThongKeBaoHanhTheoModel-colums"}
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
