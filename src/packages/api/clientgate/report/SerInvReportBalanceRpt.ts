import {
  Search_SerInvReportBalanceRpt_Params,
  SerInvReportBalanceRpt,
} from "@/packages/types/report/SerInvReportBalanceRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportBalanceRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    SerInvReportBalanceRpt_SearchDL: async (
      param: Partial<Search_SerInvReportBalanceRpt_Params>
    ): Promise<ApiResponse<SerInvReportBalanceRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportBalanceRpt_Params>,
        ApiResponse<SerInvReportBalanceRpt>
      >("/SerInvReportBalanceRpt/SearchDL", {
        ...param,
      });
    },

    // SearchHQ
    SerInvReportBalanceRpt_SearchHQ: async (
      param: Partial<Search_SerInvReportBalanceRpt_Params>
    ): Promise<ApiResponse<SerInvReportBalanceRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportBalanceRpt_Params>,
        ApiResponse<SerInvReportBalanceRpt>
      >("/SerInvReportBalanceRpt/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchDL
    SerInvReportBalanceRpt_ExportSearchDL: async (
      param: Partial<Search_SerInvReportBalanceRpt_Params>
    ): Promise<ApiResponse<SerInvReportBalanceRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportBalanceRpt_Params>,
        ApiResponse<SerInvReportBalanceRpt>
      >("/SerInvReportBalanceRpt/ExportSearchDL", {
        ...param,
      });
    },
    //Export-SearchHQ
    SerInvReportBalanceRpt_ExportSearchHQ: async (
      param: Partial<Search_SerInvReportBalanceRpt_Params>
    ): Promise<ApiResponse<SerInvReportBalanceRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportBalanceRpt_Params>,
        ApiResponse<SerInvReportBalanceRpt>
      >("/SerInvReportBalanceRpt/ExportSearchHQ", {
        ...param,
      });
    },

    //Print-SearchDL
    SerInvReportBalanceRpt_PrintDL: async (
      param: Partial<Search_SerInvReportBalanceRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportBalanceRpt/PrintDL",

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
    //Print-SearchHQ
    SerInvReportBalanceRpt_PrintHQ: async (
      param: Partial<Search_SerInvReportBalanceRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportBalanceRpt/PrintHQ",

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
