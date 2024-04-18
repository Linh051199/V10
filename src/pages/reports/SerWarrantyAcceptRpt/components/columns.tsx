import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerWarrantyAcceptRpt");
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
        dataField: "DealerCode",
        visible: true,
        caption: t("DealerCode"),
      },
      {
        dataField: "DealerName",
        visible: true,
        caption: t("DealerName"),
      },
      {
        dataField: "RONo",
        visible: true,
        caption: t("RONo"),
      },
      {
        dataField: "FrameNo",
        visible: true,
        caption: t("FrameNo"),
      },
      {
        dataField: "PartIDError",
        visible: true,
        caption: t("PartIDError"),
      },
      {
        dataField: "PartName",
        visible: true,
        caption: t("PartName"),
      },
      {
        dataField: "MA",
        visible: true,
        caption: t("MA"),
      },
      {
        dataField: "Ten",
        visible: true,
        caption: t("Ten"),
      },
      {
        dataField: "PartPrice",
        visible: true,
        caption: t("PartPrice"),
      },
      {
        dataField: "ServicePrice",
        visible: true,
        caption: t("ServicePrice"),
      },
      {
        dataField: "TongTien",
        visible: true,
        caption: t("TongTien"),
      },
      {
        dataField: "WarrantyRegistrationDate",
        visible: true,
        caption: t("WarrantyRegistrationDate"),
      },
      {
        dataField: "HTCROWNo",
        visible: true,
        caption: t("HTCROWNo"),
      },
    ];
  }, []);

  return columns;
};
