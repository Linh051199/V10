import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { useMemo, useRef, useState } from "react";
import { HeaderFormView } from "./header-form-view";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { LoadPanel, ScrollView } from "devextreme-react";
import { ViewList } from "./view-list";
import { match } from "ts-pattern";
import { toast } from "react-toastify";

import { Icon } from "@packages/ui/icons";

import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useVisibilityControl } from "@/packages/hooks";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("Dlr_ContractHQView");

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex items-center justify-between h-[55px] p-2">
      <div className={"flex items-center justify-center"}>
        <div
          className={
            "screen text-[#5F7D95] font-[400] text-[14px] hover:cursor-pointer"
          }
          onClick={handleGoBack}
        >
          {t("Dlr_ContractHQ")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t("View")}
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
export const Dlr_ContractHQDetailView = () => {
  const { t } = useI18n("Dlr_ContractHQView");
  const params = useParams();
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const [isProcess, setProcess] = useState(false);

  // console.log(params);
  const gridRef = useRef<any>(null);
  const formRef = useRef<any>(null);
  const { data, isLoading, remove } = useQuery({
    queryKey: [params.status, params.code],
    queryFn: async () => {
      // const getDataCode = {
      //   DlrContractNo: params.code,
      //   FlagDataWH: params.status === "GetWHH" ? true : false,
      // };
      // const response = await api.DlrContract_GetHQByDlrContractNo(getDataCode);
      // if (response.isSuccess) {
      //   console.log(88, response);
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
  const handleSave = async () => {
    // setProcess(true);
    // const formData = formRef.current?.instance.option("formData");
    // const dataGrid = gridRef?.current?.props.dataSource;
    // const dataSave = {
    //   Dlr_Contract: {
    //     DlrContractNo: formData.DlrContractNo ?? "",
    //     DealerCode: formData.DealerCode ?? "",
    //     DealerCodeBuyer: formData.DealerCodeBuyer ?? "",
    //     CustomerCode: formData.CustomerCode ?? "",
    //     TransactorCode: formData.TransactorCode ?? "",
    //     DlrContractNoUser: formData.DlrContractNoUser ?? "",
    //     SalesType: formData.SalesType ?? "",
    //     SMCode: formData.SMCode ?? "",
    //     ContractDate: formData.ContractDate ?? "",
    //     BankCode: formData.BankCode ?? null,
    //   },
    //   Lst_Dlr_ContractDtl: dataGrid?.map((item: any) => {
    //     return {
    //       ModelCode: item.ModelCode ?? "",
    //       SpecCode: item.SpecCode ?? "",
    //       ColorCode: item.ColorCode ?? "",
    //       Qty: item.Qty ?? "",
    //       DlvExpectedDate: item.DlvExpectedDate ?? "",
    //     };
    //   }),
    // };
    // const response = await api.DlrContract_UpdateDL(dataSave);
    // if (response.isSuccess) {
    //   toast.success(t("Save successfully"));
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
    // setProcess(false);
  };

  const rightButtons = useMemo(() => {
    let buttons: BButtonProps[] = [
      // {
      //   className: "save-btn",
      //   label: t("Tạo giao dịch"),
      //   onClick: () => {},
      // },
      // {
      //   className: "",
      //   label: t("Lưu sửa"),
      //   onClick: handleSave,
      // },
    ];
    buttons.push({
      label: t("Close"),
      className: "mx-1 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel,
    });
    return buttons;
  }, [data]);

  const queryClient = useQueryClient();

  const showDeleteAnimationControl = useVisibilityControl({
    defaultVisible: false,
  });

  const windowSize = useWindowSize();

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <ScrollView height={windowSize.height - 130}>
          <LoadPanel
            visible={
              isProcess || isLoading || showDeleteAnimationControl.visible
            }
            showPane={true}
            showIndicator={true}
          />

          <>
            <HeaderFormView data={[]} formRef={formRef} />
            <div className={"separator"} />
            <ViewList
              ref={gridRef}
              cars={[]}
              queryKey={["StoTranspReqDetail", params.code!]}
            />
          </>
        </ScrollView>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
