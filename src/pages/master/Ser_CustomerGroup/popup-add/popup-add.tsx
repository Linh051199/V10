import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { Form, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useAtomValue, useSetAtom } from "jotai";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { dataViewAtom, isUpdateAtom } from "../components/store";
import { HeaderFormAdd } from "./header-form-add";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { Lst_Ser_CustomerGroup } from "./Lst_Ser_CustomerGroup";
import { toast } from "react-toastify";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

interface IPopupAddNewProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  gridRef: any;
}

export const PopupAdd = forwardRef(
  (
    { visible, container, position, onHidding, gridRef }: IPopupAddNewProps,
    addNewRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerGroup_AddNew");
    const windowSize = useWindowSize();
    const api = useClientgateApi();

    const showError = useSetAtom(showErrorAtom);
    const isUpdate = useAtomValue(isUpdateAtom);
    const dataView = useAtomValue(dataViewAtom);
    const setLoad = useSetAtom(loadPanelAtom);

    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });

    const lstCusRef = useRef<any>(null);
    const popupRef = useRef<any>(null);
    const formRef = useRef<Form>(null);

    const [formData, setFormData] = useState({
      GroupNo: "",
      GroupName: "",
      Address: "",
      TaxCode: "",
      TelePhone: "",
      Description: "",
      Fax: "",
      Email: "",
    });
    const [formDataInput, setformDataInput] = useState({
      CusName: "",
    });

    useImperativeHandle(addNewRef, () => ({
      show() {
        showUploadPopup.open();
      },
    }));

    useEffect(() => {
      if (isUpdate) {
        setFormData({
          GroupNo: dataView?.CustomerGroupInfo?.GroupNo ?? "",
          GroupName: dataView?.CustomerGroupInfo?.GroupName ?? "",
          Address: dataView?.CustomerGroupInfo?.Address ?? "",
          TaxCode: dataView?.CustomerGroupInfo?.TaxCode ?? "",
          TelePhone: dataView?.CustomerGroupInfo?.TelePhone ?? "",
          Description: dataView?.CustomerGroupInfo?.Description ?? "",
          Fax: dataView?.CustomerGroupInfo?.Fax ?? "",
          Email: dataView?.CustomerGroupInfo?.Email ?? "",
        });
        lstCusRef?.current
          ?.getGridViewOneRef()
          ?.current?.setData(dataView?.CustomerInfo);
      }
    }, [isUpdate, dataView]);

    //=========================handle=======================================
    const handleClose = () => {
      setFormData({
        GroupNo: "",
        GroupName: "",
        Address: "",
        TaxCode: "",
        TelePhone: "",
        Description: "",
        Fax: "",
        Email: "",
      });
      setformDataInput({
        CusName: "",
      });
      lstCusRef?.current?.getGridViewOneRef()?.current?.setData([]);
      if (isUpdate) {
        gridRef.current?.getDxInstance()?.cancelEditData();
      }
      gridRef?.current?.refetchData();
      showUploadPopup.close();
    };
    const handleSave = async () => {
      const validate = formRef.current?.instance?.validate();
      if (!validate?.isValid) {
        return;
      }
      const formData = formRef?.current?.props?.formData;
      const lstCusData = lstCusRef?.current
        ?.getGridViewOneRef()
        ?.current?.getVisibleData();
      ConfirmComponent({
        asyncFunction: async () => {
          if (isUpdate) {
            const dataUpdate = {
              GroupNo: formData?.GroupNo ?? "",
              GroupName: formData?.GroupName ?? "",
              Address: formData?.Address ?? "",
              Email: formData?.Email ?? "",
              TelePhone: formData?.TelePhone ?? "",
              Fax: formData?.Fax ?? "",
              TaxCode: formData?.TaxCode ?? "",
              Description: formData?.Description ?? "",
              DealerCode: formData?.DealerCode ?? "",
              Lst_Ser_CustomerGroupCustomer: lstCusData?.map((item: any) => {
                return {
                  GroupNo: formData?.GroupNo ?? "",
                  CusID: item?.CusID ?? "",
                  DealerCode: item?.DealerCode ?? "",
                  CusName: item?.CusName ?? "",
                  Description: item?.Description ?? "",
                };
              }),
            };
            console.log(" ~ dataUpdate:", dataUpdate);
            const resp = await api.Ser_CustomerGroup_Update(dataUpdate);

            if (resp.isSuccess) {
              toast.success(t("Update successfully!"));
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
              GroupNo: formData?.GroupNo ?? "",
              GroupName: formData?.GroupName ?? "",
              Address: formData?.Address ?? "",
              Email: formData?.Email ?? "",
              TelePhone: formData?.TelePhone ?? "",
              Fax: formData?.Fax ?? "",
              TaxCode: formData?.TaxCode ?? "",
              Description: formData?.Description ?? "",
              DealerCode: formData?.DealerCode ?? "",
              Lst_Ser_CustomerGroupCustomer: lstCusData?.map((item: any) => {
                return {
                  GroupNo: formData?.GroupNo ?? "",
                  CusID: item?.CusID ?? "",
                  DealerCode: item?.DealerCode ?? "",
                  CusName: item?.CusName ?? "",
                  Description: item?.Description ?? "",
                };
              }),
            };
            console.log(" ~ dataCreate:", dataCreate);
            const resp = await api.Ser_CustomerGroup_Create(dataCreate);

            if (resp.isSuccess) {
              toast.success(t("Create successfully!"));
              setFormData({
                GroupNo: "",
                GroupName: "",
                Address: "",
                TaxCode: "",
                TelePhone: "",
                Description: "",
                Fax: "",
                Email: "",
              });
              handleClose();
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
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    };
    //=========================handle-end=======================================

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
        height={windowSize.height - 100}
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
            <Lst_Ser_CustomerGroup
              ref={lstCusRef}
              formDataInput={formDataInput}
            />
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
