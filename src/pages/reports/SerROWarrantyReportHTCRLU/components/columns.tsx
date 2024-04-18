import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("SerROWarrantyReportHTCRLU");
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
        dataField: "ROWNo",
        visible: true,
        caption: t("ROWNo"),
      },
      {
        dataField: "HTCROWNo",
        visible: true,
        caption: t("HTCROWNo"),
      },
      {
        dataField: "FrameNo",
        visible: true,
        caption: t("FrameNo"),
      },
      {
        dataField: "PlateNo",
        visible: true,
        caption: t("PlateNo"),
      },
      {
        dataField: "WarrantyRegistrationDate",
        visible: true,
        caption: t("WarrantyRegistrationDate"),
      },
      {
        dataField: "CusRequest",
        visible: true,
        caption: t("CusRequest"),
      },
      {
        dataField: "WarrantyStatus",
        visible: true,
        caption: t("WarrantyStatus"),
      },
      {
        dataField: "TotalAmount",
        visible: true,
        caption: t("TotalAmount"),
      },
      {
        dataField: "Km",
        visible: true,
        caption: t("Km"),
      },
    ];
  }, []);

  return columns;
};
