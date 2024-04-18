import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { HeaderPart } from "../components/header-part";
import { useEffect, useRef } from "react";
import { DataGrid, LoadPanel } from "devextreme-react";
import {
  SearchTST_Mst_PartParam,
  TST_Mst_Part,
} from "@/packages/types/master/TST_Mst_Part";
import { FlagActiveEnum } from "@/packages/types";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { IItemProps } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { useColumns } from "../components/use-columns";
import { useSetAtom } from "jotai";
import { selectedItemsAtom } from "../components/store";
import { useFormSettings } from "../components/use-form-setting";
import { IPopupOptions } from "devextreme-react/popup";
import { showErrorAtom } from "@/packages/store";
import { toast } from "react-toastify";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { TST_Mst_Part_PopupView } from "../components/use-popup-view";
import { useClientgateApi } from "@/packages/api";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useQuery } from "@tanstack/react-query";
import { usePermissions } from "@/packages/contexts/permission";

export const TST_Mst_PartPage = () => {
  const { t } = useI18n("TST_Mst_Part");
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const { isHQ, DealerCode } = usePermissions();

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<SearchTST_Mst_PartParam>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,

    TSTPartCode: "",
    TSTPartName: "",
    TypeCode: "",
    GroupCode: "",
  });

  useEffect(() => {
    if (DealerCode !== "HTC") {
      toast.warn(
        t(
          "You are signed in with your Dealer account, please log out and log in with your HTC account!"
        ),
        { autoClose: 5000 }
      );
    }
  }, []);

  //======================CallAPI==========================================
  const fetchData = async () => {
    const resp: any = await api.TST_Mst_Part_Search({
      TSTPartCode: searchCondition.current?.TSTPartCode ?? "",
      TSTPartName: searchCondition.current?.TSTPartName ?? "",
      GroupCode: searchCondition.current?.GroupCode ?? "",
      TypeCode: searchCondition.current?.TypeCode ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    return resp;
  };
  const { data: TSTMstPartGroup, isLoading: isGettignTSTMstPartGroup } =
    useQuery({
      queryKey: ["TSTMstPartGroup_Search"],
      queryFn: async () => {
        const response = await api.TSTMstPartGroup_Search();
        if (response.isSuccess) {
          if (response.DataList) {
            return [
              { GroupCode: "", GroupName: "Tất Cả" },
              ...response.DataList,
            ];
          }
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
  const { data: TSTMstPartType, isLoading: isGettignTSTMstPartType } = useQuery(
    {
      queryKey: ["TSTMstPartType_Search"],
      queryFn: async () => {
        const response = await api.TSTMstPartType_Search();
        if (response.isSuccess) {
          if (response.DataList) {
            return [{ TypeCode: "", TypeName: "Tất Cả" }, ...response.DataList];
          }
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
    }
  );
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
    if (!["VieName"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    await onDelete(data);
  };

  const handleDeleteRow = async (ids: string[]) => {};

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

  const onModify = async (id: string, data: TST_Mst_Part) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const findData = gridRef?.current
          ?.getVisibleData()
          .find((item: any) => item.TSTPartCode === id);

        const dataUpdate = { ...findData, ...data };
        console.log(" ~ dataUpdate:", dataUpdate);

        const respone = await api.TST_Mst_Part_Update({
          TSTPartCode: dataUpdate?.TSTPartCode ?? null,
          TSTPrice: dataUpdate?.TSTPrice ?? null,
          TSTPriceBefore: dataUpdate?.TSTPriceBefore ?? null,
          LUDTime: dataUpdate?.LUDTime ?? null,
          LUBy: dataUpdate?.LUBy ?? null,
          VieName: dataUpdate?.VieName ?? null,
          VAT: dataUpdate?.VAT ?? null,
          Unit: dataUpdate?.Unit ?? null,
          DateEffect: dataUpdate?.DateEffect ?? null,
          TSTCost: dataUpdate?.TSTCost ?? null,
          VieNameHTC: dataUpdate?.VieNameHTC ?? null,
          TSTWarrantyPrice: dataUpdate?.TSTWarrantyPrice ?? null,
          TypeCode: dataUpdate?.TypeCode ?? null,
          GroupCode: dataUpdate?.GroupCode ?? null,
          UpdateDateTime: dataUpdate?.UpdateDateTime ?? null,
          UpdateBy: dataUpdate?.UpdateBy ?? null,
          MinOrderQuantity: dataUpdate?.MinOrderQuantity ?? null,
          Remark: dataUpdate?.Remark ?? null,
          EngName: dataUpdate?.EngName ?? null,
          TSTUnit: dataUpdate?.TSTUnit ?? null,
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
  const onCreate = async (data: TST_Mst_Part & { __KEY__: string }) => {};
  const onDelete = async (id: string) => {};

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
      caption: t("TSTPartCode"),
      dataField: "TSTPartCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "TSTPartName",
      caption: t("TSTPartName"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "TypeCode",
      caption: t("TypeCode"),
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "TypeCode",
        displayExpr: "TypeName",
        items: TSTMstPartType ?? [],
      },
    },
    {
      dataField: "GroupCode",
      caption: t("GroupCode"),
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "GroupCode",
        displayExpr: "GroupName",
        items: TSTMstPartGroup ?? [],
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
    title: t("TST_Mst_Part"),
    wrapperAttr: {
      class: "popup-fill",
    },
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
        <ContentSearchPanelLayout
          // searchPermissionCode="BTN_QUANTRI_BTN_QUANTRI_QLDAILY_CREATE_SEARCH"
          searchPermissionCode=""
        >
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <PermissionContainer
              // permission={"BTN_QUANTRI_BTN_QUANTRI_QLDAILY_CREATE_SEARCH"}
              permission={""}
              children={
                <div className={"w-[300px]"}>
                  <SearchPanelV2
                    conditionFields={searchConditions}
                    data={searchCondition.current}
                    onSearch={handleSearch}
                    storeKey={"TST_Mst_Part-search-panel"}
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
                  isHiddenCheckBox
                  isLoading={false}
                  customToolbarItems={[]}
                  editMode={true}
                  editingOptions={{
                    mode: "popup",
                    form: formSettings,
                    popup: popupSettings,
                    allowDeleting: false,
                  }}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  customHeight={windowSize.height - 140}
                  keyExpr={"TSTPartCode"}
                  storeKey={"TST_Mst_Part"}
                />
                <TST_Mst_Part_PopupView
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
