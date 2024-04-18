import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Ser_Count_Customer_To_HTCParam {
  DealerCode: string;
  FromDate: any;
  ToDate: any;
  DateFromTo: any[];
  TradeMarkCode: 1 | 0;
  FlagDataWH: 1 | 0;
}

export interface Ser_Count_Customer_To_HTCRecord {
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

interface Ser_Count_Customer_To_HTCRecordParamData {
  lst_Ser_Count_Customer_ToHTC: Ser_Count_Customer_To_HTCRecord[];
}
export const useSer_Count_Customer_To_HTCApi = (apiBase: AxiosInstance) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_Count_Customer_To_HTC_SearchDL: async (
      params: Ser_Count_Customer_To_HTCParam
    ): Promise<ApiResponse<Ser_Count_Customer_To_HTCRecordParamData>> => {
      return await apiBase.post<
        Ser_Count_Customer_To_HTCParam,
        ApiResponse<Ser_Count_Customer_To_HTCRecordParamData>
      >("/SerCountCustomerToHTC/SearchDL", {
        ...params,
      });
    },

    Ser_Count_Customer_To_HTC_ExportSearchDL: async (
      params: Ser_Count_Customer_To_HTCParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Ser_Count_Customer_To_HTCParam,
        ApiResponse<string>
      >("/SerCountCustomerToHTC/ExportSearchDL", {
        ...params,
      });
    },

    Ser_Count_Customer_To_HTC_PrintDL: async (
      params: Ser_Count_Customer_To_HTCParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Ser_Count_Customer_To_HTCParam,
        ApiResponse<string>
      >("/SerCountCustomerToHTC/PrintDL", {
        ...params,
      });
    },
  };
};
