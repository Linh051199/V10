import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { useMemo, useRef, useState } from "react";
import { HeaderDetail } from "./HeaderDetail";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { LoadPanel, ScrollView } from "devextreme-react";
import { match } from "ts-pattern";
import { toast } from "react-toastify";
import { useStateRestore, useVisibilityControl } from "@packages/hooks";
import { Icon } from "@packages/ui/icons";
import { ProgressPopup } from "./progress-popup";
import { QueryNames } from "../QuanLyPhieuTiepNhanGiaoXe-common";
import { CarStatus } from "./CarStatus";
import './view.scss'
import ConfirmInformation from "./ConfirmInformation";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("QuanLyPhieuTiepNhanGiaoXeDetail");
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="w-full flex items-center justify-between h-[55px] p-2">
      <div className={'flex items-center justify-center'}>
        <div className={'screen text-[#5F7D95] font-[400] text-[14px] hover:cursor-pointer'} onClick={handleGoBack}>
          {t("QuanLyPhieuTiepNhanGiaoXeManager")}
        </div>
        <Icon name={'chevronRight'} className={'mx-2'} />
        <div className={'screen screen-leaf text-[#0E223D] text-[14px] font-[600]'}>
          {t("QuanLyPhieuTiepNhanGiaoXeDetail")}
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
export const QuanLyPhieuTiepNhanGiaoXeDetailView = () => {
  const { t } = useI18n("QuanLyPhieuTiepNhanGiaoXe");
  const params = useParams();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const clearQueriesCache = () => {
    queryClient.removeQueries([QueryNames.DLR_CONTRACT_CANCEL])
  }


  const { data: searchParam, onSave: onSaveState } = useStateRestore<
    Partial<any>
  >("search-QuanLyPhieuTiepNhanGiaoXe", {});


  // const { data, isLoading, remove } = useQuery({
  //   queryKey: [QueryNames.DLR_CONTRACT_CANCEL, QueryNames.GET_DLR_CONTRACT_CANCEL, params, searchParam],
  //   queryFn: async () => {
  //     if (params.code) {
  // const response = await api.Sto_TranspReq_GetHQByTranspReqNo({
  //   FlagDataWH: searchParam?.FlagDataWH,
  //   TranspReqNo: params?.code

  // });
  // if (response.isSuccess) {
  //   return response.Data;
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

  //     else {
  //       return null;
  //     }

  //   }
  // });
  const handleReject = async () => {
    // const response = await api.Sto_TranspReq_RejectHQ(params.code!);
    // if (!response.isSuccess) {
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
    // } else {
    //   toast.success(t("RejectedSuccessfully"));
    //   clearQueriesCache()
    //   navigate(-1);
    // }
  };
  const handleRejectA1 = async () => {
    // const response = await api.CarDeliveryOrder_Approve2RejectHQ(params.code!);
    // if (!response.isSuccess) {
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
    // } else {
    //   toast.success(t("RejectedSuccessfully"));
    //   clearQueriesCache()
    //   navigate(-1);
    // }
  };
  const handleApprove = async () => {
    // const response = await api.Sto_TranspReq_ApproveHQ(params.code!);
    // if (!response.isSuccess) {
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
    // } else {
    //   toast.success(t("ApprovedSuccessfully"));
    //   clearQueriesCache()
    //   navigate(-1);
    // }
  };

  const gridRef = useRef(null);

  const handleDeleteMultiple = async (keys: string[]) => {
    await handleDeleteCar(keys)
  }

  const checkData = async () => {
    // const resp = await api.CarDeliveryOrder_GetHQByDeliveryOrderNo(params.code!);
    // if (resp.isSuccess) {
    //   if (!resp.Data) {
    //     navigate(-1)
    //   }
    // }
  }
  const queryClient = useQueryClient()

  const showDeleteAnimationControl = useVisibilityControl({ defaultVisible: false })
  const showProgressDoneControl = useVisibilityControl({ defaultVisible: false })

  const handleDeleteCar = async (keys: string[]) => {
    // showDeleteAnimationControl.open();
    // let isSuccess = true;
    // let errors = []
    // for (const key of keys) {
    //   const response = await api.Sto_TranspReq_DeleteDtlHQ(data?.Lst_Sto_TranspReqDtl?.[0]!, key);
    //   if (!response.isSuccess) {
    //     isSuccess = false;
    //     errors.push(response)
    //   }
    // }

    // if (isSuccess) {
    //   clearQueriesCache()
    //   showProgressDoneControl.open();
    // } else {
    //   showDeleteAnimationControl.close();
    //   showError({
    //     message: t(errors[0]._strErrCode),
    //     _strErrCode: errors[0]._strErrCode,
    //     _strTId: errors[0]._strTId,
    //     _strAppTId: errors[0]._strAppTId,
    //     _objTTime: errors[0]._objTTime,
    //     _strType: errors[0]._strType,
    //     _dicDebug: errors[0]._dicDebug,
    //     _dicExcs: errors[0]._dicExcs,
    //   });
    // }
  }
  const handleDeleteSingle = async (key: string) => {
    await handleDeleteCar([key])
  }
  const onCloseProgressDone = async () => {
    showProgressDoneControl.close()
    showDeleteAnimationControl.close()
    await checkData()
  }

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        {/* <Header rightButtons={rightButtons} /> */}
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        {/* <LoadPanel visible={isLoading || showDeleteAnimationControl.visible} showPane={true} showIndicator={true} /> */}
        {/* {!data && ( */}
        <>
          <ScrollView
            style={{
              height: "calc(100vh - 100px)"
            }}>
            <div className="title-header-view flex flex-col justify-center items-center py-3">
              <h3 className="!font-semibold">PHIẾU KIỂM TRA GIAO NHẬN XE</h3>
              <span>Số phiếu: This is SoPhieu</span>
            </div>
            <HeaderDetail
              loadAll={[]}
            // data={data.Lst_Sto_TranspReq[0]}
            />
            <div className={'separator'} />
            <CarStatus
              ref={gridRef}
            />
            <ConfirmInformation />

          </ScrollView>
        </>
        {/* )} */}
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
}

