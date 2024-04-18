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
    const { t } = useI18n("Ser_CustomerGroup_View");

    return (
      <Form
        ref={ref}
        formData={formData}
        labelLocation={"top"}
        validationGroup={"Ser_CustomerGroup_View"}
      >
        <GroupItem colCount={2}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("GroupNo"),
              }}
              dataField={"GroupNo"}
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("GroupName"),
              }}
              dataField={"GroupName"}
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
                text: t("Address"),
              }}
              dataField={"Address"}
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TaxCode"),
              }}
              dataField={"TaxCode"}
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
                text: t("TelePhone"),
              }}
              dataField={"TelePhone"}
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
                const value = formData[dataField];
                return (
                  <TextField
                    readOnly
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("Fax"),
              }}
              dataField={"Fax"}
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("Email"),
              }}
              dataField={"Email"}
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
