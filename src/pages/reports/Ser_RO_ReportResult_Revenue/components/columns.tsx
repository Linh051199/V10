import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("Ser_RO_ReportResult_Revenue");
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
        dataField: "RONo",
        visible: true,
        caption: t("RONo"),
      },
      {
        dataField: "CheckInDate",
        visible: true,
        caption: t("CheckInDate"),
      },
      {
        dataField: "PaidCreatedDate",
        visible: true,
        caption: t("PaidCreatedDate"),
      },
      {
        dataField: "PlateNo",
        visible: true,
        caption: t("PlateNo"),
      },
      {
        dataField: "CusName",
        visible: true,
        caption: t("CusName"),
      },
      {
        dataField: "SerPrice",
        visible: true,
        caption: t("SerPrice"),
      },
      {
        dataField: "PartOut",
        visible: true,
        caption: t("PartOut"),
      },
      {
        dataField: "PartIn",
        visible: true,
        caption: t("PartIn"),
      },
      {
        dataField: "SumCost",
        visible: true,
        caption: t("SumCost"),
      },
      {
        dataField: "Profit",
        visible: true,
        caption: t("Profit"),
      },
    ];
  }, []);

  return columns;
};
