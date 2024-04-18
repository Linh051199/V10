import { SearchParam } from "../clientgate";

export interface Ser_GroupRepair {
  GroupRID: string;
  GroupRNo: string;
  DealerCode: string;
  GroupRName: string;
  Note: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  CreatedDate: string;
  CreatedBy: string;
}

export interface Search_Ser_GroupRepair_Param extends SearchParam {
  GroupRID: string;
  DealerCode: string;
  GroupRNo: string;
  GroupRName: string;
  IsActive: string;
}
