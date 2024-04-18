import { ColumnOptions } from "@/types";
import React from "react";

const ColumnGrid = () => {
  const fields: ColumnOptions[] = [
    "STT",
    "SoPhieuNhap",
    "ThoiGianNhap",
    "KhoNhap",
    "NhaCungCap",
    "TongTien",
    "TrangThai",
    "NoiDungNhap",
    "ThoiGianTao",
    "LoaiPhieuNhap",
    "NguoiGiaoHang",
    "RefNo",
    "RefType",
    "CoFlagQR",
    "SoHopDong",
    "SoContainer",
    "BienSoXe",
    "SoHoaDonNhap",
    "NgayHoaDonNhap",
  ].map((item: string): ColumnOptions => {
    let column = {
      dataField: item,
      caption: item,
      visible: false,
      width: 200,
      allowSorting: true,
      allowFiltering: true,
    };

    if (
      ["STT", "SoPhieuNhap", "KhoNhap", "NhaCungCap", "TrangThai"].includes(
        item
      )
    ) {
      return {
        ...column,
        visible: true,
      };
    }

    if (item === "STT") {
      column = {
        ...column,
        cellRender: ({ rowIndex }) => {
          return rowIndex + 1;
        },
      };
    }

    return column;
  });

  return fields;
};

export default ColumnGrid;
