import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@packages/components/text-field";
import { ForwardedRef, forwardRef, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { TextArea } from "devextreme-react";

interface HeaderFormViewProps {
  data?: any;
}

export const HeaderFormView = forwardRef(
  ({ data }: HeaderFormViewProps, ref: ForwardedRef<Form>) => {
    const { t } = useI18n("TraCuuNgayDangKiBaoHanh");
    const [formData, setFormData] = useState({
      CBReqNo: "",
      CreatedDate: new Date(),
      Remark: "",
    });
    // const formRef = useRef<Form>(null);
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);

    return (
      <div className={"p-2"}>
        <Form
          ref={ref}
          colCount={3}
          formData={data}
          labelLocation={"left"}
          validationGroup={"main"}
        >
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("KhachHangSoHuu"),
              }}
              dataField={"KhachHangSoHuu"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("DienThoai"),
              }}
              dataField={"DienThoai"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("GiayToTuyThan"),
              }}
              dataField={"GiayToTuyThan"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("TinhTP"),
              }}
              dataField={"TinhTP"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("QHuyen"),
              }}
              dataField={"QHuyen"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
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
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem>
            <SimpleItem
              label={{
                text: t("BienSo"),
              }}
              dataField={"BienSo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SoKhung"),
              }}
              dataField={"SoKhung"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("SoMay"),
              }}
              dataField={"SoMay"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("HieuXe"),
              }}
              dataField={"HieuXe"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("Model"),
              }}
              dataField={"Model"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("MauXe"),
              }}
              dataField={"MauXe"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("MaBinhAcquy"),
              }}
              dataField={"MaBinhAcquy"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    readOnly={true}
                    width={200}
                    defaultValue={value}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("MaAVN"),
              }}
              dataField={"MaAVN"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("NgayBaoHanh"),
              }}
              dataField={"NgayBaoHanh"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("NgayHetHanBaoHanh"),
              }}
              dataField={"NgayHetHanBaoHanh"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("NgayKHXNBaoHanh"),
              }}
              dataField={"NgayKHXNBaoHanh"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("KMGioiHanBH"),
              }}
              dataField={"KMGioiHanBH"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={200}
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
