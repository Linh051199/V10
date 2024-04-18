import { useI18n } from "@/i18n/useI18n";
import { Form, NumberBox } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { useAtomValue } from "jotai";
import { forwardRef } from "react";
import { formDataTotalServiceAtom } from "../components/screen-atom";

interface IFormTotalServiceProps {}

export const FormTotalService = forwardRef(
  ({}: IFormTotalServiceProps, ref: any) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew_ServiceItems");
    const formData = useAtomValue(formDataTotalServiceAtom);

    return (
      <>
        <Form ref={ref} formData={formData} labelLocation={"left"}>
          <GroupItem colCount={3}>
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
                      // format={",##0.###"}
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
                  text: t("VAT (10%)"),
                  visible: false,
                }}
                dataField={"VAT"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <NumberBox
                      width={"100%"}
                      value={value}
                      // format={",##0.###"}
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
                      // format={",##0.###"}
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
  }
);
