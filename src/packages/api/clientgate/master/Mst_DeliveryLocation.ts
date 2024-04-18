import { ApiResponse } from "@/packages/types";
import {
  Mst_DeliveryLocation,
  SearchMst_DeliveryLocationParam,
} from "@/packages/types/master/Mst_DeliveryLocation";

import { AxiosInstance } from "axios";

export const useMst_DeliveryLocationApi = (apiBase: AxiosInstance) => {
  return {
    //SearchHQ
    Mst_DeliveryLocation_SearchHQ: async (
      params: Partial<SearchMst_DeliveryLocationParam>
    ): Promise<ApiResponse<Mst_DeliveryLocation>> => {
      return await apiBase.post<
        Partial<SearchMst_DeliveryLocationParam>,
        ApiResponse<Mst_DeliveryLocation>
      >("/MstDeliveryLocation/SearchHQ", {
        ...params,
      });
    },
    //SearchDL
    Mst_DeliveryLocation_SearchDL: async (
      params: Partial<SearchMst_DeliveryLocationParam>
    ): Promise<ApiResponse<Mst_DeliveryLocation>> => {
      return await apiBase.post<
        Partial<SearchMst_DeliveryLocationParam>,
        ApiResponse<Mst_DeliveryLocation>
      >("/MstDeliveryLocation/SearchDL", {
        ...params,
      });
    },
    //ExportHQ
    Mst_DeliveryLocation_ExportHQ: async (
      params?: Partial<SearchMst_DeliveryLocationParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/MstDeliveryLocation/ExportExcel",
        {
          ...params,
        }
      );
    },

    //ExportDL
    Mst_DeliveryLocation_ExportDL: async (
      params?: Partial<SearchMst_DeliveryLocationParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/MstDeliveryLocation/ExportExcel",
        {
          ...params,
        }
      );
    },

    //Update
    Mst_DeliveryLocation_Update: async (
      key: any,
      data: Partial<any>
    ): Promise<ApiResponse<Mst_DeliveryLocation>> => {
      return await apiBase.post<
        Partial<SearchMst_DeliveryLocationParam>,
        ApiResponse<Mst_DeliveryLocation>
      >("/MstDeliveryLocation/Update", {
        strJson: JSON.stringify(key),
        ColsUpd: Object.keys(data).join(","),
      });
    },

    //Create
    Mst_DeliveryLocation_Create: async (
      params: Partial<Mst_DeliveryLocation>
    ): Promise<ApiResponse<Mst_DeliveryLocation>> => {
      return await apiBase.post<
        Partial<SearchMst_DeliveryLocationParam>,
        ApiResponse<Mst_DeliveryLocation>
      >("/MstDeliveryLocation/Create", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //Delete
    Mst_DeliveryLocation_Delete: async (
      params: Partial<Mst_DeliveryLocation>
    ): Promise<ApiResponse<Mst_DeliveryLocation>> => {
      return await apiBase.post<
        Partial<SearchMst_DeliveryLocationParam>,
        ApiResponse<Mst_DeliveryLocation>
      >("/MstDeliveryLocation/Delete", {
        DeliveryLocationCode: params?.DeliveryLocationCode ?? "",
        DealerCode: params?.DealerCode ?? "",
      });
    },

    //Export template
    Mst_DeliveryLocation_ExportTemplate: async (): Promise<
      ApiResponse<string>
    > => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/MstDeliveryLocation/ExportTemplate",
        {}
      );
    },

    //Import excel
    Mst_DeliveryLocation_Import: async (
      file: File
    ): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/MstDeliveryLocation/ImportExcel",
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
