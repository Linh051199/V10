import { useI18n } from "@/i18n/useI18n";
import { zip, zip3cols } from "@/packages/common";
import { requiredType } from "@/packages/common/Validation_Rules";
import { Mst_Dealer } from "@/packages/types";
import { Ser_MST_Part } from "@/packages/types/master/Ser_MST_Part";
// import { ColumnOptions } from "@/packages/ui/base-gridview";
import { ColumnOptions, FormOptions } from "@/types";

interface UseFormSettingsProps {
  columns: ColumnOptions[];
}

export const useFormSettings = ({
  columns: inputColumns,
}: UseFormSettingsProps) => {
  const { t } = useI18n("Ser_MST_Part");
  const columns = [
    ...inputColumns.map((c) => {
      return {
        ...c,
        visible: true,
      };
    }),
  ];

  // let configColumns = [];
  // for (let i = 0; i < columns.length; i++) {
  //   if (columns[i]?.dataField === "Cost") {
  //     configColumns.push({
  //       dataField: "VAT", // VAT
  //       caption: t("VAT"),
  //       editorType: "dxNumberBox",
  //       editorOptions: {
  //         min: 0,
  //         format: ",##0.###",
  //         placeholder: t("Input"),
  //         validationMessageMode: "always",
  //       },
  //       columnIndex: 2,
  //       groupKey: "INFORMATION_SERMSTPART",
  //       visible: true,
  //       validationRules: [requiredType],
  //     });
  //   }
  //   configColumns.push(columns[i]);
  // }
  const firstCol = columns.filter(
    (c: any) => c.groupKey === "INFORMATION_SERMSTPART" && c.columnIndex === 1
  );
  const secondCol = columns.filter(
    (c: any) => c.groupKey === "INFORMATION_SERMSTPART" && c.columnIndex === 2
  );
  const thirstCol = columns.filter(
    (c: any) => c.groupKey === "INFORMATION_SERMSTPART" && c.columnIndex === 3
  );

  const formSettings: FormOptions = {
    colCount: 1,
    labelLocation: "top",
    items: [
      {
        itemType: "group",
        disableCollapsible: true,
        caption: t("Information"),
        colCount: 3,
        cssClass: "collapsible form-group",
        items: zip3cols(firstCol, secondCol, thirstCol),
      },
    ],
  };
  return formSettings;
};
