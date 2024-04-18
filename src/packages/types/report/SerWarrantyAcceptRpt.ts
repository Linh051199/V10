export interface SerWarrantyAcceptRpt {
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

export interface Search_SerWarrantyAcceptRpt_Params {
  FromDate: string;
  ToDate: string;
  FlagDataWH: any;
  DealerCode: string;
  FromDateFromTo: any;
}
