import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Form, LoadPanel, Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { CustomerInfo } from "./customer-info";
import { CarInfo } from "./car-info";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@/packages/api";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { toast } from "react-toastify";
import { useAtomValue, useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { dataViewAtom, isUpdateAtom } from "../components/store";
import { formatDate } from "@/packages/common/date_utils";
import { format } from "date-fns";

interface IPopupAddNewProps {
  visible: boolean;
  container: string;

  onHidding: () => void;
  gridRef: any;

  viewPopupRef: any;
}

export const PopupAddNew = forwardRef(
  (
    { visible, container, onHidding, gridRef, viewPopupRef }: IPopupAddNewProps,
    createNewRef: any
  ) => {
    const { t } = useI18n("Ser_CustomerCar_AddNew");
    const windowSize = useWindowSize();
    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });
    const api = useClientgateApi();

    const isUpdate = useAtomValue(isUpdateAtom);
    const dataView = useAtomValue(dataViewAtom);

    const setisUpdate = useSetAtom(isUpdateAtom);
    const showError = useSetAtom(showErrorAtom);

    const ref = useRef<any>(null);
    const chuXeRef = useRef<Form>(null);
    const nguoiLienHeRef = useRef<Form>(null);

    const [listDistrict, setListDistrict] = useState<any>([]);
    const [updateSusses, setUpdateSusses] = useState(false);
    const [checkBox, setCheckBox] = useState(true);
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

    useImperativeHandle(createNewRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showUploadPopup.open();
      },
    }));

    useEffect(() => {
      if (dataView?.CustomerInfo?.CusID !== "") {
        setCheckBox(dataView?.CustomerInfo.IsContact);
        setformChuXeInfo({
          CusID: dataView?.CustomerInfo?.CusID ?? "",
          KhanhHang: dataView?.CustomerInfo?.IsContact ? "1" : "2",
          CusName: dataView?.CustomerInfo?.CusName ?? "",
          Sex: dataView?.CustomerInfo?.Sex === true ? "1" : "0",
          Mobile: dataView?.CustomerInfo?.Mobile ?? "",
          Tel: dataView?.CustomerInfo?.Tel ?? "",

          ProvinceCode: dataView?.CustomerInfo?.ProvinceCode ?? "",
          DistrictCode: dataView?.CustomerInfo?.DistrictCode ?? "",
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
          ContSex: dataView?.CustomerInfo?.ContSex === "True" ? "1" : "0",

          ContFax: dataView?.CustomerInfo?.ContFax ?? "",
          ContEmail: dataView?.CustomerInfo?.ContEmail ?? "",
        });
      }
    }, [dataView]);

    //=============================callAPI===================================

    //=============================callAPI-end===================================

    //=============================handle===================================
    const handleClose = () => {
      if (updateSusses) {
        gridRef?.current?.refetchData();
        setUpdateSusses(false);
      }
      gridRef.current?.getDxInstance()?.cancelEditData();
      showUploadPopup.close();
      viewPopupRef?.current?.close();
      setformChuXeInfo({
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
      setformNguoiLienHe({
        ContName: "",
        ContTel: "",
        ContMobile: "",

        ContAddress: "",
        ContSex: "",

        ContFax: "",
        ContEmail: "",
      });
      setisUpdate(false);
      setCheckBox(true);
    };
    const handleSave = async () => {
      const validate = chuXeRef.current?.instance?.validate();
      const validateNguoiLienHe = nguoiLienHeRef.current?.instance?.validate();

      if (!checkBox) {
        if (!validate?.isValid || !validateNguoiLienHe?.isValid) {
          return;
        }
      } else {
        if (!validate?.isValid) {
          return;
        }
      }

      ConfirmComponent({
        asyncFunction: async () => {
          const chuXeInfo = chuXeRef?.current?.props?.formData;
          const nguoiLienHeInfo = nguoiLienHeRef?.current?.props?.formData;

          if (isUpdate) {
            const respone = await api.Ser_CustomerCar_Update({
              CusID: formChuXeInfo?.CusID ?? "",
              CusName: chuXeInfo?.CusName ?? "",
              Sex: chuXeInfo?.Sex === "1" ? true : false,
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
              ContSex: nguoiLienHeInfo?.ContSex === "1" ? true : false,

              ContFax: nguoiLienHeInfo?.ContFax ?? "",
              ContEmail: nguoiLienHeInfo?.ContEmail ?? "",

              Bank: "",
              BankAccountNo: "",
              IsContact: checkBox,
              Note: "",
              CusTypeID: "",
              OrgTypeID: "",
              IsActive: true,
            });
            if (respone.isSuccess) {
              toast.success(t("Update successfully!"));
              setUpdateSusses(true);
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
          } else {
            const respone = await api.Ser_CustomerCar_Create({
              Sex: chuXeInfo?.Sex === "1" ? true : false,
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
              ContSex: nguoiLienHeInfo?.ContSex === "1" ? true : false,
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
              setUpdateSusses(true);
              setisUpdate(true);
              setformChuXeInfo({
                ...formChuXeInfo,
                CusID: respone?.Data?.CusID ?? "",
                CusName: respone?.Data?.CusName ?? "",
                Sex: respone?.Data?.Sex === true ? "1" : "0",
                Mobile: respone?.Data?.Mobile ?? "",
                Tel: respone?.Data?.Tel ?? "",

                ProvinceCode: respone?.Data?.ProvinceCode ?? "",
                DistrictCode: respone?.Data?.DistrictCode ?? "",
                Address: respone?.Data?.Address ?? "",
                DOB: respone?.Data?.DOB ?? "",
                IDCardNo: respone?.Data?.IDCardNo ?? "",

                Email: respone?.Data?.Email ?? "",
                TaxCode: respone?.Data?.TaxCode ?? "",
                Fax: respone?.Data?.Fax ?? "",
                Website: respone?.Data?.Website ?? "",
              });
              setformNguoiLienHe({
                ContName: respone?.Data?.ContName ?? "",
                ContTel: respone?.Data?.ContTel ?? "",
                ContMobile: respone?.Data?.ContMobile ?? "",

                ContAddress: respone?.Data?.ContAddress ?? "",
                ContSex: respone?.Data?.ContSex === ("True" as any) ? "1" : "0",

                ContFax: respone?.Data?.ContFax ?? "",
                ContEmail: respone?.Data?.ContEmail ?? "",
              });

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
        title={isUpdate ? t("Update") : t("AddNew")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 100}
        width={windowSize.width - 50}
      >
        <div className="h-full">
          <TabPanel className="tabPanelCustome">
            <Item title={t("customer information")}>
              <CustomerInfo
                chuXeRef={chuXeRef}
                nguoiLienHeRef={nguoiLienHeRef}
                setCheckBox={setCheckBox}
                checkBox={checkBox ?? true}
                formChuXeInfo={formChuXeInfo}
                formNguoiLienHe={formNguoiLienHe}
                listDistrict={listDistrict}
                setListDistrict={setListDistrict}
                handleClose={handleClose}
                setUpdateSusses={setUpdateSusses}
              />
            </Item>
            {isUpdate ? (
              <Item title={t("car information")}>
                <CarInfo
                  formChuXeInfo={formChuXeInfo}
                  setUpdateSusses={setUpdateSusses}
                />
              </Item>
            ) : (
              <></>
            )}
          </TabPanel>
        </div>
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: isUpdate ? t("Update") : t("Save"),
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
