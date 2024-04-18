export interface Mst_DeliveryLocation {
  DeliveryLocationCode: string;
  DealerCode: string;
  DealerName: string;
  DeliveryLocationName: string;
  FlagActive: string;
}

export interface SearchMst_DeliveryLocationParam {
  DeliveryLocationCode: string;
  DealerCode: string;
  DeliveryLocationName: string;
  FlagActive: string;
  Ft_PageIndex: number;
  Ft_PageSize: number;
}
