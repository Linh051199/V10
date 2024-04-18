import { useI18n } from "@/i18n/useI18n";
import { FormOptions } from "@/types";
import { PopupView } from "@packages/ui/popup-view";
import { useAtom } from "jotai";
import { viewingDataAtom } from "./ser-mst-location";

export interface PopupViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const PopupViewComponent = ({
  onEdit,
  formSettings,
}: PopupViewProps) => {
  const { t } = useI18n("Ser_Mst_Location");
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
      title={t("Ser_Mst_Location_View")}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      formSettings={formSettings}
      data={viewingItem.item}
    />
  );
};
