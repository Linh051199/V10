import { useI18n } from "@/i18n/useI18n";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { Icon } from "@/packages/ui/icons";
import { DataGrid, LoadPanel } from "devextreme-react";
import React, { useEffect, useReducer, useRef, useState } from "react";
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
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { Ser_Inv_StockInMst } from "@/packages/types/carservice/Ser_Inv_StockIn";
import { format } from "date-fns";
import { RejectPopup } from "../reject-popup/reject-popup";
import { OwePopup } from "../owe-popup/owe-popup";
import usePrint from "@/components/print/usePrint";
import { useAuth } from "@/packages/contexts/auth";

interface HeaderProps {
  rightButtons: any[];
  // rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("SerInvStockInCreate");
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
          {t("SerInvStockIn")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {paramUrl.idUpdate
            ? t(`SerInvStockInUpdate`)
            : t(`SerInvStockInCreate`)}
        </div>
      </div>
      <div>
        {/* {rightButtons.map((button, idx) => {
          return <BButton key={idx} {...button} />;
        })} */}
        {
          // debugger;
          paramUrl.idUpdate
            ? rightButtons[1].props.map((button: any, idx: number) => {
                return <BButton key={idx} {...button} />;
              })
            : rightButtons[0].props.map((button: any, idx: number) => {
                return <BButton key={idx} {...button} />;
              })
        }
      </div>
    </div>
  );
};
const reducer = (state: any, action: any) => {
  return action;
};
const SerInvStockInCreate = () => {
  const paramUrl = useParams();
  const { t } = useI18n("SerInvStockInCreate");
  const api = useClientgateApi();
  const [loadingKey, setDispatch] = useReducer(reducer, "0");
  const gridRef = useRef<DataGrid | any>(null);
  const formRejectRef = useRef<any>(null);
  const formOweRef = useRef<any>(null);
  const formRef = useRef<any>(null);
  const showError = useSetAtom(showErrorAtom);
  const permissionStore = useAtomValue(permissionAtom);
  const navigate = useNavigate();
  const gridViewOneRef = useRef<any>();
  const { quickPrint, previewPrint } = usePrint();

  //
  // useEffect(() => {
  //   refetchSerCusDebitGetDL();
  // }, [loadingKey]);
  // Gen StockInNo
  const { data: StockInNoCode, refetch: refetchStockInNoCode } = useQuery({
    queryKey: ["StockInNoCode", "Ser_Inv_StockIn"],
    queryFn: async () => {
      const resp = await api.Ser_Inv_StockIn_GetMaxStockInNo();
      if (resp.isSuccess) {
        return resp.Data?.StockInNo;
      }
    },
    enabled: true,
  });

  // =========
  const { data: dynamicData }: any = useQuery(
    ["dynamic data", paramUrl.code],
    async () => {
      const promise = new Promise((resolve, reject) => {
        resolve([
          [
            {
              MaHang: Math.random(),
              TenHang: `Name_${Math.random()}`,
              DonVi: "Cai",
              Gia: Math.random(),
              Thue: Math.random(),
              SoLuong: Math.random(),
              GiaTruocThue: Math.random(),
              GiaSauVAT: Math.random(),
              ViTriDuKien: `${Math.random()}_Test1`,
              MoTa: `${Math.random()}_Test1`,
            },
          ],
        ]);
      });
      return await promise;
    }
  );
  // useEffect(() => {
  //   // refetchDataDetail();
  //   refetchSerCusDebitGetDL();
  // }, [paramUrl.idUpdate]);
  // gen data to update
  const {
    data: modifyData,
    isLoading: isLoadingDataDetail,
    refetch: refetchDataDetail,
  }: any = useQuery(
    ["modifyData data", paramUrl.idUpdate ? paramUrl.idUpdate : "create"],
    async () => {
      if (paramUrl.idUpdate) {
        const response = await api.Ser_Inv_StockIn_GetByStockInIDDL({
          DealerCode: permissionStore?.sysUser?.DealerCode,
          FlagDataWH: false,
          StockInID: paramUrl.idUpdate,
        });
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
        }
      }
    }
  );
  //
  const handleSave = async () => {
    const validate = formRef.current?.instance.validate();
    if (!validate?.isValid) {
      return;
    } else {
      ConfirmComponent({
        asyncFunction: async () => {
          const gridRef = gridViewOneRef.current.getGridRef();
          const formData = formRef?.current?._instance.option("formData");
          const dataList = gridRef?.current
            ?.getDxInstance()
            .option("dataSource");
          const objSer_Inv_StockInMst: any = {
            SupplierID: formData.SupplierID ?? "",
            DealerCode: formData.DealerCode ?? "",
            StockInNo: formData.StockInNo ?? "",
            StockInID: paramUrl.idUpdate ?? "", // truyền rỗng cũng được
            StockInType: formData.StockInType ?? "",
            StockInDate: formData.StockInDate ?? "",
            Description: formData.Description ?? "",
            BillNo: formData.BillNo ?? "",
            AdjustmentBy: "", // truyền rỗng cũng được
            AdjustmentDate: "", // truyền rỗng cũng được
            AdjustmentNote: "", // truyền rỗng cũng được
            OldStockInID: "", // truyền rỗng cũng được
            OrderPartId: formData.OrderPartId ?? "",
            OrderPartNo: formData.OrderPartNo ?? "",
          };
          const objSer_Inv_StockInDtl = dataList.map((item: any) => {
            return {
              PartID: item.PartID,
              Quantity: item.Quantity,
              Description: item.Description,
              PlanLocationID: item.PlanLocationID,
              Price: item.Price,
              VAT: item.VAT,
            };
          });
          const response = await api.Ser_Inv_StockIn_Create(
            objSer_Inv_StockInMst,
            objSer_Inv_StockInDtl
          );
          if (response.isSuccess) {
            toast.success(`${"CreateSuccessfully"}`);
            refetchStockInNoCode();
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
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    }
  };

  const handleUpdate = async () => {
    const validate = formRef.current?.instance.validate();
    if (!validate?.isValid) {
      return;
    } else {
      ConfirmComponent({
        asyncFunction: async () => {
          const gridRef = gridViewOneRef.current.getGridRef();
          const formData = formRef?.current?._instance.option("formData");
          const dataList = gridRef?.current
            ?.getDxInstance()
            .option("dataSource");
          const objSer_Inv_StockInMst: any = {
            SupplierID: formData.SupplierID ?? "",
            DealerCode: formData.DealerCode ?? "",
            StockInNo: formData.StockInNo ?? "",
            StockInID: paramUrl.idUpdate ?? "", // truyền rỗng cũng được
            StockInType: formData.StockInType ?? "",
            StockInDate: formData.StockInDate ?? "",
            Description: formData.Description ?? "",
            BillNo: formData.BillNo ?? "",
            AdjustmentBy: "", // truyền rỗng cũng được
            AdjustmentDate: "", // truyền rỗng cũng được
            AdjustmentNote: "", // truyền rỗng cũng được
            OldStockInID: "", // truyền rỗng cũng được
            OrderPartId: formData.OrderPartId ?? "",
            OrderPartNo: formData.OrderPartNo ?? "",
          };
          const objSer_Inv_StockInDtl = dataList.map((item: any) => {
            return {
              PartID: item.PartID,
              Quantity: item.Quantity,
              Description: item.Description,
              PlanLocationID: item.PlanLocationID,
              Price: item.Price,
              VAT: item.VAT,
            };
          });
          const response = await api.Ser_Inv_StockIn_Update(
            objSer_Inv_StockInMst,
            objSer_Inv_StockInDtl
          );
          if (response.isSuccess) {
            toast.success(`${"UpdateSuccessfully"}`);
            refetchDataDetail();
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
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    }
  };

  const handleStatusUpdateToExecuting = async () => {
    const validate = formRef.current?.instance.validate();
    if (!validate?.isValid) {
      return;
    } else {
      ConfirmComponent({
        asyncFunction: async () => {
          const gridRef = gridViewOneRef.current.getGridRef();
          const formData = formRef?.current?._instance.option("formData");
          const dataList = gridRef?.current
            ?.getDxInstance()
            .option("dataSource");
          const objSer_Inv_StockInMst: any = {
            SupplierID: formData.SupplierID ?? "",
            DealerCode: formData.DealerCode ?? "",
            StockInNo: formData.StockInNo ?? "",
            StockInID: paramUrl.idUpdate ?? "", // truyền rỗng cũng được
            StockInType: formData.StockInType ?? "",
            StockInDate: formData.StockInDate ?? "",
            Description: formData.Description ?? "",
            BillNo: formData.BillNo ?? "",
            AdjustmentBy: "", // truyền rỗng cũng được
            AdjustmentDate: "", // truyền rỗng cũng được
            AdjustmentNote: "", // truyền rỗng cũng được
            OldStockInID: "", // truyền rỗng cũng được
            OrderPartId: formData.OrderPartId ?? "",
            OrderPartNo: formData.OrderPartNo ?? "",
          };
          const objSer_Inv_StockInDtl = dataList.map((item: any) => {
            return {
              PartID: item.PartID,
              Quantity: item.Quantity,
              Description: item.Description,
              PlanLocationID: item.PlanLocationID,
              Price: item.Price,
              VAT: item.VAT,
            };
          });
          const response = await api.Ser_Inv_StockIn_StatusUpdateToExecuting(
            objSer_Inv_StockInMst,
            objSer_Inv_StockInDtl
          );
          if (response.isSuccess) {
            toast.success(`${"StatusUpdateToExecutingSuccessfully"}`);
            refetchDataDetail();
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
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    }
  };

  const handleStatusUpdateToPending = async () => {
    const validate = formRef.current?.instance.validate();
    if (!validate?.isValid) {
      return;
    } else {
      ConfirmComponent({
        asyncFunction: async () => {
          const gridRef = gridViewOneRef.current.getGridRef();
          const formData = formRef?.current?._instance.option("formData");
          const dataList = gridRef?.current
            ?.getDxInstance()
            .option("dataSource");
          const objSer_Inv_StockInMst: any = {
            SupplierID: formData.SupplierID ?? "",
            DealerCode: formData.DealerCode ?? "",
            StockInNo: formData.StockInNo ?? "",
            StockInID: paramUrl.idUpdate ?? "", // truyền rỗng cũng được
            StockInType: formData.StockInType ?? "",
            StockInDate: formData.StockInDate ?? "",
            Description: formData.Description ?? "",
            BillNo: formData.BillNo ?? "",
            AdjustmentBy: "", // truyền rỗng cũng được
            AdjustmentDate: "", // truyền rỗng cũng được
            AdjustmentNote: "", // truyền rỗng cũng được
            OldStockInID: "", // truyền rỗng cũng được
            OrderPartId: formData.OrderPartId ?? "",
            OrderPartNo: formData.OrderPartNo ?? "",
          };
          const objSer_Inv_StockInDtl = dataList.map((item: any) => {
            return {
              PartID: item.PartID,
              Quantity: item.Quantity,
              Description: item.Description,
              PlanLocationID: item.PlanLocationID,
              Price: item.Price,
              VAT: item.VAT,
            };
          });
          const response = await api.Ser_Inv_StockIn_StatusUpdateToPending(
            objSer_Inv_StockInMst,
            objSer_Inv_StockInDtl
          );
          if (response.isSuccess) {
            toast.success(`${"StatusUpdateToPendingSuccessfully"}`);
            refetchDataDetail();
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
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    }
  };

  const handleStatusUpdateToFinished = async () => {
    const validate = formRef.current?.instance.validate();
    if (!validate?.isValid) {
      return;
    } else {
      ConfirmComponent({
        asyncFunction: async () => {
          const gridRef = gridViewOneRef.current.getGridRef();
          const formData = formRef?.current?._instance.option("formData");
          const dataList = gridRef?.current
            ?.getDxInstance()
            .option("dataSource");
          const objSer_Inv_StockInMst: any = {
            SupplierID: formData.SupplierID ?? "",
            DealerCode: formData.DealerCode ?? "",
            StockInNo: formData.StockInNo ?? "",
            StockInID: paramUrl.idUpdate ?? "", // truyền rỗng cũng được
            StockInType: formData.StockInType ?? "",
            StockInDate: formData.StockInDate ?? "",
            Description: formData.Description ?? "",
            BillNo: formData.BillNo ?? "",
            AdjustmentBy: "", // truyền rỗng cũng được
            AdjustmentDate: "", // truyền rỗng cũng được
            AdjustmentNote: "", // truyền rỗng cũng được
            OldStockInID: "", // truyền rỗng cũng được
            OrderPartId: formData.OrderPartId ?? "",
            OrderPartNo: formData.OrderPartNo ?? "",
          };
          const objSer_Inv_StockInDtl = dataList.map((item: any) => {
            return {
              PartID: item.PartID,
              Quantity: item.Quantity,
              Description: item.Description,
              PlanLocationID: item.PlanLocationID,
              Price: item.Price,
              VAT: item.VAT,
            };
          });
          const response = await api.Ser_Inv_StockIn_StatusUpdateToFinished(
            objSer_Inv_StockInMst,
            objSer_Inv_StockInDtl
          );
          if (response.isSuccess) {
            toast.success(`${"StatusUpdateToFinishedSuccessfully"}`);
            refetchDataDetail();
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
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to save ?"),
      });
    }
  };

  const handlePrint = async () => {
    const response = await api.Ser_Inv_StockIn_PrintDL(
      modifyData?.lst_Ser_Inv_StockIn[0]?.StockInID ?? ""
    );
    if (response.isSuccess) {
      quickPrint({
        url: response.Data!,
      });
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
  };

  const handleOwe = async () => {
    formOweRef.current.openOwePopup();
  };

  const handleCancel = async () => {
    formRejectRef.current.openRejectPopup();
  };

  const handleDelete = async () => {
    ConfirmComponent({
      asyncFunction: async () => {
        const response = await api.Ser_Inv_StockIn_Delete(
          modifyData?.lst_Ser_Inv_StockIn[0]?.StockInID ?? ""
        );
        if (response.isSuccess) {
          toast.success(`${"DeleteSuccessfully"}`);
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
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to save ?"),
    });
  };

  const rightButtons: any = [
    // const rightButtons: BButtonProps[] = [
    {
      screen: "create",
      props: [
        {
          label: t(`${"Save"}`),
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handleSave,
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
      ],
    },

    {
      screen: "update",
      props: [
        {
          disabled:
            modifyData?.lst_Ser_Inv_StockIn[0]?.Status === 1 ? false : true,
          visible: !(modifyData?.lst_Ser_Inv_StockIn[0]?.Status === 1
            ? false
            : true),
          label: t(`${"StatusUpdateToExecuting"}`), // Tiến hành
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handleStatusUpdateToExecuting,
        },
        {
          disabled:
            modifyData?.lst_Ser_Inv_StockIn[0]?.Status === 3
              ? true
              : false || modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
              ? false
              : true,
          visible: !(modifyData?.lst_Ser_Inv_StockIn[0]?.Status === 3
            ? true
            : false || modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
            ? false
            : true),
          label: t(`${"StatusUpdateToPending"}`), // Hoàn trạng
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handleStatusUpdateToPending,
        },
        {
          disabled:
            modifyData?.lst_Ser_Inv_StockIn[0]?.Status === 3
              ? true
              : false || modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
              ? false
              : true,
          visible: !(modifyData?.lst_Ser_Inv_StockIn[0]?.Status === 3
            ? true
            : false || modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
            ? false
            : true),
          label: t(`${"StatusUpdateToFinished"}`), // Đã nhập
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handleStatusUpdateToFinished,
        },
        {
          disabled:
            modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
              ? false
              : true || modifyData?.lst_Ser_Inv_StockIn[0]?.Status === 3
              ? true
              : false,
          visible: !(modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
            ? false
            : true || modifyData?.lst_Ser_Inv_StockIn[0]?.Status === 3
            ? true
            : false),
          label: t(`${"Print"}`), // In
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handlePrint,
        },
        {
          disabled:
            modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
              ? false
              : true || modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 3
              ? true
              : false,
          visible: !(modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
            ? false
            : true || modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 3
            ? true
            : false),
          label: t(`${"Owe"}`), // Nợ
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handleOwe,
        },
        {
          disabled:
            modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
              ? false
              : true || modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 3
              ? true
              : false,
          visible: !(modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 1
            ? false
            : true || modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 3
            ? true
            : false),
          label: t(`${"Cancel"}`), // Hủy
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handleCancel,
        },
        {
          disabled:
            modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 3 ? false : true,
          visible: !(modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 3
            ? false
            : true),
          label: t(`${"Delete"}`), // Xóa
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handleDelete,
        },
        {
          disabled:
            modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 3 ? false : true,
          visible: !(modifyData?.lst_Ser_Inv_StockIn[0]?.Status !== 3
            ? false
            : true),
          label: t(`${"Update"}`), // Cập nhật
          className: "p-0 select-button",
          type: "normal",
          stylingMode: "outlined",
          onClick: handleUpdate,
        },
      ],
    },
  ];
  return (
    <>
      {isLoadingDataDetail === true ? (
        // && isLoadingSerCusDebitGetDL === true
        <LoadPanel visible={true} showPane={true} showIndicator={true} />
      ) : (
        <AdminContentLayout>
          <AdminContentLayout.Slot name="Header">
            <Header rightButtons={rightButtons} />
          </AdminContentLayout.Slot>
          <AdminContentLayout.Slot name="Content">
            <>
              <HeaderFormEdit
                dataUpdate={modifyData}
                // dataForm={data?.Lst_DMS40_Ord_SalesOrderRoot_data ?? formData}
                StockInNoCode={StockInNoCode}
                DealerCode={permissionStore?.sysUser?.DealerCode}
                ref={formRef}
              />
              <CarList
                ref={gridViewOneRef}
                dataUpdate={modifyData ?? []}
                // dataList={data ? data?.Lst_DMS40_Ord_SalesOrderRootDetail : []}
                dataList={paramUrl.code ? dynamicData[0] : []}
              ></CarList>
              <OwePopup
                ref={formOweRef}
                // SerCusDebitGetDL={SerCusDebitGetDL}
                modifyData={modifyData}
                onRefetch={(e: any) => {
                  setDispatch(e);
                }}
              />
              <RejectPopup
                ref={formRejectRef}
                modifyData={modifyData}
                curUser={{
                  DealerCode: permissionStore?.sysUser?.DealerCode,
                  UserCode: permissionStore?.sysUser?.UserCode,
                }}
                dataForm={{
                  RejectBy: permissionStore?.sysUser?.DealerCode,
                  RejectDate: format(new Date(), "yyyy-MM-dd"),
                  RejectDescription: "",
                }}
                onSaveForm={handleCancel}
              />
            </>
          </AdminContentLayout.Slot>
        </AdminContentLayout>
      )}
    </>
  );
};

export default SerInvStockInCreate;
