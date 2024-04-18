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
import { Ser_MST_CustomerType } from "@/packages/types/master/Ser_MST_CustomerType";
import { viewingDataAtom } from "./ser-mst-customertype";

interface GridColumnsProps {
  data: Ser_MST_CustomerType[];
  listCusPersonType: any;
}
export const useColumn = ({ data, listCusPersonType }: GridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const config = useConfiguration();
  const api = useClientgateApi();
  const { t } = useI18n("Ser_MST_CustomerType");

  const viewRow = (rowIndex: number, data: Ser_MST_CustomerType) => {
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
      // groupKey: "INFORMATION_SERMSTCUSTOMERTYPE",
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
      dataField: "CusTypeName",
      caption: t("CusTypeName"),
      editorType: "dxTextBox",
      visible: true,
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTCUSTOMERTYPE",
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
      dataField: "CusFactor",
      caption: t("CusFactor"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTCUSTOMERTYPE",
      visible: true,
    },
    {
      dataField: "CusPersonType",
      caption: t("CusPersonType"),
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        dataSource: listCusPersonType ?? [],
        displayExpr: "text",
        valueExpr: "value",
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTCUSTOMERTYPE",
      visible: true,
      validationRules: [requiredType],
      cellRender: ({ data, rowIndex, value }: any) => {
        let name;
        switch (data.CusPersonType) {
          case "1":
            name = "Cá nhân";
            break;
          case "2":
            name = "Tổ chức";
            break;
          default:
            name = "Khác";
            break;
        }
        return <p>{name}</p>;
      },
    },
  ];

  return columns;
};
