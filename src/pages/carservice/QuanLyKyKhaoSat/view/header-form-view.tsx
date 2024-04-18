import { CarDeliveryOrder } from "@packages/types";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@packages/components/status-value/status-value";
import { BButton } from "@/packages/components/buttons/base-button";
import { Dlr_ContractCancel } from "@/packages/types/sales/Dlr_ContractCancel";


interface HeaderFormViewProps {
  data: Dlr_ContractCancel;
}

export const HeaderFormView = ({ data }: HeaderFormViewProps) => {
  const { t } = useI18n("FrmMngDlr_PDIRequestDetail");
  return (
    <div className={"p-2"}>
      <Form colCount={2} formData={data} labelLocation={"left"}>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("ContractCNo"),
            }}
            dataField={"ContractCNo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("CreatedDate"),
            }}
            dataField={"CreatedDate"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
        </GroupItem>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("DealerCode"),
            }}
            dataField={"DealerCode"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <span className={"display-text"}>
                  {value} {formData["md_DealerName"]}
                </span>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("ContractCancelStatus"),
            }}
            dataField={"ContractCancelStatus"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <StatusValue status={value} />;
            }}
          ></SimpleItem>
          
        </GroupItem>
        

      </Form>
    </div>
  );
};
