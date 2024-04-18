import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerCountCustomerOnlyHTC");
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
        dataField: "CusID",
        visible: true,
        caption: t("CusID"),
      },
      {
        dataField: "CusName",
        visible: true,
        caption: t("CusName"),
      },
      {
        dataField: "Address",
        visible: true,
        caption: t("Address"),
      },
      {
        dataField: "Phone",
        visible: true,
        caption: t("Phone"),
      },
      {
        dataField: "PlateNo",
        visible: true,
        caption: t("PlateNo"),
      },
      {
        dataField: "RONO",
        visible: true,
        caption: t("RONO"),
      },
      {
        dataField: "TradeMarkName",
        visible: true,
        caption: t("TradeMarkName"),
      },
      {
        dataField: "FrameNo",
        visible: true,
        caption: t("FrameNo"),
      },
      {
        dataField: "CheckInDate",
        visible: true,
        caption: t("CheckInDate"),
      },
      {
        dataField: "CusRequest",
        visible: true,
        caption: t("CusRequest"),
      },
    ];
  }, []);

  return columns;
};
