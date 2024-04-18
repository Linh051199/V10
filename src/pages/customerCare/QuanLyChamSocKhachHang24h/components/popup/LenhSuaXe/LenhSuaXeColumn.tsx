import { useI18n } from "@/i18n/useI18n";
import React from "react";

export const useLenhSuaXeColumnGridFirst = () => {
  const { t } = useI18n("LenhSuaXeColumn");
  const arr = [
    "STT",
    "MaCV",
    "TenCV",
    "NguyenNhan",
    "KetQua",
    "KyThuatVien",
    "ToKyThuat",
    "PhatSinh",
    "TinhTrangOK",
    "GhiChu",
  ].map((i) => {
    if (i === "STT") {
      return {
        dataField: "STT",
        caption: "",
        visible: true,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
        cellRender: ({ rowIndex }: any) => {
          return rowIndex + 1;
        },
        width: 100,
      };
    }

    return {
      dataField: i,
      caption: t(i),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    };
  });
  return arr;
};

export const useLenhSuaXeColumnGridSecond = () => {
  const { t } = useI18n("LenhSuaXe");
  const arr = [
    "STT",
    "MaCV",
    "TenCV",
    "NguyenNhan",
    "KetQua",
    "KyThuatVien",
    "ToKyThuat",
    "PhatSinh",
    "TinhTrangOK",
    "GhiChu",
  ].map((i) => {
    if (i === "STT") {
      return {
        dataField: "STT",
        caption: "",
        visible: true,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
        cellRender: ({ rowIndex }: any) => {
          return rowIndex + 1;
        },
        width: 100,
      };
    }

    return {
      dataField: i,
      caption: t(i),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    };
  });
  return arr;
};
