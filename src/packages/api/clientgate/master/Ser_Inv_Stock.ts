import { ApiResponse, FlagActiveEnum } from "@/packages/types";
import {
  SearchSer_Inv_StockParam,
  Ser_Inv_Stock,
} from "@/packages/types/master/Ser_Inv_Stock";
import { AxiosInstance } from "axios";

export const useSerInvStockApi = (apiBase: AxiosInstance) => {
  return {
    //SearchHQ
    Ser_Inv_Stock_SearchHQ: async (
      params: Partial<SearchSer_Inv_StockParam>
    ): Promise<ApiResponse<Ser_Inv_Stock>> => {
      return await apiBase.post<
        Partial<SearchSer_Inv_StockParam>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvStock/SearchHQ", {
        ...params,
      });
    },
    //SearchDL
    Ser_Inv_Stock_SearchDL: async (
      params: Partial<SearchSer_Inv_StockParam>
    ): Promise<ApiResponse<Ser_Inv_Stock>> => {
      return await apiBase.post<
        Partial<SearchSer_Inv_StockParam>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvStock/SearchDL", {
        ...params,
      });
    },

    //Create
    Ser_Inv_Stock_Create: async (
      params: Partial<Ser_Inv_Stock>
    ): Promise<ApiResponse<Ser_Inv_Stock>> => {
      return await apiBase.post<
        Partial<SearchSer_Inv_StockParam>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvStock/Create", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //Delete
    Ser_Inv_Stock_Delete: async (
      params: Partial<SearchSer_Inv_StockParam>
    ): Promise<ApiResponse<Ser_Inv_Stock>> => {
      return await apiBase.post<
        Partial<SearchSer_Inv_StockParam>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvStock/Delete", {
        ...params,
      });
    },

    //Update
    Ser_Inv_Stock_Update: async (
      params: Partial<Ser_Inv_Stock>
    ): Promise<ApiResponse<Ser_Inv_Stock>> => {
      return await apiBase.post<
        Partial<SearchSer_Inv_StockParam>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvStock/Update", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //Export template
    Ser_Inv_Stock_ExportTemplate: async (): Promise<ApiResponse<string>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerInvStock/ExportTemplate",
        {}
      );
    },

    //Import excel
    Ser_Inv_Stock_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerInvStock/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    //ExportHQ
    Ser_Inv_Stock_ExportHQ: async (
      params?: Partial<SearchSer_Inv_StockParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerInvStock/ExportHQ",
        {
          ...params,
        }
      );
    },

    //ExportDL
    Ser_Inv_Stock_ExportDL: async (
      params?: Partial<SearchSer_Inv_StockParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerInvStock/ExportDL",
        {
          ...params,
        }
      );
    },

    //getAllActive
    Ser_Inv_Stock_GetAllActive: async () => {
      return await apiBase.post<
        Partial<Ser_Inv_Stock>,
        ApiResponse<Ser_Inv_Stock>
      >("/SerInvStock/GetAllActive");
    },
  };
};
