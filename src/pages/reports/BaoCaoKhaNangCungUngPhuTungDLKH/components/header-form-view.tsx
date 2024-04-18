import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@packages/components/status-value/status-value";
import { forwardRef, useImperativeHandle, useState } from "react";

interface HeaderFormViewProps {
  gridRef: any;
}

export const HeaderFormView = forwardRef(
  ({ gridRef }: HeaderFormViewProps, ref: any) => {
    const { t } = useI18n("Rpt_BaoCaoKhaNangCungUngPhuTungDLKH");
    const [data, setData] = useState({});

    useImperativeHandle(ref, () => ({
      setDataForm(dataForm: any) {
        setData({
          ...dataForm?.Lst_Rpt_AbilitySupplyParts_ResponseRateByPartCode,
          ...dataForm?.Lst_Rpt_AbilitySupplyParts_ResponseRateByRO,
        });
      },
    }));

    return (
      <div className={"p-2"}>
        <Form colCount={2} formData={data} labelLocation={"left"}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ResponseRateByPartCode"),
              }}
              dataField={"ResponseRateByPartCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ResponseRateByRO"),
              }}
              dataField={"ResponseRateByRO"}
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
