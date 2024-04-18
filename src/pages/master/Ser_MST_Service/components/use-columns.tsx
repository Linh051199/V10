import {
  ExcludeSpecialCharactersAllowSpaceType,
  ExcludeSpecialCharactersType,
  ExcludeSpecialCharactersTypeAllowDash,
  RequiredOnlyPositiveInteger,
  RequiredOnlyPositiveNumber,
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
import { useConvertNumber } from "@/packages/common";
import config from "devextreme/core/config";
interface GridColumnsProps {
  data: Ser_MST_Service[];
}
import { formatMessage, loadMessages, locale } from "devextreme/localization";
enum ENUM_SERMSTSERVICE {
  COST_PER_STDMANHOUR = 90000,
}

export const useColumn = ({ data }: GridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  // const config = useConfiguration();
  const api = useClientgateApi();
  const { t } = useI18n("Ser_MST_Service");
  const { convertMoneyVND, convertPercent } = useConvertNumber();
  const viewRow = (rowIndex: number, data: Ser_MST_Service) => {
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
      // groupKey: "INFORMATION_SERMSTSERVICE",
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
      dataField: "SerCode",
      caption: t("SerCode"),
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
      validationRules: [
        requiredType,
        ExcludeSpecialCharactersTypeAllowDash as any,
      ],
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "SerName",
      caption: t("SerName"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
      validationRules: [requiredType],
    },
    {
      dataField: "StdManHour",
      caption: t("StdManHour"),
      editorOptions: {
        min: 0,
        enable: false,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTSERVICE",
      // validationRules: [requiredType],
      visible: true,
      validationRules: [requiredType, RequiredOnlyPositiveNumber as any],
      setCellValue(newData, value, currentRowData) {
        newData.StdManHour = value;

        newData.Cost = value * ENUM_SERMSTSERVICE.COST_PER_STDMANHOUR;
      },
      cellRender: (e) => {
        return convertMoneyVND(e.value);
      },
    },

    {
      dataField: "Cost",
      caption: t("Cost"),
      editorType: "dxNumberBox",

      editorOptions: {
        min: 0,
        enable: false,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },

      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
      cellRender: (e) => {
        return convertMoneyVND(e.value);
      },
    },

    {
      dataField: "FlagWarranty",
      caption: t("FlagWarranty"),
      editorType: "dxSwitch",
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
      width: 100,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagWarranty === "1"} />;
      },
    },

    {
      dataField: "Price",
      caption: t("Price"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: {
          type: "#,##0.##",
          // formatter: (number: number): string => {
          //   return number.toLocaleString("en-US");
          // },
        },
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
      validationRules: [requiredType, RequiredOnlyPositiveInteger as any],
      cellRender: (e) => {
        return convertMoneyVND(e.value);
      },
    },
    {
      dataField: "VAT",
      caption: t("VAT"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        max: 100,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
      validationRules: [requiredType, RequiredOnlyPositiveInteger as any],
      cellRender: (e) => {
        return convertMoneyVND(e.value);
      },
    },

    {
      dataField: "Note",
      caption: t("Note"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
    },
    {
      dataField: "Model",
      caption: t("Model"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      validationRules: [ExcludeSpecialCharactersTypeAllowDash],
      groupKey: "INFORMATION_SERMSTSERVICE",
      visible: true,
    },
  ];

  return columns;
};
