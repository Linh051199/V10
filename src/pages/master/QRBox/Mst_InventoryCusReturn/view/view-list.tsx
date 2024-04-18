import ScrollView from "devextreme-react/scroll-view";
import { SubGrid } from "@/packages/components/sub-grid";
import { CarDeliveryOrder, CarDeliveryOrderDetail } from "@packages/types";
import DataGrid, { IToolbarItemProps } from "devextreme-react/data-grid";
import { BButton } from "@/packages/components/buttons";
import {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useMemo,
  useRef,
} from "react";
import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@packages/hooks";
import { ColumnOptions } from "@/types";
import { DeleteConfirmationBox } from "@packages/ui/modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Dlr_ContractCancel,
  Dlr_ContractCancelDtl,
} from "@/packages/types/sales/Dlr_ContractCancel";
import { DateField } from "@/packages/components/date-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

interface CarListProps {
  cars: any[];
  queryKey: string[];
}

export const ViewList = forwardRef(
  ({ cars, queryKey }: CarListProps, ref: any) => {
    const { t } = useI18n("Dlr_ContractDLView");

    const handleChangeDate = (rowIndex: any, dataField: any, value: any) => {
      ref?.current.instance.cellValue(rowIndex, dataField, value);
      ref?.current.instance.saveEditData();
    };
    const columns: ColumnOptions[] = useMemo(() => {
      return [
        {
          dataField: "ModelCode",
          caption: t("ModelCode"),
          visible: true,
        },
        {
          dataField: "ModelName",
          visible: true,
          caption: t("ModelName"),
          editorOptions: { readOnly: true },
        },
        {
          dataField: "SpecCode",
          caption: t("SpecCode"),

          visible: true,
        },

        {
          dataField: "SpecDescription",
          visible: true,
          caption: t("SpecDescription"),
          editorOptions: { readOnly: true },
        },
        {
          dataField: "ColorCode",
          caption: t("ColorCode"),

          visible: true,
        },

        {
          dataField: "ColorPairVn",
          visible: true,
          caption: t("ColorPairVn"),
          editorOptions: { readOnly: true },
        },
        {
          dataField: "ColorPairEn",
          visible: true,
          caption: t("ColorPairEn"),
          editorOptions: { readOnly: true },
        },
        {
          dataField: "Qty",
          visible: true,
          editorType: "dxNumberBox",
          caption: t("Qty"),

          editorOptions: { readOnly: true },
        },
        {
          dataField: "QtyCancel",
          visible: true,
          caption: t("QtyCancel"),
          editorOptions: { readOnly: true },
        },
        {
          dataField: "ContractUpdateTypeCancel",
          visible: true,
          caption: t("ContractUpdateTypeCancel"),
        },
        {
          dataField: "QtyDelivery",
          visible: true,
          caption: t("QtyDelivery"),
          editorOptions: { readOnly: true },
        },
        {
          dataField: "DlvExpectedDate",
          visible: true,
          caption: t("DlvExpectedDate"),

          format: "yyyy-MM-dd",
          editorOptions: {
            type: "date",
            displayFormat: "yyyy-MM-dd",
            openOnFieldClick: true,
            validationMessageMode: "always",
            showClearButton: true,
          },
        },
        {
          dataField: "UnitPrice",
          visible: true,
          caption: t("UnitPrice"),
          editorType: "dxNumberBox",

          editorOptions: { readOnly: true },
        },
        {
          dataField: "TotalPrice",
          visible: true,
          caption: t("TotalPrice"),
          editorOptions: { readOnly: true },
        },
      ];
    }, []);

    const deleteVisible = useVisibilityControl({ defaultVisible: false });
    const handleSelectionChanged = (e: any) => {};

    const subGridToolbars: IToolbarItemProps[] = [];
    const windowSize = useWindowSize();
    return (
      <ScrollView>
        <SubGrid
          customerHeight={"100%"}
          ref={ref}
          toolbarItems={subGridToolbars}
          dataSource={cars}
          columns={columns}
          onSelectionChanged={handleSelectionChanged}
          showActions={false}
          modeSelection="none"
          keyExpr={"DlrContractNo"}
        />
      </ScrollView>
    );
  }
);
