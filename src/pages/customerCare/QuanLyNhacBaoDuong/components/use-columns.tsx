import { useI18n } from "@/i18n/useI18n";
import { TST_Mst_Part } from "@/packages/types/master/TST_Mst_Part";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { LinkCell } from "@packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";

interface UseColumnsProps {}

export const useColumns = ({}: UseColumnsProps) => {
  const { t } = useI18n("QuanLyNhacBaoDuong");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: TST_Mst_Part) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };
  // STT
  // Tên khách
  // Điện thoại
  // Di động
  // Email
  // Ngày vào xưởng
  // Biển số
  // Người liên lạc
  // Địa chỉ người liên lạc
  // Email người liên lạc
  // Di động người liên lạc
  // Điện thoại người liên lạc
  // Hiệu xe
  // Model
  // Chú giải
  // Ngày liên hệ
  // Tình trạng
  // Số km gần nhất
  // Ngày BD khuyến nghị
  // Ngày hẹn
  // Ghi chú

  // const columns: ColumnOptions[] = [
  //   {
  //     dataField: "DauMuc",
  //     caption: t("DauMuc"),
  //     visible: true,
  //     columnIndex: 1,
  //     groupKey: "BASIC_INFORMATION",
  //     cellRender: ({ data, rowIndex, value }: any) => {
  //       return (
  //         <LinkCell
  //           key={nanoid()}
  //           onClick={() => viewRow(rowIndex, data)}
  //           value={value}
  //         />
  //       );
  //     },
  //     editorOptions: {
  //       placeholder: t("Input"),
  //       validationMessageMode: "always",
  //     },
  //   },
  //   {
  //     dataField: "Model",
  //     caption: t("Model"),
  //     visible: true,
  //     columnIndex: 1,
  //     groupKey: "BASIC_INFORMATION",
  //     editorType: "dxTextBox",
  //   },
  //   {
  //     dataField: "LinkAnh",
  //     caption: t("LinkAnh"),
  //     visible: true,
  //     columnIndex: 1,
  //     groupKey: "BASIC_INFORMATION",
  //     editorType: "dxTextBox",
  //   },
  // ];

  const arr = [
    "STT",
    "TenKhach",
    "DienThoai",
    "DiDong",
    "Email",
    "NgayVaoXuong",
    "BienSo",
    "NguoilienLac",
    "ĐiaChiNguoiLienLac",
    "EmailNguoiLienLac",
    "DiDongNguoiLienLac",
    "DienThoaiNguoiLienLac",
    "HieuXe",
    "Model",
    "ChuGiai",
    "NgayLienHe",
    "TinhTrang",
    "SokmGanNhat",
    "NgayBDKhuyenNghị",
    "NgayHen",
    "GhiChú",
  ].map((i) => {
    if (i === "STT") {
      return {
        dataField: "STT",
        caption: t("STT"),
        visible: true,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
        cellRender: ({ rowIndex }: any) => {
          return rowIndex + 1;
        },
        width: 100,
      };
    }

    return {
      dataField: i,
      caption: t(i),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    };
  });

  // return array of the first item only

  return arr;
};
