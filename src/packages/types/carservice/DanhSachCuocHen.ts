import { SearchParam } from "../clientgate";

export interface DanhSachCuocHen {
  STT: string;
  SoCuocHen: string;
  SoPhieuKiemTra: string;
  BienSo: string;
  TenKH: string;
  SoDT: string;
  Hang: string;
  NguoiTao: string;
  Nguon: string;
  CVDV: string;
  KhoangSC: string;
  NgayHen: string;
  GioHen: string;
  TrangThai: string;
}

export interface Search_DanhSachCuocHen_Param extends SearchParam {
  NgayHen: any;
  BienSo: string;
  DaiLy: any;
  TenKH: string;
  NguoiTao: any;
  TrangThai: any;
  NgayHenTu?: any;
  NgayHenDen?: any;
  FlagWH: "0" | "1";
}
