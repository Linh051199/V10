import {
  Search_Ser_InvReportCardStockRpt_Params,
  Ser_InvReportCardStockRpt,
} from "@/packages/types/report/Ser_InvReportCardStockRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportCardStockRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Ser_InvReportCardStockRpt_SearchDL: async (
      param: Partial<Search_Ser_InvReportCardStockRpt_Params>
    ): Promise<ApiResponse<Ser_InvReportCardStockRpt>> => {
      return await apiBase.post<
        Partial<Search_Ser_InvReportCardStockRpt_Params>,
        ApiResponse<Ser_InvReportCardStockRpt>
      >("/Ser_InvReportCardStockRpt/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    Ser_InvReportCardStockRpt_ExportSearchDL: async (
      param: Partial<Search_Ser_InvReportCardStockRpt_Params>
    ): Promise<ApiResponse<Ser_InvReportCardStockRpt>> => {
      return await apiBase.post<
        Partial<Search_Ser_InvReportCardStockRpt_Params>,
        ApiResponse<Ser_InvReportCardStockRpt>
      >("/Ser_InvReportCardStockRpt/ExportSearchDL", {
        ...param,
      });
    },

    //Print-SearchDL
    Ser_InvReportCardStockRpt_PrintDL: async (
      param: Partial<Search_Ser_InvReportCardStockRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/Ser_InvReportCardStockRpt/PrintDL",

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
