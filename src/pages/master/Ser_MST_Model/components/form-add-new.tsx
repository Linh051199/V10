import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import React, { useImperativeHandle, useRef } from "react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
//
import Form, { GroupItem, Item, SimpleItem } from "devextreme-react/form";
import { TextField } from "@packages/components/text-field";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { SelectField } from "@/packages/components/select-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useVisibilityControl } from "@/packages/hooks";
import { toast } from "react-toastify";
import { RequiredField } from "@/packages/common/Validation_Rules";
//

interface Props {
  visible: boolean;
  listModelCode: any;
  listTradeMarkCode: any;
  gridRef: any;
  //   handleSelect: any;
}

const FormAddNew = forwardRef(
  (
    {
      gridRef,
      visible,
      listModelCode,
      listTradeMarkCode,
    }: // handleSelect
    Props,
    ref: any
  ) => {
    const { t } = useI18n("Ser_MST_Model");
    const showError = useSetAtom(showErrorAtom);
    console.log("re render");
    const api = useClientgateApi();
    const windowSize = useWindowSize();
    const modelCodeRef = useRef<any>();
    const showSelectCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });
    //   const readOnly = useRef("");
    const formRef = useRef<any>();
    const [readOnly, setReadOnly] = useState("OTHER");
    const [formData, setFormData] = useState({
      TradeMarkCode: "",
      ModelCode: "",
      ProductionCode: "",
      ModelName: "",
    });
    useImperativeHandle(ref, () => ({
      getGridRef() {
        return formRef;
      },
      openSearchCar() {
        showSelectCarPopup.open();
      },
      closeSearchCar() {
        showSelectCarPopup.close();
      },
    }));

    const handleSelect = async () => {
      const validate = formRef.current?.instance.validate();
      if (!validate?.isValid) {
        return;
      }
      const response: any = await api.Ser_MST_Model_CreateDL({
        TradeMarkCode: formData.TradeMarkCode ?? "",
        ProductionCode: formData.ProductionCode ?? "",
        ModelName: formData.ModelName ?? "",
        ModelCode: formData.ModelCode === "" ? "OTHER" : formData.ModelCode,
      });

      if (response.isSuccess) {
        toast.success(t("Create successfully!"));
        showSelectCarPopup.close();
        gridRef.current?.refetchData();
        setFormData({
          TradeMarkCode: "",
          ModelCode: "",
          ProductionCode: "",
          ModelName: "",
        });
        setReadOnly("OTHER");
        return true;
      }
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
    };

    return (
      <div>
        <Popup
          //   visible={visible}
          title={t("Ser_MST_Model_Information")}
          showCloseButton={true}
          width={800}
          height={420}
          wrapperAttr={{
            id: "overflow-y-hidden-popup-screen-admin",
          }}
          visible={showSelectCarPopup.visible}
          onHiding={() => {
            setFormData({
              TradeMarkCode: "",
              ModelCode: "",
              ProductionCode: "",
              ModelName: "",
            });
            showSelectCarPopup.close();
          }}
        >
          {/* <Position
          at={`${position} top`}
          my={`${position} top`}
          of={`${container}`}
          offset={{ x: 150, y: 100 }}
        /> */}

          <form className={"h-full  min-w-[300px]"} onSubmit={handleSelect}>
            <Form
              ref={formRef}
              colCount={1}
              formData={formData}
              //   formData={formData}
              labelLocation={"top"}
              validationGroup={"main"}
              // onOptionChanged={(e) => {
              //   e.component.updateData("ModelCode", "OTHER");
              // }}
            >
              <Item
                label={{
                  text: t("TradeMarkCode"),
                  // visible: false,
                }}
                dataField={"TradeMarkCode"}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("TradeMarkCode")),
                ]}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <SelectField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      items={listTradeMarkCode ?? []}
                      valueExpr={"TradeMarkCode"}
                      displayExpr={"TradeMarkCode"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                        if (e.value?.toUpperCase() !== "HYUNDAI") {
                          setFormData((prev) => {
                            return {
                              ...prev,
                              ModelCode: "OTHER",
                            };
                          });
                        }
                        // readOnly.current = e.value;
                        setReadOnly(e.value);
                      }}
                      // defaultValue={value}
                      showClearButton={true}
                      placeholder={t("Select")}
                      validationRules={[RequiredField(t("TradeMarkCode"))]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></Item>

              <Item
                label={{
                  text: t("ModelCode"),
                  // visible: false,
                }}
                dataField={"ModelCode"}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("ModelCode")),
                ]}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <SelectField
                      ref={modelCodeRef}
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      readOnly={
                        // readOnly?.toUpperCase() !== "HYUNDAI" ? true : false
                        readOnly?.toUpperCase() !== "HYUNDAI" ? true : false
                      }
                      items={listModelCode ?? []}
                      valueExpr={"ModelCode"}
                      displayExpr={(e: any) => {
                        return e?.ModelCode
                          ? `${e?.ModelCode} - ${e?.ModelName}`
                          : "";
                      }}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      defaultValue={
                        // readOnly?.toUpperCase() !== "HYUNDAI" ? "OTHER" : ""
                        readOnly?.toUpperCase() !== "HYUNDAI" ? "OTHER" : ""
                      }
                      value={
                        // readOnly?.toUpperCase() !== "HYUNDAI" ? "OTHER" : ""
                        readOnly?.toUpperCase() !== "HYUNDAI" ? "OTHER" : ""
                      }
                      showClearButton={true}
                      placeholder={t("Select")}
                      validationRules={[RequiredField(t("ModelCode"))]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></Item>

              <Item
                label={{
                  text: t("ProductionCode"),
                  // visible: false,
                }}
                dataField={"ProductionCode"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                        // setFormData((prev) => {
                        //   return { ...prev, ProductionCode: e.value };
                        // });
                      }}
                      defaultValue={value}
                      //   showClearButton={true}
                      placeholder={t("")}
                    />
                  );
                }}
              ></Item>
              <Item
                label={{
                  text: t("ModelName"),
                  // visible: false,
                }}
                dataField={"ModelName"}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("ModelName")),
                ]}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                        // setFormData((prev) => {
                        //   return { ...prev, ModelName: e.value };
                        // });
                      }}
                      defaultValue={value}
                      //   showClearButton={true}
                      placeholder={t("")}
                      validationRules={[RequiredField(t("ModelName"))]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></Item>
            </Form>
          </form>

          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: t("Save"),
              type: "default",
              stylingMode: "contained",
              //   onClick: () => {},
              onClick: () => {
                handleSelect();
              },
            }}
          />
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: t("Cancel"),
              onClick: () => {
                showSelectCarPopup.close();
              },
              //   onClick: onHidding,
              elementAttr: {
                class: "search-car-popup cancel-button",
              },
            }}
          />
        </Popup>
      </div>
    );
  }
);

export default FormAddNew;
