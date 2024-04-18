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
import { RequiredField, requiredType } from "@packages/common/Validation_Rules";
import { nanoid } from "nanoid";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { HeaderFormView } from "../components/header-form-view";
import { useRpt_Ability_Supply_PartsColumns } from "../components/useReportColumns";
import { Rpt_Ability_Supply_PartsParam } from "@/packages/api/clientgate/report/Rpt_Ability_Supply_PartsApi";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";

export const Rpt_Ability_Supply_PartsHQPage = () => {
  const { t } = useI18n("Rpt_Ability_Supply_Parts");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const gridRef: any = useRef();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const headerFormViewRef = useRef<any>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const [isGetingData, setGettingData] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const searchCondition = useRef<Rpt_Ability_Supply_PartsParam>({
    FlagDataWH: 0,
    PeriodMonth: new Date(),
    PartCode: "",
    VieName: "",
    RespondType: 0,
    DealerCode: "",
  } as Rpt_Ability_Supply_PartsParam);

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
      },
    },
    {
      dataField: "PeriodMonth",
      caption: t("PeriodMonth"),
      label: {
        text: t("PeriodMonth"),
      },
      visible: true,
      editorOptions: {
        type: "date",
        calendarOptions: {
          maxZoomLevel: "year",
        },
        openOnFieldClick: true,
        displayFormat: "yyyy-MM",
        validationRules: [RequiredField("IsRequired")],
        showClearButton: true,
      },
      editorType: "dxDateBox",
      validationRules: [requiredType],
    },
    {
      dataField: "RespondType",
      visible: true,
      caption: t("RespondType"),
      editorType: "dxSelectBox",
      editorOptions: {
        showClearButton: true,
        validationRules: [RequiredField("IsRequired")],
        displayExpr: "text",
        valueExpr: "value",
        items: [
          {
            value: "1",
            text: "Đáp ứng",
          },
          {
            value: "2",
            text: "Không đáp ứng",
          },
        ],
      },
      validationRules: [requiredType],
    },
    {
      dataField: "PartCode",
      caption: "PartCode",
      visible: true,
      editorType: "dxTextBox",
    },
    {
      dataField: "VieName",
      caption: "VieName",
      visible: true,
      editorType: "dxTextBox",
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
        (a, b) =>
          columnOrders.indexOf(a.dataField) - columnOrders.indexOf(b.dataField)
      );
      setColumnsState(outputColumns);
    }
  }, []);

  const handleExport = async () => {
    const response = await api.Rpt_Ability_Supply_Parts_ExportSearchHQ({
      PeriodMonth: searchCondition.current.PeriodMonth
        ? format(searchCondition.current.PeriodMonth, "yyyy-MM-dd")
        : "",
      PartCode: searchCondition.current.PartCode ?? "",
      VieName: searchCondition.current.VieName ?? "",
      RespondType: searchCondition.current.RespondType ?? "",
      DealerCode: searchCondition.current.DealerCode ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    } as Rpt_Ability_Supply_PartsParam);

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

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible: boolean) => !visible);
  };

  const columns = useRpt_Ability_Supply_PartsColumns({
    data: [],
  });

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: "Rpt_Ability_Supply_Parts-columns",
  });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      saveState(changes);
      return changes;
    },
    columns
  );

  const { isHQ } = usePermissions();

  const fetchData = async () => {
    const resp = await api.Rpt_Ability_Supply_Parts_SearchHQ({
      PeriodMonth: searchCondition.current.PeriodMonth
        ? format(searchCondition.current.PeriodMonth, "yyyy-MM")
        : "",
      PartCode: searchCondition.current.PartCode ?? "",
      VieName: searchCondition.current.VieName ?? "",
      RespondType: searchCondition.current.RespondType ?? "",
      DealerCode: searchCondition.current.DealerCode ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? 1 : 0,
    } as Rpt_Ability_Supply_PartsParam);

    if (resp?.isSuccess) {
      headerFormViewRef?.current?.setDataForm(resp?.Data);
      return {
        DataList: resp?.Data?.Lst_Rpt_AbilitySupplyParts,
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
                storeKey={"Rpt_Ability_Supply_Parts-search"}
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
              <HeaderFormView gridRef={gridRef} ref={headerFormViewRef} />
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
                storeKey={"Rpt_Ability_Supply_Parts"}
                editMode={false}
                defaultPageSize={9999999}
                isHiddenCheckBox
                isHidenHeaderFilter
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
