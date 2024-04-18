import { ApiResponse, FlagActiveEnum } from "@/packages/types";
import {
  SearchSer_CustomerCarParam,
  Ser_CustomerCar,
} from "@/packages/types/master/Ser_CustomerCar";
import { AxiosInstance } from "axios";

export const useSer_Customer_CarApi = (apiBase: AxiosInstance) => {
  return {
    //SearchHQ
    Ser_CustomerCar_SearchHQ: async (
      params: Partial<SearchSer_CustomerCarParam>
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerCarParam>,
        ApiResponse<Ser_CustomerCar>
      >("/SerCustomer/SerCustomerCarSearchHQ", {
        ...params,
      });
    },
    //SearchDL
    Ser_CustomerCar_SearchDL: async (
      params: Partial<SearchSer_CustomerCarParam>
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerCarParam>,
        ApiResponse<Ser_CustomerCar>
      >("/SerCustomer/SerCustomerCarSearchDL", {
        ...params,
        // Ft_PageSize: params.Ft_PageSize == 0 ? 100 : params.Ft_PageSize
      });
    },

    //Create
    Ser_CustomerCar_Create: async (
      params: Partial<Ser_CustomerCar>
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerCarParam>,
        ApiResponse<Ser_CustomerCar>
      >("/SerCustomer/SerCustomerCreate", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //Delete
    Ser_CustomerCar_Delete: async (
      params: any
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      console.log(" ~ params:", params);
      return await apiBase.post<
        Partial<SearchSer_CustomerCarParam>,
        ApiResponse<Ser_CustomerCar>
      >("/SerCustomer/Delete", {
        ...params,
      });
    },

    //Export template
    Ser_CustomerCar_ExportTemplate: async (): Promise<ApiResponse<string>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerCustomer/SerCustomerCarExportTemplate",
        {}
      );
    },
    //Import excel
    Ser_CustomerCar_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerCustomer/SerCustomerImport",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    //ExportHQ
    Ser_CustomerCar_ExportHQ: async (
      params?: Partial<SearchSer_CustomerCarParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCustomer/SerCustomerCarExportHQ",
        {
          ...params,
        }
      );
    },

    //ExportDL
    Ser_CustomerCar_ExportDL: async (
      params?: Partial<SearchSer_CustomerCarParam>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCustomer/SerCustomerCarExportDL",
        {
          ...params,
        }
      );
    },

    //Update
    Ser_CustomerCar_Update: async (
      params: Partial<Ser_CustomerCar>
    ): Promise<ApiResponse<Ser_CustomerCar>> => {
      return await apiBase.post<
        Partial<SearchSer_CustomerCarParam>,
        ApiResponse<Ser_CustomerCar>
      >("/SerCustomer/SerCustomerUpdate", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    //     //getAllActive
    //     Ser_CustomerCar_GetAllActive: async () => {
    //       return await apiBase.post<
    //         Partial<Ser_CustomerCar>,
    //         ApiResponse<Ser_CustomerCar>
    //       >("/SerCustomer/GetAllActive");
    //     },

    //Lấy thông tin xe
    Ser_CustomerCar_SerCarSearchDL: async (
      params?: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCustomer/SerCarSearchDL",
        {
          ...params,
        }
      );
    },

    // Tạo mới thông tin xe
    Ser_CustomerCar_AddNewCar: async (
      params: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCustomer/SerCarCreate",
        {
          strJson: JSON.stringify({ ...params }),
        }
      );
    },
    // Sửa thông tin xe
    Ser_CustomerCar_UpdateCar: async (
      params: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<any>, ApiResponse<any>>(
        "/SerCustomer/SerCarUpdate",
        {
          strJson: JSON.stringify({ ...params }),
        }
      );
    },

    //Lấy thông tin listTradeMarkCode
    Ser_CustomerCar_Ser_Mst_TradeMark_SearchDL: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstTradeMark/SearchDL",
        {
          ...params,
        }
      );
    },
    //Lấy thông tin listInsNo
    Ser_CustomerCar_listInsNo_SearchDL: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInsurance/SearchDL",
        {
          ...params,
        }
      );
    },

    //Xoá xe
    Ser_CustomerCar_SerCarDelete: async (
      params: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerCustomer/SerCarDelete",
        {
          ...params,
        }
      );
    },
  };
};
