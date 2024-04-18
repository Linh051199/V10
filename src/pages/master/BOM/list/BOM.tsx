import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum } from "@/packages/types";
import { BOM, Search_BOM_Param } from "@/packages/types/master/BOM";
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
import { useColumnsDetail } from "../components/use-columns-detail";
import { useFormSettings } from "../components/use-form-setting";
import { BOM_PopupView } from "../components/use-popup-view";
import { useClientgateApi } from "@/packages/api";
import UpdateForm from "../update-form/update-form";
import CreateForm from "../create-form/create-form";
import { BButton } from "@/packages/components/buttons";
import { useDropzone } from "react-dropzone";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";

export const BOMPage = () => {
  const { t } = useI18n("BOM");

  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const api = useClientgateApi();
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<Search_BOM_Param>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    BOMCode: "",
    BOMDesc: "",
  });

  const getByBOMCodeCondition = useRef({
    BOMCode: "",
  });

  //======================CallAPI==========================================
  const fetchData = async () => {
    const resp: any = await api.BOM_SearchHQ({
      ...searchCondition.current,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (resp?.isSuccess) {
      return resp;
    }
  };

  const handleSearchByBOMCode = (data: string) => {
    getByBOMCodeCondition.current = {
      BOMCode: data,
    };

    setTimeout(() => {
      gridViewOneRef.current.refetchData();
    }, 500);
  };
  //======================CallAPI-end==========================================

  //==========================handle================================================
  const handleAddNew = () => {
    gridCreateFormRef.current.show();
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
    gridRef.current.getDxInstance().cancelEditData();
  };

  const handleEdit = (rowIndex: number) => {
    gridRef.current?.getDxInstance()?.editRow(rowIndex);
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;
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

  const onModify = async (id: string, data: BOM) => {
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
  const onCreate = async (data: BOM & { __KEY__: string }) => {
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
  const onDelete = async (id: string) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.BOM_Delete(id);
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

  const searchConditions: IItemProps[] = [
    {
      caption: t("BOMCode"),
      dataField: "BOMCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("BOMDesc"),
      dataField: "BOMDesc",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("FlagActive"),
      dataField: "FlagActive",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        items: [
          { label: t("All"), value: "" },
          { label: t("Active"), value: "1" },
          { label: t("Inactive"), value: "0" },
        ],
        displayExpr: "label",
        valueExpr: "value",
      },
    },
  ];

  const columns = useColumns({});

  const customerToolbars = [
    {
      text: t(`AddNew`),
      onClick: (e: any, ref: any) => {
        if (ref.current) {
          handleAddNew();
          // handleSaveTFValReal();
          // gridRef.current.getDxInstance().cancelEditData();
        }
      },
      shouldShow: (ref: any) => {
        let check = false;
        if (ref.current) {
          if (ref.current?._instance?.getSelectedRowsData().length >= 0) {
            check = true;
          }
          return check;
        } else {
          return check;
        }
      },
    },
  ];

  const handleExportExcel = async () => {
    let respone = await api.BOM_Export(searchCondition.current);
    if (respone.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = respone.Data;
    } else {
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
    }
  };

  const toolbarItems: GridCustomerToolBarItem[] = [
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

  let gridViewOneRef: any = useRef(null);
  const gridUpdateFormRef = useRef<any>(null);
  const gridCreateFormRef = useRef<any>(null);
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <HeaderPart
          onAddNew={handleAddNew}
          searchCondition={searchCondition}
          handleRefetch={handleRefetch}
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
                    data={searchCondition}
                    onSearch={handleSearch}
                    storeKey={"BOM-search-panel"}
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
            <div>
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
                    customToolbarItems={toolbarItems}
                    editMode={true}
                    editingOptions={{
                      mode: "row",
                    }}
                    onPageChanged={(number) => onRefetchData(number ?? 0)}
                    onSaving={handleSavingRow}
                    onRowDeleteBtnClick={handleDelete}
                    onDeleteMultiBtnClick={handleDeleteMulti}
                    onEditingStart={(e) => {
                      gridUpdateFormRef.current.show();
                      handleSearchByBOMCode(e.data.BOMCode);
                    }}
                    keyExpr={"BOMCode"}
                    storeKey={"BOM"}
                  />

                  <UpdateForm
                    orderListRef={gridRef}
                    ref={gridUpdateFormRef}
                    visible={false}
                    onCancel={handleCancel}
                    gridViewOneRef={gridViewOneRef}
                    // fetchData={fetchDataByBOMCode}
                    BOMCode={getByBOMCodeCondition}
                  />
                  <CreateForm
                    orderListRef={gridRef}
                    ref={gridCreateFormRef}
                    onRefetchData={onRefetchData}
                    visible={false}
                    onCancel={handleCancel}
                    gridViewOneRef={gridViewOneRef}
                    // fetchData={fetchDataByBOMCode}
                    BOMCode={getByBOMCodeCondition}
                  />
                </>
              )}
            </div>
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
