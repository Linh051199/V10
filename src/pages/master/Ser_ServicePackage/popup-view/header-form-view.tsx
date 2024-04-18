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

interface IHeaderFormViewProps {
  formData: any;
}

export const HeaderFormView = forwardRef(
  ({ formData }: IHeaderFormViewProps, ref: any) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew");

    return (
      <Form
        ref={ref}
        formData={formData}
        labelLocation={"top"}
        validationGroup={"mainAddCustomer"}
      >
        <GroupItem colCount={2}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ServicePackageNo"),
              }}
              dataField={"ServicePackageNo"}
              // visible={khanhHang === "1" ? true : false}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    readOnly
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ServicePackageName"),
              }}
              dataField={"ServicePackageName"}
              // visible={khanhHang === "1" ? true : false}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    readOnly
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
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
                      readOnly
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
              dataField={"CreatedDate"}
              // visible={khanhHang === "1" ? true : false}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <DateField
                    formInstance={formInstance}
                    showClearButton={true}
                    defaultValue={formData?.[dataField]}
                    dataField={dataField}
                    placeholder={t("Select")}
                    readOnly
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
                      readOnly
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
                    readOnly
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
