import { useI18n } from "@/i18n/useI18n";
import { Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";

interface IPopupTimKiemThongTinKhachHang {
  control: Control;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
  handleClose: any;
  visible: boolean;
}

const PopupTimKiemThongTinKhachHang = ({
  control,
  errors,
  watch,
  handleClose,
  visible,
}: IPopupTimKiemThongTinKhachHang) => {
  const { t: common } = useI18n("Common");

  const renderInfor = () => {
    return <></>;
  };

  return (
    <Popup
      visible={visible}
      title="Tìm kiếm thông tin khách hàng"
      contentRender={renderInfor}
      height={500}
      wrapperAttr={{
        class: "custom-popup",
      }}
      showCloseButton
    >
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        cssClass="btn-cancel"
        options={{
          text: common("Save"),
          onClick: handleClose,
          stylingMode: "contained",
          type: "default",
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        cssClass="btn-cancel"
        options={{
          text: common("Cancel"),
          onClick: handleClose,
          stylingMode: "contained",
          type: "default",
        }}
      />
    </Popup>
  );
};

export default PopupTimKiemThongTinKhachHang;
