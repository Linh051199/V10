import { SearchParam } from "../clientgate";

export interface Ser_InsuranceContract {
  InContractCode: string;
  InContractNo: string;
  InsNo: string;
  StartDate: string;
  FinishDate: string;
  TypePayment: string;
  PaymentLimit: any;
}

export interface Search_Ser_InsuranceContract_Param extends SearchParam {
  InContractNo: string;
  InsNo: string;
  StartDateFromTo: any;
  InContractID: string;
  InContractCode: string;
  StartDate: string;
  FinishDate: string;
  TypePayment: string;
  DealerCode: string;
  LogLUDateTime: string;
  LogLUBy: string;
  PaymentLimit: string;
  CreatedDate: string;
  CreatedBy: string;
  IsActive: any;
}
