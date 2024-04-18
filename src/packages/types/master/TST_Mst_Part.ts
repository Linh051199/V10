import { SearchParam } from "../clientgate";

export interface TST_Mst_Part {
  TSTPartCode: string;
  VieNameHTC: string;
  VieName: string;
  EngName: string;
  TSTUnit: string;
  Unit: string;
  VAT: string;
  TSTPrice: string;
  DateEffect: string;
  UpdateDateTime: string;
  UpdateBy: string;
  GroupCode: string;
  TypeCode: string;
  TypeName: string;
  GroupName: string;
  MinOrderQuantity: string;
  TSTWarrantyPrice: string;
  Remark: string;
  TSTPriceBefore: string;
  LUDTime: string;
  LUBy: string;
  TSTCost: string;
}

export interface SearchTST_Mst_PartParam extends SearchParam {
  TSTPartCode: string;
  TSTPartName: string;
  GroupCode: string;
  TypeCode: string;
}
