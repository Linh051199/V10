import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { DataGrid, Form } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { PopupSearchPartItems } from "../components/popup-search-part-items/popup-search-part-items";
import { useVisibilityControl } from "@/packages/hooks";
import { differenceBy, intersectionBy } from "lodash-es";
import { openPopupWarningDuplicateCreateAtom } from "@/packages/ui/warning-duplicate-create/atom";
import { WarningDuplicateCreate } from "@/packages/ui/warning-duplicate-create/WarningDuplicateCreate";
import { FormTotalPart } from "./form-total-part";
import {
  dataViewAtom,
  formDataTotalAddNewAtom,
  formDataTotalPartAtom,
  formDataTotalServiceAtom,
  isUpdateAtom,
} from "../components/screen-atom";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { FormHour } from "./form-hour";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import {
  ExcludeSpecialCharactersType,
  RequiredOnlyPositiveInteger,
  requiredExcludeSpecialCharactersOnlyNumbers,
  requiredExcludeSpecialCharactersOnlyNumbers3,
} from "@/packages/common/Validation_Rules";

interface ISer_ServicePackagePartItemsProps {
  formHourRef: any;
}

export const Ser_ServicePackagePartItems = forwardRef(
  ({ formHourRef }: ISer_ServicePackagePartItemsProps, ref: any) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew_PartItems");
    const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
    const windowSize = useWindowSize();
    const api = useClientgateApi();

    const showSearchPartItemsPopup = useVisibilityControl({
      defaultVisible: false,
    });

    const [openWarningDuplicate, setOpenWarningDuplicate] = useAtom(
      openPopupWarningDuplicateCreateAtom
    );
    const dataView = useAtomValue(dataViewAtom);
    const formDataTotalService = useAtomValue(formDataTotalServiceAtom);
    const isUpdate = useAtomValue(isUpdateAtom);
    const setFormDataTotalPart = useSetAtom(formDataTotalPartAtom);
    const setFormDataTotalAddNew = useSetAtom(formDataTotalAddNewAtom);
    const setLoad = useSetAtom(loadPanelAtom);

    const searchPartitemsPopupRef = useRef<any>(null);
    const dataInputSearchRef = useRef<Form>(null);
    let gridRef: any = useRef<DataGrid | null>(null);

    const [formDataInput, setformDataInput] = useState({
      VieName: "",
    });
    const [itemDuplicate, setitemDuplicate] = useState<number>(0);
    const [formData, setFormData] = useState({
      Hour: "",
    });

    const searchFromData = useRef<any>({
      PartCode: "",
      VieName: "",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return gridRef;
      },
    }));

    // useEffect(() => {
    //   gridRef?.current?.setData(dataView?.Lst_Ser_ServicePackagePartItems);
    //   setFormData({
    //     Hour: dataView?.Ser_ServicePackage?.TakingTime,
    //   });
    // }, [dataView]);

    useEffect(() => {
      if (isUpdate) {
        gridRef?.current?.setData(dataView?.Lst_Ser_ServicePackagePartItems);
        setFormData({
          Hour: dataView?.Ser_ServicePackage?.TakingTime,
        });
      } else {
        setFormData({
          Hour: "",
        });
      }
    }, [isUpdate]);

    //==========================handle======================================

    const handleSearchServiceItems = async () => {
      // setLoad(true);
      // const respone = await api.Ser_MST_Part_SearchDL({
      //   PartID: "",
      //   // PartCode: "",
      //   PartCode: "",
      //   EngName: "",
      //   VieName: dataInputSearchRef?.current?.props?.formData?.VieName,
      //   CusTypeID: "",
      //   FreqUsed: "",
      //   IsActive: "",
      //   PartGroupID: "",
      //   Ft_PageIndex: 0,
      //   Ft_PageSize: 100,
      // });
      // if (respone.isSuccess) {
      //   searchPartitemsPopupRef?.current
      //     .getGridViewOneRef()
      //     ?.current?.setData(respone?.DataList);
      //   searchPartitemsPopupRef.current.show();
      // } else {
      //   showError({
      //     message: t(respone._strErrCode),
      //     _strErrCode: respone._strErrCode,
      //     _strTId: respone._strTId,
      //     _strAppTId: respone._strAppTId,
      //     _objTTime: respone._objTTime,
      //     _strType: respone._strType,
      //     _dicDebug: respone._dicDebug,
      //     _dicExcs: respone._dicExcs,
      //   });
      // }
      // setLoad(false);
      searchFromData.current = {
        ...searchFromData.current,
        VieName: dataInputSearchRef?.current?.props?.formData?.VieName,
      };
      searchPartitemsPopupRef?.current
        ?.getGridViewOneRef()
        ?.current?.refetchData();
      searchPartitemsPopupRef.current.show();
    };

    const handleUpdateTotal = (data: any) => {
      let totalAmount = 0;
      let totalVAT = 0;
      for (let i = 0; i < data.length; i++) {
        let totalVATLoop =
          (data[i]?.Quantity *
            data[i]?.Price *
            data[i]?.Factor *
            data[i]?.VAT) /
          100;
        totalAmount += data[i]?.Quantity * data[i]?.Price * data[i]?.Factor;
        totalVAT += totalVATLoop;
      }
      setFormDataTotalPart({
        Amount: totalAmount,
        VAT: totalVAT,
        Total: totalAmount + totalVAT,
      });
      setFormDataTotalAddNew({
        Amount: totalAmount + formDataTotalService?.Amount,
        Total: totalAmount + totalVAT + formDataTotalService?.Total,
      });
    };

    const handleChoose = (data: any) => {
      const newData = [
        {
          ...data,
          ExpenseType: "ROREPAIR",
          Factor: "1",
          Quantity: "1",
        },
      ];
      const oldData = gridRef?.current?.getVisibleData();
      const count = intersectionBy(newData, oldData, "PartCode");
      const differentArray = differenceBy(newData, oldData, "PartCode");
      setitemDuplicate(count.length);
      if (count.length) {
        setOpenWarningDuplicate(true);
      }
      const dataNew = [...oldData, ...differentArray];
      gridRef.current.setData(dataNew);
      handleUpdateTotal(dataNew);
      searchPartitemsPopupRef.current.close();
    };

    const handleSelected = (data: any) => {
      const newData = data?.map((item: any) => {
        return {
          ...item,
          ExpenseType: "ROREPAIR",
          Factor: "1",
          Quantity: "1",
        };
      });
      const oldData = gridRef?.current?.getVisibleData();
      const count = intersectionBy(newData, oldData, "PartCode");
      const differentArray = differenceBy(newData, oldData, "PartCode");
      setitemDuplicate(count.length);
      if (count.length) {
        setOpenWarningDuplicate(true);
      }
      const dataNew = [...oldData, ...differentArray];
      handleUpdateTotal(dataNew);
      gridRef.current.setData(dataNew);
    };
    const onEditorPreparing = (e: any) => {
      if (
        (e.parentType === "dataRow" && e.dataField === "Factor") ||
        e.dataField === "Price" ||
        e.dataField === "Quantity"
      ) {
        e.editorOptions.onValueChanged = function (event: any) {
          let valueChanged = event.component.option("value");

          if (e && e.setValue) e.setValue(valueChanged);
          const data = gridRef.current.getVisibleData();
          handleUpdateTotal(data);
        };
      }
      if (e.dataField === "Price" || e.dataField === "VAT") {
        if (gridRef?.current?.getData()[e?.row?.rowIndex]?.FlagInTST === "1") {
          e.editorOptions.readOnly = true;
        }
      }
    };
    const handleDeleteSingleColumn = (e: any) => {
      ConfirmComponent({
        asyncFunction: async () => {
          const row: any = [];
          row.push(e.row.data);

          const data = gridRef.current.getVisibleData();
          const differentArray = differenceBy(data, row, "PartCode");
          gridRef.current.setData(differentArray);
          handleUpdateTotal(differentArray);
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to delete?"),
      });
    };
    const handleDeleteMulti = (e: any) => {
      ConfirmComponent({
        asyncFunction: async () => {
          const selectedRows = gridRef.current.getSelectedRowsData();
          const data = gridRef.current.getVisibleData();
          const differentArray = differenceBy(data, selectedRows, "PartCode");
          gridRef.current.setData(differentArray);
          handleUpdateTotal(differentArray);
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to delete?"),
      });
    };
    //==========================handle======================================

    // =============================Toolbar====================================
    const gridToolbars: ToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return (
            <div className="flex flex-row">
              {/* <form className={"flex mr-1"}> */}
              <Form
                ref={dataInputSearchRef}
                formData={formDataInput}
                labelLocation={"top"}
                colCount={1}
                validationGroup={"form"}
                scrollingEnabled={true}
              >
                <SimpleItem
                  label={{
                    text: t("VieName"),
                    visible: false,
                  }}
                  dataField={"VieName"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        placeholder={t("Input")}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                      />
                    );
                  }}
                />
                ;
              </Form>
              {/* </form> */}
              <BButton label={t("Search")} onClick={handleSearchServiceItems} />
            </div>
          );
        },
      },
    ];
    // =============================Toolbar-End====================================

    //========================collumns========================

    const columns: any[] = [
      {
        dataField: "PartCode",
        caption: t("PartCode"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "VieName",
        caption: t("VieName"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "ExpenseType",
        caption: t("ExpenseType"),
        visible: true,
        width: 110,
        editorOptions: {
          readOnly: false,
        },
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
              text: "Nội bộ",
              value: "LOCAL",
            },
          ],
          displayExpr: "text",
          valueExpr: "value",
        },
      },
      {
        dataField: "Unit",
        caption: t("Unit"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Quantity",
        caption: t("Quantity"),
        visible: true,
        editorOptions: {
          readOnly: false,
        },
        editorType: "dxNumberBox",

        lookup: {
          displayExpr: "Quantity",
          valueExpr: "Quantity",
        },

        validationRules: [requiredExcludeSpecialCharactersOnlyNumbers],
        cellRender: ({ data, key }: any) => {
          return <div>{data.Quantity}</div>;
        },
      },
      {
        dataField: "Price",
        caption: t("Price"),
        visible: true,
        editorOptions: {
          readOnly: false,
        },
        editorType: "dxNumberBox",

        lookup: {
          displayExpr: "Price",
          valueExpr: "Price",
        },

        validationRules: [ExcludeSpecialCharactersType],
        cellRender: ({ data, key }: any) => {
          return <div>{data.Price}</div>;
        },
      },
      {
        dataField: "Factor",
        caption: t("Factor"),
        visible: true,
        editorOptions: {
          readOnly: false,
        },
        editorType: "dxNumberBox",

        lookup: {
          displayExpr: "Factor",
          valueExpr: "Factor",
        },

        validationRules: [requiredExcludeSpecialCharactersOnlyNumbers3],
        cellRender: ({ data, key }: any) => {
          return <div>{data.Factor}</div>;
        },
      },

      {
        dataField: "Amount",
        caption: t("Amount"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },

        cellRender: ({ data, key }: any) => {
          const total = data.Factor * data.Price * data.Quantity;

          return <div>{total}</div>;
        },
      },
      {
        dataField: "VAT",
        caption: t("VAT"),
        visible: true,
        editorOptions: {
          readOnly: false,
        },
        editorType: "dxNumberBox",
        validationRules: [
          RequiredOnlyPositiveInteger,
          ExcludeSpecialCharactersType,
        ],

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
        caption: t("Note"),
        visible: true,
        editorOptions: {
          readOnly: false,
        },
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
        <h5 className="mt-5">{t("Ser_ServicePackagePartItems")}</h5>
        <WarningDuplicateCreate
          visible={openWarningDuplicate}
          message={`There are ${itemDuplicate} items that cannot be added list items because duplicate PartCode `}
          typeIcon={"warning"}
        />
        <GridViewOne
          ref={gridRef}
          toolbarItems={gridToolbars}
          dataSource={[]}
          columns={columns}
          allowSelection={true}
          allowCheckDeleteConfirm
          allowInlineEdit={true}
          // isHidenHeaderFilter={true}
          allowMultiRowEdit={false}
          editMode={true}
          editingOptions={{
            mode: "batch",
          }}
          onEditorPreparing={onEditorPreparing}
          onRowDeleteBtnClick={(e) => handleDeleteSingleColumn(e)}
          onDeleteMultiBtnClick={handleDeleteMulti}
          customHeight={windowSize.height - 300}
          keyExpr={"PartCode"}
          storeKey={"Ser_ServicePackagePartItems-Addnew"}
        />
        <PopupSearchPartItems
          ref={searchPartitemsPopupRef}
          visible={showSearchPartItemsPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            showSearchPartItemsPopup.close();
          }}
          dataInputSearchRef={dataInputSearchRef}
          onSearch={() => handleSearchServiceItems}
          gridMainRef={gridRef}
          onChoose={handleChoose}
          onSelect={handleSelected}
          searchFromData={searchFromData}
        />
        <div className="flex items-center  flex-row-reverse mt-2 gap-3">
          <div className="w-[30%] mt-2">
            <FormTotalPart />
          </div>
          <div className="font-extrabold text-sm">
            {t("Tổng tiền phụ tùng, dầu mỡ và vật tư ")}
          </div>
          <div className=" flex-1">
            <FormHour ref={formHourRef} formData={formData} />
          </div>
        </div>
      </>
    );
  }
);
