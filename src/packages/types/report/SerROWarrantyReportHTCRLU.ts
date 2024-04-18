export interface SerROWarrantyReportHTCRLU {
  MaDaiLy: string;
  TenDaiLy: string;
  SoRO: string;
  VIN: string;
  MaPhuTungLoi: string;
  TenPhuTungLoi: string;
  Ma: string;
  Ten: string;
  TienPT: string;
  TienDV: string;
  TongTien: string;
  NgayChapThuanBH: string;
  SoBCBH: string;
}

export interface Search_SerROWarrantyReportHTCRLU_Params {
  FromDate: string;
  ToDate: string;
  PlateNo: string;
  DealerCode?: string;
  FlagDataWH?: any;

  FromDateFromTo: any;
}
