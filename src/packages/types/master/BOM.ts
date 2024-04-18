import { SearchParam } from "../clientgate";

export interface BOM {
  MaBom: string;
  MoTaXe: string;
  TrangThai: string;
  MaVatTu: string;
  TenVatTu: string;
  DonViTinh: string;
  SoLuongToiThieu: string;
}

export interface Search_BOM_Param extends SearchParam {
  BOMCode: string;
  BOMDesc: string;
  // FlagActive: string;
}
