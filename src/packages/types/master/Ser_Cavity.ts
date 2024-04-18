import { SearchParam } from "../clientgate";

export interface Ser_Cavity {
  CavityID: string;
  DealerCode: string;
  CavityNo: string;
  CavityName: string;
  CavityType: string;
  Status: string;
  IsActive: string;
  Note: string;
  LogLUDateTime: string;
  LogLUBy: string;
  StartUseDate: string;
  FinishUseDate: string;
  CreatedDate: string;
  CreatedBy: string;
}

export interface Search_Ser_Cavity_Param extends Partial<SearchParam> {
  CavityNo: string;
  CavityName: string;
  CavityType: string;
  IsActive: string;
  Status: string;
}
