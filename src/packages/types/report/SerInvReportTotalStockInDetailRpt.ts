export interface SerInvReportTotalStockInDetailRpt {
  PartCode: string; //MaPhuTung
  VieName: string; //TenPhutung
  Unit: string; //DonViTinh
  Quantity: string; //SoLuong
  Price: string; // Đơn giá
  VAT: string; // Thuế
  Amount: string; //TongSoTien
  lst_Ser_InvReportTotalStockInDetailRpt: any;
}

export interface Search_SerInvReportTotalStockInDetailRpt_Params {
  FromDate: string;
  ToDate: string;
  DaiLy?: string;
  FlagDataWH: any;
  DealerCode: any;

  FromDateFromTo: any;
}
