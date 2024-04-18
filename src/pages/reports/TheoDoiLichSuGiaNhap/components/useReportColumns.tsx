import { useI18n } from "@/i18n/useI18n";
import { Ser_ReportHistoryCostRecord } from "@/packages/api/clientgate/report/Ser_ReportHistoryCostApi";
import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";

interface UseSer_ReportHistoryCostColumnsProps {
  data: Ser_ReportHistoryCostRecord[];
}

export const useSer_ReportHistoryCostColumns = ({
  data,
}: UseSer_ReportHistoryCostColumnsProps) => {
  const { t } = useI18n("Ser_ReportHistoryCost");
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
      allowResizing: true,
      allowColumnResizing: true,
    },
    {
      dataField: "RefNo",
      caption: t("RefNo"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "RefDate",
      caption: t("RefDate"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "Price",
      caption: t("Price"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "SLN",
      caption: t("SLN"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "TGN",
      caption: t("TGN"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
  ] as ColumnOptions[];
};
