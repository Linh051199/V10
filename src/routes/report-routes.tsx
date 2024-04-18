import { AdminPage } from "@/pages";
import { SerPaymentPage } from "@/pages/reports/SerPayment/SerPayment";
import { SerInvReportInsuranceDebitRptPage } from "@/pages/reports/SerInvReportInsuranceDebitRpt/SerInvReportInsuranceDebitRpt";
import { Ser_InvReportCusDebitRptPage } from "@/pages/reports/Ser_InvReportCusDebitRpt/Ser_InvReportCusDebitRpt";
import { SerReportReceivableDebitRptPage } from "@/pages/reports/SerReportReceivableDebitRpt/SerReportReceivableDebitRpt";
import { Ser_RO_ReportResult_RevenuePage } from "@/pages/reports/Ser_RO_ReportResult_Revenue/Ser_RO_ReportResult_Revenue";
import { Ser_InvReportCardStockRptPage } from "@/pages/reports/Ser_InvReportCardStockRpt/Ser_InvReportCardStockRpt";
import { ThongKeCongViecPage } from "@/pages/reports/ThongKeCongViec/ThongKeCongViec";
import { ReportROByDatePage } from "@/pages/reports/ReportROByDate/ReportROByDate";
import { Ser_InvReportRevenueRptPage } from "@/pages/reports/Ser_InvReportRevenueRpt/Ser_InvReportRevenueRpt";
import { BaoCaoXeLuuKhoDL_HTCPage } from "@/pages/reports/BaoCaoXeLuuKhoDL_HTC/list/BaoCaoXeLuuKhoDL_HTC";
import { Rpt_BaoHanhXeSOLATIPage } from "@/pages/reports/Rpt_BaoHanhXeSOLATI/list/Rpt_BaoHanhXeSOLATI";
import { ThongKeXeConHanBaoHanhPage } from "@/pages/reports/ThongKeXeConHanBaoHanh/list/ThongKeXeConHanBaoHanh";
import { RouteItem } from "@/types";
import { ThongKeBaoHanhTheoModelPage } from "@/pages/reports/ThongKeBaoHanhTheoModel/list/ThongKeBaoHanhTheoModel";
import { Rpt_BaoCaoPhuTungChamLuanChuyenPage } from "@/pages/reports/Rpt_BaoCaoPhuTungChamLuanChuyen/list/Rpt_BaoCaoPhuTungChamLuanChuyen";
import { Rpt_KhaNangCungUngPhuTungDLKHPage } from "@/pages/reports/Rpt_KhaNangCungUngPhuTungDL-KH/list/Rpt_KhaNangCungUngPhuTungDL-KH";
import { Rpt_ThongKeKhachHangKhongQuayLaiLamDichVuPage } from "@/pages/reports/Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu/list/Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu";
import { Ser_ReportRoVarianceCostPage } from "@/pages/reports/Rpt_ThongKeBaoGiaChenhLechChuan/list/Ser_ReportRoVarianceCost";
import { Rpt_ThongKeTheoDaiLyPage } from "@/pages/reports/Rpt_ThongKeTheoDaiLy";
import { Rpt_BaoHanhThongKeTheoThangPage } from "@/pages/reports/Rpt_BaoHanhThongKeTheoThang";
import { Ser_Campaign_Dealer_RptHQPage } from "@/pages/reports/TongHopChienDichKhuyenMai";
import { Ser_Count_CustomerPage } from "@/pages/reports/ThongKeDichVuKhachHang";
import { Ser_Count_Customer_To_HTCPage } from "@/pages/reports/ThongKeDichVuKhachHangGuiHTC/list/Ser_Count_Customer_To_HTC";
import { Ser_Customer_Care_RptPage } from "@/pages/reports/BaoCaoChamSocKhachHang";
import { Rpt_Correct_Repair_RateDLPage } from "@/pages/reports/BaoCaoTyLeSuaChuaDung/list/Rpt_Correct_Repair_RateDL";
import { Rpt_VehicleServiceFrequencyPage } from "@/pages/reports/BaoCaoTanSuatXeLamDichVu/list/Rpt_VehicleServiceFrequency";
import { Rpt_ThongKeTheoKhuVucPage } from "@/pages/reports/Rpt_ThongKeTheoKhuVuc";
import { Rpt_ThongKeTheoModelPage } from "@/pages/reports/Rpt_ThongKeTheoModel";
import { Rpt_PivotChamTonToiThieuPage } from "@/pages/reports/Rpt_PivotChamTonToiThieu";
import { Rpt_ThongKeBaoHanhTheoPhuTungPage } from "@/pages/reports/Rpt_ThongKeBaoHanhTheoPhuTung";
import { BaoCaoPivotChamTonToiThieu } from "@/pages/reports/BaoCaoPivotChamTonToiThieu";
import { XemBaoCaoKPI } from "@/pages/reports/XemBaoCaoKPI";
import { Rpt_ThongKePhuTungChamTonToiThieuPage } from "@/pages/reports/ThongKePhuTungChamTonToiThieu/list/ThongKePhuTungChamTonToiThieu";
import { Rpt_ThongKePhuTungCoLoiNhuanCaoPage } from "@/pages/reports/Thong KePhuTungCoLoiNhuanCao/list/ThongKePhuTungCoLoiNhuanCao";
import { Rpt_ThongKePhuTungCoDoanhThuCaoCaoPage } from "@/pages/reports/ThongKeDoanhThuCoDoanhThuCao/list/ThongKePhuTungCoDoanhThuCao";
import { Rpt_ThongKePhuTungLuanChuyenNhanhPage } from "@/pages/reports/ThongKePhuTungLuanChuyenNhanh/list/ThongKePhuTungLuanChuyenNhanh";
import { Ser_InvReportPartTopVariationPricePage } from "@/pages/reports/ThongKePhuTungBienDongGiaNhap/list/Ser_InvReportPartTopVariationPrice";
import { Ser_ReportHistoryCostPage } from "@/pages/reports/TheoDoiLichSuGiaNhap/list/Ser_ReportHistoryCost";
import { Ser_Report_Customer_Not_BackHQPage } from "@/pages/reports/BaoCaoThongKeKhachHangKhongQuayLaiLamDichVu/list/Ser_Report_Customer_Not_BackHQ";
import { XemBaoCaoKPIVer2 } from "@/pages/reports/XemBaoCaoKPI/list/XemBaoCaoKPIVer2";
import { Rpt_Ability_Supply_PartsHQPage } from "@/pages/reports/BaoCaoKhaNangCungUngPhuTungDLKH/list/Rpt_Ability_Supply_PartsHQ";
import { Rpt_SlowRotationPartsPage } from "@/pages/reports/BaoCaoPhuTungChamLuanChuyen/list/Rpt_SlowRotationParts";
import { SerWarrantyAcceptRptPage } from "@/pages/reports/SerWarrantyAcceptRpt/SerWarrantyAcceptRpt";
import { RptSerCamMarketingHTCSummaryPage } from "@/pages/reports/RptSerCamMarketingHTCSummary/RptSerCamMarketingHTCSummary";
import { RptDMSSerRptDMSClaimPage } from "@/pages/reports/RptDMSSerRptDMSClaim/RptDMSSerRptDMSClaim";
import { SerROWarrantyReportHTCRLUPage } from "@/pages/reports/SerROWarrantyReportHTCRLU/SerROWarrantyReportHTCRLU";
import { BaoCaoXemKPI_PhanThang } from "@/pages/reports/XemBaoCaoAPI_PhanThang";
import { SerROStatisticServiceByGroupPage } from "@/pages/reports/SerROStatisticServiceByGroup/SerROStatisticServiceByGroup";
import { SerInvReportTotalStockOutDetailRptPage } from "@/pages/reports/SerInvReportTotalStockOutDetailRpt/SerInvReportTotalStockOutDetailRpt";
import { SerInvReportTotalStockInDetailRptPage } from "@/pages/reports/SerInvReportTotalStockInDetailRpt/SerInvReportTotalStockInDetailRpt";
import { SerInventoryReportInOutBalancePage } from "@/pages/reports/SerInventoryReportInOutBalance/SerInventoryReportInOutBalance";
import { SerInvReportTotalStockInRptPage } from "@/pages/reports/SerInvReportTotalStockInRpt/SerInvReportTotalStockInRpt";
import { SerInvReportTotalStockOutRptPage } from "@/pages/reports/SerInvReportTotalStockOutRpt/SerInvReportTotalStockOutRpt";
import { SerInvReportBalanceRptPage } from "@/pages/reports/SerInvReportBalanceRpt/SerInvReportBalanceRpt";
import { SerInvReportTotalStockOutDetailRptHTVPage } from "@/pages/reports/SerInvReportTotalStockOutDetailRptHTV/SerInvReportTotalStockOutDetailRptHTV";
import { SerInvReportTotalStockInDetailRptHTVPage } from "@/pages/reports/SerInvReportTotalStockInDetailRptHTV/SerInvReportTotalStockInDetailRptHTV";
import { SerInvReportBalanceRptHTVPage } from "@/pages/reports/SerInvReportBalanceRptHTV/SerInvReportBalanceRptHTV";
import { SerInventoryReportInOutBalanceHTVPage } from "@/pages/reports/SerInventoryReportInOutBalanceHTV/SerInventoryReportInOutBalanceHTV";
import { SerCampaignDealerRptHTVPage } from "@/pages/reports/SerCampaignDealerRptHTV/SerCampaignDealerRptHTV";
import { RptCorrectRepairRateHTVPage } from "@/pages/reports/RptCorrectRepairRateHTV/RptCorrectRepairRate";
import { RptVehicleServiceFrequencyHTVPage } from "@/pages/reports/RptVehicleServiceFrequencyHTV/RptVehicleServiceFrequencyHTV";
import { SerCountCustomerOnlyHTCPage } from "@/pages/reports/SerCountCustomerOnlyHTC/SerCountCustomerOnlyHTC";
import { Rpt_ThongKeBaoGiaChenhLechChuanPage } from "@/pages/reports/ThongKeBaoGiaChenhLechChuan";
import { Ser_Campaign_Dealer_RptDLPage } from "@/pages/reports/TongHopChienDichKhuyenMai/list/Ser_Campaign_Dealer_RptDL";
import { Rpt_Correct_Repair_RateHQPage } from "@/pages/reports/BaoCaoTyLeSuaChuaDung/list/Rpt_Correct_Repair_RateHQ";
import { Ser_Report_Customer_Not_BackDLPage } from "@/pages/reports/BaoCaoThongKeKhachHangKhongQuayLaiLamDichVu/list/Ser_Report_Customer_Not_BackDL";
import { Rpt_Ability_Supply_PartsDLPage } from "@/pages/reports/BaoCaoKhaNangCungUngPhuTungDLKH/list/Rpt_Ability_Supply_PartsDL";
import { Rpt_BaoHanhXeHTMVPage } from "@/pages/reports/Rpt_BaoHanhXeHTMV/list/Rpt_BaoHanhXeHTMV";
import { RptDMSSerDealerNetPricePart } from "@/pages/reports/RptDMSSerDealerNetPricePart";

export const reportRoutes: RouteItem[] = [
  {
    key: "report",
    path: "report",
    // permissionCode: "MNU_REPORT",
    permissionCode: "",
    mainMenuTitle: "report",
    mainMenuKey: "report",
    getPageElement: () => <AdminPage />,
  },
  {
    key: "BaoCaoXemKPI_PT", // Báo cáo tồn kho tối thiểu
    path: "report/BaoCaoXemKPI_PT",
    subMenuTitle: "BaoCaoXemKPI_PT",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <BaoCaoXemKPI_PhanThang />,
  },
  {
    // Báo cáo tồn kho tối thiểu
    key: "BaoCaoPivotChamTonToiThieu", // TA
    path: "report/BaoCaoPivotChamTonToiThieu",
    subMenuTitle: "BaoCaoPivotChamTonToiThieu",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <BaoCaoPivotChamTonToiThieu />,
  },
  {
    // Báo cáo tồn kho tối thiểu
    key: "XemBaoCaoKPIVer2", // TA
    path: "report/XemBaoCaoKPIVer2",
    subMenuTitle: "XemBaoCaoKPIVer2",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <XemBaoCaoKPIVer2 />,
  },

  {
    // Báo cáo xem KPI
    key: "XemBaoCaoKPI", // TA
    path: "report/XemBaoCaoKPI",
    subMenuTitle: "XemBaoCaoKPI",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <XemBaoCaoKPI />,
  },

  {
    //124	Báo cáo phụ tùng chậm luân chuyển
    key: "Rpt_SlowRotationParts", // Tuệ
    path: "report/Rpt_SlowRotationParts",
    subMenuTitle: "Rpt_SlowRotationParts",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_SlowRotationPartsPage />,
  },

  {
    //123	Báo cáo khả năng cung ứng phụ tùng ĐL- KH HQ
    key: "Rpt_Ability_Supply_PartsHQ", // Tuệ
    path: "report/Rpt_Ability_Supply_Parts/HQ",
    subMenuTitle: "Rpt_Ability_Supply_PartsHQ",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_Ability_Supply_PartsHQPage />,
  },

  {
    //123	Báo cáo khả năng cung ứng phụ tùng ĐL- KH DL
    key: "Rpt_Ability_Supply_PartsDL", // Tuệ
    path: "report/Rpt_Ability_Supply_Parts/DL",
    subMenuTitle: "Rpt_Ability_Supply_PartsDL",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_Ability_Supply_PartsDLPage />,
  },

  {
    //122	Báo cáo thống kê khách hàng không quay lại làm dịch vụ HQ
    key: "Ser_Report_Customer_Not_BackHQ", // Tuệ
    path: "report/Ser_Report_Customer_Not_Back/HQ",
    subMenuTitle: "Ser_Report_Customer_Not_BackHQ",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_Report_Customer_Not_BackHQPage />,
  },

  {
    //122	Báo cáo thống kê khách hàng không quay lại làm dịch vụ DL
    key: "Ser_Report_Customer_Not_BackDL", // Tuệ
    path: "report/Ser_Report_Customer_Not_Back/DL",
    subMenuTitle: "Ser_Report_Customer_Not_BackDL",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_Report_Customer_Not_BackDLPage />,
  },

  {
    //121	Theo dõi lịch sử giá nhập
    key: "Ser_ReportHistoryCost", // Tuệ
    path: "report/Ser_ReportHistoryCost",
    subMenuTitle: "Ser_ReportHistoryCost",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_ReportHistoryCostPage />,
  },

  {
    //120	Thống kê báo giá chênh lệch chuẩn
    key: "Rpt_ThongKeBaoGiaChenhLechChuan", // Tuệ
    path: "report/Rpt_ThongKeBaoGiaChenhLechChuan",
    subMenuTitle: "Rpt_ThongKeBaoGiaChenhLechChuan",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_ThongKeBaoGiaChenhLechChuanPage />,
  },

  {
    //119	Thống kê phụ tùng biến động giá nhập
    key: "Ser_InvReportPartTopVariationPrice", // Tuệ
    path: "report/Ser_InvReportPartTopVariationPrice",
    subMenuTitle: "Ser_InvReportPartTopVariationPrice",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_InvReportPartTopVariationPricePage />,
  },

  {
    //118	Thống kê phụ tùng luân chuyển nhanh
    key: "Rpt_ThongKePhuTungLuanChuyenNhanh", // Tuệ
    path: "report/Rpt_ThongKePhuTungLuanChuyenNhanh",
    subMenuTitle: "Rpt_ThongKePhuTungLuanChuyenNhanh",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_ThongKePhuTungLuanChuyenNhanhPage />,
  },

  {
    //117	Thông kê phụ tùng có doanh thu cao
    key: "Rpt_ThongKePhuTungCoDoanhThuCaoCao", // Tuệ
    path: "report/Rpt_ThongKePhuTungCoDoanhThuCaoCao",
    subMenuTitle: "Rpt_ThongKePhuTungCoDoanhThuCaoCao",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_ThongKePhuTungCoDoanhThuCaoCaoPage />,
  },

  {
    //116	Thông kê phụ tùng có lợi nhuận cao
    key: "Rpt_ThongKePhuTungCoLoiNhuanCao", // Tuệ
    path: "report/Rpt_ThongKePhuTungCoLoiNhuanCao",
    subMenuTitle: "Rpt_ThongKePhuTungCoLoiNhuanCao",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_ThongKePhuTungCoLoiNhuanCaoPage />,
  },

  {
    //115	Thống kê phụ tùng chạm tồn tối thiểu
    key: "Rpt_ThongKePhuTungChamTonToiThieu", // Tuệ
    path: "report/Rpt_ThongKePhuTungChamTonToiThieu",
    subMenuTitle: "Rpt_ThongKePhuTungChamTonToiThieu",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_ThongKePhuTungChamTonToiThieuPage />,
  },

  {
    //114	Báo cáo tần xuất xe làm dịch vụ
    key: "Rpt_VehicleServiceFrequency", // Tuệ
    path: "report/Rpt_VehicleServiceFrequency",
    subMenuTitle: "Rpt_VehicleServiceFrequency",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_VehicleServiceFrequencyPage />,
  },

  {
    //113	Báo cáo tỷ lệ sửa chữa đúng HQ
    key: "Rpt_Correct_Repair_RateHQ", // Tuệ
    path: "report/Rpt_Correct_Repair_Rate/HQ",
    subMenuTitle: "Rpt_Correct_Repair_RateHQ",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_Correct_Repair_RateHQPage />,
  },

  {
    //113	Báo cáo tỷ lệ sửa chữa đúng DL
    key: "Rpt_Correct_Repair_RateDL", // Tuệ
    path: "report/Rpt_Correct_Repair_Rate/DL",
    subMenuTitle: "Rpt_Correct_Repair_RateDL",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_Correct_Repair_RateDLPage />,
  },

  {
    //112	Báo cáo chăm sóc khách hàng
    key: "Ser_Customer_Care_Rpt", // Tuệ
    path: "report/Ser_Customer_Care_Rpt",
    subMenuTitle: "Ser_Customer_Care_Rpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_Customer_Care_RptPage />,
  },

  {
    //111	Thống kê dịch vụ khách hàng ( gửi HTC)
    key: "Ser_Count_Customer_To_HTC", // Tuệ
    path: "report/Ser_Count_Customer_To_HTC",
    subMenuTitle: "Ser_Count_Customer_To_HTC",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_Count_Customer_To_HTCPage />,
  },

  {
    //110	Thống kê dịch vụ khách hàng
    key: "Ser_Count_Customer", // Tuệ
    path: "report/Ser_Count_Customer",
    subMenuTitle: "Ser_Count_Customer",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_Count_CustomerPage />,
  },

  {
    //108. Tổng hợp chiến dịch khuyến mãi HQ
    key: "Ser_Campaign_Dealer_RptHQ", // Tuệ
    path: "report/Ser_Campaign_Dealer_Rpt&HQ",
    subMenuTitle: "Ser_Campaign_Dealer_RptHQ",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_Campaign_Dealer_RptHQPage />,
  },

  {
    //108. Tổng hợp chiến dịch khuyến mãi DL
    key: "Ser_Campaign_Dealer_RptDL", // Tuệ
    path: "report/Ser_Campaign_Dealer_Rpt&DL",
    subMenuTitle: "Ser_Campaign_Dealer_RptDL",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_Campaign_Dealer_RptDLPage />,
  },

  // LinhPV
  {
    key: "ReportROByDatePage", // Thông kê lệnh theo ngày
    path: "report/ReportROByDatePage",
    subMenuTitle: "ReportROByDatePage",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <ReportROByDatePage />,
  },

  {
    key: "ThongKeCongViec", // Thông kê công việc
    path: "report/ThongKeCongViec",
    subMenuTitle: "ThongKeCongViec",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <ThongKeCongViecPage />,
  },
  {
    key: "SerROStatisticServiceByGroup", //Thống kê công việc  theo tổ
    path: "report/SerROStatisticServiceByGroup",
    subMenuTitle: "SerROStatisticServiceByGroup",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerROStatisticServiceByGroupPage />,
  },
  {
    key: "Ser_InvReportRevenueRpt", // Tổng hợp doanh thu dịch vụ
    path: "report/Ser_InvReportRevenueRpt",
    subMenuTitle: "Ser_InvReportRevenueRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_InvReportRevenueRptPage />,
  },
  {
    key: "Ser_RO_ReportResult_Revenue", // Báo cáo kết quả kinh doanh
    path: "report/Ser_RO_ReportResult_Revenue",
    subMenuTitle: "Ser_RO_ReportResult_Revenue",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_RO_ReportResult_RevenuePage />,
  },
  {
    key: "Ser_InvReportCusDebitRpt", // Báo cáo công nợ khách hàng
    path: "report/Ser_InvReportCusDebitRpt",
    subMenuTitle: "Ser_InvReportCusDebitRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_InvReportCusDebitRptPage />,
  },
  {
    key: "SerInvReportInsuranceDebitRpt", // Báo cáo công nợ bảo hiểm
    path: "report/SerInvReportInsuranceDebitRpt",
    subMenuTitle: "SerInvReportInsuranceDebitRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerInvReportInsuranceDebitRptPage />,
  },
  {
    key: "SerReportReceivableDebitRpt", // Báo cáo công nợ phải thu
    path: "report/SerReportReceivableDebitRpt",
    subMenuTitle: "SerReportReceivableDebitRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerReportReceivableDebitRptPage />,
  },
  {
    key: "SerInvReportTotalStockInRpt", // Báo cáo tổng hợp nhập
    path: "report/SerInvReportTotalStockInRpt",
    subMenuTitle: "SerInvReportTotalStockInRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerInvReportTotalStockInRptPage />,
  },

  {
    key: "SerInvReportTotalStockOutRpt", // Báo cáo tổng hợp xuất
    path: "report/SerInvReportTotalStockOutRpt",
    subMenuTitle: "SerInvReportTotalStockOutRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerInvReportTotalStockOutRptPage />,
  },
  {
    key: "SerInvReportTotalStockOutDetailRpt", // Báo cáo tổng hợp xuất chi tiết
    path: "report/SerInvReportTotalStockOutDetailRpt",
    subMenuTitle: "SerInvReportTotalStockOutDetailRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerInvReportTotalStockOutDetailRptPage />,
  },
  {
    key: "SerInvReportTotalStockInDetailRpt", // Báo cáo tổng hợp nhập chi tiết
    path: "report/SerInvReportTotalStockInDetailRpt",
    subMenuTitle: "SerInvReportTotalStockInDetailRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerInvReportTotalStockInDetailRptPage />,
  },
  {
    key: "SerInvReportBalanceRpt", // Báo cáo tồn kho
    path: "report/SerInvReportBalanceRpt",
    subMenuTitle: "SerInvReportBalanceRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerInvReportBalanceRptPage />,
  },
  {
    key: "SerInventoryReportInOutBalance", // Báo cáo tổng hợn nhập - xuất - tồn
    path: "report/SerInventoryReportInOutBalance",
    subMenuTitle: "SerInventoryReportInOutBalance",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerInventoryReportInOutBalancePage />,
  },
  {
    key: "Ser_InvReportCardStockRpt", // Thẻ kho
    path: "report/Ser_InvReportCardStockRpt",
    subMenuTitle: "Ser_InvReportCardStockRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Ser_InvReportCardStockRptPage />,
  },
  {
    key: "SerPayment", // Báo cáo bảng kê phiếu thu nợ
    path: "report/SerPayment",
    subMenuTitle: "SerPayment",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerPaymentPage />,
  },

  // LinhPV - Bàn giao của Quang

  // {
  //   key: "SerInvReportTotalStockOutDetailRptHTV", // Báo cáo tổng hợp xuất chi tiết HTV
  //   path: "report/SerInvReportTotalStockOutDetailRptHTV",
  //   subMenuTitle: "SerInvReportTotalStockOutDetailRptHTV",
  //   mainMenuKey: "report",
  //   permissionCode: "",
  //   getPageElement: () => <SerInvReportTotalStockOutDetailRptHTVPage />,
  // },
  // {
  //   key: "SerInvReportTotalStockInDetailRptHTV", // Báo cáo tổng hợp nhập chi tiết HTV
  //   path: "report/SerInvReportTotalStockInDetailRptHTV",
  //   subMenuTitle: "SerInvReportTotalStockInDetailRptHTV",
  //   mainMenuKey: "report",
  //   permissionCode: "",
  //   getPageElement: () => <SerInvReportTotalStockInDetailRptHTVPage />,
  // },
  // {
  //   key: "SerInvReportBalanceRptHTV", // Báo cáo tồn kho HTV
  //   path: "report/SerInvReportBalanceRptHTV",
  //   subMenuTitle: "SerInvReportBalanceRptHTV",
  //   mainMenuKey: "report",
  //   permissionCode: "",
  //   getPageElement: () => <SerInvReportBalanceRptHTVPage />,
  // },
  // {
  //   key: "SerInventoryReportInOutBalanceHTV", // Báo cáo tổng hợn nhập - xuất - tồn HTV
  //   path: "report/SerInventoryReportInOutBalanceHTV",
  //   subMenuTitle: "SerInventoryReportInOutBalanceHTV",
  //   mainMenuKey: "report",
  //   permissionCode: "",
  //   getPageElement: () => <SerInventoryReportInOutBalanceHTVPage />,
  // },
  // {
  //   key: "SerCampaignDealerRptHTV", // Báo cáo Tổng hợp chiến dịch khuyến mại HTV Tuệ
  //   path: "report/SerCampaignDealerRptHTV",
  //   subMenuTitle: "SerCampaignDealerRptHTV",
  //   mainMenuKey: "report",
  //   permissionCode: "",
  //   getPageElement: () => <SerCampaignDealerRptHTVPage />,
  // },

  {
    key: "SerWarrantyAcceptRpt", // báo cáo chấp thuận bảo hành HTV
    path: "report/SerWarrantyAcceptRpt",
    subMenuTitle: "SerWarrantyAcceptRpt",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerWarrantyAcceptRptPage />,
  },
  {
    key: "RptSerCamMarketingHTCSummary", // báo cáo chiến dịch  HTV
    path: "report/RptSerCamMarketingHTCSummary",
    subMenuTitle: "RptSerCamMarketingHTCSummary",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <RptSerCamMarketingHTCSummaryPage />,
  },
  // {
  //   key: "RptCorrectRepairRateHTV", // Báo cáo tỉ lệ sửa chữa đúng  HTV Tuệ
  //   path: "report/RptCorrectRepairRateHTV",
  //   subMenuTitle: "RptCorrectRepairRateHTV",
  //   mainMenuKey: "report",
  //   permissionCode: "",
  //   getPageElement: () => <RptCorrectRepairRateHTVPage />,
  // },
  // {
  //   key: "RptVehicleServiceFrequencyHTV", // Báo cáo tần suất xe làm dịch vụ  HTV Tuệ
  //   path: "report/RptVehicleServiceFrequencyHTV",
  //   subMenuTitle: "RptVehicleServiceFrequencyHTV",
  //   mainMenuKey: "report",
  //   permissionCode: "",
  //   getPageElement: () => <RptVehicleServiceFrequencyHTVPage />,
  // },
  {
    key: "RptDMSSerRptDMSClaim", // báo cáo tỉ  lệ khiếu nại HTV
    path: "report/RptDMSSerRptDMSClaim",
    subMenuTitle: "RptDMSSerRptDMSClaim",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <RptDMSSerRptDMSClaimPage />,
  },
  {
    key: "SerCountCustomerOnlyHTC", // thống kê dịch vụ  bảo dưỡng sửa chữa HTV
    path: "report/SerCountCustomerOnlyHTC",
    subMenuTitle: "SerCountCustomerOnlyHTC",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerCountCustomerOnlyHTCPage />,
  },
  {
    key: "SerROWarrantyReportHTCRLU", // báo cáo bảo hành xe CKD HTV
    path: "report/SerROWarrantyReportHTCRLU",
    subMenuTitle: "SerROWarrantyReportHTCRLU",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <SerROWarrantyReportHTCRLUPage />,
  },

  // LinhPV-End

  // DongNV Start
  {
    key: "Rpt_BaoHanhXeSOLATI",
    path: "report/Rpt_BaoHanhXeSOLATI",
    subMenuTitle: "Rpt_BaoHanhXeSOLATI",
    mainMenuKey: "report",
    permissionCode: "",
    getPageElement: () => <Rpt_BaoHanhXeSOLATIPage />,
  },
  {
    key: "ThongKeBaoHanhTheoModel", // Báo cáo bảng kê phiếu thu nợ
    path: "report/ThongKeBaoHanhTheoModel",
    subMenuTitle: "ThongKeBaoHanhTheoModel",
    mainMenuKey: "report",
    // permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    permissionCode: "",
    getPageElement: () => <ThongKeBaoHanhTheoModelPage />,
  },

  // 147
  {
    key: "BaoCaoXeLuuKhoDL_HTCP",
    path: "report/BaoCaoXeLuuKhoDL_HTC",
    subMenuTitle: "BaoCaoXeLuuKhoDL_HTC",
    mainMenuKey: "report",
    // permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    permissionCode: "",
    getPageElement: () => <BaoCaoXeLuuKhoDL_HTCPage />,
  },
  {
    key: "Rpt_BaoCaoPhuTungChamLuanChuyen", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_BaoCaoPhuTungChamLuanChuyen",
    subMenuTitle: "Rpt_BaoCaoPhuTungChamLuanChuyen",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_BaoCaoPhuTungChamLuanChuyenPage />,
  },
  {
    key: "Rpt_KhaNangCungUngPhuTungDLKH", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_KhaNangCungUngPhuTungDLKH",
    subMenuTitle: "Rpt_KhaNangCungUngPhuTungDLKH",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_KhaNangCungUngPhuTungDLKHPage />,
  },
  {
    key: "Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu",
    subMenuTitle: "Rpt_ThongKeKhachHangKhongQuayLaiLamDichVu",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_ThongKeKhachHangKhongQuayLaiLamDichVuPage />,
  },
  {
    key: "Ser_ReportRoVarianceCost", // Thống kê báo giá chênh lệch chuẩn
    path: "report/Ser_ReportRoVarianceCost",
    subMenuTitle: "Ser_ReportRoVarianceCost",
    mainMenuKey: "report",
    // permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    permissionCode: "",
    getPageElement: () => <Ser_ReportRoVarianceCostPage />,
  },
  {
    key: "Rpt_ThongKeTheoDaiLy", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_ThongKeTheoDaiLy",
    subMenuTitle: "Rpt_ThongKeTheoDaiLy",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_ThongKeTheoDaiLyPage />,
  },
  {
    key: "Rpt_BaoHanhThongKeTheoThang", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_BaoHanhThongKeTheoThang",
    subMenuTitle: "Rpt_BaoHanhThongKeTheoThang",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_BaoHanhThongKeTheoThangPage />,
  },
  {
    key: "Rpt_ThongKeTheoKhuVuc", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_ThongKeTheoKhuVuc",
    subMenuTitle: "Rpt_ThongKeTheoKhuVuc",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_ThongKeTheoKhuVucPage />,
  },
  {
    key: "Rpt_ThongKeTheoModel", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_ThongKeTheoModel",
    subMenuTitle: "Rpt_ThongKeTheoModel",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_ThongKeTheoModelPage />,
  },
  {
    key: "Rpt_PivotChamTonToiThieu", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_PivotChamTonToiThieu",
    subMenuTitle: "Rpt_PivotChamTonToiThieu",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_PivotChamTonToiThieuPage />,
  },
  {
    key: "Rpt_ThongKeBaoHanhTheoPhuTung", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_ThongKeBaoHanhTheoPhuTung",
    subMenuTitle: "Rpt_ThongKeBaoHanhTheoPhuTung",
    mainMenuKey: "report",
    permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    getPageElement: () => <Rpt_ThongKeBaoHanhTheoPhuTungPage />,
  },
  {
    key: "Rpt_BaoHanhXeHTMV", // Báo cáo bảng kê phiếu thu nợ
    path: "report/Rpt_BaoHanhXeHTMV",
    subMenuTitle: "Rpt_BaoHanhXeHTMV",
    mainMenuKey: "report",
    // permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    permissionCode: "",
    getPageElement: () => <Rpt_BaoHanhXeHTMVPage />,
  },
  {
    key: "ThongKeXeConHanBaoHanh", // Báo cáo bảng kê phiếu thu nợ
    path: "report/ThongKeXeConHanBaoHanh",
    subMenuTitle: "ThongKeXeConHanBaoHanh",
    mainMenuKey: "report",
    // permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    permissionCode: "",
    getPageElement: () => <ThongKeXeConHanBaoHanhPage />,
  },

  // DongNV End

  // 165 Báo cáo DNP
  {
    key: "RptDMSSerDealerNetPricePart", // Báo cáo DNP
    path: "report/RptDMSSerDealerNetPricePart",
    subMenuTitle: "RptDMSSerDealerNetPricePart",
    mainMenuKey: "report",
    // permissionCode: "MENU_QUANTRI_QLQUAN/HUYEN",
    permissionCode: "",
    getPageElement: () => <RptDMSSerDealerNetPricePart />,
  },
];
