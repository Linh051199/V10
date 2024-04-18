import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("Ser_InvReportCardStockRpt");
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
        dataField: "RefNo",
        visible: true,
        caption: t("RefNo"),
      },
      {
        dataField: "RefDate",
        visible: true,
        caption: t("RefDate"),
      },
      {
        dataField: "Remark",
        visible: true,
        caption: t("Remark"),
      },
      {
        dataField: "SLD",
        visible: true,
        caption: t("SLD"),
      },
      {
        dataField: "TGD",
        visible: true,
        caption: t("TGD"),
      },
      {
        dataField: "SLN",
        visible: true,
        caption: t("SLN"),
      },
      {
        dataField: "TGN",
        visible: true,
        caption: t("TGN"),
      },
      {
        dataField: "SLX",
        visible: true,
        caption: t("SLX"),
      },
      {
        dataField: "TGX",
        visible: true,
        caption: t("TGX"),
      },
      {
        dataField: "LocationName",
        visible: true,
        caption: t("LocationName"),
      },
      {
        dataField: "Price",
        visible: true,
        caption: t("Price"),
      },
      {
        dataField: "RoNo",
        visible: true,
        caption: t("RoNo"),
      },
      {
        dataField: "PlateNo",
        visible: true,
        caption: t("PlateNo"),
      },
    ];
  }, []);

  return columns;
};
