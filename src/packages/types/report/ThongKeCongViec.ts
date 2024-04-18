export interface ThongKeCongViec {
  Lenh: string;
  BienSoXe: string;
  MaCongViec: string;
  CongViec: string;
  NgayVaoXuong: string;
  TienCong: string;
  TrangThai: string;
}

export interface Search_ThongKeCongViec_Params {
  NgayVaoXuongFrom: string;
  NgayVaoXuongTo: string;
  ChoSua: boolean;
  DangSua: boolean;
  SuaXong: boolean;
  KiemTraCuoiCung: boolean;
  ThanhToanXong: boolean;
  DaGiaoXe: boolean;
  LenhHuy: boolean;
  KhongDung: boolean;
  FlagDataWH: boolean;

  NgayVaoXuongFromTo: any;
}
