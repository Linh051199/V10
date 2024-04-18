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
import { openPopupAtom } from "@/packages/ui/base-gridview/store/popup-grid-store";
import { DateRangeBox, Form } from "devextreme-react";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useCallback, useReducer, useRef } from "react";
import { toast } from "react-toastify";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import GetDataWH from "@/packages/ui/getDataWH/getDataWH";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { PageHeader } from "./component/page-header";
import { useColumns } from "./component/columns";
import { Search_SerROStatisticServiceByGroup_Params } from "@/packages/types/report/SerROStatisticServiceByGroup";
import { format } from "date-fns";
import usePrint from "@/components/print/usePrint";
import { usePermissions } from "@/packages/contexts/permission";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const SerROStatisticServiceByGroupPage = () => {
  const { t } = useI18n("SerROStatisticServiceByGroup");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { isHQ, DealerCode } = usePermissions();
  const setLoad = useSetAtom(loadPanelAtom);

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const { quickPrint, previewPrint } = usePrint();
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const formRef = useRef();
  const checkBoxRef = useRef<Form>(null);

  const gridRef: any = useRef();
  const searchCondition = useRef<
    Partial<Search_SerROStatisticServiceByGroup_Params>
  >({
    FromDateFromTo: [validateTimeStartDayOfMonth, new Date()],
    IsChoSua: false,
    IsDangSua: false,
    IsSuaXong: false,
    IsEnd: false,
    IsThanhToanXong: false,
    IsDaGiaoXe: false,
    IsROReject: false,
    IsKhongDung: false,
    FlagDataWH: false,
  });
  //====================================CallAPI========================================
  const fetchData = async () => {
    const resp = await api.SerROStatisticServiceByGroup_SearchDL({
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
      IsChoSua: searchCondition.current.IsChoSua ? "1" : "0",
      IsDangSua: searchCondition.current.IsDangSua ? "1" : "0",
      IsSuaXong: searchCondition.current.IsSuaXong ? "1" : "0",
      IsEnd: searchCondition.current.IsEnd ? "1" : "0",
      IsThanhToanXong: searchCondition.current.IsThanhToanXong ? "1" : "0",
      IsDaGiaoXe: searchCondition.current.IsDaGiaoXe ? "1" : "0",
      IsROReject: searchCondition.current.IsROReject ? "1" : "0",
      IsKhongDung: searchCondition.current.IsKhongDung ? "1" : "0",
      FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
    } as Search_SerROStatisticServiceByGroup_Params);
    const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    const length =
      resp?.Data?.lst_Ser_RO_Statistic_Service_ByGroup?.length ?? 0;

    if (resp?.isSuccess) {
      return {
        DataList: resp?.Data?.lst_Ser_RO_Statistic_Service_ByGroup,
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
        IsChoSua: searchCondition.current.IsChoSua ? "1" : "0",
        IsDangSua: searchCondition.current.IsDangSua ? "1" : "0",
        IsSuaXong: searchCondition.current.IsSuaXong ? "1" : "0",
        IsEnd: searchCondition.current.IsEnd ? "1" : "0",
        IsThanhToanXong: searchCondition.current.IsThanhToanXong ? "1" : "0",
        IsDaGiaoXe: searchCondition.current.IsDaGiaoXe ? "1" : "0",
        IsROReject: searchCondition.current.IsROReject ? "1" : "0",
        IsKhongDung: searchCondition.current.IsKhongDung ? "1" : "0",
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
      const response = await api.SerROStatisticServiceByGroup_ExportSearchDL({
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
        IsChoSua: searchCondition.current.IsChoSua ? "1" : "0",
        IsDangSua: searchCondition.current.IsDangSua ? "1" : "0",
        IsSuaXong: searchCondition.current.IsSuaXong ? "1" : "0",
        IsEnd: searchCondition.current.IsEnd ? "1" : "0",
        IsThanhToanXong: searchCondition.current.IsThanhToanXong ? "1" : "0",
        IsDaGiaoXe: searchCondition.current.IsDaGiaoXe ? "1" : "0",
        IsROReject: searchCondition.current.IsROReject ? "1" : "0",
        IsKhongDung: searchCondition.current.IsKhongDung ? "1" : "0",
        FlagDataWH: searchCondition.current.FlagDataWH ? "1" : "0",
      } as Search_SerROStatisticServiceByGroup_Params);
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
      dataField: "IsChoSua",
      caption: t("IsChoSua"),
      visible: true,
      label: {
        visible: false,
        text: t("IsChoSua"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsChoSua")}
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
    {
      dataField: "IsDangSua",
      caption: t("IsDangSua"),
      visible: true,
      label: {
        visible: false,
        text: t("IsDangSua"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsDangSua")}
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
    {
      dataField: "IsSuaXong",
      caption: t("IsSuaXong"),
      visible: true,
      label: {
        visible: false,
        text: t("IsSuaXong"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsSuaXong")}
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
    {
      dataField: "IsEnd",
      caption: t("IsEnd"),
      visible: true,
      label: {
        visible: false,
        text: t("IsEnd"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsEnd")}
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
    {
      dataField: "IsThanhToanXong",
      caption: t("IsThanhToanXong"),
      visible: true,
      label: {
        visible: false,
        text: t("IsThanhToanXong"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsThanhToanXong")}
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
    {
      dataField: "IsDaGiaoXe",
      caption: t("IsDaGiaoXe"),
      visible: true,
      label: {
        visible: false,
        text: t("IsDaGiaoXe"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsDaGiaoXe")}
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
    {
      dataField: "IsROReject",
      caption: t("IsROReject"),
      visible: true,
      label: {
        visible: false,
        text: t("IsROReject"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsROReject")}
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
    {
      dataField: "IsKhongDung",
      caption: t("IsKhongDung"),
      visible: true,
      label: {
        visible: false,
        text: t("IsKhongDung"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsKhongDung")}
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
                storeKey={"SerROStatisticServiceByGroup-search"}
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
              keyExpr={"RONO"}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              isHidenHeaderFilter={true}
              customToolbarItems={[]}
              storeKey={"SerROStatisticServiceByGroup-columns"}
              editMode={false}
              defaultPageSize={9999999}
              customHeight={windowSize.height - 110}
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
