import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerInvReportInsuranceDebitRpt");
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
        dataField: "InsVieName",
        visible: true,
        caption: t("InsVieName"),
      },
      {
        dataField: "Address",
        visible: true,
        caption: t("Address"),
      },
      {
        dataField: "TelePhone",
        visible: true,
        caption: t("TelePhone"),
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
    ];
  }, []);

  return columns;
};
