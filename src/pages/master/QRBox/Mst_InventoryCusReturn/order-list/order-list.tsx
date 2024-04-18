import { useI18n } from "@/i18n/useI18n";
import { Link } from "@/packages/components/link/link";
import { useGetTime } from "@/packages/hooks/useGetTime";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { Alignment } from "@/packages/ui/gridview-one/interface";

import { showErrorAtom } from "@packages/store";
import DataGrid from "devextreme-react/data-grid";
import { DataType } from "devextreme/common";
import { useSetAtom } from "jotai";
import { useRef, useState } from "react";

interface OrderListProps {
  onViewDetail: (code: string) => void;
}

export const Dlr_Contract_OrderList = ({ onViewDetail }: OrderListProps) => {
  const { t } = useI18n("Dlr_Contract_OrderList");
  const { convertTimeHHMMSStoDateTime } = useGetTime();

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      visible: true,
      caption: t("STT"),
      width: 100,
      minWidth: 100,
      alignment: "center" as Alignment,
    },
    {
      dataField: "AreaNameDealer",
      visible: true,
      caption: t("AreaNameDealer"),
      dataType: "string" as DataType,
    },
    {
      dataField: "DealerCode",
      visible: true,
      caption: t("DealerCode"),
    },
    {
      dataField: "SalesGroupTypeName",
      visible: true,
      caption: t("SalesGroupTypeName "),
    },
    {
      dataField: "SalesTypeNameVN",
      visible: true,
      caption: t("SalesTypeNameVN"),
    },
    {
      dataField: "FlagBanNgang",
      visible: true,
      caption: t("FlagBanNgang"),
    },
    {
      dataField: "DlrContractNo",
      visible: true,
      caption: t("DlrContractNo"),
      cellRender: (e: any) => {
        return <Link label={e.value} onClick={() => onViewDetail(e.value)} />;
      },
    },
    {
      dataField: "DlrContractNoUser",
      visible: true,
      caption: t("DlrContractNoUser"),
    },
    {
      dataField: "FullName",
      visible: true,
      caption: t("FullName"),
    },
    {
      dataField: "PhoneNo",
      visible: true,
      caption: t("PhoneNo"),
    },
    {
      dataField: "Address",
      visible: true,
      caption: t("Address"),
    },
    {
      dataField: "ProvinceName",
      visible: true,
      caption: t("ProvinceName"),
    },
    {
      dataField: "DistrictName",
      visible: true,
      caption: t("DistrictName"),
    },
    {
      dataField: "IDCardNo",
      visible: true,
      caption: t("IDCardNo"),
    },
    {
      dataField: "IDCardType",
      visible: true,
      caption: t("IDCardType"),
    },
    {
      dataField: "DateOfBirth",
      visible: true,
      caption: t("DateOfBirth"),
      cellRender: (e: any) => {
        return <span>{convertTimeHHMMSStoDateTime(e.value)}</span>;
      },
    },
    {
      dataField: "SMName",
      visible: true,
      caption: t("SMName"),
    },
    {
      dataField: "HTCStaffInCharge",
      visible: true,
      caption: t("HTCStaffInCharge"),
    },
    {
      dataField: "PmtType",
      visible: true,
      caption: t("PmtType"),
    },
    {
      dataField: "CreatedDate",
      visible: true,
      caption: t("CreatedDate"),
    },
    {
      dataField: "TransactorFullName",
      visible: true,
      caption: t("TransactorFullName"),
    },
    {
      dataField: "TransactorAddress",
      visible: true,
      caption: t("TransactorAddress"),
    },
    {
      dataField: "TransactorPhoneNo",
      visible: true,
      caption: t("TransactorPhoneNo"),
    },
    {
      dataField: "TransactorProvinceName",
      visible: true,
      caption: t("TransactorProvinceName"),
    },
    {
      dataField: "TransactorDistrictName",
      visible: true,
      caption: t("TransactorDistrictName"),
    },
    // {
    //   dataField: "TransactorIDCardNo",
    //   visible: true,
    //   caption: t("TransactorIDCardNo"),
    // },
    // {
    //   dataField: "TransactorIDCardType",
    //   visible: true,
    //   caption: t("TransactorIDCardType"),
    // },
    {
      dataField: "LastestFormDateTime",
      visible: true,
      caption: t("LastestFormDateTime"),
    },
    {
      dataField: "BankName",
      visible: true,
      caption: t("BankName"),
    },
  ];

  return {
    columns,
  };
};
