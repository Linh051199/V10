import {
  Search_Ser_MST_Service,
  Ser_MST_Service,
} from "@/packages/types/master/Ser_MST_Service";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_Service = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_Service_SearchDL: async (
      param: Partial<Search_Ser_MST_Service>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_Service>,
        ApiResponse<Ser_MST_Service>
      >("/SerMSTService/SearchDL", {
        ...param,
      });
    },

    Ser_MST_Service_SearchHQ: async (
      param: Partial<Search_Ser_MST_Service>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_Service>,
        ApiResponse<Ser_MST_Service>
      >("/SerMSTService/SearchHQ", {
        ...param,
      });
    },

    Ser_MST_Service_Delete: async (
      key: string
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post<
        Partial<Ser_MST_Service>,
        ApiResponse<Ser_MST_Service>
      >("/SerMSTService/Delete", {
        SerID: key,
      });
    },

    Ser_MST_Service_Create: async (param: Partial<Ser_MST_Service>) => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/Create",
        {
          strJson: JSON.stringify({
            ...param,
          } as Ser_MST_Service),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_MST_Service_Update: async (
      param: Partial<Ser_MST_Service>
    ): Promise<ApiResponse<Ser_MST_Service>> => {
      return await apiBase.post("/SerMSTService/Update", {
        strJson: JSON.stringify({
          ...param,
        }),
      });
    },

    Ser_MST_Service_ExportDL: async (
      param: Partial<Search_Ser_MST_Service>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/ExportDL",
        {
          ...param,
        }
      );
    },

    Ser_MST_Service_ExportHQ: async (
      param: Partial<Search_Ser_MST_Service>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/ExportHQ",
        { ...param }
      );
    },

    Ser_MST_Service_ExportByListSerCode: async (
      selectedCodes: {
        SerCode: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      let data = selectedCodes.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListSerCode.push(currentValue.SerCode);
          return accumulator;
        },
        {
          ListSerCode: [],
        }
      );

      data.ListSerCode = data.ListSerCode.join(",");
      return await apiBase.post<any, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/ExportByListSerCode",
        data
      );
    },

    Ser_MST_Service_Export_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Ser_MST_Service>, ApiResponse<string>>(
        "/SerMSTService/ExportTemplate"
      );
    },

    Ser_MST_Service_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_MST_Service>>(
        "/SerMSTService/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Ser_MST_Service_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTService/Import",
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
