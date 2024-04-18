import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useI18n } from "@/i18n/useI18n"; 
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { BButton } from "@/packages/components/buttons";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { TextField } from "@/packages/components/text-field";
import "../Mst_InventoryCusReturn.scss";
import { SelectField } from "@/packages/components/select-field";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
export const PopupInputLocation = forwardRef(({}, ref: any) => {
  const { t } = useI18n("PopupInputLocation");
  const [open, setOpen] = useState(false);
  const gridRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    setOpenPopup() {
      setOpen(true);
    },
  }));
  const onHidding = () => {
    setOpen(false);
  };
  const handleDropdownShowing = (e: any) => {
    const popup = e.component; // Access the popup instance

    popup.option("toolbarItems", [
      {
        widget: "dxButton",
        options: {
          location: "bottom",
          text: "Tìm kiếm thêm",
          icon: "plus", // Optional icon
          onClick: () => setOpen(true),
        },
      },
    ]);
  };
  const handleSelect = () => {};
  const windowSize = useWindowSize();
  const columns: ColumnOptions[] = [
    {
      dataField: "MyIdxSeq",
      caption: t("MyIdxSeq"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      cellRender: (e: any) => {
        const {
          component: gridInstance,
          value,
          column: { dataField },
          rowIndex,
          columnIndex,
        } = e;

        return (
          <SelectField
            className="Mst_Inventory_SelectField"
            width={"100%"}
            items={[
              { text: t("--Chọn ví trí--"), value: "0" },
              { text: t("Trả thẳng"), value: "1" },
              { text: t("Trả góp"), value: "2" },
            ]}
            placeholder={t("Select")}
            showClearButton={false}
            defaultValue={"0"}
            dropDownOptions={{
              onShowing: (e: any) => handleDropdownShowing(e),
              height: "auto",
              // wrapperAttr: {
              //   class: "demo-dropdown",
              // },
            }}
            dataField={dataField}
            formInstance={gridInstance}
            onValueChanged={(ev: any) => {
              gridInstance.cellValue(rowIndex, dataField, ev.value);
              gridInstance.saveEditData();
            }}

            // validationRules={[
            //   RequiredField(validateMsg("PmtType is required ")),
            // ]}
            // validationGroup={formInstance.option("validationGroup")}
          />
        );
      },
    },
    {
      dataField: "CarId",
      caption: t("CarId"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      cellRender: (e: any) => {
        const {
          component: gridInstance,
          value,
          column: { dataField },
          rowIndex,
          columnIndex,
        } = e;

        return (
          <TextField
            className="Mst_Inventory_TextField"
            formInstance={gridInstance}
            dataField={dataField}
            defaultValue={value}
            readOnly={false}
            width={"100%"}
            onValueChanged={(ev: any) => {
              gridInstance.cellValue(rowIndex, dataField, ev.value);
              gridInstance.saveEditData();
            }}
          />
        );
      },
    },
  ];

  const subGridToolbars: IToolbarItemProps[] = [];
  const dataFake = [
    {
      MyIdxSeq: "0",
      CarId: "22222",
      DealerCode: "33333",
    },
  ];
  const handleAddNew = () => {
    gridRef.current.addData([
      {
        MyIdxSeq: "0",
        CarId: "",
        DealerCode: "",
      },
    ]);
  };
  return (
    <Popup
      visible={open}
      width={600}
      height={400}
      title={t("PopupInputLocation")}
      showCloseButton={true}
      onHiding={onHidding}
      wrapperAttr={{
        class: "search-car-popup",
      }}
    >
      <div className="h-full">
        <GridViewOne
          customHeight={"300px"}
          isHiddenCheckBox={true}
          isHidenHeaderFilter={true}
          ref={gridRef}
          keyExpr={"CarId"}
          dataSource={dataFake ?? []}
          columns={columns}
          isLoading={false}
          autoFetchData={false}
          allowSelection={false}
          storeKey={"Mst_CarDocReqDL-createNew-List"}
          fetchData={() => {}}
          editMode={true}
          editingOptions={{
            mode: "row",
            allowUpdating: false,
          }}
          toolbarItems={subGridToolbars}
          // onSelectionGetData={handleSelectionChanged}
        />
      </div>
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"before"}
        options={{
          text: t("AddNew"),
          type: "default",
          stylingMode: "contained",
          onClick: handleAddNew,
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Select"),
          type: "default",
          stylingMode: "contained",
          onClick: handleSelect,
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Cancel"),
          onClick: onHidding,
          elementAttr: {
            class: "search-car-popup cancel-button",
          },
        }}
      />
    </Popup>
  );
});
