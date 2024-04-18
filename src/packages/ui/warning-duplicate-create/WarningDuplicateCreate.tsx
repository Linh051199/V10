import { useI18n } from "@/i18n/useI18n";
import Button from "devextreme-react/button";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useAtom } from "jotai";
import { Icon, IconName } from "../icons";
import { openPopupWarningDuplicateCreateAtom } from "./atom";

export const WarningDuplicateCreate = ({
  visible,
  message = "Duplicate",
  typeIcon = "warning",
}: {
  visible: boolean;
  message?: string;
  typeIcon?: IconName;
}) => {
  const [open, setOpen] = useAtom(openPopupWarningDuplicateCreateAtom);

  const { t } = useI18n("WarningDuplicateCreate");
  const title = t("Notification");
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Popup
      showCloseButton={true}
      onHidden={handleClose}
      //   titleRender={(item: any) => (
      //     <div className="flex items-center gap-2">
      //       {/* <Icon name="warning" size={20} /> */}
      //       <div className="title-wh">{title}</div>
      //     </div>
      //   )}
      title={"Notification"}
      showTitle={true}
      visible={visible}
      position={"center"}
      width={430}
      height={180}
    >
      <Position at="top" my="center" />
      <div className={"flex item-center justify-between justify-items-center"}>
        <div>
          <Icon name={typeIcon} size={40} />
        </div>
        <div>
          <h6 className="leading-[22px] text-[13px] pl-[10px]">{t(message)}</h6>
        </div>
      </div>
      <ToolbarItem toolbar="bottom" location="after">
        <Button
          text={t("Close")}
          className="cancel-button"
          onClick={handleClose}
        />
      </ToolbarItem>
    </Popup>
  );
};
