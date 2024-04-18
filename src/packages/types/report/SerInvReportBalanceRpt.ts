export interface SerInvReportBalanceRpt {
  PartCode: string; //MaPhuTung
  VieName: string; //TenHang
  Unit: string; //DonViTinh
  SLC: string; //SoLuongCon
  TGC: string; //GiaTri
  Location: string; //KhoViTri
  Model: string; //Model
  TypeName: string; //LoaiHang
  StockInDate: string; //NgayNhapKhoGanNhat
  AgeOfExist: string; //TuoiTonKho
  lst_Ser_InvReportBalanceRpt: any;
}

export interface Search_SerInvReportBalanceRpt_Params {
  TypeReport: string;
  PartCode: string;
  ToDate: any;
  DealerCode?: string;

  FlagDataWH: any;
}
