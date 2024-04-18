import {
  Search_SerInventoryReportInOutBalance_Params,
  SerInventoryReportInOutBalance,
} from "@/packages/types/report/SerInventoryReportInOutBalance";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_InventoryReportInOutBalanceApi = (
  apiBase: AxiosInstance
) => {
  return {
    // SearchDL
    SerInventoryReportInOutBalance_SearchDL: async (
      param: Partial<Search_SerInventoryReportInOutBalance_Params>
    ): Promise<ApiResponse<SerInventoryReportInOutBalance>> => {
      return await apiBase.post<
        Partial<Search_SerInventoryReportInOutBalance_Params>,
        ApiResponse<SerInventoryReportInOutBalance>
      >("/SerInventoryReportInOutBalance/SearchDL", {
        ...param,
      });
    },

    // SearchHQ
    SerInventoryReportInOutBalance_SearchHQ: async (
      param: Partial<Search_SerInventoryReportInOutBalance_Params>
    ): Promise<ApiResponse<SerInventoryReportInOutBalance>> => {
      return await apiBase.post<
        Partial<Search_SerInventoryReportInOutBalance_Params>,
        ApiResponse<SerInventoryReportInOutBalance>
      >("/SerInventoryReportInOutBalance/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchDL
    SerInventoryReportInOutBalance_ExportSearchDL: async (
      param: Partial<Search_SerInventoryReportInOutBalance_Params>
    ): Promise<ApiResponse<SerInventoryReportInOutBalance>> => {
      return await apiBase.post<
        Partial<Search_SerInventoryReportInOutBalance_Params>,
        ApiResponse<SerInventoryReportInOutBalance>
      >("/SerInventoryReportInOutBalance/ExportSearchDL", {
        ...param,
      });
    },
    //Export-SearchHQ
    SerInventoryReportInOutBalance_ExportSearchHQ: async (
      param: Partial<Search_SerInventoryReportInOutBalance_Params>
    ): Promise<ApiResponse<SerInventoryReportInOutBalance>> => {
      return await apiBase.post<
        Partial<Search_SerInventoryReportInOutBalance_Params>,
        ApiResponse<SerInventoryReportInOutBalance>
      >("/SerInventoryReportInOutBalance/ExportSearchHQ", {
        ...param,
      });
    },

    //Print-SearchDL
    SerInventoryReportInOutBalance_PrintDL: async (
      param: Partial<Search_SerInventoryReportInOutBalance_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInventoryReportInOutBalance/PrintDL",

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
    SerInventoryReportInOutBalance_PrintHQ: async (
      param: Partial<Search_SerInventoryReportInOutBalance_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInventoryReportInOutBalance/PrintHQ",

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
