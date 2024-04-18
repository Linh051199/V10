import { useI18n } from "@/i18n/useI18n";

import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";

interface UseRpt_ThongKePhuTungChamTonToiThieuColumnsProps {
  data: any[];
}

export const useRpt_ThongKePhuTungChamTonToiThieuColumns = ({
  data,
}: UseRpt_ThongKePhuTungChamTonToiThieuColumnsProps) => {
  const { t } = useI18n("Rpt_ThongKePhuTungChamTonToiThieu");
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
      dataField: "SLC",
      caption: t("SLC"),
      visible: true,
    },
  ] as ColumnOptions[];
};
