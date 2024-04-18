export interface QuanLyBanTinKyThuat {
  SoBanTin: string;
  SoBanTinHMC: string;
  NgayTao: string;
  FileDinhKem: string;
  MoTa: string;
  NgayHetHanBanTin: string;
}

export interface QuanLyBanTinKyThuat_Search {
  SoBanTin: string;
  NgayTaoTu: string;
  NgayTaoDen: string;
  NgayTao: any;
  VIN: string;
  Ft_PageIndex: number;
  Ft_PageSize: number;
}

export interface QuanLyBanTinKyThuat_Item {
  VIN: string;
  MaCongViec: string;
  TenCongViec: string;
  MaPhuTung: string;
  TenPhuTung: string;
}
