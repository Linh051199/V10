import { useI18n } from "@/i18n/useI18n";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { Icon } from "@/packages/ui/icons";
import { DataGrid, LoadPanel } from "devextreme-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderFormEdit } from "./form-edit";
import { CarList } from "./car-list";
import { useAtomValue, useSetAtom } from "jotai";
import { readOnlyAtom } from "./store";
import { showErrorAtom } from "@/packages/store";
import { useClientgateApi } from "@/packages/api";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { permissionAtom } from "@/packages/store/permission-store";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("QuanLyDeNghiCungCapGiaCreate");
  const navigate = useNavigate();
  const paramUrl = useParams();
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
          {t("QuanLyDeNghiCungCapGia")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t(`QuanLyDeNghiCungCapGiaCreate`)}
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

const QuanLyDeNghiCungCapGiaCreate = () => {
  const paramUrl = useParams();
  const { t } = useI18n("QuanLyDeNghiCungCapGia_Create");
  const setReadOnly = useSetAtom(readOnlyAtom);
  const api = useClientgateApi();
  const gridRef = useRef<DataGrid | any>(null);
  const formRef = useRef<any>(null);
  const showError = useSetAtom(showErrorAtom);
  const permissionStore = useAtomValue(permissionAtom);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CreateDTime: new Date(),
    SOType: null,
    MonthOrder: null,
    SPCode: null,
    DealerCode: permissionStore.sysUser?.DealerCode,
    DealerName: null,
    ContactName: null,
    CompanyName: null,
    PhoneNumber: null,
    FaxNumber: null,
    TaxCode: null,
    Address: null,
    Area: null,
    ExpectedMonth: null,
  });

  const handleSend = async () => {
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
      const dataList = gridRef.current.saveEditingData();
      if (dataList.length) {
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

        let check = Lst_DMS40_Ord_SalesOrderRootDetail.find((item: any) => {
          return (
            item.ColorCode === "" &&
            item.ModelCode === "" &&
            item.SpecCode === ""
          );
        });

        if (check) {
          toast.error(t("Please input full info required in grid"));
        } else {
          let response;
          if (paramUrl?.action === "create") {
            response = await api.HQ_DMS40_Ord_SalesOrderRoot_CreateDL(param);
          } else {
            response = await api.HQ_DMS40_Ord_SalesOrderRoot_UpdateDL(param);
          }

          if (response.isSuccess) {
            toast.success(t(`${paramUrl?.action ?? ""} Success`));
            navigate(-1);
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
        }
      } else {
        toast.error(t("Please input atleast one row in grid"));
      }
    }
  };
  const rightButtons: BButtonProps[] = [
    {
      label: t(`${"Save"}`),
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
      onClick: () => {
        navigate(-1);
      },
    },
  ];

  useEffect(() => {
    if (paramUrl?.action !== "create") {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  }, []);

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      if (paramUrl?.code) {
        const response = await api.DL_DMS40_Ord_SalesOrderRoot_GetDLBySORCode({
          SORCode: paramUrl?.code ?? "",
          FlagDataWH: true,
        }); 

        if (response.isSuccess) {
          console.log("formRef.current ", formRef.current);
          if (response.Data) {
            const Lst_DMS40_Ord_SalesOrderRoot =
              response.Data?.Lst_DMS40_Ord_SalesOrderRoot?.[0] ?? {};

            const Lst_DMS40_Ord_SalesOrderRoot_data = {
              ...Lst_DMS40_Ord_SalesOrderRoot,
              ExpectedMonth: Lst_DMS40_Ord_SalesOrderRoot.ExpectTime,
              MonthOrder: new Date(Lst_DMS40_Ord_SalesOrderRoot.MonthOrder),
              CreateDTime: new Date(Lst_DMS40_Ord_SalesOrderRoot.CreateDTime),
            };
            const Lst_DMS40_Ord_SalesOrderRootDetail =
              response.Data?.Lst_DMS40_Ord_SalesOrderRootDetail ?? [];

            const data = {
              Lst_DMS40_Ord_SalesOrderRoot_data,
              Lst_DMS40_Ord_SalesOrderRootDetail,
            };

            return data;
          }
          return response.Data;
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
          return [];
        }
      }
    },
    queryKey: [
      `${paramUrl?.code ?? "create"}`,
      "DL_DMS40_Ord_SalesOrderRoot_GetDLBySORCode",
    ],
  });

  const {
    data: dataDealer,
    isLoading: isLoadingDealer,
    refetch: refetchDealer,
  } = useQuery({
    queryFn: async () => {
      if (!paramUrl?.code) {
        // const response = await api.Mst_Dealer_GetByDealerCode(
        //   permissionStore.sysUser?.DealerCode ?? ""
        // );
        let response: any = {
          isSuccess: true,
        };

        if (response.isSuccess) {
          return response.Data;
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
          return [];
        }
      } else {
        return null;
      }
    },
    queryKey: ["Mst_Dealer_GetByDealerCode"],
  });

  useEffect(() => {
    refetchDealer();
  }, []);

  useEffect(() => {
    if (dataDealer && formRef.current) {
      formRef.current.instance.updateData("DealerName", dataDealer?.DealerName);
      formRef.current.instance.updateData(
        "ContactName",
        dataDealer?.ContactName
      );
      formRef.current.instance.updateData(
        "CompanyName",
        dataDealer?.CompanyName
      );
      formRef.current.instance.updateData("TaxCode", dataDealer?.TaxCode);
    }
  }, [dataDealer]);

  const handleAddNewCar = (gridRef: any) => {
    const { isValid } = formRef.current._instance.validate();
    // if (isValid) {
    //   if (paramUrl.action === "create") {
    //     setReadOnly(true);
    //   }
    //   gridRef?.current?.addData([
    //     {
    //       ModelCode: "",
    //       SpecCode: "",
    //       ColorCode: "",
    //       RequestedQuantity: "",
    //     },
    //   ]);
    // }
    gridRef?.current?.addData([
      {
        ModelCode: "",
        SpecCode: "",
        ColorCode: "",
        RequestedQuantity: "",
      },
    ]);
  };

  const onRowDeleteBtnClick = (e: any, gridRef: any) => {
    const gridData = gridRef.current.getData();
    const newList = gridData.filter(
      (i: any) => i._dxgridKey !== e.row.data._dxgridKey
    );
    gridRef.current.setData(newList);
    if (paramUrl.action === "create") {
      if (newList.length === 0) {
        setReadOnly(false);
      } else {
        setReadOnly(true);
      }
    }
  };

  const onUpdateDate = (e: any) => {
    const month = new Date(e).getMonth() + 1;

    gridRef.current
      .getDxInstance()
      .columnOption(
        "RequestedQuantity",
        "caption",
        `RequestedQuantity ${month}`
      );
  };

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <Header rightButtons={rightButtons} />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <LoadPanel
          visible={isLoading || isLoadingDealer}
          showPane={true}
          showIndicator={true}
        />
        {!isLoading && (
          <>
            <HeaderFormEdit
              dataForm={data?.Lst_DMS40_Ord_SalesOrderRoot_data ?? formData}
              ref={formRef}
              onUpdateDate={onUpdateDate}
            />
            <CarList
              ref={gridRef}
              onHandleAddNewCar={handleAddNewCar}
              onRowDeleteBtnClick={onRowDeleteBtnClick}
              dataList={data ? data?.Lst_DMS40_Ord_SalesOrderRootDetail : []}
            ></CarList>
          </>
        )}
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};

export default QuanLyDeNghiCungCapGiaCreate;
