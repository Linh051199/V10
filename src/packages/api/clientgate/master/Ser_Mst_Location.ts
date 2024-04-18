import {
  Search_Ser_Mst_Location,
  Ser_Mst_Location,
} from "@/packages/types/master/Ser_Mst_Location";
import {
  ApiResponse,
  DeleteDealerParam,
  FlagActiveEnum,
  SearchParam,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_Mst_Location = (apiBase: AxiosInstance) => {
  return {
    Ser_Mst_Location_SearchDL: async (
      param: Partial<Search_Ser_Mst_Location>
    ): Promise<ApiResponse<Ser_Mst_Location>> => {
      return await apiBase.post<
        Partial<Search_Ser_Mst_Location>,
        ApiResponse<Ser_Mst_Location>
      >("/SerMstLocation/SearchDL", {
        ...param,
      });
    },

    Ser_Mst_Location_SearchHQ: async (
      param: Partial<Search_Ser_Mst_Location>
    ): Promise<ApiResponse<Ser_Mst_Location>> => {
      return await apiBase.post<
        Partial<Search_Ser_Mst_Location>,
        ApiResponse<Ser_Mst_Location>
      >("/SerMstLocation/SearchHQ", {
        ...param,
      });
    },
    Ser_Mst_Location_GetAllActive: async (): Promise<
      ApiResponse<Ser_Mst_Location>
    > => {
      return await apiBase.post<
        Partial<Search_Ser_Mst_Location>,
        ApiResponse<Ser_Mst_Location>
      >("/SerMstLocation/GetAllActive", {});
    },
    Ser_Mst_Location_Delete: async (
      key: string
    ): Promise<ApiResponse<Ser_Mst_Location>> => {
      return await apiBase.post<
        Partial<Ser_Mst_Location>,
        ApiResponse<Ser_Mst_Location>
      >("/SerMstLocation/Delete", {
        LocationID: key,
      });
    },

    Ser_Mst_Location_Create: async (param: Partial<Ser_Mst_Location>) => {
      return await apiBase.post<any, ApiResponse<Ser_Mst_Location>>(
        "/SerMstLocation/Create",
        {
          strJson: JSON.stringify({
            ...param,
          } as Ser_Mst_Location),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_Mst_Location_Update: async (
      param: Partial<Ser_Mst_Location>
    ): Promise<ApiResponse<Ser_Mst_Location>> => {
      return await apiBase.post("/SerMstLocation/Update", {
        strJson: JSON.stringify({
          ...param,
        }),
      });
    },

    Ser_Mst_Location_ExportDL: async (
      param: Partial<Search_Ser_Mst_Location>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_Mst_Location>>(
        "/SerMstLocation/ExportDL",
        {
          ...param,
        }
      );
    },

    Ser_Mst_Location_ExportHQ: async (
      param: Partial<Search_Ser_Mst_Location>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_Mst_Location>>(
        "/SerMstLocation/ExportHQ",
        { ...param }
      );
    },

    Ser_Mst_Location_ExportByListLocationCode: async (
      selectedCodes: {
        LocationCode: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      let data = selectedCodes.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListLocationCode.push(currentValue.LocationCode);
          return accumulator;
        },
        {
          ListLocationCode: [],
        }
      );

      data.ListLocationCode = data.ListLocationCode.join(",");
      return await apiBase.post<any, ApiResponse<Ser_Mst_Location>>(
        "/SerMstLocation/ExportByListLocationCode",
        data
      );
    },

    Ser_Mst_Location_Export_Template: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Ser_Mst_Location>, ApiResponse<string>>(
        "/SerMstLocation/ExportTemplate"
      );
    },

    Ser_Mst_Location_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_Mst_Location>>(
        "/SerMstLocation/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Ser_Mst_Location_Upload: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMstLocation/Import",
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
