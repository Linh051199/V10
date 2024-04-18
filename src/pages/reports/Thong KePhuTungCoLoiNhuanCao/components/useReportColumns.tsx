import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";

interface UseRpt_ThongKePhuTungCoLoiNhuanCaoColumnsProps {
  data: any[];
}

export const useRpt_ThongKePhuTungCoLoiNhuanCaoColumns = ({
  data,
}: UseRpt_ThongKePhuTungCoLoiNhuanCaoColumnsProps) => {
  const { t } = useI18n("Rpt_ThongKePhuTungCoLoiNhuanCao");
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
      dataField: "Profit",
      caption: t("Profit"),
      visible: true,
    },
  ] as ColumnOptions[];
};
