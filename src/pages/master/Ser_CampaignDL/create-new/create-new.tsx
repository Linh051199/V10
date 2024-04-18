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
import { CarList } from "./car-list";
import Form from "devextreme-react/form";
import { DataGrid, LoadPanel } from "devextreme-react";
import { toast } from "react-toastify";
import { Icon } from "@packages/ui/icons";
import { QueryNames } from "../Ser_CampaignDL-common";

interface HeaderProps {
  rightButtons: BButtonProps[]
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("Ser_CampaignDLNew");
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <div className="w-full flex items-center justify-between h-[55px] p-2 ml-[16px] page-header">
      <div className={'flex items-center justify-center'}>
        <div className={'screen text-[#5F7D95] font-[400] text-[14px] hover:cursor-pointer'} onClick={handleGoBack}>
          {t("Ser_CampaignDLManagement")}
        </div>
        <Icon name={'chevronRight'} className={'mx-2'} />
        <div className={'screen screen-leaf text-[#0E223D] text-[14px] font-[600]'}>
          {t("Ser_CampaignDLNew")}
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
export const Ser_CampaignDLNew = () => {
  const { t } = useI18n("Ser_CampaignDLNew");
  const navigate = useNavigate()
  const handleCancel = () => {
    navigate(-1)
  }
  const queryClient = useQueryClient()
  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      label: t("Save"),
      onClick: async (e: any) => {
        const { isValid } = formRef.current.instance.validate();
        // const validate = formRef.current?.instance.validate();
        // if (!validate?.isValid) {
        //   return;
        // }
        if (isValid) {
          const formData = formRef.current?.instance.option("formData");
          // const selectedCars = gridRef.current?.saveEditingData();

          const dataSave = {
            CT_PackingList: {
              PackingListNo: formData.PackingListNo,
              LCNo: formData.LCNo,
              PortCode: formData.PortCode,
              ShippingDateStart: formData.ShippingDateStart,
              ShippingDateEndExpected: formData.ShippingDateEndExpected,
              PLType: formData.PLType,
            },
            // Lst_Car_VINForPL: selectedCars?.map((item: any) => {
            //   return {
            //     VIN: item.Vin,
            //     WorkOrderNo: item.WorkOrderNo,
            //     SpecCode: item.SpecCode,
            //     ColorCode: item.ColorCode,
            //     HMCOrderNo: item.HMCOrderNo,
            //     HMCUnitOrderNo: item.HMCUnitOrderNo,
            //     EngineNo: item.EngineNo,
            //     KeyNo: item.KeyNo,
            //     StorageCodeInit: item.StorageCodeInit,
            //     StoreDate: item.StoreDate,
            //     CQStartDate: item.CQStartDate,
            //     VINYear: item.VINYear,
            //     TypeCB: item.TypeCB,
            //     LoaiThung: item.LoaiThung,
            //     ProductionMonth: item.ProductionMonth,
            //     ModelCode: item.ModelCode,
            //     FinishDTime: item.FinishDTime,
            //   };
            // }),
          };

          // if (!selectedCars) {
          //   toast.error(t("SelectedCarsIsRequired"));
          // } else {
          // const response = await api.CT_ContractOversea_Create(dataSave);
          // if (response.isSuccess) {
          //   toast.success(t("CreatedSuccessfully"));
          //   navigate(-1);
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
          // }
        }
      },
      className: "save-button",
    },
    {
      label: t("Cancel"),
      className: "p-0 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel
    }
  ]
  const api = useClientgateApi()
  const showError = useSetAtom(showErrorAtom)

  // const { data: newCode, isLoading: isGettingNewCode } = useQuery(
  //   {
  //     queryKey: [QueryNames.DLR_CONTRACT_CANCEL, QueryNames.GET_DLR_CONTRACT_CANCEL, 'new'],
  //     queryFn: async () => {
  //       const response = await api.Sto_TranspReq_GetSeqForStoTranspReq()
  //       if (response.isSuccess) {
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

  // const { data: realTime, isLoading: isGettingRealTime } = useQuery(
  //   {
  //     queryKey: [QueryNames.DLR_CONTRACT_CANCEL, QueryNames.GET_DLR_CONTRACT_CANCEL, 'getTime'],
  //     queryFn: async () => {
  //       const response = await api.GetTime()
  //       if (response.isSuccess) {
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

  // const { data: getDlrPDIReqNo, isLoading: isgetDlrPDIReqNo } = useQuery(
  //   {
  //     queryKey: [QueryNames.DLR_CONTRACT_CANCEL, QueryNames.GET_DLR_CONTRACT_CANCEL, 'getDlrPDIReqNo'],
  //     queryFn: async () => {
  //       const response = await api.QuanLyKyKhaoSat_GetDlrPDIReqNo()
  //       if (response.isSuccess) {
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

  const gridRef = useRef<DataGrid>(null)
  const formRef = useRef<any>(null)
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        {/* <LoadPanel visible={isGettingNewCode || isGettingRealTime || isgetDlrPDIReqNo} showPane={true} showIndicator={true} /> */}
        {/* {!!realTime && !!getDlrPDIReqNo && ( */}
        <>
          <HeaderFormEdit
            ref={formRef}
          />
          <div className={'separator'} />
          <CarList
            ref={gridRef}
          />
        </>
        {/* )} */}
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
