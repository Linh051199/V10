import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Ser_Customer_Care_RptParam {
  FromDate: any;
  ToDate: any;
  DateFromTo: any[];
  FlagDataWH: 1 | 0;
}

export interface Ser_Customer_Care_RptRecord {
  CareType: string;
  Total: number;
  Pending: number;
  IsContact: number;
  IsNotContact: number;
}

interface Ser_Customer_Care_RptRecordParamData {
  Lst_Ser_CustomerCareRpt: Ser_Customer_Care_RptRecord[];
}
export const useSer_Customer_Care_RptApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_Customer_Care_Rpt_SearchDL: async (
      params: Ser_Customer_Care_RptParam
    ): Promise<ApiResponse<Ser_Customer_Care_RptRecordParamData>> => {
      return await apiBase.post<
        Ser_Customer_Care_RptParam,
        ApiResponse<Ser_Customer_Care_RptRecordParamData>
      >("/SerCustomerCareRpt/SearchDL", {
        ...params,
      });
    },
  };
};
