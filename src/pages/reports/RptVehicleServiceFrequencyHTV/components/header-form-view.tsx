import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@packages/components/status-value/status-value";
import { forwardRef, useImperativeHandle, useState } from "react";

interface HeaderFormViewProps {}

export const HeaderFormView = forwardRef(
  ({}: HeaderFormViewProps, ref: any) => {
    const { t } = useI18n("Rpt_VehicleServiceFrequency");
    const [data, setData] = useState({});

    useImperativeHandle(ref, () => ({
      setDataForm(dataForm: any) {
        setData(dataForm?.Rpt_Vehicle_Service_Frequency);
      },
    }));

    return (
      <div className={"p-2"}>
        <Form colCount={2} formData={data} labelLocation={"left"}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("TotalCar"),
              }}
              dataField={"TotalCar"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TotalRO"),
              }}
              dataField={"TotalRO"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("AVF"),
              }}
              dataField={"AVF"}
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
