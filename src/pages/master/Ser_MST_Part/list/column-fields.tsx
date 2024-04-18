import {
  ExcludeSpecialCharactersAllowSpaceType,
  requiredExcludeSpecialCharactersOnlyNumbers,
  requiredType,
} from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { LinkCell } from "@/packages/ui/link-cell";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { ColumnOptions } from "@/types";
import { Ser_MST_Part } from "@/packages/types/master/Ser_MST_Part";
import { Ser_Inv_Stock } from "@/packages/types/master/Ser_Inv_Stock";
import { StatusButton } from "@/packages/ui/status-button";
import { viewingDataAtom } from "../components/ser-mst-part";

interface GridColumnsProps {
  data?: Ser_MST_Part[];
  listStockNo?: Ser_Inv_Stock;
}
export const useColumnField = ({ data, listStockNo }: GridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const config = useConfiguration();
  const api = useClientgateApi();
  const { t } = useI18n("Ser_MST_Part");

  const viewRow = (rowIndex: number, data: Ser_MST_Part) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "Idx",
      caption: t("Idx"),
      visible: true,
      columnIndex: 1,
      // groupKey: "INFORMATION_SERMSTPART",
      cellRender: (data: any) => {
        return (
          <p>
            {+(data.component.pageIndex() * data.component.pageSize()) +
              (data.rowIndex + 1)}
          </p>
        );
      },
    },

    {
      dataField: "PartCode",
      caption: t("PartCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      validationRules: [requiredType],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "VieName",
      caption: t("VieName"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [
        requiredType,
        // ExcludeSpecialCharactersAllowSpaceType as any,
      ],
    },
    {
      dataField: "EngName",
      caption: t("EngName"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      validationRules: [requiredType],
      visible: true,
    },
    {
      dataField: "PartTypeID",
      caption: t("PartTypeID"),
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "PartGroupID",
      caption: t("PartGroupID"),
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Unit",
      caption: t("Unit"),
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Cost",
      caption: t("Cost"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "Price",
      caption: t("Price"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "VAT",
      caption: t("VAT"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "GiaBanNiemYetTuHangGanNhat",
      caption: t("GiaBanNiemYetTuHangGanNhat"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 3,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },
    {
      dataField: "GiaBanNiemYetTuHangHienTai",
      caption: t("GiaBanNiemYetTuHangHienTai"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 3,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },
    {
      dataField: "Location",
      caption: t("Location"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },
    {
      dataField: "Model",
      caption: t("Model"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },
    {
      dataField: "FreqUsed",
      caption: t("FreqUsed"),
      // editorType: "dxSwitch",
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
      width: 100,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagWarranty === "1"} />;
      },
    },
    {
      dataField: "Note",
      caption: t("Note"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 3,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },
    {
      dataField: "FlagInTST",
      caption: t("FlagInTST"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 3,
      groupKey: "INFORMATION_SERMSTPART",
      visible: true,
    },
  ];
  return columns;
};
