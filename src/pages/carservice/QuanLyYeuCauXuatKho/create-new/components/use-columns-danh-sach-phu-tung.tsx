import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@packages/ui/base-gridview";

interface UseColumnsProps { }

export const useColumnsDanhSachPhuTung = () => {
  const { t } = useI18n("DanhSachPhuTung");

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
      dataField: "MaPhuTung",
      caption: t("MaPhuTung"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TenPhuTung",
      caption: t("TenPhuTung"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "DonViTinh",
      caption: t("DonViTinh"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SoLuong",
      caption: t("SoLuong"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "MoTa",
      caption: t("MoTa"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    }
  ];
  // return array of the first item only

  return columns;
};
