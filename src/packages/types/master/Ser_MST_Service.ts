import { SearchParam } from "../clientgate";

export interface Ser_MST_Service {
  SerID: string;
  DealerCode: string;
  SerCode: string;
  SerName: string;
  SerTypeID: string;
  StdManHour: string;
  Cost: string;
  Price: string;
  VAT: string;
  Model: string;
  Note: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  CreatedDate: string;
  CreatedBy: string;
  FlagWarranty: string;
}
export interface Search_Ser_MST_Service extends SearchParam {
  SerID: string;
  DealerCode: string;
  SerCode: string;
  SerName: string;
  CusTypeID: string;
  IsActive: string;
}
