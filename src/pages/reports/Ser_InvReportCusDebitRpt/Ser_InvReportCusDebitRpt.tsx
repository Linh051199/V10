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
import { useCallback, useReducer, useRef } from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useColumns } from "./components/columns";
import { PageHeader } from "./components/page-header";

import { Search_Ser_InvReportCusDebitRpt_Params } from "@/packages/types/report/Ser_InvReportCusDebitRpt";
import { format } from "date-fns";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { nanoid } from "nanoid";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import {
  Column,
  GroupItem,
  Selection,
  SortByGroupSummaryInfo,
  Summary,
} from "devextreme-react/data-grid";
import usePrint from "@/components/print/usePrint";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const Ser_InvReportCusDebitRptPage = () => {
  const { t } = useI18n("Ser_InvReportCusDebitRpt");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { quickPrint, previewPrint } = usePrint();
  const setLoad = useSetAtom(loadPanelAtom);

  const setOpenPopupWH = useSetAtom(openPopupAtom);
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();
  const gridRef: any = useRef();
  const searchCondition = useRef<
    Partial<Search_Ser_InvReportCusDebitRpt_Params>
  >({
    FromDateFromTo: [validateTimeStartDayOfMonth, new Date()],
    FlagDataWH: false,
  });
  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.Ser_InvReportCusDebitRpt_SearchDL({
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
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length = resp?.Data?.lst_Ser_InvReportCusDebitRpt?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Ser_InvReportCusDebitRpt,
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
      const response = await api.SerROStatisticServiceByGroup_PrintDL({
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
      const response = await api.Ser_InvReportCusDebitRpt_ExportSearchDL({
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
                ref={formRef.current}
                conditionFields={searchFields}
                data={searchCondition.current}
                onSearch={handleSearch}
                storeKey={"Ser_InvReportCusDebitRpt-search"}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]}
              columns={[]}
              fetchData={fetchData}
              keyExpr={"CusID"}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              isHidenHeaderFilter
              storeKey={"Ser_InvReportCusDebitRpt-columns"}
              editMode={false}
              customHeight={windowSize.height - 110}
              defaultPageSize={9999999}
              isHiddenCheckBox
            >
              <Selection mode="single" />
              <Column dataField="GroupName" groupIndex={0} />
              <Column dataField="CusName" width={130} />
              <Column dataField="GroupAddress" />
              <Column dataField="Phone" />
              <Column dataField="TGD" />
              <Column dataField="PST" />
              <Column dataField="PSG" />
              <Column dataField="TGC" />
              {/* <Column dataField="GroupName" /> */}
              <Summary>
                <GroupItem
                  column="GroupName"
                  summaryType="count"
                  displayFormat="{0} khách hàng"
                />
                <GroupItem
                  column="TGC"
                  summaryType="max"
                  valueFormat="#,##0.##"
                  showInGroupFooter={false}
                  displayFormat="Total: {0}"
                  alignByColumn={true}
                />
                {/* <GroupItem
                  column="TGC"
                  summaryType="sum"
                  valueFormat="currency"
                  displayFormat="Total: {0}"
                  showInGroupFooter={true}
                /> */}
              </Summary>
              <SortByGroupSummaryInfo summaryItem="count" />
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
