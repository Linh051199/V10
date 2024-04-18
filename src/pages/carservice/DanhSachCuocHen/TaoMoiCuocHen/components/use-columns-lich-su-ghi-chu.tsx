import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@packages/ui/base-gridview";

interface UseColumnsProps {}

export const useColumnsLichSuGhiChu = () => {
  const { t } = useI18n("HTCTaoMoiChienDich-LichSuGhiChu");

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
      dataField: "NguoiTao",
      caption: t("NguoiTao"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "NgayGui",
      caption: t("NgayGui"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TrangThai",
      caption: t("TrangThai"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "GhiChu",
      caption: t("GhiChu"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  // return array of the first item only

  return columns;
};
