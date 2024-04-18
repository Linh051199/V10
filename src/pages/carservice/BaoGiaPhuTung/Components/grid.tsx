import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import Form, { SimpleItem } from "devextreme-react/form";
import React, { ForwardedRef, forwardRef, useRef } from "react";
import PopupPhuTung from "./popup/PopupPhuTung";
import { TextField } from "@/packages/components/text-field";

interface Props {
  ref: ForwardedRef<any>;
}

const defaultValue = {
  MaPT: "",
  TenPT: "",
  DVT: "",
  SL: 0,
  HeSo: 0,
  DonGia: 0,
  Thue: 0,
  ThanhTien: 0,
  GhiChu: "",
};

const GridPT = forwardRef(({}: Props, ref: any) => {
  const popupGrid = useRef<any>();
  const formRef = useRef<any>();
  // ,MaPT,TenPT,DVT,SL,HeSo,DonGia,Thue,ThanhTien,GhiChu
  const arrColumn: ColumnOptions[] = [
    "Idx",
    "MaPT",
    "TenPT",
    "DVT",
    "SL",
    "HeSo",
    "DonGia",
    "Thue",
    "ThanhTien",
    "GhiChu",
  ].map((item: any) => {
    if (item === "Idx") {
      return {
        dataField: "Idx",
        caption: "",
        visible: true,
        allowFiltering: false,
        allowSorting: false,
        columnIndex: 1,
        // groupKey: "INFORMATION_BANKACCOUNT",
        cellRender: (data: any) => {
          return (
            <p>{+(data.component.pageIndex() * 100) + (data.rowIndex + 1)}</p>
          );
        },
      };
    }

    if (item === "MaPT" || item === "TenPT") {
      return {
        dataField: item,
        caption: item,
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          onEnterKey: (e: any) => {
            console.log("e ", e);
            popupGrid.current.setOpen();
          },
        },
      };
    }

    return {
      dataField: item,
      caption: item,
      editorType: "dxTextBox",
      visible: true,
      validationRules: [],
    };
  });

  return (
    <>
      <GridViewOne
        ref={ref}
        dataSource={[defaultValue]}
        allowSelection={false}
        columns={arrColumn}
        storeKey="BaoCaoPhuTungGrid"
        allowInlineEdit={true}
        customHeight={200}
        allowMultiRowEdit={true}
        isHiddenCheckBox={true}
        editMode={true}
        toolbarItems={[
          {
            location: "before",
            render: () => {
              return (
                <div className={"font-bold"}>{"Phụ tùng/dầu mở vật tư"}</div>
              );
            },
          },
        ]}
        editingOptions={{
          mode: "batch",
        }}
      >
        <Summary>
          <TotalItem
            column={"ThanhTien"}
            summaryType={"sum"}
            displayFormat="Tổng: {0}"
          ></TotalItem>
        </Summary>
      </GridViewOne>
      <PopupPhuTung ref={popupGrid} onSave={() => {}} />
    </>
  );
});

export default GridPT;
