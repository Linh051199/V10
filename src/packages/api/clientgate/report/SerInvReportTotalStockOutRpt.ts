import {
  Search_SerInvReportTotalStockOutRpt_Params,
  SerInvReportTotalStockOutRpt,
} from "@/packages/types/report/SerInvReportTotalStockOutRpt";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportTotalStockOutRptApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    SerInvReportTotalStockOutRpt_SearchDL: async (
      param: Partial<Search_SerInvReportTotalStockOutRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockOutRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockOutRpt_Params>,
        ApiResponse<SerInvReportTotalStockOutRpt>
      >("/SerInvReportTotalStockOutRpt/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    SerInvReportTotalStockOutRpt_ExportSearchDL: async (
      param: Partial<Search_SerInvReportTotalStockOutRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockOutRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockOutRpt_Params>,
        ApiResponse<SerInvReportTotalStockOutRpt>
      >("/SerInvReportTotalStockOutRpt/ExportExcelDL", {
        ...param,
      });
    },
    //Export-SearchHQ

    //Print-SearchDL
    SerInvReportTotalStockOutRpt_PrintDL: async (
      param: Partial<Search_SerInvReportTotalStockOutRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportTotalStockOutRpt/Print",

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
