import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Button, Popup, ScrollView, Validator } from "devextreme-react";
import { IToolbarItemProps, ToolbarItem } from "devextreme-react/data-grid";
import Form, { GroupItem, RequiredRule, SimpleItem } from "devextreme-react/form";
import { nanoid } from "nanoid";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
// import "./update-form.scss";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useVisibilityControl } from "@/packages/hooks";
// import { useColumnsDetail } from "../components/use-columns-detail";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { data } from "@/pages/carservice/NPPQuanLyChienDich/components/data";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { BButton } from "@/packages/components/buttons";
import { useDropzone } from "react-dropzone";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { TextField } from "@/packages/components/text-field";
import { DateField } from "@/packages/components/date-field";
import { format } from "date-fns";
import { SelectField } from "@/packages/components/select-field";
import { CheckboxField } from "@/packages/components/checkbox-field";
import NumberBox from 'devextreme-react/number-box';
import { RequiredField } from "@/packages/common/Validation_Rules";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

interface IDataValueReal {
  keyParam?: string;
  DlvMnNo: string;
  TransporterCode: string;
  FApprovedDate: string;
  FDlvMnStatus: string;
  TDlvMnStatus: string;
  TFVCode: string;
  TFValSys: string;
  TFValReal: string;
  TPValSys: string;
  TPValReal: string;
  TFRemark: string;
}
interface IProps {
  visible: true | false;
  orderListRef: any;
  gridViewOneRef: any
  onCancel?: () => void
  fetchData?: () => void
  BOMCode?: any
  onRefetch: () => void
  code?: any
}
const Ser_MST_ROWarrantyWorkPopup = forwardRef(
  ({ visible, orderListRef, onCancel, gridViewOneRef, fetchData, BOMCode, onRefetch, code }: IProps, ref: any) => {
    const { t } = useI18n("Ser_MST_ROWarrantyWorkPopup");
    const api = useClientgateApi();
    const refDataGrid = useRef<any>(null);
    const windowSize = useWindowSize()
    const refGrid = useRef<any>(null)
    const setLoad = useSetAtom(loadPanelAtom);
    const [formData, setFormData] = useState<any>()
    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return refDataGrid;
      },
      show() {
        showSelectCarPopup.open();
      },
      getData(e: any) {
        setFormData(e)
      }
    }));

    const showError = useSetAtom(showErrorAtom);

    const showSelectCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });

    const handleSave = () => {
      const validate = refGrid.current.instance.validate()
      if (!validate?.isValid) {
        return;
      }
      onSubmit(formData)
    }

    const onSubmit = async (data: any) => {
      setLoad(true)
      const condition = {
        Lst_Ser_MST_ROWarrantyWork: [
          formData
        ]
      }
      const response = await api.Ser_MST_ROWarrantyWork_Save(condition)
      if (response?.isSuccess) {
        setLoad(false)
        toast.success(t("Update successfully!"));
        showSelectCarPopup.close();
        onRefetch()
      } else {
        setLoad(false)
        showError({
          message: t(response!._strErrCode),
          _strErrCode: response!._strErrCode,
          _strTId: response!._strTId,
          _strAppTId: response!._strAppTId,
          _objTTime: response!._objTTime,
          _strType: response!._strType,
          _dicDebug: response!._dicDebug,
          _dicExcs: response!._dicExcs,
        });
      }
    }
    const onDrop = useCallback(async (acceptedFiles: any) => {
      // console.log(208, acceptedFiles)
    }, [])

    const percentFormatLabel = { 'aria-label': 'Percent Format' };


    const [formattedValue, setFormattedValue] = useState<number>(0);
    const [rawValue, setRawValue] = useState(0);


    // const columnsDetail = useColumnsDetail({});
    const { getRootProps } = useDropzone({ onDrop });
    const methods = useForm();
    return (
      <div>
        <Popup
          visible={showSelectCarPopup.visible}
          title={t("Ser_MST_ROWarrantyWorkDetail")}
          showCloseButton={true}
          onHiding={() => {
            showSelectCarPopup.close();
            // onCancel()
          }}
        >
          <ScrollView
            style={{
              // scrollBehavior: "smooth",
            }}
            className=""
            useNative
          >
            <div className={"p-2"}>
              <Form
                ref={refGrid}
                colCount={2}
                formData={formData}
                labelLocation={"left"}
                validationGroup={"main"}
              >
                <GroupItem colCount={1}>
                  <SimpleItem
                    label={{
                      text: t("ROWWorkCode"),
                    }}
                    dataField={"ROWWorkCode"}
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
                      text: t("MaCongViecHTV"),
                    }}
                    dataField={"MaCongViecHTV"}
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
                      text: t("ROWWorkName"),
                    }}
                    dataField={"ROWWorkName"}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(t("ROWWorkName")),
                    ]}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <TextField
                          formInstance={formInstance}
                          dataField={dataField}
                          showClearButton={true}
                          defaultValue={value}
                          width={"100%"}
                          validationRules={[RequiredField(t("ROWWorkNameIsRequired"))]}
                          validationGroup={formInstance.option("validationGroup")}
                        />
                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("RateHour"),
                    }}
                    dataField={"RateHour"}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(t("RateHour")),
                    ]}
                    cssClass=""
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className="ml-2">
                          <NumberBox
                            defaultValue={value}
                            showClearButton={true}
                            width={"100%"}
                            // useMaskedValue={true}
                            format="#,###"
                            validationMessagePosition={"bottom"}
                            validationMessageMode={"always"}
                            onValueChanged={(e: any) => {
                              formInstance.updateData(dataField, e.value);
                            }}
                          >
                            <Validator
                              validationRules={[RequiredField(t("RateHourIsRequired"))]}
                              validationGroup={formInstance.option("validationGroup")}
                            ></Validator>
                          </NumberBox>
                        </div>
                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("Price"),
                    }}
                    dataField={"Price"}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(t("Price")),
                    ]}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <div className="ml-2">
                          <NumberBox
                            // value={value}
                            defaultValue={value}
                            showClearButton={true}
                            width={"100%"}
                            useMaskedValue={true}
                            // isValid={value ? true : false}
                            inputAttr={percentFormatLabel}
                            format="#,###"
                            // defaultValue={}
                            validationMessagePosition={"bottom"}
                            validationMessageMode={"always"}
                            onValueChanged={(e: any) => {
                              formInstance.updateData(dataField, e.value);
                            }}
                          >
                            <Validator
                              validationRules={[RequiredField(t("PriceIsRequired"))]}
                              validationGroup={formInstance.option("validationGroup")}
                            ></Validator>
                          </NumberBox>
                        </div>
                      );
                    }}
                  ></SimpleItem>
                </GroupItem>
                <GroupItem colCount={1}>
                  <SimpleItem
                    label={{
                      text: t("VAT"),
                    }}
                    dataField={"VAT"}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(t("VAT")),
                    ]}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <TextField
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value}
                          width={"100%"}
                          validationRules={[RequiredField(t("VATIsRequired"))]}
                          validationGroup={formInstance.option("validationGroup")}
                        />
                      );
                    }}
                  ></SimpleItem>
                  <SimpleItem
                    label={{
                      text: t("Remark"),
                    }}
                    dataField={"Remark"}
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
                      text: t("Model"),
                    }}
                    dataField={"Model"}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <DateField
                          formInstance={formInstance}
                          showClearButton={true}
                          dataField={dataField}
                          readOnly={true}
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
                      text: t("FlagActive"),
                    }}
                    dataField={"FlagActive"}
                    validationRules={[
                      {
                        type: "required",
                      },
                      RequiredField(t("FlagActive")),
                    ]}
                    render={({ component: formInstance, dataField }: any) => {
                      const formData = formInstance.option("formData");
                      const value = formData[dataField];
                      return (
                        <SelectField
                          formInstance={formInstance}
                          showClearButton={true}
                          dataField={dataField}
                          width={"100%"}
                          defaultValue={value ? 1 : 0}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value);
                          }}
                          validationRules={[RequiredField(t("FlagActiveIsRequired"))]}
                          validationGroup={formInstance.option("validationGroup")}
                          items={[
                            {
                              text: 'Active',
                              value: 1
                            },
                            {
                              text: 'Inactive',
                              value: 0
                            }
                          ]}
                          valueExpr={"value"}
                          displayExpr={"text"}
                        >
                        </SelectField>
                      );
                    }}
                  ></SimpleItem>
                </GroupItem>
              </Form>
            </div>
          </ScrollView>
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: t("Save"),
              type: "default",
              stylingMode: "contained",
              onClick: handleSave
            }}
          />
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: t("Cancel"),
              onClick: () => {
                showSelectCarPopup.close();
              }
            }}
          />
        </Popup>
      </div >
    );
  }
);

export default Ser_MST_ROWarrantyWorkPopup;
