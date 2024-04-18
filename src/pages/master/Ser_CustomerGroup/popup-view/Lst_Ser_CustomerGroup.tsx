import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ToolbarItemProps } from "@/types";
import { DataGrid, Form } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { useAtom, useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useVisibilityControl } from "@/packages/hooks";
import { differenceBy, intersectionBy } from "lodash-es";
import { openPopupWarningDuplicateCreateAtom } from "@/packages/ui/warning-duplicate-create/atom";
import { WarningDuplicateCreate } from "@/packages/ui/warning-duplicate-create/WarningDuplicateCreate";

interface ILst_Ser_CustomerGroupProps {}

export const Lst_Ser_CustomerGroup = forwardRef(
  ({}: ILst_Ser_CustomerGroupProps, ref: any) => {
    const { t } = useI18n("Ser_CustomerGroup_View_Lst_Ser_CustomerGroup");
    const windowSize = useWindowSize();
    const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
    const api = useClientgateApi();

    const showSearchLstCusPopup = useVisibilityControl({
      defaultVisible: false,
    });
    const [openWarningDuplicate, setOpenWarningDuplicate] = useAtom(
      openPopupWarningDuplicateCreateAtom
    );

    let gridRef: any = useRef<DataGrid | null>(null);
    const dataInputSearchRef = useRef<Form>(null);
    const searchLstPopupRef = useRef<any>(null);

    const [formDataInput, setformDataInput] = useState({
      CusName: "",
    });
    const [itemDuplicate, setitemDuplicate] = useState<number>(0);
    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return gridRef;
      },
    }));
    //============================Handle====================================
    const handleSearchServiceItems = async () => {
      const respone = await api.Ser_CustomerCar_SearchDL({
        CusID: "",
        CusName: dataInputSearchRef?.current?.props?.formData?.CusName,
        DealerCode: "",
        Address: "",
        Phone: "",
        PlateNo: "",
        FrameNo: "",
        EngineNo: "",
        TradeMarkCode: "",
        ModelId: "",
        Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 20,
      });
      if (respone.isSuccess) {
        searchLstPopupRef?.current
          .getGridViewOneRef()
          ?.current?.setData(respone?.DataList);
        searchLstPopupRef.current.show();
      } else {
        showError({
          message: t(respone._strErrCode),
          _strErrCode: respone._strErrCode,
          _strTId: respone._strTId,
          _strAppTId: respone._strAppTId,
          _objTTime: respone._objTTime,
          _strType: respone._strType,
          _dicDebug: respone._dicDebug,
          _dicExcs: respone._dicExcs,
        });
      }
    };
    const handleDeleteSingleColumn = (e: any) => {
      // ConfirmComponent({
      //   asyncFunction: async () => {
      //     const row: any = [];
      //     row.push(e.row.data);
      //     const data = gridRef.current.getVisibleData();
      //     const differentArray = differenceBy(data, row, "SerCode");
      //     gridRef.current.setData(differentArray);
      //     handleUpdateTotal(differentArray);
      //   },
      //   title: t("Confirm"),
      //   contentConfirm: t("Do you want to delete?"),
      // });
    };
    const handleDeleteMulti = (e: any) => {
      // ConfirmComponent({
      //   asyncFunction: async () => {
      //     const selectedRows = gridRef.current.getSelectedRowsData();
      //     const data = gridRef.current.getVisibleData();
      //     const differentArray = differenceBy(data, selectedRows, "SerCode");
      //     gridRef.current.setData(differentArray);
      //     handleUpdateTotal(differentArray);
      //   },
      //   title: t("Confirm"),
      //   contentConfirm: t("Do you want to delete?"),
      // });
    };

    const handleChoose = (data: any) => {
      const oldData = gridRef?.current?.getVisibleData();
      const count = intersectionBy(data, oldData, "CusID");
      const differentArray = differenceBy(data, oldData, "CusID");
      setitemDuplicate(count.length);
      if (count.length) {
        setOpenWarningDuplicate(true);
      }
      const dataNew = [...oldData, ...differentArray];
      gridRef.current.setData(dataNew);

      searchLstPopupRef.current.close();
    };

    const handleSelected = (data: any) => {
      const oldData = gridRef?.current?.getVisibleData();
      const count = intersectionBy(data, oldData, "CusID");
      const differentArray = differenceBy(data, oldData, "CusID");
      setitemDuplicate(count.length);
      if (count.length) {
        setOpenWarningDuplicate(true);
      }
      const dataNew = [...oldData, ...differentArray];
      gridRef.current.setData(dataNew);
    };
    //============================Handle-end====================================

    // =============================Toolbar====================================
    const gridToolbars: ToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return (
            <div className="flex flex-row">
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
                    text: t("CusName"),
                    visible: false,
                  }}
                  dataField={"CusName"}
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
        dataField: "MyIdxSeq",
        caption: t("STT"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        alignment: "center",
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },

      {
        dataField: "CusName",
        visible: true,
        caption: t("CusName"),
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Address",
        caption: t("Address"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Mobile",
        caption: t("Mobile"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Description",
        caption: t("Description"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
    ];
    //========================collumns-end========================

    return (
      <>
        <WarningDuplicateCreate
          visible={openWarningDuplicate}
          message={`There are ${itemDuplicate} items that cannot be added list items because duplicate SerCode `}
          typeIcon={"warning"}
        />
        <GridViewOne
          ref={gridRef}
          dataSource={[]}
          columns={columns}
          allowSelection={true}
          allowInlineEdit={true}
          isHiddenCheckBox
          allowMultiRowEdit={false}
          allowCheckDeleteConfirm={true}
          editMode={false}
          customHeight={windowSize.height - 300}
          // onEditorPreparing={onEditorPreparing}
          onRowDeleteBtnClick={(e) => handleDeleteSingleColumn(e)}
          onDeleteMultiBtnClick={handleDeleteMulti}
          keyExpr={"CusID"}
          storeKey={"Ser_CustomerGroup_View_Lst_Ser_CustomerGroup"}
        ></GridViewOne>
      </>
    );
  }
);
