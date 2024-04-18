import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { CheckBox, DataGrid, Form } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useClientgateApi } from "@/packages/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/packages/components/link/link";

interface ICarInfoProps {
  dataView: any;
}

export const CarInfo = forwardRef(({ dataView }: ICarInfoProps, ref: any) => {
  const { t } = useI18n("Ser_CustomerCar_View_CarInfo");
  const windowSize = useWindowSize();

  const addCarPopupRef = useRef<any>(null);
  const [formCarData, setFormCarData] = useState({
    PlateNo: "",
    TradeMarkCode: "",
    ModelName: "",
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
  const [formWarrantyData, setFormWarrantyCarData] = useState({
    InsNo: "",
    InsFinishedDate: "",
    InsContractNo: "",
    InsStartDate: "",
  });

  // useEffect(() => {
  //   setFormCarData({
  //     PlateNo: "",
  //     TradeMarkCode: "",
  //     ModelName: "",
  //     CurrentKm: "",
  //     FrameNo: "",
  //     EngineNo: "",
  //     ColorCode: "",
  //     ProductYear: "",
  //     DateBuyCar: "",
  //     WarrantyRegistrationDate: "",
  //     WarrantyExpiresDate: "",
  //     CusConfirmedWarrantyDate: "",
  //   });
  //   setFormWarrantyCarData({
  //     InsNo: "",
  //     InsFinishedDate: "",
  //     InsContractNo: "",
  //     InsStartDate: "",
  //   });
  // }, []);

  useEffect(() => {
    addCarPopupRef?.current?.setData(dataView?.CarInfo);
    setFormCarData({
      PlateNo: "",
      TradeMarkCode: "",
      ModelName: "",
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
  }, [dataView]);

  //=================================callAPI===================================

  //=================================callAPI-end===================================
  //==========================handle======================================
  const handleViewDetail = (data: any) => {
    setFormCarData({
      PlateNo: data?.PlateNo,
      TradeMarkCode: data?.TradeMarkCode,
      ModelName: data?.ModelName,
      CurrentKm: data?.CurrentKm,
      FrameNo: data?.FrameNo,
      EngineNo: data?.EngineNo,
      ColorCode: data?.ColorCode,
      ProductYear: data?.ProductYear,
      DateBuyCar: data?.DateBuyCar,
      WarrantyRegistrationDate: data?.WarrantyRegistrationDate,
      WarrantyExpiresDate: data?.WarrantyExpiresDate,
      CusConfirmedWarrantyDate: data?.CusConfirmedWarrantyDate,
    });
    setFormWarrantyCarData({
      InsNo: data?.InsName,
      InsFinishedDate: data?.InsFinishedDate,
      InsContractNo: data?.InsContractNo,
      InsStartDate: data?.InsStartDate,
    });
  };
  //==========================handle======================================

  //========================collumns========================

  const columns: ColumnOptions[] = [
    {
      dataField: "MyIdxSeq",
      caption: t("STT"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      cellRender: ({ rowIndex }: any) => {
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      dataField: "PlateNo",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("PlateNo"),
      cellRender: (e: any) => {
        return (
          <Link
            label={e.value}
            onClick={() => {
              handleViewDetail(e?.data);
            }}
          />
        );
      },
    },
    {
      dataField: "TradeMarkCode",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("TradeMarkCode"),
    },
    {
      dataField: "FrameNo",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("FrameNo"),
    },
    {
      dataField: "EngineNo",
      caption: t("EngineNo"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "ModelName",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("ModelName"),
    },
    {
      dataField: "ColorCode",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("ColorCode"),
    },
    {
      dataField: "ProductYear",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("ProductYear"),
    },

    {
      dataField: "CurrentKm",
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      caption: t("CurrentKm"),
    },
  ];
  //========================collumns-end========================

  return (
    <>
      <GridViewOne
        ref={addCarPopupRef}
        dataSource={dataView}
        columns={columns}
        allowSelection={true}
        allowInlineEdit={true}
        isHidenHeaderFilter={true}
        allowMultiRowEdit={false}
        editMode={false}
        isHiddenCheckBox
        customHeight={windowSize.height - 300}
        keyExpr={"PlateNo"}
        storeKey={"Ser_CustomerCar_AddNew_CarInfo"}
      />
      <div className="flex items-center gap-4 mt-5 mb-1">
        <span className="text-base">{t("Thông tin xe")}</span>
        <CheckBox
          text={t("Xe không có biển số")}
          readOnly
          // onValueChange={(e) => handleChangeCheckBox(e)}
          // value={checkBox}
        />
        {/* <div>
          <BButton label={t("Sửa")} onClick={() => handleView()} />
          <BButton
            label={t("Xem lịch sử dịch vụ")}
            onClick={() => handleDelete()}
          />
        </div> */}
      </div>
      <Form id="form" formData={formCarData} labelLocation={"top"}>
        <GroupItem colCount={3}>
          <GroupItem colCount={1}>
            <SimpleItem
              label={{
                text: t("PlateNo"),
              }}
              dataField={"PlateNo"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    readOnly={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                  />
                );
              }}
            ></SimpleItem>

            <SimpleItem
              label={{
                text: t("TradeMarkCode"),
              }}
              dataField={"TradeMarkCode"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    readOnly={true}
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
                );
              }}
            ></SimpleItem>
            <SimpleItem
              label={{
                text: t("ModelName"),
              }}
              dataField={"ModelName"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    readOnly={true}
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
                    readOnly={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
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
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    readOnly={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
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
                    readOnly={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
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
                    readOnly={true}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
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
                    readOnly={true}
                    // placeholder={t("Input")}
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
                text: t("DateBuyCar"),
              }}
              dataField={"DateBuyCar"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    readOnly={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
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
                  <TextField
                    readOnly={true}
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
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
                  <TextField
                    width={"100%"}
                    readOnly={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
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
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    readOnly={true}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
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
        id="form"
        formData={formWarrantyData}
        labelLocation={"top"}
        className="mt-3"
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
                  <TextField
                    readOnly={true}
                    width={"100%"}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
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
                    readOnly={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
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
                text: t("InsStartDate"),
              }}
              dataField={"InsStartDate"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                const value = formData[dataField];
                return (
                  <TextField
                    width={"100%"}
                    defaultValue={value}
                    readOnly={true}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
                    onValueChanged={(e: any) => {
                      formInstance.updateData(dataField, e.value);
                    }}
                  />
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
                  <TextField
                    width={"100%"}
                    readOnly={true}
                    defaultValue={value}
                    dataField={dataField}
                    formInstance={formInstance}
                    // placeholder={t("Input")}
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
});
