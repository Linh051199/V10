import { useI18n } from "@/i18n/useI18n";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { format } from "date-fns";
import { Form, Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import './components/DuyetBaoCaoBaoHanh.scss'

import React, { forwardRef } from 'react'
import { RequiredField } from "@/packages/common/Validation_Rules";

interface CapNhatThongTinKhachHangPopup {
  visiblePopup: any;
  onClose: (data: any) => void;
}

export const PopupCapNhatThongTinKhachHang = forwardRef(({ visiblePopup, onClose }: CapNhatThongTinKhachHangPopup, ref: any) => {
  const formData = {}
  const { t } = useI18n("QuanLyYeuCauXuatKhoCreate");
  return (
    <div>
      <Popup
        visible={visiblePopup}
        title="Thông tin khách hàng"
        showCloseButton
        onHidden={onClose}
        contentRender={() => {
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
                      text: t("HoTen"),
                    }}
                    dataField={"HoTen"}
                    validationRules={[RequiredField(t("NgayVaoXuongIsRequired"))]}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <TextField
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          width={"100%"}
                          validationRules={[
                            RequiredField(`${dataField} is Required`),
                          ]}
                          validationGroup={formInstance.option(
                            "validationGroup"
                          )}
                        />

                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("DiaChi"),
                    }}
                    dataField={"DiaChi"}
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
                          items={undefined}
                        ></SelectField>
                      );
                    }}
                  ></SimpleItem>
                </GroupItem>
                <GroupItem colCount={2}>
                  <SimpleItem
                    label={{
                      text: t("GioiTinh"),
                    }}
                    dataField={"GioiTinh"}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <TextField
                          className="cnttkh-two-col"
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          width={"calc(100% - 24px)"}
                        />
                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("DiDong"),
                    }}
                    cssClass="ml-[24px]"
                    dataField={"DiDong"}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <TextField
                          className="cnttkh-two-col"
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          width={"calc(100% - 24px)"}
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
                          className="cnttkh-two-col"
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          width={"calc(100% - 24px)"}
                        />
                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("DienThoai"),
                    }}
                    cssClass="ml-[24px]"
                    dataField={"DienThoai"}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <TextField
                          className="cnttkh-two-col"
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          width={"calc(100% - 24px)"}
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
                      text: t("MST"),
                    }}
                    dataField={"MST"}
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

            </div>
          );
        }}
      >
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-submit"
          options={{
            text: t("Save"),
            onClick: () => { },
            stylingMode: "contained",
            type: "default",
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-cancel"
          options={{
            text: t("Thoát"),
            onClick: onClose,
            stylingMode: "contained",
            type: "default",
          }}
        />

      </Popup >
    </div >
  )
})
