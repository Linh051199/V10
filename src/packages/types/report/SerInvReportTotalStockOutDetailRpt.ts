export interface SerInvReportTotalStockOutDetailRpt {
  PartCode: string; //MaPhuTung
  VieName: string; //TenPhutung
  Unit: string; //DonViTinh
  Quantity: string; //SoLuong
  Amount: string; //TongSoTien
  lst_Ser_InvReportTotalStockOutDetailRpt: any;
}

export interface Search_SerInvReportTotalStockOutDetailRpt_Params {
  FromDate: string;
  ToDate: string;
  DaiLy?: string;
  FlagDataWH: any;
  DealerCode: string;

  FromDateFromTo: any;
}
