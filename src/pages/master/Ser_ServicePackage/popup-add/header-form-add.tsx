import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { DateField } from "@/packages/components/date-field";
import { TextField } from "@/packages/components/text-field";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { format } from "date-fns";
import { Form, TextArea } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { forwardRef, useState } from "react";

interface IHeaderFormAddProps {
  formData: any;
}

export const HeaderFormAdd = forwardRef(
  ({ formData }: IHeaderFormAddProps, ref: any) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew");

    return (
      <Form
        ref={ref}
        formData={formData}
        labelLocation={"left"}
        validationGroup={"mainAddCustomer"}
      >
        <GroupItem colCount={2}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ServicePackageNo"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ServicePackageNo")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"ServicePackageNo"}
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
                      RequiredField(t("ServicePackageNoIsRequired")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ServicePackageName"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ServicePackageName")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"ServicePackageName"}
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
                      RequiredField(t("ServicePackageNameIsRequired")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("Description"),
              }}
              dataField={"Description"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const readOnly = formInstance.option("readOnly");
                return (
                  <div className="ml-[12px]">
                    <TextArea
                      placeholder={t("Input")}
                      defaultValue={formData?.[dataField]}
                      onValueChanged={async (e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("CreatedDate"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("CreatedDate")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"CreatedDate"}
              // visible={khanhHang === "1" ? true : false}
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
                    defaultValue={value}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    displayFormat={"yyyy-MM-dd"}
                    useMaskBehavior
                    validationRules={[
                      RequiredField(t("CreatedDateIsRequired")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  ></DateField>
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("IsPublicFlag"),
                visible: false,
              }}
              dataField={"IsPublicFlag"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <div className="my-3">
                    <CheckboxField
                      label={t("IsPublicFlag")}
                      dataField={dataField}
                      formInstance={formInstance}
                      defaultValue={formData?.[dataField] == 1 ? true : false}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                    />
                  </div>
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("IsUserBasePrice"),
                visible: false,
              }}
              dataField={"IsUserBasePrice"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <CheckboxField
                    label={t("IsUserBasePrice")}
                    dataField={dataField}
                    formInstance={formInstance}
                    defaultValue={formData?.[dataField] == 1 ? true : false}
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
    );
  }
);
