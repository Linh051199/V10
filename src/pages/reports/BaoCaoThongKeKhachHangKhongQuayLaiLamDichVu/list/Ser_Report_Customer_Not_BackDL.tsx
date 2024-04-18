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
import { PageHeader } from "../components";
import { RequiredField } from "@packages/common/Validation_Rules";
import { nanoid } from "nanoid";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { validateMajorTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { useSer_Report_Customer_Not_BackColumns } from "../components/useReportColumns";
import { Ser_Report_Customer_Not_BackParam } from "@/packages/api/clientgate/report/Ser_Report_Customer_Not_BackApi";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";

export const Ser_Report_Customer_Not_BackDLPage = () => {
  const { t } = useI18n("Ser_Report_Customer_Not_Back");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { isHQ } = usePermissions();
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const permission = usePermissions();
  const searchCondition = useRef<Ser_Report_Customer_Not_BackParam>({
    DealerCode: permission.DealerCode,
    FlagDataWH: 0,
    DateCount: 0,
  } as Ser_Report_Customer_Not_BackParam);

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
        return resp.DataList;
      }
    }
  );

  const searchFields: IItemProps[] = [
    {
      caption: t("DealerCode"),
      dataField: "DealerCode",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: dealerList ?? [],
        displayExpr: (item: any) =>
          item ? `${item.DealerCode} - ${item.DealerName}` : "",
        valueExpr: "DealerCode",
        readOnly: true,
      },
    },
    {
      dataField: "DateCount",
      visible: true,
      caption: t("DateCount"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "6",
            text: "6 Tháng",
          },
          {
            value: "12",
            text: "12 Tháng",
          },
          {
            value: "24",
            text: "24 Tháng",
          },
          {
            value: "36",
            text: "36 Tháng",
          },
        ],
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
    const response = await api.Ser_Report_Customer_Not_Back_ExportSearchDL({
      DateCount: searchCondition.current.DateCount ?? 0,
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    } as Ser_Report_Customer_Not_BackParam);

    if (response?.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = response?.Data as string;
    } else {
      toast.error(t("DownloadUnsuccessfully"));
      showError({
        message: t(response?._strErrCode),
        _strErrCode: response?._strErrCode,
        _strTId: response?._strTId,
        _strAppTId: response?._strAppTId,
        _objTTime: response?._objTTime,
        _strType: response?._strType,
        _dicDebug: response?._dicDebug,
        _dicExcs: response?._dicExcs,
      });
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

  const columns = useSer_Report_Customer_Not_BackColumns({
    data: [],
  });
  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Ser_Report_Customer_Not_Back-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

  const fetchData = async () => {
    const resp = await api.Ser_Report_Customer_Not_Back_SearchDL({
      DateCount: searchCondition.current.DateCount ?? 0,
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    } as Ser_Report_Customer_Not_BackParam);

    const length = resp?.Data?.Lst_Ser_ReportCustomerNotBack?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.Lst_Ser_ReportCustomerNotBack,
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
                storeKey={"Ser_Report_Customer_Not_Back-search"}
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
                toolbarItems={[]}
                dataSource={[]} // cars
                columns={columns}
                fetchData={fetchData}
                keyExpr={"BienSo"}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                storeKey={"Ser_Report_Customer_Not_Back"}
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
