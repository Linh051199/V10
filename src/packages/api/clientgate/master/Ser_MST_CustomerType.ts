import {
  Search_Ser_MST_CustomerType,
  Ser_MST_CustomerType,
} from "@/packages/types/master/Ser_MST_CustomerType";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_CustomerType = (apiBase: AxiosInstance) => {
  return {
    Ser_MST_CustomerType_SearchDL: async (
      param: Partial<Search_Ser_MST_CustomerType>
    ): Promise<ApiResponse<Ser_MST_CustomerType>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_CustomerType>,
        ApiResponse<Ser_MST_CustomerType>
      >("/SerMSTCustomerType/SearchDL", {
        ...param,
      });
    },

    Ser_MST_CustomerType_SearchHQ: async (
      param: Partial<Search_Ser_MST_CustomerType>
    ): Promise<ApiResponse<Ser_MST_CustomerType>> => {
      return await apiBase.post<
        Partial<Search_Ser_MST_CustomerType>,
        ApiResponse<Ser_MST_CustomerType>
      >("/SerMSTCustomerType/SearchHQ", {
        ...param,
      });
    },

    Ser_MST_CustomerType_Delete: async (
      key: string
    ): Promise<ApiResponse<Ser_MST_CustomerType>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_CustomerType>>(
        "/SerMSTCustomerType/Delete",
        {
          CusTypeID: key,
        }
      );
    },

    Ser_MST_CustomerType_Create: async (
      param: Partial<Ser_MST_CustomerType>
    ) => {
      return await apiBase.post<any, ApiResponse<Ser_MST_CustomerType>>(
        "/SerMSTCustomerType/Create",
        {
          strJson: JSON.stringify({
            ...param,
          } as Ser_MST_CustomerType),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_MST_CustomerType_Update: async (
      param: Partial<Ser_MST_CustomerType>
    ): Promise<ApiResponse<Ser_MST_CustomerType>> => {
      return await apiBase.post("/SerMSTCustomerType/Update", {
        strJson: JSON.stringify({
          ...param,
        }),
      });
    },

    Ser_MST_CustomerType_ExportDL: async (
      param: Partial<Search_Ser_MST_CustomerType>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_CustomerType>>(
        "/SerMSTCustomerType/ExportDL",
        {
          ...param,
        }
      );
    },

    Ser_MST_CustomerType_ExportHQ: async (
      param: Partial<Search_Ser_MST_CustomerType>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<Ser_MST_CustomerType>>(
        "/SerMSTCustomerType/ExportHQ",
        { ...param }
      );
    },

    Ser_MST_CustomerType_ExportByListCusTypeID: async (
      selectedCodes: {
        CusTypeID: string;
      }[]
    ): Promise<ApiResponse<any>> => {
      let data = selectedCodes.reduce(
        (accumulator: any, currentValue: any) => {
          accumulator.ListCusTypeID.push(currentValue.CusTypeID);
          return accumulator;
        },
        {
          ListCusTypeID: [],
        }
      );

      data.ListCusTypeID = data.ListCusTypeID.join(",");
      return await apiBase.post<any, ApiResponse<Ser_MST_CustomerType>>(
        "/SerMSTCustomerType/ExportByListCusTypeID",
        data
      );
    },

    Ser_MST_CustomerType_Export_Template: async (): Promise<
      ApiResponse<any>
    > => {
      return await apiBase.post<
        Partial<Ser_MST_CustomerType>,
        ApiResponse<string>
      >("/SerMSTCustomerType/ExportTemplate");
    },

    Ser_MST_CustomerType_DeleteMultiple: async (data: string[]) => {
      return await apiBase.post<SearchParam, ApiResponse<Ser_MST_CustomerType>>(
        "/SerMSTCustomerType/DeleteMultiple",
        {
          strJson: JSON.stringify(data),
        }
      );
    },

    Ser_MST_CustomerType_Upload: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload

      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTCustomerType/Import",
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
