import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { LinkCell } from "@/packages/ui/link-cell";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { nanoid } from "nanoid";

interface UseColumnsProps {
  isDisabled?: boolean;
}

export const useColumns = () => {
  const { t } = useI18n("XemXetBaoCaoBaoHanh");

  const navigate = useNetworkNavigate();

  const handleNavigateDetail = (code: string) => {
    navigate(`/service/DuyetBaoCaoBaoHanh/${code}`);
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      cellRender: ({ rowIndex }: any) => {
        return rowIndex + 1;
      },
    },
    {
      dataField: "MaDaiLy",
      caption: t("MaDaiLy"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TenDaiLy",
      caption: t("TenDaiLy"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SoBCBH",
      caption: t("SoBCBH"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => handleNavigateDetail(data.MaChienDich)}
            value={value}
          />
        );
      },
    },
    {
      dataField: "LoaiBCBH",
      caption: t("LoaiBCBH"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 200,
    },
    {
      dataField: "ChiTietLoaiBCBH",
      caption: t("ChiTietLoaiBCBH"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SoKhung",
      caption: t("SoKhung"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "BienSo",
      caption: t("BienSo"),
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
      dataField: "NoiDungCV",
      caption: t("NoiDungCV"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "NgayCTBH",
      caption: t("NgayCTBH"),
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
      dataField: "TongTien",
      caption: t("TongTien"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Km",
      caption: t("Km"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SoBCBH_HTC",
      caption: t("SoBCBH_HTC"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SoBCBH_HMC",
      caption: t("SoBCBH_HMC"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TrangThaiGuiHMC",
      caption: t("TrangThaiGuiHMC"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];

  return columns;
};
