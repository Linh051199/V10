import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@packages/ui/base-gridview";

interface UseColumnsProps {}

export const useColumnsPhanCongPhuTung = () => {
  const { t } = useI18n("HTCTaoMoiChienDich-PhanCongPhuTung");

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 100,
    },
    {
      dataField: "MaPT",
      caption: t("MaPT"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TenPT",
      caption: t("TenPT"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "DVT",
      caption: t("DVT"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SLCan",
      caption: t("SLCan"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TTTruocThue",
      caption: t("TTTruocThue"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ThanTien",
      caption: t("ThanTien"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Thue",
      caption: t("Thue"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "LoaiPhuTung",
      caption: t("LoaiPhuTung"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "LoaiDonHang",
      caption: t("LoaiDonHang"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SoDonHang",
      caption: t("SoDonHang"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  // return array of the first item only

  return columns;
};
