import { useI18n } from "@/i18n/useI18n";
import { Ser_InvReportPartTopVariationPriceRecord } from "@/packages/api/clientgate/report/Ser_InvReportPartTopVariationPriceApi";
import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";

interface UseSer_InvReportPartTopVariationPriceColumnsProps {
  data: Ser_InvReportPartTopVariationPriceRecord[];
}

export const useSer_InvReportPartTopVariationPriceColumns = ({
  data,
}: UseSer_InvReportPartTopVariationPriceColumnsProps) => {
  const { t } = useI18n("Ser_InvReportPartTopVariationPrice");
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
      dataField: "partCode",
      caption: t("partCode"),
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
      dataField: "MinPrice",
      caption: t("MinPrice"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "MaxPrice",
      caption: t("MaxPrice"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CountPrice",
      caption: t("CountPrice"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
  ] as ColumnOptions[];
};
