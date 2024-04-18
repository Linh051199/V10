import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { useNetworkNavigate } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { NumberBox, Switch, TextBox } from "devextreme-react";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { atom, useSetAtom } from "jotai";
import { usePermissions } from "@/packages/contexts/permission";
import { useClientgateApi } from "@/packages/api";
import { Alignment } from "@/types";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";
import { nanoid } from "nanoid";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useQuery } from "@tanstack/react-query";
import { faker } from "@faker-js/faker";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { SelectMapField } from "./components/SelectMapField";

const TestTruongDong = () => {
  const { t } = useI18n("TestTruongDong");
  const windowSize = useWindowSize();
  const permission = usePermissions();
  const api = useClientgateApi();
  const navigate = useNetworkNavigate();
  const showError = useSetAtom(showErrorAtom);
  let gridRef: any = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // call api save
  const handleSave = () => {
    // check nếu không phải multi form thì không save JsonForm
    const dataSource = gridRef.current
      .getDxInstance()
      .option("dataSource")
      .map((item: any) => {
        if (["only", "only2", null].includes(item.FieldType)) {
          return {
            ...item,
            JsonForm: [],
          };
        }
        return item;
      });
    gridRef.current.getDxInstance().option("dataSource", dataSource);
    gridRef.current.getDxInstance().saveEditData();
    const x = gridRef.current.getDxInstance().option("dataSource");
    console.log("api", x);
  };

  // gọi data về
  const fetchData = async () => {
    const resp = Array.from({ length: 5 }, function (x, y) {
      return {
        FieldIdx: faker.random.numeric(),
        FieldCode: faker.random.alphaNumeric(6).toUpperCase(),
        FieldName: faker.commerce.productName(),
        FieldType: y % 2 === 0 ? "multi" : y % 3 === 0 ? "only" : "only2",
        FieldOrder: faker.random.numeric(),
        FieldStatus: y % 2 === 0 ? "1" : "0",
        JsonForm:
          y % 2 === 0
            ? [
                {
                  Idx: faker.random.alphaNumeric(6).toUpperCase(),
                  Code: "FieldCode1",
                  Name: "FieldName1",
                },
                {
                  Idx: faker.random.alphaNumeric(6).toUpperCase(),
                  Code: "FieldCode2",
                  Name: "FieldName1",
                },
              ]
            : [],
      };
    });
    return {
      DataList: resp,
      ItemCount: 5,
      PageCount: 1,
      PageIndex: 0,
      PageSize: 10,
    };
  };

  // cấu hình columns
  const columns = [
    {
      dataField: "FieldCode",
      visible: true,
      caption: t("FieldCode"),
      width: 100,
      alignment: "center" as Alignment,
      editorOptions: { readOnly: true },
    },
    {
      dataField: "FieldName",
      visible: true,
      caption: t("FieldName"),
      width: 200,
      alignment: "center" as Alignment,
      editorType: "dxTextBox",
      editorOptions: { readOnly: false },
      cellRender: (e: any) => {
        return (
          <TextBox
            defaultValue={e.value}
            onValueChanged={(ev: any) => {
              e.component.cellValue(e.rowIndex, e.columnIndex, ev.value);
              e.component.saveEditData();
            }}
          />
        );
      },
    },
    {
      dataField: "FieldType",
      visible: true,
      caption: t("FieldType"),
      width: 400,
      alignment: "center" as Alignment,
      editorType: "dxSelectBox",
      editorOptions: { readOnly: false },
      cellRender: (e: any) => {
        const {
          data: dataRow,
          component: gridInstance,
          value,
          column: { dataField },
          rowIndex,
          columnIndex,
        } = e;

        return (
          // CHÚ Ý 2 CÁI FILE COMPONENT MultiField.tsx và MultiForm.tsx TẠO RA Ở KIA KHÔNG DÙNG Ở ĐÂU CẢ NHƯNG ĐỪNG XÓA
          <SelectMapField
            defaultValue={value}
            gridInstance={gridInstance}
            // key={rowIndex} // đặt prop là key thì làm sao mà hiểu được là prop truyền xuống
            rowIndex={rowIndex}
            dataRow={dataRow}
            dataField={dataField}
          />
        );
      },
    },
    {
      dataField: "FieldOrder", // Số đơn hàng
      visible: true,
      caption: t("FieldOrder"),
      width: 100,
      editorType: "dxNumberBox",
      alignment: "center" as Alignment,
      editorOptions: { readOnly: false, min: 1 },
      cellRender: (e: any) => {
        return (
          <NumberBox
            defaultValue={e.value}
            onValueChanged={(ev: any) => {
              e.component.cellValue(e.rowIndex, e.columnIndex, ev.value);
              e.component.saveEditData();
            }}
          />
        );
      },
    },
    {
      dataField: "FieldStatus",
      visible: true,
      caption: t("FieldStatus"),
      width: 100,
      alignment: "center" as Alignment,
      editorType: "dxSwitch",
      cellRender: (e: any) => {
        return (
          <Switch
            defaultValue={e.value === "1"}
            onValueChanged={(ev: any) => {
              e.component.cellValue(
                e.rowIndex,
                e.columnIndex,
                ev.value ? "1" : "0"
              );
              e.component.saveEditData();
            }}
          />
        );
      },
    },
  ];

  function onEditorPreparing(e: EditorPreparingEvent) {
    // if (e.dataField === "FieldStatus") {
    //   e.editorOptions.onValueChanged = function (ev: any) {
    //     let valueChanged = ev.component.option("value");
    //     e.setValue(valueChanged === true ? "1" : "0");
    //     gridRef?.current.saveEditingData();
    //     const x = gridRef.current.getDxInstance().option("dataSource");
    //   };
    // }
  }

  return (
    <AdminContentLayout className={"delivery-order-list"}>
      <AdminContentLayout.Slot name={"Header"}>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="page-title">{t("TestTruongDong")}</div>
          <div className="mx-2">
            <BButton iconName="done" label={t("Save")} onClick={handleSave} />
          </div>
        </div>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <GridViewOne
          ref={gridRef}
          autoFetchData={true}
          allowSelection={true}
          isLoading={false}
          dataSource={[]}
          fetchData={fetchData}
          columns={columns}
          isHiddenCheckBox={true}
          allowInlineEdit={true}
          allowMultiRowEdit={true}
          editMode={false}
          editingOptions={{
            mode: "row",
            allowDeleting: false,
            allowUpdating: false,
          }}
          toolbarItems={[]}
          customToolbarItems={[]}
          keyExpr={"FieldCode"}
          onSelectionChanged={() => {}}
          onEditorPreparing={onEditorPreparing}
          storeKey={"TestTruongDong-List"}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
export default TestTruongDong;
