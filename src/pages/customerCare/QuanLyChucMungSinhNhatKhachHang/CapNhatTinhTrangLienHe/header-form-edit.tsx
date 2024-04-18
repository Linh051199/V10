import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@packages/components/text-field";
import { ForwardedRef, forwardRef, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { DateBox, TextArea } from "devextreme-react";

interface FormInputProps {

}

export const FormInput = forwardRef(
  ({ }: FormInputProps, ref: ForwardedRef<Form>) => {
    const { t } = useI18n("Sto_CBReq_Create");
    const [formData, setFormData] = useState({
      // CBReqNo: code,
      CreatedDate: new Date(),
      Remark: "",
    });
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    // time = time.slice(0, 10);

    return (
      <div className={"p-2"}>
        <Form
          ref={ref}
          colCount={1}
          formData={formData}
          labelLocation={"left"}
          validationGroup={"main"}
        >
          <GroupItem colCount={1}>
            <SimpleItem
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <h4>Thông tin liên hệ</h4>
                );
              }}
            />
            <SimpleItem
              label={{
                text: t("TinhTrang"),
              }}
              dataField={"TinhTrang"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    // readOnly={true}
                    width={"50%"}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("NgayLienHe"),
              }}
              dataField={"NgayLienHe"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <DateBox
                    className="ml-[12px]"
                    width={"50%"}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    defaultValue={value}
                    showClearButton={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("GhiChu"),
              }}
              dataField={"GhiChu"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    // defaultValue={time}
                    // readOnly={true}
                    width={"50%"}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </Form>
      </div>
    );
  }
);
