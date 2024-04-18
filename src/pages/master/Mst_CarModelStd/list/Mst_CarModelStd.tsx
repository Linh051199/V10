import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { useEffect, useMemo, useRef } from "react";
import { DataGrid, LoadPanel } from "devextreme-react";
import { useClientgateApi } from "@/packages/api";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { useAtomValue, useSetAtom } from "jotai";
import { selectedItemsAtom } from "../components/screen-atom";
import { normalGridSelectionKeysAtom } from "@/packages/ui/base-gridview/store/normal-grid-store";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { showErrorAtom } from "@/packages/store";
import { Mst_CarModelStd } from "@/packages/types/master/Mst_CarModelStd";
import { usePermissions } from "@/packages/contexts/permission";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { Mst_CarModelStd_PopupView } from "../components/use-popup-view";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-setting";
import { IPopupOptions } from "devextreme-react/popup";
import { HeaderPart } from "../components/header-part";
import { IItemProps } from "devextreme-react/form";
import { SearchForm } from "../components/search-panel";

export const Mst_CarModelStdPage = () => {
  const { t } = useI18n("Mst_CarModelStd");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const { isHQ, DealerCode } = usePermissions();
  const windowSize = useWindowSize();

  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<any>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,

    ModelCode: "",
    ModelName: "",
    FlagActive: "",
  });

  useEffect(() => {
    if (DealerCode !== "HTC") {
      toast.warn(
        t(
          "You are signed in with your HTC account, please log out and log in with your Dealer account!"
        ),
        { autoClose: 5000 }
      );
    }
  }, []);

  //===========================CallAPI======================================
  const fetchData = async () => {
    const response = await api.Mst_CarModelStd_SearchHQ({
      ModelCode: searchCondition.current?.ModelCode ?? "",
      ModelName: searchCondition.current?.ModelName ?? "",
      FlagActive: searchCondition.current?.FlagActive ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (response?.isSuccess) {
      return response;
    }
  };
  //===========================CallAPI-end======================================

  //===========================handle======================================
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
    // if (["ModelCode"].includes(e.dataField!)) {
    //   e.editorOptions.readOnly = !e.row?.isNewRow;
    // }

    if (e.dataField) {
      if (["ModelCode"].includes(e.dataField!)) {
        e.editorOptions.readOnly = !e.row?.isNewRow;
      }

      if (e.dataField === "FlagActive") {
        if (e.row?.isEditing) {
          e.editorOptions.visible = true;
        }
        if (e.row?.isNewRow) {
          e.editorOptions.visible = false;

          const node = document.querySelectorAll(".dx-field-item-label")[5];
          node.classList.add("dx-switch-custom-hidden-label");
        } else {
          e.editorOptions.value =
            e.row?.data.FlagActive === true ? true : false;
        }
      }
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
      const respone = await api.Mst_CarModelStd_Delete({
        ModelCode: item.ModelCode,
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

  const onModify = async (id: string, data: Mst_CarModelStd) => {
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
        const dataCall = {
          ModelCode: dataUpdate?.ModelCode ?? "",
          ModelName: dataUpdate?.ModelName ?? "",
          Remark: dataUpdate?.Remark ?? "",
          FlagActive: dataUpdate?.FlagActive ? "1" : "0",
        };
        const respone = await api.Mst_CarModelStd_Update(dataCall, data);
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
  const onCreate = async (data: Mst_CarModelStd & { __KEY__: string }) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Mst_CarModelStd_Create({
          ModelCode: data?.ModelCode ?? "",
          ModelName: data?.ModelName ?? "",
          Remark: data?.Remark ?? "",
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
        const respone = await api.Mst_CarModelStd_Delete({
          ModelCode: value.ModelCode,
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

  //===========================handle-end======================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("ModelCode"),
      dataField: "ModelCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        showClearButton: true,
      },
    },
    {
      dataField: "ModelName",
      caption: t("ModelName"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        showClearButton: true,
      },
    },
    {
      dataField: "FlagActive",
      caption: t("FlagActive"),
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: [
          {
            text: t("Tất cả"),
            value: "",
          },
          {
            text: t("Active"),
            value: "1",
          },
          {
            text: t("Inactive"),
            value: "0",
          },
        ],
        placeholder: t("Select"),
        default: "",
        displayExpr: "text",
        valueExpr: "value",
      },
    },
  ];
  //==========================searchConditions-end================================================

  const columns = useColumns({ data: [] ?? [] });

  const formSettings = useFormSettings({
    columns,
  });

  const popupSettings: IPopupOptions = {
    showTitle: true,
    height: "300px",
    width: "700px",
    title: t("Mst_CarModelStd"),
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

  // return (
  //   <AdminContentLayout>
  //     <AdminContentLayout.Slot name="Header">
  //       <PageHeaderLayout>
  //         <PageHeaderLayout.Slot name="Before">
  //           <div className="font-bold dx-font-m">{t("Mst_CarModelStd")}</div>
  //         </PageHeaderLayout.Slot>
  //         <PageHeaderLayout.Slot name="Center">
  //           <HeaderPart
  //             onAddNew={handleAddNew}
  //             onUploadFile={handleUploadFile}
  //             onDownloadTemplate={onDownloadTemplate}
  //             searchCondition={searchCondition}
  //             setCondition={setCondition}
  //           />
  //         </PageHeaderLayout.Slot>
  //       </PageHeaderLayout>
  //     </AdminContentLayout.Slot>
  //     <AdminContentLayout.Slot name="Content">
  //       <GridViewOne
  //         ref={gridRef}
  //         toolbarItems={[]}
  //         dataSource={[]} // cars
  //         columns={columns}
  //         fetchData={fetchData}
  //         onSelectionChanged={handleSelectionChanged}
  //         autoFetchData={true}
  //         allowSelection={false}
  //         isLoading={false}
  //         customToolbarItems={[]}
  //         editMode={true}
  //         editingOptions={{
  //           mode: "row",
  //         }}
  //         onSaving={handleSavingRow}
  //         onPageChanged={(number) => onRefetch(number ?? 0)}
  //         onEditorPreparing={handleEditorPreparing}
  //         onRowDeleteBtnClick={handleDelete}
  //         onDeleteMultiBtnClick={handleDeleteMulti}
  //         keyExpr="PortCode"
  //         storeKey="Mst_Port"
  //       />
  //     </AdminContentLayout.Slot>
  //   </AdminContentLayout>
  // );
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
                  <SearchForm
                    data={searchCondition.current}
                    onSearch={handleSearch}
                  />
                </div>
              }
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            {/* <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={loadingControl.visible}
              showIndicator={true}
              showPane={true} 
             /> */}

            <GridViewOne
              ref={gridRef}
              dataSource={[]} // cars
              columns={columns}
              fetchData={fetchData}
              onSelectionChanged={handleSelectionChanged}
              autoFetchData={false}
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
              keyExpr={["ModelCode"]}
              storeKey={"Mst_CarModelStd"}
            />
            <Mst_CarModelStd_PopupView
              onEdit={handleEdit}
              formSettings={formSettings}
              gridRef={gridRef}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
