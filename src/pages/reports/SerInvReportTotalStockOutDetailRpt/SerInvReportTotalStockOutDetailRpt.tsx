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
import { Search_SerInvReportTotalStockOutDetailRpt_Params } from "@/packages/types/report/SerInvReportTotalStockOutDetailRpt";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { format } from "date-fns";
import usePrint from "@/components/print/usePrint";
import { CheckboxField } from "@/packages/components/checkbox-field";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import { useQuery } from "@tanstack/react-query";
import {
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const SerInvReportTotalStockOutDetailRptPage = () => {
  const { t } = useI18n("SerInvReportTotalStockOutDetailRpt");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { isHQ, DealerCode } = usePermissions();
  const { quickPrint, previewPrint } = usePrint();
  const setLoad = useSetAtom(loadPanelAtom);

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);
  const gridRef: any = useRef();
  const searchCondition = useRef<
    Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>
  >({
    FromDateFromTo: [validateTimeStartDayOfMonth, new Date()],
    DealerCode: DealerCode,
    FlagDataWH: false,
  });
  const searchConditionHTC = useRef<
    Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>
  >({
    FromDateFromTo: [validateTimeStartDayOfMonth, new Date()],
    DealerCode: "",
    FlagDataWH: false,
  });

  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const resp = await api.SerInvReportTotalStockOutDetailRpt_SearchHQ({
          DealerCode: searchCondition?.current?.DealerCode ?? "",
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
          FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
        });
        return resp;
      })
      .with(false, async () => {
        const resp = await api.SerInvReportTotalStockOutDetailRpt_SearchDL({
          DealerCode: DealerCode,
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
          FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
        });
        return resp;
      })
      .otherwise(() => null);
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length =
      resp?.Data?.lst_Ser_InvReportTotalStockOutDetailRpt?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Ser_InvReportTotalStockOutDetailRpt,
        PageCount: length / pageSize,
        ItemCount: length,
        PageSize: 99999,
      };
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

    return {
      DataList: [],
      PageCount: 0,
      ItemCount: 0,
      PageSize: 99999,
    };
  };
  const { data: Dealer_GetAllActive, isLoading } = useQuery(
    ["Dealer_GetAllActive-SerInvReportTotalStockOutDetailRptHTV"],
    async () => {
      const resp = await api.Dealer_GetAllActive();
      if (resp.DataList) {
        return resp.DataList;
      }
    }
  );
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

  const handleExport = async () => {
    const crData = gridRef?.current?.getData();
    if (crData && crData?.length > 0) {
      setLoad(true);
      const resp = await match(isHQ())
        .with(true, async () => {
          const resp =
            await api.SerInvReportTotalStockOutDetailRpt_ExportSearchHQ({
              DealerCode: searchCondition?.current?.DealerCode ?? "",
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
              FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
            });
          return resp;
        })
        .with(false, async () => {
          const resp =
            await api.SerInvReportTotalStockOutDetailRpt_ExportSearchDL({
              DealerCode: DealerCode,
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
              FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
            });
          return resp;
        })
        .otherwise(() => null);

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
      const resp = await match(isHQ())
        .with(true, async () => {
          const resp = await api.SerInvReportTotalStockOutDetailRpt_PrintHQ({
            DealerCode: searchCondition?.current?.DealerCode ?? "",
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
            FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
          });
          return resp;
        })
        .with(false, async () => {
          const resp = await api.SerInvReportTotalStockOutDetailRpt_PrintDL({
            DealerCode: DealerCode,
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
            FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
          });
          return resp;
        })
        .otherwise(() => null);

      if (resp?.isSuccess && resp.Data) {
        toast.success(t("Download successfully!"));
        quickPrint({
          url: resp.Data!,
        });
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
      toast.warning("PleaseSearchBeforePrint");
    }
  };

  //====================================handle-end========================================

  //====================================searchField========================================
  const searchFields: IItemProps[] = [
    {
      dataField: "FromDateFromTo",
      caption: t("FromDateFromTo"),
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
            />
          </div>
        );
      },
    },
    {
      dataField: "DealerCode",
      visible: true,
      caption: t("DealerCode"),
      editorType: "dxTextBox",
      editorOptions: {
        readOnly: true,
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
  const searchFieldsHTC: IItemProps[] = [
    {
      dataField: "FromDateFromTo",
      caption: t("FromDateFromTo"),
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
            />
          </div>
        );
      },
    },
    {
      dataField: "DealerCode",
      visible: true,
      caption: t("DealerCode"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
        items: Dealer_GetAllActive,
        validationRules: [RequiredField("IsRequired")],
        validationMessageMode: "always",
        validationGroup: "form",
      },
      validationRules: [requiredType],
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
              {DealerCode === "HTC" ? (
                <SearchPanelV2
                  conditionFields={searchFieldsHTC}
                  data={searchConditionHTC.current}
                  onSearch={handleSearch}
                  storeKey={"SerInvReportTotalStockOutDetailRptHTC-search"}
                />
              ) : (
                <SearchPanelV2
                  conditionFields={searchFields}
                  data={searchCondition.current}
                  onSearch={handleSearch}
                  storeKey={"SerInvReportTotalStockOutDetailRpt-search"}
                />
              )}
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]}
              columns={columns}
              fetchData={fetchData}
              keyExpr={"PartCode"}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              isHidenHeaderFilter={true}
              storeKey={"SerInvReportTotalStockOutDetailRpt-columns"}
              editMode={false}
              customHeight={windowSize.height - 110}
              defaultPageSize={9999999}
              isHiddenCheckBox
            >
              <Summary>
                <TotalItem
                  column={"Amount"}
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
