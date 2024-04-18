export interface BaoCaoKinhDoanh {
  SoBaoGia: string;
  NgayVaoXuong: string;
  NgayThanhToan: string;
  BienSoXe: string;
  KhachHang: string;
  TGDV: string;
  PTXuat: string;
  PTNhap: string;
  ChiPhi: string;
  LoiNhuan: string;
}

export interface Search_BaoCaoKinhDoanh_Params {
  NgayVaoXuongFrom: string;
  NgayVaoXuongTo: string;
  NgayThanhToanFrom: string;
  NgayThanhToanTo: string;

  NgayThanhToanFromTo: any;
  NgayVaoXuongFromTo: any;
}
