import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@/packages/components/text-field";
import { Form } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface IHeaderFromProps {}

export const HeaderForm = forwardRef(({}: IHeaderFromProps, ref: any) => {
  const { t } = useI18n("XuatKho_CreateNew_HeaderForm");

  const formRef = useRef<any>();

  const [formData, setFormData] = useState<any>();

  useImperativeHandle(
    ref,
    () => ({
      setData: (d: any) => {
        const getData = formRef?.current?.instance.option("formData");
        formRef?.current?.instance.option("formData", {
          ...getData,
          ...d,
        });
      },

      checkValidate: () => {
        return formRef.current.instance.validate();
      },
    }),
    []
  );

  return (
    <div className="w-[100%] form-store flex justify-center ">
      <div className="w-[80%]">
        <Form
          ref={formRef}
          formData={formData}
          labelLocation={"top"}
          validationGroup={"mainAddCustomer"}
          className="mb-2"
        >
          <GroupItem colSpan={1}>
            <SimpleItem
              label={{
                text: t("CusName"),
              }}
              dataField={"CusName"}
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
                    // validationRules={[
                    //   RequiredField(t("NoiDungKhaoSatIsRequired")),
                    // ]}
                    // validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colSpan={1}></GroupItem>
          <GroupItem colSpan={1}></GroupItem>
        </Form>
      </div>

      {/* <SupplierCustomerPopup ref={supplierPopupRef} setData={setData} />
     <WareHoursePopup ref={WareHoursePopupRef} setData={setData} />
     <WareHourseTypePopup ref={WareHourseTypePopupRef} setData={setData} /> */}
    </div>
  );
});
