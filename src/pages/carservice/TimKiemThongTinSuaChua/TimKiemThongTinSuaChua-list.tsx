import { useI18n } from "@/i18n/useI18n";
import {
  formatDate,
  validateMajorTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { BButton, ExportExcelButton } from "@/packages/components/buttons";
import { useNetworkNavigate, useStateRestore } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { Button, List, LoadPanel, ScrollView } from "devextreme-react";
import React, { useEffect, useReducer, useRef, useState } from "react";
import SearchForm from "./search-form/search-form";
import { atom, useSetAtom } from "jotai";
import { P, match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { useClientgateApi } from "@/packages/api";
import { Alignment } from "@/types";
import { StatusValue } from "@/packages/components/status-value/status-value";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import usePrint from "@/components/print/usePrint";
import { Link } from "@/packages/components/link/link";
import { nanoid } from "nanoid";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";
import { getHours, getMinutes } from "date-fns";
import { useQuery } from "@tanstack/react-query";

export const flagStoTranspReq = atom<boolean>(false);
interface TimKiemThongTinSuaChua_Search {}

const DUMMY_DATA: any = {
  DataList: [
    {
      SoBaoGia: "Test1",
      BienSoXe: "Test1",
      TenKhachHang: "Test1",
      MauXe: "Test1",
      Hang: "Test1",
      CVDV: "Test1",
      NgayVao: "Test1",
      HenGioGiaoXe: "Test1",
      Ngay: "Test1",
      TrangThai: 0,
      NoiDungCongViec: "Test1",
    },
    {
      SoBaoGia: "Test2",
      BienSoXe: "Test2",
      TenKhachHang: "Test2",
      MauXe: "Test2",
      Hang: "Test2",
      CVDV: "Test2",
      NgayVao: "Test2",
      HenGioGiaoXe: "Test2",
      Ngay: "Test2",
      TrangThai: 1,
      NoiDungCongViec: "Test2",
    },
  ],
  ItemCount: 2,
  PageCount: 2,
  PageIndex: 2,
  PageSize: 2,
};
const TimKiemThongTinSuaChuaPage = () => {
  const { t } = useI18n("TimKiemThongTinSuaChua");
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<Partial<TimKiemThongTinSuaChua_Search>>({
    NgayVaoXuong: [validateMajorTimeStartDayOfMonth, new Date()],
    BienSo: "",
    VIN: "",
    TenKhachHang: "",
    ChoSua: false,
    DangSua: false,
    SuaXong: false,
    KTraCCung: false,
    ThanhToanXong: false,
    DaGiaoXe: false,
    LenhHuy: false,
    KhongDung: false,
    Ft_PageIndex: 0,
    Ft_PageSize: 1000,
    FlagDataWH: false, // convert "1", "0" ở hàm gọi API
  });

  const navigate = useNetworkNavigate();
  const onViewDetail = (code: string) => {
    navigate(`/XemLenhSC/${code}?${searchCondition.current.FlagDataWH}`);
  };
  const { data, onSave: onSaveState } = useStateRestore<
    Partial<TimKiemThongTinSuaChua_Search>
  >("search-sto-cb-req-v2", {});
  const { data: listStorageCodeTo } = useQuery(
    ["listStorageCodeTo", "Sto_CBReq"],
    async () => {
      return [];
      // const resp = await api.Sto_CBReq_GetByStorageType();
      // if (resp.isSuccess) {
      //   // return [
      //   //   { StorageCode: "", StorageName: "All" },
      //   //   ...(resp?.Data?.Lst_Mst_Storage as Sto_CBReq_StorageType[]),
      //   // ];
      //   return resp?.Data?.Lst_Mst_Storage;
      // } else {
      //   return [];
      // }
    }
  );

  const handleSearch = (condition: Partial<TimKiemThongTinSuaChua_Search>) => {
    if (condition.CreatedDateFromTo && condition.CreatedDateFromTo.length > 0) {
      condition.CreatedDateFrom = condition.CreatedDateFromTo[0]
        ? formatDate(condition.CreatedDateFromTo[0])
        : undefined;
      condition.CreatedDateTo = condition.CreatedDateFromTo[1]
        ? formatDate(condition.CreatedDateFromTo[1])
        : undefined;
    }
    // onSaveState(condition);
    searchCondition.current = {
      ...searchCondition.current,
      ...condition,
    };
    gridRef?.current?.refetchData();
  };

  // load lại form search đã lưu trong local để search
  // useEffect(() => {
  //   const newFormValue = {
  //     ...searchCondition,
  //     ...data,
  //   };
  // }, []);
  const handleAddNew = () => {
    navigate("/sales/StoCBReq/manageStoCBReq/new");
  };

  const fetchData = async () => {
    // const resp =   await api.TimKiemThongTinSuaChua_SearchHQ({
    //       ...searchCondition.current,
    //       Ft_PageIndex: gridRef.current.getDxInstance().pageIndex() ?? 0,
    //       Ft_PageSize: gridRef.current.getDxInstance().pageSize() ?? 1000,
    //     });
    let resp: any = {
      isSuccess: true,
    };

    if (resp?.isSuccess) {
      // setSelectedRowKeys([]);
      // return resp;
      return DUMMY_DATA;
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
  };

  const columns = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },

    {
      dataField: "SoBaoGia",
      visible: true,
      caption: t("SoBaoGia"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "BienSoXe",
      visible: true,
      caption: t("BienSoXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "TenKhachHang",
      visible: true,
      caption: t("TenKhachHang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "MauXe",
      visible: true,
      caption: t("MauXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "Hang",
      visible: true,
      caption: t("Hang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "CVDV",
      visible: true,
      caption: t("CVDV"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "NgayVao",
      visible: true,
      caption: t("NgayVao"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "HenGioGiaoXe",
      visible: true,
      caption: t("HenGioGiaoXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "Ngay",
      visible: true,
      caption: t("Ngay"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },

    {
      dataField: "TrangThai",
      visible: true,
      caption: t("TrangThai"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      cellRender: (e: any) => {
        return (
          <span
            className={`px-[10px] rounded-[2px] ml-[30px] py-[4px] text-white font-[400] text-[11px]`}
            style={{
              backgroundColor: `${e.value === 1 ? "#0FBC2B" : "#A7A7A7"}`,
            }}
          >
            {e.value === 1 ? "SuaXong" : "ChoSua"}
          </span>
        );
      },
    },
    {
      dataField: "NoiDungCongViec",
      visible: true,
      caption: t("NoiDungCongViec"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
      multiRowEditorOptions: {},
    },
  ];
  const handleSelectionChanged = () => {};

  const handleSave = async () => {
    toast.info("save");
    gridRef?.current?.getDxInstance().saveEditData();
    let params: any = gridRef?.current?.getDxInstance().option("dataSource");
    console.log("🟡 ~ params:", params);

    // setIsProcessing(true);
    // const response = await api.TimKiemThongTinSuaChua_PrintCBReqNo(
    //   searchCondition.current,
    //   key
    // );
    // if (response?.isSuccess) {
    //   quickPrint({
    //     url: response.Data!,
    //   });
    // } else {
    //   showError({
    //     message: t(response._strErrCode),
    //     _strErrCode: response._strErrCode,
    //     _strTId: response._strTId,
    //     _strAppTId: response._strAppTId,
    //     _objTTime: response._objTTime,
    //     _strType: response._strType,
    //     _dicDebug: response._dicDebug,
    //     _dicExcs: response._dicExcs,
    //   });
    // }
    // const resp = await api.PrintTranspReqNo(transpReqNo, isHQ());
    // setIsProcessing(false);
  };

  const toolbarItems: GridCustomToolBarItem[] = [];

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("TimKiemThongTinSuaChua")}</div>
          <div className="pr-[20px]">
            <Button icon="refresh" onClick={() => toast.info("Refetch")} />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            {/* <SearchForm /> */}
            <SearchForm
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <ScrollView height={"100%"}>
              {/* <OrderList /> */}
              <LoadPanel
                visible={isProcessing}
                showIndicator={true}
                showPane={true}
              />

              <GridViewOne
                ref={gridRef}
                editMode={false} // fix selection
                autoFetchData={true}
                allowSelection={true}
                isLoading={false}
                dataSource={[]}
                fetchData={fetchData}
                columns={columns}
                // toolbarItems={toolbarItems}
                customToolbarItems={toolbarItems}
                onSelectionChanged={handleSelectionChanged}
                keyExpr={"Hang"}
                storeKey={"TimKiemThongTinSuaChua-list"}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default TimKiemThongTinSuaChuaPage;
