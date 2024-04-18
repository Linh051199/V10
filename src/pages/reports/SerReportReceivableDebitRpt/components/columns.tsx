import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerReportReceivableDebitRpt");
  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        caption: t("STT"),
        dataField: "STT",
        cellRender: ({ rowIndex }) => {
          return <span>{rowIndex + 1}</span>;
        },
        visible: true,
        alignment: "center",
        allowSorting: false,
        allowFiltering: false,
      },
      {
        dataField: "ItemName",
        visible: true,
        caption: t("ItemName"),
      },
      {
        dataField: "Address",
        visible: true,
        caption: t("Address"),
      },
      {
        dataField: "Phone",
        visible: true,
        caption: t("Phone"),
      },
      {
        dataField: "Remark",
        visible: true,
        caption: t("Remark"),
      },
      {
        dataField: "DebitAmount",
        visible: true,
        caption: t("DebitAmount"),
      },
    ];
  }, []);

  return columns;
};
