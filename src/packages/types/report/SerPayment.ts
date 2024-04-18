export interface SerPayment {
  PayDate: string; //Ngay
  PaymentNo: string; //SoPhieuThu
  cusname: string; //TenKhachHang
  cusphone: string; //SoDTKhachHang
  PayPersonName: string; //NguoiThanhToan
  InsNo: string; //MaHangBH
  InsVieName: string; //TenHangBH
  InsPhone: string; //SoDTHangBH
  Note: string; //GhiChu
  PaymentAmount: string; //TongSo
  PaymentTypeText: string; //LoaiPT
  lst_SerPayment: any; //lst_SerPayment
}

export interface Search_SerPayment_Params {
  PaymentFromDate: string;
  PaymentDate: string;
  PaymentType: string;
  KhachHang: boolean;
  BaoHiem: boolean;
  FlagDataWH: any;

  PaymentFromDateFromTo: any;
}
