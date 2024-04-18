import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerInventoryReportInOutBalance");
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
        dataField: "PartID",
        visible: true,
        caption: t("PartID"),
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
        dataField: "SLC",
        visible: true,
        caption: t("SLC"),
      },
      {
        dataField: "TGC",
        visible: true,
        caption: t("TGC"),
      },
      // {
      //   dataField: "LocationID",
      //   visible: true,
      //   caption: t("LocationID"),
      // },
      {
        dataField: "Location",
        visible: true,
        caption: t("Location"),
      },
    ];
  }, []);

  return columns;
};
