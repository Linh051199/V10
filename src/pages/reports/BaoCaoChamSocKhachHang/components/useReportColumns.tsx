import { useI18n } from "@/i18n/useI18n";
import { Ser_Customer_Care_RptRecord } from "@/packages/api/clientgate/report/Ser_Customer_Care_RptApi";
import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";

interface UseSer_Customer_Care_RptColumnsProps {
  data: Ser_Customer_Care_RptRecord[];
}

export const useSer_Customer_Care_RptColumns = ({
  data,
}: UseSer_Customer_Care_RptColumnsProps) => {
  const { t } = useI18n("Ser_Customer_Care_Rpt");
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
      dataField: "CareType",
      caption: t("CareType"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "Total",
      caption: t("Total"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "IsContact",
      caption: t("IsContact"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "Pending",
      caption: t("Pending"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "IsNotContact",
      caption: t("IsNotContact"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
  ] as ColumnOptions[];
};
