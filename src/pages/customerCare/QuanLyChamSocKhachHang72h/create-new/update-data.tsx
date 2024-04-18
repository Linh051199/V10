import { useI18n } from "@/i18n/useI18n";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { Icon } from "@/packages/ui/icons";
import { LoadPanel } from "devextreme-react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderFormEdit } from "./form-edit";
import { CarList } from "./car-list";
import { useSetAtom } from "jotai";
import { readOnlyAtom } from "./store";
import { showErrorAtom } from "@/packages/store";
import { useClientgateApi } from "@/packages/api";
import { toast } from "react-toastify";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("DMS40_Ord_SalesOrderRoot_Update");
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
          {t("DMS40_Ord_SalesOrderRoot")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t("DMS40_Ord_SalesOrderRoot_Update")}
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

const UpdateDMS40_Ord_SalesOrderRoot = () => {
  const { t } = useI18n("DMS40_Ord_SalesOrderRoot_Update");
  const setReadOnly = useSetAtom(readOnlyAtom);
  const api = useClientgateApi();
  const gridRef = useRef(null);
  const formRef = useRef<any>(null);
  const showError = useSetAtom(showErrorAtom);
  const handleSend = () => {
    const { isValid } = formRef?.current.instance.validate();
    if (isValid) {
      const formData = formRef?.current?._instance.option("formData");

      const DMS40_Ord_SalesOrderRoot = {
        SORCode: formData.SORCode,
        SOType: formData.SOType,
        DealerCode: formData.DealerCode,
        SPCode: formData.SPCode,
        MonthOrder: formData.MonthOrder,
      };
      gridRef.current.saveEditingData().then(async (dataList: any) => {
        const Lst_DMS40_Ord_SalesOrderRootDetail = dataList.map((item: any) => {
          return {
            SpecCode: item.SpecCode,
            ModelCode: item.ModelCode,
            ColorCode: item.ColorCode,
            QuotaCode: item.QuotaCode ?? "",
            UnitPriceInit: item.UnitPriceInit,
            RequestedQuantity: item.RequestedQuantity,
            QtyMonthCalculationN1: 0,
            Remark: item.Remark ?? "",
          };
        });

        const param = {
          DMS40_Ord_SalesOrderRoot,
          Lst_DMS40_Ord_SalesOrderRootDetail,
        };

        const response = await api.HQ_DMS40_Ord_SalesOrderRoot_UpdateDL(param);
        if (response.isSuccess) {
          toast.success(t("Update Success"));
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
      });
    }
  };
  const rightButtons: BButtonProps[] = [
    {
      label: t("Send"),
      className: "p-0 select-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: handleSend,
    },
    {
      label: t("Cancel"),
      className: "p-0 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      //onClick: ,
    },
  ];

  const handleAddNewCar = (gridRef: any) => {
    const { isValid } = formRef.current._instance.validate();
    if (isValid) {
      const dataForm = formRef.current.instance.option("formData");
      const getMonthOfForm = dataForm.MonthOrder.getMonth() + 1;
      setReadOnly(true);
      gridRef?.current?.addData([
        {
          ModelCode: "",
          SpecCode: "",
          ColorCode: "",
          RequestedQuantity: getMonthOfForm,
        },
      ]);
    }
  };

  const onRowDeleteBtnClick = (e: any, gridRef: any) => {
    const gridData = gridRef.current.getData();
    const newList = gridData.filter(
      (i: any) => i._dxgridKey !== e.row.data._dxgridKey
    );
    gridRef.current.setData(newList);
    if (newList.length === 0) {
      setReadOnly(false);
    } else {
      setReadOnly(true);
    }
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <LoadPanel visible={false} showPane={true} showIndicator={true} />

        <HeaderFormEdit ref={formRef} />
        <CarList
          ref={gridRef}
          onHandleAddNewCar={handleAddNewCar}
          onRowDeleteBtnClick={onRowDeleteBtnClick}
        ></CarList>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default UpdateDMS40_Ord_SalesOrderRoot;
