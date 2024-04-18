import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { DataGrid, Form } from "devextreme-react";
import { useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { dataViewAtom, formDataTotalPartAtom } from "../components/screen-atom";
import { FormTotalPart } from "../popup-add/form-total-part";
import { FormHour } from "../popup-add/form-hour";

interface ISer_ServicePackagePartItemsProps {}

export const Ser_ServicePackagePartItems = forwardRef(
  ({}: ISer_ServicePackagePartItemsProps, ref: any) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew");
    const windowSize = useWindowSize();
    const setFormDataTotalPart = useSetAtom(formDataTotalPartAtom);

    const formHourRef = useRef<Form>(null);
    let gridRef: any = useRef<DataGrid | null>(null);
    const dataView = useAtomValue(dataViewAtom);

    const [formData, setFormData] = useState({
      Hour: "",
    });

    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return gridRef;
      },
    }));

    useEffect(() => {
      gridRef?.current?.setData(dataView?.Lst_Ser_ServicePackagePartItems);
      setFormData({
        Hour: dataView?.Ser_ServicePackage?.TakingTime,
      });
    }, [dataView]);

    //==========================handle======================================

    //==========================handle======================================

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
        dataField: "PartCode",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("PartCode"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "PartCode",
          valueExpr: "PartCode",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.PartCode}</div>;
        },
      },
      {
        dataField: "VieName",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("VieName"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "VieName",
          valueExpr: "VieName",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.VieName}</div>;
        },
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
        dataField: "Unit",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("Unit"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "Unit",
          valueExpr: "Unit",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.Unit}</div>;
        },
      },
      {
        dataField: "Quantity",
        visible: true,
        editorOptions: {
          readOnly: false,
        },

        caption: t("Quantity"),
        editorType: "dxTextBox",

        lookup: {
          displayExpr: "Quantity",
          valueExpr: "Quantity",
        },

        cellRender: ({ data, key }: any) => {
          return <div>{data.Quantity}</div>;
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
        <h5 className="mt-3">{t("Ser_ServicePackagePartItems")}</h5>
        <GridViewOne
          ref={gridRef}
          dataSource={[]}
          columns={columns}
          allowSelection={true}
          allowCheckDeleteConfirm
          allowInlineEdit={true}
          isHidenHeaderFilter={true}
          allowMultiRowEdit={false}
          isHiddenCheckBox
          customHeight={windowSize.height - 600}
          keyExpr={"id"}
          storeKey={"Ser_ServicePackagePartItems-view"}
        />
        <div className="flex items-center  flex-row-reverse mt-2 gap-3">
          <div className="w-[30%] mt-2">
            <FormTotalPart />
          </div>
          <div className="font-extrabold text-sm">
            {t("Tổng tiền phụ tùng, dầu mỡ và vật tư ")}
          </div>
          <div className=" flex-1">
            <FormHour ref={formHourRef} formData={formData} readOnly />
          </div>
        </div>
      </>
    );
  }
);
