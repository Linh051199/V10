import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum } from "@/packages/types";
import {
  QuanLyAnhTrenPhieuTNGX,
  Search_QuanLyAnhTrenPhieuTNGX_Param,
} from "@/packages/types/master/QuanLyAnhTrenPhieuTNGX";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { DataGrid, LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "../components/header-part";
import { selectedItemsAtom } from "../components/store";
import { useColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-setting";
import { QuanLyAnhTrenPhieuTNGX_PopupView } from "../components/use-popup-view";
import { useClientgateApi } from "@/packages/api";
import PopupCreateQuanLyAnhTranPhieuTNGX from "../popupCreate/PopupCreate";
import PopupUpdateQuanLyAnhTranPhieuTNGX from "../popupUpdate/PopupUpdate";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";
import { useQuery } from "@tanstack/react-query";

export const QuanLyAnhTrenPhieuTNGXPage = () => {
  const { t } = useI18n("QuanLyAnhTrenPhieuTNGX");

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);
  const api = useClientgateApi();
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<Search_QuanLyAnhTrenPhieuTNGX_Param>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    ReceptionFAudType: "",
    ModelCode: "",
  });

  //======================CallAPI==========================================
  const fetchData = async () => {
    const resp: any = await api.Ser_Mst_ModelAudImageApi_Search({
      ...searchCondition,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    return resp;
  };
  //======================CallAPI-end==========================================

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
    };

    await onRefetchData();
  };

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };

  const handleCancel = () => {
    gridRef.current?.getDxInstance()?.cancelEditData();
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
    const data = e?.row?.data;
    await onDelete(data);
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

  const onModify = async (id: string, data: QuanLyAnhTrenPhieuTNGX) => {
    // const respone = await api.Mst_Dealer_Update(id, {
    //   ...data,
    // });
    // if (respone.isSuccess) {
    //   toast.success(t("Update successfully!"));
    //   gridRef.current?.getDxInstance()?.cancelEditData();
    //   gridRef.current?.refetchData();
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
  // Section: CRUD operations
  const onCreate = async (
    data: QuanLyAnhTrenPhieuTNGX & { __KEY__: string }
  ) => {
    // const { __KEY__, ...rest } = data;
    // const respone = await api.Mst_Dealer_Create({
    //   ...rest,
    // });
    // if (respone.isSuccess) {
    //   toast.success(t("Create successfully!"));
    //   gridRef?.current?.getDxInstance().cancelEditData();
    //   await refetch();
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
  const onDelete = async (data: any) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Ser_Mst_ModelAudImageApi_Delete(data);
        if (respone.isSuccess) {
          toast.success(t("Delete successfully!"));
          handleRefetch();
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
  };

  const handleExportExcel = async () => {
    const response = await api.Ser_Mst_ModelAudImageApi_ExportExcel(
      searchCondition.current
    );
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

  const handleSavingRow = (e: any) => {
    // stop grid behaviour
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        const data = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onModify(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  //==========================handle-end================================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("ReceptionFAudType"),
      dataField: "ReceptionFAudType",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("ModelCode"),
      dataField: "ModelCode",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];
  //==========================searchConditions-end================================================

  const columns = useColumns({});

  const formSettings = useFormSettings({
    columns,
  });

  const toolbarItems: GridCustomToolBarItem[] = [
    {
      text: t(`Create`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          gridCreateFormRef.current.show();
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
    {
      text: t(`ExportExcel`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleExportExcel();
        }
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
  ];

  const getByFilePathVideoCodeCondition = useRef({
    ReceptionFAudType: "",
    ModelCode: "",
  });

  let gridViewOneRef: any = useRef(null);
  const gridCreateFormRef = useRef<any>(null);
  const gridUpdateFormRef = useRef<any>(null);

  const { data: listModelCode, isLoading: isGettingModelCode } = useQuery({
    queryKey: ["getallactiveModelCode"],
    queryFn: async () => {
      const response = await api.Ser_Mst_ModelAudImageApi_GetActive();
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
  const { data: listReception, isLoading: isGettingListReception } = useQuery({
    queryKey: ["listReception"],
    queryFn: async () => {
      const response =
        await api.Ser_Mst_ModelAudImageApi_GetActiveReceptionFAudType();
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

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header"></AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <ContentSearchPanelLayout searchPermissionCode="">
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <PermissionContainer
              permission={""}
              children={
                <div className={"w-[300px]"}>
                  <SearchPanelV2
                    conditionFields={searchConditions}
                    data={searchCondition}
                    onSearch={handleSearch}
                    storeKey={"QuanLyAnhTrenPhieuTNGX-search-panel"}
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
                  autoFetchData={false}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={toolbarItems}
                  editMode={true}
                  editingOptions={{
                    mode: "row",
                  }}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"ReceptionFAudType"}
                  onEditingStart={(e) => {
                    getByFilePathVideoCodeCondition.current = e.data;
                    gridUpdateFormRef.current.show();
                  }}
                  storeKey={"QuanLyAnhTrenPhieuTNGX"}
                />
                <PopupCreateQuanLyAnhTranPhieuTNGX
                  orderListRef={gridRef}
                  ref={gridCreateFormRef}
                  visible={false}
                  onCancel={handleCancel}
                  gridViewOneRef={gridViewOneRef}
                  onRefetch={handleRefetch}
                  modelList={listModelCode}
                  receptionList={listReception}
                />
                <PopupUpdateQuanLyAnhTranPhieuTNGX
                  orderListRef={gridRef}
                  ref={gridUpdateFormRef}
                  visible={false}
                  onCancel={handleCancel}
                  gridViewOneRef={gridViewOneRef}
                  onRefetch={handleRefetch}
                  code={getByFilePathVideoCodeCondition}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
