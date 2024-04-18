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
import { viewingDataAtom } from "./ser-mst-service";
import { Ser_MST_Service } from "@/packages/types/master/Ser_MST_Service";
import { Ser_Inv_Stock } from "@/packages/types/master/Ser_Inv_Stock";
import { StatusButton } from "@/packages/ui/status-button";

interface GridColumnsProps {
  data: Ser_MST_Service[];
}
export const useColumn = ({ data }: GridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const config = useConfiguration();
  const api = useClientgateApi();
  const { t } = useI18n("Ser_MST_Service");

  const viewRow = (rowIndex: number, data: Ser_MST_Service) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      columnIndex: 1,
      alignment: "center",
      // groupKey: "INFORMATION_SERMSTSERVICE",
      cellRender: (data: any) => {
        return (
          <p>{+(data.component.pageIndex() * 100) + (data.rowIndex + 1)}</p>
        );
      },
    },

    {
      dataField: "ErrorCode",
      caption: t("ErrorCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTSERVICE",
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
        readOnly: true
      },
    },
    {
      dataField: "ErrorName",
      caption: t("ErrorName"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
      validationRules: [
        requiredType,
        // ExcludeSpecialCharactersAllowSpaceType as any,
      ],
      cellRender: ({ data }: any) => {
        // console.log(85, data)
        return <span>{data.ErrorName}</span>
      }
    },
    {
      dataField: "ErrorTypeCode",
      caption: t("ErrorTypeCode"),
      editorOptions: {
        readOnly: true
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTSERVICE",
      validationRules: [requiredType],
      visible: true,
      cellRender: (...params) => {
        switch (params[0].displayValue) {
          case "CD":
            return <span>Chẩn đoán</span>
            break;
          case "PN":
            return <span>Phàn nàn</span>
            break;
          default:
            return <span></span>
        }
      },
    },
    {
      dataField: "ErrorDesc",
      caption: t("ErrorDesc"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
    },
    {
      dataField: "FlagActive",
      caption: t("FlagActive"),
      editorType: "dxSwitch",
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
      width: 100,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
    {
      dataField: "Remark",
      caption: t("Remark"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
    },
  ];

  return columns;
};
