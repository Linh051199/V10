import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@packages/components/status-value/status-value";
import { forwardRef, useImperativeHandle, useState } from "react";

interface HeaderFormViewProps {
  gridRef: any;
}

export const HeaderFormView = forwardRef(
  ({ gridRef }: HeaderFormViewProps, ref: any) => {
    const { t } = useI18n("Rpt_Correct_Repair_Rate");
    const [data, setData] = useState({});

    useImperativeHandle(ref, () => ({
      setDataForm(dataForm: any) {
        setData(dataForm?.Lst_Rpt_Correct_Repair_Rate);
      },
    }));

    return (
      <div className={"p-2"}>
        <Form colCount={2} formData={data} labelLocation={"left"}>
          <GroupItem colCount={1}>
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
                text: t("TotalROBackRepair"),
              }}
              dataField={"TotalROBackRepair"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SoLuotXeSuaChuaDungNgayLanDau"),
              }}
              dataField={"SoLuotXeSuaChuaDungNgayLanDau"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SoLuotXeSuaChuaDungNgayTuDau"),
              }}
              dataField={"SoLuotXeSuaChuaDungNgayTuDau"}
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
