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

export const useSer_MST_ROWarrantyWork = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_ROWarrantyWork_Search: async (
      param: Partial<any>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >(
        "/SerMSTROWarrantyWork/Search",
        {
          ...param,
        }
      );
    },
    Ser_MST_ROWarrantyWork_Delete: async (
      param: Partial<any>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >(
        "/SerMSTROWarrantyWork/Delete",
        {
          strJson: JSON.stringify(param)
        }
      );
    },
    Ser_MST_ROWarrantyWork_Save: async (
      param: any
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >(
        "/SerMSTROWarrantyWork/Save",
        {
          strJson: JSON.stringify(param)
        }
      );
    },
    Ser_MST_ROWarrantyWork_ExportExcelTpl: async (
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<any>
      >("/SerMSTROWarrantyWork/ExportTemplate", {
      });
    },
  }
}