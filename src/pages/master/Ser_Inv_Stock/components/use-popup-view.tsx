import { useAtom } from "jotai";

import { useI18n } from "@/i18n/useI18n";
import { viewingDataAtom } from "./store";
import { FormOptions } from "@/types";
import { PopupView } from "@packages/ui/popup-view";

export interface ISer_Inv_Stock_PopupViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const Ser_Inv_Stock_PopupView = ({
  onEdit,
  formSettings,
}: ISer_Inv_Stock_PopupViewProps) => {
  const { t } = useI18n("Ser_Inv_Stock");

  const [viewingItem, setViewingItem] = useAtom(viewingDataAtom);

  const handleEdit = () => {
    let rowIndex = viewingItem?.rowIndex;
    if (viewingItem) {
      setViewingItem(undefined);
    }
    if (typeof rowIndex === "number") {
      onEdit(rowIndex);
    }
  };

  const handleCancel = () => {
    setViewingItem(undefined);
  };

  return (
    <PopupView
      visible={!!viewingItem.item}
      title={t("Ser_Inv_Stock_PopupView")}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      formSettings={formSettings}
      data={viewingItem.item}
      width={1100}
      height={550}
    />
  );
};
