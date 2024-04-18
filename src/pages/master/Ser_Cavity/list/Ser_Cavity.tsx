import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { usePermissions } from "@/packages/contexts/permission";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { FlagActiveEnum } from "@/packages/types";
import {
  Search_Ser_Cavity_Param,
  Ser_Cavity,
} from "@/packages/types/master/Ser_Cavity";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";
import { useClientgateApi } from "@packages/api";
import { useConfiguration, useVisibilityControl } from "@packages/hooks";
import { showErrorAtom } from "@packages/store";
import { SearchPanelV2 } from "@packages/ui/search-panel";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { selectedItemsAtom } from "../components/dealer-store";
import { DealerPopupView } from "../components/edit-popup";
import { HeaderPart } from "../components/header-part";
import PopupCreateSerCavity from "../components/popupCreate/PopupCreate";
import PopupUpdateSerCavity from "../components/popupUpdate/PopupUpdate";
import { useGridColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-settings";
import { SerCavity_PopupView } from "../components/use-popup-view";
import "./dealer-management.scss";

export const Ser_CavityPage = () => {
  const { t } = useI18n("Ser_Cavity");
  const { t: common } = useI18n("Common");

  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const windowSize = useWindowSize();
  const { isHTV } = usePermissions();
  const showError = useSetAtom(showErrorAtom);

  const updateConditionRef = useRef({
    CavityID: "",
  });

  const searchCondition = useRef<Partial<Search_Ser_Cavity_Param>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    CavityNo: "",
    CavityName: "",
    CavityType: "",
    IsActive: "",
    Status: "",
  });

  let gridViewOneRef: any = useRef(null);
  const gridUpdateFormRef = useRef<any>(null);
  const gridCreateFormRef = useRef<any>(null);

  const setSelectedItems = useSetAtom(selectedItemsAtom);

  const api = useClientgateApi();

  const { data, isLoading, refetch } = useQuery(
    ["Ser_Cavity", JSON.stringify(searchCondition)],
    () =>
      api.Ser_Cavity_GetCavityStatusHQ({
        ...searchCondition.current,
      })
  );

  const columns = useGridColumns({ data: data?.DataList ?? [] });

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };

  const handleAddNew = () => {
    gridCreateFormRef.current.clear();
    gridCreateFormRef.current.show();
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
  };

  // const handleDeleteItem = (rowIndex: number) => {
  //   console.log(rowIndex);
  // };

  const handleSubmit = () => {
    gridRef.current?.getDxInstance()?.saveEditData();
  };

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    // use this function to control how the editor looks like
    // if (e.row?.isNewRow) {
    //   e.editorOptions.readOnly = !e.row?.isNewRow;
    // }
    // if (["CavityType"].includes(e.dataField!)) {
    //   if (e.row?.isNewRow) {
    //     e.editorOptions.defaulValue = "";
    //   }
    // }
    // if (["DealerCode", "DealerType", "ProvinceCode"].includes(e.dataField!)) {
    //   e.editorOptions.readOnly = !e.row?.isNewRow;
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
    title: t("Ser_Cavity Information"),
    className: "dealer-information-popup",
    toolbarItems: [
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: common("Save"),
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
          text: common("Cancel"),
          type: "default",
          stylingMode: "contained",
          onClick: handleCancel,
        },
      },
    ],
  };

  const formSettings = useFormSettings({
    columns,
  });

  const onModify = async (id: string, data: Ser_Cavity) => {};

  // Section: CRUD operations
  const onCreate = async (data: Ser_Cavity) => {};

  const onDelete = async (data) => {
    console.log(data);
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Ser_Cavity_Delete({ ...data, IsActive: 0 });
        if (respone.isSuccess) {
          toast.success(t("Delete successfully!"));
          await refetch();
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
      title: common("Confirm"),
      contentConfirm: common("Do you want to delete?"),
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

  const { data: getCavityType } = useQuery(
    ["getCavityType"],
    api.Mst_Compartment_GetAllActive
  );

  const flagFilterOptions = {
    searchEnabled: true,
    valueExpr: "value",
    displayExpr: "text",
    items: [
      {
        value: "",
        text: t("All"),
      },
      {
        value: "1",
        text: t("1"),
      },
      {
        value: "2",
        text: t("0"),
      },
    ],
  };

  const searchConditions: IItemProps[] = [
    {
      caption: t("CavityType"),
      dataField: "CavityType",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        dataSource: getCavityType?.DataList,
        displayExpr: "CompartmentName",
        valueExpr: "CompartmentCode",
        showClearButton: true,
      },
    },
    {
      dataField: "CavityNo",
      caption: t("CavityNo"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "CavityName",
      caption: t("CavityName"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "Status",
      caption: t("Status"),
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: flagFilterOptions,
    },
  ];
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const handleDeleteRow = async (ids: string[]) => {
    // loadingControl.open();
    // const respone = await api.Ser_Cavity_DeleteMultiple(ids);
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

  const fetchData = async () => {
    const resp = await match(isHTV)
      .with(true, async () => {
        const response = await api.Ser_Cavity_SearchHQ({
          IsActive: FlagActiveEnum.Active,
          Status: searchCondition.current.Status,
          CavityName: searchCondition.current.CavityName,
          CavityNo: searchCondition.current.CavityNo,
          CavityType: searchCondition.current.CavityType,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_Cavity_SearchDL({
          IsActive: FlagActiveEnum.Active,
          Status: searchCondition.current.Status,
          CavityName: searchCondition.current.CavityName,
          CavityNo: searchCondition.current.CavityNo,
          CavityType: searchCondition.current.CavityType,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });

        return response;
      });
    if (resp?.isSuccess) {
      // resp.DataList = resp.DataList?.sort((a, b) => {
      //   const dateA = new Date(a.CreatedDate);
      //   const dateB = new Date(b.CreatedDate);

      //   return dateB - dateA;
      // });

      // resp.PageSize = 5000;
      console.log("resp", resp);

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

  const handleDelete = async (e: any) => {
    await onDelete(e.row.data);
  };

  const handleDeleteMulti = async () => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current
          ?.getDxInstance()
          ?.getSelectedRowKeys();

        await handleDeleteRow(listChecked);
      },
      title: common("Confirm"),
      contentConfirm: common("Do you want to delete?"),
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
                    data={searchCondition.current}
                    onSearch={handleSearch}
                    storeKey={"Ser_Cavity-search-panel"}
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
                  isHiddenCheckBox
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
                  keyExpr={"CavityNo"}
                  storeKey={"Ser_Cavity"}
                  onEditingStart={(e) => {
                    updateConditionRef.current = e.data;
                    gridUpdateFormRef.current.show();
                  }}
                  // defaultPageSize={5000}
                />
                <SerCavity_PopupView
                  onEdit={handleEdit}
                  formSettings={formSettings}
                />
                <PopupCreateSerCavity
                  orderListRef={gridRef}
                  ref={gridCreateFormRef}
                  visible={false}
                  onCancel={handleCancel}
                  gridViewOneRef={gridViewOneRef}
                  onRefetch={handleRefetch}
                />
                <PopupUpdateSerCavity
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
            <DealerPopupView onEdit={handleEdit} formSettings={formSettings} />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
