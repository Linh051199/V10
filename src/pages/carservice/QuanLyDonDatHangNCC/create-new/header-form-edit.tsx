import {
  Mst_Dealer,
  Mst_Dealer_Address,
  Mst_Transporter,
} from "@packages/types";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@packages/components/text-field";
import { format } from "date-fns";
import { SelectField } from "@packages/components/select-field";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useRef,
  useState,
} from "react";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { RequiredField } from "@packages/common/Validation_Rules";
import { DateField } from "@/packages/components/date-field/date-field";

interface HeaderFormEditProps {
  // code: string | any;

  // transporterList: Mst_Transporter[]
  time: any;
}

export const HeaderFormEdit = forwardRef(
  ({ time }: HeaderFormEditProps, ref: ForwardedRef<Form>) => {
    const { t } = useI18n("QuanLyBanTinKyThuat");
    const [formData, setFormData] = useState({ CreatedDate: new Date() });

    // const formRef = useRef<Form>(null);
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    time = time?.slice(0, 10);

    return (
      <div className={"p-2"}>
        <Form
          ref={ref}
          colCount={3}
          formData={formData}
          labelLocation={"left"}
          validationGroup={"main"}
        >
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("SoDonHang"),
              }}
              dataField={"SoDonHang"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
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
                    readOnly={true}
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
                text: t("NhaCungCap"),
              }}
              dataField={"NhaCungCap"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={270}
                    items={[
                      { text: t("All"), value: "" },
                      { text: t("1"), value: "1" },
                      { text: t("0"), value: "0" },
                    ]}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("HinhThucDatHang"),
              }}
              dataField={"HinhThucDatHang"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={270}
                    items={[
                      { text: t("All"), value: "" },
                      { text: t("1"), value: "1" },
                      { text: t("0"), value: "0" },
                    ]}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("DiaDiemNhaHang"),
              }}
              dataField={"DiaDiemNhaHang"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={270}
                    items={[
                      { text: t("All"), value: "" },
                      { text: t("1"), value: "1" },
                      { text: t("0"), value: "0" },
                    ]}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("PhanNhomVatTu"),
              }}
              dataField={"PhanNhomVatTu"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={270}
                    items={[
                      { text: t("All"), value: "" },
                      { text: t("1"), value: "1" },
                      { text: t("0"), value: "0" },
                    ]}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("NgayGiaoDonHangDuKien"),
              }}
              dataField={"NgayGiaoDonHangDuKien"}
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
                text: t("VIN"),
              }}
              dataField={"VIN"}
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
                    readOnly={true}
                    width={270}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </Form>
      </div>
    );
  }
);
