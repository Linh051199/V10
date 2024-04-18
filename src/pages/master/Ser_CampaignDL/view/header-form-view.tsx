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
import { DateRangeBox, TextArea } from "devextreme-react";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { DateField } from "@/packages/components/date-field";
import { DateRangeField } from "@/packages/components/date-range-field";

interface HeaderFormEditProps {
  data: any
}

export const HeaderFormView = forwardRef(({ data }: HeaderFormEditProps, ref: ForwardedRef<Form>) => {
  const { t } = useI18n("FrmMngDlr_PDIRequestCreateNew");
  const formData = {
    ...data
  }
  const { t: validateMsg } = useI18n("Validate");
  const api = useClientgateApi()
  const showError = useSetAtom(showErrorAtom)
  // time = time.slice(0, 10)

  return (
    <div className={"pt-[8px] pb-[12px] px-5"}>
      <Form ref={ref} colCount={2} formData={formData} labelLocation={'left'} validationGroup={"main"}>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("CamNo"),
            }}
            dataField={"CamNo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <TextField
                  width={300}
                  readOnly={true}
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
              text: t("CamName")
            }}

            dataField={"CamName"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData")
              const value = formData[dataField]
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  // readOnly={true}
                  width={300}

                />
              )
            }}
          ></SimpleItem>

        </GroupItem>
        <GroupItem>
          <SimpleItem
            label={{
              text: t("StartDate")
            }}
            dataField={"StartDate"}

            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData")
              const value = formData[dataField]
              return (
                <DateField
                  width={300}
                  // className="dateRange ml-[12px]"
                  displayFormat="yyyy-MM-dd"
                  showClearButton={true}
                  defaultValue={value}
                  onValueChanged={(e: any) => {
                    formInstance.updateData(dataField, e.value);
                  }}
                  formInstance={formInstance}
                  dataField={""}
                >

                </DateField>
              )
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("Note")
            }}
            dataField={"Note"}

            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData")
              const value = formData[dataField]
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  // readOnly={true}
                  width={300}

                />
              )
            }}
          ></SimpleItem>
        </GroupItem>
      </Form>
    </div >
  )
})