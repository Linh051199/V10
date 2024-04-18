import { useI18n } from "@/i18n/useI18n";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { Form, NumberBox } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import { forwardRef } from "react";
import "../list/Ser_ServicePackage.scss";
import { useAtomValue } from "jotai";
import { isUpdateAtom } from "../components/screen-atom";

interface IFormHourProps {
  formData: any;
  readOnly?: boolean;
}

export const FormHour = forwardRef(
  ({ formData, readOnly = false }: IFormHourProps, ref: any) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew_PartItems");
    const isUpdate = useAtomValue(isUpdateAtom);

    return (
      <div className="flex items-center gap-3">
        <div className="font-extrabold text-sm">
          <span>{t("Thời gian sửa chữa dự kiến ")}</span>
          <span className="text-xs textRed">*</span>
        </div>
        <div className="mt-2">
          <Form ref={ref} formData={formData} labelLocation={"left"}>
            <SimpleItem
              label={{
                text: t("Thời gian sửa chữa dự kiến "),
                visible: false,
              }}
              dataField={"Hour"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <NumberBox
                    readOnly={readOnly}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    defaultValue={value}
                    width={"100%"}
                    format={",##0.###"}
                  ></NumberBox>
                );
              }}
            ></SimpleItem>
          </Form>
        </div>
        <div className="font-extrabold text-sm">
          <span>{t("giờ")}</span>
        </div>
      </div>
    );
  }
);
