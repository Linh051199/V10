export interface Mst_DeliveryForm {
  DeliveryFormCode: string;
  DeliveryFormName: string;
  FlagActive: string;
}

export interface SearchMst_DeliveryFormParam {
  DeliveryFormCode: string;
  DeliveryFormName: string;
  FlagActive: string;
  Ft_PageIndex: number;
  Ft_PageSize: number;
}
