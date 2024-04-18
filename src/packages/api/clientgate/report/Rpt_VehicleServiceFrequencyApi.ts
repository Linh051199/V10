import { ApiResponse, Mst_Dealer, SearchDealerParam } from "@/packages/types";
import { AxiosInstance } from "axios";
export interface Rpt_VehicleServiceFrequencyParam {
  DealerCode: any;
  FromDate: any;
  ToDate: any;
  DateFromTo: any[];
  FlagDataWH: 1 | 0;
}

export interface Rpt_VehicleServiceFrequencyRecord {
  CheckInCount: string;
  DealerCode: string;
  RONo: string;
  CusName: string;
  PlateNo: string;
  FrameNo: string;
  ModelName: string;
  Km: string;
  Creator: string;
  CheckInDate: string;
  ActualDeliveryDate: string;
  CusRequest: string;
  TotalRO: any;
  TotalCar: any;
  AVF: any;
}

interface Rpt_VehicleServiceFrequencyRecordParamData {
  Lst_Rpt_Vehicle_Service_Frequency: Rpt_VehicleServiceFrequencyRecord[];
  Lst_Rpt_Vehicle_Service_FrequencyDtl: Rpt_VehicleServiceFrequencyRecord[];
  Rpt_Vehicle_Service_Frequency: Rpt_VehicleServiceFrequencyRecord;
}
export const useRpt_VehicleServiceFrequencyApi = (apiBase: AxiosInstance) => {
  // apiBase.defaults.headers["DealerCode"] = "HTV";
  return {
    Rpt_VehicleServiceFrequency_SearchHQ: async (
      params: Rpt_VehicleServiceFrequencyParam
    ): Promise<ApiResponse<Rpt_VehicleServiceFrequencyRecordParamData>> => {
      return await apiBase.post<
        Rpt_VehicleServiceFrequencyParam,
        ApiResponse<Rpt_VehicleServiceFrequencyRecordParamData>
      >("/RptVehicleServiceFrequency/SearchHQ", {
        ...params,
      });
    },

    Rpt_VehicleServiceFrequency_SearchDL: async (
      params: Rpt_VehicleServiceFrequencyParam
    ): Promise<ApiResponse<Rpt_VehicleServiceFrequencyRecordParamData>> => {
      return await apiBase.post<
        Rpt_VehicleServiceFrequencyParam,
        ApiResponse<Rpt_VehicleServiceFrequencyRecordParamData>
      >("/RptVehicleServiceFrequency/SearchDL", {
        ...params,
      });
    },

    Rpt_VehicleServiceFrequency_ExportSearchHQ: async (
      params: Rpt_VehicleServiceFrequencyParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_VehicleServiceFrequencyParam,
        ApiResponse<string>
      >("/RptVehicleServiceFrequency/ExportHQ", {
        ...params,
      });
    },

    Rpt_VehicleServiceFrequency_ExportSearchDL: async (
      params: Rpt_VehicleServiceFrequencyParam
    ): Promise<ApiResponse<string>> => {
      return await apiBase.post<
        Rpt_VehicleServiceFrequencyParam,
        ApiResponse<string>
      >("/RptVehicleServiceFrequency/ExportDL", {
        ...params,
      });
    },
  };
};
