import { SearchParam } from "../clientgate";

export interface QuanLyYeuCauPDI {
  STT: string;
  MaDaiLy: string;
  SoYCPDI: string;
  NgayTao: string;
  NgayDuyet: string;
  NoiDung: string;
  TrangThai: string;
  NguoiTao: string;
  PhuKien: any;
  SoLuongXe: any;
  SoXeHoanThanh: any;
}

export interface Search_QuanLyYeuCauPDI_Param extends SearchParam {
  SoYCPDI: string;
  NgayTao: any;
  VIN: string;
  SoHD: string;
  DaiLy: any;
  TrangThai: any;
  NgayTaoFrom: any;
  NgayTaoTo: any;
  FlagWH: "0" | "1";
}
