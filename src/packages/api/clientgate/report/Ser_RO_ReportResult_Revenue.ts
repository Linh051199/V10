import {
  Search_Ser_RO_ReportResult_Revenue_Params,
  Ser_RO_ReportResult_Revenue,
} from "@/packages/types/report/Ser_RO_ReportResult_Revenue";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_RO_ReportResult_RevenueApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Ser_RO_ReportResult_RevenueRpt_SearchDL: async (
      param: Partial<Search_Ser_RO_ReportResult_Revenue_Params>
    ): Promise<ApiResponse<Ser_RO_ReportResult_Revenue>> => {
      return await apiBase.post<
        Partial<Search_Ser_RO_ReportResult_Revenue_Params>,
        ApiResponse<Ser_RO_ReportResult_Revenue>
      >("/Ser_RO_ReportResult_Revenue/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    Ser_RO_ReportResult_RevenueRpt_ExportSearchDL: async (
      param: Partial<Search_Ser_RO_ReportResult_Revenue_Params>
    ): Promise<ApiResponse<Ser_RO_ReportResult_Revenue>> => {
      return await apiBase.post<
        Partial<Search_Ser_RO_ReportResult_Revenue_Params>,
        ApiResponse<Ser_RO_ReportResult_Revenue>
      >("/Ser_RO_ReportResult_Revenue/ExportSearchDL", {
        ...param,
      });
    },

    //Print-SearchDL
    Ser_RO_ReportResult_RevenueRpt_PrintDL: async (
      param: Partial<Search_Ser_RO_ReportResult_Revenue_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/Ser_RO_ReportResult_Revenue/PrintDL",

        {
          ...param,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
  };
};
