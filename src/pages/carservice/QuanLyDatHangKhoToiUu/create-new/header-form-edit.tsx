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
import { CheckboxField } from "@/packages/components/checkbox-field";

interface HeaderFormEditProps {
  // code: string | any;

  // transporterList: Mst_Transporter[]
  time: any;
}

export const HeaderFormEdit = forwardRef(
  ({ time }: HeaderFormEditProps, ref: ForwardedRef<Form>) => {
    const { t } = useI18n("QuanLyDatHangTonKhoToiUu");
    const [formData, setFormData] = useState({ CreatedDate: new Date() });

    // const formRef = useRef<Form>(null);
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);
    time = time?.slice(0, 10);

    const dataList = [
      {
        text: "All",
        value: "",
      },
      {
        text: "True",
        value: "1",
      },
      {
        text: "False",
        value: "0",
      },
    ];

    return (
      <div className={"p-2"}>
        <Form
          ref={ref}
          colCount={1}
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
                    width={"100%"}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SoDonHangNguoiDung"),
              }}
              dataField={"SoDonHangNguoiDung"}
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
                text: t("NgayGuiDonHang"),
              }}
              dataField={"NgayGuiDonHang"}
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
                text: t("NhaCungCap"),
              }}
              dataField={"NhaCungCap"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    formInstance={formInstance}
                    showClearButton={true}
                    dataField={dataField}
                    width={"100%"}
                    defaultValue={new Date() ?? null}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    items={dataList}
                    valueExpr={"value"}
                    displayExpr={"text"}
                  ></SelectField>
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
                    formInstance={formInstance}
                    showClearButton={true}
                    dataField={dataField}
                    width={"100%"}
                    defaultValue={new Date() ?? null}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    items={dataList}
                    valueExpr={"value"}
                    displayExpr={"text"}
                  ></SelectField>
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("NguoiTaoDonHang"),
              }}
              dataField={"NguoiTaoDonHang"}
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
                text: t("DonViChiuPhi"),
              }}
              dataField={"DonViChiuPhi"}
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
                text: t("ChoPhepGiaoHangTungPhan"),
              }}
              dataField={"ChoPhepGiaoHangTungPhan"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <CheckboxField
                    dataField={"ChoPhepGiaoHangTungPhan"}
                    formInstance={formInstance}
                    defaultValue={
                      formData?.["ChoPhepGiaoHangTungPhan"] == 1 ? true : false
                    }
                    onValueChanged={(e: any) => {
                      formInstance.updateData(
                        "ChoPhepGiaoHangTungPhan",
                        e.value
                      );
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ChuyenPhatNhanh"),
              }}
              dataField={"ChuyenPhatNhanh"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <CheckboxField
                    dataField={"ChuyenPhatNhanh"}
                    formInstance={formInstance}
                    defaultValue={
                      formData?.["ChuyenPhatNhanh"] == 1 ? true : false
                    }
                    onValueChanged={(e: any) => {
                      formInstance.updateData("ChuyenPhatNhanh", e.value);
                    }}
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
