import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useNavigate } from "react-router-dom";
import { HeaderFormEdit } from "./header-form-edit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { useRef } from "react";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import Form from "devextreme-react/form";
import { DataGrid, LoadPanel, ScrollView } from "devextreme-react";
import { toast } from "react-toastify";
import { Icon } from "@packages/ui/icons";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { usePermissions } from "@/packages/contexts/permission";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("Mst_Param_Optional");
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full flex items-center justify-between h-[55px] p-2 ml-[16px] page-header">
      <div className={"flex items-center justify-center"}>
        <div
          className={
            "screen text-[#5F7D95] font-[400] text-[14px] hover:cursor-pointer"
          }
          // onClick={handleGoBack}
        >
          {" "}
          <b>{t("Mst_Param_Optional")}</b>
        </div>
      </div>
      <div>
        {rightButtons.map((button, idx) => (
          <BButton key={idx} {...button} />
        ))}
      </div>
    </div>
  );
};
export const Mst_Param_OptionalPage = () => {
  const { t } = useI18n("Mst_Param_Optional");
  const navigate = useNavigate();
  const api = useClientgateApi();
  const { isHQ } = usePermissions();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom);

  const formRef = useRef<Form>(null);

  const handleCancel = () => {
    navigate(-1);
  };

  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      label: t("Save"),
      onClick: async (e: any) => {
        ConfirmComponent({
          asyncFunction: async () => {
            const validate = formRef.current?.instance.validate();
            if (!validate?.isValid) {
              return;
            }
            const inforCurrentUser = await api.GetForCurrentUser();
            if (!isHQ()) {
              if (inforCurrentUser.isSuccess) {
                const formData = formRef.current?.instance.option("formData");
                let params = [];
                for (let [key, value] of Object.entries(formData)) {
                  params.push({
                    ParamCode: key,
                    DealerCode: inforCurrentUser.Data?.Sys_User.DealerCode,
                    ParamValue:
                      typeof value === "boolean" ? (value ? "1" : "0") : value,
                    LogLUDateTime: null,
                    ParamType: "Optional",
                    LogLUBy: null,
                    // LogLUBy: "DEV.DL",
                  });
                }

                const request = { Lst_Mst_Param: params };

                const response = await api.Mst_Param_Optional_Save(request);

                if (response.isSuccess) {
                  toast.success(t("CreatedSuccessfully"));
                  formRef.current?.instance.repaint();
                } else {
                  showError({
                    message: t(response._strErrCode),
                    _strErrCode: response._strErrCode,
                    _strTId: response._strTId,
                    _strAppTId: response._strAppTId,
                    _objTTime: response._objTTime,
                    _strType: response._strType,
                    _dicDebug: response._dicDebug,
                    _dicExcs: response._dicExcs,
                  });
                }
              } else {
                showError({
                  message: t(inforCurrentUser._strErrCode),
                  _strErrCode: inforCurrentUser._strErrCode,
                  _strTId: inforCurrentUser._strTId,
                  _strAppTId: inforCurrentUser._strAppTId,
                  _objTTime: inforCurrentUser._objTTime,
                  _strType: inforCurrentUser._strType,
                  _dicDebug: inforCurrentUser._dicDebug,
                  _dicExcs: inforCurrentUser._dicExcs,
                });
              }
            } else {
              toast.warning(t("PermissionDenied"));
            }
          },
          title: "Confirm save",
          contentConfirm: t("Are you sure ?"),
        });
      },
      className: "px-[4px]",
    },
    {
      label: t("Cancel"),
      className: "p-0 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel,
    },
  ];

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content" height={windowSize.height - 20}>
        <ScrollView scrollByContent={true} scrollByThumb={true}>
          <HeaderFormEdit ref={formRef} />
        </ScrollView>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
