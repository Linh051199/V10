export interface Ser_InvReportRevenueRpt {
  RONo: string; //SoBaoGia
  CheckIndate: string; //NgayVaoXuong
  PaidCreatedDate: string; //NgayThanhToan
  ActualDeliveryDate: string; //NgayGiaoXe
  PlateNo: string; //BienSoXe
  TradeMarkCode: string; //HieuXe
  CusName: string; //KhachHang
  PhoneNo: string; //DienThoai
  Amount: string; //GiaTri
  AmountVAT: string; //Thue
  SumAmount: string; //TongTien
  DebitAmount: string; //KhachHangNo
  RevenueCash: string; //BaoHiemNo
  InsAmount: string; //ThucThu
  lst_Ser_InvReportRevenueRpt: any;
}

export interface Search_Ser_InvReportRevenueRpt_Params {
  UserCode: string;
  FromDate: string;
  ToDate: string;
  FlagDataWH: any;

  FromDateFromTo: any;
}
