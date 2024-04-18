import { useI18n } from "@/i18n/useI18n";
import { Rpt_SlowRotationPartsRecord } from "@/packages/api/clientgate/report/Rpt_SlowRotationPartsApi";
import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";

interface UseRpt_Rpt_SlowRotationPartsColumnsProps {
  data: Rpt_SlowRotationPartsRecord[];
}

export const useRpt_Rpt_SlowRotationPartsColumns = ({
  data,
}: UseRpt_Rpt_SlowRotationPartsColumnsProps) => {
  const { t } = useI18n("Rpt_Rpt_SlowRotationParts");
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
      dataField: "DealerCode",
      caption: t("DealerCode"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "PartCode",
      caption: t("PartCode"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "VieName",
      caption: t("VieName"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "Unit",
      caption: t("Unit"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "StockInDate",
      caption: t("StockInDate"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "StockOutDate",
      caption: t("StockOutDate"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "TransactionDate",
      caption: t("TransactionDate"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "RotaionTime",
      caption: t("RotaionTime"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
  ] as ColumnOptions[];
};
