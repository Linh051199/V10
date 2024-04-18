import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("RptDMSSerRptDMSClaim");
  // STT
  // Mã phụ tùng
  // Tên phụ tùng (TA)
  // Tên phụ tùng (TV)
  // Đơn vị tính
  // Ngày cập nhật giá
  // Giá bán trước thuế
  // Giá bảo hành
  // Giá hàng khẩn
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
        dataField: "TSTPartCode", // Mã phụ tùng
        visible: true,
        caption: t("TSTPartCode"),
      },
      {
        dataField: "EngName",
        visible: true,
        caption: t("EngName"),
      },
      {
        dataField: "VieName",
        visible: true,
        caption: t("VieName"),
      },
      {
        dataField: "Unit",
        visible: true,
        caption: t("Unit"),
      },
      {
        dataField: "UpdateDateTime",
        visible: true,
        caption: t("UpdateDateTime"),
      },
      {
        dataField: "TSTPriceBefore",
        visible: true,
        caption: t("TSTPriceBefore"),
      },
      {
        dataField: "TSTWarrantyPrice",
        visible: true,
        caption: t("TSTWarrantyPrice"),
      },
      {
        dataField: "TSTUrgentPrice",
        visible: true,
        caption: t("TSTUrgentPrice"),
      },
    ];
  }, []);

  return columns;
};
