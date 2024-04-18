import { ApiResponse, SearchParam } from "@packages/types";
import { AxiosInstance } from "axios";

interface Props {
  FromDate: string;
  ToDate: string;
  FlagDataWH: string;
}

interface Result {
  TSTPartCode: string;
  TSTPrice: string;
  TSTPriceBefore: string;
  LUDTime: string;
  LUBy: string;
  VieName: string;
  VAT: string;
  Unit: string;
  DateEffect: string;
  TSTCost: string;
  VieNameHTC: string;
  TSTWarrantyPrice: string;
  TypeCode: string;
  GroupCode: string;
  UpdateDateTime: string;
  UpdateBy: string;
  MinOrderQuantity: string;
  Remark: string;
  EngName: string;
  TSTUnit: string;
  TSTUrgentPrice: string;
}

export const use_RptDMSSerDealerNetPricePartApi = (apiBase: AxiosInstance) => {
  return {
    // SearchHQ
    RptDMSSerDealerNetPricePart_Search: async (
      param: Partial<Props>
    ): Promise<ApiResponse<Result>> => {
      return await apiBase.post<
        Partial<Result>,
        ApiResponse<Result>
      >("/RptDMSSerDealerNetPricePart/SearchHQ", {
        ...param,
      });
    },
  };
};
