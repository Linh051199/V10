import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { DateRangeBox, Form, Validator } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { IItemProps, RequiredRule } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useColumns } from "./components/columns";
import { PageHeader } from "./components/page-header";
import { Search_Ser_InvReportCardStockRpt_Params } from "@/packages/types/report/Ser_InvReportCardStockRpt";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { format } from "date-fns";
import {
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import usePrint from "@/components/print/usePrint";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const Ser_InvReportCardStockRptPage = () => {
  const { t } = useI18n("Ser_InvReportCardStockRpt");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const { quickPrint, previewPrint } = usePrint();
  const setLoad = useSetAtom(loadPanelAtom);

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();
  const gridRef: any = useRef();
  const searchCondition = useRef<
    Partial<Search_Ser_InvReportCardStockRpt_Params>
  >({
    FromDateFromTo: [validateTimeStartDayOfMonth, new Date()],
    PartCode: "",
    FlagDataWH: false,
  });
  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.Ser_InvReportCardStockRpt_SearchDL({
      FromDate: searchCondition.current.FromDateFromTo[0]
        ? format(
            searchCondition.current.FromDateFromTo[0] as Date,
            "yyyy-MM-dd"
          )
        : "",
      ToDate: searchCondition.current.FromDateFromTo[1]
        ? format(
            searchCondition.current.FromDateFromTo[1] as Date,
            "yyyy-MM-dd"
          )
        : "",
      DealerCode: searchCondition.current.DealerCode ?? "",
      PartCode: searchCondition.current.PartCode ?? "",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.lst_Ser_InvReportCardStockRpt?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Ser_InvReportCardStockRpt,
        PageCount: length / pageSize,
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
  //====================================CallAPI-end========================================

  //====================================handle========================================

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...data,
      FromDate: data.FromDateFromTo[0] ? data.FromDateFromTo[0] : "",
      ToDate: data.FromDateFromTo[1] ? data.FromDateFromTo[1] : "",
    };
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      gridRef?.current?.refetchData();
    }
  };
  const handleSearchWH = () => {
    gridRef?.current?.refetchData();
  };

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };
  const handlePrint = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      setLoad(true);
      const response = await api.Ser_InvReportCardStockRpt_PrintDL({
        FromDate: searchCondition.current.FromDateFromTo[0]
          ? format(
              searchCondition.current.FromDateFromTo[0] as Date,
              "yyyy-MM-dd"
            )
          : "",
        ToDate: searchCondition.current.FromDateFromTo[1]
          ? format(
              searchCondition.current.FromDateFromTo[1] as Date,
              "yyyy-MM-dd"
            )
          : "",
        DealerCode: searchCondition.current.DealerCode ?? "",
        PartCode: searchCondition.current.PartCode ?? "",
        FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
      });
      if (response.isSuccess && response.Data) {
        toast.success(t("Download successfully!"));
        quickPrint({
          url: response.Data!,
        });
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
      setLoad(false);
    } else {
      toast.warning("PleaseSearchBeforePrint");
    }
  };
  const handleExport = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      setLoad(true);
      const response = await api.Ser_InvReportCardStockRpt_ExportSearchDL({
        FromDate: searchCondition.current.FromDateFromTo[0]
          ? format(
              searchCondition.current.FromDateFromTo[0] as Date,
              "yyyy-MM-dd"
            )
          : "",
        ToDate: searchCondition.current.FromDateFromTo[1]
          ? format(
              searchCondition.current.FromDateFromTo[1] as Date,
              "yyyy-MM-dd"
            )
          : "",
        DealerCode: searchCondition.current.DealerCode ?? "",
        PartCode: searchCondition.current.PartCode ?? "",
        FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
      });
      if (response.isSuccess && response.Data) {
        toast.success(t("Download successfully!"));
        window.location.href = response.Data as any;
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
      setLoad(false);
    } else {
      toast.warning("PleaseSearchBeforeExportExcel");
    }
  };

  //====================================handle-end========================================

  //====================================searchField========================================
  const searchFields: IItemProps[] = [
    {
      dataField: "PartCode",
      visible: true,
      caption: t("PartCode"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationRules: [RequiredField("IsRequired")],
        validationMessageMode: "always",
        validationGroup: "form",
      },
      validationRules: [requiredType],
    },
    {
      dataField: "DVVT",
      visible: true,
      caption: t("DVVT"),
      editorType: "dxTextBox",
      disabled: true,
    },
    {
      dataField: "TenHang",
      visible: true,
      caption: t("TenHang"),
      editorType: "dxTextBox",
      disabled: true,
    },
    {
      dataField: "FromDateFromTo",
      caption: t("FromDateFromTo"),
      validationRules: [requiredType],
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              width={"100%"}
              className="dateRange "
              displayFormat=" yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={searchCondition?.current.FromDateFromTo[0]}
              defaultEndDate={searchCondition?.current.FromDateFromTo[1]}
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              validationMessageMode="always"
              // validationGroup={"form"}
              validationMessagePosition={"top"}
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

  //====================================searchField-end========================================

  const columns = useColumns();

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeader
          onPrint={handlePrint}
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
                storeKey={"Ser_InvReportCardStockRpt-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]}
              columns={columns}
              fetchData={fetchData}
              keyExpr={"RefNo"}
              isHidenHeaderFilter
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              storeKey={"Ser_InvReportCardStockRpt-columns"}
              editMode={false}
              customHeight={windowSize.height - 110}
              defaultPageSize={9999999}
              isHiddenCheckBox
            >
              <Summary>
                <TotalItem
                  column={"SLN"}
                  summaryType={"sum"}
                  displayFormat={`${t("Sum")} : {0}`}
                  valueFormat="#,##0.##"
                ></TotalItem>
                <TotalItem
                  column={"SLX"}
                  summaryType={"sum"}
                  displayFormat={`${t("Sum")} : {0}`}
                  valueFormat="#,##0.##"
                ></TotalItem>
              </Summary>
            </GridViewOne>
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
