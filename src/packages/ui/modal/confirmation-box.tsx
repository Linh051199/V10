import { useI18n } from "@/i18n/useI18n";
import { VisibilityControl } from "@packages/hooks";
import { useSlot, withSlot } from "@packages/hooks/useSlot";
import Button from "devextreme-react/button";
import Popup, { ToolbarItem } from "devextreme-react/popup";
import { PropsWithChildren } from "react";

export interface ModalBoxProps {
  control: VisibilityControl;
  onYesClick?: Function;
  onNoClick?: Function;
  title: string;
}
const ModalBoxRaw = ({
  control,
  title,
  onNoClick,
  onYesClick,
  children,
}: PropsWithChildren<ModalBoxProps>) => {
  const { t } = useI18n("Common");
  const handleYesClick = () => {
    control.close();
    onYesClick?.();
  };

  const handleNoClick = () => {
    control.close();
    onNoClick?.();
  };

  const BottomSlot = useSlot({
    name: "Bottom",
    children,
    fallback: <></>,
  });

  const ContentSlot = useSlot({
    name: "Content",
    children,
  });

  if (!control.visible) return "";

  return (
    <Popup
      showCloseButton={true}
      visible={true}
      dragEnabled={false}
      showTitle={true}
      title={title}
      onHiding={handleNoClick}
      height={200}
      width={400}
    >
      <BottomSlot />
      <ContentSlot />
      <ToolbarItem location="after" toolbar={"bottom"}>
        <Button
          className="w-[65px]"
          type="default"
          stylingMode="contained"
          text={t("Yes")}
          onClick={handleYesClick}
          width={100}
        />
      </ToolbarItem>
      <ToolbarItem location="after" toolbar={"bottom"}>
        <Button
          className="min-w-[65px] search-car-popup cancel-button"
          text={t("No")}
          onClick={handleNoClick}
          stylingMode="contained"
        />
      </ToolbarItem>
    </Popup>
  );
};
export const ModalBox = withSlot(ModalBoxRaw);
