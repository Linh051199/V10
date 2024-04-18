import { Mst_Dealer, Mst_Dealer_Address, Mst_Transporter } from "@packages/types";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@packages/components/text-field";
import { format } from "date-fns";
import { SelectField } from "@packages/components/select-field";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import { ForwardedRef, forwardRef, MutableRefObject, useRef, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { RequiredField } from "@packages/common/Validation_Rules";
import { TextArea } from "devextreme-react";
import { CheckboxField } from "@/packages/components/checkbox-field";

interface HeaderFormEditProps {
  // code: string | any;
  time: any;
  // data: any
}

export const HeaderFormEdit = forwardRef(({ time }: HeaderFormEditProps, ref: ForwardedRef<Form>) => {
  const { t } = useI18n("Dlr_ContractCancel");
  // const [formData, setFormData] = useState({ ContractCNo: code, CreatedDate: new Date() })
  const formData = {}
  // const formRef = useRef<Form>(null);  
  const api = useClientgateApi()
  const showError = useSetAtom(showErrorAtom)
  time = time.slice(0, 10)
  console.log(30, formData)

  return (
    <div className={"p-2"}>
      <Form ref={ref} colCount={3} formData={formData} labelLocation={'left'} validationGroup={"main"}>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("DlrPDIReqNo")
            }}
            dataField={"DlrPDIReqNo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData")
              const value = formData[dataField]
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  readOnly={true}
                  width={200}
                />
              )
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("CreatedDate")
            }}
            dataField={"CreatedDate"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData")
              const value = formData[dataField]
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={time}
                  readOnly={true}
                  width={200}
                />
              )
            }}
          ></SimpleItem>
        </GroupItem>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("DlrPDIReqStatus")
            }}
            dataField={"DlrPDIReqStatus"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData")
              const value = formData[dataField]
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  readOnly={true}
                  width={200}
                />
              )
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("ApprovedDate")
            }}
            dataField={"ApprovedDate"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData")
              const value = formData[dataField]
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  readOnly={true}
                  width={200}
                />
              )
            }}
          ></SimpleItem>
        </GroupItem>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("Remark")
            }}
            dataField={"Remark"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <div className={"flex flex-row"}>
                  <TextArea
                    defaultValue={value}
                    onValueChanged={(e: any) => {
                      formInstance.updateData("Remark", e.value);
                    }}
                    readOnly={false}
                    width={335}
                  />
                </div>
              );
            }}
          ></SimpleItem>
        </GroupItem>
      </Form>
    </div>
  )
})