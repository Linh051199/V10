import { SearchParam } from "../clientgate";

export interface Mst_Param {
  ParamCode: string;
  DealerCode: string;
  ParamValue: string;
  LogLUDateTime: string;
  ParamType: string;
  LogLUBy: string;
}

export interface Search_Mst_Param_Param extends Partial<SearchParam> {
  ParamType: string;
  DealerCode?: string;
}
