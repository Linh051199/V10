import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerInvReportTotalStockInDetailRptHTV");
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
        dataField: "PartCode",
        visible: true,
        caption: t("PartCode"),
      },
      {
        dataField: "VieName",
        visible: true,
        caption: t("VieName"),
      },
      {
        dataField: "Unit",
        visible: true,
        caption: t("Unit"),
      },
      {
        dataField: "Quantity",
        visible: true,
        caption: t("Quantity"),
        customizeText: (e: any) => {
          if (e.value) {
            return e.value.toLocaleString();
          }
        },
      },
      {
        dataField: "Price",
        visible: true,
        caption: t("Price"),
        customizeText: (e: any) => {
          if (e.value) {
            return e.value.toLocaleString();
          }
        },
      },
      {
        dataField: "VAT",
        visible: true,
        caption: t("VAT"),
      },
      {
        dataField: "Amount",
        visible: true,
        caption: t("Amount"),
        customizeText: (e: any) => {
          if (e.value) {
            return e.value.toLocaleString();
          }
        },
      },
    ];
  }, []);

  return columns;
};
