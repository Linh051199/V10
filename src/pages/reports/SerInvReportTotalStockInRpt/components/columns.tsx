import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerInvReportTotalStockInRpt");
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
        dataField: "StockInNo",
        visible: true,
        caption: t("StockInNo"),
      },
      {
        dataField: "DateIn",
        visible: true,
        caption: t("DateIn"),
      },
      {
        dataField: "Remark",
        visible: true,
        caption: t("Remark"),
      },
      {
        dataField: "SupplierName",
        visible: true,
        caption: t("SupplierName"),
      },
      {
        dataField: "AMOUNT",
        visible: true,
        caption: t("AMOUNT"),
      },
      {
        dataField: "VATAMOUNT",
        visible: true,
        caption: t("VATAMOUNT"),
      },
      {
        dataField: "SUMAMOUNT",
        visible: true,
        caption: t("SUMAMOUNT"),
      },
    ];
  }, []);

  return columns;
};
