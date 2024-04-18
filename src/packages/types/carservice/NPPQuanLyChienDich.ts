import { SearchParam } from "../clientgate";

export interface NPPQuanLyChienDich {
  STT: string;
  MaChienDich: string;
  TenChienDich: string;
  NgayTao: string;
  NoiDung: string;
  TuNgay: string;
  DenNgay: string;
  TrangThai: string;
}

export interface Search_NPPQuanLyChienDich_Param extends SearchParam {
  MaChienDich: string;
  TenChienDich: string;
  FlagWH: string;
}
