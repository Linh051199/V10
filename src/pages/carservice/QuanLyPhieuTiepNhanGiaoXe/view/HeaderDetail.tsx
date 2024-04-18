import { Mst_Dealer, Mst_Dealer_Address, Mst_Transporter } from "@packages/types";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { TextField } from "@packages/components/text-field";
import { format } from "date-fns";
import { SelectField } from "@packages/components/select-field";
import { ValueChangedEvent } from "devextreme/ui/select_box";
import { ForwardedRef, forwardRef, MutableRefObject, useRef, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { RequiredField } from "@packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { DateBox } from "devextreme-react";
import { useVisibilityControl } from "@/packages/hooks";
import { GroupHeader } from "./group-header";


interface HeaderFormEditProps {
  // dealerList: Mst_Dealer[]
  // transporterList: Mst_Transporter[]
  // DlvMnNo: string
  // realTime: any
  loadAll: any
}

export const HeaderDetail = forwardRef(({ loadAll }: HeaderFormEditProps, ref: any) => {
  const { t } = useI18n("DeliveryOrder");

  // console.log(27, loadAll)
  // const time = realTime.slice(0, 10)
  const [formData, setFormData] = useState({
    // CarId: loadAll?.Lst_Sto_TranspReqDtl[0]?.CarId,
    // ModelCode: loadAll?.Lst_Sto_TranspReqDtl[0]?.CVModelCode,
    // AC_SpecDescription: loadAll?.Lst_Sto_TranspReqDtl[0]?.AC_SpecDescription,
    // ColorCode: loadAll?.Lst_Sto_TranspReqDtl[0]?.CVColorCode,
    // VIN: loadAll?.Lst_Sto_TranspReqDtl[0]?.VIN,
    // EngineNo: loadAll?.Lst_Sto_TranspReqDtl[0]?.CVEngineNo,
    // DlvStartDate: time,
    // DlvMnNo: DlvMnNo,
    // DriverName02: [2]
  })
  const api = useClientgateApi()
  const showError = useSetAtom(showErrorAtom)

  const checkChanged = (e: any) => {
    console.log(47, e)
  }
  // console.log(44, loadAll)
  const control = useVisibilityControl({ defaultVisible: true });
  return (
    <>

      <div className={"p-2 form-group"}>
        <GroupHeader
          caption={"Thông tin xe"}
          control={control}
          disableCollapsible={false}
        />
        <Form
          ref={ref}
          colCount={2}
          formData={formData}
          labelLocation={'left'}
          validationGroup={"main"}
          visible={control.visible}
          className={`form-input-create-Dlvminutes !pt-2 ${control.visible ? "normal-content" : "collapsible-content"}`}
        >
          <GroupItem colCount={1} cssClass="ml-5">
            <SimpleItem
              render={() => {
                return (
                  <h5>Thông tin khách hàng </h5>
                )
              }}
            />
            <SimpleItem
              label={{
                text: t("ModelCode"),
              }}
              dataField={"ModelCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}

                  />
                )
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("AC_SpecDescription")
              }}
              dataField={"AC_SpecDescription"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ColorCode")
              }}
              dataField={"ColorCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ColorCode")
              }}
              dataField={"ColorCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ColorCode")
              }}
              dataField={"ColorCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
          </GroupItem>
          <GroupItem colCount={1}>
            <SimpleItem
              render={() => {
                return (
                  <h5>Thông tin xe </h5>
                )
              }}
            />
            <SimpleItem
              label={{
                text: t("CarId")
              }}
              dataField={"CarId"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("VIN")
              }}
              dataField={"VIN"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("EngineNo")
              }}
              dataField={"EngineNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("EngineNo")
              }}
              dataField={"EngineNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("EngineNo")
              }}
              dataField={"EngineNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData")
                const value = formData[dataField]
                return (
                  <TextField
                    formInstance={formInstance}
                    dataField={dataField}
                    defaultValue={value}
                    readOnly={true}
                    width={500}
                  />
                )
              }}
            ></SimpleItem>
          </GroupItem>
        </Form>
      </div >
    </>
  )
})