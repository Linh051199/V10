import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { DataGrid } from "devextreme-react";
import { useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  dataViewAtom,
  formDataTotalServiceAtom,
} from "../components/screen-atom";
import { FormTotalService } from "../popup-add/form-total-service";

interface ISer_ServicePackageServiceItemsProps {}

export const Ser_ServicePackageServiceItems = forwardRef(
  ({}: ISer_ServicePackageServiceItemsProps, ref: any) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew");
    const windowSize = useWindowSize();
    const setFormDataTotalService = useSetAtom(formDataTotalServiceAtom);

    let gridRef: any = useRef<DataGrid | null>(null);
    const dataView = useAtomValue(dataViewAtom);

    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return gridRef;
      },
    }));

    useEffect(() => {
      gridRef?.current?.setData(dataView?.Lst_Ser_ServicePackageServiceItems);
    }, [dataView]);

    //==========================handle======================================

    //==========================handle======================================

    // =============================Toolbar====================================

    // =============================Toolbar-End====================================

    //========================collumns========================

    const columns: ColumnOptions[] = [
      //   {
      //     dataField: "MyIdxSeq",
      //     caption: t("STT"),
      //     visible: true,
      //     editorOptions: {
      //       readOnly: true,
      //     },
      //     cellRender: ({ rowIndex }: any) => {
      //       return <div>{rowIndex + 1}</div>;
      //     },
      //   },

      {
        dataField: "SerCode",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("SerCode"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "SerCode",
          valueExpr: "SerCode",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.SerCode}</div>;
        },
      },
      {
        dataField: "SerName",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("SerName"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "SerName",
          valueExpr: "SerName",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.SerName}</div>;
        },
      },
      {
        dataField: "ROType",
        visible: true,
        width: 200,
        editorOptions: {
          readOnly: false,
        },

        caption: t("ROType"),
        editorType: "dxSelectBox",
        lookup: {
          dataSource: [
            {
              text: "Sửa chữa chung",
              value: "SCC",
            },
            {
              text: "Bảo dưỡng định kỳ",
              value: "BDD",
            },
            {
              text: "Sửa chữa đồng",
              value: "SCD",
            },
            {
              text: "Sửa chữa sơn",
              value: "SCS",
            },
          ],
          displayExpr: "text",
          valueExpr: "value",
        },

        // cellRender: ({ data, key }: any) => {
        //   return <div>{data.ROType}</div>;
        // },
      },
      {
        dataField: "ExpenseType",
        visible: true,
        width: 200,
        editorOptions: {
          readOnly: false,
        },

        caption: t("ExpenseType"),
        editorType: "dxSelectBox",

        lookup: {
          dataSource: [
            {
              text: "Khách hàng",
              value: "ROREPAIR",
            },
            {
              text: "Bảo hiểm",
              value: "ROINSURANCE",
            },
            {
              text: "Bảo hành",
              value: "ROWARRANTY",
            },
            {
              text: "Nội nộ",
              value: "LOCAL",
            },
          ],
          displayExpr: "text",
          valueExpr: "value",
        },

        // cellRender: ({ data, key }: any) => {
        //   return <div>{data.ExpenseType}</div>;
        // },
      },
      {
        dataField: "ActManHour",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("ActManHour"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "ActManHour",
          valueExpr: "ActManHour",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.ActManHour}</div>;
        },
      },
      {
        dataField: "Factor",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("Factor"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "Factor",
          valueExpr: "Factor",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.Factor}</div>;
        },
      },
      {
        dataField: "Price",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("Price"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "Price",
          valueExpr: "Price",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.Price}</div>;
        },
      },

      {
        dataField: "Amount",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("Amount"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "Amount",
          valueExpr: "Amount",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.Amount}</div>;
        },
      },
      {
        dataField: "VAT",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("VAT"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "VAT",
          valueExpr: "VAT",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.VAT}</div>;
        },
      },

      {
        dataField: "Note",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("Note"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "Note",
          valueExpr: "Note",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.Note}</div>;
        },
      },
    ];
    //========================collumns-end========================
    return (
      <>
        <h5 className="mt-3">{t("Ser_ServicePackageServiceItems")}</h5>
        <GridViewOne
          ref={gridRef}
          dataSource={[]}
          columns={columns}
          allowSelection={true}
          allowInlineEdit={true}
          allowMultiRowEdit={false}
          allowCheckDeleteConfirm={true}
          isHiddenCheckBox
          customHeight={windowSize.height - 600}
          keyExpr={"id"}
          storeKey={"Ser_ServicePackageServiceItems-view"}
        />
        <div className="flex items-center  flex-row-reverse mt-2 gap-3">
          <div className="w-[30%] mt-2">
            <FormTotalService />
          </div>
          <div className="font-extrabold text-sm">
            {t("Tổng tiền công lao động ")}
          </div>
        </div>
      </>
    );
  }
);
