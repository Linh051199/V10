import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("Ser_InvReportRevenueRpt");
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
        dataField: "RONo",
        visible: true,
        caption: t("RONo"),
      },
      {
        dataField: "CheckIndate",
        visible: true,
        caption: t("CheckIndate"),
      },
      {
        dataField: "PaidCreatedDate",
        visible: true,
        caption: t("PaidCreatedDate"),
        // customizeText: (e: any) => {
        //   if (e.value) {
        //     var timestamp = e.value;

        //     var date = new Date(
        //       timestamp.replace(
        //         /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
        //         "$1-$2-$3T$4:$5:$6"
        //       )
        //     );

        //     var year = date.getFullYear();
        //     var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
        //     var day = String(date.getDate()).padStart(2, "0");

        //     var formattedDate = `${year}-${month}-${day}`;
        //     return formattedDate;
        //   }
        // },
      },
      {
        dataField: "ActualDeliveryDate",
        visible: true,
        caption: t("ActualDeliveryDate"),
        // customizeText: (e: any) => {
        //   if (e.value) {
        //     var timestamp = e.value;

        //     var date = new Date(
        //       timestamp.replace(
        //         /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
        //         "$1-$2-$3T$4:$5:$6"
        //       )
        //     );

        //     var year = date.getFullYear();
        //     var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
        //     var day = String(date.getDate()).padStart(2, "0");

        //     var formattedDate = `${year}-${month}-${day}`;
        //     return formattedDate;
        //   }
        // },
      },
      {
        dataField: "PlateNo",
        visible: true,
        caption: t("PlateNo"),
      },
      {
        dataField: "TradeMarkCode",
        visible: true,
        caption: t("TradeMarkCode"),
      },
      {
        dataField: "CusName",
        visible: true,
        caption: t("CusName"),
      },
      {
        dataField: "PhoneNo",
        visible: true,
        caption: t("PhoneNo"),
      },
      {
        dataField: "Amount",
        visible: true,
        caption: t("Amount"),
      },
      {
        dataField: "AmountVAT",
        visible: true,
        caption: t("AmountVAT"),
      },
      {
        dataField: "SumAmount",
        visible: true,
        caption: t("SumAmount"),
      },
      {
        dataField: "DebitAmount",
        visible: true,
        caption: t("DebitAmount"),
      },
      {
        dataField: "RevenueCash",
        visible: true,
        caption: t("RevenueCash"),
      },
      {
        dataField: "InsAmount",
        visible: true,
        caption: t("InsAmount"),
      },
    ];
  }, []);

  return columns;
};
