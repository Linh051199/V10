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
import { DateRangeBox, Form } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useColumns } from "./components/columns";
import { PageHeader } from "./components/page-header";
import { Search_SerReportReceivableDebitRpt_Params } from "@/packages/types/report/SerReportReceivableDebitRpt";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { format } from "date-fns";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { usePermissions } from "@/packages/contexts/permission";
import usePrint from "@/components/print/usePrint";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const SerReportReceivableDebitRptPage = () => {
  const { t } = useI18n("SerReportReceivableDebitRpt");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const { isHQ, DealerCode } = usePermissions();
  const { quickPrint, previewPrint } = usePrint();
  const setLoad = useSetAtom(loadPanelAtom);

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);

  const gridRef: any = useRef();
  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();
  const searchCondition = useRef<
    Partial<Search_SerReportReceivableDebitRpt_Params>
  >({
    FlagDataWH: false,
    ToDate: new Date(),
  });
  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.SerReportReceivableDebitRpt_SearchDL({
      DealerCode: DealerCode,
      ToDate: searchCondition.current.ToDate
        ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
        : "",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    });
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.Lst_Ser_ReportReceivableDebitRpt?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.Lst_Ser_ReportReceivableDebitRpt,
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
  const handleExport = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      setLoad(true);
      const resp = await api.SerReportReceivableDebitRpt_ExportSearchDL({
        DealerCode: DealerCode,
        ToDate: searchCondition.current.ToDate
          ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
          : "",
        FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
      });

      if (resp?.isSuccess) {
        toast.success(t("Download successfully!"));
        window.location.href = resp.Data as any;
      } else {
        showError({
          message: t(resp!._strErrCode),
          _strErrCode: resp!._strErrCode,
          _strTId: resp!._strTId,
          _strAppTId: resp!._strAppTId,
          _objTTime: resp!._objTTime,
          _strType: resp!._strType,
          _dicDebug: resp!._dicDebug,
          _dicExcs: resp!._dicExcs,
        });
      }
      setLoad(false);
    } else {
      toast.warning("PleaseSearchBeforeExportExcel");
    }
  };

  const handlePrint = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      setLoad(true);
      const response = await api.SerReportReceivableDebitRpt_PrintDL({
        DealerCode: DealerCode,
        ToDate: searchCondition.current.ToDate
          ? format(searchCondition.current.ToDate as Date, "yyyy-MM-dd")
          : "",
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

  //====================================handle-end========================================

  //====================================searchField========================================
  const searchFields: IItemProps[] = [
    {
      dataField: "ToDate",
      caption: t("ToDate"),
      editorType: "dxDateBox",
      visible: true,
      editorOptions: {
        displayFormat: "yyyy-MM-dd",
        openOnFieldClick: true,
        validationMessageMode: "always",
        showClearButton: true,
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
                storeKey={"SerReportReceivableDebitRpt-search"}
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
              keyExpr={"ORDERPLANNO"}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              isHidenHeaderFilter
              storeKey={"SerReportReceivableDebitRpt-columns"}
              customHeight={windowSize.height - 110}
              editMode={false}
              defaultPageSize={9999999}
              isHiddenCheckBox
            >
              <Summary>
                <TotalItem
                  column={"DebitAmount"}
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
