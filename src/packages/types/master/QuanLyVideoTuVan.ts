import { SearchParam } from "../clientgate";

export interface QuanLyVideoTuVan {
  MaVideo: string;
  TenVideo: string;
  Link: string;
  ThuTuHienThi: string;
  TrangThai: string;
  AnhDaiDien: string;
}

export interface Search_QuanLyVideoTuVan_Param extends SearchParam {
  FilePathVideoName: string;
  FilePathVideoCode: string;
}
