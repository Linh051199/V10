import { useI18n } from "@/i18n/useI18n";
import { FormOptions } from "@/types";
import { PopupView } from "@packages/ui/popup-view";
import { useAtom } from "jotai";
import { viewingDataAtom } from "./store";

export interface Ser_InsuranceContract_PopupViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const Ser_InsuranceContract_PopupView = ({
  onEdit,
  formSettings,
}: Ser_InsuranceContract_PopupViewProps) => {
  const { t } = useI18n("Ser_InsuranceContract");
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
      title={t("Ser_InsuranceContract_PopupView")}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      formSettings={formSettings}
      data={viewingItem.item}
      width={1100}
      height={500}
    />
  );
};
