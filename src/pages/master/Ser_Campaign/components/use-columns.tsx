import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate } from "@/packages/hooks";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { LinkCell } from "@packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";

interface UseColumnsProps {
  showPopup: (value: any) => void;
}

export const useColumns = ({ showPopup }: UseColumnsProps) => {
  const { t } = useI18n("Ser_Campaign");

  const navigate = useNetworkNavigate();

  const setViewingItem = useSetAtom(viewingDataAtom);
  const handleDetail = (data) => {
    navigate(`/admin/Ser_Campaign/edit/${data.CamID}`);
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "CamNo",
      caption: t("CamNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => handleDetail(data)}
            value={value}
          />
        );
      },
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "CamName",
      caption: t("CamName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "StartDate",
      caption: t("StartDate"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "FinishedDate",
      caption: t("FinishedDate"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Note",
      caption: t("Note"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];

  return columns;
};
