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
import { Header, ReportParam } from "../components";
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
import Form, { IItemProps, RequiredRule } from "devextreme-react/form";
import { useSetAtom } from "jotai";
import { DateRangeBox, LoadPanel, Validator } from "devextreme-react";
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

export const Rpt_ThongKeBaoHanhTheoPhuTungPage = () => {
  const { t } = useI18n("Rpt_ThongKeBaoHanhTheoPhuTung");

  const [searchCondition, setSearchCondition] = useState<any>({
    FlagDataWH: false,
    NgayGuiBaoCaoBaoHanh: [validateTimeStartDayOfMonth, null],
  } as any);
  const windowSize = useWindowSize();
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const api = useClientgateApi();
  const [gettingData, setGettingData] = useState(false);
  const formRef = useRef<any>();
  const checkBoxRef = useRef<Form>(null);
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const handleSearchWH = () => {
    reloading();
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "report",
      "Rpt_ThongKeBaoHanhTheoPhuTung",
      loadingKey,
      JSON.stringify(searchCondition),
    ],
    queryFn: async () => {
      if (loadingKey !== "0") {
        // const resp = await api.Rpt_ThongKeBaoHanhTheoPhuTung_SearchHQ({
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
        // } as Rpt_ThongKeBaoHanhTheoPhuTungParam);
        // return resp;
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
      console.log(109, formRef);
      if (formRef.current?.instance.validate().isValid) {
        console.log(110);
        // onSearch(formData);
      } else {
        return;
      }
      // setGettingData(true);
      // setSearchCondition({
      //   ...searchCondition,
      //   SDMDlvStartDateFrom: searchCondition.SDMDlvStartDateFromTo[0]
      //     ? format(searchCondition.SDMDlvStartDateFromTo[0], "yyyy-MM-dd")
      //     : "",
      //   SDMDlvStartDateTo: searchCondition.SDMDlvStartDateFromTo[1]
      //     ? format(searchCondition.SDMDlvStartDateFromTo[1], "yyyy-MM-dd")
      //     : "",
      // });
      // reloading();
      // setGettingData(false);
    }
  };

  const fields = useMemo<Field[]>(() => {
    return [
      {
        dataField: "MaDL",
        area: "data",
        areaIndex: 0,
      },
      {
        dataField: "TenDL",
        area: "filter",
        areaIndex: 0,
      },
      {
        dataField: "TenModel",
        area: "row",
        areaIndex: 0,
      },
      {
        dataField: "VIN",
        area: "row",
        areaIndex: 1,
      },
      {
        dataField: "SoBaoCaoBaoHanh",
        area: "row",
        areaIndex: 2,
      },
      {
        dataField: "NgayGuiBaoCaoBaoHanh",
        area: "row",
        areaIndex: 3,
      },
      {
        dataField: "NgayBaoHanh",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "SoKm",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "SoLuong",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "MaPhuTung",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "TenPhuTung",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "SoLuong",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "TongTien",
        area: "column",
        areaIndex: 0,
      },
      {
        dataField: "TOTAL",
        summaryType: "count",
      },
    ];
  }, [t]);

  const showError = useSetAtom(showErrorAtom);

  const handleExportDetail = async () => {
    if (loadingKey !== "0") {
      setGettingData(true);
      // const result = await api.Rpt_ThongKeBaoHanhTheoPhuTung_ExportDetailSearchHQ({
      //   // ExpectedDateFrom: format(searchCondition.ExpectedDateFrom, "yyyy-MM-dd"),
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
      // } as Rpt_ThongKeBaoHanhTheoPhuTungParam);
      // if (result.isSuccess && result.Data) {
      //   toast.success(t("Download successfully!"));
      //   window.location.href = result.Data;
      // } else {
      //   showError({
      //     message: t(result._strErrCode),
      //     _strErrCode: result._strErrCode,
      //     _strTId: result._strTId,
      //     _strAppTId: result._strAppTId,
      //     _objTTime: result._objTTime,
      //     _strType: result._strType,
      //     _dicDebug: result._dicDebug,
      //     _dicExcs: result._dicExcs,
      //   });
      // }
      setGettingData(false);
    } else {
      toast.warning("PleaseSearchBeforeExportExcelDetail");
    }
  };

  // handle export excel pivotgrid
  const onExportExcelByPivot = useCallback(
    (e: ExportingEvent) => {
      if (loadingKey !== "0") {
        commonExportExcel(
          e,
          "Rpt_ThongKeBaoHanhTheoPhuTung_ExportExcelByPivot.xlsx",
          t
        );
        e.cancel = true;
      } else {
        toast.info(t("PleaseSearchToExportExcel"));
      }
    },
    [loadingKey]
  );

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const searchFields: IItemProps[] = [
    {
      dataField: "NgayGuiBaoCaoBaoHanh",
      visible: true,
      caption: t("NgayGuiBaoCaoBaoHanh"),
      validationRules: [RequiredField(t("DeliveryEndDateFromTo"))],
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
              defaultStartDate={formData.NgayGuiBaoCaoBaoHanh[0]}
              defaultEndDate={formData.NgayGuiBaoCaoBaoHanh[1]}
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            >
              <Validator
                elementAttr={{
                  id: "checkAgainThisCode2",
                  class: "checkAgainThisCode2",
                }}
                validationGroup={"form"}
                validationRules={[
                  RequiredField(t("CreatedDateFromToIsRequired")),
                ]}
              >
                <RequiredRule message={t("CreatedDateFromToIsRequired")} />
              </Validator>
            </DateRangeBox>
          </div>
        );
      },
    },
    {
      dataField: "MaBOM",
      caption: t("MaBOM"),
      label: { text: t("MaBOM") },
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <SelectField
              width={270}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              displayExpr={(item: any) => {
                if (!item) {
                  return "";
                }
                return `${item.text} - ${item.value}`;
              }}
              items={[
                { text: "Tất cả", value: "" },
                { text: "Make to order", value: "MTO" },
                { text: "Make to stock", value: "MTS" },
              ]}
              valueExpr="value"
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
  const dataSource = new PivotGridDataSource({
    fields: fields,
    // store: data?.Data?.Lst_Rpt_ThongKeBaoHanhTheoPhuTung,
  });
  const handleChangeNoData = (args: ContentReadyEvent) => {
    // const checkData = data?.Data?.Lst_Rpt_ThongKeBaoHanhTheoPhuTung;
    // const noDataElement: HTMLElement | null = args.component
    //   .element()
    //   .querySelector(".dx-pivotgrid-nodata");
    // if (noDataElement && checkData === undefined) {
    //   setTimeout(() => {
    //     noDataElement.style.display = "none";
    //   }, 10);
    // }
  };

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onExportExcelDetail={handleExportDetail}
          onExportExcel={() => {}}
          toggleSearchPanel={handleToggleSearchPanel}
        ></PageHeader>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <div className={"w-[300px] h-full"}>
              <SearchPanelV2
                conditionFields={searchFields}
                data={searchCondition}
                onSearch={handleSearch}
                storeKey={"Rpt_ThongKeBaoHanhTheoPhuTung_search"}
                ref={formRef}
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
                  storageKey={"report-Rpt_ThongKeBaoHanhTheoPhuTung_columns"}
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
