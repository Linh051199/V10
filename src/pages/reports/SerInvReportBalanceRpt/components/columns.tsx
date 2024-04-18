import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerInvReportBalanceRpt");
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
        dataField: "SLC",
        visible: true,
        caption: t("SLC"),
      },
      {
        dataField: "TGC",
        visible: true,
        caption: t("TGC"),
      },
      {
        dataField: "Location",
        visible: true,
        caption: t("Location"),
      },
      {
        dataField: "Model",
        visible: true,
        caption: t("Model"),
      },
      {
        dataField: "TypeName",
        visible: true,
        caption: t("TypeName"),
      },
      {
        dataField: "StockInDate",
        visible: true,
        caption: t("StockInDate"),
      },
      {
        dataField: "AgeOfExist",
        visible: true,
        caption: t("AgeOfExist"),
      },
    ];
  }, []);

  return columns;
};
