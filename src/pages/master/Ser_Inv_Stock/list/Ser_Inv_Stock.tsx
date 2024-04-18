import { IPopupOptions } from "devextreme-react/popup";
import { IItemProps } from "devextreme-react/form";
import { toast } from "react-toastify";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { DataGrid, LoadPanel } from "devextreme-react";
import { match } from "ts-pattern";
import { useSetAtom } from "jotai";

import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum } from "@/packages/types";
import { useEffect, useRef } from "react";
import { selectedItemsAtom } from "../components/store";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import {
  SearchSer_Inv_StockParam,
  Ser_Inv_Stock,
} from "@/packages/types/master/Ser_Inv_Stock";
import { useColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-setting";
import { HeaderPart } from "../components/header-part";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Ser_Inv_Stock_PopupView } from "../components/use-popup-view";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useClientgateApi } from "@/packages/api";
import { usePermissions } from "@/packages/contexts/permission";

export const Ser_Inv_StockPage = () => {
  const { t } = useI18n("Ser_Inv_Stock");
  const windowSize = useWindowSize();
  const api = useClientgateApi();
  const { isHQ, DealerCode } = usePermissions();

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<SearchSer_Inv_StockParam>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    StockNo: "",
    StockName: "",
    Address: "",
    IsActive: "",
    DealerCode: "",
  });

  useEffect(() => {
    if (DealerCode === "HTC") {
      toast.warn(
        t(
          "You are signed in with your HTC account, please log out and log in with your Dealer account!"
        ),
        { autoClose: 5000 }
      );
    }
  }, []);

  //======================CallAPI==========================================
  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Ser_Inv_Stock_SearchHQ({
          IsActive: searchCondition.current?.IsActive ?? "",
          StockNo: searchCondition.current?.StockNo ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          StockName: searchCondition.current?.StockName ?? "",
          Address: searchCondition.current?.Address ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_Inv_Stock_SearchDL({
          IsActive: searchCondition.current?.IsActive ?? "",
          StockNo: searchCondition.current?.StockNo ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          StockName: searchCondition.current?.StockName ?? "",
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
    if (["StockNo"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    await onDelete(data);
  };

  const handleDeleteRow = async (ids: any) => {
    let check = false;
    let checkSuccess = false;

    for (let item of ids) {
      const respone = await api.Ser_Inv_Stock_Delete({
        StockNo: item?.StockNo,
        DealerCode: item?.DealerCode,
      });
      if (respone.isSuccess) {
        checkSuccess = true;

        gridRef.current?.refetchData();
      } else {
        check = true;
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
    }
    if (check) {
      toast.warning(t("Delete failed"));
    }
    if (checkSuccess) {
      toast.success(t("Delete successfully!"));
    }
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

  const onModify = async (id: string, data: Ser_Inv_Stock) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const finDataUpdate = (array: any, searchObject: any) => {
          return array.find((item: any) =>
            Object.keys(searchObject).every(
              (key) => item[key] === searchObject[key]
            )
          );
        };
        const findData = finDataUpdate(gridRef?.current?.getVisibleData(), id);

        const dataUpdate = { ...findData, ...data };

        const respone = await api.Ser_Inv_Stock_Update({
          StockNo: dataUpdate?.StockNo ?? "",
          DealerCode: dataUpdate?.DealerCode ?? "",
          StockName: dataUpdate?.StockName ?? "",
          Contact: dataUpdate?.Contact ?? "",
          Address: dataUpdate?.Address ?? "",
          Email: dataUpdate?.Email ?? "",
          Telephone: dataUpdate?.Telephone ?? "",
          Fax: dataUpdate?.Fax ?? "",
          Mobi: dataUpdate?.Mobi ?? "",
          Manager: dataUpdate?.Manager ?? "",
          Description: dataUpdate?.Description ?? "",
          IsActive: dataUpdate?.IsActive ?? "",
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
  const onCreate = async (data: Ser_Inv_Stock & { __KEY__: string }) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Ser_Inv_Stock_Create({
          StockNo: data?.StockNo ?? "",
          DealerCode: data?.DealerCode ?? "",
          StockName: data?.StockName ?? "",
          Contact: data?.Contact ?? "",
          Address: data?.Address ?? "",
          Email: data?.Email ?? "",
          Telephone: data?.Telephone ?? "",
          Fax: data?.Fax ?? "",
          Mobi: data?.Mobi ?? "",
          Manager: data?.Manager ?? "",
          Description: data?.Description ?? "",
          IsActive: data?.IsActive ?? "",
        });
        if (respone.isSuccess) {
          toast.success(t("Create successfully!"));
          gridRef.current?.getDxInstance()?.cancelEditData();
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
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to create?"),
    });
  };
  const onDelete = async (value: any) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Ser_Inv_Stock_Delete({
          StockNo: value.StockNo,
          DealerCode: value.DealerCode,
        });
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

  //==========================handle-end================================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("StockNo"),
      dataField: "StockNo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        showClearButton: true,
      },
    },
    {
      dataField: "StockName",
      caption: t("StockName"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        showClearButton: true,
      },
    },
    {
      dataField: "Address",
      caption: t("Address"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        showClearButton: true,
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
    height: "550px",
    width: "1100px",
    title: t("Ser_Inv_Stock"),
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
          gridRef={gridRef}
        ></HeaderPart>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <PermissionContainer
              permission={""}
              children={
                <div className={"w-[300px]"}>
                  <SearchPanelV2
                    conditionFields={searchConditions}
                    data={searchCondition}
                    onSearch={handleSearch}
                    storeKey={"Ser_Inv_Stock-search-panel"}
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
                  customHeight={windowSize.height - 120}
                  keyExpr={["StockNo", "DealerCode"]}
                  storeKey={"Ser_Inv_Stock"}
                />
                <Ser_Inv_Stock_PopupView
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
