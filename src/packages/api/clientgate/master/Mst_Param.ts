import { ApiResponse } from "@/packages/types";
import {
  Mst_Param,
  Search_Mst_Param_Param,
} from "@/packages/types/master/Mst_Param";
import { AxiosInstance } from "axios";

export const useMst_ParamApi = (apiBase: AxiosInstance) => {
  return {
    Mst_Param_GetAllActive: async (): Promise<ApiResponse<Mst_Param>> => {
      return await apiBase.post<any, ApiResponse<Mst_Param>>(
        "/MstParam/GetAllActive",
        {}
      );
    },
    Mst_Param_SearchDL: async (
      params: Partial<Search_Mst_Param_Param>
    ): Promise<ApiResponse<Mst_Param>> => {
      return await apiBase.post<any, ApiResponse<Mst_Param>>(
        "/MstParam/SearchDL",
        {
          ...params,
        }
      );
    },
    Mst_Param_SearchHQ: async (
      params: Partial<Search_Mst_Param_Param>
    ): Promise<ApiResponse<Mst_Param>> => {
      return await apiBase.post<any, ApiResponse<Mst_Param>>(
        "/MstParam/SearchHQ",
        {
          ...params,
        }
      );
    },
    Mst_Param_Save: async (
      data: Partial<Search_Mst_Param_Param>
    ): Promise<ApiResponse<Mst_Param>> => {
      return await apiBase.post<any, ApiResponse<Mst_Param>>("/MstParam/Save", {
        strJson: JSON.stringify(data),
      });
    },
  };
};
