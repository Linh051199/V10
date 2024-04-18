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
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";

export const flagStoTranspReq = atom<boolean>(false);
interface QuanLyChamSocKhachHang72h_Search { }

const DUMMY_DATA: any = {
  DataList: [
    {
      SoPhieuNhap: "Test1",
      NhaCungCap: "Test1",
      NgayNhap: "Test1",
      SoDonHang: "Test1",
      TrangThai: "Test1",
      MoTa: "Test1",
    },
    {
      SoPhieuNhap: "Test2",
      NhaCungCap: "Test2",
      NgayNhap: "Test2",
      SoDonHang: "Test2",
      TrangThai: "Test2",
      MoTa: "Test2",
    },
    {
      SoPhieuNhap: "Test3",
      NhaCungCap: "Test3",
      NgayNhap: "Test3",
      SoDonHang: "Test3",
      TrangThai: "Test3",
      MoTa: "Test3",
    },
  ],
  ItemCount: 2,
  PageCount: 2,
  PageIndex: 2,
  PageSize: 2,
};
const QuanLyChamSocKhachHang72hPage = () => {
  const { t } = useI18n("QuanLyChamSocKhachHang72h");
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
  const searchCondition = useRef<Partial<any>>({
    SoDeNghi: "",
    NgayTaoFromTo: [validateMajorTimeStartDayOfMonth, new Date()],
    TrangThaiDeNghiDMS: "",
    TrangThaiDeNghiNCC: "",
    MaVatTuyeuCau: false,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const navigate = useNetworkNavigate();
  const onViewDetail = (code: string) => {
    // navigate(`/XemLenhSC/${code}?${searchCondition.current.FlagDataWH}`);
  };
  const { data, onSave: onSaveState } = useStateRestore<
    Partial<QuanLyChamSocKhachHang72h_Search>
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

  const handleSearch = (condition: Partial<QuanLyChamSocKhachHang72h_Search>) => {
    // if (condition.CreatedDateFromTo && condition.CreatedDateFromTo.length > 0) {
    //   condition.CreatedDateFrom = condition.CreatedDateFromTo[0]
    //     ? formatDate(condition.CreatedDateFromTo[0])
    //     : undefined;
    //   condition.CreatedDateTo = condition.CreatedDateFromTo[1]
    //     ? formatDate(condition.CreatedDateFromTo[1])
    //     : undefined;
    // }
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
    navigate("/storage/QuanLyChamSocKhachHang72h/manageQuanLyChamSocKhachHang72h/create");
  };

  const fetchData = async () => {
    // const resp =   await api.QuanLyChamSocKhachHang72h_SearchHQ({
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
      dataField: "TenKhachHang",
      visible: true,
      caption: t("TenKhachHang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "GioiTinh",
      visible: true,
      caption: t("GioiTinh"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "DiaChi",
      visible: true,
      caption: t("DiaChi"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "DienThoai",
      visible: true,
      caption: t("DienThoai"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "DiDong",
      visible: true,
      caption: t("DiDong"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "Email",
      visible: true,
      caption: t("Email"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "NguoiLienLac",
      visible: true,
      caption: t("NguoiLienLac"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "DiaChiNguoiLienLac",
      visible: true,
      caption: t("DiaChiNguoiLienLac"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "DienThoaiNguoiLienLac",
      visible: true,
      caption: t("DienThoaiNguoiLienLac"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "DiDongNguoiLienLac",
      visible: true,
      caption: t("DiDongNguoiLienLac"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "EmailNguoiLienLac",
      visible: true,
      caption: t("EmailNguoiLienLac"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "LeSuaChua",
      visible: true,
      caption: t("LeSuaChua"),
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
      dataField: "NgayGiaoXe",
      visible: true,
      caption: t("NgayGiaoXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "BienSo",
      visible: true,
      caption: t("BienSo"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "SoKhung",
      visible: true,
      caption: t("SoKhung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "HieuXe",
      visible: true,
      caption: t("HieuXe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "Model",
      visible: true,
      caption: t("Model"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "NgayLienHe",
      visible: true,
      caption: t("NgayLienHe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "TinhTrang",
      visible: true,
      caption: t("TinhTrang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
  ];

  const handleSelectionChanged = () => { };

  const handlCreateNew = async () => { };

  const toolbarItems: GridCustomerToolBarItem[] = [
    {
      text: ('TaoDNCungCapGia'),
      onClick: (ref: any) => {

      },
      shouldShow: (ref: any) => {
        let check = false;
        if (ref) {
          if (ref.current.instance.getSelectedRowsData().length >= 1) {
            check = true;
          }
          // return true;
          return check;
        } else {
          return check;
        }
      },
    },
  ]
  // const subGridToolbars: IToolbarItemProps[] = [

  // ]
  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
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
            <ScrollView height={"calc(100vh - 200px)"}>
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
                keyExpr={"SoPhieuNhap"}
                storeKey={"QuanLyChamSocKhachHang72h-list-columns"}
                customHeight={windowSize.height - 200}
              />
            </ScrollView>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default QuanLyChamSocKhachHang72hPage;
