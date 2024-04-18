import { useI18n } from "@/i18n/useI18n";
import Button from "devextreme-react/button";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useAtom } from "jotai";
import { openPopupAtom } from "../base-gridview/store/popup-grid-store";
import { Icon } from "../icons";

export default function GetDataWH({ formRef, checkBoxRef, onSearch }: any) {
  const [open, setOpen] = useAtom(openPopupAtom);

  const { t } = useI18n("getDataWH");

  const handleClose = () => {
    formRef.current?.instance.updateData("FlagDataWH", false);
    checkBoxRef?.current?.instance.option("value", false);
    setOpen(false);
  };

  const handleSubmit = () => {
    formRef.current?.instance.updateData("FlagDataWH", true);

    const data = formRef.current?.instance?.option("formData");

    onSearch(data);
    setOpen(false);
  };

  const title = t("Notification");

  return (
    open && (
      <Popup
        showCloseButton={true}
        onHidden={handleSubmit}
        titleRender={(item: any) => (
          <div className="flex items-center gap-2">
            <Icon name="warning" size={20} />
            <div className="title-wh">{title}</div>
          </div>
        )}
        visible={true}
        position={"center"}
        width={430}
        height={200}
      >
        <Position at="top" my="center" />
        <ToolbarItem toolbar="bottom" location="after">
          <Button
            text={t("OK")}
            className="apply-button-wh"
            onClick={handleSubmit}
          />
        </ToolbarItem>
        <ToolbarItem toolbar="bottom" location="after">
          <Button
            text={t("Close")}
            className="cancel-button"
            onClick={handleClose}
          />
        </ToolbarItem>
        <div>
          <p className="leading-[22px] text-[13px]">
            {t(" Bạn đang chọn xem ")}
            <b>"{t("Tất cả dữ liệu lịch sử")}"</b>, {t("dữ liệu này chỉ được ")}
            <b>{t("XEM")}</b>
            {t(" và")} <b>{t("KHÔNG")}</b>
            {t(" được phép ")} <b>{t(" THAY ĐỔI.")}</b>
          </p>
          <p className="leading-[22px] text-[13px]">
            {t("Việc tìm kiếm dữ liệu sẽ ")} <b>{t("KHÁ CHẬM,")}</b>
            {t(" bạn đã chắc chắn chưa?")}
          </p>
        </div>
      </Popup>
    )
  );
}
