import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import Popup, { ToolbarItem } from "devextreme-react/popup";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { HeaderFormAdd } from "./header-form-add";
import { Form, ScrollView } from "devextreme-react";
import { Ser_ServicePackageServiceItems } from "./Ser_ServicePackageServiceItems";
import { Ser_ServicePackagePartItems } from "./Ser_ServicePackagePartItems";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useClientgateApi } from "@/packages/api";
import { useAtomValue, useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { toast } from "react-toastify";
import { FormTotal } from "./form-total";
import {
  dataViewAtom,
  formDataTotalAddNewAtom,
  formDataTotalPartAtom,
  formDataTotalServiceAtom,
  isUpdateAtom,
} from "../components/screen-atom";
import { formatDate } from "@/packages/common/date_utils";
import { format } from "date-fns";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

interface IPopupAddNewProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  gridRef: any;
  viewPopupRef: any;
}

export const PopupAddNew = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      gridRef,
      viewPopupRef,
    }: IPopupAddNewProps,
    createNewRef: any
  ) => {
    const { t } = useI18n("Ser_ServicePackage_AddNew");
    const windowSize = useWindowSize();
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);

    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });
    const dataView = useAtomValue(dataViewAtom);
    console.log(" ~ dataView:", dataView);
    const isUpdate = useAtomValue(isUpdateAtom);
    const setIsUpdate = useSetAtom(isUpdateAtom);
    const setFormDataTotalService = useSetAtom(formDataTotalServiceAtom);
    const setFormDataTotalAddNew = useSetAtom(formDataTotalAddNewAtom);
    const setFormDataTotalPart = useSetAtom(formDataTotalPartAtom);
    const setLoad = useSetAtom(loadPanelAtom);

    const formRef = useRef<Form>(null);
    const formHourRef = useRef<Form>(null);
    const ref = useRef<any>(null);
    const serviceItemsRef = useRef<any>(null);
    const partItemsRef = useRef<any>(null);

    const [updateSusses, setUpdateSusses] = useState(false);
    const [formData, setFormData] = useState({
      ServicePackageNo: "",
      ServicePackageName: "",
      Description: "",
      CreatedDate: new Date(),
      IsPublicFlag: false,
      IsUserBasePrice: false,
    });
    const [formDataHour, setFormDataHour] = useState({
      Hour: "",
    });
    useImperativeHandle(createNewRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showUploadPopup.open();
      },
    }));

    useEffect(() => {
      if (isUpdate) {
        setFormData({
          ServicePackageNo: dataView.Ser_ServicePackage?.ServicePackageNo,
          ServicePackageName: dataView.Ser_ServicePackage?.ServicePackageName,
          Description: dataView.Ser_ServicePackage?.Description,
          CreatedDate: dataView.Ser_ServicePackage?.CreatedDate,
          IsPublicFlag:
            dataView.Ser_ServicePackage?.IsPublicFlag === "1" ? true : false,
          IsUserBasePrice:
            dataView.Ser_ServicePackage?.IsUserBasePrice === "1" ? true : false,
        });
        serviceItemsRef?.current
          ?.getGridViewOneRef()
          ?.current?.setData(dataView?.Lst_Ser_ServicePackageServiceItems);
        partItemsRef?.current
          ?.getGridViewOneRef()
          ?.current?.setData(dataView?.Lst_Ser_ServicePackagePartItems);
        handleUpdateTotal(
          dataView?.Lst_Ser_ServicePackageServiceItems,
          dataView?.Lst_Ser_ServicePackagePartItems
        );
      }
    }, [isUpdate, dataView]);

    //=============================handle===================================
    const handleUpdateTotal = async (data1: any, data2: any) => {
      let totalAmount1 = 0;
      let totalVAT1 = 0;
      let total1 = 0;
      for (let i = 0; i < data1?.length; i++) {
        let totalVATLoop =
          (data1[i]?.Factor * data1[i]?.Price * data1[i]?.VAT) / 100;
        totalAmount1 += data1[i]?.Factor * data1[i]?.Price;
        totalVAT1 += totalVATLoop;
      }

      let totalAmount2 = 0;
      let totalVAT2 = 0;
      let total2 = 0;
      for (let i = 0; i < data2?.length; i++) {
        let totalVATLoop =
          (data2[i]?.Quantity *
            data2[i]?.Price *
            data2[i]?.Factor *
            data2[i]?.VAT) /
          100;
        totalAmount2 += data2[i]?.Quantity * data2[i]?.Price * data2[i]?.Factor;
        totalVAT2 += totalVATLoop;
      }

      total1 = totalAmount1 + totalVAT1;
      total2 = totalAmount2 + totalVAT2;

      await setFormDataTotalService({
        Amount: totalAmount1,
        VAT: totalVAT1,
        Total: totalAmount1 + totalVAT1,
      });

      await setFormDataTotalPart({
        Amount: totalAmount2,
        VAT: totalVAT2,
        Total: totalAmount2 + totalVAT2,
      });

      await setFormDataTotalAddNew({
        Amount: totalAmount1 + totalAmount2,
        Total: total1 + total2,
      });
    };
    const handleClose = () => {
      if (updateSusses) {
        gridRef?.current?.refetchData();
        setUpdateSusses(false);
      }
      gridRef.current?.getDxInstance()?.cancelEditData();
      viewPopupRef?.current?.close();
      showUploadPopup.close();
      onHidding();
      formHourRef?.current?.instance?.option("formData", { Hour: "" });
      setIsUpdate(false);
      setFormData({
        ServicePackageNo: "",
        ServicePackageName: "",
        Description: "",
        CreatedDate: new Date(),
        IsPublicFlag: false,
        IsUserBasePrice: false,
      });
      serviceItemsRef?.current?.getGridViewOneRef()?.current?.setData([]);
      partItemsRef?.current?.getGridViewOneRef()?.current?.setData([]);
      setFormDataTotalService({
        Amount: 0,
        VAT: 0,
        Total: 0,
      });
      setFormDataTotalAddNew({
        Amount: 0,
        Total: 0,
      });
      setFormDataTotalPart({
        Amount: 0,
        VAT: 0,
        Total: 0,
      });
    };

    const handleDelete = async () => {
      ConfirmComponent({
        asyncFunction: async () => {
          setLoad(true);
          const respone = await api.Ser_ServicePackage_Delete({
            ServicePackageID: dataView?.Ser_ServicePackage?.ServicePackageID,
          });
          if (respone.isSuccess) {
            toast.success(t("Delete successfully!"));
            gridRef?.current?.refetchData();
            handleClose();
          } else {
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
          }
          setLoad(false);
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to delete?"),
      });
    };

    const handleSave = async () => {
      const validate = formRef.current?.instance?.validate();
      if (!validate?.isValid) {
        return;
      }
      if (
        formHourRef.current?.props.formData.Hour === "" ||
        formHourRef.current?.props.formData.Hour === null
      ) {
        toast.warning(t("Thời gian dự kiến đang trống!"));
        return;
      }
      const formData = formRef?.current?.props?.formData;

      const serviceItemsData = serviceItemsRef?.current
        ?.getGridViewOneRef()
        ?.current?.getVisibleData();
      const partItemsData = partItemsRef?.current
        ?.getGridViewOneRef()
        ?.current?.getVisibleData();

      if (serviceItemsData.length === 0) {
        toast.warning(t("ServiceItems are empty!"));
        return;
      }

      console.log(" ~ partItemsData:", partItemsData);
      let check = 0;
      const regex = /^[0-9]+$/;
      serviceItemsData?.find((item: any) => {
        if (item?.Factor < 0 || item?.Factor === null) {
          check = 1;
        }
        if (
          item?.Price < 0 ||
          item?.Price === null ||
          !regex.test(item?.Price)
        ) {
          check = 2;
        }
        if (item?.VAT < 0 || item?.VAT === null || !regex.test(item?.VAT)) {
          check = 3;
        }
      });
      partItemsData?.find((item: any) => {
        if (item?.Factor < 0 || item?.Factor > 1 || item?.Factor === null) {
          check = 1;
        }
        if (item?.Quantity < 0 || item?.Quantity === null) {
          check = 4;
        }
        if (
          item?.Price < 0 ||
          item?.Price === null ||
          !regex.test(item?.Price)
        ) {
          check = 2;
        }
        if (item?.VAT < 0 || item?.VAT === null || !regex.test(item?.VAT)) {
          check = 3;
        }
      });

      // if (check) {
      //   toast.warning(t("Factor is vallid!"));
      //   return;
      // }
      switch (check) {
        case 1:
          toast.warning(t("Factor is vallid!"));
          return;
        case 2:
          toast.warning(t("Price is vallid!"));
          return;
        case 3:
          toast.warning(t("VAT is vallid!"));
          return;
        case 4:
          toast.warning(t("Quantity is vallid!"));
          return;
        default:
      }

      ConfirmComponent({
        asyncFunction: async () => {
          setLoad(true);
          if (isUpdate) {
            const dataUpdate = {
              Ser_ServicePackage: {
                ServicePackageID:
                  dataView.Ser_ServicePackage?.ServicePackageID ?? "",
                DealerCode: dataView.Ser_ServicePackage?.DealerCode ?? "",
                ServicePackageNo: formData?.ServicePackageNo ?? "",
                ServicePackageName: formData?.ServicePackageName ?? "",
                TakingTime: formHourRef.current?.props.formData.Hour ?? "",
                Description: formData?.Description ?? "",
                Creator: dataView.Ser_ServicePackage?.Creator ?? "",
                CreatedDate: formData?.CreatedDate ?? "",
                IsPublicFlag: formData?.IsPublicFlag ? "1" : "0",
                IsUserBasePrice: formData?.IsUserBasePrice ? "1" : "0",
                CreatedBy: dataView.Ser_ServicePackage?.CreatedBy ?? "",
              },
              Lst_Ser_ServicePackageServiceItems: serviceItemsData?.map(
                (item: any) => {
                  return {
                    ItemID: item?.ItemID ?? "",
                    Factor: item?.Factor ?? "",
                    ActManHour: item?.ActManHour ?? "",
                    VAT: item?.VAT ?? "",
                    Note: item?.Note ?? "",
                    LogLUDateTime: item?.LogLUDateTime ?? "",
                    LogLUBy: item?.LogLUBy ?? "",
                    ServicePackageID: item?.ServicePackageID ?? "",
                    SerID: item?.SerID ?? "",
                    Price: item?.Price ?? "",
                    ExpenseType: item?.ExpenseType ?? "",
                    ROType: item?.ROType ?? "",
                  };
                }
              ),
              Lst_Ser_ServicePackagePartItems: partItemsData?.map(
                (item: any) => {
                  return {
                    ItemID: item?.ItemID ?? "",
                    ServicePackageID: item?.ServicePackageID ?? "",
                    PartID: item?.PartID ? Number(item?.PartID) : "",
                    Factor: item?.Factor ?? "",
                    VAT: item?.VAT ?? "",
                    Quantity: item?.Quantity ?? "",
                    Note: item?.Note ?? "",
                    LogLUDateTime: item?.LogLUDateTime ?? "",
                    LogLUBy: item?.LogLUBy ?? "",
                    Price: item?.Price ?? "",
                    ExpenseType: item?.ExpenseType ?? "",
                  };
                }
              ),
            };
            console.log(" ~ dataUpdate:", dataUpdate);
            const resp = await api.Ser_ServicePackage_Update(dataUpdate);

            if (resp.isSuccess) {
              toast.success(t("Update successfully!"));
              setUpdateSusses(true);
              handleClose();
              gridRef?.current?.refetchData();
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
          } else {
            const dataCreate = {
              Ser_ServicePackage: {
                ServicePackageID: formData?.ServicePackageID ?? "",
                DealerCode: formData?.DealerCode ?? "",
                ServicePackageNo: formData?.ServicePackageNo ?? "",
                ServicePackageName: formData?.ServicePackageName ?? "",
                TakingTime: formHourRef.current?.props.formData.Hour ?? "",
                Description: formData?.Description ?? "",
                Creator: formData?.Creator ?? "",
                CreatedDate: formData?.CreatedDate ?? "",
                IsPublicFlag: formData?.IsPublicFlag ? "1" : "0",
                IsUserBasePrice: formData?.IsUserBasePrice ? "1" : "0",
                CreatedBy: formData?.CreatedBy ?? "",
              },
              Lst_Ser_ServicePackageServiceItems: serviceItemsData?.map(
                (item: any) => {
                  return {
                    ItemID: item?.ItemID ?? "",
                    Factor: item?.Factor ?? "",
                    ActManHour: item?.ActManHour ?? "",
                    VAT: item?.VAT ?? "",
                    Note: item?.Note ?? "",
                    LogLUDateTime: item?.LogLUDateTime ?? "",
                    LogLUBy: item?.LogLUBy ?? "",
                    ServicePackageID: item?.ServicePackageID ?? "",
                    SerID: item?.SerID ?? "",
                    Price: item?.Price ?? "",
                    ExpenseType: item?.ExpenseType ?? "",
                    ROType: item?.ROType ?? "",
                  };
                }
              ),
              Lst_Ser_ServicePackagePartItems: partItemsData?.map(
                (item: any) => {
                  return {
                    ItemID: item?.ItemID ?? "",
                    ServicePackageID: item?.ServicePackageID ?? "",
                    PartID: item?.PartID ? Number(item?.PartID) : "",
                    Factor: item?.Factor ?? "",
                    VAT: item?.VAT ?? "",
                    Quantity: item?.Quantity ?? "",
                    Note: item?.Note ?? "",
                    LogLUDateTime: item?.LogLUDateTime ?? "",
                    LogLUBy: item?.LogLUBy ?? "",
                    Price: item?.Price ?? "",
                    ExpenseType: item?.ExpenseType ?? "",
                  };
                }
              ),
            };
            console.log(" ~ dataCreate:", dataCreate);
            const resp = await api.Ser_ServicePackage_Create(dataCreate);

            if (resp.isSuccess) {
              toast.success(t("Create successfully!"));
              setUpdateSusses(true);
              handleClose();
              gridRef?.current?.refetchData();
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
          setLoad(false);
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    };

    //=============================handle-end===================================
    return (
      <Popup
        visible={showUploadPopup.visible}
        title={isUpdate ? t("Update") : t("AddNew")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 50}
        width={windowSize.width - 100}
      >
        {/* <LoadPanel
            container={".dx-viewport"}
            shadingColor="rgba(0,0,0,0.4)"
            position={"center"}
            visible={isGetDataProvince}
            showIndicator={true}
            showPane={true}
          /> */}
        <div className="h-full">
          <ScrollView className={" h-full"} showScrollbar={"always"}>
            <HeaderFormAdd ref={formRef} formData={formData} />
            <div className={"separator"} />
            <Ser_ServicePackageServiceItems ref={serviceItemsRef} />
            <div className={"separator"} />
            <Ser_ServicePackagePartItems
              ref={partItemsRef}
              formHourRef={formHourRef}
            />
            <div className={"separator"} />
            <div className="mt-2 flex flex-row-reverse gap-3 items-center">
              <div className="mt-2 w-[30%]">
                <FormTotal />
              </div>
              <div>
                <div className="font-extrabold text-sm">{t("Tổng tiền ")}</div>
              </div>
            </div>
          </ScrollView>
        </div>

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
            text: t("Delete"),
            type: "default",
            stylingMode: "contained",
            onClick: handleDelete,
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
