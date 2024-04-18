import { useI18n } from "@/i18n/useI18n";
import {
  RequiredDateBoxCompareToNow,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import { DateField } from "@/packages/components/date-field";
import { DateRangeField } from "@/packages/components/date-range-field";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { FlagActiveEnum, SearchParam } from "@/packages/types";
import { useClientgateApi } from "@packages/api";
import { TextField } from "@packages/components/text-field";
import { SelectField } from "@/packages/components/select-field";
import { showErrorAtom } from "@packages/store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useAtomValue, useSetAtom } from "jotai";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { permissionAtom } from "@/packages/store/permission-store";
import { formatDateFollowYM } from "@/packages/common/date_utils";
import { readOnlyAtom } from "../store";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { Button, NumberBox, Popup, ScrollView } from "devextreme-react";
import { toast } from "react-toastify";
import "./modify-form.scss";
interface ModifyFormProps {
  ref: string;
  dataForm: any;
  onSaveForm: (data: any) => void;
}
const orderType = [
  {
    label: "Kế hoạch",
    value: "P",
  },
  {
    label: "NgoàiKH",
    value: "U",
  },
];
export const ModifyForm = forwardRef(
  ({ dataForm, onSaveForm }: ModifyFormProps, ref: any) => {
    const readOnly = useAtomValue(readOnlyAtom);
    const { t } = useI18n("SerInvStockIn_ModifyForm");
    const { t: validateMsg } = useI18n("Validate");
    const [disabled, setDisabled] = useState(false);
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    const permissionStore = useAtomValue(permissionAtom);
    const showModifyForm = useVisibilityControl({ defaultVisible: false });
    const modifyFormRef = useRef<any>();
    // show/hide form
    useImperativeHandle(ref, () => ({
      isActive() {
        return showModifyForm;
      },
      toggleActive() {
        return showModifyForm.visible
          ? this.closeModifyForm()
          : this.openModifyForm();
      },
      getModifyFormRef() {
        return modifyFormRef;
      },
      openModifyForm() {
        // set Trạng thái mở của popup
        showModifyForm.open();
      },
      closeModifyForm() {
        // set Trạng thái đóng của popup
        showModifyForm.close();
      },
    }));

    const { data: listPartGroupID } = useQuery(
      ["listPartGroupID", "Ser_Inv_StockIn"],
      async () => {
        const resp = await api.Ser_MST_PartGroup_GetAllActive();
        if (resp.isSuccess) {
          return resp.DataList;
        } else {
          return [];
        }
      }
    );
    const { data: listPartTypeID } = useQuery(
      ["listPartTypeID", "Ser_Inv_StockIn"],
      async () => {
        const resp = await api.Ser_MST_PartType_GetAllActive();
        if (resp.isSuccess) {
          return resp.DataList;
        } else {
          return [];
        }
      }
    );

    return (
      <div className={"p-2"}>
        <Popup
          visible={showModifyForm.visible}
          title={t("SerInvStockIn_SearchInforPartPopup")}
          showCloseButton={true}
          onHiding={() => {
            showModifyForm.close();
          }}
          wrapperAttr={{
            id: "SearchInforPart_Popup",
          }}
          height={"60%"}
          // height={"auto"}
          width={"60%"}
          // fullScreen={true}
        >
          <Form
            visible={showModifyForm.visible}
            ref={modifyFormRef}
            colCount={2}
            formData={dataForm}
            readOnly={readOnly}
            labelLocation={"left"}
            validationGroup={"main"}
          >
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("PartGroupID"),
                }}
                dataField={"PartGroupID"} // Loại vật tư
                // isRequired={true}
                // validationRules={[
                //   {
                //     type: "required",
                //   },
                //   RequiredField(validateMsg("PartGroupID")),
                // ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const readOnly = formInstance.option("readOnly");

                  return (
                    <SelectField
                      width={"100%"}
                      dataField={dataField}
                      defaultValue={formData?.[dataField]}
                      formInstance={formInstance}
                      items={listPartGroupID}
                      displayExpr={"GroupName"}
                      valueExpr={"PartGroupID"}
                      onValueChanged={async (e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      // validationGroup={formInstance.option("validationGroup")}
                      // validationRules={[RequiredField(validateMsg("PartGroupID"))]}
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
                  RequiredField(validateMsg("PartCode")),
                ]}
                dataField={"PartCode"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
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
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("Cost"),
                }}
                dataField={"Cost"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className={"owe-number-field flex flex-row"}>
                      <NumberBox
                        // readOnly
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        // formInstance={formInstance}
                        // dataField={dataField}
                        defaultValue={value}
                        width={"100%"}
                        format={",##0.###"}
                      ></NumberBox>
                    </div>

                    // <TextField
                    //   formInstance={formInstance}
                    //   dataField={dataField}
                    //   defaultValue={value}
                    //   width={"100%"}
                    // />
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
                    <div className={"owe-number-field flex flex-row"}>
                      <NumberBox
                        // readOnly
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        // formInstance={formInstance}
                        // dataField={dataField}
                        defaultValue={value}
                        width={"100%"}
                        format={",##0.###"}
                      ></NumberBox>
                    </div>

                    // <TextField
                    //   formInstance={formInstance}
                    //   dataField={dataField}
                    //   defaultValue={value}
                    //   width={"100%"}
                    // />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("Quantity"),
                }}
                dataField={"Quantity"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className={"owe-number-field flex flex-row"}>
                      <NumberBox
                        // readOnly
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        // formInstance={formInstance}
                        // dataField={dataField}
                        defaultValue={value}
                        width={"100%"}
                        format={",##0.###"}
                      ></NumberBox>
                    </div>

                    // <TextField
                    //   formInstance={formInstance}
                    //   dataField={dataField}
                    //   defaultValue={value}
                    //   width={"100%"}
                    // />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("VAT"),
                }}
                dataField={"VAT"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className={"owe-number-field flex flex-row"}>
                      <NumberBox
                        // readOnly
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        // formInstance={formInstance}
                        // dataField={dataField}
                        defaultValue={value}
                        width={"100%"}
                        format={",##0.###"}
                      ></NumberBox>
                    </div>

                    // <TextField
                    //   formInstance={formInstance}
                    //   dataField={dataField}
                    //   defaultValue={value}
                    //   width={"100%"}
                    // />
                  );
                }}
              ></SimpleItem>
            </GroupItem>

            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("VieName"),
                }}
                dataField={"VieName"}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(validateMsg("VieName")),
                ]}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
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
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
                    />
                  );
                }}
              ></SimpleItem>
              <SimpleItem
                label={{
                  text: t("Price"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(validateMsg("Price")),
                ]}
                dataField={"Price"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className={"modify-form-number-field flex flex-row"}>
                      <NumberBox
                        // readOnly
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        // formInstance={formInstance}
                        // dataField={dataField}
                        defaultValue={value}
                        width={"100%"}
                        format={",##0.###"}
                      ></NumberBox>
                    </div>
                    // <TextField
                    //   formInstance={formInstance}
                    //   dataField={dataField}
                    //   defaultValue={value}
                    //   width={"100%"}
                    // />
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
                  RequiredField(validateMsg("Unit")),
                ]}
                dataField={"Unit"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      formInstance={formInstance}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("PartTypeID"),
                }}
                dataField={"PartTypeID"}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(validateMsg("PartTypeID")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const readOnly = formInstance.option("readOnly");

                  return (
                    <SelectField
                      // readOnly={readOnly}
                      width={"100%"}
                      dataField={dataField}
                      defaultValue={formData?.[dataField]}
                      formInstance={formInstance}
                      items={listPartTypeID}
                      displayExpr={"TypeName"}
                      valueExpr={"PartTypeID"}
                      onValueChanged={async (e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      // validationGroup={formInstance.option("validationGroup")}
                      // validationRules={[RequiredField(validateMsg("PartTypeID"))]}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("FreqUsed"),
                }}
                dataField={"FreqUsed"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <CheckboxField
                      label={t("FlagDataWH")}
                      dataField={dataField}
                      formInstance={formInstance}
                      defaultValue={formData?.[dataField]}
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
                    <div className="flex items-center">
                      <TextField
                        formInstance={formInstance}
                        dataField={dataField}
                        defaultValue={value}
                        width={"90%"}
                      />
                      <div className={"text-center p-2"}>
                        <Button
                          className=""
                          text={"Save"}
                          onClick={onSaveForm}
                          type={"default"}
                          stylingMode={"contained"}
                          validationGroup={"form"}
                        ></Button>
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>
            </GroupItem>
            {/* <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("Note"),
                }}
                dataField={"Note"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className="flex items-center">
                      <TextField
                        formInstance={formInstance}
                        dataField={dataField}
                        defaultValue={value}
                        width={"90%"}
                      />
                      <div className={"text-center p-2"}>
                        <Button
                          className=""
                          text={"Save"}
                          onClick={onSaveForm}
                          type={"default"}
                          stylingMode={"contained"}
                          validationGroup={"form"}
                        ></Button>
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>
            </GroupItem> */}
          </Form>
        </Popup>
      </div>
    );
  }
);
