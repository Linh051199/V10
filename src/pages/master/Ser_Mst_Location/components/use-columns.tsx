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
import { viewingDataAtom } from "./ser-mst-location";
import { Ser_Mst_Location } from "@/packages/types/master/Ser_Mst_Location";
import { Ser_Inv_Stock } from "@/packages/types/master/Ser_Inv_Stock";

interface GridColumnsProps {
  data: Ser_Mst_Location[];
  listStockNo: Ser_Inv_Stock;
}
export const useColumn = ({ data, listStockNo }: GridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const config = useConfiguration();
  const api = useClientgateApi();
  const { t } = useI18n("Ser_Mst_Location");

  const viewRow = (rowIndex: number, data: Ser_Mst_Location) => {
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
      // groupKey: "INFORMATION_SERMSTLOCATION",
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
      dataField: "LocationCode",
      caption: t("LocationCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTLOCATION",
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
      dataField: "LocationName",
      caption: t("LocationName"),
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTLOCATION",
      visible: true,
      validationRules: [
        requiredType,
        // ExcludeSpecialCharactersAllowSpaceType as any,
      ],
    },

    {
      dataField: "LocationType",
      caption: t("LocationType"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTLOCATION",
      visible: true,
      validationRules: [requiredExcludeSpecialCharactersOnlyNumbers as any],
    },
    {
      dataField: "LocationHight",
      caption: t("LocationHight"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTLOCATION",
      visible: true,
      validationRules: [requiredExcludeSpecialCharactersOnlyNumbers as any],
    },

    {
      dataField: "LocationSurface",
      caption: t("LocationSurface"),
      editorType: "dxNumberBox",
      editorOptions: {
        min: 0,
        format: ",##0.###",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTLOCATION",
      visible: true,
      validationRules: [requiredExcludeSpecialCharactersOnlyNumbers as any],
    },

    {
      dataField: "StockNo",
      caption: t("StockNo"),
      editorType: "dxSelectBox",

      editorOptions: {
        dropDownOptions: { resizeEnabled: true },
        searchEnabled: true,
        dataSource: listStockNo ?? [],
        displayExpr: (e: any) => {
          return e?.StockNo ? `${e?.StockNo} - ${e?.StockName}` : "";
        },
        valueExpr: "StockNo",
        validationMessageMode: "always",
      },
      validationRules: [requiredType],
      columnIndex: 2,
      groupKey: "INFORMATION_SERMSTLOCATION",
      visible: true,
    },
  ];

  return columns;
};
