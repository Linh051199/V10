import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { useMemo } from "react";

export const useColumns = () => {
  const { t } = useI18n("RptDMSSerRptDMSClaim");
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
        dataField: "DealerCode",
        visible: true,
        caption: t("DealerCode"),
      },
      {
        dataField: "CusName",
        visible: true,
        caption: t("CusName"),
      },
      {
        dataField: "CusCarPlateNo",
        visible: true,
        caption: t("CusCarPlateNo"),
      },
      {
        dataField: "CusCarFrameNo",
        visible: true,
        caption: t("CusCarFrameNo"),
      },
      {
        dataField: "CusCarModel",
        visible: true,
        caption: t("CusCarModel"),
      },
      {
        dataField: "CusPhoneNo",
        visible: true,
        caption: t("CusPhoneNo"),
      },
      {
        dataField: "ClaimNo",
        visible: true,
        caption: t("ClaimNo"),
      },
      {
        dataField: "ClaimType",
        visible: true,
        caption: t("ClaimType"),
      },
      {
        dataField: "ClaimLevel",
        visible: true,
        caption: t("ClaimLevel"),
      },
      {
        dataField: "ReceiveDate",
        visible: true,
        caption: t("ReceiveDate"),
      },
      {
        dataField: "Rate",
        visible: true,
        caption: t("Rate"),
      },
      {
        dataField: "CusRequest",
        visible: true,
        caption: t("CusRequest"),
      },
    ];
  }, []);

  return columns;
};
