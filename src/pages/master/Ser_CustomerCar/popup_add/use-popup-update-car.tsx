import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  ExcludeSpecialCharactersAllowSpaceType,
  RequiredField,
} from "@/packages/common/Validation_Rules";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { DateField } from "@/packages/components/date-field";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { useQuery } from "@tanstack/react-query";
import { format, isAfter } from "date-fns";
import { CheckBox, Form, NumberBox, Popup } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { ToolbarItem } from "devextreme-react/popup";
import { useAtomValue, useSetAtom } from "jotai";
import {
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { dataViewAtom } from "../components/store";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { ValidationCallbackData } from "devextreme/common";
import { formatDate } from "@/packages/common/date_utils";

interface IPopupUpdateCarProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  setFormCarData: any;
  setFormWarrantyCarData: any;
  formCarData: any;
  formWarrantyData: any;
  carInfoRef: any;
  warrantyInfoRef: any;
  dataGridCarRef: any;
  formChuXeInfo: any;
  listInsNo: any;
  checkBox: any;
  setCheckBox: any;
  setUpdateSusses: any;
  listModelName: any;
  setListModelName: any;
}

export const PopupUpdateCar = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      setFormCarData,
      setFormWarrantyCarData,
      formWarrantyData,
      formCarData,
      checkBox,
      setCheckBox,
      carInfoRef,
      warrantyInfoRef,
      dataGridCarRef,
      formChuXeInfo,
      listInsNo,
      setUpdateSusses,
      listModelName,
      setListModelName,
    }: IPopupUpdateCarProps,
    addCarRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_Update_CarInfo");
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

    //=================================callAPI===================================
    const { data: listTradeMarkCode, isLoading: isGetDataTradeMarkCode } =
      useQuery(
        ["listTradeMarkCode-Ser_CustomerCar_AddNew"],
        () =>
          api.Ser_CustomerCar_Ser_Mst_TradeMark_SearchDL({
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
      setFormCarData({
        PlateNo: "",
        CarID: "",
        TradeMarkCode: "",
        ModelName: "",
        ModelCode: "",
        CurrentKm: "",
        FrameNo: "",
        EngineNo: "",
        ColorCode: "",
        ProductYear: "",
        DateBuyCar: "",
        WarrantyRegistrationDate: "",
        WarrantyExpiresDate: "",
        CusConfirmedWarrantyDate: "",
      });
      setFormWarrantyCarData({
        InsNo: "",
        InsFinishedDate: "",
        InsContractNo: "",
        InsStartDate: "",
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
    const converPlateNoView = (value: any) => {
      if (value) {
        if (value.match(/[a-z]/gi)?.length === 2) {
          return value.replace("-", "");
        } else if (value.match(/[a-z]/gi)?.length === 1) {
          return value.replace(/-/g, " ");
        }
      }
    };
    const converPlateNo = (value: any) => {
      if (value) {
        // if (value.indexOf("-") === 1) {
        //   return value;
        // } else if (
        //   value.match(/[a-z]/gi)?.length === 2 &&
        //   value.indexOf("-") === -1 &&
        //   value.match(/-/)?.length === 2
        // ) {
        //   return value?.slice(0, 4) + "-" + value?.slice(4);
        // } else if (value.indexOf("") === 0) {
        //   return value.replace(" ", "-");
        // }
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
      console.log(" ~ formData1:", formData1);
      const formData2 = warrantyInfoRef?.current?.props?.formData;
      const plateNo = converPlateNo(formData1?.PlateNo);
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

          const resp = await api.Ser_CustomerCar_UpdateCar({
            CusID: formChuXeInfo?.CusID ?? dataView?.CustomerInfo?.CusID ?? "",
            ModelID: formData1?.ModelCode ?? "",
            CarID: formData1?.CarID ?? "",
            PlateNo: checkBox ? "123" : plateNo ?? "",
            // PlateNo: plateNo ?? "",
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
            InsStartDate: formData2?.InsStartDate ?? "",
            InsFinishedDate: formData2?.InsFinishedDate ?? "",
            FlagPlateNo: checkBox ? "0" : "1",

            SalesCarID: formData1?.SalesCarID ?? "",
            IsActive: formData1?.IsActive ?? "1",
            Note: formData1?.Note ?? "",
          });

          if (resp.isSuccess) {
            toast.success(t("Update successfully!"));
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
                showUploadPopup.close();
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
    const handleChangeCheckBox = (e: any) => {
      setCheckBox(e);
    };
    //=============================handle-end===============================================
    return (
      <Popup
        visible={showUploadPopup.visible}
        title={t("UpdateCar")}
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
          id="Popup_UpdateCar_CarInfo"
          formData={formCarData}
          labelLocation={"top"}
          validationGroup="Popup_UpdateCar_CarInfo1"
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
                  //   return (
                  //     <TextField
                  //       width={"100%"}
                  //       defaultValue={value && converPlateNoView(value)}
                  //       dataField={dataField}
                  //       formInstance={formInstance}
                  //       placeholder={t("Input")}
                  //       mask={"SSHH-SSSS#"}
                  //       onValueChanged={(e: any) => {
                  //         formInstance.updateData(
                  //           dataField,
                  //           e.value?.toUpperCase()
                  //         );
                  //       }}
                  //       validationRules={[
                  //         RequiredField(validateMsg("PlateNo is required")),
                  //       ]}
                  //       validationGroup={formInstance.option("validationGroup")}
                  //     />
                  //   );
                  // }}
                  {
                    return checkBox ? (
                      <TextField
                        width={"100%"}
                        defaultValue={""}
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
                        defaultValue={value && converPlateNoView(value)}
                        dataField={dataField}
                        formInstance={formInstance}
                        placeholder={t("Input")}
                        mask={"GGIH-GGGG#"}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(
                            dataField,
                            e.value?.toUpperCase()
                          );
                        }}
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
                      // displayExpr={(item: any) => {
                      //   if (!item) {
                      //     return "";
                      //   }
                      //   return `${item.TradeMarkCode} - ${item.TradeMarkName}`;
                      // }}
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
                      dropDownOptions={{
                        resizeEnabled: true,
                      }}
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
                dataField={"ModelCode"}
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
                      // displayExpr={(item: any) => {
                      //   if (!item) {
                      //     return "";
                      //   }
                      //   return `${item.ModelID} - ${item.ModelName}`;
                      // }}
                      valueExpr="ModelID"
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      defaultValue={value}
                      showClearButton={false}
                      placeholder={t("Select")}
                      dropDownOptions={{
                        resizeEnabled: true,
                      }}
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
                      mask={"SSSSSSSSSSSSSSSSS"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
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
                      placeholder={t("Select")}
                      width={"100%"}
                      defaultValue={value}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
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
          id="Popup_UpdateCar_WarrantyData"
          formData={formWarrantyData}
          labelLocation={"top"}
          className="mt-3"
          validationGroup="Popup_UpdateCar_WarrantyData"
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
                      width={"100%"}
                      defaultValue={value}
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
                      //       if (dataForm) {
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
                      //       console.log(" ~ e.value:", e.value);
                      //       console.log(
                      //         " ~ dataForm.InsStartDate:",
                      //         dataForm.InsStartDate
                      //       );
                      //       if (dataForm) {
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
            text: t("Update"),
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
