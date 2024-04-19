import { useI18n } from "@/i18n/useI18n";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { Icon } from "@/packages/ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderForm } from "./header-form/header-form";
import { useRef } from "react";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("XuatKho_CreateNew");
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
          onClick={handleGoBack}
        >
          {t("XuatKho")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t("XuatKho_Create")}
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

export const CreateNew = () => {
  const { t } = useI18n("XuatKho_CreateNew");
  const navigate = useNavigate();
  const formRef = useRef<any>(null);

  //==================Handle==============================================
  const handleCancel = () => {
    navigate(-1);
  };

  //==================Handle-end==============================================

  //==================rightButtons==============================================
  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      label: t("Lưu"),
      onClick: async (e: any) => {
        //     const validate = formRef.current?.instance.validate();
        //     if (!validate?.isValid) {
        //       return;
        //     }
        //     const formData = formRef.current?.instance.option("formData");
        //     ConfirmComponent({
        //       asyncFunction: async () => {
        //         setLoad(true);
        //         const responsive = await api.Mst_TrainingDtl_CreateHQ(formData);
        //         if (responsive.isSuccess) {
        //           toast.success(t("CreatedSuccessfully"));
        //           queryClient.removeQueries([QueryNames.MST_TRANINGDTL_CB]);
        //           setformData({
        //             TrainingUserCode: "",
        //             TrainingName: "",
        //             SMHyundaiCode: "",
        //             SMName: "",
        //             FormalityTraining: "",
        //             OrganizeDate: "",
        //             Place: "",
        //             ResultIn: "",
        //             ResultOut: "",
        //           });
        //         } else {
        //           showError({
        //             message: t(responsive._strErrCode),
        //             _strErrCode: responsive._strErrCode,
        //             _strTId: responsive._strTId,
        //             _strAppTId: responsive._strAppTId,
        //             _objTTime: responsive._objTTime,
        //             _strType: responsive._strType,
        //             _dicDebug: responsive._dicDebug,
        //             _dicExcs: responsive._dicExcs,
        //           });
        //         }
        //         setLoad(false);
        //       },
        //       title: t("Confirm"),
        //       contentConfirm: t("Do you want to save?"),
        //     });
      },
      className: "px-[4px]",
    },
    {
      validationGroup: "main",
      label: t("Lưu và tạo mới"),
      onClick: async (e: any) => {
        //     const validate = formRef.current?.instance.validate();
        //     if (!validate?.isValid) {
        //       return;
        //     }
        //     const formData = formRef.current?.instance.option("formData");
        //     ConfirmComponent({
        //       asyncFunction: async () => {
        //         setLoad(true);
        //         const responsive = await api.Mst_TrainingDtl_CreateHQ(formData);
        //         if (responsive.isSuccess) {
        //           toast.success(t("CreatedSuccessfully"));
        //           queryClient.removeQueries([QueryNames.MST_TRANINGDTL_CB]);
        //           setformData({
        //             TrainingUserCode: "",
        //             TrainingName: "",
        //             SMHyundaiCode: "",
        //             SMName: "",
        //             FormalityTraining: "",
        //             OrganizeDate: "",
        //             Place: "",
        //             ResultIn: "",
        //             ResultOut: "",
        //           });
        //         } else {
        //           showError({
        //             message: t(responsive._strErrCode),
        //             _strErrCode: responsive._strErrCode,
        //             _strTId: responsive._strTId,
        //             _strAppTId: responsive._strAppTId,
        //             _objTTime: responsive._objTTime,
        //             _strType: responsive._strType,
        //             _dicDebug: responsive._dicDebug,
        //             _dicExcs: responsive._dicExcs,
        //           });
        //         }
        //         setLoad(false);
        //       },
        //       title: t("Confirm"),
        //       contentConfirm: t("Do you want to save?"),
        //     });
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
  //==================rightButtons-end==============================================

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name={"Header"}>
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <HeaderForm ref={formRef} />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
