import { SearchParam } from "../clientgate";
export interface Search_TST_Mst_Exchange_Unit extends SearchParam {
  TSTPartCode: string;
}

export interface TST_Mst_Exchange_Unit {
  TSTPartCode: string;
  VieName: string;
  TSTUnit: string;
  DMSUnit: string;
  ExchangeRate: string;
  LogLUDateTime: string;
  LogLUBy: string;
}
