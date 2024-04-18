import {
  Search_RptSerCamMarketingHTCSummary_Params,
  RptSerCamMarketingHTCSummary,
} from "@/packages/types/report/RptSerCamMarketingHTCSummary";
import {
  ApiResponse,
  Mst_Dealer,
  SearchDealerParam,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useRpt_SerCamMarketingHTCSummaryApi = (apiBase: AxiosInstance) => {
  return {
    // SearchHQ
    RptSerCamMarketingHTCSummary_SearchHQ: async (
      param: Partial<Search_RptSerCamMarketingHTCSummary_Params>
    ): Promise<ApiResponse<RptSerCamMarketingHTCSummary>> => {
      return await apiBase.post<
        Partial<Search_RptSerCamMarketingHTCSummary_Params>,
        ApiResponse<RptSerCamMarketingHTCSummary>
      >("/RptSerCamMarketingHTCSummary/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchHQ
    RptSerCamMarketingHTCSummary_ExportSearchHQ: async (
      param: Partial<Search_RptSerCamMarketingHTCSummary_Params>
    ): Promise<ApiResponse<RptSerCamMarketingHTCSummary>> => {
      return await apiBase.post<
        Partial<Search_RptSerCamMarketingHTCSummary_Params>,
        ApiResponse<RptSerCamMarketingHTCSummary>
      >("/RptSerCamMarketingHTCSummary/ExportSearchHQ", {
        ...param,
      });
    },

    //Tìm kiếm mã chiến dịch
    //Export-SearchHQ
    RptSerCamMarketingHTCSummary_SerCampaign: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCampaign/SearchHQ",
        {
          ...param,
        }
      );
    },
  };
};
