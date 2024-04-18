import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Ser_Count_CustomerParam {
  DealerCode: string;
  FromDate: any;
  ToDate: any;
  DateFromTo: any[];
  TradeMarkCode: 1 | 0;
  FlagDataWH: 1 | 0;
}

export interface Ser_Count_CustomerRecord {
  DealerCode: string;
  DealerName: string;
  CompanyName: string;
  CompanyAddress: string;
  SumPartAmount: string;
  ServiceAmount: string;
  CarHyundaiCount: string;
  // SumPartAmount: string;
  SumOilAmount: string;
  // ServiceAmount: string;
  CarOrtherCount: string;
  ROID: string;
  RONo: string;
  CusName: string;
  CusPhone: string;
  plateNo: string;
  FrameNo: string;
  TradeMarkCode: string;
  KM: string;
  CusRequest: string;
  ActualDeliveryDate: string;
  PartAmount: string;
  // ServiceAmount: string;
  SumAmount: string;
}

interface Ser_Count_CustomerRecordParamData {
  lst_Ser_Count_Customer: Ser_Count_CustomerRecord[];
}
export const useSer_Count_CustomerApi = (apiBase: AxiosInstance) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_Count_Customer_SearchDL: async (
      params: Ser_Count_CustomerParam
    ): Promise<ApiResponse<Ser_Count_CustomerRecordParamData>> => {
      return await apiBase.post<
        Ser_Count_CustomerParam,
        ApiResponse<Ser_Count_CustomerRecordParamData>
      >("/SerCountCustomer/SearchDL", {
        ...params,
      });
    },

    Ser_Count_Customer_ExportSearchDL: async (
      params: Ser_Count_CustomerParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Ser_Count_CustomerParam, ApiResponse<string>>(
        "/SerCountCustomer/ExportSearchDL",
        {
          ...params,
        }
      );
    },

    Ser_Count_Customer_PrintDL: async (
      params: Ser_Count_CustomerParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Ser_Count_CustomerParam, ApiResponse<string>>(
        "/SerCountCustomer/PrintDL",
        {
          ...params,
        }
      );
    },
  };
};
