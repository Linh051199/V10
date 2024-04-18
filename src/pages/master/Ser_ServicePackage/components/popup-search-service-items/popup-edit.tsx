import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  ExcludeSpecialCharactersType,
  ExcludeSpecialCharactersTypeAllowDash,
  Only2Number,
  RequiredField,
  RequiredOnlyPositiveInteger,
} from "@/packages/common/Validation_Rules";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { Form, NumberBox, Popup } from "devextreme-react";
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
import { dataServiceItemsQuickEditAtom } from "../screen-atom";
import { toast } from "react-toastify";
import ConfirmComponent from "@/packages/components/ConfirmComponent";

interface IPopupEditProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  handleSearch: any;
  gridRef: any;
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
    }: IPopupEditProps,
    popupRef: any
  ) => {
    const { t } = useI18n("Ser_ServicePackageServiceItems_Search");
    const windowSize = useWindowSize();
    const api = useClientgateApi();
    const dataServiceItemsQuickEdit = useAtomValue(
      dataServiceItemsQuickEditAtom
    );
    console.log(" ~ dataServiceItemsQuickEdit:", dataServiceItemsQuickEdit);

    const showError = useSetAtom(showErrorAtom);

    const showPopup = useVisibilityControl({ defaultVisible: visible });

    const formRef = useRef<Form>(null);
    const ref = useRef<any>(null);
    const serviceItemsRef = useRef<any>(null);
    const partItemsRef = useRef<any>(null);

    const [formData, setFormData] = useState<any>({
      SerID: "",
      TypeID: "",
      SerCode: "",
      SerName: "",
      SerTypeID: "",
      StdManHour: "",
      Cost: "",
      Price: "",
      VAT: "",
      Model: "",
      Note: "",
      IsActive: "",
      FlagWarranty: "",
    });

    useEffect(() => {
      setFormData({
        SerID: dataServiceItemsQuickEdit?.SerID ?? "",
        TypeID: dataServiceItemsQuickEdit?.TypeID ?? "",
        SerCode: dataServiceItemsQuickEdit?.SerCode ?? "",
        SerName: dataServiceItemsQuickEdit?.SerName ?? "",
        SerTypeID: dataServiceItemsQuickEdit?.SerTypeID ?? "",
        StdManHour: dataServiceItemsQuickEdit?.StdManHour ?? "",
        Cost: dataServiceItemsQuickEdit?.Cost ?? "",
        Price: dataServiceItemsQuickEdit?.Price ?? "",
        VAT: dataServiceItemsQuickEdit?.VAT ?? "",
        Model: dataServiceItemsQuickEdit?.Model ?? "",
        Note: dataServiceItemsQuickEdit?.Note ?? "",
        IsActive: dataServiceItemsQuickEdit?.IsActive ?? "",
        FlagWarranty: dataServiceItemsQuickEdit?.FlagWarranty ?? "",
      });
    }, [dataServiceItemsQuickEdit]);

    useImperativeHandle(popupRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showPopup.open();
      },
    }));

    const handleChangeStdManHour = (dataField: string, value: any) => {
      formRef?.current?.instance.updateData(dataField, value);
      if (value) {
        setFormData({
          ...formData,
          Cost: value * 90000,
        });
      }
    };

    //=============================handle===================================
    const handleClose = () => {
      gridRef.current?.getDxInstance()?.cancelEditData();
      gridRef.current?.refetchData();

      setFormData({
        SerID: dataServiceItemsQuickEdit?.SerID ?? "",
        TypeID: dataServiceItemsQuickEdit?.TypeID ?? "",
        SerCode: dataServiceItemsQuickEdit?.SerCode ?? "",
        SerName: dataServiceItemsQuickEdit?.SerName ?? "",
        SerTypeID: dataServiceItemsQuickEdit?.SerTypeID ?? "",
        StdManHour: dataServiceItemsQuickEdit?.StdManHour ?? "",
        Cost: dataServiceItemsQuickEdit?.Cost ?? "",
        Price: dataServiceItemsQuickEdit?.Price ?? "",
        VAT: dataServiceItemsQuickEdit?.VAT ?? "",
        Model: dataServiceItemsQuickEdit?.Model ?? "",
        Note: dataServiceItemsQuickEdit?.Note ?? "",
        IsActive: dataServiceItemsQuickEdit?.IsActive ?? "",
        FlagWarranty: dataServiceItemsQuickEdit?.FlagWarranty ?? "",
      });
      showPopup.close();
      onHidding();
    };

    const handleDelete = async () => {
      ConfirmComponent({
        asyncFunction: async () => {
          const resp = await api.Ser_MST_Service_Ser_ServiceItems_Delete(
            formData?.SerID
          );

          if (resp.isSuccess) {
            toast.success(t("Delete successfully!"));
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
        contentConfirm: t("Do you want to delete ?"),
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

          const resp = await api.Ser_MST_Service_Ser_ServiceItems_Edit({
            SerID: formData?.SerID ?? "",
            TypeID: formData?.TypeID ?? "",
            SerCode: formData?.SerCode ?? "",
            SerName: formData?.SerName ?? "",
            SerTypeID: formData?.SerTypeID ?? "",
            StdManHour: formData?.StdManHour ?? "",
            Cost: formData?.Cost ?? "",
            Price: formData?.Price ?? "",
            VAT: formData?.VAT ?? "",
            Model: formData?.Model ?? "",
            Note: formData?.Note ?? "",
            IsActive: formData?.IsActive ?? "",
          });

          if (resp.isSuccess) {
            toast.success(t("Update successfully!"));

            // setSearchFromData((prev: any) => {
            //   return {
            //     ...prev,
            //     SerCode: formData?.SerCode ?? "",
            //     SerName: formData?.SerName ?? "",
            //   };
            // });
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
            // handleClose();
            // setFormData({
            //   SerID: "",
            //   TypeID: "",
            //   SerCode: "",
            //   SerName: "",
            //   SerTypeID: "",
            //   StdManHour: "",
            //   Cost: "",
            //   Price: "",
            //   VAT: "",
            //   Model: "",
            //   Note: "",
            //   IsActive: "",
            //   FlagWarranty: "",
            // });
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
            validationGroup={"Ser_ServicePackageServiceItems_FormEdit"}
          >
            <GroupItem colCount={2}>
              <GroupItem colCount={1}>
                <SimpleItem
                  label={{
                    text: t("SerCode"),
                  }}
                  // isRequired={true}
                  // validationRules={[
                  //   {
                  //     type: "required",
                  //   },
                  //   RequiredField(t("SerCode")),
                  // ]}
                  // editorOptions={{
                  //   validationMessageMode: "always",
                  // }}
                  dataField={"SerCode"}
                  render={({ component: formInstance, dataField }: any) => {
                    const formData = formInstance.option("formData");
                    const value = formData[dataField];
                    return (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        readOnly
                        // placeholder={t("Input")}
                        // onValueChanged={(e: any) => {
                        //   formInstance.updateData(dataField, e.value);
                        // }}
                        // validationRules={[
                        //   RequiredField(t("SerCodeIsRequired")),
                        //   ExcludeSpecialCharactersTypeAllowDash,
                        // ]}
                        // validationGroup={formInstance.option("validationGroup")}
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
                        readOnly={
                          dataServiceItemsQuickEdit?.FlagWarranty === "0"
                            ? false
                            : true
                        }
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
                        readOnly={
                          dataServiceItemsQuickEdit?.FlagWarranty === "0"
                            ? false
                            : true
                        }
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
                        // onValueChanged={(e: any) => {
                        //   formInstance.updateData(dataField, e.value);
                        // }}
                        readOnly
                        // validationRules={[RequiredField(t("CostIsRequired"))]}
                        // validationGroup={formInstance.option("validationGroup")}
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
                    text: t("FlagWarranty"),
                  }}
                  dataField={"FlagWarranty"}
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
                        readOnly={
                          dataServiceItemsQuickEdit?.FlagWarranty === "0"
                            ? false
                            : true
                        }
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
                        readOnly={
                          dataServiceItemsQuickEdit?.FlagWarranty === "0"
                            ? false
                            : true
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
                        readOnly={
                          dataServiceItemsQuickEdit?.FlagWarranty === "0"
                            ? false
                            : true
                        }
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
                        readOnly={
                          dataServiceItemsQuickEdit?.FlagWarranty === "0"
                            ? false
                            : true
                        }
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
          visible={
            dataServiceItemsQuickEdit?.FlagWarranty === "0" ? true : false
          }
          options={{
            text: t("Delete"),
            type: "default",
            stylingMode: "contained",
            onClick: handleDelete,
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
