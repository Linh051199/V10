import {
  Search_SerCountCustomerOnlyHTC_Params,
  SerCountCustomerOnlyHTC,
} from "@/packages/types/report/SerCountCustomerOnlyHTC";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_CountCustomerOnlyHTCApi = (apiBase: AxiosInstance) => {
  return {
    // SearchHQ
    SerCountCustomerOnlyHTC_SearchHQ: async (
      param: Partial<Search_SerCountCustomerOnlyHTC_Params>
    ): Promise<ApiResponse<SerCountCustomerOnlyHTC>> => {
      return await apiBase.post<
        Partial<Search_SerCountCustomerOnlyHTC_Params>,
        ApiResponse<SerCountCustomerOnlyHTC>
      >("/SerCountCustomerOnlyHTC/SearchHQ", {
        ...param,
      });
    },

    //Export-SearchHQ
    SerCountCustomerOnlyHTC_ExportSearchHQ: async (
      param: Partial<Search_SerCountCustomerOnlyHTC_Params>
    ): Promise<ApiResponse<SerCountCustomerOnlyHTC>> => {
      return await apiBase.post<
        Partial<Search_SerCountCustomerOnlyHTC_Params>,
        ApiResponse<SerCountCustomerOnlyHTC>
      >("/SerCountCustomerOnlyHTC/ExportSearchHQ", {
        ...param,
      });
    },

    //Print-SearchHQ
    SerCountCustomerOnlyHTC_PrintHQ: async (
      param: Partial<Search_SerCountCustomerOnlyHTC_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerCountCustomerOnlyHTC/PrintHQ",

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
