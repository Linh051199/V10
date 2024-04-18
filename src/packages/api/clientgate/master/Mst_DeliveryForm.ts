import { ApiResponse } from "@/packages/types";
import {
  Mst_DeliveryForm,
  SearchMst_DeliveryFormParam,
} from "@/packages/types/master/Mst_DeliveryForm";

import { AxiosInstance } from "axios";

export const useMst_DeliveryFormApi = (apiBase: AxiosInstance) => {
  return {
    //SearchHQ
    Mst_DeliveryForm_Search: async (
      params: Partial<SearchMst_DeliveryFormParam>
    ): Promise<ApiResponse<Mst_DeliveryForm>> => {
      return await apiBase.post<
        Partial<SearchMst_DeliveryFormParam>,
        ApiResponse<Mst_DeliveryForm>
      >("/MstDeliveryForm/Search", {
        ...params,
      });
    },
  };
};
