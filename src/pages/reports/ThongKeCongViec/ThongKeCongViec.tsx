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
import { useColumns } from "./components/columns";
import { PageHeader } from "./components/page-header";

import { Search_ThongKeCongViec_Params } from "@/packages/types/report/ThongKeCongViec";

export const ThongKeCongViecPage = () => {
  const { t } = useI18n("ThongKeCongViec");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi

  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const checkBoxRef = useRef<Form>(null);
  const formRef = useRef();

  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const setOpenPopupWH = useSetAtom(openPopupAtom);

  const gridRef: any = useRef();
  const searchCondition = useRef<Partial<Search_ThongKeCongViec_Params>>({
    NgayVaoXuongFromTo: [validateTimeStartDayOfMonth, new Date()],
    ChoSua: false,
    DangSua: false,
    SuaXong: false,
    KiemTraCuoiCung: false,
    ThanhToanXong: false,
    DaGiaoXe: false,
    LenhHuy: false,
    KhongDung: false,
    FlagDataWH: false,
  });
  //====================================CallAPI========================================
  const fetchData = async () => {
    // const resp = await api.Rpt_OrdOrderPlanHTMV_SearchHQ({
    //   CreatedDateFrom: searchCondition.current.CreatedDateFromTo[0]
    //     ? format(
    //         searchCondition.current.CreatedDateFromTo[0] as Date,
    //         "yyyy-MM-dd"
    //       )
    //     : "",
    //   CreatedDateTo: searchCondition.current.CreatedDateFromTo[1]
    //     ? format(
    //         searchCondition.current.CreatedDateFromTo[1] as Date,
    //         "yyyy-MM-dd"
    //       )
    //     : "",
    //   ReportType: searchCondition.current.ReportType ?? "",
    //   Code: searchCondition.current.Code ?? "",
    // } as Rpt_OrdOrderPlanHTMVParam);
    // const pageSize = gridRef?.current?.getDxInstance()?.pageSize();

    // const length = resp?.Data?.Lst_Ord_OrderPlan_HTMV?.length ?? 0;

    // if (resp?.isSuccess) {
    //   return {
    //     DataList: resp?.Data?.Lst_Ord_OrderPlan_HTMV,
    //     PageCount: length / pageSize,
    //     ItemCount: length,
    //     PageSize: 99999,
    //   };
    // } else {
    //   showError({
    //     message: t(resp._strErrCode),
    //     _strErrCode: resp._strErrCode,
    //     _strTId: resp._strTId,
    //     _strAppTId: resp._strAppTId,
    //     _objTTime: resp._objTTime,
    //     _strType: resp._strType,
    //     _dicDebug: resp._dicDebug,
    //     _dicExcs: resp._dicExcs,
    //   });

    //   return {
    //     DataList: [],
    //     PageCount: 0,
    //     ItemCount: 0,
    //     PageSize: 99999,
    //   };
    // }
    return [];
  };
  //====================================CallAPI-end========================================

  //====================================handle========================================

  const handleSearch = async (data: any) => {
    if (data.FlagDataWH) {
      setOpenPopupWH(true);
    } else {
      searchCondition.current = {
        ...data,
        CreatedDateFrom: data.NgayVaoXuongFromTo[0]
          ? data.NgayVaoXuongFromTo[0]
          : "",
        CreatedDateTo: data.NgayVaoXuongFromTo[1]
          ? data.NgayVaoXuongFromTo[1]
          : "",
      };
      gridRef?.current?.refetchData();
    }
  };

  const handleSearchWH = () => {
    reloading();
  };

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };
  const handleExportDetail = async () => {
    // const crData = gridRef?.current?.getData();
    // if (crData && crData?.length > 0) {
    //   const response = await api.Rpt_OrdOrderPlanHTMV_ExprortDetailHQ({
    //     CreatedDateFrom: searchCondition.current.CreatedDateFromTo[0]
    //       ? format(
    //           searchCondition.current.CreatedDateFromTo[0] as Date,
    //           "yyyy-MM-dd"
    //         )
    //       : "",
    //     CreatedDateTo: searchCondition.current.CreatedDateFromTo[1]
    //       ? format(
    //           searchCondition.current.CreatedDateFromTo[1] as Date,
    //           "yyyy-MM-dd"
    //         )
    //       : "",
    //     ReportType: searchCondition.current.ReportType ?? "",
    //     Code: searchCondition.current.Code ?? "",
    //   } as Rpt_OrdOrderPlanHTMVParam);
    //   if (response.isSuccess && response.Data) {
    //     toast.success(t("Download successfully!"));
    //     window.location.href = response.Data;
    //   } else {
    //     toast.error(t("DownloadUnsuccessfully"));
    //     showError({
    //       message: t(response._strErrCode),
    //       _strErrCode: response._strErrCode,
    //       _strTId: response._strTId,
    //       _strAppTId: response._strAppTId,
    //       _objTTime: response._objTTime,
    //       _strType: response._strType,
    //       _dicDebug: response._dicDebug,
    //       _dicExcs: response._dicExcs,
    //     });
    //   }
    // } else {
    //   toast.warning("PleaseSearchBeforeExportExcel");
    // }
    toast.warning("Chưa có api nhé!");
  };
  const handleExport = useCallback(async () => {
    toast.warning("Chưa có api nhé!");
  }, []);

  //====================================handle-end========================================

  //====================================searchField========================================
  const searchFields: IItemProps[] = [
    {
      dataField: "NgayVaoXuongFromTo",
      caption: t("NgayVaoXuongFromTo"),
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
              defaultStartDate={searchCondition?.current.NgayVaoXuongFromTo[0]}
              defaultEndDate={searchCondition?.current.NgayVaoXuongFromTo[1]}
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
      dataField: "ChoSua",
      caption: t("ChoSua"),
      visible: true,
      label: {
        visible: false,
        text: t("ChoSua"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("ChoSua")}
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
      dataField: "DangSua",
      caption: t("DangSua"),
      visible: true,
      label: {
        visible: false,
        text: t("DangSua"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("DangSua")}
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
      dataField: "SuaXong",
      caption: t("SuaXong"),
      visible: true,
      label: {
        visible: false,
        text: t("SuaXong"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("SuaXong")}
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
      dataField: "KiemTraCuoiCung",
      caption: t("KiemTraCuoiCung"),
      visible: true,
      label: {
        visible: false,
        text: t("KiemTraCuoiCung"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("KiemTraCuoiCung")}
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
      dataField: "ThanhToanXong",
      caption: t("ThanhToanXong"),
      visible: true,
      label: {
        visible: false,
        text: t("ThanhToanXong"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("ThanhToanXong")}
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
      dataField: "DaGiaoXe",
      caption: t("DaGiaoXe"),
      visible: true,
      label: {
        visible: false,
        text: t("DaGiaoXe"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("DaGiaoXe")}
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
      dataField: "LenhHuy",
      caption: t("LenhHuy"),
      visible: true,
      label: {
        visible: false,
        text: t("LenhHuy"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("LenhHuy")}
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
      dataField: "KhongDung",
      caption: t("KhongDung"),
      visible: true,
      label: {
        visible: false,
        text: t("KhongDung"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("KhongDung")}
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
          onExportExcelDetail={handleExportDetail}
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
                storeKey={"ThongKeCongViec-search"}
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
              storeKey={"ThongKeCongViec-columns"}
              customHeight={windowSize.height - 110}
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
