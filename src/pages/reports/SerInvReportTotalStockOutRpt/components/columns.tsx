import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerInvReportTotalStockOutRpt");
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
        dataField: "StockOutNo",
        visible: true,
        caption: t("StockOutNo"),
      },
      {
        dataField: "StockOutTime",
        visible: true,
        caption: t("StockOutTime"),
      },
      {
        dataField: "Note",
        visible: true,
        caption: t("Note"),
      },
      {
        dataField: "StockOutType",
        visible: true,
        caption: t("StockOutType"),
      },
      {
        dataField: "Amount",
        visible: true,
        caption: t("Amount"),
      },
    ];
  }, []);

  return columns;
};
