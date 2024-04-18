import {
  Search_Ser_MST_Part,
  Ser_MST_Part,
} from "@/packages/types/master/Ser_MST_Part";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_Part = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_Part_SearchDL: async (
      param: Partial<Search_Ser_MST_Part>
    ): Promise<ApiResponse<Ser_MST_Part>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_Part>,
        ApiResponse<Ser_MST_Part>
      >("/SerMSTPart/SearchDL", {
        ...param,
      });
    },

    Ser_MST_Part_SearchHQ: async (
      param: Partial<Search_Ser_MST_Part>
    ): Promise<ApiResponse<Ser_MST_Part>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_Part>,
        ApiResponse<Ser_MST_Part>
      >("/SerMSTPart/SearchHQ", {
        ...param,
      });
    },

    Ser_MST_Part_Delete: async (
      key: string
    ): Promise<ApiResponse<Ser_MST_Part>> => {
      return await apiBase.post<
        Partial<Ser_MST_Part>,
        ApiResponse<Ser_MST_Part>
      >("/SerMSTPart/Delete", {
        PartID: key,
      });
    },

    Ser_MST_Part_Create: async (param: Partial<Ser_MST_Part>) => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Part>>(
        "/SerMSTPart/Create",
        {
          strJson: JSON.stringify(param as Ser_MST_Part),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_MST_Part_Update: async (
      param: Partial<Ser_MST_Part>
    ): Promise<ApiResponse<Ser_MST_Part>> => {
      return await apiBase.post("/SerMSTPart/Update", {
        strJson: JSON.stringify({
          ...param,
        }),
      });
    },

    Ser_MST_Part_ExportDL: async (
      param: Partial<Search_Ser_MST_Part>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Part>>(
        "/SerMSTPart/ExportDL",
        {
          ...param,
        }
      );
    },

    Ser_MST_Part_ExportHQ: async (
      param: Partial<Search_Ser_MST_Part>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_Part>>(
        "/SerMSTPart/ExportHQ",
        { ...param }
      );
    },

    Ser_MST_Part_ExportByListPartCode: async (
      selectedCodes: {
        PartCode: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      let data = selectedCodes.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListPartCode.push(currentValue.PartCode);
          return accumulator;
        },
        {
          ListPartCode: [],
        }
      );

      data.ListPartCode = data.ListPartCode.join(",");
      return await apiBase.post<any, ApiResponse<Ser_MST_Part>>(
        "/SerMSTPart/ExportByListPartCode",
        data
      );
    },

    Ser_MST_Part_Export_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Ser_MST_Part>, ApiResponse<string>>(
        "/SerMSTPart/ExportTemplate"
      );
    },

    Ser_MST_Part_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_MST_Part>>(
        "/SerMSTPart/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Ser_MST_Part_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTPart/Import",
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
