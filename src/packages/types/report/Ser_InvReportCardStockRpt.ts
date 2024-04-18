export interface Ser_InvReportCardStockRpt {
  RefNo: string;
  RefDate: string;
  Remark: string;
  SLN: string;
  SLX: string;
  SLD: string;
  TGN: string;
  TGX: string;
  TGD: string;
  LocationName: string;
  Price: string;
  RoNo: string;
  PlateNo: string;
  lst_Ser_InvReportCardStockRpt: any;
}

export interface Search_Ser_InvReportCardStockRpt_Params {
  FromDate: string;
  ToDate: string;
  PartCode: string;
  TenHang: string;
  DealerCode: string;
  DVT: string;
  FlagDataWH: any;

  FromDateFromTo: any;
}
