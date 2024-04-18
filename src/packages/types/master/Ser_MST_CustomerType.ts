import { SearchParam } from "../clientgate";

export interface Search_Ser_MST_CustomerType extends SearchParam {
  CusTypeID: string;
  DealerCode: string;
  CusTypeName: string;
  IsActive: string;
}
export interface Ser_MST_CustomerType {
  CusTypeID: string;
  DealerCode: string;
  CusTypeName: string;
  CusFactor: string;
  IsActive: string;
  LogLUDateTime: string;
  LogLUBy: string;
  CusPersonType: string;
}
