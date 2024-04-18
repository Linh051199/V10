import { AdminPage } from "@/pages";
import QuanLyChamSocKhachHang72hPage from "@/pages/customerCare/QuanLyChamSocKhachHang72h/QuanLyChamSocKhachHang72h-list";
import LenhSuChuaDetail from "@/pages/customerCare/QuanLyChamSocKhachHang72h/view/viewLenhSuaChua";
import { QuanLyChamSocKhachHang24hPage } from "@/pages/carservice/QuanLyChamSocKhachHang24h/list/QuanLyChamSocKhachHang24h";
import { BaoCaoXemKPI_PhanThang } from "@/pages/reports/XemBaoCaoAPI_PhanThang";

import { RouteItem } from "@/types";
import KhachHangDichVu72h from "@/pages/customerCare/QuanLyChamSocKhachHang72h/KhachHangDichVu72h/KhachHangDichVu72h";
import QuanLyChucMungSinhNhatKhachHangPage from "@/pages/customerCare/QuanLyChucMungSinhNhatKhachHang/QuanLyChucMungSinhNhatKhachHang-list";
import { QuanLyNhacBaoDuongPage } from "@/pages/customerCare/QuanLyNhacBaoDuong/list/QuanLyNhacBaoDuong";

export const customerCareRoutes: RouteItem[] = [
  {
    key: "customerCare",
    path: "customerCare",
    mainMenuTitle: "customerCare",
    mainMenuKey: "customerCare",
    getPageElement: () => <AdminPage />,
  },
  {
    key: "BaoCaoXemKPI_PT", // Báo cáo tồn kho tối thiểu
    path: "customerCare/BaoCaoXemKPI_PT",
    subMenuTitle: "BaoCaoXemKPI_PT",
    mainMenuKey: "customerCare",
    permissionCode: "",
    getPageElement: () => <BaoCaoXemKPI_PhanThang />,
  },
  {
    key: "QuanLyChamSocKhachHang72h",
    path: "",
    subMenuTitle: "QuanLyChamSocKhachHang72h",
    mainMenuKey: "customerCare",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyKyKhaoSat",
        path: "customerCare/QuanLyChamSocKhachHang72h",
        subMenuTitle: "QuanLyChamSocKhachHang72hManagerPage",
        mainMenuKey: "customerCare",
        getPageElement: () => <QuanLyChamSocKhachHang72hPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyKyKhaoSat",
        path: "customerCare/QuanLyChamSocKhachHang72h/:code",
        subMenuTitle: "QuanLyChamSocKhachHang72h",
        mainMenuKey: "customerCare",
        getPageElement: () => <LenhSuChuaDetail />,
        permissionCode: "",
      },
      {
        key: "KhachHangDichVu72h",
        path: "customerCare/QuanLyChamSocKhachHang72h/abc",
        subMenuTitle: "",
        mainMenuKey: "customerCare",
        getPageElement: () => <KhachHangDichVu72h />,
        permissionCode: "",
      },
      // {
      //   key: "manageQuanLyKyKhaoSat",
      //   path: "service/QuanLyKyKhaoSat/:code",
      //   subMenuTitle: "",
      //   mainMenuKey: "service",
      //   getPageElement: () => <QuanLyKyKhaoSatDetailPage />,
      //   permissionCode: "",
      // },
    ],
  },
  {
    // 82 Quản lý chăm sóc khách hàng 24h
    key: "QuanLyChamSocKhachHang24hPage", // TA
    path: "customerCare/QuanLyChamSocKhachHang24hPage",
    subMenuTitle: "QuanLyChamSocKhachHang24hPage",
    mainMenuKey: "customerCare",
    permissionCode: "",
    getPageElement: () => <QuanLyChamSocKhachHang24hPage />,
  },
  {
    // 83 Quản lý nhắc bảo dưỡng
    key: "QuanLyNhacBaoDuongPage", // TA
    path: "customerCare/QuanLyNhacBaoDuongPage",
    subMenuTitle: "QuanLyNhacBaoDuongPage",
    mainMenuKey: "customerCare",
    permissionCode: "",
    getPageElement: () => <QuanLyNhacBaoDuongPage />,
  },
  {
    // 84
    key: "QuanLyChucMungSinhNhatKhachHang",
    path: "customerCare/QuanLyChucMungSinhNhatKhachHang",
    subMenuTitle: "QuanLyChucMungSinhNhatKhachHang",
    mainMenuKey: "customerCare",
    permissionCode: "",
    getPageElement: () => <QuanLyChucMungSinhNhatKhachHangPage />,
  },
];
