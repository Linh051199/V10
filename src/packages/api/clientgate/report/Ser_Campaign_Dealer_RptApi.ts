import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Ser_Campaign_Dealer_RptParam {
  DealerCode: string;
  CamID: string;
  FlagDataWH: 1 | 0;
}

export interface Ser_Campaign_Dealer_RptRecord {
  DealerCode: string;
  DealerName: string;
  CompanyName: string;
  CompanyAddress: string;
  SumPartAmount: string;
  ServiceAmount: string;
  CarHyundaiCount: string;
  // SumPartAmount: string;
  SumOilAmount: string;
  // ServiceAmount: string;
  CarOrtherCount: string;
  ROID: string;
  RONo: string;
  CusName: string;
  CusPhone: string;
  plateNo: string;
  FrameNo: string;
  TradeMarkCode: string;
  KM: string;
  CusRequest: string;
  ActualDeliveryDate: string;
  PartAmount: string;
  // ServiceAmount: string;
  SumAmount: string;
}

interface Ser_Campaign_Dealer_RptRecordParamData {
  Lst_Ser_CampaignDealerRpt: Ser_Campaign_Dealer_RptRecord;
  Lst_Rpt_CarSum_Hyundai: Ser_Campaign_Dealer_RptRecord;
  Lst_Rpt_CarSum_Orther: Ser_Campaign_Dealer_RptRecord;
  Lst_Rpt_Campaign_ForDealerSend: Ser_Campaign_Dealer_RptRecord[];
}
export const useSer_Campaign_Dealer_RptApi = (apiBase: AxiosInstance) => {
  apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Ser_Campaign_Dealer_Rpt_SearchHQ: async (
      params: Ser_Campaign_Dealer_RptParam
    ): Promise<ApiResponse<Ser_Campaign_Dealer_RptRecordParamData>> => {
      return await apiBase.post<
        Ser_Campaign_Dealer_RptParam,
        ApiResponse<Ser_Campaign_Dealer_RptRecordParamData>
      >("/SerCampaignDealerRpt/SearchHQ", {
        ...params,
      });
    },

    Ser_Campaign_Dealer_Rpt_SearchDL: async (
      params: Ser_Campaign_Dealer_RptParam
    ): Promise<ApiResponse<Ser_Campaign_Dealer_RptRecordParamData>> => {
      return await apiBase.post<
        Ser_Campaign_Dealer_RptParam,
        ApiResponse<Ser_Campaign_Dealer_RptRecordParamData>
      >("/SerCampaignDealerRpt/SearchDL", {
        ...params,
      });
    },

    Ser_Campaign_Dealer_Rpt_ExportSearchHQ: async (
      params: Ser_Campaign_Dealer_RptParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Ser_Campaign_Dealer_RptParam,
        ApiResponse<string>
      >("/SerCampaignDealerRpt/ExportHQ", {
        ...params,
      });
    },

    Ser_Campaign_Dealer_Rpt_ExportSearchDL: async (
      params: Ser_Campaign_Dealer_RptParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Ser_Campaign_Dealer_RptParam,
        ApiResponse<string>
      >("/SerCampaignDealerRpt/ExportDL", {
        ...params,
      });
    },

    // Rpt_TongHopChienDichKhuyenMai_ExportDetailSearchHQ: async (
    //   params: Rpt_TongHopChienDichKhuyenMaiParam
    // ): Promise<ApiResponse<string>> => {
    //   return await apiBase.post<
    //     Rpt_TongHopChienDichKhuyenMaiParam,
    //     ApiResponse<string>
    //   >("/RptNXTQuyenDoiNo/ExportDetailSearchHQ", {
    //     ...params,
    //   });
    // },
    Mst_Dealer_GetAllActive: async (): Promise<ApiResponse<Mst_Dealer>> => {
      return await apiBase.post<
        Partial<SearchDealerParam>,
        ApiResponse<Mst_Dealer>
      >("/MstDealer/GetAllActive");
    },
    Mst_Model_GetAllActive: async (): Promise<ApiResponse<any>> => {
      return await apiBase.post<
        Partial<SearchDealerParam>,
        ApiResponse<any>
      >("/MstCarModel/GetAllActive");
    },
  };
};
