import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum } from "@/packages/types";
import {
  Search_Ser_Engineer_Param,
  Ser_Engineer,
} from "@/packages/types/master/Ser_Engineer";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "../components/header-part";
import PopupCreateSerEngineer from "../components/popupCreate/PopupCreate";
import PopupUpdateSerEngineer from "../components/popupUpdate/PopupUpdate";
import { selectedItemsAtom } from "../components/store";
import { useColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-setting";
import { SerEngineer_PopupView } from "../components/use-popup-view";

export const Ser_EngineerPage = () => {
  const { t } = useI18n("Ser_Engineer");
  const { t: p } = useI18n("Placeholder");

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const updateConditionRef = useRef({
    EngineerNo: "",
  });

  let gridViewOneRef: any = useRef(null);
  const gridUpdateFormRef = useRef<any>(null);
  const gridCreateFormRef = useRef<any>(null);

  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  const api = useClientgateApi();

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<Search_Ser_Engineer_Param>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    EngineerID: "",
    GroupRID: "",
    EngineerNo: "",
    EngineerName: "",
    IsEngineer: "",
    IsActive: "",
    DealerCode: "",
    Status: "",
  });

  const { data: getSerGroupRepair } = useQuery(
    ["getSerGroupRepair_ser_engineer"],
    async () => {
      const resp: any = await api.Ser_GroupRepair_GetAllActive();

      resp.DataList = resp.DataList?.sort((a, b) => {
        const dateA = new Date(a.LogLUDateTime);
        const dateB = new Date(b.LogLUDateTime);
        return dateB.getTime() - dateA.getTime();
      });

      return resp?.DataList?.flat() ?? [];
    }
  );

  console.log(getSerGroupRepair);

  const { data: getMstStaff } = useQuery(["getMstStaff"], async () => {
    const resp: any = await api.Mst_Staff_Search({
      FlagActive: FlagActiveEnum.Active,
    });

    return resp?.DataList ?? [];
  });

  //======================CallAPI==========================================
  const fetchData = async () => {
    const resp: any = await api.Ser_Engineer_GetByStatusDL({
      EngineerID: searchCondition.current.EngineerID,
      GroupRID: searchCondition.current.GroupRID,
      EngineerNo: searchCondition.current.EngineerNo,
      EngineerName: searchCondition.current.EngineerName,
      IsEngineer: searchCondition.current.IsEngineer,
      IsActive: "1",
      Status: searchCondition.current.Status,
      DealerCode: searchCondition.current.DealerCode,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    resp.DataList = resp.DataList?.sort((a, b) => {
      const dateA = new Date(a.LogLUDateTime);
      const dateB = new Date(b.LogLUDateTime);
      return dateB.getTime() - dateA.getTime();
    });

    if (resp?.isSuccess) {
      return resp;
    } else {
      showError({
        message: t(resp._strErrCode),
        _strErrCode: resp._strErrCode,
        _strTId: resp._strTId,
        _strAppTId: resp._strAppTId,
        _objTTime: resp._objTTime,
        _strType: resp._strType,
        _dicDebug: resp._dicDebug,
        _dicExcs: resp._dicExcs,
      });
    }
  };
  //======================CallAPI-end==========================================

  //==========================handle================================================
  const handleAddNew = () => {
    gridCreateFormRef.current.clear();
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

  const onModify = async (id: string, data: Ser_Engineer) => {
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
  const onCreate = async (data: Ser_Engineer & { __KEY__: string }) => {
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
        const deleteData = {
          Ser_Engineer: {
            ...data,
            IsActive: "0",
          },
        };

        const respone = await api.Ser_Engineer_Update(deleteData);
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

  //==========================handle-end================================================

  //==========================searchConditions================================================

  const statusDataSource = [
    {
      label: t("All"),
      value: "",
    },
    {
      label: t("1"),
      value: "1",
    },
    {
      label: t("2"),
      value: "2",
    },
  ];

  const searchConditions: IItemProps[] = [
    {
      caption: t("ToKyThuat"),
      dataField: "GroupRID",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dataSource: getSerGroupRepair,
        placeholder: p("Select"),
        valueExpr: "GroupRID",
        displayExpr: "GroupRName",
        showClearButton: true,
      },
    },

    {
      caption: t("MaNhanVien"),
      dataField: "EngineerNo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("TenNhanVien"),
      dataField: "EngineerName",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("LoaiNhanVien"),
      dataField: "IsEngineer",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        placeholder: p("Select"),
        dataSource: getMstStaff,
        valueExpr: "StaffCode",
        displayExpr: "StaffName",
        showClearButton: true,
      },
    },
    {
      caption: t("TinhTrang"),
      dataField: "Status",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        placeholder: p("Select"),
        dataSource: statusDataSource,
        displayExpr: "label",
        valueExpr: "value",
        showClearButton: true,
      },
    },
  ];
  //==========================searchConditions-end================================================

  const columns = useColumns({
    showPopup: (value: any) => {
      updateConditionRef.current = value;
      gridUpdateFormRef.current.show();
    },
  });

  const formSettings = useFormSettings({
    columns,
  });

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
                    data={searchCondition.current}
                    onSearch={handleSearch}
                    storeKey={"Ser_Engineer-search-panel"}
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
                    mode: "row",
                  }}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"EngineerID"}
                  storeKey={"Ser_Engineer"}
                  onEditingStart={(e) => {
                    updateConditionRef.current = e.data;
                    gridUpdateFormRef.current.show();
                  }}
                />
                <SerEngineer_PopupView
                  onEdit={handleEdit}
                  formSettings={formSettings}
                />
                <PopupCreateSerEngineer
                  orderListRef={gridRef}
                  ref={gridCreateFormRef}
                  visible={false}
                  onCancel={handleCancel}
                  gridViewOneRef={gridViewOneRef}
                  onRefetch={handleRefetch}
                />
                <PopupUpdateSerEngineer
                  orderListRef={gridRef}
                  ref={gridUpdateFormRef}
                  visible={false}
                  onCancel={handleCancel}
                  gridViewOneRef={gridViewOneRef}
                  onRefetch={handleRefetch}
                  code={updateConditionRef}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
