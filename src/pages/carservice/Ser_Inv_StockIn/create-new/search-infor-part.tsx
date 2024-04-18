import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Popup, ScrollView } from "devextreme-react";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { RequiredRule } from "devextreme-react/form";
import { nanoid } from "nanoid";
import "./style.scss";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useVisibilityControl } from "@/packages/hooks";
import { TextField } from "@/packages/components/text-field";
import Form, { SimpleItem } from "devextreme-react/form";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Button } from "devextreme-react";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import {
  ContentReadyEvent,
  RowClickEvent,
  RowDblClickEvent,
} from "devextreme/ui/data_grid";
import { ModifyForm } from "./modify-form/modify-form";
import HeaderSearchPart from "./header-search-part";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";
interface IProps {
  visible: true | false;
  onRowDblClick: (e: RowDblClickEvent) => void;
}
const SearchInforPart = forwardRef(
  ({ visible, onRowDblClick }: IProps, gridViewOneRef: any) => {
    const { t } = useI18n("SerInvStockIn_SearchInforPartPopup");
    const api = useClientgateApi();
    const refDataGrid = useRef<any>(null);
    const windowSize = useWindowSize();
    const formRef = useRef<Form>(null);
    const formSearchRef = useRef<any>();
    const formModifyRef = useRef<any>(null);
    const showError = useSetAtom(showErrorAtom);
    const showSelectCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });
    let searchCondition = useRef({
      PartCode: "",
      VieName: "",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      PartGroupID: "",
      PartCode: "",
      Model: "",
      Cost: "",
      MinQuantity: "",
      VAT: "",
      VieName: "",
      EngName: "",
      Price: "",
      Unit: "",
      PartTypeID: "",
      FreqUsed: "",
      Note: "",
    });
    useImperativeHandle(gridViewOneRef, () => ({
      getGridViewOneRef() {
        return refDataGrid;
      },
      show() {
        showSelectCarPopup.open();
      },
      close() {
        showSelectCarPopup.close();
      },
    }));

    //
    const fetchData = async () => {
      const formRef = formSearchRef.current.getFormRef();
      // const searchCondition = formRef.current?.instance.option("formData");
      const response = await api.Ser_MST_Part_SearchForSerInvStockInDL({
        ...searchCondition.current,
        Ft_PageIndex: refDataGrid.current.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: refDataGrid.current.getDxInstance().pageSize() ?? 100,
      });
      if (response?.isSuccess) {
        return response;
        // const data = Array.from({ length: 10 }, (x, y) => {
        //   return {
        //     SoKN: `${searchCondition.SearchInforPart}_${Math.random() * 100}`,
        //     NgayTao: `${Math.random() * 100}`,
        //     NgayXuLy: `${Math.random() * 100}`,
        //     DaiLy: `${Math.random() * 100}`,
        //     ChiTiet: `${Math.random() * 100}`,
        //     MoTaXuLy: `${Math.random() * 100}`,
        //   };
        // });
        // return {
        //   DataList: data,
        // };
      } else {
        showError({
          message: t(response._strErrCode),
          _strErrCode: response._strErrCode,
          _strTId: response._strTId,
          _strAppTId: response._strAppTId,
          _objTTime: response._objTTime,
          _strType: response._strType,
          _dicDebug: response._dicDebug,
          _dicExcs: response._dicExcs,
        });
      }
    };

    const columns = useMemo(() => {
      return [
        {
          dataField: "PartID",
          caption: t("PartID"),
          visible: true,
          editorOptions: {
            readOnly: true,
            disabled: true,
          },
        },
        {
          dataField: "PartCode",
          caption: t("PartCode"),
          visible: true,
          editorOptions: {
            readOnly: true,
            disabled: true,
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
          dataField: "EngName",
          caption: t("EngName"),
          visible: true,
          editorOptions: {
            readOnly: true,
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
          dataField: "Cost", // Giá nhập
          caption: t("Cost"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
        {
          dataField: "Price", // Giá hãng
          caption: t("Price"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
        {
          dataField: "VAT", // VAT
          caption: t("VAT"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
        {
          dataField: "Model", // VAT
          caption: t("Model"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
        {
          dataField: "InventoryQuantity",
          caption: t("InventoryQuantity"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
      ];
    }, [visible]);

    const handleSearch = (condition: any) => {
      // onSaveState(condition);
      searchCondition.current = {
        ...searchCondition.current,
        ...condition,
      };
      refDataGrid?.current?.refetchData();
    };
    const handleAddNew = () => {
      toast.info(`add new `);

      // formModifyRef.current.openModifyForm()
      // formModifyRef.current.toggleActive();

      // debugger;

      const formRef = formModifyRef.current.getModifyFormRef();
      formModifyRef.current.openModifyForm();
      setFormData({
        PartGroupID: "",
        PartCode: "",
        Model: "",
        Cost: "",
        MinQuantity: "",
        VAT: "",
        VieName: "",
        EngName: "",
        Price: "",
        Unit: "",
        PartTypeID: "",
        FreqUsed: "",
        Note: "",
      });
      setEditMode((prev) => {
        if (prev === true) return !prev;
        else return prev;
      });
    };

    const handleSaveForm = () => {
      ConfirmComponent({
        asyncFunction: async () => {
          toast.info("Save");
          const formRef = formModifyRef.current.getModifyFormRef();
          const formData = formRef?.current?._instance.option("formData");
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    };
    const formEditRef = useRef<any>(null);

    const handleEdit = () => {
      toast.info(`edit ${editMode}`);
      formModifyRef.current.openModifyForm();
      setEditMode((prev) => {
        if (prev === true) {
          setFormData(formEditRef.current);
          return false;
        } else {
          setFormData(formEditRef.current);
          return true;
          // return prev;
        }
      });
    };
    const handleRowClick = (e: RowClickEvent) => {
      const selectedData = e.data;
      formEditRef.current = {
        PartGroupID: selectedData.PartGroupID ?? "",
        PartCode: selectedData.PartCode ?? "",
        Model: selectedData.Model ?? "",
        Cost: selectedData.Cost ?? "",
        MinQuantity: selectedData.MinQuantity ?? "",
        VAT: selectedData.VAT ?? "",
        VieName: selectedData.VieName ?? "",
        EngName: selectedData.EngName ?? "",
        Price: selectedData.Price ?? "",
        Unit: selectedData.Unit ?? "",
        PartTypeID: selectedData.PartTypeID ?? "",
        FreqUsed: selectedData.FreqUsed ?? "",
        Note: selectedData.Note ?? "",
      };

      if (editMode) {
        setTimeout(() => {
          setFormData({
            PartGroupID: selectedData.PartGroupID ?? "",
            PartCode: selectedData.PartCode ?? "",
            Model: selectedData.Model ?? "",
            Cost: selectedData.Cost ?? "",
            MinQuantity: selectedData.MinQuantity ?? "",
            VAT: selectedData.VAT ?? "",
            VieName: selectedData.VieName ?? "",
            EngName: selectedData.EngName ?? "",
            Price: selectedData.Price ?? "",
            Unit: selectedData.Unit ?? "",
            PartTypeID: selectedData.PartTypeID ?? "",
            FreqUsed: selectedData.FreqUsed ?? "",
            Note: selectedData.Note ?? "",
          });

          // formRef?.current?.instance.updateData( {....});
          // formRef?.current?.instance.repaint();
        }, 300);
      } else {
        // formModifyRef.current.closeModifyForm();
        return;
      }
    };
    const toolbarItems: GridCustomToolBarItem[] = [];
    return (
      <Popup
        visible={showSelectCarPopup.visible}
        title={t("SerInvStockIn_SearchInforPartPopup")}
        showCloseButton={true}
        onHiding={() => {
          showSelectCarPopup.close();
        }}
        wrapperAttr={{
          id: "SearchInforPart_Popup",
        }}
        height={"98%"}
        // height={"auto"}
        width={"98%"}
        // fullScreen={true}
      >
        <ScrollView showScrollbar="onScroll" height={windowSize.height - 150}>
          <HeaderSearchPart
            mode={editMode}
            searchCondition={searchCondition.current}
            ref={formSearchRef}
            // handleSearch={handleSearch}
            onSearch={handleSearch}
            // searchFields={searchFields}
            handleAddNew={handleAddNew}
            handleEdit={handleEdit}
          />
          <GridViewOne
            ref={refDataGrid}
            isHiddenCheckBox={true}
            // customHeight={window.innerHeight - 600} // 100%
            customHeight={300}
            editMode={false}
            fetchData={fetchData}
            autoFetchData={true}
            allowSelection={false}
            onRowDblClick={onRowDblClick}
            focusedRowEnabled={true}
            onRowClick={handleRowClick}
            isLoading={false}
            allowMultiRowEdit={true}
            dataSource={[]}
            columns={columns}
            customToolbarItems={toolbarItems}
            keyExpr={"PartID"}
            id="SearchInforPart"
            storeKey={"SerInvStockIn_SearchInforPartPopup"}
          />

          <ModifyForm
            ref={formModifyRef}
            dataForm={formData}
            onSaveForm={handleSaveForm}
          />
        </ScrollView>
      </Popup>
    );
  }
);

export default SearchInforPart;

{
  // const searchFields: any[] = [
  //   {
  //     visible: true,
  //     dataField: "SearchInforPart",
  //     label: {
  //       text: t("SearchInforPart"),
  //       visible: false,
  //     },
  //     cssClass: "dms-form-field",
  //     render: (param: any) => {
  //       const { dataField, component: formComponent } = param;
  //       const formData = formComponent.option("formData");
  //       const value = formData[dataField];
  //       return (
  //         <div className={"flex flex-row dms-form-field"}>
  //           <TextField
  //             dataField={dataField}
  //             formInstance={formComponent}
  //             defaultValue={textRef.current}
  //             onValueChanged={(e: any) => {
  //               textRef.current = e.value;
  //               formComponent.updateData(dataField, e.value);
  //             }}
  //             placeholder={t("Input")}
  //           />
  //         </div>
  //       );
  //     },
  //   },
  // ];
  /* <div className="flex">
            <form className={"min-w-[300px]"} onSubmit={handleSearch}>
              <Form
                ref={formRef}
                formData={{
                  SearchInforPart: textRef.current,
                }}
                colCount={1}
                scrollingEnabled={true}
                validationGroup={"form"}
                showValidationSummary={true}
              >
                {searchFields
                  .filter((f) => f.visible)
                  .map((field, index) => {
                    const found = searchFields.find(
                      (f) => f.dataField == field.dataField
                    );
                    return <SimpleItem key={index} {...found} />;
                  })}
              </Form>
            </form>
            <Button
              text={t("Search")}
              onClick={handleSearch}
              type={"default"}
              stylingMode={"contained"}
            ></Button>
            <Button
              text={t("AddNew")}
              onClick={handleAddNew}
              type={"default"}
              stylingMode={"contained"}
            ></Button>
            <Button
              text={t("Edit")}
              onClick={handleEdit}
              type={"default"}
              stylingMode={"contained"}
            ></Button>
          </div> */
}
