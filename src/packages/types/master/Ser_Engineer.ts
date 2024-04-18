import { SearchParam } from "../clientgate";

export interface Ser_Engineer {
  EngineerID: string;
  GroupRID: string;
  DealerCode: string;
  EngineerNo: string;
  EngineerName: string;
  Note: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  IsEngineer: string;
  PaidCreatedDate: string;
  StartWorkDate: string;
  FinishWorkDate: string;
  CreatedDate: string;
  CreatedBy: string;
  TypeEngineer: string;
  GroupRName: string;
}

export interface Search_Ser_Engineer_Param extends SearchParam {
  EngineerID: string;
  GroupRID: string;
  EngineerNo: string;
  EngineerName: string;
  IsEngineer: string;
  IsActive: string;
  DealerCode: string;
  Status: string;
}
