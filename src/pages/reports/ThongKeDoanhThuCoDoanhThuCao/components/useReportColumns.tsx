import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";

interface UseRpt_ThongKePhuTungCoDoanhThuCaoColumnsProps {
  data: any[];
}

export const useRpt_ThongKePhuTungCoDoanhThuCaoColumns = ({
  data,
}: UseRpt_ThongKePhuTungCoDoanhThuCaoColumnsProps) => {
  const { t } = useI18n("Rpt_ThongKePhuTungCoDoanhThuCao");
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
      dataField: "Profit",
      caption: t("Profit"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
  ] as ColumnOptions[];
};
