import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { useAtom } from "jotai";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Alignment } from "@/types";

interface IPopupCreateNew {}

export const PopupDetailOO = forwardRef(({}: IPopupCreateNew, ref) => {
  const { t: common } = useI18n("Common");
  const { t } = useI18n("PopupDetailOO");
  const [open, setOpen] = useState(false);
  const formRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    showPopup() {
      setOpen(true);
    },
  }));

  const onHidding = () => {
    setOpen(false);
  };

  const columns = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "MaPhuTung",
      visible: true,
      caption: t("MaPhuTung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
      // cellRender: (e: any) => {
      //   return (
      //     <Link
      //       label={e.value}
      //       onClick={() => {
      //         handleViewDetail(e.value);
      //       }}
      //     />
      //   );
      // },
    },
    {
      dataField: "TenPhuTung",
      visible: true,
      caption: t("TenPhuTung"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "SoLuongChuaVe",
      visible: true,
      caption: t("SoLuongChuaVe"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "SoDonHang",
      visible: true,
      caption: t("SoDonHang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "HinhThucDatHang",
      visible: true,
      caption: t("HinhThucDatHang"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "NgayVeDuKien",
      visible: true,
      caption: t("NgayVeDuKien"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
    {
      dataField: "SoNgayCham",
      visible: true,
      caption: t("SoNgayCham"),
      width: 200,
      minWidth: 200,
      alignment: "center" as Alignment,
    },
  ];

  return (
    <Popup
      title={t("DetailO/O")}
      showCloseButton={true}
      onHidden={onHidding}
      visible={open}
      hideOnOutsideClick={true}
      position={"center"}
      onHiding={onHidding}
    >
      <GridViewOne
        // ref={ref}
        autoFetchData={true}
        allowSelection={true}
        isLoading={false}
        dataSource={[]}
        // fetchData={fetchData}
        columns={columns}
        toolbarItems={
          [
            // {
            //   location: "before",
            //   render: (gridRef: any) => (
            //     <ExportExcelButton onClick={handleExportExcel} />
            //   ),
            // },
          ]
        }
        keyExpr={"MaPhuTung"}
        storeKey={"DetailOO-manager-list"}
      />
    </Popup>
  );
});
