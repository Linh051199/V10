import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { LinkCell } from "@/packages/ui/link-cell";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { nanoid } from "nanoid";

interface UseColumnsProps {
  isDisabled?: boolean;
}

export const useColumns = ({ isDisabled }: UseColumnsProps) => {
  const { t } = useI18n("NPPQuanLyChienDich");

  const navigate = useNetworkNavigate();

  const handleNavigateDetail = (code: string) => {
    if (isDisabled) {
      navigate(`/service/DaiLyTheoDoiChienDichChiTiet/${code}`);
    } else {
      navigate(`/service/NPPQuanLyChienDich/${code}`);
    }
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
      dataField: "MaChienDich",
      caption: t("MaChienDich"),
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
      dataField: "TenChienDich",
      caption: t("TenChienDich"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "NgayTao",
      caption: t("NgayTao"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "NoiDung",
      caption: t("NoiDung"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      width: 200,
    },
    {
      dataField: "TuNgay",
      caption: t("TuNgay"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "DenNgay",
      caption: t("DenNgay"),
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
      cellRender: ({ data }: any) => {
        return (
          <div className="bg-green-300 text-center p-1 rounded-md">
            {data.TrangThai}
          </div>
        );
      },
    },
  ];

  return columns;
};
