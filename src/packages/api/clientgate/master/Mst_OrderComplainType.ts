import { ApiResponse } from "@/packages/types";
import {
  Mst_OrderComplainType,
  SearchMst_OrderComplainTypeParam,
} from "@/packages/types/master/Mst_OrderComplainType";

import { AxiosInstance } from "axios";

export const useMst_OrderComplainTypeApi = (apiBase: AxiosInstance) => {
  return {
    //Search
    Mst_OrderComplainType_Search: async (
      params: Partial<SearchMst_OrderComplainTypeParam>
    ): Promise<ApiResponse<Mst_OrderComplainType>> => {
      return await apiBase.post<
        Partial<SearchMst_OrderComplainTypeParam>,
        ApiResponse<Mst_OrderComplainType>
      >("/MstOrderComplainType/Search", {
        ...params,
      });
    },
    //Export
    Mst_OrderComplainType_Export: async (
      params?: Partial<SearchMst_OrderComplainTypeParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/MstOrderComplainType/ExportExcel",
        {
          ...params,
        }
      );
    },
  };
};
