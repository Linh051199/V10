import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  ExcludeSpecialCharactersType,
  ExcludeSpecialCharactersTypeAllowDash,
  ExcludeSpecialCharactersTypeAllowDash2,
  Only2Number,
  RequiredField,
  RequiredOnlyPositiveInteger,
} from "@/packages/common/Validation_Rules";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { Form, NumberBox, Popup } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { toast } from "react-toastify";

interface IPopupAddNewProps {
  visible: boolean;
  container: string;
  formRefMain: any;
  gridRef: any;
  position: "left" | "right";
  onHidding: () => void;
  handleSearch: any;
  searchFromData: any;
}

export const PopupAddNew = forwardRef(
  (
    {
      visible,
      container,
      position,
      gridRef,
      formRefMain,
      onHidding,
      handleSearch,
      searchFromData,
    }: IPopupAddNewProps,
    popupRef: any
  ) => {
    const { t } = useI18n("Ser_ServicePackageServiceItems_Search");
    const windowSize = useWindowSize();
    const showError = useSetAtom(showErrorAtom);
    const api = useClientgateApi();

    const showPopup = useVisibilityControl({ defaultVisible: visible });

    const formRef = useRef<Form>(null);
    const serviceItemsRef = useRef<any>(null);
    const partItemsRef = useRef<any>(null);

    const [formData, setFormData] = useState<any>({
      SerCode: "",
      SerName: "",
      SerTypeID: "",
      StdManHour: "",
      Cost: "",
      Price: "",
      VAT: "",
      Model: "",
      Note: "",
    });

    useImperativeHandle(popupRef, () => ({
      show() {
        showPopup.open();
      },
    }));

    //=============================handle===================================
    const handleClose = () => {
      showPopup.close();
      onHidding();
      setFormData({
        SerCode: "",
        SerName: "",
        SerTypeID: "",
        StdManHour: "",
        Cost: "",
        Price: "",
        VAT: "",
        Model: "",
        Note: "",
      });
    };
    const handleSave = async () => {
      const validate = formRef.current?.instance?.validate();
      if (!validate?.isValid) {
        return;
      }

      ConfirmComponent({
        asyncFunction: async () => {
          const formData = formRef?.current?.props?.formData;
          console.log(" ~ formData:", formData);

          const resp = await api.Ser_MST_Service_Ser_ServiceItems_Add({
            SerCode: formData?.SerCode ?? "",
            SerName: formData?.SerName ?? "",
            SerTypeID: formData?.SerTypeID ?? "",
            StdManHour:
              formData?.StdManHour === "" ? "0" : formData?.StdManHour,
            Cost: formData?.Cost === "" ? "0" : formData?.Cost,
            Price: formData?.Price ?? "",
            VAT: formData?.VAT ?? "",
            Model: formData?.Model ?? "",
            Note: formData?.Note ?? "",
          });

          if (resp.isSuccess) {
            toast.success(t("Create successfully!"));
            // searchFromData.current = {
            //   ...searchFromData?.current,
            //   SerCode: formData?.SerCode ?? "",
            //   SerName: formData?.SerName ?? "",
            // };
            // gridRef?.current?.refetchData();
            // const respone =
            //   await api.Ser_MST_Service_SearchDL_Ser_ServicePackage({
            //     SerID: formData?.SerID ?? "",
            //     DealerCode: formData?.DealerCode ?? "",
            //     SerCode: formData?.SerCode ?? "",
            //     SerName: formData?.SerName ?? "",
            //     CustTypeID: formData?.CustTypeID ?? "",
            //     IsActive: formData?.IsActive ?? "",
            //     Ft_PageIndex: 0,
            //     Ft_PageSize: 100,
            //   });
            // if (respone.isSuccess) {
            //   gridRef?.current?.setData(respone?.DataList);
            // }
            setFormData({
              SerCode: "",
              SerName: "",
              SerTypeID: "",
              StdManHour: "",
              Cost: "",
              Price: "",
              VAT: "",
              Model: "",
              Note: "",
            });
            handleClose();
          } else {
            showError({
              message: t(resp._strErrCode),
              _strErrCode: resp._strErrCode,
              _strTId: resp._strTId,
              _strAppTId: resp._strAppTId,
              _objTTime: resp._objTTime,
              _strType: resp._strType,
              _dicDebug: resp._dicDebug,
              _dicExcs: resp._dicExcs,
            });
          }
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    };

    const handleChangeStdManHour = (dataField: string, value: any) => {
      formRef?.current?.instance.updateData(dataField, value);
      if (value) {
        setFormData({
          ...formData,
          Cost: value * 90000,
        });
      }
    };

    //=============================handle-end===================================
    return (
      <Popup
        visible={showPopup.visible}
        title={t("Quick-AddNew")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 150}
        width={windowSize.width - 200}
      >
        {/* <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isGetDataProvince}
              showIndicator={true}
              showPane={true}
            /> */}
        <div className="h-full">
          <Form
            ref={formRef}
            formData={formData}
            labelLocation={"top"}
            validationGroup={"Ser_ServicePackageServiceItems_FormAdd"}
          >
            <GroupItem colCount={2}>
              <GroupItem colCount={1}>
                <SimpleItem
                  label={{
                    text: t("SerCode"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("SerCode")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"SerCode"}
                  // visible={khanhHang === "1" ? true : false}
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
                          RequiredField(t("SerCodeIsRequired")),
                          ExcludeSpecialCharactersTypeAllowDash2,
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("SerName"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("SerName")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"SerName"}
                  // visible={khanhHang === "1" ? true : false}
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
                          RequiredField(t("SerNameIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("StdManHour"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("StdManHour")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"StdManHour"}
                  // visible={khanhHang === "1" ? true : false}
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
                          handleChangeStdManHour(dataField, e.value);
                        }}
                        validationRules={[
                          RequiredField(t("StdManHourIsRequired")),
                          ExcludeSpecialCharactersType,
                          RequiredOnlyPositiveInteger,
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                      // <div className="ml-2">
                      //   <NumberBox
                      //     onValueChanged={(e: any) => {
                      //       formInstance.updateData(dataField, e.value);
                      //     }}
                      //     placeholder={t("Input")}
                      //     defaultValue={value}
                      //     width={"100%"}
                      //     format={",##0.###"}
                      //   ></NumberBox>
                      // </div>
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("Cost"),
                  }}
                  dataField={"Cost"}
                  // visible={khanhHang === "1" ? true : false}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        // placeholder={t("Input")}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
              </GroupItem>
              <GroupItem colCount={1}>
                <SimpleItem
                  label={{
                    text: t("Price"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("Price")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"Price"}
                  // visible={khanhHang === "1" ? true : false}
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
                          RequiredField(t("PriceIsRequired")),
                          ExcludeSpecialCharactersType,
                          RequiredOnlyPositiveInteger,
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("VAT"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("VAT")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"VAT"}
                  // visible={khanhHang === "1" ? true : false}
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
                          RequiredField(t("VATIsRequired")),
                          ExcludeSpecialCharactersType,
                          RequiredOnlyPositiveInteger,
                          Only2Number,
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("Note"),
                  }}
                  dataField={"Note"}
                  // visible={khanhHang === "1" ? true : false}
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
                    text: t("Model"),
                  }}
                  dataField={"Model"}
                  // visible={khanhHang === "1" ? true : false}
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
              </GroupItem>
            </GroupItem>
          </Form>
        </div>

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
