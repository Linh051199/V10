import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  ExcludeSpecialCharactersType,
  Only2Number,
  RequiredField,
  RequiredOnlyPositiveInteger,
} from "@/packages/common/Validation_Rules";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { Form, Popup } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { useAtomValue, useSetAtom } from "jotai";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { dataPartItemsQuickEditAtom } from "../screen-atom";
import { toast } from "react-toastify";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { SelectField } from "@/packages/components/select-field";
import { CheckboxField } from "@/packages/components/checkbox-field";

interface IPopupEditProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  handleSearch: any;
  gridRef: any;
  listPartGroupID: any;
  listPartTypeID: any;
}

export const PopupEdit = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      gridRef,
      handleSearch,
      listPartGroupID,
      listPartTypeID,
    }: IPopupEditProps,
    popupRef: any
  ) => {
    const { t } = useI18n("Ser_ServicePackagePartItems_Search");
    const windowSize = useWindowSize();
    const api = useClientgateApi();
    const dataPartItemsQuickEdit = useAtomValue(dataPartItemsQuickEditAtom);
    console.log(" ~ dataPartItemsQuickEdit:", dataPartItemsQuickEdit);
    const showError = useSetAtom(showErrorAtom);

    const showPopup = useVisibilityControl({ defaultVisible: visible });

    const formRef = useRef<Form>(null);
    const ref = useRef<any>(null);

    const [formData, setFormData] = useState({
      PartID: "",
      PartTypeID: "",
      PartGroupID: "",
      PartCode: "",
      VieName: "",
      EngName: "",
      MinQuantity: "",
      Model: "",
      Price: "",
      Cost: "",
      VAT: "",
      Unit: "",
      Location: "",
      Note: "",
      FreqUsed: false,
    });

    useEffect(() => {
      setFormData({
        PartID: dataPartItemsQuickEdit?.PartID ?? "",
        PartTypeID: dataPartItemsQuickEdit?.PartTypeID ?? "",
        PartGroupID: dataPartItemsQuickEdit?.PartGroupID ?? "",
        PartCode: dataPartItemsQuickEdit?.PartCode ?? "",
        VieName: dataPartItemsQuickEdit?.VieName ?? "",
        EngName: dataPartItemsQuickEdit?.EngName ?? "",
        MinQuantity: dataPartItemsQuickEdit?.MinQuantity ?? "",
        Model: dataPartItemsQuickEdit?.Model ?? "",
        Price: dataPartItemsQuickEdit?.Price ?? "",
        Cost: dataPartItemsQuickEdit?.Cost ?? "",
        VAT: dataPartItemsQuickEdit?.VAT ?? "",
        Unit: dataPartItemsQuickEdit?.Unit ?? "",
        Location: dataPartItemsQuickEdit?.Location ?? "",
        Note: dataPartItemsQuickEdit?.Note ?? "",
        FreqUsed: dataPartItemsQuickEdit?.FreqUsed === "0" ? false : true,
      });
    }, [dataPartItemsQuickEdit]);

    useImperativeHandle(popupRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showPopup.open();
      },
    }));

    //=============================handle===================================
    const handleClose = () => {
      gridRef.current?.getDxInstance()?.cancelEditData();
      gridRef.current?.refetchData();
      setFormData({
        PartID: formData?.PartID ?? "",
        PartTypeID: dataPartItemsQuickEdit?.PartTypeID ?? "",
        PartGroupID: dataPartItemsQuickEdit?.PartGroupID ?? "",
        PartCode: dataPartItemsQuickEdit?.PartCode ?? "",
        VieName: dataPartItemsQuickEdit?.VieName ?? "",
        EngName: dataPartItemsQuickEdit?.EngName ?? "",
        MinQuantity: dataPartItemsQuickEdit?.MinQuantity ?? "",
        Model: dataPartItemsQuickEdit?.Model ?? "",
        Price: dataPartItemsQuickEdit?.Price ?? "",
        Cost: dataPartItemsQuickEdit?.Cost ?? "",
        VAT: dataPartItemsQuickEdit?.VAT ?? "",
        Unit: dataPartItemsQuickEdit?.Unit ?? "",
        Location: dataPartItemsQuickEdit?.Location ?? "",
        Note: dataPartItemsQuickEdit?.Note ?? "",
        FreqUsed: dataPartItemsQuickEdit?.FreqUsed === "0" ? false : true,
      });
      showPopup.close();
      onHidding();
    };
    const handleSave = async () => {
      const validate = formRef.current?.instance?.validate();
      if (!validate?.isValid) {
        return;
      }

      ConfirmComponent({
        asyncFunction: async () => {
          const formData = formRef?.current?.props?.formData;

          const resp = await api.SerMSTPart_Ser_PartItems_Edit({
            PartID: formData?.PartID ?? "",
            PartGroupID: formData?.PartGroupID?.toString() ?? "",
            PartTypeID: formData?.PartTypeID?.toString() ?? "",
            PartCode: formData?.PartCode ?? "",
            EngName: formData?.EngName ?? "",
            VieName: formData?.VieName ?? "",
            Note: formData?.Note ?? "",
            Unit: formData?.Unit ?? "",
            Location: formData?.Location ?? "",
            VAT: formData?.VAT?.toString() ?? "",
            Quantity: formData?.Quantity ?? "0",
            MinQuantity:
              formData?.MinQuantity === ""
                ? "0"
                : formData?.MinQuantity.toString(),
            Cost: formData?.Cost?.toString() ?? "",
            Price: formData?.Price?.toString() ?? "",
            Model: formData?.Model ?? "",
            FreqUsed: formData?.FreqUsed ? "1" : "0",
            IsActive: "1",
          });

          if (resp.isSuccess) {
            toast.success(t("Update successfully!"));
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

    //=============================handle-end===================================
    return (
      <Popup
        visible={showPopup.visible}
        title={t("Quick-Edit")}
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
            validationGroup={"Ser_ServicePackagePartItems_FormEdit"}
          >
            <GroupItem colCount={2}>
              <GroupItem colCount={1}>
                <SimpleItem
                  label={{
                    text: t("PartTypeID"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("PartTypeID")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"PartTypeID"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <SelectField
                        width={"100%"}
                        formInstance={formInstance}
                        dataField={dataField}
                        items={listPartTypeID}
                        displayExpr="TypeName"
                        valueExpr="PartTypeID"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        readOnly={
                          dataPartItemsQuickEdit?.FlagInTST === "1"
                            ? true
                            : false
                        }
                        defaultValue={value}
                        showClearButton={false}
                        placeholder={t("Select")}
                        validationRules={[
                          RequiredField(t("PartTypeIDIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                        dropDownOptions={{
                          resizeEnabled: true,
                        }}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PartGroupID"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("PartGroupID")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"PartGroupID"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <SelectField
                        width={"100%"}
                        formInstance={formInstance}
                        dataField={dataField}
                        items={listPartGroupID}
                        displayExpr="GroupName"
                        valueExpr="PartGroupID"
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        defaultValue={value}
                        showClearButton={false}
                        placeholder={t("Select")}
                        validationRules={[
                          RequiredField(t("PartTypeIDIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                        dropDownOptions={{
                          resizeEnabled: true,
                        }}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("PartCode"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("PartCode")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"PartCode"}
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
                        readOnly
                        validationRules={[
                          RequiredField(t("PartCodeIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("VieName"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("VieName")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
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
                        readOnly={
                          dataPartItemsQuickEdit?.FlagInTST === "1"
                            ? true
                            : false
                        }
                        validationRules={[
                          RequiredField(t("VieNameIsRequired")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("EngName"),
                  }}
                  dataField={"EngName"}
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
                    text: t("MinQuantity"),
                  }}
                  dataField={"MinQuantity"}
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
                        readOnly={
                          dataPartItemsQuickEdit?.FlagInTST === "1"
                            ? true
                            : false
                        }
                        validationRules={[
                          // ExcludeSpecialCharactersType,
                          RequiredOnlyPositiveInteger,
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("Model"),
                  }}
                  dataField={"Model"}
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
                        readOnly
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("Cost"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("Cost")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"Cost"}
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
                        readOnly={
                          dataPartItemsQuickEdit?.FlagInTST === "1"
                            ? true
                            : false
                        }
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
                    text: t("Unit"),
                  }}
                  isRequired={true}
                  validationRules={[
                    {
                      type: "required",
                    },
                    RequiredField(t("Unit")),
                  ]}
                  editorOptions={{
                    validationMessageMode: "always",
                  }}
                  dataField={"Unit"}
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
                        readOnly={
                          dataPartItemsQuickEdit?.FlagInTST === "1"
                            ? true
                            : false
                        }
                        validationRules={[RequiredField(t("UnitIsRequired"))]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }}
                ></SimpleItem>
                <SimpleItem
                  label={{
                    text: t("Location"),
                  }}
                  dataField={"Location"}
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
                    text: t("Note"),
                  }}
                  dataField={"Note"}
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
                    text: t("FreqUsed"),
                    visible: false,
                  }}
                  dataField={"FreqUsed"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <div className="mt-3">
                        <CheckboxField
                          label={t("FreqUsed")}
                          dataField={dataField}
                          formInstance={formInstance}
                          defaultValue={
                            formData?.[dataField] == 1 ? true : false
                          }
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                        />
                      </div>
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
