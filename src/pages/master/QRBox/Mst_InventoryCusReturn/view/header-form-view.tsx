import { CarDeliveryOrder } from "@packages/types";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@packages/components/status-value/status-value";
import { BButton } from "@/packages/components/buttons/base-button";
import { Dlr_ContractCancel } from "@/packages/types/sales/Dlr_ContractCancel";
import { usePermissions } from "@/packages/contexts/permission";

interface HeaderFormViewProps {
  data: Dlr_ContractCancel;
  formRef: any;
}

export const HeaderFormView = ({ data, formRef }: HeaderFormViewProps) => {
  const { t } = useI18n("Dlr_ContractHQ_form_view");
  const { DealerName } = usePermissions();
  return (
    <div className={"p-2"}>
      <Form
        formData={data}
        labelLocation={"left"}
        validationGroup={"main"}
        ref={formRef}
      >
        <GroupItem colCount={3} caption="Thông tin hợp đồng bán lẻ">
          <GroupItem colCount={1}>
            <SimpleItem
              colSpan={1}
              label={{
                text: t("DlrContractNo"),
              }}
              dataField={"DlrContractNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
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
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("DlrContractNoUser"),
              }}
              dataField={"DlrContractNoUser"}
              isRequired={true}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SalesGroupTypeName"),
              }}
              dataField={"SalesGroupTypeName"}
              isRequired={true}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SalesTypeNameVN"),
              }}
              dataField={"SalesTypeNameVN"}
              isRequired={true}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              colSpan={1}
              label={{
                text: t("DealerCode"),
              }}
              dataField={"DealerCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("DealerName"),
              }}
              dataField={"DealerName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData["DealerCode"];
                return (
                  <span className={"display-text"}>{DealerName ?? "---"}</span>
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SMName"),
              }}
              dataField={"SMCode"}
              isRequired={true}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("PmtType"),
              }}
              dataField={"PmtType"}
              isRequired={true}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("BankName"),
              }}
              dataField={"BankName"}
              // visible={hidenBank}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
        <GroupItem colCount={3} caption="Thông tin người sở hữu">
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("FullName"),
              }}
              dataField={"FullName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("Address"),
              }}
              dataField={"Address"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("PhoneNo"),
              }}
              dataField={"PhoneNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ProvinceName"),
              }}
              dataField={"ProvinceName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("IDCardNo"),
              }}
              dataField={"IDCardNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("IDCardTypeName"),
              }}
              dataField={"IDCardTypeName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("DateOfBirth"),
              }}
              dataField={"DateOfBirth"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
        <GroupItem colCount={3} caption="Thông tin người giao dịch">
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("TransactorFullName"),
              }}
              dataField={"TransactorFullName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TransactorAddress"),
              }}
              dataField={"TransactorAddress"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("TransactorPhoneNo"),
              }}
              dataField={"TransactorPhoneNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TransactorProvinceName"),
              }}
              dataField={"TransactorProvinceName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("TransactorIDCardNo"),
              }}
              dataField={"TransactorIDCardNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TransactorIDCardTypeName"),
              }}
              dataField={"TransactorIDCardTypeName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("TransactorDateOfBirth"),
              }}
              dataField={"TransactorDateOfBirth"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return <span className={"display-text"}>{value ?? "---"}</span>;
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
    </div>
  );
};
