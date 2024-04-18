import { SearchParam } from "../clientgate";

export interface QuanLyChamSocKhachHang72h_Param extends SearchParam {
  TenCaNhanToChuc: string;
  DiaChi: string;
  BienSo: any;
  SoVIN: string;
  NgayVaoSuaChuaFrom: string;
  NgayVaoSuaChuaTo: string;
  NgayVaoSuaChuaFromTo: any;
  NgayGiaoXeFrom: any;
  NgayGiaoXeTo: any;
  NgayGiaoXeFromTo: any;
  GioiTinh: any
  LoaiXe: any
  Model: any
  FlagWH: "0" | "1";
}
