import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  ExcludeSpecialCharactersAllowSpaceType,
  RequiredField,
  requiredOnlyNumber,
} from "@/packages/common/Validation_Rules";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { useQuery } from "@tanstack/react-query";
import { format, isAfter, isBefore } from "date-fns";
import { CheckBox, Form, NumberBox, Popup } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { useAtomValue, useSetAtom } from "jotai";
import {
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { dataViewAtom } from "../components/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { ValidationCallbackData } from "devextreme/common";
import { formatDate } from "@/packages/common/date_utils";

interface IPopupAddCarProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  formCarData: any;
  formWarrantyData: any;
  carInfoRef: any;
  warrantyInfoRef: any;
  dataGridCarRef: any;
  checkBox: any;
  setCheckBox: any;
  formChuXeInfo: any;
  listInsNo: any;
  setUpdateSusses: any;
}

export const PopupAddCar = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      formWarrantyData,
      formCarData,
      carInfoRef,
      warrantyInfoRef,
      dataGridCarRef,
      checkBox,
      setCheckBox,
      formChuXeInfo,
      listInsNo,
      setUpdateSusses,
    }: IPopupAddCarProps,
    addCarRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_AddNew_CarInfo");
    const { t: validateMsg } = useI18n("Validate");
    const windowSize = useWindowSize();
    const api = useClientgateApi();
    const config = useConfiguration();
    const showError = useSetAtom(showErrorAtom);
    const dataView = useAtomValue(dataViewAtom);
    const setLoad = useSetAtom(loadPanelAtom);
    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });

    const ref = useRef<any>(null);

    useImperativeHandle(addCarRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showUploadPopup.open();
      },
    }));

    const [listModelName, setListModelName] = useState<any>([]);

    //=================================callAPI===================================
    const { data: listTradeMarkCode, isLoading: isGetDataTradeMarkCode } =
      useQuery(
        ["listTradeMarkCode-Ser_CustomerCar_AddNew"],
        () =>
          api.Ser_Mst_TradeMark_SearchDL({
            IsActive: "1",
            DealerCode: "",
            TradeMarkCode: "",
            TradeMarkName: "",
            Ft_PageIndex: 0,
            Ft_PageSize: config.MAX_PAGE_ITEMS,
          } as any),
        {}
      );

    //=================================callAPI-end===================================

    //=============================handle===============================================
    const handleClose = () => {
      showUploadPopup.close();
      setListModelName([]);
      onHidding();
      setCheckBox(false);
    };
    const converPlateNo = (value: any) => {
      if (value) {
        // Remove spaces and hyphens
        value = value?.replace(/[\s-]/g, "");

        // Insert hyphen at specific positions
        if (value?.length === 9) {
          return value?.slice(0, 4) + "-" + value?.slice(4);
        } else {
          if (value.match(/[a-z]/gi)?.length === 2) {
            return value?.slice(0, 4) + "-" + value?.slice(4);
          } else {
            return value?.slice(0, 3) + "-" + value?.slice(3);
          }
        }
      }
    };
    const handleSave = async () => {
      const validate = carInfoRef.current?.instance?.validate();
      if (!validate?.isValid) {
        return;
      }
      const validate2 = warrantyInfoRef.current?.instance?.validate();
      if (!validate2?.isValid) {
        return;
      }
      const formData1 = carInfoRef?.current?.props?.formData;
      const plateNo = converPlateNo(formData1?.PlateNo);

      const formData2 = warrantyInfoRef?.current?.props?.formData;

      if (
        isAfter(
          new Date(formData2.InsStartDate),
          new Date(formData2.InsFinishedDate)
        )
      ) {
        toast.warning(
          t("Sonethings went wrong with the InsStartDate and InsFinishedDate")
        );
        return;
      }
      ConfirmComponent({
        asyncFunction: async () => {
          setLoad(true);

          const resp = await api.Ser_CustomerCar_AddNewCar({
            CusID: formChuXeInfo?.CusID ?? dataView?.CustomerInfo?.CusID ?? "",
            ModelID: formData1?.ModelName ?? "",
            // PlateNo: plateNo ?? "",
            PlateNo: checkBox ? "123" : plateNo ?? "",
            FrameNo: formData1?.FrameNo ?? "",
            EngineNo: formData1?.EngineNo ?? "",
            ColorCode: formData1?.ColorCode ?? "",
            ProductYear: formData1?.ProductYear ?? "",
            DateBuyCar: formData1?.DateBuyCar ?? "",
            WarrantyRegistrationDate: formData1?.WarrantyRegistrationDate ?? "",
            CurrentKm: formData1?.CurrentKm ?? "",
            TradeMarkCode: formData1?.TradeMarkCode ?? "",

            InsNo: formData2?.InsNo ?? "",
            InsContractNo: formData2?.InsContractNo ?? "",
            InsStartDate: formData2?.InsStartDate
              ? formatDate(formData2?.InsStartDate)
              : "",
            InsFinishedDate: formData2?.InsFinishedDate
              ? formatDate(formData2?.InsFinishedDate)
              : "",
            FlagPlateNo: checkBox ? "0" : "1",

            SalesCarID: formData1?.SalesCarID ?? "",
            IsActive: formData1?.IsActive ?? "1",
            Note: formData1?.Note ?? "",
          });

          if (resp.isSuccess) {
            toast.success(t("Create successfully!"));
            setUpdateSusses(true);
            const response = await api.Ser_CustomerCar_SerCarSearchDL({
              CarID: "",
              CusID:
                formChuXeInfo?.CusID ?? dataView?.CustomerInfo?.CusID ?? "",
              PlateNo: "",
              FrameNo: "",
              EngineNo: "",
              ModelId: "",
              TradeMarkCode: "",
              DealerCode: "",
              SalesCarID: "",
              IsActive: "1",
              InsNo: "",
              Ft_PageIndex: 0,
              Ft_PageSize: 100,
            });

            if (response?.isSuccess) {
              if (response?.DataList) {
                dataGridCarRef?.current?.setData(response?.DataList);
                handleClose();
              }
            }
          } else {
            showError({
              message: t(resp._strErrCode),
              _strErrCode: resp._strErrCode,
              _strTId: resp._strTId,
              _strAppTId: resp._strAppTId,
              _objTTime: resp._objTTime,
              _strType: resp._strType,
              _dicDebug: resp._dicDebug,
              _dicExcs: resp._dicExcs,
            });
          }
          setLoad(false);
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    };
    const handleChangeTradeMarkCode = async (e: string) => {
      if (e === null) {
        setListModelName([]);
      } else {
        setLoad(true);
        const resp = await api.Ser_MST_Model_SearchDL({
          TradeMarkCode: e,
          ModelName: "",
          Ft_PageIndex: 0,
          Ft_PageSize: config.MAX_PAGE_ITEMS,
        });
        if (resp.isSuccess) {
          setListModelName(resp?.DataList);
        }
        setLoad(false);
      }
    };

    const handleChangeCheckBox = (e: any) => {
      setCheckBox(e);
    };
    //=============================handle-end===============================================
    return (
      <Popup
        visible={showUploadPopup.visible}
        title={t("AddCar")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 200}
        width={windowSize.width - 100}
      >
        {/* <LoadPanel
          container={".dx-viewport"}
          shadingColor="rgba(0,0,0,0.4)"
          position={"center"}
          visible={isProcessing}
          showIndicator={true}
          showPane={true}
        /> */}
        <div className="flex items-center gap-4 mb-1">
          <span className="text-base">{t("Thông tin xe")}</span>
          <CheckBox
            text={t("Xe không có biển số")}
            onValueChange={(e) => handleChangeCheckBox(e)}
            value={checkBox}
          />
        </div>
        <Form
          ref={carInfoRef}
          id="Popup_AddNewCar_CarInfo"
          formData={formCarData}
          labelLocation={"top"}
          validationGroup="Popup_AddNewCar_CarInfo"
        >
          <GroupItem colCount={3}>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("PlateNo"),
                }}
                isRequired={checkBox ? false : true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("PlateNo")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"PlateNo"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  {
                    return checkBox ? (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        readOnly={true}
                      />
                    ) : (
                      <TextField
                        width={"100%"}
                        defaultValue={value}
                        dataField={dataField}
                        formInstance={formInstance}
                        placeholder={t("Input")}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value);
                        }}
                        mask={"GGIH-GGGG#"}
                        validationRules={[
                          RequiredField(validateMsg("PlateNo is required")),
                        ]}
                        validationGroup={formInstance.option("validationGroup")}
                      />
                    );
                  }
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("TradeMarkCode"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("TradeMarkCode")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"TradeMarkCode"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <SelectField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      items={listTradeMarkCode?.DataList}
                      // displayExpr="TradeMarkName"
                      displayExpr="TradeMarkCode"
                      valueExpr="TradeMarkCode"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                        handleChangeTradeMarkCode(e.value);
                      }}
                      defaultValue={value}
                      showClearButton={false}
                      placeholder={t("Select")}
                      validationRules={[
                        RequiredField(t("TradeMarkCodeIsRequired")),
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("ModelName"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("ModelName")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"ModelName"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <SelectField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      items={listModelName}
                      displayExpr="ModelName"
                      valueExpr="ModelID"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      defaultValue={value}
                      showClearButton={false}
                      placeholder={t("Select")}
                      validationRules={[
                        RequiredField(t("ModelNameIsRequired")),
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("CurrentKm"),
                }}
                dataField={"CurrentKm"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      width={"100%"}
                      defaultValue={value}
                      readOnly
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
                  text: t("FrameNo"),
                }}
                dataField={"FrameNo"}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("PlateNo")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
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
                      mask={"SSSSSSSSSSSSSSSSS"}
                      validationRules={[RequiredField(t("PlateNoIsRequired"))]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("EngineNo"),
                }}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"EngineNo"}
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
                        formInstance.updateData(
                          dataField,
                          e.value?.toUpperCase()
                        );
                      }}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("ColorCode"),
                }}
                dataField={"ColorCode"}
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
                        formInstance.updateData(
                          dataField,
                          e.value?.toUpperCase()
                        );
                      }}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("ProductYear"),
                }}
                dataField={"ProductYear"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    // <div className="ml-2">
                    //   <NumberBox
                    //     onValueChanged={(e: any) => {
                    //       formInstance.updateData(dataField, e.value);
                    //     }}
                    //     placeholder={t("Input")}
                    //     defaultValue={value}
                    //     width={"100%"}
                    //     // format={",##0.###"}
                    //   ></NumberBox>
                    // </div>
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
                  text: t("DateBuyCar"),
                }}
                dataField={"DateBuyCar"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      width={"100%"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(
                          dataField,
                          e.value ? format(e.value, "yyyy-MM-dd") : null
                        );
                      }}
                      displayFormat={"yyyy-MM-dd"}
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
                  text: t("WarrantyRegistrationDate"),
                }}
                dataField={"WarrantyRegistrationDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      width={"100%"}
                      readOnly
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
                  text: t("WarrantyExpiresDate"),
                }}
                dataField={"WarrantyExpiresDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      width={"100%"}
                      readOnly
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
                  text: t("CusConfirmedWarrantyDate"),
                }}
                dataField={"CusConfirmedWarrantyDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      readOnly
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
            </GroupItem>
          </GroupItem>
        </Form>
        <Form
          ref={warrantyInfoRef}
          id="Popup_AddNewCar_WarrantyData"
          formData={formWarrantyData}
          labelLocation={"top"}
          className="mt-3"
          validationGroup="Popup_AddNewCar_WarrantyData"
        >
          <GroupItem colCount={3} caption={t("Thông tin bảo hiểm theo xe")}>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("InsNo"),
                }}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"InsNo"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <SelectField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      items={listInsNo?.DataList}
                      displayExpr="InsVieName"
                      // displayExpr={(item: any) => {
                      //   if (!item) {
                      //     return "";
                      //   }
                      //   return `${item.InsNo} - ${item.InsVieName}`;
                      // }}
                      valueExpr="InsNo"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      defaultValue={value}
                      showClearButton={false}
                      placeholder={t("Select")}
                      dropDownOptions={{
                        resizeEnabled: true,
                      }}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("InsContractNo"),
                }}
                dataField={"InsContractNo"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    // <div className="ml-2">
                    //   <NumberBox
                    //     onValueChanged={(e: any) => {
                    //       formInstance.updateData(dataField, e.value);
                    //     }}
                    //     placeholder={t("Input")}
                    //     defaultValue={value}
                    //     width={"100%"}
                    //   ></NumberBox>
                    // </div>
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
                  text: t("InsStartDate"),
                }}
                dataField={"InsStartDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      displayFormat={"yyyy-MM-dd"}
                      placeholder={t("yyyy-MM-dd")}
                      useMaskBehavior
                      // validationRules={[
                      //   {
                      //     type: "custom",
                      //     ignoreEmptyValue: true,
                      //     message: "InsFinishedDate_MustToBig_InsStartDate",
                      //     validationCallback: (e: ValidationCallbackData) => {
                      //       const formRef =
                      //         warrantyInfoRef as MutableRefObject<Form>;
                      //       const dataForm =
                      //         formRef.current?.instance.option("formData");
                      //       if (dataForm?.InsFinishedDate) {
                      //         return !isAfter(
                      //           new Date(e.value as any),
                      //           new Date(dataForm.InsFinishedDate as Date)
                      //         );
                      //       }

                      //       return true;
                      //     },
                      //   },
                      // ]}
                      // validationGroup={formInstance.option("validationGroup")}
                    ></DateField>
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("InsFinishedDate"),
                }}
                dataField={"InsFinishedDate"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <DateField
                      formInstance={formInstance}
                      showClearButton={true}
                      dataField={dataField}
                      defaultValue={value}
                      width={"100%"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      displayFormat={"yyyy-MM-dd"}
                      placeholder={t("yyyy-MM-dd")}
                      useMaskBehavior
                      // validationRules={[
                      //   {
                      //     type: "custom",
                      //     ignoreEmptyValue: true,
                      //     message: "InsFinishedDate_MustToBig_InsStartDate",
                      //     validationCallback: (e: ValidationCallbackData) => {
                      //       const formRef =
                      //         warrantyInfoRef as MutableRefObject<Form>;
                      //       const dataForm =
                      //         formRef.current?.instance.option("formData");
                      //       console.log(" ~ dataForm:", dataForm);
                      //       if (dataForm.InsStartDate) {
                      //         return isAfter(
                      //           new Date(e.value as any),
                      //           new Date(dataForm.InsStartDate as Date)
                      //         );
                      //       }

                      //       return true;
                      //     },
                      //   },
                      // ]}
                      // validationGroup={formInstance.option("validationGroup")}
                    ></DateField>
                  );
                }}
              ></SimpleItem>
            </GroupItem>
          </GroupItem>
        </Form>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Save"),
            type: "default",
            stylingMode: "contained",
            onClick: handleSave,
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: handleClose,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
