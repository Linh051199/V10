import {
  Search_SerROStatisticServiceByGroup_Params,
  SerROStatisticServiceByGroup,
} from "@/packages/types/report/SerROStatisticServiceByGroup";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_ROStatisticServiceByGroupApi = (apiBase: AxiosInstance) => {
  return {
    // SearchDL
    SerROStatisticServiceByGroup_SearchDL: async (
      param: Partial<Search_SerROStatisticServiceByGroup_Params>
    ): Promise<ApiResponse<SerROStatisticServiceByGroup>> => {
      return await apiBase.post<
        Partial<Search_SerROStatisticServiceByGroup_Params>,
        ApiResponse<SerROStatisticServiceByGroup>
      >("/SerROStatisticServiceByGroup/SearchDL", {
        ...param,
      });
    },

    //Export-SearchDL
    SerROStatisticServiceByGroup_ExportSearchDL: async (
      param: Partial<Search_SerROStatisticServiceByGroup_Params>
    ): Promise<ApiResponse<SerROStatisticServiceByGroup>> => {
      return await apiBase.post<
        Partial<Search_SerROStatisticServiceByGroup_Params>,
        ApiResponse<SerROStatisticServiceByGroup>
      >("/SerROStatisticServiceByGroup/ExportSearchDL", {
        ...param,
      });
    },

    //Print-SearchDL
    SerROStatisticServiceByGroup_PrintDL: async (
      param: Partial<Search_SerROStatisticServiceByGroup_Params>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerROStatisticServiceByGroup/PrintDL",

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
