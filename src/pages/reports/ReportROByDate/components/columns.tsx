import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("ReportROByDate");
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
        dataField: "RONO",
        visible: true,
        caption: t("RONO"),
      },
      {
        dataField: "PLATENO",
        visible: true,
        caption: t("PLATENO"),
      },
      {
        dataField: "CUSREQUEST",
        visible: true,
        caption: t("CUSREQUEST"),
      },
      {
        dataField: "CHECKINDATE",
        visible: true,
        caption: t("CHECKINDATE"),
      },
      {
        dataField: "ASSISTANT",
        visible: true,
        caption: t("ASSISTANT"),
      },
      {
        dataField: "KM",
        visible: true,
        caption: t("KM"),
      },
      {
        dataField: "SOPHIEUTHANHTOAN",
        visible: true,
        caption: t("SOPHIEUTHANHTOAN"),
      },
      {
        dataField: "STATUSNAME",
        visible: true,
        caption: t("STATUSNAME"),
      },
      {
        dataField: "REVENUE",
        visible: true,
        caption: t("REVENUE"),
      },
      {
        dataField: "TRADEMARKNAMEMODEL",
        visible: true,
        caption: t("TRADEMARKNAMEMODEL"),
      },
      {
        dataField: "SCAR_WARRANTYREGISTRATIONDATE",
        visible: true,
        caption: t("SCAR_WARRANTYREGISTRATIONDATE"),
      },
    ];
  }, []);

  return columns;
};
