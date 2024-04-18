import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useI18n } from "@/i18n/useI18n";
import React, {
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
import PivotGrid, {
  Export,
  FieldChooser,
  FieldPanel,
  LoadPanel as PivotLoadPanel,
  Scrolling,
  StateStoring,
} from "devextreme-react/pivot-grid";
import { useQuery } from "@tanstack/react-query";
import PivotGridDataSource, {
  Field,
} from "devextreme/ui/pivot_grid/data_source";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { toast } from "react-toastify";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { PageHeader } from "../components";
import Form, { IItemProps } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { DateRangeBox, LoadPanel } from "devextreme-react";
import { nanoid } from "nanoid";
import { ContentReadyEvent, ExportingEvent } from "devextreme/ui/pivot_grid";
import { commonExportExcel } from "@/packages/common/commonExportExcel";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { showErrorAtom } from "@/packages/store";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { SelectField } from "@/packages/components/select-field";
import { RequiredField } from "@/packages/common/Validation_Rules";

export const BaoCaoPivotChamTonToiThieu = () => {
  const { t } = useI18n("BaoCaoPivotChamTonToiThieu");

  const [searchCondition, setSearchCondition] = useState<any>({
    FlagDataWH: false,
    SDMDlvStartDateFromTo: [validateTimeStartDayOfMonth, new Date()],
  } as any);
  const windowSize = useWindowSize();
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();
  const [gettingData, setGettingData] = useState(false);
  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    reloading();
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "report",
      "Rpt_PivotTransPlan",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        // const resp = await api.Rpt_PivotTransPlan_SearchHQ({
        //   ExpectedDateFrom: searchCondition.SDMDlvStartDateFromTo[0]
        //     ? format(searchCondition.SDMDlvStartDateFromTo[0], "yyyy-MM-dd")
        //     : "",
        //   ExpectedDateTo: searchCondition.SDMDlvStartDateFromTo[1]
        //     ? format(searchCondition.SDMDlvStartDateFromTo[1], "yyyy-MM-dd")
        //     : "",
        //   SDMDlvStartDateFrom: searchCondition.SDMDlvStartDateFromTo[0]
        //     ? format(searchCondition.SDMDlvStartDateFromTo[0], "yyyy-MM-dd")
        //     : "",
        //   SDMDlvStartDateTo: searchCondition.SDMDlvStartDateFromTo[1]
        //     ? format(searchCondition.SDMDlvStartDateFromTo[1], "yyyy-MM-dd")
        //     : "",
        //   FlagDataWH: searchCondition.FlagDataWH ? 1 : 0,
        // } as Rpt_PivotTransPlanParam);
        // return resp;
        return [];
      } else {
        return null;
      }
    },
    enabled: true,
  });
  const handleSearch = async (data: any) => {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      setGettingData(true);
      setSearchCondition(searchCondition);
      reloading();
      setGettingData(false);
    }
  };

  const fields = useMemo<Field[]>(() => {
    return [
      {
        caption: t("TenDaiLy"),
        dataField: "TenDaiLy",
        area: "filter",
        areaIndex: 1,
      },
      {
        caption: t("MaVatTu"),
        dataField: "MaVatTu",
        area: "row",
        areaIndex: 0,
      },
      {
        caption: t("TenVatTu"),
        dataField: "TenVatTu",
        area: "row",
        areaIndex: 1,
      },
      {
        caption: t("DonViTinh"),
        dataField: "DonViTinh",
        area: "row",
        areaIndex: 2,
      },
      {
        caption: t("SLTonToiThieu"),
        dataField: "SLTonToiThieu",
        area: "row",
        areaIndex: 3,
      },
      {
        caption: t("TonKho"),
        dataField: "TonKho",
        area: "data",
        showGrandTotals: true,
        showTotals: true,
        summaryType: "count",
        isMeasure: true, // allows the end-user to place this f
      },
      {
        caption: t("MaDaiLy"),
        dataField: "MaDaiLy",
        area: "column",
        areaIndex: 1,
      },
    ];
  }, [t]);

  const showError = useSetAtom(showErrorAtom);

  // handle export excel pivotgrid
  const onExportExcelByPivot = useCallback(
    (e: ExportingEvent) => {
      if (loadingKey !== "0") {
        commonExportExcel(e, "Rpt_PivotTransPlan_ExportExcelByPivot.xlsx", t);
        e.cancel = true;
      } else {
        toast.info(t("PleaseSearchToExportExcel"));
      }
    },
    [loadingKey]
  );

  const searchFields: IItemProps[] = [
    {
      dataField: "DealerCode",
      caption: t("DaiLy"),
      label: { text: t("DaiLy") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formInstance } = param;
        const formData = formInstance.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={"100%"}
            formInstance={formInstance}
            dataField={dataField}
            items={[]}
            valueExpr={"DealerCode"}
            displayExpr={"DealerName"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            showClearButton={false}
            placeholder={t("Select")}
          />
        );
      },
    },
    {
      dataField: "MABOM",
      caption: t("MABOM"),
      label: { text: t("MABOM") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formInstance } = param;
        const formData = formInstance.option("formData");
        const value = formData[dataField];
        return (
          <SelectField
            width={"100%"}
            formInstance={formInstance}
            dataField={dataField}
            items={[]}
            valueExpr={"MABOM"}
            displayExpr={"MABOM"}
            onValueChanged={(e: any) => {
              formInstance.updateData(dataField, e.value);
            }}
            defaultValue={value}
            showClearButton={false}
            placeholder={t("Select")}
          />
        );
      },
    },
  ];
  const dataSource = new PivotGridDataSource({
    fields: fields,
    // store: data?.Data?.Lst_Rpt_PivotTransPlan,
    store: [],
  });
  const handleChangeNoData = (args: ContentReadyEvent) => {
    // const checkData = data?.Data?.Lst_Rpt_PivotTransPlan;
    const checkData: never[] | undefined = [];
    const noDataElement: HTMLElement | null = args.component
      .element()
      .querySelector(".dx-pivotgrid-nodata");
    if (noDataElement && checkData === undefined) {
      setTimeout(() => {
        noDataElement.style.display = "none";
      }, 10);
    }
  };

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_PivotTransPlan_search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isLoading || gettingData}
              showIndicator={true}
              showPane={true}
            />

            <div className={"w-full mt-4"}>
              <PivotGrid
                id="pivotgrid"
                dataSource={dataSource}
                allowSortingBySummary={true}
                allowFiltering={true}
                showBorders={true}
                disabled={false} // chặn người dùng không cho tương tác với màn hình giao diện
                onCellClick={(e: any) => {}} // lấy ra thông in của cột khi mà mình click vào bất kì ô nào
                onCellPrepared={(e: any) => {}} // Một chức năng được thực thi sau khi một ô lưới trục được tạo.
                onContextMenuPreparing={(e) => {}} // A function that is executed * before the context menu is rendered. *
                onExporting={onExportExcelByPivot} // A function that is executed before data is exported. // thực thi sau khi xuất file
                onOptionChanged={(e) => {}} // A function that is executed after a UI component property is changed.
                showColumnGrandTotals={true} // chỉ định hiển thị tổng tính tổng hay không
                showColumnTotals={true} // chỉ định có hiện cột tính tổng của cột hay không
                showRowGrandTotals={true} // ngược lại với showColumnGrandTotals
                showRowTotals={true} // ngược lại với showColumnTotals
                showTotalsPrior={"none"} // 'both' | 'columns' | 'none' | 'rows' => default: 'none'
                height={windowSize.height - 150}
                // width={200}
                allowExpandAll={true}
                allowSorting={true}
                onContentReady={handleChangeNoData}
              >
                <Scrolling mode={"virtual"} />
                <FieldChooser enabled={true} height={400} />
                <PivotLoadPanel
                  enabled={true}
                  showPane={true}
                  showIndicator={true}
                />
                <Export enabled={true} />
                <StateStoring
                  enabled={true}
                  storageKey={"report-BaoCaoPivotChamTonToiThieu"}
                />
                <FieldPanel visible={true} />
              </PivotGrid>
            </div>
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
