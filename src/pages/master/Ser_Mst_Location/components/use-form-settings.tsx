import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
import { Mst_Dealer } from "@/packages/types";
import { Ser_Mst_Location } from "@/packages/types/master/Ser_Mst_Location";
// import { ColumnOptions } from "@/packages/ui/base-gridview";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
}

export const useFormSettings = ({
  columns: inputColumns,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Ser_Mst_Location");
  const columns = inputColumns.map((c) => {
    if (c.dataField === "BankCode") {
      return {
        ...c,
        visible: true,
        editorOptions: {
          displayExpr: "BankCode",
          valueExpr: "BankCode",
          searchEnabled: true,
          validationMessageMode: "always",
          dataSource: [],
        },
      };
    } else {
      return {
        ...c,
        visible: true,
      };
    }
  });

  const firstCol = columns.filter(
    (c) => c.groupKey === "INFORMATION_SERMSTLOCATION" && c.columnIndex === 1
  );
  const secondCol = columns.filter(
    (c) => c.groupKey === "INFORMATION_SERMSTLOCATION" && c.columnIndex === 2
  );

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "top",
    items: [
      {
        itemType: "group",
        disableCollapsible: true,
        caption: t("Information"),
        colCount: 2,
        cssClass: "collapsible form-group",
        items: zip(firstCol, secondCol),
      },
    ],
  };
  return formSettings;
};
