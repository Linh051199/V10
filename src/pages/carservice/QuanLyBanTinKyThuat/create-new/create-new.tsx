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
import { VINList } from "./vin-list";
import Form from "devextreme-react/form";
import { DataGrid, LoadPanel, ScrollView } from "devextreme-react";
import { toast } from "react-toastify";
import { Icon } from "@packages/ui/icons";
import { QueryNames } from "../QuanLyBanTinKyThuat-common";
import { JobList } from "./job-list";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("QuanLyBanTinKyThuat");
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
          {t("QuanLyBanTinKyThuatManagement")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t("CreateNewQuanLyBanTinKyThuat")}
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
export const QuanLyBanTinKyThuatCreateNew = () => {
  const { t } = useI18n("QuanLyBanTinKyThuat");
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const handleCancel = () => {
    navigate(-1);
  };
  const queryClient = useQueryClient();
  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      label: t("Save"),
      onClick: async (e: any) => {
        // const validate = formRef.current?.instance.validate()
        // if (!validate?.isValid) {
        //   return
        // }
        // const formData = formRef.current?.instance.option("formData")
        // const selectedCars = gridRef.current?.instance.getDataSource().items()
        // if (!selectedCars) {
        //   toast.error(t("SelectedCarsIsRequired"))
        // } else {
        //   const response = await api.Sto_TranspReq_CreateHQ(formData, selectedCars ?? [])
        //   if (response.isSuccess) {
        //     toast.success(t("CreatedSuccessfully"))
        //     queryClient.removeQueries([QueryNames.DELIVERY_ORDER])
        //     navigate(-1)
        //   } else {
        //     showError({
        //       message: t(response._strErrCode),
        //       _strErrCode: response._strErrCode,
        //       _strTId: response._strTId,
        //       _strAppTId: response._strAppTId,
        //       _objTTime: response._objTTime,
        //       _strType: response._strType,
        //       _dicDebug: response._dicDebug,
        //       _dicExcs: response._dicExcs,
        //     });
        //   }
        // }
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
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  // const { data: newCode, isLoading: isGettingNewCode } = useQuery(
  //   {
  //     queryKey: [QueryNames.DELIVERY_ORDER, QueryNames.GET_DELIVERY_ORDER, 'new'],
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

  const { data: realTime, isLoading: isGettingRealTime } = useQuery({
    queryKey: ["getTime"],
    queryFn: async () => {
      const response = await api.GetTime();
      if (response.isSuccess) {
        return response.Data;
      }
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
      return null;
    },
  });

  const { data: dealerList, isLoading: isGettingDealerList } = useQuery({
    queryKey: ["dealer-list"],
    queryFn: async () => {
      const response = await api.Mst_Dealer_GetAllActive();
      if (response.isSuccess) {
        return response.DataList;
      }
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
      return null;
    },
  });

  // const { data: transporterList, isLoading: isGettingTransporterList } = useQuery({
  //   queryKey: [QueryNames.DELIVERY_ORDER, QueryNames.GET_DELIVERY_ORDER, 'transporter-list'],
  //   queryFn: async () => {
  //     const response = await api.Mst_Transporter_GetAllActive()
  //     if (response.isSuccess) {
  //       return response.DataList
  //     }
  //     showError({
  //       message: t(response._strErrCode),
  //       _strErrCode: response._strErrCode,
  //       _strTId: response._strTId,
  //       _strAppTId: response._strAppTId,
  //       _objTTime: response._objTTime,
  //       _strType: response._strType,
  //       _dicDebug: response._dicDebug,
  //       _dicExcs: response._dicExcs,
  //     });
  //     return null
  //   }
  // })

  const gridRef = useRef<DataGrid>(null);
  const formRef = useRef<Form>(null);
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        {/* <LoadPanel
          visible={isGettingRealTime}
          showPane={true}
          showIndicator={true}
        /> */}

        <ScrollView height={windowSize.height - 120}>
          <HeaderFormEdit
            // code={newCode}
            ref={formRef}
            // transporterList={transporterList}
            time={realTime}
          />
          <div className={"separator"} />
          <VINList ref={gridRef} />
          <JobList ref={gridRef} />
        </ScrollView>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
