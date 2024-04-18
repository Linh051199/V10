export interface BaoCaoTiLeKhieuNai {
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

export interface Search_BaoCaoTiLeKhieuNai_Params {
  ThangFrom: string;
  ThangTo: string;
  DaiLy: string;
  FlagDataWH: boolean;

  ThangFromTo: any;
}
