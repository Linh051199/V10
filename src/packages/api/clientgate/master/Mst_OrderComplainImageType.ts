import { ApiResponse } from "@/packages/types";
import {
  Mst_OrderComplainImageType,
  SearchMst_OrderComplainImageTypeParam,
} from "@/packages/types/master/Mst_OrderComplainImageType";

import { AxiosInstance } from "axios";

export const useMst_OrderComplainImageTypeApi = (apiBase: AxiosInstance) => {
  return {
    //Search
    Mst_OrderComplainImageType_Search: async (
      params: Partial<SearchMst_OrderComplainImageTypeParam>
    ): Promise<ApiResponse<Mst_OrderComplainImageType>> => {
      return await apiBase.post<
        Partial<SearchMst_OrderComplainImageTypeParam>,
        ApiResponse<Mst_OrderComplainImageType>
      >("/MstOrderComplainImageType/Search", {
        ...params,
      });
    },

    //Export
    Mst_OrderComplainImageType_Export: async (
      params?: Partial<SearchMst_OrderComplainImageTypeParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/MstOrderComplainImageType/ExportExcel",
        {
          ...params,
        }
      );
    },
  };
};
