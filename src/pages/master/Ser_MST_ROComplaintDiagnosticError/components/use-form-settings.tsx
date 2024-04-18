import { useI18n } from "@/i18n/useI18n";
import { zip } from "@/packages/common";
import { Mst_Dealer } from "@/packages/types";
import { Ser_MST_Service } from "@/packages/types/master/Ser_MST_Service";
// import { ColumnOptions } from "@/packages/ui/base-gridview";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
}

export const useFormSettings = ({
  columns: inputColumns,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Ser_MST_ROComplaintDiagnosticError");
  const columns = inputColumns.map((c) => {
    if (c.dataField === "ErrorCode") {
      return {
        ...c,
        visible: true,
      };
    } else {
      return {
        ...c,
        visible: true,
      };
    }
  });

  const firstCol = columns.filter(
    (c) => c.groupKey === "INFORMATION_SERMSTSERVICE" && c.columnIndex === 1
  );
  const secondCol = columns.filter(
    (c) => c.groupKey === "INFORMATION_SERMSTSERVICE" && c.columnIndex === 2
  );

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "left",
    items: [
      {
        itemType: "group",
        disableCollapsible: true,
        caption: t("Information"),
        colCount: 2,
        cssClass: "collapsible form-group form-update-popup-gap",
        items: zip(firstCol, secondCol),
      },
    ],
  };
  return formSettings;
};
