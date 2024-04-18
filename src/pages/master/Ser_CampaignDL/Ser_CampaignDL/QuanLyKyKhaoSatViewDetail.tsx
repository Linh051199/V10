import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderFormEdit } from "./header-form-edit";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { useRef } from "react";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { CarList } from "./car-list";
import Form from "devextreme-react/form";
import { DataGrid, LoadPanel } from "devextreme-react";
import { toast } from "react-toastify";
import { Icon } from "@packages/ui/icons";
import { QueryNames } from "../Ser_CampaignDL-common";

interface HeaderProps {
  rightButtons: BButtonProps[]
  data: any
}

const Header = ({ rightButtons, data }: HeaderProps) => {
  const { t } = useI18n("QuanLyKyKhaoSat");
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }


  return (
    <div className="w-full flex items-center justify-between h-[55px] p-2 ml-[16px] page-header">
      <div className={'flex items-center justify-center'}>
        <div className={'screen text-[#5F7D95] font-[400] text-[14px] hover:cursor-pointer'} onClick={handleGoBack}>
          {t("QuanLyKyKhaoSatManagementPage")}
        </div>
        <Icon name={'chevronRight'} className={'mx-2'} />
        <div className={'screen screen-leaf text-[#0E223D] text-[14px] font-[600]'}>
          {t("QuanLyKyKhaoSatViewDetail")}
        </div>
      </div>
      <div>
        {rightButtons.map((button, idx) => (
          <BButton
            key={idx}
            {...button}
          />
        ))}
      </div>
    </div>
  );
};
export const QuanLyKyKhaoSatViewDetail = () => {
  const { t } = useI18n("QuanLyKyKhaoSatViewDetail");
  const navigate = useNavigate()
  const handleCancel = () => {
    navigate(-1)
  }
  const param = useParams()
  const DlrPDIReqNo = param.code
  const api = useClientgateApi()
  const showError = useSetAtom(showErrorAtom)
  const queryClient = useQueryClient()
  // const { data: newCode, isLoading: isGettingNewCode } = useQuery(
  //   {
  //     queryKey: [QueryNames.DLR_CONTRACT_CANCEL, QueryNames.GET_DLR_CONTRACT_CANCEL, 'view'],
  //     queryFn: async () => {
  //       const response = await api.QuanLyKyKhaoSat_GetDLByDlrPDIReqNo(DlrPDIReqNo)
  //       if (response.isSuccess) {
  //         console.log(67, response)
  //         return response.Data
  //       }
  //       showError({
  //         message: t(response._strErrCode),
  //         _strErrCode: response._strErrCode,
  //         _strTId: response._strTId,
  //         _strAppTId: response._strAppTId,
  //         _objTTime: response._objTTime,
  //         _strType: response._strType,
  //         _dicDebug: response._dicDebug,
  //         _dicExcs: response._dicExcs,
  //       });
  //       return null
  //     }
  //   }
  // )

  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      label: t("ApproveDL"),
      // visible: newCode?.Lst_Dlr_PDIRequest[0].DlrPDIReqStatus === 'P' ? true : false,
      onClick: async (e: any) => {
        // const validate = formRef.current?.instance.validate()
        // if (!validate?.isValid) {
        //   return
        // }
        // const response = await api.QuanLyKyKhaoSat_ApproveDL(newCode?.Lst_Dlr_PDIRequest[0])
        // if (response.isSuccess) {
        //   toast.success(t("ApproveDLSuccessfully"))
        //   queryClient.removeQueries([QueryNames.DLR_CONTRACT_CANCEL])
        //   navigate(-1)
        // } else {
        //   showError({
        //     message: t(response._strErrCode),
        //     _strErrCode: response._strErrCode,
        //     _strTId: response._strTId,
        //     _strAppTId: response._strAppTId,
        //     _objTTime: response._objTTime,
        //     _strType: response._strType,
        //     _dicDebug: response._dicDebug,
        //     _dicExcs: response._dicExcs,
        //   });

        // }
      },
    },
    {
      validationGroup: "main",
      label: t("Delete"),
      // visible: newCode?.Lst_Dlr_PDIRequest[0].DlrPDIReqStatus === 'P' ? true : false,
      onClick: async (e: any) => {
        // const response = await api.QuanLyKyKhaoSat_DeleteDL(DlrPDIReqNo)
        // if (response.isSuccess) {
        //   toast.success(t("DeleteSuccessfully"))
        //   queryClient.removeQueries([QueryNames.DLR_CONTRACT_CANCEL])
        //   navigate(-1)
        // } else {
        //   showError({
        //     message: t(response._strErrCode),
        //     _strErrCode: response._strErrCode,
        //     _strTId: response._strTId,
        //     _strAppTId: response._strAppTId,
        //     _objTTime: response._objTTime,
        //     _strType: response._strType,
        //     _dicDebug: response._dicDebug,
        //     _dicExcs: response._dicExcs,
        //   });
        // }
      },
      className: "px-[4px]"
    },
    {
      label: t("Cancel"),
      className: "p-0 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel
    }
  ]


  // const { data: realTime, isLoading: isGettingRealTime } = useQuery(
  //   {
  // queryKey: [QueryNames.DLR_CONTRACT_CANCEL, QueryNames.GET_DLR_CONTRACT_CANCEL, 'getTime'],
  // queryFn: async () => {
  // const response = await api.GetTime()
  // if (response.isSuccess) {
  //   return response.Data
  // }
  // showError({
  //   message: t(response._strErrCode),
  //   _strErrCode: response._strErrCode,
  //   _strTId: response._strTId,
  //   _strAppTId: response._strAppTId,
  //   _objTTime: response._objTTime,
  //   _strType: response._strType,
  //   _dicDebug: response._dicDebug,
  //   _dicExcs: response._dicExcs,
  // });
  // return null
  //     }
  //   }
  // )

  const gridRef = useRef<DataGrid>(null)
  const formRef = useRef<Form>(null)
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        {/* <Header rightButtons={rightButtons} data={newCode} /> */}
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <LoadPanel visible={false} showPane={true} showIndicator={true} />
        <>
          {/* <HeaderFormEdit
              // code={newCode}
              ref={formRef}
              time={realTime}
            // data={newCode}
            /> */}
          <div className={'separator'} />
          <CarList
            ref={gridRef}
            data={[]}
          />
        </>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
