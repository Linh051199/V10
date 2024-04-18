import { SearchParam } from "../clientgate";
export interface Search_Ser_MST_PartType extends SearchParam {
  DealerCode: string;
  SOApprDateFrom: string;
  SOApprDateToInit: string;
  SOApprDateTo: string;
  SOApprDateFromTo: any;
}
export interface Ser_MST_PartType {
  PartTypeID: string;
  TypeName: string;
  DealerCode: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  CreatedDate: string;
  CreatedBy: string;
  TypeCodeTST: string;
}
