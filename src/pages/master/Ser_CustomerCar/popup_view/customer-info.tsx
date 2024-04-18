import { CheckBox, Form } from "devextreme-react";
import { forwardRef, useRef, useState } from "react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { SelectField } from "@/packages/components/select-field";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { DateField } from "@/packages/components/date-field";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { SearchParam } from "@/packages/types";

interface ICustomerInfoProps {
  chuXeRef: any;
  nguoiLienHeRef: any;
  setCheckBox: any;
  checkBox: any;
  formNguoiLienHe: any;
  formChuXeInfo: any;
  listDistrict: any;
  setListDistrict: any;
}
export const CustomerInfo = ({
  chuXeRef,
  nguoiLienHeRef,
  setCheckBox,
  checkBox,
  formChuXeInfo,
  formNguoiLienHe,
  setListDistrict,
  listDistrict,
}: ICustomerInfoProps) => {
  const { t } = useI18n("Ser_CustomerCar_View_CustomerInfo");
  const { t: validateMsg } = useI18n("Validate");
  const api = useClientgateApi();
  const config = useConfiguration();

  const [khanhHang, setKhanhHang] = useState("1");

  //=================================callAPI===================================
  const { data: listProvince, isLoading: isGetDataProvince } = useQuery(
    ["listProvince-Ser_CustomerCar_AddNew"],
    () =>
      api.Mst_Province_Search({
        FlagActive: "1",
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      } as SearchParam),
    {}
  );

  //=================================callAPI-end===================================

  const handleChangeCheckBox = (e: any) => {
    setCheckBox(e);
  };
  const handleDelete = () => {};
  const handleView = () => {};
  const handleChangeProvince = async (e: any) => {
    const resp = await api.Mst_District_Search({
      ProvinceCode: e,
      FlagActive: "1",
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as any);
    if (resp.isSuccess) {
      setListDistrict(resp?.DataList);
    }
  };
  const handleChangeKhanHang = (e: any) => {
    if (e === "1") {
      setKhanhHang(e);
      setCheckBox(true);
      // setFormData({
      //   ...formData,
      //   Website: "",
      // });
    } else {
      setKhanhHang(e);
      setCheckBox(false);
      // setFormData({
      //   ...formData,
      //   DOB: "",
      // });
    }
  };
  return (
    <>
      {/* <LoadPanel
          container={".dx-viewport"}
          shadingColor="rgba(0,0,0,0.4)"
          position={"center"}
          visible={isProcessing}
          showIndicator={true}
          showPane={true}
        /> */}
      <div className="flex items-center gap-4 mt-2">
        <span className="text-base">{t("Thông tin chủ xe")}</span>
        <CheckBox
          text={t("Khách hàng cũng là người liên lạc")}
          defaultValue={checkBox}
          value={checkBox}
          disabled={true}
        />
        {/* <div>
          <BButton label={t("Xem công nợ")} onClick={() => handleView()} />
          <BButton label={t("Xoá")} onClick={() => handleDelete()} />
        </div> */}
      </div>
      <Form
        ref={chuXeRef}
        formData={formChuXeInfo}
        labelLocation={"top"}
        validationGroup={"mainViewCustomer"}
      >
        <GroupItem colCount={3}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("KhanhHang"),
              }}
              dataField={"KhanhHang"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("CusName"),
              }}
              dataField={"CusName"}
              // visible={khanhHang === "1" ? true : false}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            {/* <SimpleItem
              label={{
                text: t("LoaiKH"),
              }}
              isRequired={khanhHang === "2" ? true : false}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("LoaiKH")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"LoaiKH"}
              visible={khanhHang === "2" ? true : false}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={"100%"}
                    formInstance={formInstance}
                    dataField={dataField}
                    items={[
                      {
                        text: "Phê duyệt",
                        value: "0",
                      },
                      {
                        text: "Ký điện tử",
                        value: "1",
                      },
                    ]}
                    displayExpr="text"
                    valueExpr="value"
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    defaultValue={value}
                    showClearButton={false}
                    placeholder={t("Select")}
                    validationRules={[RequiredField(t("LoaiKHIsRequired"))]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem> */}

            <SimpleItem
              label={{
                text: t("Sex"),
              }}
              dataField={"Sex"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Mobile"),
              }}
              dataField={"Mobile"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Tel"),
              }}
              dataField={"Tel"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ProvinceCode"),
              }}
              dataField={"ProvinceCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("DistrictCode"),
              }}
              dataField={"DistrictCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
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
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("DOB"),
              }}
              dataField={"DOB"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                if (value) {
                  var timestamp = value;

                  var date = new Date(
                    timestamp.replace(
                      /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
                      "$1-$2-$3T$4:$5:$6"
                    )
                  );

                  var year = date.getFullYear();
                  var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
                  var day = String(date.getDate()).padStart(2, "0");

                  var formattedDate = `${year}-${month}-${day}`;

                  return (
                    <TextField
                      width={"100%"}
                      defaultValue={formattedDate}
                      dataField={dataField}
                      formInstance={formInstance}
                      readOnly={true}
                    />
                  );
                } else {
                  return (
                    <TextField
                      width={"100%"}
                      defaultValue={value}
                      dataField={dataField}
                      formInstance={formInstance}
                      readOnly={true}
                    />
                  );
                }
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("IDCardNo"),
              }}
              dataField={"IDCardNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("Email"),
              }}
              dataField={"Email"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("TaxCode"),
              }}
              dataField={"TaxCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Fax"),
              }}
              dataField={"Fax"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Website"),
              }}
              dataField={"Website"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
      <Form
        ref={nguoiLienHeRef}
        formData={formNguoiLienHe}
        labelLocation={"top"}
        className="mt-2"
        visible={!checkBox}
        validationGroup={"mainViewNguoiLienHe"}
      >
        <GroupItem colCount={3} caption={t("Thông tin người liên hệ")}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ContName"),
              }}
              dataField={"ContName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContTel"),
              }}
              dataField={"ContTel"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContMobile"),
              }}
              dataField={"ContMobile"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ContAddress"),
              }}
              dataField={"ContAddress"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContSex"),
              }}
              dataField={"ContSex"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ContFax"),
              }}
              dataField={"ContFax"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContEmail"),
              }}
              dataField={"ContEmail"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    readOnly={true}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
    </>
  );
};
