import { SearchParam } from "../clientgate";

export interface Ser_Campaign {
  CamID: string;
  CamNo: string;
  CamName: string;
  StartDate: string;
  FinishedDate: string;
  Note: string;
  DealerCode: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  CreatedDate: string;
  CreatedBy: string;
}

export interface Search_Ser_Campaign_Param extends SearchParam {
  CamNo: string;
  CamName: string;
  DealerCode: string;
}
