import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { FormOptions } from "@/types";
import { zip } from "@packages/common";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
}

export const useFormSettings = ({
  columns: inputColumns,
}: // dealerTypeDs,
// provinceDs,
UseFormSettingsProps) => {
  const { t } = useI18n("Ser_Mst_Supplier");
  const columns = inputColumns.map((c) => {
    return {
      ...c,
      visible: true,
    };
  });

  const basicInformationFirstColumn = columns.filter(
    (c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 1
  );
  const basicInformationSecondColumn = columns.filter(
    (c) => c.groupKey === "BASIC_INFORMATION" && c.columnIndex === 2
  );

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "top",
    items: [
      {
        itemType: "group",
        caption: t("BASIC_INFORMATION"),
        colCount: 2,
        cssClass: "collapsible form-group",
        items: zip(basicInformationFirstColumn, basicInformationSecondColumn),
      },
    ],
  };
  return formSettings;
};
