import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@packages/ui/base-gridview";

interface UseColumnsProps {}

export const useColumnsDanhSachPhuTung = ({}: UseColumnsProps) => {
  const { t } = useI18n("HTCTaoMoiChienDich-DanhSachPhuTung");

  const columns: ColumnOptions[] = [
    {
      dataField: "MaPhuTung",
      caption: t("MaPhuTung"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 100,
    },
    {
      dataField: "HieuSoGiam",
      caption: t("HieuSoGiam"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  // return array of the first item only

  return columns;
};
