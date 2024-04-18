import {
  Search_SerInvReportTotalStockOutDetailRpt_Params,
  SerInvReportTotalStockOutDetailRpt,
} from "@/packages/types/report/SerInvReportTotalStockOutDetailRpt";
import {
  ApiResponse,
  Mst_Dealer,
  SearchDealerParam,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InvReportTotalStockOutDetailRptApi = (
  apiBase: AxiosInstance
) => {
  return {
    // SearchDL
    SerInvReportTotalStockOutDetailRpt_SearchDL: async (
      param: Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockOutDetailRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>,
        ApiResponse<SerInvReportTotalStockOutDetailRpt>
      >("/SerInvReportTotalStockOutDetailRpt/SearchDL", {
        ...param,
      });
    },

    // SearchHQ
    SerInvReportTotalStockOutDetailRpt_SearchHQ: async (
      param: Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockOutDetailRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>,
        ApiResponse<SerInvReportTotalStockOutDetailRpt>
      >("/SerInvReportTotalStockOutDetailRpt/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchDL
    SerInvReportTotalStockOutDetailRpt_ExportSearchDL: async (
      param: Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockOutDetailRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>,
        ApiResponse<SerInvReportTotalStockOutDetailRpt>
      >("/SerInvReportTotalStockOutDetailRpt/ExportSearchDL", {
        ...param,
      });
    },
    //Export-SearchHQ
    SerInvReportTotalStockOutDetailRpt_ExportSearchHQ: async (
      param: Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>
    ): Promise<ApiResponse<SerInvReportTotalStockOutDetailRpt>> => {
      return await apiBase.post<
        Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>,
        ApiResponse<SerInvReportTotalStockOutDetailRpt>
      >("/SerInvReportTotalStockOutDetailRpt/ExportSearchHQ", {
        ...param,
      });
    },

    // Get all DealerCode
    Dealer_GetAllActive: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/MstDealer/GetAllActive"
      );
    },

    //Print-SearchHQ
    SerInvReportTotalStockOutDetailRpt_PrintHQ: async (
      param: Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportTotalStockOutDetailRpt/PrintHQ",

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
    //Print-SearchDL
    SerInvReportTotalStockOutDetailRpt_PrintDL: async (
      param: Partial<Search_SerInvReportTotalStockOutDetailRpt_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvReportTotalStockOutDetailRpt/PrintDL",

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
