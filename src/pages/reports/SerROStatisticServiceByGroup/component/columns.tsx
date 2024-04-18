import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useConvertNumber } from "@/packages/common";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerROStatisticServiceByGroup");
  const { convertMoneyVND, convertPercent } = useConvertNumber();

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
        dataField: "PlateNo",
        visible: true,
        caption: t("PlateNo"),
      },
      {
        dataField: "SerName",
        visible: true,
        caption: t("SerName"),
      },
      {
        dataField: "CheckInDate",
        visible: true,
        caption: t("CheckInDate"),
      },
      {
        dataField: "GroupRName",
        visible: true,
        caption: t("GroupRName"),
      },
      {
        dataField: "Amount",
        visible: true,
        caption: t("Amount"),
        customizeText: (e: any) => {
          if (e.value) {
            return convertMoneyVND(e?.value);
          }
        },
      },
      {
        dataField: "StatusName",
        visible: true,
        caption: t("StatusName"),
      },
    ];
  }, []);

  return columns;
};
