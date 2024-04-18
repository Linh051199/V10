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
import { ObjectList } from "./object-list";
import { match } from "ts-pattern";
import { toast } from "react-toastify";
import { useStateRestore, useVisibilityControl } from "@packages/hooks";
import { Icon } from "@packages/ui/icons";
import { QueryNames } from "../QuanLyDonDatHangNCC-common";
import { QuanLyBanTinKyThuat_Search } from "@/packages/types/carservice/QuanLyBanTinKyThuat";
import { ProgressPopup } from "./progress-popup";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const FAKE_DATA_HEADER = {
  SoBanTin: "TEST1",
  SoBanTinHMC: "TEST1",
  NgayTao: "TEST1",
  FileDinhKem: "TEST1",
  MoTa: "TEST1",
  NgayHetHanBanTin: "TEST1",
  VIN: "TEST1",
  MaCongViec: "TEST1",
  TenCongViec: "TEST1",
  MaPhuTung: "TEST1",
  TenPhuTung: "TEST1",
};

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("QuanLyBanTinKyThuat");

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
          {t("QuanLyDonDatHangNCCManage")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t("ViewQuanLyDonDatHangNCC")}
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
export const QuanLyDonDatHangNCCDetailView = () => {
  const { t } = useI18n("QuanLyDonDatHangNCC");
  const params = useParams();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const handleCancel = () => {
    navigate(-1);
  };
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const clearQueriesCache = () => {
    queryClient.removeQueries([QueryNames.STO_TRANSP_REQ_ORDER]);
  };

  const { data: searchParam, onSave: onSaveState } = useStateRestore<
    Partial<QuanLyBanTinKyThuat_Search>
  >("search-QuanLyDonDatHangNCC", {});

  const { data, isLoading, remove } = useQuery({
    queryKey: [
      // QueryNames.STO_TRANSP_REQ_ORDER,
      // QueryNames.GET_STO_TRANSP_REQ,
      params,
      searchParam,
    ],
    queryFn: async () => {
      if (params.code) {
        return FAKE_DATA_HEADER;
        const response = await api.Mst_Dealer_GetAllActive();
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
      } else {
        return null;
      }
    },
  });

  const rightButtons = useMemo(() => {
    let buttons: BButtonProps[] = [];
    if (!!data) {
      const extendButtons: BButtonProps[] = [
        {
          label: t("Tạo phiếu nhập kho"),
          className: "mx-[4px]",
          onClick: () => {},
        },
      ];
      // .with("A1", () => ([
      //   {
      //     label: t("ApproveA1"),
      //     className: "mx-[4px]",
      //     onClick: handleApproveA1
      //   },
      //   {
      //     label: t("RejectA1"),
      //     className: "mx-[4px]",
      //     onClick: handleRejectA1
      //   }
      // ]))

      buttons = [...buttons, ...extendButtons];
    }

    buttons.push({
      label: t("Close"),
      className: "mx-1 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel,
    });
    return buttons;
  }, [data]);
  const gridRef = useRef(null);

  const handleDeleteMultiple = async (keys: string[]) => {
    console.log("check", keys);
    await handleDeleteCar(keys);
  };

  // const checkData = async () => {
  //   const resp = await api.CarDeliveryOrder_GetHQByDeliveryOrderNo(
  //     params.code!
  //   );
  //   if (resp.isSuccess) {
  //     if (!resp.Data) {
  //       navigate(-1);
  //     }
  //   }
  // };
  const queryClient = useQueryClient();

  const showDeleteAnimationControl = useVisibilityControl({
    defaultVisible: false,
  });
  const showProgressDoneControl = useVisibilityControl({
    defaultVisible: false,
  });

  const handleDeleteCar = async (keys: string[]) => {
    // showDeleteAnimationControl.open();
    // let isSuccess = true;
    // let errors = [];
    // for (const key of keys) {
    //   const response = await api.Sto_TranspReq_DeleteDtlHQ(
    //     data?.Lst_Sto_TranspReqDtl?.[0]!,
    //     key
    //   );
    //   if (!response.isSuccess) {
    //     isSuccess = false;
    //     errors.push(response);
    //   }
    // }
    // if (isSuccess) {
    //   clearQueriesCache();
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
  };
  const handleDeleteSingle = async (key: string) => {
    await handleDeleteCar([key]);
  };
  const onCloseProgressDone = async () => {
    showProgressDoneControl.close();
    showDeleteAnimationControl.close();
    // await checkData();
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <LoadPanel
          visible={isLoading || showDeleteAnimationControl.visible}
          showPane={true}
          showIndicator={true}
        />

        <ScrollView height={windowSize.height - 120}>
          <HeaderFormView data={data} />
          <div className={"separator"} />
          <ObjectList
            ref={gridRef}
            order={""}
            cars={[]}
            onDeleteMultiple={handleDeleteMultiple}
            onDeleteSingle={handleDeleteSingle}
            queryKey={["QuanLyBanTinKyThuatDetail", params.code!]}
          />

          <ProgressPopup
            visible={showDeleteAnimationControl.visible}
            text={t("InProgress")}
            isDone={showProgressDoneControl.visible}
            doneText={t("Done")}
            onHidding={onCloseProgressDone}
          />
        </ScrollView>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
