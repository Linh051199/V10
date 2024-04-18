import { requiredType } from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { LinkCell } from "@/packages/ui/link-cell";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { ColumnOptions } from "@/types";
import { Ser_MST_PartGroup } from "@/packages/types/master/Ser_MST_PartGroup";
import { viewingDataAtom } from "./ser-mst-partgroup";

interface GridColumnsProps {
  data: Ser_MST_PartGroup[];
  listParentID: any;
}
export const useColumn = ({ data, listParentID }: GridColumnsProps) => {
  const setViewingItem = useSetAtom(viewingDataAtom);
  const config = useConfiguration();
  const api = useClientgateApi();
  const { t } = useI18n("Ser_MST_PartGroup");

  const viewRow = (rowIndex: number, data: Ser_MST_PartGroup) => {
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
      // groupKey: "INFORMATION_SERMSTPARTGROUP",
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
      dataField: "ParentID",
      caption: t("ParentID"),
      editorType: "dxSelectBox",
      alignment: "left",
      editorOptions: {
        dropDownOptions: { resizeEnabled: true },
        searchEnabled: true,
        dataSource: listParentID ?? [],
        displayExpr: "GroupName",
        valueExpr: "ParentID",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },

      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPARTGROUP",
      visible: true,

      cellRender: (data: any) => {
        const renderValue = listParentID.filter((item: any) => {
          return item.ParentID === data.data.ParentID;
        });
        return <p>{renderValue[0].GroupName}</p>;
      },
    },
    {
      dataField: "GroupCode",
      caption: t("GroupCode"),
      editorType: "dxTextBox",
      visible: true,
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPARTGROUP",
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
      dataField: "GroupName",
      caption: t("GroupName"),
      editorType: "dxTextBox",
      editorOptions: {
        validationMessageMode: "always",
      },
      columnIndex: 1,
      groupKey: "INFORMATION_SERMSTPARTGROUP",
      visible: true,
      validationRules: [requiredType],
    },
  ];

  return columns;
};
