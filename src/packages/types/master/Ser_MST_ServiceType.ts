export interface Search_Ser_MST_ServiceType {
  TypeID: string;
  TypeName: string;
  DealerCode?: string;
  Ft_PageSize: number;
  Ft_PageIndex: number;
}

export interface Ser_MST_ServiceType {
  TypeID: string;
  DealerCode: string;
  TypeName: string;
  LogLUDateTime: string;
  LogLuBy: string;
  CreatedDate: string;
  CreatedBy: string;
}
