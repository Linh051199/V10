import { ApiResponse } from "@/packages/types";
import {
  Search_Ser_GroupRepair_Param,
  Ser_GroupRepair,
} from "@/packages/types/master/Ser_GroupRepair";
import { AxiosInstance } from "axios";

export const useSer_GroupRepairApi = (apiBase: AxiosInstance) => {
  return {
    Ser_GroupRepair_GetAllActive: async (): Promise<
      ApiResponse<Ser_GroupRepair>
    > => {
      return await apiBase.post<any, ApiResponse<Ser_GroupRepair>>(
        "/SerGroupRepair/GetAllActive",
        {}
      );
    },
    Ser_GroupRepair_SearchHQ: async (
      params: Partial<Search_Ser_GroupRepair_Param>
    ): Promise<ApiResponse<Ser_GroupRepair>> => {
      return await apiBase.post<any, ApiResponse<Ser_GroupRepair>>(
        "/SerGroupRepair/SearchHQ",
        {
          ...params,
        }
      );
    },
    Ser_GroupRepair_SearchDL: async (
      params: Partial<Search_Ser_GroupRepair_Param>
    ): Promise<ApiResponse<Ser_GroupRepair>> => {
      return await apiBase.post<any, ApiResponse<Ser_GroupRepair>>(
        "/SerGroupRepair/SearchDL",
        {
          ...params,
        }
      );
    },
    Ser_GroupRepair_GetByStatusHQ: async (
      params: Partial<Search_Ser_GroupRepair_Param>
    ): Promise<ApiResponse<Ser_GroupRepair>> => {
      return await apiBase.post<any, ApiResponse<Ser_GroupRepair>>(
        "/SerGroupRepair/GetByStatusHQ",
        {
          ...params,
        }
      );
    },
    Ser_GroupRepair_GetByStatusDL: async (
      params: Partial<Search_Ser_GroupRepair_Param>
    ): Promise<ApiResponse<Ser_GroupRepair>> => {
      return await apiBase.post<any, ApiResponse<Ser_GroupRepair>>(
        "/SerGroupRepair/GetByStatusDL",
        {
          ...params,
        }
      );
    },
    Ser_GroupRepair_GetByEngineerNoDL: async (
      params: Partial<Search_Ser_GroupRepair_Param>
    ): Promise<ApiResponse<Ser_GroupRepair>> => {
      return await apiBase.post<any, ApiResponse<Ser_GroupRepair>>(
        "/SerGroupRepair/GetByEngineerNoDL",
        {
          ...params,
        }
      );
    },
    Ser_GroupRepair_Update: async (
      data: Partial<any>
    ): Promise<ApiResponse<Ser_GroupRepair>> => {
      return await apiBase.post<any, ApiResponse<Ser_GroupRepair>>(
        "/SerGroupRepair/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Ser_GroupRepair_Create: async (data: Partial<any>): Promise<any> => {
      return await apiBase.post<any, any>("/SerGroupRepair/Create", {
        strJson: JSON.stringify(data),
      });
    },
    Ser_GroupRepair_Delete: async (
      GroupRID: Partial<any>
    ): Promise<ApiResponse<Ser_GroupRepair>> => {
      return await apiBase.post<any, ApiResponse<Ser_GroupRepair>>(
        "/SerGroupRepair/Delete",
        {
          GroupRID: GroupRID,
        }
      );
    },
    Ser_GroupRepair_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerGroupRepair/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    Ser_GroupRepair_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Ser_GroupRepair>, ApiResponse<string>>(
        "/SerGroupRepair/ExportTemplate",
        {}
      );
    },
    Ser_GroupRepair_ExportExcel_HQ: async (
      data: any
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Partial<Ser_GroupRepair>, ApiResponse<string>>(
        "/SerGroupRepair/ExportHQ",
        {
          ...data,
        }
      );
    },
    Ser_GroupRepair_ExportExcel_DL: async (
      data: any
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<Partial<Ser_GroupRepair>, ApiResponse<string>>(
        "/SerGroupRepair/ExportDL",
        {
          ...data,
        }
      );
    },
  };
};
