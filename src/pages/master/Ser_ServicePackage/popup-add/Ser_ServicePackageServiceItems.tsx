import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { DataGrid, Form } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { nanoid } from "nanoid";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { PopupSearchServiceIems } from "../components/popup-search-service-items/popup-search-service-items";
import { useVisibilityControl } from "@/packages/hooks";
import { useClientgateApi } from "@/packages/api";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MathRounding, showErrorAtom } from "@/packages/store";
import { differenceBy, intersectionBy, isNumber } from "lodash-es";
import { openPopupWarningDuplicateCreateAtom } from "@/packages/ui/warning-duplicate-create/atom";
import { WarningDuplicateCreate } from "@/packages/ui/warning-duplicate-create/WarningDuplicateCreate";
import { Summary, TotalItem } from "devextreme-react/data-grid";
import { FormTotalService } from "./form-total-service";
import {
  dataViewAtom,
  formDataTotalAddNewAtom,
  formDataTotalPartAtom,
  formDataTotalServiceAtom,
  isUpdateAtom,
} from "../components/screen-atom";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
  RequiredOnlyPositiveInteger,
  requiredExcludeSpecialCharactersOnlyNumbers3,
  requiredOnlyNumber,
} from "@/packages/common/Validation_Rules";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import {
  WarningDuplicateForService,
  openPopupWarningDuplicateForServiceAtom,
} from "../warning-duplicate-create/WarningDuplicateForService";

interface ISer_ServicePackageServiceItemsProps {}

export const Ser_ServicePackageServiceItems = forwardRef(
  ({}: ISer_ServicePackageServiceItemsProps, ref: any) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew_ServiceItems");
    const windowSize = useWindowSize();
    const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
    const api = useClientgateApi();

    const showSearchServiceItemsPopup = useVisibilityControl({
      defaultVisible: false,
    });
    const [openWarningDuplicate, setOpenWarningDuplicate] = useAtom(
      openPopupWarningDuplicateForServiceAtom
    );
    const formDataTotalPart = useAtomValue(formDataTotalPartAtom);
    const dataView = useAtomValue(dataViewAtom);
    const isUpdate = useAtomValue(isUpdateAtom);
    const setFormDataTotalService = useSetAtom(formDataTotalServiceAtom);
    const setFormDataTotalAddNew = useSetAtom(formDataTotalAddNewAtom);
    const setLoad = useSetAtom(loadPanelAtom);

    const searchServiceItemsPopupRef = useRef<any>(null);
    let gridRef: any = useRef<DataGrid | null>(null);
    const dataInputSearchRef = useRef<Form>(null);

    const [formDataInput, setformDataInput] = useState({
      SerName: "",
    });
    const [itemDuplicate, setitemDuplicate] = useState<number>(0);
    // const [searchFromData, setSearchFromData] = useState<any>({
    //   SerCode: "",
    //   SerName: "",
    //   Ft_PageIndex: 0,
    //   Ft_PageSize: 100,
    // });
    const searchFromData = useRef<any>({
      SerCode: "",
      SerName: "",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return gridRef;
      },
    }));

    useEffect(() => {
      if (isUpdate) {
        handleUpdateTotal(dataView?.Lst_Ser_ServicePackageServiceItems);
      }
    }, [isUpdate]);

    //==========================handle======================================

    const handleSearchServiceItems = async () => {
      // const respone = await api.Ser_MST_Service_SearchDL_Ser_ServicePackage({
      //   SerID: "",
      //   DealerCode: "",
      //   SerCode: "",
      //   SerName: dataInputSearchRef?.current?.props?.formData?.SerName,
      //   CustTypeID: "",
      //   IsActive: "",
      //   Ft_PageIndex: 0,
      //   Ft_PageSize: 100,
      // });
      // if (respone.isSuccess) {
      //   setSearchFromData((prev: any) => {
      //     return {
      //       ...prev,
      //       SerName: dataInputSearchRef?.current?.props?.formData?.SerName,
      //     };
      //   });
      //   searchServiceItemsPopupRef?.current
      //     .getGridViewOneRef()
      //     ?.current?.setData(respone?.DataList);
      //   searchServiceItemsPopupRef.current.show();
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
      // setSearchFromData((prev: any) => {
      //   return {
      //     ...prev,
      //     SerName: dataInputSearchRef?.current?.props?.formData?.SerName,
      //   };
      // });

      searchFromData.current = {
        ...searchFromData.current,
        SerName: dataInputSearchRef?.current?.props?.formData?.SerName,
      };
      searchServiceItemsPopupRef?.current
        ?.getGridViewOneRef()
        ?.current?.refetchData();
      searchServiceItemsPopupRef.current.show();
    };

    const handleUpdateTotal = (data: any) => {
      let totalAmount = 0;
      let totalVAT = 0;
      for (let i = 0; i < data?.length; i++) {
        let totalVATLoop =
          (data[i]?.Factor * data[i]?.Price * data[i]?.VAT) / 100;
        totalAmount += data[i]?.Factor * data[i]?.Price;
        totalVAT += totalVATLoop;
      }
      setFormDataTotalService({
        Amount: totalAmount,
        VAT: totalVAT,
        Total: totalAmount + totalVAT,
      });
      setFormDataTotalAddNew({
        Amount: totalAmount + formDataTotalPart?.Amount,
        Total: totalAmount + totalVAT + formDataTotalPart?.Total,
      });
    };

    const handleChoose = (data: any) => {
      const newData = [
        {
          ...data,
          ROType: "SCC",
          ExpenseType: "ROREPAIR",
          ActManHour: data?.StdManHour,
          Factor: "1",
          Note: "",
        },
      ];
      const oldData = gridRef?.current?.getVisibleData();
      const count = intersectionBy(newData, oldData, "SerCode");
      const differentArray = differenceBy(newData, oldData, "SerCode");
      setitemDuplicate(count.length);
      if (count.length) {
        setOpenWarningDuplicate(true);
      }
      const dataNew = [...oldData, ...differentArray];
      gridRef.current.setData(dataNew);
      handleUpdateTotal(dataNew);

      searchServiceItemsPopupRef.current.close();
    };

    const handleSelected = (data: any) => {
      const newData = data?.map((item: any) => {
        return {
          ...item,
          ROType: "SCC",
          ExpenseType: "ROREPAIR",
          ActManHour: item?.StdManHour,
          Factor: "1",
          Note: "",
        };
      });
      const oldData = gridRef?.current?.getVisibleData();
      const count = intersectionBy(newData, oldData, "SerCode");
      const differentArray = differenceBy(newData, oldData, "SerCode");
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
        e.dataField === "Price"
      ) {
        e.editorOptions.onValueChanged = function (event: any) {
          let valueChanged = event.component.option("value");

          if (e && e.setValue) e.setValue(valueChanged);
          const data = gridRef.current.getVisibleData();
          handleUpdateTotal(data);
        };
      }
      if (e.dataField === "Price" || e.dataField === "VAT") {
        if (
          gridRef?.current?.getData()[e?.row?.rowIndex]?.FlagWarranty === "1"
        ) {
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
          const differentArray = differenceBy(data, row, "SerCode");
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
          const differentArray = differenceBy(data, selectedRows, "SerCode");
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
            <div className="flex flex-row  ">
              {/* <form className={"flex mr-1"} onSubmit={() => {}}> */}
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
                    text: t("SerName"),
                    visible: false,
                  }}
                  dataField={"SerName"}
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
        caption: t("SerCode"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "SerName",
        caption: t("SerName"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "ROType",
        caption: t("ROType"),
        visible: true,
        width: 150,
        editorOptions: {
          readOnly: false,
        },
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

        // cellRender: ({ data, key }: any) => {
        //   return <div>{data.ExpenseType}</div>;
        // },
      },

      {
        dataField: "ActManHour",
        caption: t("ActManHour"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        editorType: "dxTextBox",
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
        dataField: "Amount",
        caption: t("Amount"),
        visible: true,
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: true,
        },

        cellRender: ({ data, key }: any) => {
          const total = data.Factor * data.Price;

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
        <h5 className="mt-3">{t("Ser_ServicePackageServiceItems")}</h5>
        <WarningDuplicateForService
          visible={openWarningDuplicate}
          message={`There are ${itemDuplicate} items that cannot be added list items because duplicate SerCode `}
          typeIcon={"warning"}
        />
        <GridViewOne
          ref={gridRef}
          toolbarItems={gridToolbars}
          dataSource={[]}
          columns={columns}
          allowSelection={true}
          allowInlineEdit={true}
          allowMultiRowEdit={false}
          allowCheckDeleteConfirm={true}
          editMode={true}
          editingOptions={{
            mode: "batch",
          }}
          customHeight={windowSize.height - 300}
          onEditorPreparing={onEditorPreparing}
          onRowDeleteBtnClick={(e) => handleDeleteSingleColumn(e)}
          onDeleteMultiBtnClick={handleDeleteMulti}
          keyExpr={"SerCode"}
          storeKey={"Ser_ServicePackageServiceItems-Addnew"}
        ></GridViewOne>
        <PopupSearchServiceIems
          ref={searchServiceItemsPopupRef}
          visible={showSearchServiceItemsPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            showSearchServiceItemsPopup.close();
          }}
          dataInputSearchRef={dataInputSearchRef}
          onSearch={() => handleSearchServiceItems}
          gridMainRef={gridRef}
          onChoose={handleChoose}
          onSelect={handleSelected}
          searchFromData={searchFromData}
          // setSearchFromData={setSearchFromData}
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
