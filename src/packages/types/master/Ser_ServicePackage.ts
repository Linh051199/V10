import { SearchParam } from "../clientgate";

export interface Ser_ServicePackage {
  ServicePackageNo: string; //SoGoiDV
  ServicePackageName: string; //TenGoiDV
  TakingTime: string; //TGSuaChuaDuKien
  IsPublicFlag: string; //PhamVi
  CreatedDate: string; //NgayTao
  Description: string; //MoTa
  IsUserBasePrice: string; //LuaChonCachLayGia
}
export interface SearchSer_ServicePackageParam extends SearchParam {
  ServicePackageNo: string;
  ServicePackageName: string;
  IsPublicFlag: string;
  CreatedDateFrom: string;
  CreatedDateTo: string;
  ServicePackageID: string;
  TakingTimeFrom: string;
  TakingTimeTo: string;
  Creator: string;
  DealerCode?: string;
}
