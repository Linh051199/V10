import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Form, Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { CarInfo } from "./car-info";
import { useAtomValue, useSetAtom } from "jotai";
import { dataViewAtom, flagAtom, isUpdateAtom } from "../components/store";
import { CustomerInfo } from "./customer-info";

interface IPopupViewProps {
  visible: boolean;
  container: string;
  onHidding: () => void;
  createNewPopupRef: any;
}

export const PopupView = forwardRef(
  (
    { visible, container, onHidding, createNewPopupRef }: IPopupViewProps,
    viewRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_View");
    const windowSize = useWindowSize();
    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });

    const dataView = useAtomValue(dataViewAtom);

    const setdataView = useSetAtom(dataViewAtom);
    const setisUpdate = useSetAtom(isUpdateAtom);

    const ref = useRef<any>(null);
    const chuXeRef = useRef<Form>(null);
    const nguoiLienHeRef = useRef<Form>(null);

    const [listDistrict, setListDistrict] = useState<any>([]);
    const [checkBox, setCheckBox] = useState(dataView.IsContact);
    const [formChuXeInfo, setformChuXeInfo] = useState({
      CusID: "",
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

    useEffect(() => {
      if (dataView?.CustomerInfo?.CusID !== "") {
        setCheckBox(dataView?.CustomerInfo.IsContact);
        setformChuXeInfo({
          CusID: dataView?.CustomerInfo?.CusID ?? "",
          KhanhHang: dataView?.CustomerInfo?.IsContact ? "Cá nhân" : "Tổ chức",
          CusName: dataView?.CustomerInfo?.CusName ?? "",
          Sex: dataView?.CustomerInfo?.Sex === true ? "Nam" : "Nữ",
          Mobile: dataView?.CustomerInfo?.Mobile ?? "",
          Tel: dataView?.CustomerInfo?.Tel ?? "",

          ProvinceCode: dataView?.CustomerInfo?.ProvinceName ?? "",
          DistrictCode: dataView?.CustomerInfo?.DistrictName ?? "",
          Address: dataView?.CustomerInfo?.Address ?? "",
          DOB: dataView?.CustomerInfo?.DOB ?? "",
          IDCardNo: dataView?.CustomerInfo?.IDCardNo ?? "",

          Email: dataView?.CustomerInfo?.Email ?? "",
          TaxCode: dataView?.CustomerInfo?.TaxCode ?? "",
          Fax: dataView?.CustomerInfo?.Fax ?? "",
          Website: dataView?.CustomerInfo?.Website ?? "",
        });
        setformNguoiLienHe({
          ContName: dataView?.CustomerInfo?.ContName ?? "",
          ContTel: dataView?.CustomerInfo?.ContTel ?? "",
          ContMobile: dataView?.CustomerInfo?.ContMobile ?? "",

          ContAddress: dataView?.CustomerInfo?.ContAddress ?? "",
          ContSex: dataView?.CustomerInfo?.ContSex === true ? "Nam" : "Nữ",

          ContFax: dataView?.CustomerInfo?.ContFax ?? "",
          ContEmail: dataView?.CustomerInfo?.ContEmail ?? "",
        });
      }
    }, [dataView]);

    useImperativeHandle(viewRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showUploadPopup.open();
      },
      close() {
        showUploadPopup.close();
      },
    }));

    //=============================callAPI===================================

    //=============================callAPI-end===================================

    //=============================handle===================================
    const handleClose = async () => {
      await setdataView({
        CustomerInfo: {
          CusID: "",
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
        },
        CarInfo: {
          ContName: "",
          ContTel: "",
          ContMobile: "",

          ContAddress: "",
          ContSex: "",

          ContFax: "",
          ContEmail: "",
        },
      });
      showUploadPopup.close();
      onHidding();
    };
    const handleSave = async () => {
      setisUpdate(true);
      createNewPopupRef.current.show();
    };

    //=============================handle-end===================================
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
        height={windowSize.height - 30}
        width={windowSize.width - 30}
      >
        <div className="h-full">
          <TabPanel className="tabPanelCustome">
            <Item title={t("customer information")}>
              <CustomerInfo
                chuXeRef={chuXeRef}
                nguoiLienHeRef={nguoiLienHeRef}
                setCheckBox={setCheckBox}
                checkBox={checkBox}
                formChuXeInfo={formChuXeInfo}
                formNguoiLienHe={formNguoiLienHe}
                listDistrict={listDistrict}
                setListDistrict={setListDistrict}
              />
            </Item>
            <Item title={t("car information")}>
              <CarInfo dataView={dataView} />
            </Item>
          </TabPanel>
        </div>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Edit"),
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
