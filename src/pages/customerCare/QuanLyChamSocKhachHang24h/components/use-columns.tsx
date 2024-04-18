import { useI18n } from "@/i18n/useI18n";
import { TST_Mst_Part } from "@/packages/types/master/TST_Mst_Part";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { LinkCell } from "@packages/ui/link-cell";
import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { viewingDataAtom } from "./store";

interface UseColumnsProps {}

export const useColumns = ({}: UseColumnsProps) => {
  const { t } = useI18n("QuanLyAnhTrenPhieuTNGX");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: TST_Mst_Part) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

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
    "TenKH",
    "DienThoai",
    "DiDong",
    "BienSo",
    "SoKhung",
    "HieuXe",
    "Model",
    "LenhSuaChua",
    "NguoiLienLac",
    "DiaChiNguoiLienLac",
    "EmailNguoiLienLac",
    "DienThoaiNguoiLienLac",
    "NgayGiaoXe",
    "TinhTrang",
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
