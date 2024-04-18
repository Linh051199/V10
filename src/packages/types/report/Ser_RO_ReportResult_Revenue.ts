export interface Ser_RO_ReportResult_Revenue {
  RONo: string; //SoBaoGia
  CheckInDate: string; //NgayVaoXuong
  PaidCreatedDate: string; //NgayThanhToan
  PlateNo: string; //BienSoXe
  CusName: string; //KhachHang
  SerPrice: string; //TGDV
  PartOut: string; //PTXuat
  PartIn: string; //PTNhap
  SumCost: string; //ChiPhi
  Profit: string; //LoiNhuan
  lst_Ser_RO_ReportResult_Revenue: any;
}

export interface Search_Ser_RO_ReportResult_Revenue_Params {
  FromDate: string;
  ToDate: string;
  FromDatePaid: string;
  ToDatePaid: string;
  FlagDataWH: any;

  FromDateFromTo: any;
  FromDatePaidFromTo: any;
}
