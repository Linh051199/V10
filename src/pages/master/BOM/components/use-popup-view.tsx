import { useI18n } from "@/i18n/useI18n";
import { FormOptions } from "@/types";
import { PopupView } from "@packages/ui/popup-view";
import { useAtom } from "jotai";
import { viewingDataAtom } from "./store";

export interface BOM_PopupViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const BOM_PopupView = ({ onEdit, formSettings }: BOM_PopupViewProps) => {
  const { t } = useI18n("BOM");
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
    <div>
      <PopupView
        visible={!!viewingItem.item}
        title={t("BOM_PopupView")}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        formSettings={formSettings}
        data={viewingItem.item}
        width={1100}
        height={500}
      />
      <span>abccccc</span>
    </div>
  );
};
