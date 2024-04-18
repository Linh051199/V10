import {
  Search_SerInvReportTotalStockInDetailRpt_Params,
  SerInvReportTotalStockInDetailRpt,
} from "@/packages/types/report/SerInvReportTotalStockInDetailRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportTotalStockInDetailRptApi = (
  apiBase: AxiosInstance
) => {
  return {
    // SearchDL
    SerInvReportTotalStockInDetailRpt_SearchDL: async (
      param: Partial<Search_SerInvReportTotalStockInDetailRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockInDetailRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockInDetailRpt_Params>,
        ApiResponse<SerInvReportTotalStockInDetailRpt>
      >("/SerInvReportTotalStockInDetailRpt/SearchDL", {
        ...param,
      });
    },

    // SearchHQ
    SerInvReportTotalStockInDetailRpt_SearchHQ: async (
      param: Partial<Search_SerInvReportTotalStockInDetailRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockInDetailRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockInDetailRpt_Params>,
        ApiResponse<SerInvReportTotalStockInDetailRpt>
      >("/SerInvReportTotalStockInDetailRpt/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchDL
    SerInvReportTotalStockInDetailRpt_ExportSearchDL: async (
      param: Partial<Search_SerInvReportTotalStockInDetailRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockInDetailRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockInDetailRpt_Params>,
        ApiResponse<SerInvReportTotalStockInDetailRpt>
      >("/SerInvReportTotalStockInDetailRpt/ExportSearchDL", {
        ...param,
      });
    },
    //Export-SearchHQ
    SerInvReportTotalStockInDetailRpt_ExportSearchHQ: async (
      param: Partial<Search_SerInvReportTotalStockInDetailRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockInDetailRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockInDetailRpt_Params>,
        ApiResponse<SerInvReportTotalStockInDetailRpt>
      >("/SerInvReportTotalStockInDetailRpt/ExportSearchHQ", {
        ...param,
      });
    },

    //Print-SearchDL
    SerInvReportTotalStockInDetailRpt_PrintDL: async (
      param: Partial<Search_SerInvReportTotalStockInDetailRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportTotalStockInDetailRpt/PrintDL",

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
    SerInvReportTotalStockInDetailRpt_PrintHQ: async (
      param: Partial<Search_SerInvReportTotalStockInDetailRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportTotalStockInDetailRpt/PrintHQ",

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
