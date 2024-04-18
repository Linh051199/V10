import { useI18n } from "@/i18n/useI18n";
import { Ser_Campaign_Dealer_RptRecord } from "@/packages/api/clientgate/report/Ser_Campaign_Dealer_RptApi";
import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";


interface UseSer_Campaign_Dealer_RptColumnsProps {
  data: Ser_Campaign_Dealer_RptRecord[];
}

export const useSer_Campaign_Dealer_RptColumns = ({
  data,
}: UseSer_Campaign_Dealer_RptColumnsProps) => {
  const { t } = useI18n("Ser_Campaign_Dealer_Rpt");
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
      dataField: "plateNo",
      caption: t("plateNo"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CusName",
      caption: t("CusName"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CusPhone",
      caption: t("CusPhone"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "RONo",
      caption: t("RONo"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "FrameNo",
      caption: t("FrameNo"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "ActualDeliveryDate",
      caption: t("ActualDeliveryDate"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "KM",
      caption: t("KM"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CusRequest",
      caption: t("CusRequest"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "PartAmount",
      caption: t("PartAmount"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "ServiceAmount",
      caption: t("ServiceAmount"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "SumAmount",
      caption: t("SumAmount"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
  ] as ColumnOptions[];
};
