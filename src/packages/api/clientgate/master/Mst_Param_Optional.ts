import {
  Search_Mst_Param_Optional,
  Mst_Param_Optional,
} from "@/packages/types/master/Mst_Param_Optional";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useMst_Param_Optional = (apiBase: AxiosInstance) => {
  return {
    Mst_Param_Optional_SearchDL: async (
      param: Partial<Search_Mst_Param_Optional>
    ): Promise<ApiResponse<Mst_Param_Optional>> => {
      return await apiBase.post<
        Partial<Search_Mst_Param_Optional>,
        ApiResponse<Mst_Param_Optional>
      >("/MstParam/SearchDL", {
        ...param,
      });
    },

    Mst_Param_Optional_SearchHQ: async (
      param: Partial<Search_Mst_Param_Optional>
    ): Promise<ApiResponse<Mst_Param_Optional>> => {
      return await apiBase.post<
        Partial<Search_Mst_Param_Optional>,
        ApiResponse<Mst_Param_Optional>
      >("/MstParam/SearchHQ", {
        ...param,
      });
    },

    Mst_Param_Optional_Save: async (param: any) => {
      return await apiBase.post<any, ApiResponse<Mst_Param_Optional>>(
        "/MstParam/Save",
        {
          strJson: JSON.stringify({
            ...param,
          } as Mst_Param_Optional),
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
