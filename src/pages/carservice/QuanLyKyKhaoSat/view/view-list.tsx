import ScrollView from "devextreme-react/scroll-view";
import { SubGrid } from "@/packages/components/sub-grid";
import { CarDeliveryOrder, CarDeliveryOrderDetail } from "@packages/types";
import DataGrid, { IToolbarItemProps } from "devextreme-react/data-grid";
import { BButton } from "@/packages/components/buttons";
import { ForwardedRef, forwardRef, MutableRefObject, useRef } from "react";
import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@packages/hooks";
import { ColumnOptions } from "@/types";
import { DeleteConfirmationBox } from "@packages/ui/modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { Dlr_ContractCancel, Dlr_ContractCancelDtl } from "@/packages/types/sales/Dlr_ContractCancel";

interface CarListProps {
  // order: Dlr_ContractCancel;
  // cars: Dlr_ContractCancelDtl[];
  onDeleteSingle: (key: string) => void;
  onDeleteMultiple: (keys: string[]) => void;
  queryKey: string[];
}

export const ViewList = forwardRef(({
  // cars, order,
  onDeleteSingle,
  onDeleteMultiple,
  queryKey
}: CarListProps, ref: ForwardedRef<DataGrid>) => {
  const { t } = useI18n("FrmMngDlr_PDIRequestDetail");
  const params = useParams();

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      cellRender: ({ rowIndex }: any) => {
        return (<div>{rowIndex + 1}</div>);
      }
    },
    {
      "dataField": "DlrContractNo",
      visible: true,
      "caption": t("DlrContractNo")
    },
    {
      "dataField": "DC_DlrContractNoUser",
      visible: true,
      "caption": t("DC_DlrContractNoUser")
    },
    {
      "dataField": "DC_CreatedDate",
      visible: true,
      "caption": t("DC_CreatedDate")
    },
    {
      "dataField": "ModelCode",
      visible: true,
      "caption": t("ModelCode")
    },
    {
      "dataField": "MCM_ModelName",
      visible: true,
      "caption": t("MCM_ModelName")
    },
    {
      "dataField": "SpecCode",
      visible: true,
      "caption": t("SpecCode")
    },
    {
      "dataField": "MCS_SpecDescription",
      visible: true,
      "caption": t("MCS_SpecDescription")
    },
    {
      "dataField": "ColorCode",
      visible: true,
      "caption": t("ColorCode")
    },
    {
      "dataField": "MCC_ColorName",
      visible: true,
      "caption": t("MCC_ColorName")
    },
    {
      "dataField": "QtyRemain",
      visible: true,
      "caption": t("QtyRemain")
    },
    {
      "dataField": "Qty",
      visible: true,
      "caption": t("Qty")
    },
    {
      "dataField": "ContractUpdateType",
      visible: true,
      "caption": t("ContractUpdateType")
    },
    {
      "dataField": "Remark",
      visible: true,
      "caption": t("Remark")
    },
    {
      "dataField": "DDC_CustomerCode",
      visible: true,
      "caption": t("DDC_CustomerCode")
    },
    {
      "dataField": "DDC_FullName",
      visible: true,
      "caption": t("DDC_FullName")
    },
    {
      "dataField": "DDC_Address",
      visible: true,
      "caption": t("DDC_Address")
    },
    {
      "dataField": "MSM_SMName",
      visible: true,
      "caption": t("MSM_SMName")
    },
    {
      "dataField": "DDC_PhoneNo",
      visible: true,
      "caption": t("DDC_PhoneNo")
    },
    {
      "dataField": "DDC_IDCardNo",
      visible: true,
      "caption": t("DDC_IDCardNo")
    },
    {
      "dataField": "DDC_DateOfBirth",
      visible: true,
      "caption": t("DDC_DateOfBirth")
    },

  ];


  const deleteVisible = useVisibilityControl({ defaultVisible: false });
  const handleSelectionChanged = (e: any) => {
    // const gridRef = ref as MutableRefObject<DataGrid>;
    // if (gridRef && gridRef.current && gridRef.current?.instance.getSelectedRowsData().length > 0) {
    //   if (!["R"].includes(order.ContractCancelStatus)) {
    //     deleteVisible.open();
    //   }
    // } else {
    //   deleteVisible.close();
    // }
  };
  const onCancelDelete = () => {
    controlConfirmBoxVisible.close();
  };
  const onCancelDeleteSingle = () => {
    confirmDeleteSingleVisible.close();
    localStorage.removeItem("carDeliveryOrderDeleteItem")
  }
  const onDelete = async () => {
    const gridRef = ref as MutableRefObject<DataGrid>;
    const keys = gridRef.current?.instance.getSelectedRowKeys();
    onDeleteMultiple(keys);
  };

  const subGridToolbars: IToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return (
          <div className={"font-bold mr-2"}>{t("CarList")}</div>
        );
      }
    },
    {
      location: "after",
      render: () => {
        return (
          <div className={""}>{t("TotalRow")}: {[].length}</div>
        );
      }
    }

  ];
  const handleStartDelete = (key: string) => {
    // set value to input via ref
    localStorage.setItem("carDeliveryOrderDeleteItem", key)
    confirmDeleteSingleVisible.open();
  };
  const handleDeleteSingle = () => {
    // get selected item from input via ref
    const selectedItem = localStorage.getItem("carDeliveryOrderDeleteItem")
    if (selectedItem) {
      onDeleteSingle(selectedItem)
      localStorage.removeItem("carDeliveryOrderDeleteItem")
    }
  }
  const deletingItemRef = useRef<any>(null);
  const controlConfirmBoxVisible = useVisibilityControl({ defaultVisible: false });
  const confirmDeleteSingleVisible = useVisibilityControl({ defaultVisible: false });
  return (
    <ScrollView>
      <SubGrid
        ref={ref}
        toolbarItems={subGridToolbars}
        dataSource={[]}
        columns={columns}
        onSelectionChanged={handleSelectionChanged}
        onStartDelete={handleStartDelete}
        showActions={true}
        keyExpr={"CarId"}
      />
      <input type={"hidden"} ref={deletingItemRef} value={""} />
      <div>
        <DeleteConfirmationBox
          control={controlConfirmBoxVisible}
          title={t("Are you sure to delete selected records")}
          onYesClick={onDelete}
          onNoClick={onCancelDelete}
        />
      </div>
      <div>
        <DeleteConfirmationBox
          control={confirmDeleteSingleVisible}
          title={t("DeleteSingleConfirm")}
          onYesClick={handleDeleteSingle}
          onNoClick={onCancelDeleteSingle}
        />
      </div>
    </ScrollView>
  );
});
