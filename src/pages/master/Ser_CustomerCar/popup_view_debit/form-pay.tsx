import { useI18n } from "@/i18n/useI18n";
import {
  RequiredField,
  requiredOnlyNumber,
} from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import { DateField } from "@/packages/components/date-field";
import { TextField } from "@/packages/components/text-field";
import { format } from "date-fns";
import { Form, TextArea } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { forwardRef, useRef } from "react";

interface iFormPayProps {
  formData: any;
}

export const FormPay = forwardRef(({ formData }: iFormPayProps, ref: any) => {
  const { t } = useI18n("Ser_CustomerCar_AddNew_ViewDebit");

  return (
    <div className="mt-1 mx-1">
      <div className="flex items-center justify-between ">
        <BButton
          label={t("Trả tiền")}
          className=" "
          //   onClick={handleSwitchRightOne}
        ></BButton>
        <div className="flex-[40%]"></div>
        <h5 className="mr-6 flex-1 ">{`Còn nợ ${123}`} </h5>
      </div>
      <Form
        ref={ref}
        id="Popup_UpdateCar_CarInfo"
        formData={formData}
        labelLocation={"top"}
        validationGroup="Popup_UpdateCar_CarInfo"
      >
        <GroupItem colCount={1}>
          <GroupItem colCount={2}>
            <SimpleItem
              label={{
                text: t("PlateNo"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("CusName")),
              ]}
              dataField={"PlateNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <DateField
                    formInstance={formInstance}
                    showClearButton={true}
                    defaultValue={value}
                    dataField={dataField}
                    width={"100%"}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    displayFormat="yyyy-MM-dd HH:mm"
                    placeholder={t("yyyy-MM-dd HH:mm")}
                    useMaskBehavior

                    // disabled={khanhHang === "2" ?? true}
                    // calendarOptions={{
                    //   maxZoomLevel: "month",
                    // }}
                  ></DateField>
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("PlateNo"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("CusName")),
              ]}
              dataField={"PlateNo"}
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
                      RequiredField(t("NoiDungKhaoSatIsRequired")),
                      requiredOnlyNumber,
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={2}>
            <SimpleItem
              label={{
                text: t("PlateNo"),
              }}
              dataField={"PlateNo"}
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
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("PlateNo"),
              }}
              dataField={"PlateNo"}
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
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("PlateNo"),
              }}
              dataField={"PlateNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextArea
                    className="ml-2"
                    width={"100%"}
                    defaultValue={formData?.[dataField]}
                    onValueChanged={async (e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
    </div>
  );
});
