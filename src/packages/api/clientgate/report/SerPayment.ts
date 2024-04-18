import {
  Search_SerPayment_Params,
  SerPayment,
} from "@/packages/types/report/SerPayment";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_PaymentApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    SerPayment_SearchDL: async (
      param: Partial<Search_SerPayment_Params>
    ): Promise<ApiResponse<SerPayment>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<SerPayment>
      >("/SerPayment/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    SerPayment_ExportSearchDL: async (
      param: Partial<Search_SerPayment_Params>
    ): Promise<ApiResponse<SerPayment>> => {
      return await apiBase.post<
        Partial<Search_SerPayment_Params>,
        ApiResponse<SerPayment>
      >("/SerPayment/ExportSearchDL", {
        ...param,
      });
    },
    //Print-SearchDL
    SerPayment_PrintDL: async (
      param: Partial<Search_SerPayment_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerPayment/PrintDL",

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
