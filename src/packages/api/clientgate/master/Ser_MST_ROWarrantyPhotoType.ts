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

export const useSer_MST_ROWarrantyPhotoType = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_ROWarrantyPhotoType_Search: async (
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >(
        "/Ser_MST_ROWarrantyPhotoType/Search",
      );
    },
  }
}