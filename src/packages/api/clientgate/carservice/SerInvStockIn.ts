import { AxiosInstance } from "axios";
import { ApiResponse } from "@packages/types";
import {
  Ser_CusDebit,
  Ser_CusDebitResponse,
  Ser_Inv_StockIn,
  Ser_Inv_StockInDtl,
  Ser_Inv_StockInMst,
  Ser_Inv_StockInResponse,
  Ser_Inv_StockIn_GetMaxStockInNo,
  Ser_Inv_StockIn_Search,
} from "@/packages/types/carservice/Ser_Inv_StockIn";
import { formatDate } from "@/packages/common/date_utils";
import {
  Search_Ser_MST_Part,
  Ser_MST_Part,
} from "@/packages/types/master/Ser_MST_Part";

// 65. Quản lý phiếu nhập kho

// StatusPendingValue = "1";
// StatusPendingText = "Mới tạo";
// StatusExecutingValue = "2";
// StatusExecutingText = "Tiến hành";
// StatusFinishedValue = "3";
// StatusFinishedText = "Kết thúc";
// StatusAdjusmentValue = "4";
// StatusAdjusmentText = "Đã điều chỉnh";
// StatusRejectValue = "5";
// StatusRejectText = "Đã hủy";

export const useSer_Inv_StockIn = (apiBase: AxiosInstance) => {
  return {
    // Tìm kiếm   => done
    Ser_Inv_StockIn_SearchDL: async (
      param: Partial<Ser_Inv_StockIn_Search>
    ): Promise<ApiResponse<Ser_Inv_StockIn>> => {
      const searchParam = {
        ...param,
        FlagDataWH: param.FlagDataWH ? "1" : "0",
        IsPending: param.IsPending ? "1" : "0",
        IsExecuting: param.IsExecuting ? "1" : "0",
        IsFinished: param.IsFinished ? "1" : "0",
        IsAdjustment: param.IsAdjustment ? "1" : "0",
        IsReject: param.IsReject ? "1" : "0",
      };
      if (param.StockDateFromTo) {
        searchParam.StockDateFrom = param.StockDateFromTo[0]
          ? formatDate(param.StockDateFromTo[0])
          : "";
        searchParam.StockDateTo = param.StockDateFromTo[1]
          ? formatDate(param.StockDateFromTo[1])
          : "";
      }
      delete searchParam.StockDateFromTo;
      return await apiBase.post<
        Partial<Ser_Inv_StockIn_Search>,
        ApiResponse<Ser_Inv_StockIn>
      >(
        param.FlagDataWH
          ? "/SerInvStockIn/SearchWHDL"
          : "/SerInvStockIn/SearchDL",
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

    //  Tìm kiếm phụ tùng => done
    Ser_MST_Part_SearchForSerInvStockInDL: async (
      param: Partial<Search_Ser_MST_Part>
    ): Promise<ApiResponse<Ser_Inv_StockIn>> => {
      const searchParam = {
        ...param,
      };
      return await apiBase.post<
        Partial<Search_Ser_MST_Part>,
        ApiResponse<Ser_Inv_StockIn>
      >(
        "/SerMSTPart/SearchForSerInvStockInDL",
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

    //  Chi tiết => done
    Ser_Inv_StockIn_GetByStockInIDDL: async (
      param: Partial<any>
    ): Promise<ApiResponse<Ser_Inv_StockIn>> => {
      const searchParam = {
        ...param,
      };
      return await apiBase.post<
        Partial<Ser_MST_Part>,
        ApiResponse<Ser_Inv_StockIn>
      >(
        "/SerInvStockIn/GetByStockInIDDL",
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

    //  Lấy số phiếu nhập => done
    Ser_Inv_StockIn_GetMaxStockInNo: async (): Promise<
      ApiResponse<Ser_Inv_StockIn_GetMaxStockInNo>
    > => {
      return await apiBase.post<
        Partial<Ser_MST_Part>,
        ApiResponse<Ser_Inv_StockIn_GetMaxStockInNo>
      >(
        "/SerInvStockIn/GetMaxStockInNo",
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Import excel (import danh sách xe màn hình tạo) => done
    Ser_Inv_StockIn_Import: async (file: File): Promise<ApiResponse<any>> => {
      const form = new FormData();
      form.append("file", file); // file is the file you want to upload
      return await apiBase.post<File, ApiResponse<any>>(
        "/SerInvStockIn/Import",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },

    // Export excel template (mẫu file excel import màn hình tạo) => done
    Ser_Inv_StockIn_ExportTemplate: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<Partial<Ser_Inv_StockIn>, ApiResponse<string>>(
        "/SerInvStockIn/ExportTemplate",
        {}
      );
    },

    // Tạo mới => done
    Ser_Inv_StockIn_Create: async (
      objSer_Inv_StockInMst: Ser_Inv_StockInMst,
      objSer_Inv_StockInDtl: Ser_Inv_StockInDtl[]
    ): Promise<ApiResponse<Ser_Inv_StockInResponse>> => {
      // {
      //   "Ser_Inv_StockIn": {
      //   "SupplierID": "5053",
      //   "DealerCode": "VS058",
      //   "StockInNo": "PN-VS058-240216-001",
      //   "StockInID": "795686",
      //   "StockInType": "1",
      //   "StockInDate": "2024-02-16",
      //   "Description": "Toàn test",
      //   "BillNo": "BILL001",
      //   "AdjustmentBy": "",
      //   "AdjustmentDate": "",
      //   "AdjustmentNote": "",
      //   "OldStockInID": "",
      //   "OrderPartId": "",
      //   "OrderPartNo": "",
      //     },
      //   "Lst_Ser_Inv_StockInDetail": [
      //     {
      //       "PartID": "1089782",
      //       "Quantity": "100",
      //       "Description": "Test",
      //       "PlanLocationID": "11502",
      //       "Price": "100000",
      //       "VAT": "10",
      //     }],
      // }
      const request = {
        Ser_Inv_StockIn: objSer_Inv_StockInMst,
        Lst_Ser_Inv_StockInDetail: objSer_Inv_StockInDtl,
      };

      return await apiBase.post<any, ApiResponse<Ser_Inv_StockInResponse>>(
        "/SerInvStockIn/Create",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Cập nhật => done
    Ser_Inv_StockIn_Update: async (
      objSer_Inv_StockInMst: Ser_Inv_StockInMst,
      objSer_Inv_StockInDtl: Ser_Inv_StockInDtl[]
    ): Promise<ApiResponse<Ser_Inv_StockInResponse>> => {
      // {
      //   "Ser_Inv_StockIn": {
      //   "SupplierID": "5053",
      //   "DealerCode": "VS058",
      //   "StockInNo": "PN-VS058-240216-001",
      //   "StockInID": "795686",
      //   "StockInType": "1",
      //   "StockInDate": "2024-02-16",
      //   "Description": "Toàn test",
      //   "BillNo": "BILL001",
      //   "AdjustmentBy": "",
      //   "AdjustmentDate": "",
      //   "AdjustmentNote": "",
      //   "OldStockInID": "",
      //   "OrderPartId": "",
      //   "OrderPartNo": "",
      //     },
      //   "Lst_Ser_Inv_StockInDetail": [
      //     {
      //       "PartID": "1089782",
      //       "Quantity": "100",
      //       "Description": "Test",
      //       "PlanLocationID": "11502",
      //       "Price": "100000",
      //       "VAT": "10",
      //     }],
      // }
      const request = {
        Ser_Inv_StockIn: objSer_Inv_StockInMst,
        Lst_Ser_Inv_StockInDetail: objSer_Inv_StockInDtl,
      };

      return await apiBase.post<any, ApiResponse<Ser_Inv_StockInResponse>>(
        "/SerInvStockIn/Update",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Tiến hành => done
    Ser_Inv_StockIn_StatusUpdateToExecuting: async (
      objSer_Inv_StockInMst: Ser_Inv_StockInMst,
      objSer_Inv_StockInDtl: Ser_Inv_StockInDtl[]
    ): Promise<ApiResponse<Ser_Inv_StockInResponse>> => {
      // {
      //   "Ser_Inv_StockIn": {
      //   "SupplierID": "5053",
      //   "DealerCode": "VS058",
      //   "StockInNo": "PN-VS058-240216-001",
      //   "StockInID": "795686",
      //   "StockInType": "1",
      //   "StockInDate": "2024-02-16",
      //   "Description": "Toàn test",
      //   "BillNo": "BILL001",
      //   "AdjustmentBy": "",
      //   "AdjustmentDate": "",
      //   "AdjustmentNote": "",
      //   "OldStockInID": "",
      //   "OrderPartId": "",
      //   "OrderPartNo": "",
      //     },
      //   "Lst_Ser_Inv_StockInDetail": [
      //     {
      //       "PartID": "1089782",
      //       "Quantity": "100",
      //       "Description": "Test",
      //       "PlanLocationID": "11502",
      //       "Price": "100000",
      //       "VAT": "10",
      //     }],
      // }
      const request = {
        Ser_Inv_StockIn: objSer_Inv_StockInMst,
        Lst_Ser_Inv_StockInDetail: objSer_Inv_StockInDtl,
      };

      return await apiBase.post<any, ApiResponse<Ser_Inv_StockInResponse>>(
        "/SerInvStockIn/StatusUpdateToExecuting",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Hoàn trạng => done
    Ser_Inv_StockIn_StatusUpdateToPending: async (
      objSer_Inv_StockInMst: Ser_Inv_StockInMst,
      objSer_Inv_StockInDtl: Ser_Inv_StockInDtl[]
    ): Promise<ApiResponse<Ser_Inv_StockInResponse>> => {
      // {
      //   "Ser_Inv_StockIn": {
      //     "SupplierID": "5053",
      //     "DealerCode": "VS058",
      //     "StockInNo": "PN-VS058-240216-001",
      //     "StockInID": "795689",
      //     "StockInType": "1",
      //     "StockInDate": "2024-02-16",
      //     "Description": "Toàn test pending",
      //     "BillNo": "BILL001",
      //     "AdjustmentBy": "",
      //     "AdjustmentDate": "",
      //     "AdjustmentNote": "",
      //     "OldStockInID": "",
      //     "OrderPartId": "",
      //     "OrderPartNo": "",
      //     },
      //   "Lst_Ser_Inv_StockInDetail": [
      //     {
      //       "PartID": "1089782",
      //       "Quantity": "100",
      //       "Description": "TestUpd",
      //       "PlanLocationID": "11502",
      //       "Price": "1000000",
      //       "VAT": "10",
      //     }],
      // }
      const request = {
        Ser_Inv_StockIn: objSer_Inv_StockInMst,
        Lst_Ser_Inv_StockInDetail: objSer_Inv_StockInDtl,
      };

      return await apiBase.post<any, ApiResponse<Ser_Inv_StockInResponse>>(
        "/SerInvStockIn/StatusUpdateToPending",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Kết thúc => done
    Ser_Inv_StockIn_StatusUpdateToFinished: async (
      objSer_Inv_StockInMst: Ser_Inv_StockInMst,
      objSer_Inv_StockInDtl: Ser_Inv_StockInDtl[]
    ): Promise<ApiResponse<Ser_Inv_StockInResponse>> => {
      // {
      //   "Ser_Inv_StockIn": {
      //     "SupplierID": "5053",
      //     "DealerCode": "VS058",
      //     "StockInNo": "PN-VS058-240216-001",
      //     "StockInID": "795689",
      //     "StockInType": "1",
      //     "StockInDate": "2024-02-16",
      //     "Description": "Toàn test pending",
      //     "BillNo": "BILL001",
      //     "AdjustmentBy": "",
      //     "AdjustmentDate": "",
      //     "AdjustmentNote": "",
      //     "OldStockInID": "",
      //     "OrderPartId": "",
      //     "OrderPartNo": "",
      //     },
      //   "Lst_Ser_Inv_StockInDetail": [
      //     {
      //       "PartID": "1089782",
      //       "Quantity": "100",
      //       "Description": "TestUpd",
      //       "PlanLocationID": "11502",
      //       "Price": "1000000",
      //       "VAT": "10",
      //     }],
      // }
      const request = {
        Ser_Inv_StockIn: objSer_Inv_StockInMst,
        Lst_Ser_Inv_StockInDetail: objSer_Inv_StockInDtl,
      };

      return await apiBase.post<any, ApiResponse<Ser_Inv_StockInResponse>>(
        "/SerInvStockIn/StatusUpdateToFinished",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Từ chối => done
    Ser_Inv_StockIn_Reject: async (request: {
      DealerCode: string;
      StockInID: string;
      RejectBy: string;
      RejectDate: string;
      RejectDescription: string;
    }) => {
      // DealerCode:VS058
      // StockInID:795686
      // RejectBy:0317844394@INOS.VN
      // RejectDate:2024-02-20
      // RejectDescription:Test
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockIn/Reject",
        {
          DealerCode: request.DealerCode,
          StockInID: request.StockInID,
          RejectBy: request.RejectBy,
          RejectDate: request.RejectDate,
          RejectDescription: request.RejectDescription,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Xóa => done
    Ser_Inv_StockIn_Delete: async (request: string) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockIn/Delete",
        {
          StockInID: request,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // In => done
    Ser_Inv_StockIn_PrintDL: async (request: string) => {
      return await apiBase.post<any, ApiResponse<any>>(
        "/SerInvStockIn/PrintDL",
        {
          StockInID: request,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Tạo nợ NCC => done
    Ser_Inv_StockIn_SerCusDebitCreate: async (
      request: Partial<Ser_CusDebit>
    ): Promise<ApiResponse<Ser_Inv_StockInResponse>> => {
      //strJson: {
      //   "DealerCode": "VS058",
      //   "DebitAmount": "100000",
      //   "DebitDate": "2024-02-22 11:11:11",
      //   "Note": "toan test",
      //   "StockInID": "795045",
      //   "SupplierID": "5053"
      // }

      return await apiBase.post<any, ApiResponse<Ser_Inv_StockInResponse>>(
        "/SerInvStockIn/Ser_CusDebit_Create",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Cập nhật nợ NCC => done
    Ser_Inv_StockIn_SerCusDebitUpdate: async (
      request: Partial<Ser_CusDebit>
    ): Promise<ApiResponse<Ser_Inv_StockInResponse>> => {
      //strJson: {
      // 	"DealerCode": "VS058",
      // 	"CusDebitID": 395812,
      // 	"DebitAmount": "1000000",
      // 	"DebitDate": "2024-02-21 11:11:11",
      // 	"Note": "toan test 2",
      // 	"StockInID": "795045",
      // 	"SupplierID": "5053"
      // }

      return await apiBase.post<any, ApiResponse<Ser_Inv_StockInResponse>>(
        "/SerInvStockIn/Ser_CusDebit_Update",
        {
          strJson: JSON.stringify(request),
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Chi tiết nợ NCC => done
    Ser_Inv_StockIn_SerCusDebitGetDL: async (
      request: Partial<Ser_CusDebit>
    ): Promise<ApiResponse<Ser_CusDebitResponse>> => {
      // DealerCode:VS058
      // StockInID:795690
      // SupplierID:
      // CusDebitID:
      return await apiBase.post<any, ApiResponse<Ser_CusDebitResponse>>(
        "/SerInvStockIn/Ser_CusDebit_Get_DL",
        {
          DealerCode: request.DealerCode,
          StockInID: request.StockInID,
          // SupplierID: request.SupplierID, // Khi nào dùng thì sử dụng
          // CusDebitID: request.CusDebitID, // Khi nào dùng thì sử dụng
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    },

    // Xóa nợ NCC => done
    Ser_Inv_StockIn_SerCusDebitDelete: async (
      request: string
    ): Promise<ApiResponse<Ser_Inv_StockInResponse>> => {
      return await apiBase.post<any, ApiResponse<Ser_Inv_StockInResponse>>(
        "/SerInvStockIn/Ser_CusDebit_Delete",
        {
          CusDebitID: request,
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
