import {
  ApiResponse,
  DeleteDealerParam,
  FlagActiveEnum,
  Mst_Dealer,
  Mst_Dealer_Address,
  SearchDealerParam,
} from "@/packages/types";
import {
  Search_Ser_Mst_Supplier,
  Ser_Mst_Supplier,
} from "@/packages/types/master/Ser_Mst_Supplier";
import { AxiosInstance } from "axios";

export const useSer_Mst_SupplierApi = (apiBase: AxiosInstance) => {
  return {
    Ser_Mst_Supplier_SearchHQ: async (
      params: Partial<Search_Ser_Mst_Supplier>
    ): Promise<ApiResponse<Ser_Mst_Supplier>> => {
      return await apiBase.post<
        Partial<Search_Ser_Mst_Supplier>,
        ApiResponse<Ser_Mst_Supplier>
      >("/SerMstSupplier/SearchHQ", {
        ...params,
      });
    },

    Ser_Mst_Supplier_SearchDL: async (
      params: Partial<Search_Ser_Mst_Supplier>
    ): Promise<ApiResponse<Ser_Mst_Supplier>> => {
      return await apiBase.post<
        Partial<Search_Ser_Mst_Supplier>,
        ApiResponse<Ser_Mst_Supplier>
      >("/SerMstSupplier/SearchDL", {
        ...params,
      });
    },

    // ThangPV writes GetAllActive (2024-02-19)
    Ser_Mst_Supplier_GetAllActive: async (): Promise<
      ApiResponse<Ser_Mst_Supplier>
    > => {
      return await apiBase.post<
        Partial<Search_Ser_Mst_Supplier>,
        ApiResponse<Ser_Mst_Supplier>
      >("/SerMstSupplier/GetAllActive", {});
    },

    Ser_Mst_Supplier_ExportTemplate: async (): Promise<ApiResponse<string>> => {
      return await apiBase.post<any, ApiResponse<string>>(
        "/SerMstSupplier/ExportTemplate",
        {}
      );
    },

    Ser_Mst_Supplier_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerInvStock/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    Ser_Mst_Supplier_Create: async (values: Partial<Ser_Mst_Supplier>) => {
      return await apiBase.post<any, ApiResponse<Ser_Mst_Supplier>>(
        "/SerMstSupplier/Create",
        {
          strJson: JSON.stringify({
            ...values,
            SupplierCode: values.SupplierCode ?? "",
            SupplierName: values.SupplierName ?? "",
            Phone: values.Phone ?? "",
            SupplierFax: values.SupplierFax ?? "",
            ContactName: values.ContactName ?? "",
            ContactPhone: values.ContactPhone ?? "",
            Address: values.Address ?? "",
            IsActive: "1",
          } as Ser_Mst_Supplier),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_Mst_Supplier_Update: async (
      params: Partial<Ser_Mst_Supplier>
    ): Promise<ApiResponse<Ser_Mst_Supplier>> => {
      return await apiBase.post<
        Partial<Search_Ser_Mst_Supplier>,
        ApiResponse<Ser_Mst_Supplier>
      >("/SerMstSupplier/Update", {
        strJson: JSON.stringify({ ...params }),
      });
    },

    Ser_Mst_Supplier_Delete: async (
      param: any
    ): Promise<ApiResponse<Ser_Mst_Supplier>> => {
      return await apiBase.post<any, ApiResponse<Ser_Mst_Supplier>>(
        "/SerMstSupplier/Delete",
        {
          SupplierID: param.SupplierID,
          SupplierCode: param.SupplierCode,
        }
      );
    },

    Ser_Mst_Supplier_ExportHQ: async (
      param: Partial<Search_Ser_Mst_Supplier>
    ) => {
      const searchParam = {
        ...param,
      };

      return await apiBase.post<
        Partial<Search_Ser_Mst_Supplier>,
        ApiResponse<string>
      >(
        "/SerMstSupplier/ExportHQ",
        {
          ...searchParam,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    Ser_Mst_Supplier_ExportDL: async (
      param: Partial<Search_Ser_Mst_Supplier>
    ) => {
      const searchParam = {
        ...param,
      };

      return await apiBase.post<
        Partial<Search_Ser_Mst_Supplier>,
        ApiResponse<string>
      >(
        "/SerMstSupplier/ExportDL",
        {
          ...searchParam,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },
  };
};
