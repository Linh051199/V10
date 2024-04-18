import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CheckBox, Form, Popup } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface IPopupAddCarProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  formCarData: any;
  formWarrantyData: any;
  carInfoRef: any;
}

export const PopupAddCar = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      formWarrantyData,
      formCarData,
      carInfoRef,
    }: IPopupAddCarProps,
    addCarRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_Edit_CarInfo");
    const { t: validateMsg } = useI18n("Validate");
    const windowSize = useWindowSize();
    const api = useClientgateApi();
    const config = useConfiguration();

    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });

    const ref = useRef<any>(null);

    useImperativeHandle(addCarRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showUploadPopup.open();
      },
    }));

    const [listModelName, setListModelName] = useState<any>([]);

    //=================================callAPI===================================
    const { data: listTradeMarkCode, isLoading: isGetDataTradeMarkCode } =
      useQuery(
        ["listTradeMarkCode-Ser_CustomerCar_AddNew"],
        () =>
          api.Ser_Mst_TradeMark_SearchDL({
            IsActive: "1",
            DealerCode: "",
            TradeMarkCode: "",
            TradeMarkName: "",
            Ft_PageIndex: 0,
            Ft_PageSize: config.MAX_PAGE_ITEMS,
          } as any),
        {}
      );

    //=================================callAPI-end===================================

    //=============================handle===============================================
    const handleClose = () => {
      showUploadPopup.close();
      onHidding();
    };
    const handleSave = () => {};
    const handleChangeTradeMarkCode = async (e: string) => {
      const resp = await api.Ser_MST_Model_SearchDL({
        TradeMarkCode: e,
        ModelName: "",
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      });
      if (resp.isSuccess) {
        setListModelName(resp?.DataList);
      }
    };
    //=============================handle-end===============================================
    return (
      <Popup
        visible={showUploadPopup.visible}
        title={t("AddCar")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 100}
        width={windowSize.width - 100}
      >
        {/* <LoadPanel
          container={".dx-viewport"}
          shadingColor="rgba(0,0,0,0.4)"
          position={"center"}
          visible={isProcessing}
          showIndicator={true}
          showPane={true}
        /> */}
        <div className="flex items-center gap-4 mb-1">
          <span className="text-base">{t("Thông tin xe")}</span>
          <CheckBox
            text={t("Xe không có biển số")}
            // onValueChange={(e) => handleChangeCheckBox(e)}
            // value={checkBox}
          />
        </div>
        <Form
          ref={carInfoRef}
          id="form"
          formData={formCarData}
          labelLocation={"left"}
        >
          <GroupItem colCount={3}>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("PlateNo"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("PlateNo")),
                ]}
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
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      placeholder={t("Input")}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      validationRules={[
                        RequiredField(validateMsg("PlateNo is required")),
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("TradeMarkCode"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("TradeMarkCode")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"TradeMarkCode"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <SelectField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      items={listTradeMarkCode?.DataList}
                      displayExpr="TradeMarkName"
                      valueExpr="TradeMarkCode"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                        handleChangeTradeMarkCode(e.value);
                      }}
                      defaultValue={value}
                      showClearButton={false}
                      placeholder={t("Select")}
                      validationRules={[
                        RequiredField(t("TradeMarkCodeIsRequired")),
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
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
                    <SelectField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      items={listModelName}
                      displayExpr="ModelName"
                      valueExpr="ModelID"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      defaultValue={value}
                      showClearButton={false}
                      placeholder={t("Select")}
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
                      defaultValue={value}
                      disabled={true}
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
                  text: t("FrameNo"),
                }}
                dataField={"FrameNo"}
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
                      dataField={dataField}
                      formInstance={formInstance}
                      placeholder={t("Input")}
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
                      placeholder={t("Input")}
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
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      placeholder={t("Select")}
                      width={"100%"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(
                          dataField,
                          e.value ? format(e.value, "yyyy-MM-dd") : null
                        );
                      }}
                      displayFormat={"yyyy-MM-dd"}
                      // disabled={khanhHang === "2" ?? true}
                      // calendarOptions={{
                      //   maxZoomLevel: "month",
                      // }}
                    ></DateField>
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
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      width={"100%"}
                      disabled={true}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(
                          dataField,
                          e.value ? format(e.value, "yyyy-MM-dd") : null
                        );
                      }}
                      displayFormat={"yyyy-MM-dd"}
                      // disabled={khanhHang === "2" ?? true}
                      // calendarOptions={{
                      //   maxZoomLevel: "month",
                      // }}
                    ></DateField>
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
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      width={"100%"}
                      disabled={true}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(
                          dataField,
                          e.value ? format(e.value, "yyyy-MM-dd") : null
                        );
                      }}
                      displayFormat={"yyyy-MM-dd"}
                      // disabled={khanhHang === "2" ?? true}
                      // calendarOptions={{
                      //   maxZoomLevel: "month",
                      // }}
                    ></DateField>
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
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      disabled={true}
                      width={"100%"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(
                          dataField,
                          e.value ? format(e.value, "yyyy-MM-dd") : null
                        );
                      }}
                      displayFormat={"yyyy-MM-dd"}
                      // disabled={khanhHang === "2" ?? true}
                      // calendarOptions={{
                      //   maxZoomLevel: "month",
                      // }}
                    ></DateField>
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

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Save"),
            type: "default",
            stylingMode: "contained",
            onClick: handleSave,
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: handleClose,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
