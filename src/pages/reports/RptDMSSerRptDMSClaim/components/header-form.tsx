import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@/packages/components/text-field";
import { Form } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { useRef } from "react";

interface IHeaderFormProps {
  formData: any;
}

export const HeaderForm = ({ formData }: IHeaderFormProps) => {
  const { t } = useI18n("RptDMSSerRptDMSClaim");

  const formRef = useRef<Form>(null);

  return (
    <Form
      ref={formRef}
      formData={formData}
      labelLocation={"left"}
      className="mx-1"
      validationGroup={"RptDMSSerRptDMSClaim"}
    >
      <GroupItem colCount={2}>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("TotalSell"),
            }}
            dataField={"TotalSell"}
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
          <SimpleItem
            label={{
              text: t("SLKNXeMoi"),
            }}
            dataField={"SLKNXeMoi"}
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
              text: t("TiLe"),
            }}
            dataField={"TiLe"}
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
          <SimpleItem
            label={{
              text: t("SLKNChatLuong"),
            }}
            dataField={"SLKNChatLuong"}
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
      </GroupItem>
    </Form>
  );
};
