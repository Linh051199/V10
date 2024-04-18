import { useI18n } from "@/i18n/useI18n";
import { FormOptions } from "@/types";
import { PopupView } from "@packages/ui/popup-view";
import { useAtom } from "jotai";
import { viewingDataAtom } from "./store";

export interface QuanLyAnhTrenPhieuTNGX_PopupViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
}

export const QuanLyAnhTrenPhieuTNGX_PopupView = ({
  onEdit,
  formSettings,
}: QuanLyAnhTrenPhieuTNGX_PopupViewProps) => {
  const { t } = useI18n("QuanLyAnhTrenPhieuTNGX");
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
      title={t("QuanLyAnhTrenPhieuTNGX_PopupView")}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      formSettings={formSettings}
      data={viewingItem.item}
      width={1100}
      height={500}
    />
  );
};
