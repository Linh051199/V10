import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { CheckBox, Form } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { forwardRef, useRef, useState } from "react";
import { PopupAddCar } from "./use-popup-add-car";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useClientgateApi } from "@/packages/api";
import { useQuery } from "@tanstack/react-query";

interface ICarInfoProps {}

export const CarInfo = forwardRef(({}: ICarInfoProps, ref: any) => {
  const { t } = useI18n("Ser_CustomerCar_Edit_CarInfo");
  const windowSize = useWindowSize();
  const showAddCarPopup = useVisibilityControl({ defaultVisible: false });
  const config = useConfiguration();
  const api = useClientgateApi();

  const carInfoRef = useRef<any>(null)

  const addCarPopupRef = useRef<any>(null);

  const [formCarData, setFormCarData] = useState({
    KhanhHang: "1",
    Website: "",
    DOB: "",
  });
  const [formWarrantyData, setFormWarrantyCarData] = useState({
    KhanhHang: "1",
    Website: "",
    DOB: "",
  });

  //=================================callAPI===================================

  //=================================callAPI-end===================================
  //==========================handle======================================
  const handleAddNew = () => {
    addCarPopupRef.current.show();
  };
  const handleDelete = () => {};
  const handleView = () => {};
  //==========================handle======================================

  // =============================Toolbar====================================
  const gridToolbars: ToolbarItemProps[] = [
    {
      location: "before",
      render: () => {
        return <BButton label={t("AddNew")} onClick={() => handleAddNew()} />;
      },
    },
  ];
  // =============================Toolbar-End====================================

  //========================collumns========================

  const columns: ColumnOptions[] = [
    {
      dataField: "MyIdxSeq",
      caption: t("STT"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      cellRender: ({ rowIndex }: any) => {
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      dataField: "PlateNo",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("PlateNo"),
    },
    {
      dataField: "TradeMarkCode",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("TradeMarkCode"),
    },
    {
      dataField: "FrameNo",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("FrameNo"),
    },
    {
      dataField: "EngineNo",
      caption: t("EngineNo"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "ModelName",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("ModelName"),
    },
    {
      dataField: "ColorCode",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("ColorCode"),
    },
    {
      dataField: "ProductYear",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("ProductYear"),
    },

    {
      dataField: "CurrentKm",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("CurrentKm"),
    },
  ];
  //========================collumns-end========================

  return (
    <>
      <GridViewOne
        ref={ref}
        toolbarItems={gridToolbars}
        dataSource={[]}
        columns={columns}
        allowSelection={true}
        allowInlineEdit={true}
        isHidenHeaderFilter={true}
        allowMultiRowEdit={false}
        editMode={true}
        editingOptions={{
          mode: "batch",
        }}
        customHeight={windowSize.height - 300}
        keyExpr={"PlateNo"}
        storeKey={"Ser_CustomerCar_AddNew_CarInfo"}
      />
      <div className="flex items-center gap-4 mt-5 mb-1">
        <span className="text-base">{t("Thông tin xe")}</span>
        <CheckBox
          text={t("Xe không có biển số")}
          // onValueChange={(e) => handleChangeCheckBox(e)}
          // value={checkBox}
        />
        <div>
          <BButton label={t("Sửa")} onClick={() => handleView()} />
          <BButton
            label={t("Xem lịch sử dịch vụ")}
            onClick={() => handleDelete()}
          />
        </div>
      </div>
      <Form id="form" formData={formCarData} labelLocation={"left"}>
        <GroupItem colCount={3}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("PlateNo"),
              }}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"PlateNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("TradeMarkCode"),
              }}
              dataField={"TradeMarkCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    disabled={true}
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ModelName"),
              }}
              dataField={"ModelName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    disabled={true}
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("CurrentKm"),
              }}
              dataField={"CurrentKm"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("FrameNo"),
              }}
              dataField={"FrameNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("EngineNo"),
              }}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"EngineNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ColorCode"),
              }}
              dataField={"ColorCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    disabled={true}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ProductYear"),
              }}
              dataField={"ProductYear"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    disabled={true}
                    // placeholder={t("Input")}
                    dataField={dataField}
                    formInstance={formInstance}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("DateBuyCar"),
              }}
              dataField={"DateBuyCar"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("WarrantyRegistrationDate"),
              }}
              dataField={"WarrantyRegistrationDate"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    disabled={true}
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("WarrantyExpiresDate"),
              }}
              dataField={"WarrantyExpiresDate"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("CusConfirmedWarrantyDate"),
              }}
              dataField={"CusConfirmedWarrantyDate"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    disabled={true}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    // disabled={khanhHang === "1" ?? true}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
      <Form
        id="form"
        formData={formWarrantyData}
        labelLocation={"left"}
        className="mt-3"
      >
        <GroupItem colCount={2} caption={t("Thông tin bảo hiểm theo xe")}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("InsVieName"),
              }}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"InsVieName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("CusName"),
              }}
              dataField={"CusName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ProvinceCode"),
              }}
              dataField={"ProvinceCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    defaultValue={value}
                    disabled={true}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("DistrictCode"),
              }}
              dataField={"DistrictCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    disabled={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
      <PopupAddCar
        ref={addCarPopupRef}
        visible={showAddCarPopup.visible}
        container={".dx-viewport"}
        position={"left"}
        onHidding={() => {
          showAddCarPopup.close();
        }}
        formCarData={formCarData}
        formWarrantyData={formCarData}
        carInfoRef={carInfoRef}
      />
    </>
  );
});
