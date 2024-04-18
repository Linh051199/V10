import { Ser_MST_ROComplaintDiagnosticError } from "@/packages/types/master/Ser_MST_ROComplaintDiagnosticError";
import {
  ApiResponse,
  Mst_BankAccount,
  Search_Mst_BankAccount,
} from "@packages/types";
import { AxiosInstance } from "axios";

export const useSer_MST_ROComplaintDiagnosticError = (
  apiBase: AxiosInstance
) => {
  return {
    Ser_MST_ROComplaintDiagnosticError_Search: async (
      param: Partial<any>
    ): Promise<ApiResponse<Ser_MST_ROComplaintDiagnosticError>> => {
      delete param.current
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Ser_MST_ROComplaintDiagnosticError>
      >("/SerMSTROComplaintDiagnosticError/Search", {
        ...param,
      });
    },
    Ser_MST_ROComplaintDiagnosticError_Save: async (
      param: Partial<any>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      const condition = {
        Lst_Ser_MST_ROComplaintDiagnosticError: [
          {
            ErrorCode: param.ErrorCode,
            ErrorTypeCode: param.ErrorTypeCode,
            Remark: param.Remark,
            ErrorName: param.ErrorName,
            ErrorDesc: param.ErrorDesc,
            FlagActive: param.FlagActive ? 1 : 0,
          },
        ],
      };
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/SerMSTROComplaintDiagnosticError/Save", {
        strJson: JSON.stringify(condition),
      });
    },
    Ser_MST_ROComplaintDiagnosticError_Delete: async (
      param: Partial<any>
    ): Promise<ApiResponse<Mst_BankAccount>> => {
      const condition = {
        Lst_Ser_MST_ROComplaintDiagnosticError: param.map((item: any) => {
          return {
            ErrorCode: item.ErrorCode,
            ErrorTypeCode: item.ErrorTypeCode,
            Remark: item.Remark,
            ErrorName: item.ErrorName,
            ErrorDesc: item.ErrorDesc,
            FlagActive: item.FlagActive ? 1 : 0,
          }
        })
      };

      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<Mst_BankAccount>
      >("/SerMSTROComplaintDiagnosticError/Delete", {
        strJson: JSON.stringify(condition),
      });
    },
    Ser_MST_ROComplaintDiagnosticError_ExportExcel: async (
      param: Partial<any>
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<any>
      >("/SerMSTROComplaintDiagnosticError/ExportExcel", {
        ...param,
      });
    },
    Ser_MST_ROComplaintDiagnosticError_ExportExcelTpl: async (
    ): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<Search_Mst_BankAccount>,
        ApiResponse<any>
      >("/SerMSTROComplaintDiagnosticError/ExportTemplate", {
      });
    },
    Ser_MST_ROComplaintDiagnosticError_UploadFile: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerMSTROComplaintDiagnosticError/ImportExcel",
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
