export interface ReportROByDate {
  RONO: string; //Lenh
  PLATENO: string; //BienSoXe
  CUSREQUEST: string; //NoiDung
  CHECKINDATE: string; //NgayVaoXuong
  ASSISTANT: string; //NguoiLap
  KM: string; //KM
  SOPHIEUTHANHTOAN: string; //SoPhieuTT
  STATUSNAME: string; //TrangThai
  REVENUE: string; //GiaTri
  TRADEMARKNAMEMODEL: string; //Model
  SCAR_WARRANTYREGISTRATIONDATE: string; //NgayDangKyBaoHanh
  lst_ReportROByDate: any;
}

export interface Search_ReportROByDate_Params {
  DealerCode: string;
  FromDate: string;
  ToDate: string;
  IsChoSua: any;
  IsDangSua: any;
  IsSuaXong: any;
  IsEnd: any;
  IsThanhToanXong: any;
  IsDaGiaoXe: any;
  IsROReject: any;
  IsKhongDung: any;
  FlagDataWH: any;

  FromDateFromTo: any;
}
