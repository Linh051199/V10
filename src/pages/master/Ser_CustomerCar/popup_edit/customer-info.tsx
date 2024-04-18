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
  chuXeEditRef: any;
  nguoiLienHeRef: any;
  setCheckBox: any;
  checkBox: any;
  formNguoiLienHe: any;
  formChuXeInfo: any;
}
export const CustomerInfo = ({
  chuXeEditRef,
  nguoiLienHeRef,
  setCheckBox,
  checkBox,
  formChuXeInfo,
  formNguoiLienHe,
}: ICustomerInfoProps) => {
  const { t } = useI18n("Ser_CustomerCar_Edit_CustomerInfo");
  const { t: validateMsg } = useI18n("Validate");
  const api = useClientgateApi();
  const config = useConfiguration();

  const [listDistrict, setListDistrict] = useState<any>([]);
  const [khanhHang, setKhanhHang] = useState("1");
  // const [formChuXeInfo, setformChuXeInfo] = useState({
  //   KhanhHang: "1",
  //   CusName: "",
  //   Sex: "",
  //   Mobile: "",
  //   Tel: "",

  //   ProvinceCode: "",
  //   DistrictCode: "",
  //   Address: "",
  //   DOB: "",
  //   IDCardNo: "",

  //   Email: "",
  //   TaxCode: "",
  //   Fax: "",
  //   Website: "",
  // });

  // const [formNguoiLienHe, setformNguoiLienHe] = useState({
  //   ContName: "",
  //   ContTel: "",
  //   ContMobile: "",

  //   ContAddress: "",
  //   ContSex: "",

  //   ContFax: "",
  //   ContEmail: "",
  // });

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
          onValueChange={(e) => handleChangeCheckBox(e)}
          value={checkBox}
        />
        <div>
          <BButton label={t("Xem công nợ")} onClick={() => handleView()} />
          <BButton label={t("Xoá")} onClick={() => handleDelete()} />
        </div>
      </div>
      <Form
        ref={chuXeEditRef}
        formData={formChuXeInfo}
        labelLocation={"left"}
        validationGroup={"mainEdit"}
      >
        <GroupItem colCount={3}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("KhanhHang"),
              }}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"KhanhHang"}
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
                        text: "Cá Nhân",
                        value: "1",
                      },
                      {
                        text: "Tổ chức",
                        value: "2",
                      },
                    ]}
                    valueExpr={"value"}
                    displayExpr={"text"}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                      handleChangeKhanHang(e.value);
                    }}
                    defaultValue={value}
                    showClearButton={false}
                    placeholder={t("Select")}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("CusName"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("CusName")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"CusName"}
              visible={khanhHang === "1" ? true : false}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationRules={[
                      RequiredField(validateMsg("NoiDungKhaoSat is required")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("LoaiKH"),
              }}
              isRequired={true}
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
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Sex"),
              }}
              dataField={"Sex"}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("Sex")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
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
                        text: "Nam",
                        value: true,
                      },
                      {
                        text: "Nữ",
                        value: false,
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
                    validationRules={[RequiredField(t("SexeIsRequired"))]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Mobile"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("Mobile")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
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
                    placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationRules={[
                      RequiredField(validateMsg("Mobile is required")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Tel"),
              }}
              editorOptions={{
                validationMessageMode: "always",
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
                    placeholder={t("Input")}
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
                text: t("ProvinceCode"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ProvinceCode")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"ProvinceCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={"100%"}
                    formInstance={formInstance}
                    dataField={dataField}
                    items={listProvince?.DataList}
                    displayExpr="ProvinceName"
                    valueExpr="ProvinceCode"
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                      handleChangeProvince(e.value);
                    }}
                    defaultValue={value}
                    showClearButton={false}
                    placeholder={t("Select")}
                    validationRules={[
                      RequiredField(t("ProvinceCodeIsRequired")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("DistrictCode"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("DistrictCode")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"DistrictCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <SelectField
                    width={"100%"}
                    formInstance={formInstance}
                    dataField={dataField}
                    items={listDistrict}
                    displayExpr="DistrictName"
                    valueExpr="DistrictCode"
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    defaultValue={value}
                    showClearButton={false}
                    placeholder={t("Select")}
                    validationRules={[
                      RequiredField(t("DistrictCodeIsRequired")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("Address"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("Address")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
              }}
              dataField={"Address"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    placeholder={t("Input")}
                    dataField={dataField}
                    formInstance={formInstance}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationRules={[
                      RequiredField(validateMsg("Address is required")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
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
                return (
                  <DateField
                    formInstance={formInstance}
                    showClearButton={true}
                    dataField={dataField}
                    placeholder={t("Input")}
                    width={"100%"}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(
                        dataField,
                        e.value ? format(e.value, "yyyy-MM-dd") : null
                      );
                    }}
                    displayFormat={"yyyy-MM-dd"}
                    // disabled={khanhHang === "2" ?? true}
                    // calendarOptions={{
                    //   maxZoomLevel: "month",
                    // }}
                  ></DateField>
                );
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
                    placeholder={t("Input")}
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
                    placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
                    placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
                    placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
                    placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    // disabled={khanhHang === "1" ?? true}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
        </GroupItem>
      </Form>
      <Form
        ref={nguoiLienHeRef}
        id="form"
        formData={formNguoiLienHe}
        labelLocation={"left"}
        className="mt-2"
        visible={!checkBox}
      >
        <GroupItem colCount={3} caption={t("Thông tin người liên hệ")}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("ContName"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ContName")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationRules={[
                      RequiredField(validateMsg("ContName is required")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("ContTel"),
              }}
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ContTel")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationRules={[
                      RequiredField(validateMsg("ContTel is required")),
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
                  <SelectField
                    width={"100%"}
                    formInstance={formInstance}
                    dataField={dataField}
                    items={[
                      {
                        text: "Nam",
                        value: true,
                      },
                      {
                        text: "Nữ",
                        value: false,
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
