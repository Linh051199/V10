import { Form, NumberBox } from "devextreme-react";
import { useAtomValue } from "jotai";
import { forwardRef } from "react";
import { formDataTotalAddNewAtom } from "../components/screen-atom";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";

interface IFormTotalProps {}

export const FormTotal = forwardRef(({}: IFormTotalProps, ref: any) => {
  const { t } = useI18n("Ser_ServicePackage_AddNew");
  const formData = useAtomValue(formDataTotalAddNewAtom);

  return (
    <>
      <Form ref={ref} formData={formData} labelLocation={"left"}>
        <GroupItem colCount={2}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("Total amount does not include VAT"),
                visible: false,
              }}
              dataField={"Amount"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <NumberBox
                    width={"100%"}
                    value={value}
                    format={",##0.###"}
                    stylingMode="underlined"
                    readOnly
                    elementAttr={{
                      class:
                        "customize-value-right-in-numberbox customize-box-numberbox-border-none",
                    }}
                  />
                  // <span className={"display-text"}>
                  //   <b>{value}</b>
                  // </span>
                );
              }}
            ></SimpleItem>
          </GroupItem>

          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("Total amount after VAT"),
                visible: false,
              }}
              dataField={"Total"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <NumberBox
                    width={"100%"}
                    value={value}
                    format={",##0.###"}
                    stylingMode="underlined"
                    readOnly
                    elementAttr={{
                      class:
                        "customize-value-right-in-numberbox customize-box-numberbox-border-none",
                    }}
                  />
                  // <span className={"display-text"}>
                  //   <b>{value}</b>
                  // </span>
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
    </>
  );
});
