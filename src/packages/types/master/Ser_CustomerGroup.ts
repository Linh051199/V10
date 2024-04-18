import { SearchParam } from "../clientgate";

export interface Ser_CustomerGroup {
  MaKhachDoan: string;
  TenKhachDoan: string;
  DiaChi: string;
  DienThoaiCoDinh: string;
  FAX: string;
  Email: string;
  MaSoThue: string;
  MoTa: string;
}

export interface SearchSer_CustomerGroupParam extends SearchParam {
  CustomerGroupNo: string;
  CustomerGroupName: string;
  Address: string;
  IsGetDetail: string;
}
