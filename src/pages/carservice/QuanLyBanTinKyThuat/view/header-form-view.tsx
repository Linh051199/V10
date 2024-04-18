import { CarDeliveryOrder } from "@packages/types";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@packages/components/status-value/status-value";
import { BButton } from "@/packages/components/buttons/base-button";
import { QuanLyBanTinKyThuat } from "@/packages/types/carservice/QuanLyBanTinKyThuat";
import { TextField } from "@/packages/components/text-field/text-field";
import { format } from "date-fns";
import { DateField } from "@/packages/components/date-field/date-field";

interface HeaderFormViewProps {
  data: any;
}

export const HeaderFormView = ({ data }: HeaderFormViewProps) => {
  const { t } = useI18n("QuanLyBanTinKyThuat");
  return (
    <div className={"p-2"}>
      {/* <Form colCount={3} formData={data} labelLocation={"left"}>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("SoBanTin"),
            }}
            dataField={"SoBanTin"}
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
              text: t("TransporterCode"),
            }}
            dataField={"TransporterCode"}
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
              text: t("TransportContractNo"),
            }}
            dataField={"TransportContractNo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("TranspReqStatus"),
            }}
            dataField={"TranspReqStatus"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <StatusValue status={value} />;
            }}
          ></SimpleItem>
        </GroupItem>
     
      </Form> */}
      <Form
        // ref={ref}
        colCount={2}
        formData={data}
        labelLocation={"left"}
        validationGroup={"main"}
      >
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("SoBanTin"),
            }}
            dataField={"SoBanTin"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  width={"100%"}
                />
              );
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
              return (
                <DateField
                  formInstance={formInstance}
                  showClearButton={true}
                  dataField={dataField}
                  width={"100%"}
                  defaultValue={new Date() ?? null}
                  onValueChanged={(e: any) => {
                    formInstance.updateData(
                      dataField,
                      e.value ? format(e.value, "yyyy-MM-dd") : null
                    );
                  }}
                  displayFormat={"yyyy-MM-dd"}
                  calendarOptions={{
                    maxZoomLevel: "month",
                  }}
                ></DateField>
              );
            }}
          ></SimpleItem>
        </GroupItem>

        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("NgayHetHanBanTin"),
            }}
            dataField={"NgayHetHanBanTin"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <DateField
                  formInstance={formInstance}
                  showClearButton={true}
                  dataField={dataField}
                  width={"100%"}
                  defaultValue={new Date() ?? null}
                  onValueChanged={(e: any) => {
                    formInstance.updateData(
                      dataField,
                      e.value ? format(e.value, "yyyy-MM-dd") : null
                    );
                  }}
                  displayFormat={"yyyy-MM-dd"}
                  calendarOptions={{
                    maxZoomLevel: "month",
                  }}
                ></DateField>
              );
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("SoBanTinHMC"),
            }}
            dataField={"SoBanTinHMC"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  width={"100%"}
                />
              );
            }}
          ></SimpleItem>
        </GroupItem>
      </Form>
      <Form
        // ref={ref}
        colCount={1}
        formData={data}
        labelLocation={"left"}
        validationGroup={"main"}
      >
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("FileDinhKem"),
            }}
            dataField={"FileDinhKem"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  width={"100%"}
                />
              );
            }}
          ></SimpleItem>
        </GroupItem>

        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("GhiChu"),
            }}
            dataField={"GhiChu"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return (
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  defaultValue={value}
                  width={"100%"}
                />
              );
            }}
          ></SimpleItem>
        </GroupItem>
        <GroupItem colCount={1}>
          <div
            style={{
              fontSize: "14px",
            }}
          >
            {" "}
            Chú ý: Tên file đính kèm nên theo định dạng: Nội dung_Model_Group
            (VD: Thay the dai oc cot lai_Accent_He thong lai.pdf){" "}
          </div>
        </GroupItem>
      </Form>
    </div>
  );
};
