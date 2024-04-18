import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useClientgateApi } from "@packages/api";
import { useRef, useState } from "react";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { useConfiguration, useVisibilityControl } from "@packages/hooks";
import { logger } from "@packages/logger";
import { showErrorAtom } from "@packages/store";
import { FlagActiveEnum } from "@packages/types";
import { useQuery } from "@tanstack/react-query";
import { IPopupOptions } from "devextreme-react/popup";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "react-toastify";
import "./dealer-management.scss";
import { IItemProps } from "devextreme-react/form";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { useFormSettings } from "../components/use-form-settings";
import { DataGrid, LoadPanel } from "devextreme-react";
import PermissionContainer, {
  checkPermision,
} from "@/components/PermissionContainer";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import {
  selectedItemsAtom,
  showButtonDeleteAtom,
} from "../components/dealer-store";
import { HeaderPart } from "../components/header-part";
import { DealerPopupView } from "../components/dealer-popup-view";
import {
  Search_Ser_Mst_Supplier,
  Ser_Mst_Supplier,
} from "@/packages/types/master/Ser_Mst_Supplier";
import { useGridColumns } from "../components/use-columns";
import { usePermissions } from "@/packages/contexts/permission";
import { match } from "ts-pattern";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

export const Ser_Mst_SupplierManagementPage = () => {
  const { t } = useI18n("Ser_Mst_SupplierManagement");
  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const showError = useSetAtom(showErrorAtom);
  const getShowButtonDelete = useAtomValue(showButtonDeleteAtom);
  const setShowButtonDelete = useSetAtom(showButtonDeleteAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const api = useClientgateApi();
  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const searchCondition = useRef<Partial<Search_Ser_Mst_Supplier>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    KeyWord: "",
    SupplierID: "",
    SupplierCode: "",
    SupplierName: "",
    DealerCode: "",
  });

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Ser_Mst_Supplier_SearchHQ({
          IsActive: searchCondition.current?.IsActive ?? "",
          SupplierID: searchCondition.current?.SupplierID ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          SupplierCode: searchCondition.current?.SupplierCode ?? "",
          SupplierName: searchCondition.current?.SupplierName ?? "",
          Address: searchCondition.current?.Address ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_Mst_Supplier_SearchDL({
          IsActive: searchCondition.current?.IsActive ?? "",
          SupplierID: searchCondition.current?.SupplierID ?? "",
          SupplierCode: searchCondition.current?.SupplierCode ?? "",
          SupplierName: searchCondition.current?.SupplierName ?? "",
          Address: searchCondition.current?.Address ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      });
    if (resp?.isSuccess) {
      return resp;
    }
  };

  const columns = useGridColumns({});

  const formSettings = useFormSettings({
    columns,
  });

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };

  const handleAddNew = () => {
    gridRef?.current?.addRow();
    // setShowButtonDelete(false);
  };

  // toggle search panel
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom);
  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const handleCancel = () => {
    gridRef.current?.getDxInstance()?.cancelEditData();
  };
  const handleEdit = (rowIndex: number) => {
    gridRef.current?.getDxInstance()?.editRow(rowIndex);
    // setShowButtonDelete(true);
  };

  // const handleDeleteItem = (rowIndex: number) => {
  //   console.log(rowIndex);
  // };

  const handleSubmit = () => {
    gridRef.current?.getDxInstance()?.saveEditData();
  };

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    // use this function to control how the editor looks like
    // if (["SupplierFax", "ContactPhone"].includes(e.dataField!)) {
    //   e.editorOptions.visible = e.row?.isNewRow;
    // }
    // } else if (e.dataField === "FlagActive") {
    //   e.editorOptions.value = true;
    // } else if (["FlagDirect", "FlagTCG"].includes(e.dataField!)) {
    //   e.editorOptions.value = "0";
    // }
  };

  const popupSettings: IPopupOptions = {
    showTitle: true,
    height: "500px",
    width: "1100px",
    title: t("Ser_Mst_Supplier Information"),
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
      // {
      //   toolbar: "bottom",
      //   location: "after",
      //   widget: "dxButton",
      //   visible: getShowButtonDelete,
      //   options: {
      //     text: t("Delete"),
      //     stylingMode: "contained",
      //     type: "default",
      //     onClick: handleDeleteItem,
      //   },
      // },
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

  const onModify = async (key: any, data: Ser_Mst_Supplier) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const finDataUpdate = (array: any, searchObject: any) => {
          return array.find((item: any) =>
            Object.keys(searchObject).every(
              (key) => item[key] === searchObject[key]
            )
          );
        };
        const dataSource = gridRef.current.getDxInstance().option("dataSource");
        const findObj = dataSource.find(
          (obj: Ser_Mst_Supplier) => obj.SupplierCode === key.SupplierCode
        ); // find object to update

        const dataUpdate = { ...findObj, ...data };

        const respone = await api.Ser_Mst_Supplier_Update({
          SupplierID: dataUpdate.SupplierID ?? "",
          SupplierCode: dataUpdate.SupplierCode ?? "",
          SupplierName: dataUpdate.SupplierName ?? "",
          Phone: dataUpdate.Phone ?? "",
          SupplierFax: dataUpdate.SupplierFax ?? "",
          ContactName: dataUpdate.ContactName ?? "",
          ContactPhone: dataUpdate.ContactPhone ?? "",
          Address: dataUpdate.Address ?? "",
          IsActive: "1",
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
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to update?"),
    });
  };

  // Section: CRUD operations
  const onCreate = async (data: Ser_Mst_Supplier) => {
    const respone = await api.Ser_Mst_Supplier_Create({
      ...data,
    });
    if (respone.isSuccess) {
      toast.success(t("Create successfully!"));
      gridRef?.current?.getDxInstance().cancelEditData();
      gridRef?.current?.refetchData();
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
  };

  const onDelete = async (id: string) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Ser_Mst_Supplier_Delete(id);
        if (respone.isSuccess) {
          toast.success(t("Delete successfully!"));
          gridRef?.current?.refetchData();
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
  // End Section: CRUD operations
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
  const searchConditions: IItemProps[] = [
    {
      caption: t("SupplierCode"),
      dataField: "SupplierCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "SupplierName",
      caption: t("SupplierName"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "Address",
      caption: t("Address"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];

  const handleDeleteRow = async (ids: string[]) => {
    // loadingControl.open();
    // const respone = await api.Ser_Mst_Supplier_DeleteMultiple(ids);
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
  };

  const handleDelete = async (e: any) => {
    // gridRef.current?.getDxInstance()?.editRow(rowIndex);
    const data = e?.row?.key;
    // console.log("datadelete", data);

    await onDelete(data);
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

  const handleRefetch = () => {
    gridRef?.current?.refetchData();
  };
  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart
          onAddNew={handleAddNew}
          searchCondition={searchCondition}
          handleRefetch={handleRefetch}
          gridRef={gridRef}
        ></HeaderPart>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
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
                    storeKey={"Ser_Mst_Supplier-search-panel"}
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
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  customHeight={windowSize.height - 110}
                  keyExpr={["SupplierCode", "SupplierID"]}
                  storeKey={"Ser_Mst_Supplier-management-columns"}
                />
                <DealerPopupView
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
