import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import React, { useRef } from "react";
import HeaderPart from "./Components/HeaderPart";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout"; 
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import useColumnSearch from "./Components/useColumnSearch";
import ColumnGrid from "./Components/ColumnGrid";
import useToolbar from "./Components/Toolbar";
import { useClientgateApi } from "@/packages/api";
import { useNetworkNavigate } from "@/packages/hooks";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

const fakeData = [
  {
    STT: "1",
    SoPhieuNhap: "SoPhieuNhap 1",
    ThoiGianNhap: "ThoiGianNhap 1",
    KhoNhap: "KhoNhap 1",
    NhaCungCap: "NhaCungCap 1",
    TongTien: "TongTien 1",
    TrangThai: "TrangThai 1",
    NoiDungNhap: "NoiDungNhap 1",
    ThoiGianTao: "ThoiGianTao 1",
    LoaiPhieuNhap: "LoaiPhieuNhap 1",
    NguoiGiaoHang: "NguoiGiaoHang 1",
    RefNo: "RefNo 1",
    RefType: "RefType 1",
    CoFlagQR: "CoFlagQR 1",
    SoHopDong: "SoHopDong 1",
    SoContainer: "SoContainer 1",
    BienSoXe: "BienSoXe 1",
    SoHoaDonNhap: "SoHoaDonNhap 1",
    NgayHoaDonNhap: "NgayHoaDonNhap 1",
  },
  {
    STT: "2",
    SoPhieuNhap: "SoPhieuNhap 2",
    ThoiGianNhap: "ThoiGianNhap 2",
    KhoNhap: "KhoNhap 2",
    NhaCungCap: "NhaCungCap 2",
    TongTien: "TongTien 2",
    TrangThai: "TrangThai 2",
    NoiDungNhap: "NoiDungNhap 2",
    ThoiGianTao: "ThoiGianTao 2",
    LoaiPhieuNhap: "LoaiPhieuNhap 2",
    NguoiGiaoHang: "NguoiGiaoHang 2",
    RefNo: "RefNo 2",
    RefType: "RefType 2",
    CoFlagQR: "CoFlagQR 2",
    SoHopDong: "SoHopDong 2",
    SoContainer: "SoContainer 2",
    BienSoXe: "BienSoXe 2",
    SoHoaDonNhap: "SoHoaDonNhap 2",
    NgayHoaDonNhap: "NgayHoaDonNhap 2",
  },

  {
    STT: "3",
    SoPhieuNhap: "SoPhieuNhap 3",
    ThoiGianNhap: "ThoiGianNhap 3",
    KhoNhap: "KhoNhap 3",
    NhaCungCap: "NhaCungCap 3",
    TongTien: "TongTien 3",
    TrangThai: "TrangThai 3",
    NoiDungNhap: "NoiDungNhap 3",
    ThoiGianTao: "ThoiGianTao 3",
    LoaiPhieuNhap: "LoaiPhieuNhap 3",
    NguoiGiaoHang: "NguoiGiaoHang 3",
    RefNo: "RefNo 3",
    RefType: "RefType 3",
    CoFlagQR: "CoFlagQR 3",
    SoHopDong: "SoHopDong 3",
    SoContainer: "SoContainer 3",
    BienSoXe: "BienSoXe 3",
    SoHoaDonNhap: "SoHoaDonNhap 3",
    NgayHoaDonNhap: "NgayHoaDonNhap 3",
  },

  {
    STT: "4",
    SoPhieuNhap: "SoPhieuNhap 4",
    ThoiGianNhap: "ThoiGianNhap 4",
    KhoNhap: "KhoNhap 4",
    NhaCungCap: "NhaCungCap 4",
    TongTien: "TongTien 4",
    TrangThai: "TrangThai 4",
    NoiDungNhap: "NoiDungNhap 4",
    ThoiGianTao: "ThoiGianTao 4",
    LoaiPhieuNhap: "LoaiPhieuNhap 4",
    NguoiGiaoHang: "NguoiGiaoHang 4",
    RefNo: "RefNo 4",
    RefType: "RefType 4",
    CoFlagQR: "CoFlagQR 4",
    SoHopDong: "SoHopDong 4",
    SoContainer: "SoContainer 4",
    BienSoXe: "BienSoXe 4",
    SoHoaDonNhap: "SoHoaDonNhap 4",
    NgayHoaDonNhap: "NgayHoaDonNhap 4",
  },

  {
    STT: "5",
    SoPhieuNhap: "SoPhieuNhap 5",
    ThoiGianNhap: "ThoiGianNhap 5",
    KhoNhap: "KhoNhap 5",
    NhaCungCap: "NhaCungCap 5",
    TongTien: "TongTien 5",
    TrangThai: "TrangThai 5",
    NoiDungNhap: "NoiDungNhap 5",
    ThoiGianTao: "ThoiGianTao 5",
    LoaiPhieuNhap: "LoaiPhieuNhap 5",
    NguoiGiaoHang: "NguoiGiaoHang 5",
    RefNo: "RefNo 5",
    RefType: "RefType 5",
    CoFlagQR: "CoFlagQR 5",
    SoHopDong: "SoHopDong 5",
    SoContainer: "SoContainer 5",
    BienSoXe: "BienSoXe 5",
    SoHoaDonNhap: "SoHoaDonNhap 5",
    NgayHoaDonNhap: "NgayHoaDonNhap 5",
  },

  {
    STT: "6",
    SoPhieuNhap: "SoPhieuNhap 6",
    ThoiGianNhap: "ThoiGianNhap 6",
    KhoNhap: "KhoNhap 6",
    NhaCungCap: "NhaCungCap 6",
    TongTien: "TongTien 6",
    TrangThai: "TrangThai 6",
    NoiDungNhap: "NoiDungNhap 6",
    ThoiGianTao: "ThoiGianTao 6",
    LoaiPhieuNhap: "LoaiPhieuNhap 6",
    NguoiGiaoHang: "NguoiGiaoHang 6",
    RefNo: "RefNo 6",
    RefType: "RefType 6",
    CoFlagQR: "CoFlagQR 6",
    SoHopDong: "SoHopDong 6",
    SoContainer: "SoContainer 6",
    BienSoXe: "BienSoXe 6",
    SoHoaDonNhap: "SoHoaDonNhap 6",
    NgayHoaDonNhap: "NgayHoaDonNhap 6",
  },
  {
    STT: "7",
    SoPhieuNhap: "SoPhieuNhap 7",
    ThoiGianNhap: "ThoiGianNhap 7",
    KhoNhap: "KhoNhap 7",
    NhaCungCap: "NhaCungCap 7",
    TongTien: "TongTien 7",
    TrangThai: "TrangThai 7",
    NoiDungNhap: "NoiDungNhap 7",
    ThoiGianTao: "ThoiGianTao 7",
    LoaiPhieuNhap: "LoaiPhieuNhap 7",
    NguoiGiaoHang: "NguoiGiaoHang 7",
    RefNo: "RefNo 7",
    RefType: "RefType 7",
    CoFlagQR: "CoFlagQR 7",
    SoHopDong: "SoHopDong 7",
    SoContainer: "SoContainer 7",
    BienSoXe: "BienSoXe 7",
    SoHoaDonNhap: "SoHoaDonNhap 7",
    NgayHoaDonNhap: "NgayHoaDonNhap 7",
  },
  {
    STT: "8",
    SoPhieuNhap: "SoPhieuNhap 8",
    ThoiGianNhap: "ThoiGianNhap 8",
    KhoNhap: "KhoNhap 8",
    NhaCungCap: "NhaCungCap 8",
    TongTien: "TongTien 8",
    TrangThai: "TrangThai 8",
    NoiDungNhap: "NoiDungNhap 8",
    ThoiGianTao: "ThoiGianTao 8",
    LoaiPhieuNhap: "LoaiPhieuNhap 8",
    NguoiGiaoHang: "NguoiGiaoHang 8",
    RefNo: "RefNo 8",
    RefType: "RefType 8",
    CoFlagQR: "CoFlagQR 8",
    SoHopDong: "SoHopDong 8",
    SoContainer: "SoContainer 8",
    BienSoXe: "BienSoXe 8",
    SoHoaDonNhap: "SoHoaDonNhap 8",
    NgayHoaDonNhap: "NgayHoaDonNhap 8",
  },
];

const Manage = () => {
  const gridRef = useRef();
  const searchCondition = useRef({});
  const handleSearch = () => {};
  const columns = ColumnGrid();
  const columnSearch = useColumnSearch();
  const api = useClientgateApi();
  const navigate = useNetworkNavigate();

  const onCancel = () => {};
  const onApprove = () => {};
  const onCreate = () => {
    navigate("/admin/QRBox/Create");
  };
  const onDelete = () => {};
  const onExportExcel = () => {};
  const onPrint = () => {};

  const fetchData = async () => {
    const response = await api.Mst_SubmissionForm_Search({
      ...searchCondition.current,
      Ft_PageIndex: 0,
      Ft_PageSize: 1000,
    });
    if (response?.isSuccess) {
      console.log("response ", response);
      return {
        ...response,
        DataList: fakeData,
      };
    }
  };

  const toolbar = useToolbar({
    onCancel: onCancel,
    onApprove: onApprove,
    onCreate: onCreate,
    onDelete: onDelete,
    onExportExcel: onExportExcel,
    onPrint: onPrint,
  });
  const onPageChanged = () => {};

  return (
    <AdminContentLayout className={"Category_Manager"}>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout searchPermissionCode="BTN_ETICKET_LIST_SEARCH">
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <SearchPanelV2
              conditionFields={columnSearch}
              storeKey="Mst_Eticket_Column_Search"
              data={searchCondition.current}
              onSearch={handleSearch}
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <div className="eticket-manager">
              <GridViewOne
                isLoading={false}
                fetchData={fetchData}
                autoFetchData={true}
                ref={gridRef}
                dataSource={[]}
                onPageChanged={onPageChanged}
                columns={columns}
                keyExpr={"SoPhieuNhap"}
                isHiddenCheckBox={false}
                allowSelection={true}
                onSelectionChanged={() => {}}
                hidenTick={true}
                onSaveRow={() => {}}
                onEditorPreparing={() => {}}
                onEditRowChanges={() => {}}
                onDeleteRows={() => {}}
                storeKey={"Manage"}
                customToolbarItems={toolbar}
              />
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default Manage;
