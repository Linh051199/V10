
import { Create_Params_QuanLyAnhTrenPhieuTNGX, QuanLyAnhTrenPhieuTNGX, Search_QuanLyAnhTrenPhieuTNGX_Param } from "@/packages/types/master/QuanLyAnhTrenPhieuTNGX";
import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_Mst_ModelAudImageApi = (apiBase: AxiosInstance) => {
  return {
    Ser_Mst_ModelAudImageApi_Search: async (
      param: Partial<Search_QuanLyAnhTrenPhieuTNGX_Param>
    ): Promise<ApiResponse<QuanLyAnhTrenPhieuTNGX>> => {
      return await apiBase.post<
        Partial<Search_QuanLyAnhTrenPhieuTNGX_Param>,
        ApiResponse<QuanLyAnhTrenPhieuTNGX>
      >("/SerMstModelAudImage/Search", {
        ...param,
      });
    },

    Ser_Mst_ModelAudImageApi_Create: async (
      param: Partial<Create_Params_QuanLyAnhTrenPhieuTNGX>
    ): Promise<ApiResponse<QuanLyAnhTrenPhieuTNGX>> => {
      return await apiBase.post<
        Partial<Create_Params_QuanLyAnhTrenPhieuTNGX>,
        ApiResponse<QuanLyAnhTrenPhieuTNGX>
      >("/SerMstModelAudImage/Create", {
        strJson: JSON.stringify(param),
      });
    },

    Ser_Mst_ModelAudImageApi_Detail: async (
      key: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstModelAudImage/GetDetail",
        {
          ReceptionFAudType: key.ReceptionFAudType,
          ModelCode: key.ModelCode
        }
      );
    },
    Ser_Mst_ModelAudImageApi_Delete: async (
      data: any
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstModelAudImage/Delete",
        {
          ReceptionFAudType: data.ReceptionFAudType,
          ModelCode: data.ModelCode
        }
      );
    },

    Ser_Mst_ModelAudImageApi_GetActive: async (
    ) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/MstCarModelStd/GetAllActive",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_Mst_ModelAudImageApi_GetActiveReceptionFAudType: async (
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post(
        "/SerMstReceptionFAudType/GetAllActive",);
    },

    Ser_Mst_ModelAudImageApi_Update: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstModelAudImage/Update",
        {
          strJson: JSON.stringify(param),
          ColsUpd: "FilePath,FlagActive,Remark"
        }
      );
    },

    Ser_Mst_ModelAudImageApi_ExportExcel: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerMstModelAudImage/ExportExcel",
        {
          ...param,
        }
      );
    },
    // Ser_Mst_ModelAudImageApi_ExportHQ: async (
    //   param: Partial<Search_Ser_Mst_ModelAudImageApi>
    // ): Promise<ApiResponse<any>> => {
    //   return await apiBase.post<any, ApiResponse<Ser_Mst_ModelAudImageApi>>(
    //     "/SerMSTCustomerType/ExportHQ",
    //     { ...param }
    //   );
    // },

    // Ser_Mst_ModelAudImageApi_ExportByListCusTypeID: async (
    //   selectedCodes: {
    //     CusTypeID: string;
    //   }[]
    // ): Promise<ApiResponse<any>> => {
    //   let data = selectedCodes.reduce(
    //     (accumulator: any, currentValue: any) => {
    //       accumulator.ListCusTypeID.push(currentValue.CusTypeID);
    //       return accumulator;
    //     },
    //     {
    //       ListCusTypeID: [],
    //     }
    //   );

    //   data.ListCusTypeID = data.ListCusTypeID.join(",");
    //   return await apiBase.post<any, ApiResponse<Ser_Mst_ModelAudImageApi>>(
    //     "/SerMSTCustomerType/ExportByListCusTypeID",
    //     data
    //   );
    // },

    // Ser_Mst_ModelAudImageApi_Export_Template: async (): Promise<
    //   ApiResponse<any>
    // > => {
    //   return await apiBase.post<
    //     Partial<Ser_Mst_ModelAudImageApi>,
    //     ApiResponse<string>
    //   >("/SerMSTCustomerType/ExportTemplate");
    // },

    // Ser_Mst_ModelAudImageApi_DeleteMultiple: async (data: string[]) => {
    //   return await apiBase.post<SearchParam, ApiResponse<Ser_Mst_ModelAudImageApi>>(
    //     "/SerMSTCustomerType/DeleteMultiple",
    //     {
    //       strJson: JSON.stringify(data),
    //     }
    //   );
    // },

    // Ser_Mst_ModelAudImageApi_Upload: async (
    //   file: File
    // ): Promise<ApiResponse<any>> => {
    //   const form = new FormData();
    //   form.append("file", file); // file is the file you want to upload

    //   return await apiBase.post<File, ApiResponse<any>>(
    //     "/SerMSTCustomerType/Import",
    //     form,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    // },
  };
};
