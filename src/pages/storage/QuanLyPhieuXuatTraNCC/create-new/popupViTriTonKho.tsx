import { useI18n } from "@/i18n/useI18n";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { format } from "date-fns";
import { Form, Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import './DuyetBaoCaoBaoHanh.scss'

import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { RequiredField } from "@/packages/common/Validation_Rules";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@/packages/hooks";

interface VitriTonKhoPopup {
  visiblePopup: any;
  onClose: (data: any) => void;
  onOpenPopup: () => void
  codeCondition: any
}

export const PopupViTriTonKho = forwardRef(({ visiblePopup, onClose, onOpenPopup, codeCondition }: VitriTonKhoPopup, ref: any) => {
  const formData = { ...codeCondition.current }
  const { t } = useI18n("QuanLyYeuCauXuatKhoDetail");
  console.log(27, formData)
  const refDataGrid = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    getGridViewOneRef() {
      return refDataGrid;
    },
    show() {
      showSelectCarPopup.open();
    },
    hidding() {
      showSelectCarPopup.close();
    }
  }));




  const showSelectCarPopup = useVisibilityControl({
    defaultVisible: visiblePopup,
  });

  const columns: ColumnOptions[] = [
    {
      dataField: "MyIdxSeq",
      caption: t("STT"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      cellRender: ({ rowIndex }: any) => {
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      dataField: "MaViTri",
      caption: t("MaViTri"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SoLuongCoTheXuat",
      caption: t("SoLuongCoTheXuat"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "SLXuat",
      caption: t("SLXuat"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ]
  return (
    <div>
      <Popup
        visible={showSelectCarPopup.visible}
        title="Vị Trí Lưu Kho"
        showCloseButton
        onHidden={() => {
          showSelectCarPopup.close();
        }}
        contentRender={() => {
          return (
            <div className={"p-2"}>
              <Form
                ref={ref}
                colCount={1}
                formData={formData}
                labelLocation={"left"}
                validationGroup={"main"}
              >
                <GroupItem colCount={1}>
                  <SimpleItem
                    render={({ component: formInstance, dataField }: any) => {
                      return (
                        <h3>
                          Thông tin chung
                        </h3>
                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("MaPhuTung"),
                    }}
                    dataField={"MaPhuTung"}
                    cssClass="ml-4"
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <span>{value}</span>
                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("SoLuongYC"),
                    }}
                    dataField={"SoLuongYC"}
                    cssClass="ml-4"
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <span>{value}</span>
                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("TenHang"),
                    }}
                    cssClass="ml-4"
                    dataField={"TenHang"}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <span>{value}</span>
                      );
                    }}
                  ></SimpleItem>
                </GroupItem>
              </Form>
              <div className="border-[#eeeee] border-[1px] p-[10px]">
                <GridViewOne
                  ref={refDataGrid}
                  toolbarItems={[]}
                  dataSource={[]}
                  columns={columns}
                  autoFetchData={false}
                  allowSelection={true}
                  allowInlineEdit={true}
                  allowMultiRowEdit={true}
                  editMode={true}
                  // editingOptions={{
                  //   mode: "batch",
                  // }}
                  defaultPageSize={9999999}
                  // onRowDeleteBtnClick={(e) => onRowDeleteBtnClick(e, ref)}
                  // onSaveRow={handleSavingRow}
                  // onSelectionChanged={handleSelectionChanged}
                  // onEditorPreparing={onEditorPreparing}
                  customHeight={"auto"}
                  storeKey={"popup-vitritonkho-columns"}
                />
              </div>
            </div>
          );
        }}
      >
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-submit"
          options={{
            text: t("Save"),
            onClick: () => {
              if (ref.current?.instance.validate().isValid) {
              } else {
                return;
              }
            },
            stylingMode: "contained",
            type: "default",
          }}
        />
      </Popup>
    </div >
  )
})
