import {
  Search_TST_Mst_Exchange_Unit,
  TST_Mst_Exchange_Unit,
} from "@/packages/types/master/TST_Mst_Exchange_Unit";
import { ApiResponse } from "@packages/types";
import { AxiosInstance } from "axios";

export const useTST_Mst_Exchange_Unit = (apiBase: AxiosInstance) => {
  return {
    TST_Mst_Exchange_Unit_Search: async (
      params: Search_TST_Mst_Exchange_Unit
    ): Promise<ApiResponse<TST_Mst_Exchange_Unit>> => {
      return await apiBase.post<
        Search_TST_Mst_Exchange_Unit,
        ApiResponse<TST_Mst_Exchange_Unit>
      >("/TSTMstExchangeUnit/Search", {
        TSTPartCode: params.TSTPartCode ?? "",
        // ...params,
      });
    },

    TST_Mst_Exchange_Unit_Create: async (
      params: Partial<TST_Mst_Exchange_Unit>
    ): Promise<ApiResponse<TST_Mst_Exchange_Unit>> => {
      return await apiBase.post<
        Partial<TST_Mst_Exchange_Unit>,
        ApiResponse<TST_Mst_Exchange_Unit>
      >("/TSTMstExchangeUnit/Create", {
        strJson: JSON.stringify(params),
      });
    },

    TST_Mst_Exchange_Unit_Update: async (
      key: string,
      data: Partial<TST_Mst_Exchange_Unit>
    ): Promise<ApiResponse<TST_Mst_Exchange_Unit>> => {
      return await apiBase.post<
        Partial<TST_Mst_Exchange_Unit>,
        ApiResponse<TST_Mst_Exchange_Unit>
      >("/TSTMstExchangeUnit/Update", {
        strJson: JSON.stringify({
          TSTPartCode: key,
          ...data,
        }),
      });
    },

    TST_Mst_Exchange_Unit_ExportTemplate: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<TST_Mst_Exchange_Unit>,
        ApiResponse<string>
      >("/TSTMstExchangeUnit/ExportTemplate", {});
    },

    TST_Mst_Exchange_Unit_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/TSTMstExchangeUnit/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    TST_Mst_Exchange_Unit_Export: async (
      params?: Partial<Search_TST_Mst_Exchange_Unit>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/TSTMstExchangeUnit/Export",
        {
          ...params,
        }
      );
    },

    TST_Mst_Exchange_Unit_Delete: async (key: string) => {
      return await apiBase.post<
        Search_TST_Mst_Exchange_Unit,
        ApiResponse<TST_Mst_Exchange_Unit>
      >("/TSTMstExchangeUnit/Delete", {
        PartTypeID: key,
      });
    },

    TST_Mst_Exchange_Unit_DeleteMultiple: async (data: any[]) => {
      return await apiBase.post<
        Search_TST_Mst_Exchange_Unit,
        ApiResponse<TST_Mst_Exchange_Unit>
      >("/TSTMstExchangeUnit/DeleteMultiple", {
        strJson: JSON.stringify(data),
      });
    },
  };
};
