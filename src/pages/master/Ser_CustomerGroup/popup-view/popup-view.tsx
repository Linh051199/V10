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
import { HeaderFormView } from "./header-form-view";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { toast } from "react-toastify";
import { Lst_Ser_CustomerGroup } from "./Lst_Ser_CustomerGroup";

interface IPopupViewNewProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  gridRef: any;
  createNewPopupRef: any;
}

export const PopupView = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      gridRef,
      createNewPopupRef,
    }: IPopupViewNewProps,
    addNewRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerGroup_View");
    const windowSize = useWindowSize();
    const api = useClientgateApi();

    const dataView = useAtomValue(dataViewAtom);

    const showError = useSetAtom(showErrorAtom);
    const setIsUpdate = useSetAtom(isUpdateAtom);

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

    useImperativeHandle(addNewRef, () => ({
      show() {
        showUploadPopup.open();
      },
    }));

    useEffect(() => {
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
    }, [dataView]);

    //=========================handle=======================================
    const handleClose = () => {
      showUploadPopup.close();
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
      lstCusRef?.current?.getGridViewOneRef()?.current?.setData([]);
    };
    const handleEdit = async () => {
      setIsUpdate(true);
      handleClose();
      createNewPopupRef?.current?.show();
    };
    //=========================handle-end=======================================

    return (
      <Popup
        visible={showUploadPopup.visible}
        title={t("View")}
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
            <HeaderFormView ref={formRef} formData={formData} />
            <div className={"separator"} />
            <Lst_Ser_CustomerGroup ref={lstCusRef} />
          </ScrollView>
        </div>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Edit"),
            type: "default",
            stylingMode: "contained",
            onClick: handleEdit,
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
