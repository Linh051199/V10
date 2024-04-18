import { SearchParam } from "../clientgate";

export interface XemXetBaoCaoBaoHanh {
  STT: string;
  MaDaiLy: string;
  TenDaiLy: string;
  SoBCBH: string;
  LoaiBCBH: string;
  ChiTietLoaiBCBH: string;
  SoKhung: string;
  BienSo: string;
  NgayGui: string;
  NoiDungCV: string;
  NgayCTBH: string;
  TrangThai: string;
  TongTien: string;
  Km: string;
  SoBCBH_HTC: string;
  SoBCBH_HMC: string;
  TrangThaiGuiHMC: string;
}

export interface Search_XemXetBaoCaoBaoHanh_Param extends SearchParam {
  MaDaiLy: string;
  SoKhung: string;
  NgayGuiTu: any;
  LoaiBCBH: string;
  ChiTietBCBH: string;
  TrangThaiGuiHMC: string;
  TrangThai: any;
  FlagWH: "0" | "1";
}
