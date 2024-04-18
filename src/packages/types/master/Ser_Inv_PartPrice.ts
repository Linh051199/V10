import { SearchParam } from "../clientgate";

export interface Ser_Inv_PartPrice {
  MaPhuTung: string;
  TenPhuTung: string;
  TenTiengAnh: string;
  GiaBan: string;
  NgayHieuLuc: string;
  GhiChu: string;
}

export interface SearchSer_Inv_PartPriceParam extends SearchParam {
  MaPhuTung: string;
  TenPhuTung: string;
  BatDauHieuLucFrom: string;
  BatDauHieuLucTo: string;
  BatDauHieuLucFromTo: any;
}
