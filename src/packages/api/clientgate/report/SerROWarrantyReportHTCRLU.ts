import {
  Search_SerROWarrantyReportHTCRLU_Params,
  SerROWarrantyReportHTCRLU,
} from "@/packages/types/report/SerROWarrantyReportHTCRLU";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_ROWarrantyReportHTCRLUApi = (apiBase: AxiosInstance) => {
  return {
    // SearchHQ
    SerROWarrantyReportHTCRLU_SearchHQ: async (
      param: Partial<Search_SerROWarrantyReportHTCRLU_Params>
    ): Promise<ApiResponse<SerROWarrantyReportHTCRLU>> => {
      return await apiBase.post<
        Partial<Search_SerROWarrantyReportHTCRLU_Params>,
        ApiResponse<SerROWarrantyReportHTCRLU>
      >("/SerROWarrantyReportHTCRLU/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchHQ
    SerROWarrantyReportHTCRLU_ExportSearchHQ: async (
      param: Partial<Search_SerROWarrantyReportHTCRLU_Params>
    ): Promise<ApiResponse<SerROWarrantyReportHTCRLU>> => {
      return await apiBase.post<
        Partial<Search_SerROWarrantyReportHTCRLU_Params>,
        ApiResponse<SerROWarrantyReportHTCRLU>
      >("/SerROWarrantyReportHTCRLU/ExportSearchHQ", {
        ...param,
      });
    },
  };
};
