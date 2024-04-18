import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("Ser_InvReportCusDebitRpt");
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
        dataField: "CusName",
        visible: true,
        caption: t("CusName"),
      },
      {
        dataField: "GroupAddress",
        visible: true,
        caption: t("GroupAddress"),
      },
      {
        dataField: "Phone",
        visible: true,
        caption: t("Phone"),
      },
      {
        dataField: "TGD",
        visible: true,
        caption: t("TGD"),
      },
      {
        dataField: "PST",
        visible: true,
        caption: t("PST"),
      },
      {
        dataField: "PSG",
        visible: true,
        caption: t("PSG"),
      },
      {
        dataField: "TGC",
        visible: true,
        caption: t("TGC"),
      },
      {
        dataField: "GroupName",
        visible: true,
        caption: t("GroupName"),
      },
    ];
  }, []);

  return columns;
};
