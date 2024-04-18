import { useAtom, useSetAtom } from "jotai";

import { useI18n } from "@/i18n/useI18n"; 
import { FormOptions } from "@/types";
import { PopupView } from "@packages/ui/popup-view";
import { viewingDataAtom } from "./screen-atom";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useClientgateApi } from "@/packages/api";
import { toast } from "react-toastify";
import { showErrorAtom } from "@/packages/store";

export interface IMst_CarModelStd_PopupViewProps {
  onEdit: (rowIndex: number) => void;
  formSettings: FormOptions;
  gridRef:any
}

export const Mst_CarModelStd_PopupView = ({
  onEdit,
  formSettings,
  gridRef
}: IMst_CarModelStd_PopupViewProps) => {
  const { t } = useI18n("Mst_CarModelStd");
const  api = useClientgateApi();
const showError = useSetAtom(showErrorAtom); // hiển thị lỗi

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
  const handleDelete = () => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Mst_CarModelStd_Delete({
          ModelCode: viewingItem?.item?.ModelCode,
        });
        if (respone.isSuccess) {
          toast.success(t("Delete successfully!"));
          gridRef?.current?.refetchData();
          handleCancel();
          return true;
        }
        showError({
          message: t(respone._strErrCode),
          _strErrCode: respone._strErrCode,
          _strTId: respone._strTId,
          _strAppTId: respone._strAppTId,
          _objTTime: respone._objTTime,
          _strType: respone._strType,
          _dicDebug: respone._dicDebug,
          _dicExcs: respone._dicExcs,
        });
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };

  return (
    <PopupView
      visible={!!viewingItem.item}
      title={t("Mst_CarModelStd_PopupView")}
      handleEdit={handleEdit}
      handleCancel={handleCancel}
      handleDelete={handleDelete}
      formSettings={formSettings}
      data={viewingItem.item}
      colCount={1}
      width={700}
      height={300}
    />
  );
};
