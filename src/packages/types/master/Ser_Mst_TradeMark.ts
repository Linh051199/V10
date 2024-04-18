import { SearchParam } from "../clientgate";
export interface Search_Ser_Mst_TradeMark extends SearchParam {
  KeyWork: string;
  DealerCode: string;
  IsActive: string;
}

export interface Ser_Mst_TradeMark {
  TradeMarkCode: string;
  DealerCode: string;
  TradeMarkName: string;
  IsActive: string;
  Logo: string;
  LogLUDateTime: string;
  LogLUBy: string;
  CreatedDate: string;
  CreatedBy: string;
}
