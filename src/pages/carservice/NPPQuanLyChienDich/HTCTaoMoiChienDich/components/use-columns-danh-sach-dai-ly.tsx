import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@packages/ui/base-gridview";

interface UseColumnsProps {}

export const useColumnsDanhSachDaiLy = () => {
  const { t } = useI18n("HTCTaoMoiChienDich-DanhSachDaiLy");

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      cellRender: ({ rowIndex }: any) => {
        return rowIndex + 1;
      },
      width: 100,
    },
    {
      dataField: "MaDaiLy",
      caption: t("MaDaiLy"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 150,
    },
    {
      dataField: "TenDaiLy",
      caption: t("TenDaiLy"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 250,
    },
  ];
  // return array of the first item only

  return columns;
};
