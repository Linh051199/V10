import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerPayment");
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
        dataField: "PayDate",
        visible: true,
        caption: t("PayDate"),
      },
      {
        dataField: "PaymentNo",
        visible: true,
        caption: t("PaymentNo"),
      },
      {
        dataField: "cusname",
        visible: true,
        caption: t("cusname"),
      },
      {
        dataField: "cusphone",
        visible: true,
        caption: t("cusphone"),
      },
      {
        dataField: "PayPersonName",
        visible: true,
        caption: t("PayPersonName"),
      },
      {
        dataField: "InsNo",
        visible: true,
        caption: t("InsNo"),
      },
      {
        dataField: "InsVieName",
        visible: true,
        caption: t("InsVieName"),
      },
      {
        dataField: "InsPhone",
        visible: true,
        caption: t("InsPhone"),
      },
      {
        dataField: "Note",
        visible: true,
        caption: t("Note"),
      },
      {
        dataField: "PaymentAmount",
        visible: true,
        caption: t("PaymentAmount"),
        customizeText: (e: any) => {
          if (e.value) {
            return e.value.toLocaleString();
          }
        },
      },
      {
        dataField: "PaymentTypeText",
        visible: true,
        caption: t("PaymentTypeText"),
      },
    ];
  }, []);

  return columns;
};
