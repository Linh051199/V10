import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
// import { ColumnOptions } from "@/packages/ui/base-gridview";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
}

export const useFormSettings = ({
  columns: inputColumns,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Ser_MST_Model");
  const columns = inputColumns.map((c) => {
    return {
      ...c,
      visible: true,
    };
  });

  const firstCol = columns.filter(
    (c) => c.groupKey === "INFORMATION_SERMSTMODEL" && c.columnIndex === 1
  );

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "top",

    items: [
      {
        itemType: "group",
        disableCollapsible: true,
        caption: t("Information"),
        colCount: 1,
        cssClass: "collapsible form-group",
        items: firstCol,
      },
    ],
  };
  return formSettings;
};
