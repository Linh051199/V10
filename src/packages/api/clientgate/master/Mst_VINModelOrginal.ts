import { ApiResponse } from "@/packages/types";
import { AxiosInstance } from "axios";

export interface Mst_VINModelOrginal {
  VINCode: string;
  ModelCode: string;
  OrginalCode: string;
  CreatedDate: string;
  CreatedBy: string;
  LogLUDateTime: string;
  LogLUBy: string;
  FlagActive: string;
  Remark: string;
}

export interface Search_Mst_VINModelOrginal_Param {
  KeyWork: string;
  ModelCode: string;
  IsActive: string;
  OrginalCode: string;
  Ft_PageIndex: string;
  Ft_PageSize: string;
}

export interface Search_Mst_VINModelOrginal_Param {
  KeyWork: string;
  ModelCode: string;
  IsActive: string;
  OrginalCode: string;
  Ft_PageIndex: string;
  Ft_PageSize: string;
}

export interface Mst_VINModelOrginal_Delete_Multiple_Param {
  VINCode: string;
}

export const useMst_VINModelOrginalApi = (apiBase: AxiosInstance) => {
  return {
    Mst_VINModelOrginal_GetAllActive: async (): Promise<
      ApiResponse<Mst_VINModelOrginal>
    > => {
      return await apiBase.post<any, ApiResponse<Mst_VINModelOrginal>>(
        "/Mst_VINModelOrginal/GetAllActive",
        {}
      );
    },
    Mst_VINModelOrginal_Search: async (
      params: Partial<Search_Mst_VINModelOrginal_Param>
    ): Promise<ApiResponse<Mst_VINModelOrginal>> => {
      return await apiBase.post<any, ApiResponse<Mst_VINModelOrginal>>(
        "/Mst_VINModelOrginal/Search",
        {
          ...params,
        }
      );
    },
    Mst_VINModelOrginal_Create: async (
      data: any
    ): Promise<ApiResponse<Mst_VINModelOrginal>> => {
      return await apiBase.post<any, ApiResponse<Mst_VINModelOrginal>>(
        "/Mst_VINModelOrginal/Create",
        {
          strJson: JSON.stringify(data),
        }
      );
    },
    Mst_VINModelOrginal_Update: async (
      data: Partial<Mst_VINModelOrginal>
    ): Promise<ApiResponse<Mst_VINModelOrginal>> => {
      return await apiBase.post<any, ApiResponse<Mst_VINModelOrginal>>(
        "/Mst_VINModelOrginal/Update",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Mst_VINModelOrginal_Delete: async (
      VINCode: Mst_VINModelOrginal_Delete_Multiple_Param
    ): Promise<ApiResponse<Mst_VINModelOrginal>> => {
      return await apiBase.post<any, ApiResponse<Mst_VINModelOrginal>>(
        "/Mst_VINModelOrginal/Delete",
        VINCode
      );
    },

    Mst_VINModelOrginal_Delete_Multiple: async (
      list: Mst_VINModelOrginal_Delete_Multiple_Param
    ): Promise<ApiResponse<Mst_VINModelOrginal>> => {
      return await apiBase.post<any, ApiResponse<Mst_VINModelOrginal>>(
        "/Mst_VINModelOrginal/DeleteMultiple",
        {
          strJson: JSON.stringify(list),
        }
      );
    },

    Mst_VINModelOrginal_ExportTemplate: async (): Promise<
      ApiResponse<Mst_VINModelOrginal>
    > => {
      return await apiBase.post<any, ApiResponse<Mst_VINModelOrginal>>(
        "/Mst_VINModelOrginal/ExportTemplate",
        {}
      );
    },

    Mst_VINModelOrginal_ImportExcel: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/Mst_VINModelOrginal/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  };
};
