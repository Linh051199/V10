import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import {
  SearchSer_CustomerGroupParam,
  Ser_CustomerGroup,
} from "@/packages/types/master/Ser_CustomerGroup";
import {
  dataViewAtom,
  isUpdateAtom,
  selectedItemsAtom,
} from "../components/store";
import { showErrorAtom } from "@/packages/store";
import { useSetAtom } from "jotai";
import { MutableRefObject, useEffect, useRef } from "react";
import { DataGrid, LoadPanel } from "devextreme-react";
import { FlagActiveEnum } from "@/packages/types";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { toast } from "react-toastify";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { IItemProps } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import { useColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-setting";
import { HeaderPart } from "../components/header-part";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Ser_CustomerGroup_PopupView } from "../components/use-popup-view";
import { usePermissions } from "@/packages/contexts/permission";
import { match } from "ts-pattern";
import { useClientgateApi } from "@/packages/api";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { PopupAdd } from "../popup-add/popup-add";
import { PopupView } from "../popup-view/popup-view";
import { Alignment, ToolbarItemProps } from "@/types";
import { Link } from "@/packages/components/link/link";
import { BButton } from "@/packages/components/buttons";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const Ser_CustomerGroupPage = () => {
  const { t } = useI18n("Ser_CustomerGroup");
  const { isHQ, DealerCode } = usePermissions();
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showCreateNewPopup = useVisibilityControl({ defaultVisible: false });
  const showViewPopup = useVisibilityControl({ defaultVisible: false });
  const setLoad = useSetAtom(loadPanelAtom);

  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const createNewPopupRef = useRef<any>(null);
  const viewPopupRef = useRef<any>(null);
  const setDataView = useSetAtom(dataViewAtom);
  const setisUpdate = useSetAtom(isUpdateAtom);

  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<SearchSer_CustomerGroupParam>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,

    CustomerGroupNo: "",
    CustomerGroupName: "",
    Address: "",
    IsGetDetail: "True",
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
        const response = await api.Ser_CustomerGroup_SearchHQ({
          CustomerGroupNo: searchCondition.current?.CustomerGroupNo ?? "",
          CustomerGroupName: searchCondition.current?.CustomerGroupName ?? "",
          Address: searchCondition.current?.Address ?? "",
          IsGetDetail: searchCondition.current?.IsGetDetail ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_CustomerGroup_SearchDL({
          CustomerGroupNo: searchCondition.current?.CustomerGroupNo ?? "",
          CustomerGroupName: searchCondition.current?.CustomerGroupName ?? "",
          Address: searchCondition.current?.Address ?? "",
          IsGetDetail: searchCondition.current?.IsGetDetail ?? "",
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
    createNewPopupRef.current.show();
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

  const handleViewDetail = async (data: any) => {
    // setLoad(true);
    const response = await api.Ser_CustomerGroup_GetByCustomerGroupNo({
      CustomerGroupNo: data.GroupNo,
    });

    if (response?.isSuccess) {
      if (response?.Data) {
        // setLoad(false);
        setDataView((prev: any) => {
          return {
            ...prev,
            CustomerGroupInfo: response?.Data?.Lst_Ser_CustomerGroup[0],
            CustomerInfo: response?.Data?.Lst_Ser_CustomerGroupCustomer,
          };
        });
        viewPopupRef?.current.show();
      }
    }
    // setLoad(false);
  };

  const handleEditingStart = (e: any) => {
    setisUpdate(true);
    setDataView((prev: any) => {
      return {
        ...prev,
        CustomerGroupInfo: e?.data,
      };
    });
    createNewPopupRef.current.show();
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
    let check = false;
    let checkSuccess = false;

    for (let item of ids) {
      const respone = await api.Ser_CustomerGroup_Delete({
        GroupNo: item,
      });
      if (respone.isSuccess) {
        checkSuccess = true;
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
      gridRef.current?.refetchData();
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

  const onModify = async (id: string, data: Ser_CustomerGroup) => {
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
  const onCreate = async (data: Ser_CustomerGroup & { __KEY__: string }) => {
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
        const respone = await api.Ser_CustomerGroup_Delete({
          GroupNo: id,
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
  const handleExportExcel = async () => {
    const response = await api.Ser_CustomerGroup_ExportDL({
      CustomerGroupNo: searchCondition.current?.CustomerGroupNo ?? "",
      CustomerGroupName: searchCondition.current?.CustomerGroupName ?? "",
      Address: searchCondition.current?.Address ?? "",
      IsGetDetail: searchCondition.current?.IsGetDetail ?? "",
    });

    if (response?.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = response.Data;
    }
  };

  //==========================handle-end================================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("CustomerGroupNo"),
      dataField: "CustomerGroupNo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "CustomerGroupName",
      caption: t("CustomerGroupName"),
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
  //==========================searchConditions-end================================================

  //=====================Columns===========================================
  const columns: any = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      // alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "GroupNo",
      visible: true,
      caption: t("GroupNo"),
      // alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return (
          <Link
            label={e.value}
            onClick={() => {
              handleViewDetail(e?.data);
            }}
          />
        );
      },
    },
    {
      dataField: "GroupName",
      visible: true,
      caption: t("GroupName"),
      // alignment: "center" as Alignment,
      sortIndex: 0,
      allowFiltering: true,
    },

    {
      dataField: "Address",
      caption: t("Address"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TelePhone",
      caption: t("TelePhone"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Fax",
      caption: t("Fax"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Email",
      caption: t("Email"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TaxCode",
      caption: t("TaxCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Description",
      caption: t("Description"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  //=====================Columns-end===========================================

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
  //==================toolbarItems==============================================
  const subGridToolbars: ToolbarItemProps[] = [
    // {
    //   location: "before",
    //   render: (gridRef: MutableRefObject<DataGrid>) => {
    //     return <BBImportExecl onDrop={onDrop} />;
    //   },
    // },
    {
      location: "before",
      render: (gridRef: MutableRefObject<DataGrid>) => {
        return <BButton label={t("ExportExcel")} onClick={handleExportExcel} />;
      },
    },
    // {
    //   location: "before",
    //   render: (gridRef: MutableRefObject<DataGrid>) => {
    //     return (
    //       <BButton label={t("ExportTemplate")} onClick={handleExportTemplate} />
    //     );
    //   },
    // },
  ];
  //==================toolbarItems-end==============================================
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
                    storeKey={"Ser_CustomerGroup-search-panel"}
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
                  // toolbarItems={subGridToolbars}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={[]}
                  editMode={true}
                  editingOptions={{
                    mode: "row",
                  }}
                  onEditingStart={handleEditingStart}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  customHeight={windowSize.height - 120}
                  onSaving={handleSavingRow}
                  isHiddenCheckBox
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"GroupNo"}
                  storeKey={"Ser_CustomerGroup"}
                />
                <PopupAdd
                  ref={createNewPopupRef}
                  visible={showCreateNewPopup.visible}
                  container={".dx-viewport"}
                  position={"left"}
                  onHidding={() => {
                    showCreateNewPopup.close();
                  }}
                  gridRef={gridRef}
                />
                <PopupView
                  ref={viewPopupRef}
                  visible={showViewPopup.visible}
                  container={".dx-viewport"}
                  position={"left"}
                  onHidding={() => {
                    showViewPopup.close();
                  }}
                  gridRef={gridRef}
                  createNewPopupRef={createNewPopupRef}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
