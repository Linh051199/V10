import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("ThongKeCongViec");
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
        dataField: "Lenh",
        visible: true,
        caption: t("Lenh"),
      },
      {
        dataField: "BienSoXe",
        visible: true,
        caption: t("BienSoXe"),
      },
      {
        dataField: "NoiDung",
        visible: true,
        caption: t("NoiDung"),
      },
      {
        dataField: "NgayVaoXuong",
        visible: true,
        caption: t("NgayVaoXuong"),
      },
      {
        dataField: "BienSoXe",
        visible: true,
        caption: t("BienSoXe"),
      },
      {
        dataField: "NoiDung",
        visible: true,
        caption: t("NoiDung"),
      },
      {
        dataField: "NgayVaoXuong",
        visible: true,
        caption: t("NgayVaoXuong"),
      },
      {
        dataField: "BienSoXe",
        visible: true,
        caption: t("BienSoXe"),
      },
      {
        dataField: "NoiDung",
        visible: true,
        caption: t("NoiDung"),
      },
      {
        dataField: "NgayVaoXuong",
        visible: true,
        caption: t("NgayVaoXuong"),
      },
      {
        dataField: "NgayVaoXuong",
        visible: true,
        caption: t("NgayVaoXuong"),
      },
    ];
  }, []);

  return columns;
};
