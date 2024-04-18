import { useI18n } from "@/i18n/useI18n";

import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";

interface UseRpt_ThongKePhuTungLuanChuyenNhanhColumnsProps {
  data: any[];
}

export const useRpt_ThongKePhuTungLuanChuyenNhanhColumns = ({
  data,
}: UseRpt_ThongKePhuTungLuanChuyenNhanhColumnsProps) => {
  const { t } = useI18n("Rpt_ThongKePhuTungLuanChuyenNhanh");
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
      dataField: "Partcode",
      caption: t("Partcode"),
      visible: true,
    },
    {
      dataField: "VieName",
      caption: t("VieName"),
      visible: true,
    },
    {
      dataField: "Unit",
      caption: t("Unit"),
      visible: true,
    },
    {
      dataField: "OutQuantity",
      caption: t("OutQuantity"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "Inquantity",
      caption: t("Inquantity"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "SoLanXuat",
      caption: t("SoLanXuat"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "SoLanNhap",
      caption: t("SoLanNhap"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
  ] as ColumnOptions[];
};
