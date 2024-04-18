import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@packages/ui/base-gridview";

interface UseColumnsProps {}

export const useColumnsAnhSoBaoHanh = () => {
  const { t } = useI18n("HTCTaoMoiChienDich-AnhSoBaoHanh");

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 40,
      cellRender: ({ rowIndex }: any) => {
        return rowIndex + 1;
      },
      allowFiltering: false,
      allowSorting: false,
    },
    {
      dataField: "TenAnh",
      caption: t("TenAnh"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 150,
    },
    {
      dataField: "Loai",
      caption: t("Loai"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 120,
    },
    {
      dataField: "LoaiAnh",
      caption: t("LoaiAnh"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 140,
    },
    {
      dataField: "GiaTri",
      caption: t("GiaTri"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  // return array of the first item only

  return columns;
};
