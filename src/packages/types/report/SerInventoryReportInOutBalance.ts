export interface SerInventoryReportInOutBalance {
  PartCode: string; //MaPhuTung
  VieName: string; //TenHang
  Unit: string; //DonViTinh
  SLD: string; //SLD
  TGD: string; //TGD
  SLN: string; //SLN
  TGN: string; //TGN
  SLX: string; //SLX
  TGX: string; //TGX
  SLC: string; //SLC
  TGC: string; //TGC
  Location: string; //KhoViTri
  lst_Ser_InventoryReport_InOutBalance: any;
}

export interface Search_SerInventoryReportInOutBalance_Params {
  FromDate: string;
  ToDate: string;
  DealerCode?: string;
  FlagDataWH?: any;

  FromDateFromTo: any;
}
