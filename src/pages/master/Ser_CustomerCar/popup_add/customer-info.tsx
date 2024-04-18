import { CheckBox, Form, NumberBox } from "devextreme-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { SelectField } from "@/packages/components/select-field";
import {
  ExcludeSpecialCharactersAllowSpaceType,
  ExcludeSpecialCharactersType,
  RequiredField,
  RequiredOnlyPositiveInteger,
  RequiredVietNameeseExcludeSpecialCharacters,
  numberType,
  requiredEmailType,
} from "@/packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { DateField } from "@/packages/components/date-field";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { SearchParam } from "@/packages/types";
import { dataViewAtom, isUpdateAtom } from "../components/store";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { showErrorAtom } from "@/packages/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { PopupViewDebit } from "../popup_view_debit/popup_view_debit";

interface ICustomerInfoProps {
  chuXeRef: any;
  nguoiLienHeRef: any;
  setCheckBox: any;
  checkBox: any;
  formNguoiLienHe: any;
  formChuXeInfo: any;
  listDistrict: any;
  setListDistrict: any;
  handleClose: any;
  setUpdateSusses: any;
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
  handleClose,
  setUpdateSusses,
}: ICustomerInfoProps) => {
  const { t } = useI18n("Ser_CustomerCar_AddNew_CustomerInfo");
  const { t: validateMsg } = useI18n("Validate");
  const api = useClientgateApi();
  const config = useConfiguration();
  const isUpdate = useAtomValue(isUpdateAtom);
  const dataView = useAtomValue(dataViewAtom);
  const showError = useSetAtom(showErrorAtom);
  const setLoad = useSetAtom(loadPanelAtom);

  const showViewDebitPopup = useVisibilityControl({
    defaultVisible: false,
  });

  const viewDebitPopupRef = useRef<any>(null);

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
  const handleDelete = async () => {
    if (dataView?.CarInfo?.length > 0) {
      toast.warning(t("Tồn tại thông tin xe!"));
    } else {
      ConfirmComponent({
        asyncFunction: async () => {
          setUpdateSusses(true);
          const respone = await api.Ser_CustomerCar_Delete({
            CusId: dataView?.CustomerInfo?.CusID,
          });
          if (respone.isSuccess) {
            toast.success(t("Delete successfully!"));
            handleClose();
            return true;
          }
          showError({
            message: t(respone._strErrCode),
            _strErrCode: respone._strErrCode,
            _strTId: respone._strTId,
            _strAppTId: respone._strAppTId,
            _objTTime: respone._objTTime,
            _strType: respone._strType,
            _dicDebug: respone._dicDebug,
            _dicExcs: respone._dicExcs,
          });
          throw new Error(respone._strErrCode);
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to delete?"),
      });
    }
  };
  const handleView = () => {
    viewDebitPopupRef?.current.show();
  };
  const handleChangeProvince = async (e: any) => {
    setLoad(true);
    const resp = await api.Mst_District_Search({
      ProvinceCode: e,
      FlagActive: "1",
      Ft_PageIndex: 0,
      Ft_PageSize: config.MAX_PAGE_ITEMS,
    } as any);
    if (resp.isSuccess) {
      setListDistrict(resp?.DataList);
    }
    setLoad(false);
  };
  const handleChangeKhanHang = (e: any) => {
    if (e === "1") {
      setCheckBox(true);
      // setFormData({
      //   ...formData,
      //   Website: "",
      // });
    } else {
      setCheckBox(false);
      // setFormData({
      //   ...formData,
      //   DOB: "",
      // });
    }
  };
  useEffect(() => {
    handleChangeProvince(formChuXeInfo?.ProvinceCode);
  }, [formChuXeInfo]);
  return (
    <>
      <div className="flex items-center gap-4 mt-2">
        <span className="text-base">{t("Thông tin chủ xe")}</span>
        <CheckBox
          text={t("Khách hàng cũng là người liên lạc")}
          onValueChange={(e) => handleChangeCheckBox(e)}
          value={checkBox}
        />
        <div>
          <BButton label={t("Xem công nợ")} onClick={() => handleView()} />
          {isUpdate && (
            <BButton label={t("Xoá")} onClick={() => handleDelete()} />
          )}
        </div>
      </div>
      <Form
        ref={chuXeRef}
        formData={formChuXeInfo}
        labelLocation={"top"}
        validationGroup={"mainAddCustomer"}
        className="mb-2"
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
                    placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationRules={[
                      RequiredField(t("NoiDungKhaoSatIsRequired")),
                      RequiredVietNameeseExcludeSpecialCharacters,
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
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
                        value: "1",
                      },
                      {
                        text: "Nữ",
                        value: "0",
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
                    // validationRules={[RequiredField(t("MobiletIsRequired"))]}
                    validationRules={[
                      RequiredField(t("MobiletIsRequired")),
                      // ExcludeSpecialCharactersType,
                      numberType,
                    ]}
                    validationGroup={formInstance.option("validationGroup")}
                  />
                  // <div className="ml-2">
                  //   <NumberBox
                  //     onValueChanged={(e: any) => {
                  //       formInstance.updateData(dataField, e.value);
                  //     }}
                  //     placeholder={t("Input")}
                  //     defaultValue={value}
                  //     width={"100%"}
                  //     format={",##0.###"}
                  //   ></NumberBox>
                  // </div>
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
                    formInstance={formInstance}
                    placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationRules={[ExcludeSpecialCharactersAllowSpaceType]}
                    validationGroup={formInstance.option("validationGroup")}
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
                    // displayExpr={(item: any) => {
                    //   if (!item) {
                    //     return "";
                    //   }
                    //   return `${item.ProvinceCode} - ${item.ProvinceName}`;
                    // }}
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
                    dropDownOptions={{
                      resizeEnabled: true,
                    }}
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
                    // displayExpr={(item: any) => {
                    //   if (!item) {
                    //     return "";
                    //   }
                    //   return `${item.DistrictCode} - ${item.DistrictName}`;
                    // }}
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
                    dropDownOptions={{
                      resizeEnabled: true,
                    }}
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
                    validationRules={[RequiredField(t("AddresstIsRequired"))]}
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
                    defaultValue={value}
                    dataField={dataField}
                    width={"100%"}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(
                        dataField,
                        e.value ? format(e.value, "yyyy-MM-dd") : null
                      );
                    }}
                    displayFormat="yyyy-MM-dd"
                    placeholder={t("yyyy-MM-dd")}
                    useMaskBehavior

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
                    validationRules={[requiredEmailType]}
                    validationGroup={formInstance.option("validationGroup")}
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
        formData={formNguoiLienHe}
        labelLocation={"top"}
        className="mt-2"
        visible={!checkBox}
        validationGroup={"mainAddNguoiLienHe"}
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
                    placeholder={t("Input")}
                    validationRules={[RequiredField(t("ContNameIsRequired"))]}
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
                    placeholder={t("Input")}
                    dataField={dataField}
                    formInstance={formInstance}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                    validationRules={[RequiredField(t("ContTelIsRequired"))]}
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
                text: t("ContAddress"),
              }}
              dataField={"ContAddress"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    placeholder={t("Input")}
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
              isRequired={true}
              validationRules={[
                {
                  type: "required",
                },
                RequiredField(t("ContSex")),
              ]}
              editorOptions={{
                validationMessageMode: "always",
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
                        value: "1",
                      },
                      {
                        text: "Nữ",
                        value: "0",
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
                    validationRules={[RequiredField(t("ContSexIsRequired"))]}
                    validationGroup={formInstance.option("validationGroup")}
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
                    placeholder={t("Input")}
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
      <PopupViewDebit
        ref={viewDebitPopupRef}
        visible={showViewDebitPopup.visible}
        container={".dx-viewport"}
        position={"left"}
        onHidding={() => {
          showViewDebitPopup.close();
        }}
      />
    </>
  );
};
