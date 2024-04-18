import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Form, LoadPanel, Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { CustomerInfo } from "./customer-info";
import { CarInfo } from "./car-info";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@/packages/api";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";

interface IPopupEditProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  gridRef: any;
}

export const PopupEdit = forwardRef(
  (
    { visible, container, position, onHidding, gridRef }: IPopupEditProps,
    editRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_Edit");
    const windowSize = useWindowSize();
    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);

    const ref = useRef<any>(null);
    const chuXeEditRef = useRef<Form>(null);
    const nguoiLienHeRef = useRef<Form>(null);

    const [checkBox, setCheckBox] = useState(true);
    const [formChuXeInfo, setformChuXeInfo] = useState({
      KhanhHang: "1",
      CusName: "",
      Sex: "",
      Mobile: "",
      Tel: "",

      ProvinceCode: "",
      DistrictCode: "",
      Address: "",
      DOB: "",
      IDCardNo: "",

      Email: "",
      TaxCode: "",
      Fax: "",
      Website: "",
    });

    const [formNguoiLienHe, setformNguoiLienHe] = useState({
      ContName: "",
      ContTel: "",
      ContMobile: "",

      ContAddress: "",
      ContSex: "",

      ContFax: "",
      ContEmail: "",
    });

    useImperativeHandle(editRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showUploadPopup.open();
      },
    }));

    //=============================callAPI===================================

    //=============================callAPI-end===================================

    //=============================handle===================================
    const handleClose = () => {
      gridRef.current?.getDxInstance()?.cancelEditData();
      showUploadPopup.close();
      onHidding();
      setformChuXeInfo({
        KhanhHang: "1",
        CusName: "",
        Sex: "",
        Mobile: "",
        Tel: "",

        ProvinceCode: "",
        DistrictCode: "",
        Address: "",
        DOB: "",
        IDCardNo: "",

        Email: "",
        TaxCode: "",
        Fax: "",
        Website: "",
      });
      setformNguoiLienHe({
        ContName: "",
        ContTel: "",
        ContMobile: "",

        ContAddress: "",
        ContSex: "",

        ContFax: "",
        ContEmail: "",
      });
    };
    const handleSave = async () => {
      const validate = chuXeEditRef.current?.instance.validate();
      if (!validate?.isValid) {
        return;
      }
      ConfirmComponent({
        asyncFunction: async () => {
          const chuXeInfo = chuXeEditRef?.current?.props?.formData;
          const nguoiLienHeInfo = nguoiLienHeRef?.current?.props?.formData;

          const respone = await api.Ser_CustomerCar_Create({
            Sex: chuXeInfo?.Sex ?? "",
            CusName: chuXeInfo?.CusName ?? "",
            Mobile: chuXeInfo?.Mobile ?? "",
            Tel: chuXeInfo?.Tel ?? "",
            ProvinceCode: chuXeInfo?.ProvinceCode ?? "",
            DistrictCode: chuXeInfo?.DistrictCode ?? "",
            Address: chuXeInfo?.Address ?? "",
            DOB: chuXeInfo?.DOB ?? "",
            IDCardNo: chuXeInfo?.IDCardNo ?? "",
            Email: chuXeInfo?.Email ?? "",
            TaxCode: chuXeInfo?.TaxCode ?? "",
            Fax: chuXeInfo?.Fax ?? "",
            Website: chuXeInfo?.Website ?? "",

            ContName: nguoiLienHeInfo?.ContName ?? "",
            ContTel: nguoiLienHeInfo?.ContTel ?? "",
            ContMobile: nguoiLienHeInfo?.ContMobile ?? "",
            ContAddress: nguoiLienHeInfo?.ContAddress ?? "",
            ContSex: nguoiLienHeInfo?.ContSex ?? "",
            ContFax: nguoiLienHeInfo?.ContFax ?? "",
            ContEmail: nguoiLienHeInfo?.ContEmail ?? "",

            CusTypeID: "",
            OrgTypeID: "",
            BankAccountNo: "",
            Note: "",
            IsContact: checkBox,
            Bank: "",
          });
          if (respone.isSuccess) {
            toast.success(t("Create successfully!"));
            handleClose();
            gridRef?.current?.refetchData();
            return true;
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
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    };
    //=============================handle-end===================================
    return (
      <Popup
        visible={showUploadPopup.visible}
        title={t("Edit")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 30}
        width={windowSize.width - 30}
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
          {/* <TabPanel className="tabPanelCustome">
            <Item title={t("customer information")}> */}
          <CustomerInfo
            chuXeEditRef={chuXeEditRef}
            nguoiLienHeRef={nguoiLienHeRef}
            setCheckBox={setCheckBox}
            checkBox={checkBox}
            formChuXeInfo={formChuXeInfo}
            formNguoiLienHe={formNguoiLienHe}
          />
          {/* </Item> */}
          {/* <Item title={t("car information")}>
              <CarInfo />
            </Item> */}
          {/* </TabPanel> */}
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
