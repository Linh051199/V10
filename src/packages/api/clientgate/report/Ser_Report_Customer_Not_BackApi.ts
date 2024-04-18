import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Ser_Report_Customer_Not_BackParam {
  DealerCode: string;
  DateCount: number;
  FlagDataWH: 1 | 0;
}

export interface Ser_Report_Customer_Not_BackRecord {
  DealerCode: string;
  DealerName: string;
  CusName: string;
  Mobile: string;
  Address: string;
  DistrictCode: string;
  DistrictName: string;
  ProvinceCode: string;
  ProvinceName: string;
  PlateNo: string;
  FrameNo: string;
  ModelID: string;
  ModelName: string;
  ColorCode: string;
  WarrantyExpiresDate: string;
  CurrentKm: string;
  CurrentServiceDate: string;
}

interface Ser_Report_Customer_Not_BackRecordParamData {
  Lst_Ser_ReportCustomerNotBack: Ser_Report_Customer_Not_BackRecord[];
}
export const useSer_Report_Customer_Not_BackApi = (apiBase: AxiosInstance) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_Report_Customer_Not_Back_SearchHQ: async (
      params: Ser_Report_Customer_Not_BackParam
    ): Promise<ApiResponse<Ser_Report_Customer_Not_BackRecordParamData>> => {
      return await apiBase.post<
        Ser_Report_Customer_Not_BackParam,
        ApiResponse<Ser_Report_Customer_Not_BackRecordParamData>
      >("/SerReportCustomerNotBack/SearchHQ", {
        ...params,
      });
    },

    Ser_Report_Customer_Not_Back_SearchDL: async (
      params: Ser_Report_Customer_Not_BackParam
    ): Promise<ApiResponse<Ser_Report_Customer_Not_BackRecordParamData>> => {
      return await apiBase.post<
        Ser_Report_Customer_Not_BackParam,
        ApiResponse<Ser_Report_Customer_Not_BackRecordParamData>
      >("/SerReportCustomerNotBack/SearchDL", {
        ...params,
      });
    },

    Ser_Report_Customer_Not_Back_ExportSearchHQ: async (
      params: Ser_Report_Customer_Not_BackParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Ser_Report_Customer_Not_BackParam,
        ApiResponse<string>
      >("/SerReportCustomerNotBack/ExportHQ", {
        ...params,
      });
    },

    Ser_Report_Customer_Not_Back_ExportSearchDL: async (
      params: Ser_Report_Customer_Not_BackParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Ser_Report_Customer_Not_BackParam,
        ApiResponse<string>
      >("/SerReportCustomerNotBack/ExportDL", {
        ...params,
      });
    },
  };
};
