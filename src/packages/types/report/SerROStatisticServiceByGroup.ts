import { SearchParam } from "../clientgate";

export interface SerROStatisticServiceByGroup {
  RONO: string; //Lenh
  PlateNo: string; //BienSoXe
  SerName: string; //CongViec
  CheckInDate: string; //NgayVaoXuong
  GroupRName: string; //ToThucHien
  Amount: string; //TienCong
  StatusName: string; //TrangThai
  lst_Ser_RO_Statistic_Service_ByGroup: any
}

export interface Search_SerROStatisticServiceByGroup_Params
  extends SearchParam {
  FromDate: string;
  ToDate: string;
  IsChoSua: any;
  IsDangSua: any;
  IsSuaXong: any;
  IsEnd: any;
  IsThanhToanXong: any;
  IsDaGiaoXe: any;
  DealerCode: any;
  IsROReject: any;
  IsKhongDung: any;
  FlagDataWH: any;

  FromDateFromTo: any;
}
