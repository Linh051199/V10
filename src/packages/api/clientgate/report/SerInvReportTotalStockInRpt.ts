import {
  Search_SerInvReportTotalStockInRpt_Params,
  SerInvReportTotalStockInRpt,
} from "@/packages/types/report/SerInvReportTotalStockInRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportTotalStockInRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    SerInvReportTotalStockInRpt_SearchDL: async (
      param: Partial<Search_SerInvReportTotalStockInRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockInRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockInRpt_Params>,
        ApiResponse<SerInvReportTotalStockInRpt>
      >("/SerInvReportTotalStockInRpt/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    SerInvReportTotalStockInRpt_ExportSearchDL: async (
      param: Partial<Search_SerInvReportTotalStockInRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockInRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockInRpt_Params>,
        ApiResponse<SerInvReportTotalStockInRpt>
      >("/SerInvReportTotalStockInRpt/ExportExcelDL", {
        ...param,
      });
    },

    //Print-SearchDL
    SerInvReportTotalStockInRpt_PrintDL: async (
      param: Partial<Search_SerInvReportTotalStockInRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportTotalStockInRpt/Print",

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
