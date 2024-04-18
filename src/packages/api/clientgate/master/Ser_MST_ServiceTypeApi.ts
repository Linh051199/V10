import {
  Search_Ser_MST_ServiceType,
  Ser_MST_ServiceType,
} from "@/packages/types/master/Ser_MST_ServiceType";
import { ApiResponse } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_ServiceType = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_ServiceType_SearchHQ: async (
      params: Search_Ser_MST_ServiceType
    ): Promise<ApiResponse<Ser_MST_ServiceType>> => {
      return await apiBase.post<
        Search_Ser_MST_ServiceType,
        ApiResponse<Ser_MST_ServiceType>
      >("/SerMstServiceType/SearchHQ", {
        ...params,
      });
    },

    Ser_MST_ServiceType_SearchDL: async (
      params: Search_Ser_MST_ServiceType
    ): Promise<ApiResponse<Ser_MST_ServiceType>> => {
      return await apiBase.post<
        Search_Ser_MST_ServiceType,
        ApiResponse<Ser_MST_ServiceType>
      >("/SerMstServiceType/SearchDL", {
        ...params,
      });
    },

    Ser_MST_ServiceType_Create: async (
      params: Partial<Ser_MST_ServiceType>
    ): Promise<ApiResponse<Ser_MST_ServiceType>> => {
      return await apiBase.post<
        Partial<Ser_MST_ServiceType>,
        ApiResponse<Ser_MST_ServiceType>
      >("/SerMstServiceType/Create", {
        strJson: JSON.stringify(params),
      });
    },

    Ser_MST_ServiceType_Update: async (
      key: string,
      data: Partial<Ser_MST_ServiceType>
    ): Promise<ApiResponse<Ser_MST_ServiceType>> => {
      return await apiBase.post<
        Partial<Ser_MST_ServiceType>,
        ApiResponse<Ser_MST_ServiceType>
      >("/SerMstServiceType/Update", {
        strJson: JSON.stringify({
          TypeID: key,
          ...data,
        }),
      });
    },

    Ser_MST_ServiceType_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Ser_MST_ServiceType>,
        ApiResponse<string>
      >("/SerMstServiceType/ExportTemplate", {});
    },

    Ser_MST_ServiceType_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMstServiceType/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Ser_MST_ServiceType_ExportHQ: async (
      params?: Partial<Search_Ser_MST_ServiceType>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerMstServiceType/ExportHQ",
        {
          ...params,
        }
      );
    },

    Ser_MST_ServiceType_ExportDL: async (
      params?: Partial<Search_Ser_MST_ServiceType>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerMstServiceType/ExportDL",
        {
          ...params,
        }
      );
    },

    Ser_MST_ServiceType_Delete: async (key: string) => {
      return await apiBase.post<
        Search_Ser_MST_ServiceType,
        ApiResponse<Ser_MST_ServiceType>
      >("/SerMstServiceType/Delete", {
        TypeID: key,
      });
    },

    // TST_Mst_Exchange_Unit_DeleteMultiple: async (data: any[]) => {
    //   return await apiBase.post<
    //     Search_TST_Mst_Exchange_Unit,
    //     ApiResponse<TST_Mst_Exchange_Unit>
    //   >("/TSTMstExchangeUnit/DeleteMultiple", {
    //     strJson: JSON.stringify(data),
    //   });
    // },
  };
};
