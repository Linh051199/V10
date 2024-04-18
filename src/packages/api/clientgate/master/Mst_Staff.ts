import { ApiResponse } from "@/packages/types";
import {
  Mst_Staff,
  Search_Mst_Staff_Param,
} from "@/packages/types/master/Mst_Staff";
import { AxiosInstance } from "axios";

export const useMst_StaffApi = (apiBase: AxiosInstance) => {
  return {
    Mst_Staff_GetAllActive: async (): Promise<ApiResponse<Mst_Staff>> => {
      return await apiBase.post<any, ApiResponse<Mst_Staff>>(
        "/MstStaff/GetAllActive",
        {}
      );
    },
    Mst_Staff_Search: async (
      params: Partial<Search_Mst_Staff_Param>
    ): Promise<ApiResponse<Mst_Staff>> => {
      return await apiBase.post<any, ApiResponse<Mst_Staff>>(
        "/MstStaff/Search",
        {
          ...params,
        }
      );
    },
  };
};
