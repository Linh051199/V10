import { AdminPage } from "@/pages";
import SerInvStockInPage from "@/pages/carservice/Ser_Inv_StockIn/Ser_Inv_StockIn-list";
import SerInvStockInCreate from "@/pages/carservice/Ser_Inv_StockIn/create-new/create-new";
import TestTruongDong from "@/pages/carservice/TestTruongDong/test-truong-dong";
import { ExportWarehouseCreateNew } from "@/pages/carservice/XuatKho/create-new/create-new";
import QuanLyKhieuNaiDonHangManagementPage from "@/pages/storage/QuanLyKhieuNaiDonHang/QuanLyKhieuNaiDonHang-list";
import QuanLyKhieuNaiDonHangCreate from "@/pages/storage/QuanLyKhieuNaiDonHang/create-new/create-new";
import QuanLyKhieuNaiDonHangDetail from "@/pages/storage/QuanLyKhieuNaiDonHang/view/view";
import { QuanLyPhieuXuatTraNCCDetailPage } from "@/pages/storage/QuanLyPhieuXuatTraNCC";
import QuanLyPhieuXuatTraNCCManagementPage from "@/pages/storage/QuanLyPhieuXuatTraNCC/QuanLyPhieuXuatTraNCC-list";
import { RouteItem } from "@/types";

export const storageRoutes: RouteItem[] = [
  {
    key: "storage",
    path: "storage",
    permissionCode: " ",
    mainMenuTitle: "storage",
    mainMenuKey: "storage",
    getPageElement: () => <AdminPage />,
  },

  // =============================START PHANTHANG====================================
  // 65 Quản lý phiếu nhập kho
  {
    key: "SerInvStockIn",
    path: "",
    subMenuTitle: "SerInvStockIn",
    mainMenuKey: "storage",
    permissionCode: "",
    items: [
      {
        key: "manageSerInvStockIn",
        path: "storage/SerInvStockIn/manageSerInvStockIn/XuatKho/CreateNew",
        subMenuTitle: "ExportWarehouseCreateNew",
        mainMenuKey: "storage",
        getPageElement: () => <ExportWarehouseCreateNew />,
        permissionCode: "",
      },
      {
        key: "manageSerInvStockIn",
        path: "storage/SerInvStockIn/manageSerInvStockIn/TestTruongDong",
        subMenuTitle: "TestTruongDong",
        mainMenuKey: "storage",
        getPageElement: () => <TestTruongDong />,
        permissionCode: "",
      },
      {
        key: "manageSerInvStockIn",
        path: "storage/SerInvStockIn/manageSerInvStockIn",
        subMenuTitle: "SerInvStockIn",
        mainMenuKey: "storage",
        getPageElement: () => <SerInvStockInPage />,
        permissionCode: "",
      },
      {
        key: "manageSerInvStockInCreate",
        path: "storage/SerInvStockIn/manageSerInvStockIn/create-normal",
        subMenuTitle: "",
        mainMenuKey: "storage",
        getPageElement: () => <SerInvStockInCreate />,
        permissionCode: "",
      },
      {
        key: "manageSerInvStockInCreateWithOrder",
        path: "storage/SerInvStockIn/manageSerInvStockIn/create/:code",
        subMenuTitle: "",
        mainMenuKey: "storage",
        getPageElement: () => <SerInvStockInCreate />,
        permissionCode: "",
      },
      {
        key: "manageSerInvStockInDetail",
        path: "storage/SerInvStockIn/manageSerInvStockIn/update/:idUpdate",
        subMenuTitle: "",
        mainMenuKey: "storage",
        getPageElement: () => <SerInvStockInCreate />,
        permissionCode: "",
      },
      // =============================END PHANTHANG====================================
    ],
  },

  // =============================END PHANTHANG====================================

  // DongNV
  {
    key: "QuanLyKhieuNaiDonHang",
    path: "",
    subMenuTitle: "QuanLyKhieuNaiDonHang",
    mainMenuKey: "storage",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyKhieuNaiDonHang",
        path: "storage/QuanLyKhieuNaiDonHang",
        subMenuTitle: "QuanLyKhieuNaiDonHang",
        mainMenuKey: "storage",
        getPageElement: () => <QuanLyKhieuNaiDonHangManagementPage />,
        permissionCode: "",
      },
      {
        key: "QuanLyKhieuNaiDonHangCreate",
        path: "storage/QuanLyKhieuNaiDonHang/new",
        subMenuTitle: "",
        mainMenuKey: "storage",
        getPageElement: () => <QuanLyKhieuNaiDonHangCreate />,
        permissionCode: "",
      },
      {
        key: "QuanLyKhieuNaiDonHangCreate",
        path: "storage/QuanLyKhieuNaiDonHang/:code",
        subMenuTitle: "",
        mainMenuKey: "storage",
        getPageElement: () => <QuanLyKhieuNaiDonHangDetail />,
        permissionCode: "",
      },
    ],
  },
  {
    key: "QuanLyPhieuXuatTraNCC",
    path: "",
    subMenuTitle: "QuanLyPhieuXuatTraNCC",
    mainMenuKey: "storage",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyPhieuXuatTraNCC",
        path: "storage/QuanLyPhieuXuatTraNCC",
        subMenuTitle: "QuanLyPhieuXuatTraNCC",
        mainMenuKey: "storage",
        getPageElement: () => <QuanLyPhieuXuatTraNCCManagementPage />,
        permissionCode: "",
      },
      {
        key: "QuanLyPhieuXuatTraNCCCreate",
        path: "storage/QuanLyPhieuXuatTraNCC/:code",
        subMenuTitle: "",
        mainMenuKey: "storage",
        getPageElement: () => <QuanLyPhieuXuatTraNCCDetailPage />,
        permissionCode: "",
      },
    ],
  },
  // DongNV
];
