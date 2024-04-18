import { useI18n } from "@/i18n/useI18n";
import { BButton } from "@/packages/components/buttons";
import { TextField } from "@/packages/components/text-field";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { CheckBox, Form } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { forwardRef, useEffect, useRef, useState } from "react";
import { PopupAddCar } from "./use-popup-add-car";
import { useConfiguration, useVisibilityControl } from "@/packages/hooks";
import { useClientgateApi } from "@/packages/api";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { dataViewAtom } from "../components/store";
import { Link } from "@/packages/components/link/link";
import { PopupUpdateCar } from "./use-popup-update-car";
import { toast } from "react-toastify";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { showErrorAtom } from "@/packages/store";
import { PopupViewHistory } from "../popup_view_history/popup_view_history";

interface ICarInfoProps {
  formChuXeInfo: any;
  setUpdateSusses: any;
}

export const CarInfo = forwardRef(
  ({ formChuXeInfo, setUpdateSusses }: ICarInfoProps, ref: any) => {
    const { t } = useI18n("Ser_CustomerCar_AddNew_CarInfo");
    const windowSize = useWindowSize();
    const showAddCarPopup = useVisibilityControl({ defaultVisible: false });
    const showUpdateCarPopup = useVisibilityControl({ defaultVisible: false });
    const showViewHistoryPopup = useVisibilityControl({
      defaultVisible: false,
    });
    const config = useConfiguration();
    const api = useClientgateApi();
    const dataView = useAtomValue(dataViewAtom);
    const setDataView = useSetAtom(dataViewAtom);
    const setLoad = useSetAtom(loadPanelAtom);
    const showError = useSetAtom(showErrorAtom);

    const dataGridCarRef = useRef<any>(null);
    const carInfoRef = useRef<any>(null);
    const warrantyInfoRef = useRef<any>(null);
    const carInfoUpdateRef = useRef<any>(null);
    const warrantyInfoUpdateRef = useRef<any>(null);

    const addCarPopupRef = useRef<any>(null);
    const updateCarPopupRef = useRef<any>(null);
    const viewHistoryPopupRef = useRef<any>(null);

    const [listModelName, setListModelName] = useState<any>([]);
    const [checkBox, setCheckBox] = useState(false);
    const [formCarData, setFormCarData] = useState({
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
    const [formWarrantyData, setFormWarrantyCarData] = useState({
      InsNo: "",
      InsFinishedDate: "",
      InsContractNo: "",
      InsStartDate: "",
    });
    useEffect(() => {
      dataGridCarRef?.current?.setData(dataView?.CarInfo);
    }, [dataView]);

    const { data: listInsNo } = useQuery(
      ["listInsNo-Ser_CustomerCar_AddNew"],
      () =>
        api.Ser_CustomerCar_listInsNo_SearchDL({
          InsNo: "",
          InsVieName: "",
          Address: "",
          DealerCode: "",
          FlagActive: "1",
          Ft_PageIndex: 0,
          Ft_PageSize: config.MAX_PAGE_ITEMS,
        } as any),
      {}
    );
    //=================================callAPI===================================

    //=================================callAPI-end===================================
    //==========================handle======================================
    const handleAddNew = () => {
      addCarPopupRef.current.show();
      setFormCarData({
        PlateNo: "",
        CarID: "",
        TradeMarkCode: "",
        ModelName: "",
        CurrentKm: "",
        ModelCode: "",
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
    const handleDelete = async () => {
      setLoad(true);
      const lst = dataGridCarRef?.current?.getSelectedRowsData();
      for (let item of lst) {
        if (item?.IsActive === "1") {
          const resp = await api.Ser_CustomerCar_SerCarDelete({
            CusID: item?.CusID,
            CarID: item?.CarID,
          });
          if (resp?.isSuccess) {
            toast.success(t("Delete successfully!"));
            setUpdateSusses(true);
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
        }
      }

      const response = await api.Ser_CustomerCar_SerCarSearchDL({
        CarID: "",
        CusID: formChuXeInfo?.CusID,
        PlateNo: "",
        FrameNo: "",
        EngineNo: "",
        ModelId: "",
        TradeMarkCode: "",
        DealerCode: "",
        SalesCarID: "",
        InsNo: "",
        IsActive: "1",
        Ft_PageIndex: 0,
        Ft_PageSize: 100,
      });

      if (response?.isSuccess) {
        if (response?.DataList) {
          setDataView((prev: any) => {
            return {
              CustomerInfo: prev.CustomerInfo,
              CarInfo: response?.DataList,
            };
          });
          dataGridCarRef?.current?.setData(response?.DataList);
        }
      }
      setLoad(false);
    };
    const handleUpdate = () => {
      if (formCarData.TradeMarkCode === "") {
        toast.warn(t("Please select car in grid you want to update!"));
      } else {
        dataGridCarRef?.current?.getVisibleData()?.map((item: any) => {
          if (item?.PlateNo === formCarData?.PlateNo) {
            setFormCarData({
              PlateNo: item?.PlateNo ?? "",
              CarID: item?.CarID ?? "",
              TradeMarkCode: item?.TradeMarkCode ?? "",
              ModelName: item?.ModelID ?? "",
              CurrentKm: item?.CurrentKm ?? "",
              ModelCode: item?.ModelID ?? "",
              FrameNo: item?.FrameNo ?? "",
              EngineNo: item?.EngineNo ?? "",
              ColorCode: item?.ColorCode ?? "",
              ProductYear: item?.ProductYear ?? "",
              DateBuyCar: item?.DateBuyCar ?? "",
              WarrantyRegistrationDate: item?.WarrantyRegistrationDate ?? "",
              WarrantyExpiresDate: item?.WarrantyExpiresDate ?? "",
              CusConfirmedWarrantyDate: item?.CusConfirmedWarrantyDate ?? "",
            });
          }
        });
        updateCarPopupRef.current.show();
      }
    };
    const handleViewDetail = async (data: any) => {
      setLoad(true);
      const resp = await api.Ser_MST_Model_SearchDL({
        TradeMarkCode: data?.TradeMarkCode,
        ModelName: "",
        Ft_PageIndex: 0,
        Ft_PageSize: config.MAX_PAGE_ITEMS,
      });
      if (resp.isSuccess) {
        setListModelName(resp?.DataList);
      }
      setLoad(false);
      if (data?.FlagPlateNo === "0") {
        setFormCarData({
          PlateNo: "",
          CarID: data?.CarID,
          TradeMarkCode: data?.TradeMarkCode,
          ModelName: data?.smm_ModelName,
          ModelCode: data?.smm_ModelID,
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
          InsNo: data?.InsNo,
          InsFinishedDate: data?.InsFinishedDate,
          InsContractNo: data?.InsContractNo,
          InsStartDate: data?.InsStartDate,
        });
        setCheckBox(true);
      } else {
        setCheckBox(false);
        setFormCarData({
          PlateNo: data?.PlateNo,
          CarID: data?.CarID,
          TradeMarkCode: data?.TradeMarkCode,
          ModelName: data?.smm_ModelName,
          ModelCode: data?.smm_ModelID,
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
          InsNo: data?.InsNo,
          InsFinishedDate: data?.InsFinishedDate,
          InsContractNo: data?.InsContractNo,
          InsStartDate: data?.InsStartDate,
        });
      }
    };

    const handleViewHistory = () => {
      viewHistoryPopupRef?.current.show();
    };

    //==========================handle======================================
    // =============================Toolbar====================================
    const gridToolbars: ToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <BButton label={t("AddNew")} onClick={() => handleAddNew()} />;
        },
      },
    ];
    const toolbarItems: any = [
      {
        text: t(`Delete`),
        onClick: (e: any, ref: any) => {
          if (ref) {
            handleDelete();
          }
        },
        // permissionCode: "BTN_MH_QLPI_EXCEL",
        shouldShow: (ref: any) => {
          let check = false;
          if (ref) {
            if (ref?.current?.instance?.getSelectedRowsData()?.length > 0) {
              check = true;
            }
            return check;
          } else {
            return check;
          }
        },
      },
    ];
    // =============================Toolbar-End====================================

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
          ref={dataGridCarRef}
          toolbarItems={gridToolbars}
          dataSource={[]}
          columns={columns}
          customToolbarItems={toolbarItems}
          allowSelection={true}
          allowInlineEdit={true}
          isHidenHeaderFilter={true}
          allowMultiRowEdit={false}
          editMode={false}
          editingOptions={{
            mode: "batch",
          }}
          customHeight={windowSize.height - 300}
          keyExpr={"PlateNo"}
          storeKey={"Ser_CustomerCar_AddNew_CarInfo"}
        />
        <div className="flex items-center gap-4 mt-5 mb-1">
          <span className="text-base">{t("Thông tin xe")}</span>
          <CheckBox text={t("Xe không có biển số")} value={checkBox} readOnly />
          <div>
            <BButton label={t("Sửa")} onClick={() => handleUpdate()} />
            <BButton
              label={t("Xem lịch sử dịch vụ")}
              onClick={() => handleViewHistory()}
            />
          </div>
        </div>
        <Form
          id="form"
          formData={formCarData}
          labelLocation={"top"}
          validationGroup="Popup_View_CarInfo"
        >
          <GroupItem colCount={3}>
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("PlateNo"),
                }}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"PlateNo"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      width={"100%"}
                      readOnly
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
                  text: t("TradeMarkCode"),
                }}
                dataField={"TradeMarkCode"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <TextField
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
          validationGroup="Popup_View_WarrantyData"
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
                  let data;
                  if (value) {
                    data = listInsNo?.DataList?.filter(
                      (obj) => obj.InsNo === value
                    )[0].InsVieName;
                  }
                  return (
                    <TextField
                      readOnly
                      width={"100%"}
                      defaultValue={data}
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
                      readOnly
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
                      defaultValue={value}
                      width={"100%"}
                      readOnly
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
                      readOnly
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
        <PopupAddCar
          ref={addCarPopupRef}
          visible={showAddCarPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            showAddCarPopup.close();
          }}
          formCarData={formCarData}
          formWarrantyData={formWarrantyData}
          carInfoRef={carInfoRef}
          warrantyInfoRef={warrantyInfoRef}
          dataGridCarRef={dataGridCarRef}
          checkBox={checkBox}
          setCheckBox={setCheckBox}
          formChuXeInfo={formChuXeInfo}
          listInsNo={listInsNo}
          setUpdateSusses={setUpdateSusses}
        />
        <PopupUpdateCar
          ref={updateCarPopupRef}
          visible={showUpdateCarPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            showUpdateCarPopup.close();
          }}
          formCarData={formCarData}
          formWarrantyData={formWarrantyData}
          setFormWarrantyCarData={setFormWarrantyCarData}
          setFormCarData={setFormCarData}
          carInfoRef={carInfoUpdateRef}
          warrantyInfoRef={warrantyInfoUpdateRef}
          dataGridCarRef={dataGridCarRef}
          formChuXeInfo={formChuXeInfo}
          checkBox={checkBox}
          setCheckBox={setCheckBox}
          listInsNo={listInsNo}
          setUpdateSusses={setUpdateSusses}
          listModelName={listModelName}
          setListModelName={setListModelName}
        />
        <PopupViewHistory
          ref={viewHistoryPopupRef}
          visible={showViewHistoryPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            showViewHistoryPopup.close();
          }}
        />
      </>
    );
  }
);
