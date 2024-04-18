import {
  Search_RptDMSSerRptDMSClaim_Params,
  RptDMSSerRptDMSClaim,
} from "@/packages/types/report/RptDMSSerRptDMSClaim";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_DMSSerRptDMSClaimApi = (apiBase: AxiosInstance) => {
  return {
    // SearchHQ
    RptDMSSerRptDMSClaim_SearchHQ: async (
      param: Partial<Search_RptDMSSerRptDMSClaim_Params>
    ): Promise<ApiResponse<RptDMSSerRptDMSClaim>> => {
      return await apiBase.post<
        Partial<Search_RptDMSSerRptDMSClaim_Params>,
        ApiResponse<RptDMSSerRptDMSClaim>
      >("/RptDMSSerRptDMSClaim/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchHQ
    RptDMSSerRptDMSClaim_ExportSearchHQ: async (
      param: Partial<Search_RptDMSSerRptDMSClaim_Params>
    ): Promise<ApiResponse<RptDMSSerRptDMSClaim>> => {
      return await apiBase.post<
        Partial<Search_RptDMSSerRptDMSClaim_Params>,
        ApiResponse<RptDMSSerRptDMSClaim>
      >("/RptDMSSerRptDMSClaim/ExportSearchHQ", {
        ...param,
      });
    },
  };
};
