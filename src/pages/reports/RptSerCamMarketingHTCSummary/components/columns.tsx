import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("RptSerCamMarketingHTCSummary");
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
        dataField: "QtyROID",
        visible: true,
        caption: t("QtyROID"),
      },
      {
        dataField: "QtyROIDCamHTC",
        visible: true,
        caption: t("QtyROIDCamHTC"),
      },
      {
        dataField: "QtyROIDNoCamHTC",
        visible: true,
        caption: t("QtyROIDNoCamHTC"),
      },
      {
        dataField: "TotalRevenue",
        visible: true,
        caption: t("TotalRevenue"),
      },
      {
        dataField: "TotalRevenueCamHTC",
        visible: true,
        caption: t("TotalRevenueCamHTC"),
      },
      {
        dataField: "TotalRevenueNoCamHTC",
        visible: true,
        caption: t("TotalRevenueNoCamHTC"),
      },
      {
        dataField: "TotalPartRevenue",
        visible: true,
        caption: t("TotalPartRevenue"),
      },
      {
        dataField: "TotalPartRevenueCamHTC",
        visible: true,
        caption: t("TotalPartRevenueCamHTC"),
      },
      {
        dataField: "TotalPartDauNhotRevenue",
        visible: true,
        caption: t("TotalPartDauNhotRevenue"),
      },
      {
        dataField: "TotalPartDauNhotRevenueCamHTC",
        visible: true,
        caption: t("TotalPartDauNhotRevenueCamHTC"),
      },
      {
        dataField: "TotalQtyPartGift",
        visible: true,
        caption: t("TotalQtyPartGift"),
      },
    ];
  }, []);

  return columns;
};
