import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { BButton } from "@/packages/components/buttons";
import { usePermissions } from "@/packages/contexts/permission";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum } from "@/packages/types";
import {
  Search_Ser_InsuranceContract_Param,
  Ser_InsuranceContract,
} from "@/packages/types/master/Ser_InsuranceContract";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { ToolbarItemProps } from "@/types";
import { DataGrid, DateRangeBox, LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { HeaderPart } from "../components/header-part";
import { selectedItemsAtom } from "../components/store";
import { useColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-setting";
import { Ser_InsuranceContract_PopupView } from "../components/use-popup-view";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";

export const Ser_InsuranceContractPage = () => {
  const { t } = useI18n("Ser_InsuranceContract");
  const { t: common } = useI18n("Common");
  const api = useClientgateApi();
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const { isHTV, DealerCode } = usePermissions();
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<Search_Ser_InsuranceContract_Param>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    IsActive: 1,
    StartDateFromTo: ["", ""],
    InContractID: "",
    InContractNo: "", // Số hợp đồng bảo hiểm
    InContractCode: "", // Mã hợp đồng bảo hiểm
    StartDate: "", // Ngày bắt đầu hiệu lực
    FinishDate: "", // Ngày kết thúc hiệu lực
    TypePayment: "", // Phương thức thanh toán
    InsNo: "", // Hãng bảo hiểm
    DealerCode: "", // Mã đại lý
    LogLUDateTime: "",
    LogLUBy: "",
    PaymentLimit: "", // Hạn mức thanh toán
    CreatedDate: "",
    CreatedBy: "",
    // StartDateFromTo: [validateTimeStartDayOfMonth, new Date()],
  });
  //======================CallAPI==========================================
  const fetchData = async () => {
    const response = await match(isHTV)
      .with(true, async () => {
        return await api.Ser_InsuranceContract_SearchHQ({
          ...searchCondition.current,
          InContractNo: searchCondition?.current?.InContractNo ?? "",
          InsNo: searchCondition?.current?.InsNo ?? "",
          StartDate: searchCondition.current.StartDateFromTo[0],
          FinishDate: searchCondition.current.StartDateFromTo[1],
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        } as Search_Ser_InsuranceContract_Param);
      })
      .otherwise(async () => {
        return await api.Ser_InsuranceContract_SearchDL({
          ...searchCondition.current,
          // DealerCode: "VS058",
          InContractNo: searchCondition?.current?.InContractNo ?? "",
          InsNo: searchCondition?.current?.InsNo ?? "",
          StartDate: searchCondition.current.StartDateFromTo[0] ?? "",
          FinishDate: searchCondition.current.StartDateFromTo[1] ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        } as Search_Ser_InsuranceContract_Param);
      });
    if (response.isSuccess) {
      return response;
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
  //======================CallAPI-end==========================================

  //==========================handle================================================
  const handleAddNew = () => {
    gridRef?.current?.addRow();
  };

  const handleRefetch = () => {
    gridRef?.current?.refetchData();
  };

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...searchCondition.current,
      ...data,
      // ...data.current,
      // StartDate: "",
      // FinishDate: "",
      // StartDate: data.StartDate
    };

    await onRefetchData();
  };

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };

  const handleSubmit = () => {
    gridRef.current?.getDxInstance()?.saveEditData();
  };

  const handleCancel = () => {
    gridRef.current?.getDxInstance()?.cancelEditData();
  };

  const handleEdit = (rowIndex: number) => {
    gridRef.current?.getDxInstance()?.editRow(rowIndex);
  };

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    // use this function to control how the editor looks like
    if (["DealerCode", "DealerType", "ProvinceCode"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "FlagActive") {
      e.editorOptions.value = true;
    } else if (["FlagDirect", "FlagTCG"].includes(e.dataField!)) {
      e.editorOptions.value = "0";
    }
  };

  const handleDelete = async (e: any) => {
    const key = e?.row?.key;
    const r = e.component.getVisibleRows();
    const f = r.find((e: any) => {
      return e.key === key;
    });
    await onDelete(f.data);
  };

  const handleDeleteRow = async (ids: string[]) => {
    // // loadingControl.open();
    // const respone = await api.Mst_Dealer_DeleteMultiple(ids);
    // loadingControl.close();
    // if (respone.isSuccess) {
    //   toast.success(t("Delete successfully!"));
    //   handleRefetch();
    //   return true;
    // }
    // showError({
    //   message: t(respone._strErrCode),
    //   _strErrCode: respone._strErrCode,
    //   _strTId: respone._strTId,
    //   _strAppTId: respone._strAppTId,
    //   _objTTime: respone._objTTime,
    //   _strType: respone._strType,
    //   _dicDebug: respone._dicDebug,
    //   _dicExcs: respone._dicExcs,
    // });
    // throw new Error(respone._strErrCode);
    toast.warning("Chưa có api nhé!");
  };

  const handleDeleteMulti = async () => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current
          ?.getDxInstance()
          ?.getSelectedRowKeys();

        await handleDeleteRow(listChecked);
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };

  const onModify = async (data: Ser_InsuranceContract) => {
    const respone = await api.Ser_InsuranceContract_Update({
      ...data,
    });
    if (respone.isSuccess) {
      toast.success(t("Update successfully!"));
      gridRef.current?.getDxInstance()?.cancelEditData();
      gridRef.current?.refetchData();
      return true;
    }
    showError({
      message: t(respone._strErrCode),
      _strErrCode: respone._strErrCode,
      _strTId: respone._strTId,
      _strAppTId: respone._strAppTId,
      _objTTime: respone._objTTime,
      _strType: respone._strType,
      _dicDebug: respone._dicDebug,
      _dicExcs: respone._dicExcs,
    });
    throw new Error(respone._strErrCode);
    toast.warning("Chưa có api nhé!");
  };
  // Section: CRUD operations
  const onCreate = async (
    data: Ser_InsuranceContract & { __KEY__: string }
  ) => {
    const { __KEY__, ...rest } = data;
    console.log("data", data);
    if (data?.FinishDate < data?.StartDate) {
      toast.error("Ngày bắt đầu hiệu lực phải bé hơn ngày kết thúc hiệu lực!");
    }
    if (data?.PaymentLimit <= 0) {
      toast.error("Hạn mức thanh toán phải lớn hơn 0");
    } else {
      const respone = await api.Ser_InsuranceContract_Create({
        ...rest,
        InContractCode: null,
        IsActive: "1",
      });
      if (respone.isSuccess) {
        toast.success(common("Create successfully!"));
        gridRef?.current?.getDxInstance().cancelEditData();
        await onRefetchData();
        return true;
      }
      showError({
        message: t(respone._strErrCode),
        _strErrCode: respone._strErrCode,
        _strTId: respone._strTId,
        _strAppTId: respone._strAppTId,
        _objTTime: respone._objTTime,
        _strType: respone._strType,
        _dicDebug: respone._dicDebug,
        _dicExcs: respone._dicExcs,
      });
      throw new Error(respone._strErrCode);
    }
  };
  const onDelete = async (data: Ser_InsuranceContract) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Ser_InsuranceContract_Delete(data);
        if (respone.isSuccess) {
          toast.success(t("Delete successfully!"));
          await onRefetchData();
          return true;
        }
        showError({
          message: t(respone._strErrCode),
          _strErrCode: respone._strErrCode,
          _strTId: respone._strTId,
          _strAppTId: respone._strAppTId,
          _objTTime: respone._objTTime,
          _strType: respone._strType,
          _dicDebug: respone._dicDebug,
          _dicExcs: respone._dicExcs,
        });
        throw new Error(respone._strErrCode);
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
    // toast.warning("Chưa có api nhé!");
  };

  const handleSavingRow = (e: any) => {
    // stop grid behaviour
    console.log(298, e);
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      const key = e.changes[0].key;
      const l = e.component.getVisibleRows();
      const c = e.changes[0].data!;
      const f = l?.find((item: any) => item.key == key);
      const d = f?.data;
      const updData = { ...d, ...c };
      if (type === "remove") {
        e.promise = onDelete(updData);
      } else if (type === "insert") {
        const data = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onModify(updData);
      }
    }
    e.cancel = true;
  };

  //==========================handle-end================================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("InContractNo"),
      dataField: "InContractNo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("InsNo"),
      dataField: "InsNo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: "StartDateFromTo",
      dataField: "StartDateFromTo",
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              width={"100%"}
              className="dateRange "
              displayFormat="yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={
                searchCondition.current?.StartDateFromTo?.[0] ?? ""
              }
              defaultEndDate={
                searchCondition.current?.StartDateFromTo?.[1] ?? ""
              }
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.instance().updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
  ];
  //==========================searchConditions-end================================================

  const columns = useColumns({});

  const formSettings = useFormSettings({
    columns,
  });

  const popupSettings: IPopupOptions = {
    showTitle: true,
    height: "500px",
    width: "1100px",
    title: t("Ser_InsuranceContract"),
    className: "dealer-information-popup",
    toolbarItems: [
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Save"),
          stylingMode: "contained",
          type: "default",
          onClick: handleSubmit,
        },
      },
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Cancel"),
          type: "default",
          stylingMode: "contained",
          onClick: handleCancel,
        },
      },
    ],
  };

  const handleExportExcel = async () => {
    const response = await api.Ser_InsuranceContract_ExportExcel(
      searchCondition.current
    );
    // setIsProcessing(false);
    if (response.isSuccess) {
      toast.success(t("ExportExcelSuccess"));
      window.location.href = response.Data!;
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

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <HeaderPart
          onAddNew={handleAddNew}
          searchCondition={searchCondition}
          handleRefetch={handleRefetch}
          handleExport={handleExportExcel}
        ></HeaderPart>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <ContentSearchPanelLayout searchPermissionCode="">
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <PermissionContainer
              permission={""}
              children={
                <div className={"w-[300px]"}>
                  <SearchPanelV2
                    conditionFields={searchConditions}
                    data={searchCondition.current}
                    onSearch={handleSearch}
                    storeKey={"Ser_InsuranceContract-search-panel"}
                  />
                </div>
              }
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={loadingControl.visible}
              showIndicator={true}
              showPane={true}
            />
            {!loadingControl.visible && (
              <>
                <GridViewOne
                  ref={gridRef}
                  dataSource={[]} // cars
                  columns={columns}
                  fetchData={fetchData}
                  onSelectionChanged={handleSelectionChanged}
                  autoFetchData={true}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={[]}
                  editMode={true}
                  editingOptions={{
                    mode: "popup",
                    form: formSettings,
                    popup: popupSettings,
                  }}
                  // toolbarItems={subGridToolbars}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"InContractCode"}
                  storeKey={"Ser_InsuranceContract"}
                />
                <Ser_InsuranceContract_PopupView
                  onEdit={handleEdit}
                  formSettings={formSettings}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
