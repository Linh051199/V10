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
  FromDate: Date;
  ToDate: Date;
  FlagDataWH: 1 | 0;
  DateFromTo: Date[] | null[];
  DealerCode: any
  ROWID: any
  ROID: any
  Status: any
  FrameNo: any
  PlateNo: any
  IsGetDetail: any
}

export const Rpt_BaoHanhXeSOLATIPage = () => {
  const { t } = useI18n("Rpt_BaoHanhXeSOLATI");
  const gridRef: any = useRef();
  const searchCondition = useRef<any>({
    DateFromTo: [validateTimeStartDayOfMonth, new Date()],
    FlagDataWH: 0,
    DealerCode: "",
    ROWID: "",
    ROID: "",
    Status: "",
    FrameNo: "",
    PlateNo: "",
    IsGetDetail: 1
  } as ReportParam);
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
    const response = await api.Rpt_BaoHanhXeSOLATI_SearchHQ({
      ...searchCondition.current,
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",

    });
    if (response?.isSuccess) {
      return {
        ...response,
        DataList: response?.Data?.lst_Ser_ROWarrantyReport?.map(
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
    const result = await api.Rpt_BaoHanhXeSOLATI_ExportSearchHQ({
      ...searchCondition.current,
      FromDate: searchCondition.current.DateFromTo[0]
        ? format(searchCondition.current.DateFromTo[0], "yyyy-MM-dd")
        : "",
      ToDate: searchCondition.current.DateFromTo[1]
        ? format(searchCondition.current.DateFromTo[1], "yyyy-MM-dd")
        : "",
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
      dataField: "FrameNo",
      visible: true,
      caption: t("FrameNo"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("input"),
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
              className="dateRange"
              displayFormat="yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={searchCondition.current?.DateFromTo[0]}
              defaultEndDate={searchCondition.current?.DateFromTo[1]}
              useMaskBehavior={true}
              validationMessageMode="always"
              validationMessagePosition={"top"}
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
                <RequiredRule message={t("DateFromToToIsRequired")} />
              </Validator>
            </DateRangeBox>
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
        dataField: "CarStatus",
        caption: t("CarStatus"),
        visible: true,
      },
      {
        dataField: "WarrantyRegistrationDate",
        caption: t("WarrantyRegistrationDate"),
        visible: true,
      },
      {
        dataField: "WarrantyRegistrationDate",
        caption: t("WarrantyRegistrationDate"),
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
                storeKey={"Rpt_BaoHanhXeSOLATI-search"}
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
              storeKey={"Rpt_BaoHanhXeSOLATI-colums"}
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
