import {
  Search_Ser_InvReportCusDebitRpt_Params,
  Ser_InvReportCusDebitRpt,
} from "@/packages/types/report/Ser_InvReportCusDebitRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportCusDebitRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Ser_InvReportCusDebitRpt_SearchDL: async (
      param: Partial<Search_Ser_InvReportCusDebitRpt_Params>
    ): Promise<ApiResponse<Ser_InvReportCusDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_Ser_InvReportCusDebitRpt_Params>,
        ApiResponse<Ser_InvReportCusDebitRpt>
      >("/Ser_InvReportCusDebitRpt/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    Ser_InvReportCusDebitRpt_ExportSearchDL: async (
      param: Partial<Search_Ser_InvReportCusDebitRpt_Params>
    ): Promise<ApiResponse<Ser_InvReportCusDebitRpt>> => {
      return await apiBase.post<
        Partial<Search_Ser_InvReportCusDebitRpt_Params>,
        ApiResponse<Ser_InvReportCusDebitRpt>
      >("/Ser_InvReportCusDebitRpt/ExportSearchDL", {
        ...param,
      });
    },

     //Print-SearchDL
     Ser_InvReportCusDebitRpt_PrintDL: async (
      param: Partial<Search_Ser_InvReportCusDebitRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/Ser_InvReportCusDebitRpt/PrintDL",

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
