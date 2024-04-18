import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { Form, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { HeaderFormView } from "./header-form-view";
import { Ser_ServicePackagePartItems } from "./Ser_ServicePackagePartItems";
import { Ser_ServicePackageServiceItems } from "./Ser_ServicePackageServiceItems";
import { useAtomValue, useSetAtom } from "jotai";
import {
  dataViewAtom,
  formDataTotalAddNewAtom,
  formDataTotalPartAtom,
  formDataTotalServiceAtom,
  formHourAtom,
  isUpdateAtom,
} from "../components/screen-atom";
import { FormTotal } from "../popup-add/form-total";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

interface IViewPopupProps {
  visible: boolean;
  container: string;
  onHidding: () => void;
  position: "left" | "right";
  createNewPopupRef: any;
}

export const ViewPopup = forwardRef(
  (
    { visible, container, onHidding, createNewPopupRef }: IViewPopupProps,
    viewRef: any
  ) => {
    const { t } = useI18n("Ser_ServicePackage_View");
    const showViewPopup = useVisibilityControl({ defaultVisible: visible });

    const dataView = useAtomValue(dataViewAtom);
    const formDataTotalService = useAtomValue(formDataTotalServiceAtom);
    const formDataTotalPart = useAtomValue(formDataTotalPartAtom);
    const setFormDataTotalService = useSetAtom(formDataTotalServiceAtom);
    const setFormDataTotalPart = useSetAtom(formDataTotalPartAtom);
    const setFormDataTotalAddNew = useSetAtom(formDataTotalAddNewAtom);
    const setIsUpdate = useSetAtom(isUpdateAtom);
    const setFormHour = useSetAtom(formHourAtom);
    const windowSize = useWindowSize();

    const ref = useRef<any>(null);

    const [formData, setFormData] = useState({});

    useImperativeHandle(viewRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showViewPopup.open();
      },
      close() {
        showViewPopup.close();
      },
    }));

    useEffect(() => {
      setFormData({
        ServicePackageNo: dataView?.Ser_ServicePackage?.ServicePackageNo ?? "",
        ServicePackageName:
          dataView?.Ser_ServicePackage?.ServicePackageName ?? "",
        Description: dataView?.Ser_ServicePackage?.Description ?? "",
        CreatedDate: dataView?.Ser_ServicePackage?.CreatedDate ?? "",
        IsPublicFlag:
          dataView?.Ser_ServicePackage?.IsPublicFlag === "1" ? true : false,
        IsUserBasePrice:
          dataView?.Ser_ServicePackage?.IsUserBasePrice === "1" ? true : false,
      });
      handleUpdateTotal(
        dataView?.Lst_Ser_ServicePackageServiceItems,
        dataView?.Lst_Ser_ServicePackagePartItems
      );
    }, [dataView]);

    //=============================handle===================================
    const handleClose = () => {
      showViewPopup.close();
      setFormData({
        ServicePackageNo: "",
        ServicePackageName: "",
        Description: "",
        CreatedDate: "",
        IsPublicFlag: "",
        IsUserBasePrice: "",
      });
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
      setFormHour({
        Hour: "",
      });
      onHidding();
    };
    const handleEdit = async () => {
      setIsUpdate(true);
      // handleClose();
      createNewPopupRef?.current?.show();
    };

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

    //=============================handle-end===================================
    return (
      <Popup
        visible={showViewPopup.visible}
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
            <HeaderFormView formData={formData} />
            <div className={"separator"} />
            <Ser_ServicePackageServiceItems />
            <div className={"separator"} />
            <Ser_ServicePackagePartItems />
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
