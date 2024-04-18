import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useNetworkNavigate, useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum } from "@/packages/types";
import {
  NPPQuanLyChienDich,
  Search_NPPQuanLyChienDich_Param,
} from "@/packages/types/carservice/NPPQuanLyChienDich";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { DataGrid, LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { data } from "../components/data";
import { HeaderPart } from "../components/header-part";
import { selectedItemsAtom } from "../components/store";
import { useColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-setting";
import { NPPQuanLyChienDich_PopupView } from "../components/use-popup-view";

export const NPPQuanLyChienDichPage = ({
  disabled = false,
}: {
  disabled?: boolean;
}) => {
  const { t } = useI18n("NPPQuanLyChienDich");

  const navigate = useNetworkNavigate();

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<Search_NPPQuanLyChienDich_Param>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    KeyWord: "",

    MaChienDich: "",
    TenChienDich: "",
    FlagWH: "",
  });

  //======================CallAPI==========================================
  const fetchData = async () => {
    // const resp: any = await api.Mst_Dealer_Search({
    //   ...searchCondition,
    //   Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
    //   Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    // });

    // return resp;

    return {
      DataList: data,
      // PageCount: length / pageSize,
      PageCount: 1,
      ItemCount: length,
      PageSize: 99999,
    };
  };
  //======================CallAPI-end==========================================

  //==========================handle================================================
  const handleAddNew = () => {
    navigate("/service/HTCTaoMoiChienDich");
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

  const onModify = async (id: string, data: NPPQuanLyChienDich) => {
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
  const onCreate = async (data: NPPQuanLyChienDich & { __KEY__: string }) => {
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
    // ConfirmComponent({
    //   asyncFunction: async () => {
    //     const respone = await api.Mst_Dealer_Delete(id);
    //     if (respone.isSuccess) {
    //       toast.success(t("Delete successfully!"));
    //       await refetch();
    //       return true;
    //     }
    //     showError({
    //       message: t(respone._strErrCode),
    //       _strErrCode: respone._strErrCode,
    //       _strTId: respone._strTId,
    //       _strAppTId: respone._strAppTId,
    //       _objTTime: respone._objTTime,
    //       _strType: respone._strType,
    //       _dicDebug: respone._dicDebug,
    //       _dicExcs: respone._dicExcs,
    //     });
    //     throw new Error(respone._strErrCode);
    //   },
    //   title: t("Confirm"),
    //   contentConfirm: t("Do you want to delete?"),
    // });
    toast.warning("Chưa có api nhé!");
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
      caption: t("MaChienDich"),
      dataField: "MaChienDich",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("TenChienDich"),
      dataField: "TenChienDich",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("FlagWH"),
      dataField: "FlagWH",
      editorType: "dxCheckBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];
  //==========================searchConditions-end================================================

  const columns = useColumns({ isDisabled: disabled });

  const formSettings = useFormSettings({
    columns,
  });

  const popupSettings: IPopupOptions = {
    showTitle: true,
    height: "500px",
    width: "1100px",
    title: t("Dealer Information"),
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
                    storeKey={"NPPQuanLyChienDich-search-panel"}
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
                  editMode={false}
                  editingOptions={{
                    mode: "batch",
                    form: formSettings,
                    popup: popupSettings,
                  }}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"MaChienDich"}
                  storeKey={"NPPQuanLyChienDich"}
                />
                <NPPQuanLyChienDich_PopupView
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
