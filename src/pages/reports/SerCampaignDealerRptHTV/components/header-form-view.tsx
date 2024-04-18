import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@packages/components/status-value/status-value";
import { forwardRef, useImperativeHandle, useState } from "react";

interface HeaderFormViewProps {
  gridRef: any;
}

export const HeaderFormView = forwardRef(
  ({ gridRef }: HeaderFormViewProps, ref: any) => {
    const { t } = useI18n("Ser_Campaign_Dealer_Rpt");
    const [data, setData] = useState({});

    useImperativeHandle(ref, () => ({
      setDataForm(dataForm: any) {
        setData({
          ...dataForm?.Lst_Rpt_CarSum_Hyundai,
          ...dataForm?.Lst_Rpt_CarSum_Orther,
        });
      },
    }));
    return (
      <div className={"p-2"}>
        <Form colCount={2} labelLocation={"left"} formData={data}>
          <GroupItem colCount={1} caption="Xe Huyndai">
            <SimpleItem
              label={{
                text: t("CarHyundaiCount"),
              }}
              dataField={"CarHyundaiCount"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ServiceAmount"),
              }}
              dataField={"ServiceAmount"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SumPartAmount"),
              }}
              dataField={"SumPartAmount"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1} caption="Xe không mang thương hiệu Huyndai">
            <SimpleItem
              label={{
                text: t("CarOrtherCount"),
              }}
              dataField={"CarOrtherCount"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ServiceAmount"),
              }}
              dataField={"ServiceAmount"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SumPartAmount"),
              }}
              dataField={"SumPartAmount"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SumOilAmount"),
              }}
              dataField={"SumOilAmount"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
        </Form>
      </div>
    );
  }
);
