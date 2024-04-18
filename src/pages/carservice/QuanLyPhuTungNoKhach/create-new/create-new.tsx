import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";
import { HeaderFormEdit } from "./header-form-edit";
import { useAtom } from "jotai";
import { openPopupAtom } from "../store";

interface IPopupCreateNew {
  onSave: any;
}

export const PopupCreateNew = forwardRef(({ onSave }: IPopupCreateNew, ref) => {
  const { t: common } = useI18n("Common");
  const { t } = useI18n("CreateNewQuanLyPhuTungNoKhach");
  const [open, setOpen] = useState(false);
  const formRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    showPopup() {
      setOpen(true);
    },
  }));



  const onHidding = () => {
    setOpen(false);
  };
  return (
    <Popup
      title={t("CreateNew")}
      showCloseButton={true}
      onHidden={onHidding}
      visible={open}
      hideOnOutsideClick={true}
      position={"center"}
      onHiding={onHidding}
    >
      <HeaderFormEdit ref={formRef} />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        cssClass="btn-cancel"
        options={{
          text: common("Save"),
          onClick: onSave,
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
          onClick: onHidding,
          stylingMode: "contained",
          type: "default",
        }}
      />
    </Popup>
  );
});
