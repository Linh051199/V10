import { useI18n } from "@/i18n/useI18n";
import { ColumnOptions } from "@/types";
import { uniqueFilterByDataField } from "@packages/common";

interface UseRpt_VehicleServiceFrequencyColumnsProps {
  data: any[];
  handleShowDetail(param: any): any;
}

export const useRpt_VehicleServiceFrequencyColumns = ({
  data,
  handleShowDetail,
}: UseRpt_VehicleServiceFrequencyColumnsProps) => {
  const { t } = useI18n("Rpt_VehicleServiceFrequency");
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
      dataField: "DealerCode",
      caption: t("DealerCode"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      visible: true,
      // cellRender: (e: any) => {
      //   return (
      //     <span onClick={handleShowDetail(e?.data)}>{e.data?.PlateNo}</span>
      //   );
      // },

      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "FrameNo",
      caption: t("FrameNo"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CusName",
      caption: t("CusName"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    {
      dataField: "CheckInCount",
      caption: t("CheckInCount"),
      visible: true,
      // headerFilter: {
      // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
      // }
    },
    // {
    //   caption: t("STT"),
    //   dataField: "STT",
    //   cellRender: ({ rowIndex }) => {
    //     return <span>{rowIndex + 1}</span>;
    //   },
    //   visible: true,
    //   alignment: "center",
    //   allowSorting: false,
    //   allowFiltering: false,
    //   allowResizing: true,
    //   allowColumnResizing: true,
    // },
    // {
    //   dataField: "MaDaiLy",
    //   caption: t("MaDaiLy"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "SoBaoGia",
    //   caption: t("SoBaoGia"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "TenKH",
    //   caption: t("TenKH"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "BienSoXe",
    //   caption: t("BienSoXe"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "VIN",
    //   caption: t("VIN"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "Model",
    //   caption: t("Model"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "SoKM",
    //   caption: t("SoKM"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "CVDV",
    //   caption: t("CVDV"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "ThoiGianVaoXuong",
    //   caption: t("ThoiGianVaoXuong"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "ThoiGianRaXuong",
    //   caption: t("ThoiGianRaXuong"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
    // {
    //   dataField: "YeuCauKH",
    //   caption: t("YeuCauKH"),
    //   visible: true,
    //   // headerFilter: {
    //   // dataSource: uniqueFilterByDataField(data, "BankCodeMonitor")
    //   // }
    // },
  ] as ColumnOptions[];
};
