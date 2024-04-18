import { useI18n } from "@/i18n/useI18n";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useClientgateApi } from "@packages/api";
import { showErrorAtom } from "@packages/store";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataGrid, LoadPanel, ScrollView } from "devextreme-react";
import Form from "devextreme-react/form";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CarList } from "./car-list";
import { HeaderFormEdit } from "./header-form-edit";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Icon } from "@/packages/ui/gridview-one/icons";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("Mst_InventoryCusReturn_Create");
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
          {t("Mst_InventoryCusReturn")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t("Create")}
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
export const Mst_InventoryCusReturn_CreateNew = () => {
  const { t } = useI18n("Mst_InventoryCusReturn_Create");
  const navigate = useNavigate();
  const calculateRef = useRef<any>(null);
  const handleCancel = () => {
    navigate(-1);
  };
  const queryClient = useQueryClient();
  const checkboxDataRef = useRef<any>([]);

  const rightButtons: BButtonProps[] = [
    {
      validationGroup: "main",
      label: t("Save"),
      onClick: async (e: any) => {
        console.log(70, checkboxDataRef);
        // const validate = formRef.current?.instance.validate();
        // if (!validate?.isValid) {
        //   return;
        // }
        // const formData = formRef.current?.instance.option("formData");
        // const selectedCars = gridRef.current?.instance.getDataSource().items();
        // if (!selectedCars) {
        //   toast.error(t("SelectedCarsIsRequired"));
        // } else {
        //   const dataCreate = {
        //     CT_ContractOversea: {
        //       ContractNo: formData.ContractNo,
        //     },
        //     Lst_Ord_PILCTemp: selectedCars.map((items: any) => {
        //       return {
        //         RefNo: items.RefNo,
        //         LCTemp: items.LCTemp,
        //       };
        //     }),
        //   };
        //   const response = await api.CT_ContractOversea_Create(dataCreate);
        //   if (response.isSuccess) {
        //     toast.success(t("CreatedSuccessfully"));
        //     navigate(-1);
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
      className: "",
    },
    {
      validationGroup: "main",
      label: t("Save and Create"),
      onClick: async (e: any) => {
        console.log(70, checkboxDataRef);
        // const validate = formRef.current?.instance.validate();
        // if (!validate?.isValid) {
        //   return;
        // }
        // const formData = formRef.current?.instance.option("formData");
        // const selectedCars = gridRef.current?.instance.getDataSource().items();
        // if (!selectedCars) {
        //   toast.error(t("SelectedCarsIsRequired"));
        // } else {
        //   const dataCreate = {
        //     CT_ContractOversea: {
        //       ContractNo: formData.ContractNo,
        //     },
        //     Lst_Ord_PILCTemp: selectedCars.map((items: any) => {
        //       return {
        //         RefNo: items.RefNo,
        //         LCTemp: items.LCTemp,
        //       };
        //     }),
        //   };
        //   const response = await api.CT_ContractOversea_Create(dataCreate);
        //   if (response.isSuccess) {
        //     toast.success(t("CreatedSuccessfully"));
        //     navigate(-1);
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
      className: "",
    },
  ];
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);

  const gridRef = useRef<DataGrid>(null);
  const formRef = useRef<Form>(null);
  const windowSize = useWindowSize();
  const { data: newCode, isLoading: isGettingNewCode } = useQuery({
    queryKey: ["newCode_Dlr_Contract"],
    queryFn: async () => {
      // const response = await api.DlrContract_GetSeqForDlrContract();
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
      return [];
    },
  });
  const {
    data: ListMstBankGetActiveL2,
    isLoading: isGettingMstBankGetActiveL2,
  } = useQuery({
    queryKey: ["MstBankGetActiveL2_Dlr_Contract"],
    queryFn: async () => {
      // const response = await api.DlrContract_MstBankGetActiveL2();
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
      return [];
    },
  });
  const { data: ListGetTVBHActiveDL, isLoading: isGettingGetTVBHActiveDL } =
    useQuery({
      queryKey: ["GetTVBHActiveDL_Dlr_Contract"],
      queryFn: async () => {
        // const response = await api.DlrContract_GetTVBHActiveDL();
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
        return [];
      },
    });
  const {
    data: ListGetExistActiveSaleType,
    isLoading: isGettingGetExistActiveSaleType,
  } = useQuery({
    queryKey: ["GetExistActiveSaleType_Dlr_Contract"],
    queryFn: async () => {
      // const response = await api.DlrContract_GetExistActiveSaleType();
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
      return [];
    },
  });
  // useEffect(() => {
  //   // console.log(251, scrollRef.current.instance);
  //   scrollRef.current.scrollTo({ top: 0 });
  // }, []);
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <div className="pb-3">
          <HeaderFormEdit
            ref={formRef}
            code={newCode as any}
            listDealerType={[]}
            calculateRef={calculateRef}
            gridRef={gridRef}
          />
          <div className={"separator"} />
          <div className="mt-1">
            <CarList ref={gridRef} calculateRef={calculateRef} />
          </div>
        </div>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
