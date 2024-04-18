import { SearchParam } from "../clientgate";

export interface QuanLyAnhTrenPhieuTNGX {
  ReceptionFAudType: string;
  ModelCode: string;
  FilePath: string;
}

export interface Search_QuanLyAnhTrenPhieuTNGX_Param extends SearchParam {
  ReceptionFAudType: string;
  ModelCode: string;
}

export interface Create_Params_QuanLyAnhTrenPhieuTNGX {
  Ser_Mst_ModelAudImage: {
    ReceptionFAudType: string;
    ModelCode: string;
    FilePath: string;
    Remark: string
  }
}