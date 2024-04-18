import {
  ApiResponse,
  DeleteDealerParam,
  FlagActiveEnum,
  Mst_BankAccount,
  SearchDealerParam,
  SearchParam,
  Search_Mst_BankAccount,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_ROWarrantyType = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_ROWarrantyType_Search: async (
      param: Partial<any>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >(
        "/SerMSTROWarrantyType/Search",
        {
          ...param,
        }
      );
    },
  }
}