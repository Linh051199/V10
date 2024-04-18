import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_BaoHanhXeSOLATIApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    Rpt_BaoHanhXeSOLATI_SearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      console.log(14, param)
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/SerROWarrantyReport/SearchHQ", {
        ...param,
      },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
    },

    //Export-SearchDL
    Rpt_BaoHanhXeSOLATI_ExportSearchHQ: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<any>
      >("/SerROWarrantyReport/ExportSearchHQ", {
        ...param,
      });
    },
  };
};
