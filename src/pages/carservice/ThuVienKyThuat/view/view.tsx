import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { HeaderFormView } from "./header-form-view";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { LoadPanel } from "devextreme-react";
import { match } from "ts-pattern";
import { toast } from "react-toastify";
import { useStateRestore, useVisibilityControl } from "@packages/hooks";
import { Icon } from "@packages/ui/icons";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { QueryNames } from "../ThuVienKyThuat-common";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("ThuVienKyThuatView");

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
          {t("ThuVienKyThuat")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t("ThuVienKyThuatView")}
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
export const ThuVienKyThuatViewPage = () => {
  const { t } = useI18n("ThuVienKyThuatView");
  const params = useParams();
  let flagDataWH = useLocation();
  const navigate = useNavigate();
  const gridRef = useRef<any>(null);
  let ref: any = useRef(null);
  const queryClient = useQueryClient();
  const showDeleteAnimationControl = useVisibilityControl({
    defaultVisible: false,
  });
  const showProgressDoneControl = useVisibilityControl({
    defaultVisible: false,
  });
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom);
  const clearQueriesCache = () => {
    queryClient.removeQueries([QueryNames.THUVIENKYTHUAT_ORDER]);
  };

  const { data: searchParam, onSave: onSaveState } = useStateRestore<
    Partial<Sto_CBReq_Search>
  >("search-ThuVienKyThuat", {});

  const { data, isLoading, remove } = useQuery({
    queryKey: [
      QueryNames.THUVIENKYTHUAT_ORDER,
      QueryNames.GET_THUVIENKYTHUAT,
      params,
      searchParam,
    ],
    queryFn: async () => {
      if (params.code) {
        const response = await api.Sto_CBReq_GetHQByCBReqNo({
          // FlagDataWH: searchParam?.FlagDataWH,
          FlagDataWH:
            flagDataWH.search.split("?")[1] === "false" ? false : true, // quyết định việc gọi api
          CBReqNo: params?.code,
        });
        if (response.isSuccess) {
          // gridRef?.current?.setData(response.Data?.Lst_Sto_CBReqDetail);
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

  const handleCancel = () => {
    navigate(-1);
  };

  const rightButtons = useMemo(() => {
    let buttons: BButtonProps[] = [];

    buttons.push({
      label: t("Close"),
      className: "mx-1 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleCancel,
    });
    return buttons;
  }, [data]);
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

        {/* // KHI NÀO CÓ API NHỚ BỎ COMMENT ĐOẠN CHECK NÀY  */}
        {/* {!!data && ( */}
        <>
          {/* <HeaderFormView data={data?.Lst_Sto_CBReq[0]} /> */}
          <HeaderFormView
            data={{
              MaKyThuat: "Test1",
              MaDaiLy: "Test1",
              Dealer: "Test1",
              BienSoXe: "Test1",
              Model: "Test1",
              DongCo: "Test1",
              HopSo: "Test1",
              DoiXe: "Test1",
              LoaiHinhSuaChuaPhanTu: "Test1",
              NoiDung: "Test1",
              YKienKhachHangPhanTu_TrieuChung: "Test1",
              NguyenNhan: "Test1",
              GiaiPhapKhacPhuc: "Test1",
              KiemTraLoaiTru: "Test1",
              Loai: "Test1",
              TrangThai: "Test1",
              NgayTao: "Test1",
              NguoiTao: "Test1",
            }}
          />
        </>
        {/* )} */}
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
