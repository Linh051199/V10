import { AdminPage } from "@/pages";
import BaoGiaPhuTung from "@/pages/carservice/BaoGiaPhuTung/BaoGiaPhuTung";
import DaiLyTraCuuTonKhoPhuTungManagementPage from "@/pages/carservice/DaiLyTraCuuTonKhoPhuTung/DaiLyTraCuuTonKhoPhuTung-list";
import { DanhSachCuocHenPage } from "@/pages/carservice/DanhSachCuocHen/DanhSachCuocHenPage";
import TaoMoiCuocHenPage from "@/pages/carservice/DanhSachCuocHen/components/TaoMoiCuocHen/TaoMoiCuocHen";
import TinhTrangKhoangHenPage from "@/pages/carservice/DanhSachCuocHen/components/TinhTrangKhoangHen/TinhTrangKhoangHen";
import HTCCapNhatNgayBaoHanhPage from "@/pages/carservice/HTCCapNhatNgayBaoHanh/HTCCapNhatNgayBaoHanh";
import HTCTaoMoiChienDichPage from "@/pages/carservice/NPPQuanLyChienDich/HTCTaoMoiChienDich/HTCTaoMoiChienDich";
import { NPPQuanLyChienDichPage } from "@/pages/carservice/NPPQuanLyChienDich/list/NPPQuanLyChienDich";
import NPPTimKiemThongTinSuaChuaManagementPage from "@/pages/carservice/NPPTimKiemThongTinSuaChua/NPPTimKiemThongTinSuaChua-list";
import NPPTimKiemXeManagementPage from "@/pages/carservice/NPPTimKiemXe/NPPTimKiemXe-list";
import { QuanLyBanTinKyThuatDetailPage } from "@/pages/carservice/QuanLyBanTinKyThuat/QuanLyBanTinKyThuat-detail";
import QuanLyBanTinKyThuatManagementPage from "@/pages/carservice/QuanLyBanTinKyThuat/QuanLyBanTinKyThuat-list";
import { QuanLyDatHangTonKhoToiUuDetailPage } from "@/pages/carservice/QuanLyDatHangKhoToiUu/QuanLyDatHangKhoToiUu-detail";
import QuanLyDatHangTonKhoToiUuManagementPage from "@/pages/carservice/QuanLyDatHangKhoToiUu/QuanLyDatHangKhoToiUu-list";
import QuanLyDeNghiCungCapGiaPage from "@/pages/carservice/QuanLyDeNghiCungCapGia/QuanLyDeNghiCungCapGia-list";
import QuanLyDeNghiCungCapGiaCreate from "@/pages/carservice/QuanLyDeNghiCungCapGia/create-new/create-new";
import QuanLyDeNghiCungCapGiaView from "@/pages/carservice/QuanLyDeNghiCungCapGia/view/view";
import QuanLyDieuChuyenKhoManagementPage from "@/pages/carservice/QuanLyDieuChuyenKho/QuanLyDieuChuyenKho-list";
import { QuanLyDonDatHangNCCDetailPage } from "@/pages/carservice/QuanLyDonDatHangNCC";
import QuanLyDonDatHangNCCManagementPage from "@/pages/carservice/QuanLyDonDatHangNCC/QuanLyDonDatHangNCC-list";
import { QuanLyKyKhaoSatDetailPage } from "@/pages/carservice/QuanLyKyKhaoSat";
import QuanLyKyKhaoSatManagementPage from "@/pages/carservice/QuanLyKyKhaoSat/QuanLyKyKhaoSat";
import { QuanLyPhieuTiepNhanGiaoXeManagerPage } from "@/pages/carservice/QuanLyPhieuTiepNhanGiaoXe/QuanLyPhieuTiepNhanGiaoXe";
import { QuanLyPhieuTiepNhanGiaoXeDetailView } from "@/pages/carservice/QuanLyPhieuTiepNhanGiaoXe/view/view";
import QuanLyPhieuXuatKhoManagementPage from "@/pages/carservice/QuanLyPhieuXuatKho/QuanLyPhieuXuatKho-list";
import QuanLyYeuCauXuatKhoView from "@/pages/carservice/QuanLyPhieuXuatKho/view/view";
import QuanLyPhuTungNoKhachManagementPage from "@/pages/carservice/QuanLyPhuTungNoKhach/QuanLyPhuTungNoKhach-list";
import { QuanLyYeuCauPDIDetailPage } from "@/pages/carservice/QuanLyYeuCauPDI/QuanLyYeuCauPDI-detail";
import QuanLyYeuCauPDIPage from "@/pages/carservice/QuanLyYeuCauPDI/QuanLyYeuCauPDI-list";
import { QuanLyYeuCauXuatKhoDetailPage } from "@/pages/carservice/QuanLyYeuCauXuatKho/QuanLyYeuCauXuatKho-detail";
import QuanLyYeuCauXuatKhoManagementPage from "@/pages/carservice/QuanLyYeuCauXuatKho/QuanLyYeuCauXuatKho-list";
import TheoDoiTienDoPage from "@/pages/carservice/TheoDoiTienDo/TheoDoiTienDo-list";
import ThuVienKyThuatDLPage from "@/pages/carservice/ThuVienKyThuat/ThuVienKyThuat-list/ThuVienKyThuatDL-list";
import ThuVienKyThuatHQPage from "@/pages/carservice/ThuVienKyThuat/ThuVienKyThuat-list/ThuVienKyThuatHQ-list";
import { ThuVienKyThuatViewPage } from "@/pages/carservice/ThuVienKyThuat/view/view";
import TimKiemBanTinKyThuatTheoSoVINManagementPage from "@/pages/carservice/TimKiemBanTinKyThuatTheoSoVIN/TimKiemBanTinKyThuatTheoSoVIN-list";
import TimKiemBaoGiaPhuTungManagementPage from "@/pages/carservice/TimKiemBaoGiaPhuTung/TimKiemBaoGiaPhuTung-list";
import TimKiemPhuTungCanChiaSeManagementPage from "@/pages/carservice/TimKiemPhuTungCanChiaSe/TimKiemPhuTungCanChiaSe-list";
import TimKiemThongTinSuaChuaPage from "@/pages/carservice/TimKiemThongTinSuaChua/TimKiemThongTinSuaChua-list";
import TongHopXuatTheoLenhManagementPage from "@/pages/carservice/TongHopXuatTheoLenh/TongHopXuatTheoLenh-list";
import TraCuuLichSuSuaChuaDLPage from "@/pages/carservice/TraCuuLichSuSuaChua/TraCuuLichSuSuaChua-list/TraCuuLichSuSuaChuaDL-list";
import TraCuuLichSuSuaChuaHQPage from "@/pages/carservice/TraCuuLichSuSuaChua/TraCuuLichSuSuaChua-list/TraCuuLichSuSuaChuaHQ-list";
import TraCuuNgayDangKiBaoHanhPage from "@/pages/carservice/TraCuuNgayDangKiBaoHanh/TraCuuNgayDangKiBaoHanh-list/TraCuuNgayDangKiBaoHanh-list";
import TraCuuPhuTungManagementPage from "@/pages/carservice/TraCuuPhuTung/TraCuuPhuTung-list";
import TrangThaiDichVuChoKHPage from "@/pages/carservice/TrangThaiDichVuChoKH/TrangThaiDichVuChoKH-list";
import DuyetBaoCaoBaoHanh from "@/pages/carservice/XemXetBaoCaoBaoHanh/DuyetBaoCaoBaoHanh/DuyetBaoCaoBaoHanh";
import { XemXetBaoCaoBaoHanhPage } from "@/pages/carservice/XemXetBaoCaoBaoHanh/XemXetBaoCaoBaoHanh/list/XemXetBaoCaoBaoHanh";
import QuanLyHangHoa from "@/pages/demo/hanghoa/quanly/QuanLyHangHoa";
import TaoMoiHangHoa from "@/pages/demo/hanghoa/taomoi/TaoMoiHangHoa";
import TaoMoiKhuyenMai from "@/pages/demo/khuyenmai/taomoi/TaoMoiKhuyenMai";
import TaoMoiVoucher from "@/pages/demo/khuyenmai/voucher/TaoMoiVoucher";
// import TaoMoiKiemKe from "@/pages/demo/kiemke/taomoi/TaoMoiKiemKe"; // chưa add file nên comment tạm nhé
import TaoMoiXuatKho from "@/pages/demo/xuatkho/taomoi/TaoMoiXuatKho";
import { RouteItem } from "@/types";
import CreateColumns from "@/utils/demo/CreateColumns";

export const serviceRoutes: RouteItem[] = [
  {
    key: "Service",
    path: "Service",
    permissionCode: "MNU_ADMIN",
    mainMenuTitle: "Service",
    mainMenuKey: "Service",
    getPageElement: () => <AdminPage />,
  },

  {
    key: "KhuyenMai",
    path: "",
    subMenuTitle: "Khuyến mại",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "TaoMoiKhuyenMai",
        path: "service/TaoMoiKhuyenMai",
        subMenuTitle: "Tạo mới khuyến mại",
        subMenuKey: "KhuyenMai",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <TaoMoiKhuyenMai />,
      },
      {
        key: "TaoMoiVoucher",
        path: "service/TaoMoiVoucher",
        subMenuTitle: "Tạo mới vourcher",
        subMenuKey: "KhuyenMai",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <TaoMoiVoucher />,
      },
    ],
  },

  {
    key: "XuatKho",
    path: "",
    subMenuTitle: "Xuất kho",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "TaoMoiXuatKho",
        path: "service/TaoMoiXuatKho",
        subMenuTitle: "Tạo mới khuyến mại",
        subMenuKey: "XuatKho",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <TaoMoiXuatKho />,
      },
      // {
      //   key: "TaoMoiKiemKe",
      //   path: "service/TaoMoiKiemKe",
      //   subMenuTitle: "Tạo mới kiểm kê",
      //   subMenuKey: "XuatKho",
      //   mainMenuKey: "service",
      //   permissionCode: "",
      //   getPageElement: () => <TaoMoiKiemKe />,
      // },
    ],
  },

  {
    key: "HangHoa",
    path: "",
    subMenuTitle: "HangHoa",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "QuanLyHangHoa",
        path: "service/QuanLyHangHoa",
        subMenuTitle: "Quan Ly Hang Hoa",
        subMenuKey: "HangHoa",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyHangHoa />,
      },
      {
        key: "TaoMoiHangHoa", // Tạo mới cuộc hẹn
        path: "service/TaoMoiHangHoa",
        subMenuTitle: "TaoMoiHangHoa",
        subMenuKey: "HangHoa",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <TaoMoiHangHoa />,
      },
      {
        key: "ChiTietHangHoa", // Tạo mới cuộc hẹn
        path: "service/ChiTietHangHoa/:id",
        subMenuTitle: "ChiTietHangHoa",
        subMenuKey: "HangHoa",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <TaoMoiHangHoa />,
      },
    ],
  },

  {
    key: "QuanLyYeuCauPDI",
    path: "",
    subMenuTitle: "QuanLyYeuCauPDI",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "QuanLyYeuCauPDI", // Tạo mới cuộc hẹn
        path: "service/QuanLyYeuCauPDI",
        subMenuTitle: "QuanLyYeuCauPDI",
        subMenuKey: "QuanLyYeuCauPDI",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyYeuCauPDIPage />,
      },
      {
        key: "QuanLyYeuCauPDI", // Tạo mới cuộc hẹn
        path: "service/QuanLyYeuCauPDI/:code",
        subMenuTitle: "",
        subMenuKey: "QuanLyYeuCauPDI",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyYeuCauPDIDetailPage />,
      },
    ],
  },

  {
    key: "DanhSachCuocHen",
    path: "",
    subMenuTitle: "DanhSachCuocHen",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "TaoMoiCuocHen", // Tạo mới cuộc hẹn
        path: "service/TaoMoiCuocHen",
        subMenuTitle: "TaoMoiCuocHen",
        subMenuKey: "TaoMoiCuocHen",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <TaoMoiCuocHenPage />,
      },
      {
        key: "TinhTrangKhoangHen", // Tạo mới cuộc hẹn
        path: "service/TinhTrangKhoangHen",
        subMenuTitle: "TinhTrangKhoangHen",
        subMenuKey: "TinhTrangKhoangHen",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <TinhTrangKhoangHenPage />,
      },
      {
        key: "DanhSachCuocHen", // Tạo mới cuộc hẹn
        path: "service/DanhSachCuocHen",
        subMenuTitle: "DanhSachCuocHen",
        subMenuKey: "DanhSachCuocHen",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <DanhSachCuocHenPage />,
      },
      {
        key: "demo", // Tạo mới cuộc hẹn
        path: "service/demo",
        subMenuTitle: "demo",
        subMenuKey: "demo",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <CreateColumns />,
      },
    ],
  },

  {
    key: "NPPQuanLyChienDich",
    path: "",
    subMenuTitle: "NPPQuanLyChienDich",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "NPPQuanLyChienDich", // Quản lý chiến dịch
        path: "service/NPPQuanLyChienDich",
        subMenuTitle: "NPPQuanLyChienDich",
        subMenuKey: "NPPQuanLyChienDich",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <NPPQuanLyChienDichPage />,
      },
      {
        key: "NPPQuanLyChienDich", // Quản lý chiến dịch
        path: "service/NPPQuanLyChienDich/:code",
        subMenuTitle: "",
        subMenuKey: "NPPQuanLyChienDich",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <HTCTaoMoiChienDichPage />,
      },
    ],
  },

  {
    key: "DailLyTheoDoiChienDich",
    path: "",
    subMenuTitle: "DailLyTheoDoiChienDich",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "DaiLyTheoDoiChienDich", // Đại lý theo dõi chiến dịch
        path: "service/DaiLyTheoDoiChienDich",
        subMenuTitle: "DaiLyTheoDoiChienDich",
        subMenuKey: "DaiLyTheoDoiChienDich",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <NPPQuanLyChienDichPage disabled={true} />,
      },
      {
        key: "DaiLyTheoDoiChienDichChiTiet", // Đại lý theo dõi chiến dịch chi tiết
        path: "service/DaiLyTheoDoiChienDichChiTiet/:code",
        subMenuTitle: "",
        subMenuKey: "DaiLyTheoDoiChienDichChiTiet",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <HTCTaoMoiChienDichPage disabled={true} />,
      },
    ],
  },

  {
    key: "XemXetBaoCaoBaoHanh",
    path: "",
    subMenuTitle: "XemXetBaoCaoBaoHanh",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "XemXetBaoCaoBaoHanh", // Duyệt báo cáo bảo hành
        path: "service/XemXetBaoCaoBaoHanh",
        subMenuTitle: "XemXetBaoCaoBaoHanh",
        subMenuKey: "XemXetBaoCaoBaoHanh",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <XemXetBaoCaoBaoHanhPage />,
      },
      {
        key: "DuyetBaoCaoBaoHanh", // Duyệt báo cáo bảo hành
        path: "service/DuyetBaoCaoBaoHanh/:code",
        subMenuTitle: "",
        subMenuKey: "XemXetBaoCaoBaoHanh",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <DuyetBaoCaoBaoHanh />,
      },
    ],
  },

  {
    // Báo cáo tồn kho tối thiểu
    key: "BaoGiaPhuTung", // TA
    path: "report/BaoGiaPhuTung",
    subMenuTitle: "BaoGiaPhuTung",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <BaoGiaPhuTung />,
  },
  {
    key: "QuanLyKyKhaoSat",
    path: "",
    subMenuTitle: "QuanLyKyKhaoSat",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyKyKhaoSat",
        path: "service/QuanLyKyKhaoSat",
        subMenuTitle: "QuanLyKyKhaoSatManage",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyKyKhaoSatManagementPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyKyKhaoSat",
        path: "service/QuanLyKyKhaoSat/:code",
        subMenuTitle: "",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyKyKhaoSatDetailPage />,
        permissionCode: "",
      },
    ],
  },
  {
    key: "QuanLyPhieuTiepNhanGiaoXe",
    path: "",
    subMenuTitle: "QuanLyPhieuTiepNhanGiaoXe",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyKyKhaoSat",
        path: "service/QuanLyPhieuTiepNhanGiaoXeManager",
        subMenuTitle: "QuanLyPhieuTiepNhanGiaoXeManagerPage",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyPhieuTiepNhanGiaoXeManagerPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyKyKhaoSat",
        path: "service/QuanLyPhieuTiepNhanGiaoXe/:code",
        subMenuTitle: "QuanLyPhieuTiepNhanGiaoXe",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyPhieuTiepNhanGiaoXeDetailView />,
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

  // =============================START PHANTHANG====================================
  // 44 Trạng thái dịch vụ cho KH - 45p
  {
    key: "TrangThaiDichVuChoKH",
    path: "",
    subMenuTitle: "TrangThaiDichVuChoKH",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageTrangThaiDichVuChoKH",
        path: "service/TrangThaiDichVuChoKH/manageTrangThaiDichVuChoKH",
        subMenuTitle: "TrangThaiDichVuChoKH",
        mainMenuKey: "service",
        getPageElement: () => <TrangThaiDichVuChoKHPage />,
        permissionCode: "",
      },
    ],
  },
  // 45. Theo dõi tiến độ
  {
    key: "TheoDoiTienDo",
    path: "",
    subMenuTitle: "TheoDoiTienDo",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageTheoDoiTienDo",
        path: "service/TheoDoiTienDo/manageTheoDoiTienDo",
        subMenuTitle: "TheoDoiTienDo",
        mainMenuKey: "service",
        getPageElement: () => <TheoDoiTienDoPage />,
        permissionCode: "",
      },
    ],
  },
  // 49. Tìm kiếm thông tin sửa chữa
  {
    key: "TimKiemThongTinSuaChua",
    path: "",
    subMenuTitle: "TimKiemThongTinSuaChua",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageTimKiemThongTinSuaChua",
        path: "service/TimKiemThongTinSuaChua/manageTimKiemThongTinSuaChua",
        subMenuTitle: "TimKiemThongTinSuaChua",
        mainMenuKey: "service",
        getPageElement: () => <TimKiemThongTinSuaChuaPage />,
        permissionCode: "",
      },
    ],
  },
  // 62. Tra cứu ngày đăng kí bảo hành
  {
    key: "TraCuuNgayDangKiBaoHanh",
    path: "",
    subMenuTitle: "TraCuuNgayDangKiBaoHanh",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageTraCuuNgayDangKiBaoHanh",
        path: "service/TraCuuNgayDangKiBaoHanh/manageTraCuuNgayDangKiBaoHanh",
        subMenuTitle: "TraCuuNgayDangKiBaoHanh",
        mainMenuKey: "service",
        getPageElement: () => <TraCuuNgayDangKiBaoHanhPage />,
        permissionCode: "",
      },
    ],
  },
  // 63 Thư viện kỹ thuật
  {
    key: "ThuVienKyThuat",
    path: "",
    subMenuTitle: "ThuVienKyThuat",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageThuVienKyThuatDL",
        path: "service/ThuVienKyThuatDL/manageThuVienKyThuatDL",
        subMenuTitle: "ThuVienKyThuatDL",
        mainMenuKey: "service",
        getPageElement: () => <ThuVienKyThuatDLPage />,
        permissionCode: "",
      },
      {
        key: "manageThuVienKyThuatHQ",
        path: "service/ThuVienKyThuatHQ/manageThuVienKyThuatHQ",
        subMenuTitle: "ThuVienKyThuatHQ",
        mainMenuKey: "service",
        getPageElement: () => <ThuVienKyThuatHQPage />,
        permissionCode: "",
      },
      {
        key: "manageThuVienKyThuatDLView",
        path: "service/ThuVienKyThuatDL/manageThuVienKyThuatDL/:code",
        subMenuTitle: "",
        mainMenuKey: "service",
        getPageElement: () => <ThuVienKyThuatViewPage />,
        permissionCode: "",
      },
      {
        key: "manageThuVienKyThuatHQView",
        path: "service/ThuVienKyThuatHQ/manageThuVienKyThuatHQ/:code",
        subMenuTitle: "",
        mainMenuKey: "service",
        getPageElement: () => <ThuVienKyThuatViewPage />,
        permissionCode: "",
      },
    ],
  },
  // 50 Tra cứu lịch sử sửa chữa
  {
    key: "TraCuuLichSuSuaChua",
    path: "",
    subMenuTitle: "TraCuuLichSuSuaChua",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageTraCuuLichSuSuaChuaDL",
        path: "service/TraCuuLichSuSuaChuaDL/manageTraCuuLichSuSuaChuaDL",
        subMenuTitle: "TraCuuLichSuSuaChuaDL",
        mainMenuKey: "service",
        getPageElement: () => <TraCuuLichSuSuaChuaDLPage />,
        permissionCode: "",
      },
      {
        key: "manageTraCuuLichSuSuaChuaHQ",
        path: "service/TraCuuLichSuSuaChuaHQ/manageTraCuuLichSuSuaChuaHQ",
        subMenuTitle: "TraCuuLichSuSuaChuaHQ",
        mainMenuKey: "service",
        getPageElement: () => <TraCuuLichSuSuaChuaHQPage />,
        permissionCode: "",
      },
    ],
  },
  // =============================END PHANTHANG====================================

  {
    // 79 Tra cứu phụ tùng
    key: "TraCuuPhuTung", // Tuệ
    path: "service/TraCuuPhuTung/manageTraCuuPhuTung",
    subMenuTitle: "TraCuuPhuTung",
    subMenuKey: "TraCuuPhuTung",
    mainMenuKey: "service",
    permissionCode: "",
    getPageElement: () => <TraCuuPhuTungManagementPage />,
  },
  {
    // 74 Quản lý phụ tùng nợ khách
    key: "QuanLyDonDatHangNCC", //Tuệ
    path: "",
    subMenuTitle: "QuanLyDonDatHangNCC",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyDonDatHangNCC",
        path: "service/QuanLyDonDatHangNCC/manageQuanLyDonDatHangNCC",
        subMenuTitle: "QuanLyDonDatHangNCC",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyDonDatHangNCCManagementPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyDonDatHangNCCDetail",
        path: "service/QuanLyDonDatHangNCC/manageQuanLyDonDatHangNCC/:code",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyDonDatHangNCCDetailPage />,
      },
    ],
  },
  {
    // 75 Đại lý cứu tồn kho phụ tùng
    key: "DaiLyTraCuuTonKhoPhuTung", // Tuệ
    path: "service/DaiLyTraCuuTonKhoPhuTung/manageDaiLyTraCuuTonKhoPhuTung",
    subMenuTitle: "DaiLyTraCuuTonKhoPhuTung",
    subMenuKey: "DaiLyTraCuuTonKhoPhuTung",
    mainMenuKey: "service",
    permissionCode: "",
    getPageElement: () => <DaiLyTraCuuTonKhoPhuTungManagementPage />,
  },
  {
    // 74 Quản lý phụ tùng nợ khách
    key: "QuanLyPhuTungNoKhach", //Tuệ
    path: "",
    subMenuTitle: "QuanLyPhuTungNoKhach",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyPhuTungNoKhach",
        path: "service/QuanLyPhuTungNoKhach/manageQuanLyPhuTungNoKhach",
        subMenuTitle: "QuanLyPhuTungNoKhach",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyPhuTungNoKhachManagementPage />,
        permissionCode: "",
      },
    ],
  },
  {
    // 72 Quản lý đặt hàng tồn kho tối ưu
    key: "QuanLyDatHangTonKhoToiUu", //Tuệ
    path: "",
    subMenuTitle: "QuanLyDatHangTonKhoToiUu",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyDatHangTonKhoToiUu",
        path: "service/QuanLyDatHangTonKhoToiUu/manageQuanLyDatHangTonKhoToiUu",
        subMenuTitle: "QuanLyDatHangTonKhoToiUu",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyDatHangTonKhoToiUuManagementPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyDatHangTonKhoToiUuDetail",
        path: "service/QuanLyDatHangTonKhoToiUu/manageQuanLyDatHangTonKhoToiUu/:code",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyDatHangTonKhoToiUuDetailPage />,
      },
    ],
  },
  {
    //71 Quản lý điều chuyển kho
    key: "QuanLyDieuChuyenKho", // Tuệ
    path: "service/QuanLyDieuChuyenKho/manageQuanLyDieuChuyenKho",
    subMenuTitle: "QuanLyDieuChuyenKho",
    subMenuKey: "QuanLyDieuChuyenKho",
    mainMenuKey: "service",
    permissionCode: "",
    getPageElement: () => <QuanLyDieuChuyenKhoManagementPage />,
  },
  {
    //69 Tìm kiếm phụ tùng cần chia sẻ
    key: "TimKiemPhuTungCanChiaSe", // Tuệ
    path: "service/TimKiemPhuTungCanChiaSe/manageTimKiemPhuTungCanChiaSe",
    subMenuTitle: "TimKiemPhuTungCanChiaSe",
    subMenuKey: "TimKiemPhuTungCanChiaSe",
    mainMenuKey: "service",
    permissionCode: "",
    getPageElement: () => <TimKiemPhuTungCanChiaSeManagementPage />,
  },
  {
    //68 Tổng hợp xuất theo lệnh
    key: "TongHopXuatTheoLenh", // Tuệ
    path: "service/TongHopXuatTheoLenh/manageTongHopXuatTheoLenh",
    subMenuTitle: "TongHopXuatTheoLenh",
    subMenuKey: "TongHopXuatTheoLenh",
    mainMenuKey: "service",
    permissionCode: "",
    getPageElement: () => <TongHopXuatTheoLenhManagementPage />,
  },
  {
    //58 Tìm kiếm bản tin kỹ thuật theo số VIN
    key: "TimKiemBanTinKyThuatTheoSoVIN", // Tuệ
    path: "service/TimKiemBanTinKyThuatTheoSoVIN/manageTimKiemBanTinKyThuatTheoSoVIN",
    subMenuTitle: "TimKiemBanTinKyThuatTheoSoVIN",
    subMenuKey: "TimKiemBanTinKyThuatTheoSoVIN",
    mainMenuKey: "service",
    permissionCode: "",
    getPageElement: () => <TimKiemBanTinKyThuatTheoSoVINManagementPage />,
  },
  {
    // 52 Tìm kiếm báo giá phụ tùng
    key: "TimKiemBaoGiaPhuTung", // Tuệ
    path: "service/TimKiemBaoGiaPhuTung/manageTimKiemBaoGiaPhuTung",
    subMenuTitle: "TimKiemBaoGiaPhuTung",
    subMenuKey: "TimKiemBaoGiaPhuTung",
    mainMenuKey: "service",
    permissionCode: "",
    getPageElement: () => <TimKiemBaoGiaPhuTungManagementPage />,
  },
  {
    //160. NPP tìm kiếm xe
    key: "NPPTimKiemXe", // Tuệ
    path: "service/NPPTimKiemXe/manageNPPTimKiemXe",
    subMenuTitle: "NPPTimKiemXe",
    subMenuKey: "NPPTimKiemXe",
    mainMenuKey: "service",
    permissionCode: "",
    getPageElement: () => <NPPTimKiemXeManagementPage />,
  },
  {
    // 159. Quản lý bản tin kỹ thuật
    key: "QuanLyBanTinKyThuat", //Tuệ
    path: "",
    subMenuTitle: "QuanLyBanTinKyThuat",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyBanTinKyThuat",
        path: "service/QuanLyBanTinKyThuat/manageQuanLyBanTinKyThuat",
        subMenuTitle: "QuanLyBanTinKyThuat",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyBanTinKyThuatManagementPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyBanTinKyThuatDetail",
        path: "service/QuanLyBanTinKyThuat/manageQuanLyBanTinKyThuat/:code",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyBanTinKyThuatDetailPage />,
      },
    ],
  },

  // DongNV
  // 161
  {
    key: "NPPTimKiemThongTinSuaChuaPage",
    path: "service/NPPTimKiemThongTinSuaChua",
    subMenuTitle: "NPPTimKiemThongTinSuaChua",
    mainMenuKey: "service",
    getPageElement: () => <NPPTimKiemThongTinSuaChuaManagementPage />,
    permissionCode: "",
  },
  {
    // 66
    key: "QuanLyYeuCauXuatKho", //DongNV
    path: "",
    subMenuTitle: "QuanLyYeuCauXuatKho",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyYeuCauXuatKho",
        path: "service/QuanLyYeuCauXuatKho",
        subMenuTitle: "QuanLyYeuCauXuatKho",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyYeuCauXuatKhoManagementPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyYeuCauXuatKho",
        path: "service/QuanLyYeuCauXuatKho/:code",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyYeuCauXuatKhoDetailPage />,
      },
    ],
  },
  {
    key: "manageHTCCapNhatNgayBaoHanh",
    path: "service/HTCCapNhatNgayBaoHanh",
    subMenuTitle: "HTCCapNhatNgayBaoHanh",
    mainMenuKey: "service",
    getPageElement: () => <HTCCapNhatNgayBaoHanhPage />,
    permissionCode: "",
  },
  {
    // 159. Quản lý bản tin kỹ thuật
    key: "QuanLyPhieuXuatKho", //Tuệ
    path: "",
    subMenuTitle: "QuanLyPhieuXuatKho",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyPhieuXuatKho",
        path: "service/QuanLyPhieuXuatKho",
        subMenuTitle: "QuanLyPhieuXuatKho",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyPhieuXuatKhoManagementPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyPhieuXuatKho",
        path: "service/QuanLyPhieuXuatKho/:code",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyYeuCauXuatKhoView />,
      },
    ],
  },
  {
    // 159. Quản lý bản tin kỹ thuật
    key: "QuanLyDeNghiCungCapGia", //Tuệ
    path: "",
    subMenuTitle: "QuanLyDeNghiCungCapGia",
    mainMenuKey: "service",
    permissionCode: "",
    items: [
      {
        key: "manageQuanLyDeNghiCungCapGia",
        path: "service/QuanLyDeNghiCungCapGia",
        subMenuTitle: "QuanLyDeNghiCungCapGia",
        mainMenuKey: "service",
        getPageElement: () => <QuanLyDeNghiCungCapGiaPage />,
        permissionCode: "",
      },
      {
        key: "manageQuanLyDeNghiCungCapGia",
        path: "service/QuanLyDeNghiCungCapGia/new",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyDeNghiCungCapGiaCreate />,
      },
      {
        key: "manageQuanLyDeNghiCungCapGia",
        path: "service/QuanLyDeNghiCungCapGia/:code",
        mainMenuKey: "service",
        permissionCode: "",
        getPageElement: () => <QuanLyDeNghiCungCapGiaView />,
      },
    ],
  },

  //DongNV
];
