import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_DMSSerXeConHanBaoHanhApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_DMSSerXeConHanBaoHanh_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      console.log(14, apiBase)
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerXeConHanBaoHanh/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchDL
    Rpt_DMSSerXeConHanBaoHanh_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/RptDMSSerXeConHanBaoHanh/ExportSearchHQ", {
        ...param,
      });
    },
  };
};
