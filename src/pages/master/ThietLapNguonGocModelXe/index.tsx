import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { useCallback, useMemo, useRef } from "react";
import { DataGrid, LoadPanel } from "devextreme-react";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { IItemProps } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { useSetAtom } from "jotai";
import { IPopupOptions } from "devextreme-react/popup";
import { showErrorAtom } from "@/packages/store";
import { toast } from "react-toastify";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { ColumnOptions } from "@/types";
import { GridCustomerToolBarItem } from "@/packages/components/gridview-standard/grid-custom-toolbar";
import { useClientgateApi } from "@/packages/api";
import { useQuery } from "@tanstack/react-query";
import { ConstantLineStyle } from "devextreme-react/chart";
import { Mst_VINModelOrginal_Delete_Multiple_Param } from "@/packages/api/clientgate/master/Mst_VINModelOrginal";
import { BButton } from "@/packages/components/buttons";
import { useDropzone } from "react-dropzone";
import { ImportExcel } from "@/packages/components/import-excel/import-excel";

export const ThietLapNguonGocModelXePagePage = () => {
  const { t } = useI18n("ThietLapNguonGocModelXePage");
  const api = useClientgateApi();
  const searchCondition = useRef({
    KeyWork: "",
    ModelCode: "",
    IsActive: "",
    OrginalCode: "",
  });

  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const showError = useSetAtom(showErrorAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  //======================CallAPI==========================================
  const fetchData = async () => {
    const resp: any = await api.Mst_VINModelOrginal_Search({
      ...searchCondition.current,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    return resp;
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

  const handleSelectionChanged = (rowKeys: any) => {};

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
    if (["MaXacNhan"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    await onDelete(data);
  };

  const handleDeleteRow = async (
    ids: Mst_VINModelOrginal_Delete_Multiple_Param
  ) => {
    // loadingControl.open();
    const respone = await api.Mst_VINModelOrginal_Delete_Multiple(ids);
    loadingControl.close();
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

  const onModify = async (id: any, data: any) => {
    const resp = {
      ...id,
      ...data,
    };

    const respone = await api.Mst_VINModelOrginal_Update(resp);
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
    throw new Error(respone._strErrCode);
    toast.warning("ChÆ°a cÃ³ api nhÃ©!");
  };
  // Section: CRUD operations
  const onCreate = async (data: any & { __KEY__: string }) => {
    console.log("data ", data);

    // const { __KEY__, ...rest } = data;
    const respone = await api.Mst_VINModelOrginal_Create(data);
    if (respone.isSuccess) {
      toast.success(t("Create successfully!"));
      gridRef?.current?.getDxInstance().cancelEditData();
      await handleRefetch();
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
    toast.warning("ChÆ°a cÃ³ api nhÃ©!");
  };

  const onDelete = async (id: any) => {
    console.log("id", id);

    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Mst_VINModelOrginal_Delete(id);
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
    toast.warning("ChÆ°a cÃ³ api nhÃ©!");
  };

  const handleSavingRow = (e: any) => {
    // stop grid behaviour
    if (e.changes && e.changes.length > 0) {
      console.log("e ", e);

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

  const { data: dataVINModelOrginal, isLoading: isLoadingVINModelOrginal } =
    useQuery(
      ["Mst_VINModelOrginal", "Mst_VINModelOrginal_GetAllActive"],
      async () => {
        const resp = await api.Mst_VINModelOrginal_GetAllActive();
        if (resp.isSuccess) {
          return [...(resp.DataList ?? [])];
        }
      },
      {}
    );

  const { data: dataModel, isLoading: isLoadingModel } = useQuery(
    ["Ser_MST_Model", "Ser_MST_Model_GetAllActive_Mst_CarModelStd"],
    async () => {
      const resp = await api.Ser_MST_Model_GetAllActive_Mst_CarModelStd();
      if (resp.isSuccess) {
        return [...(resp.DataList ?? [])];
      }
    },
    {}
  );

  console.log("dataModel ", dataModel);

  const exportExcel = async () => {
    const response = await api.Mst_VINModelOrginal_ExportTemplate();
    if (response.isSuccess) {
      console.log("response ", response);

      window.open(response.Data);
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

  const onDrop = useCallback(async (acceptedFiles: any) => {
    console.log("acceptedFiles ", acceptedFiles);

    const response = await api.Mst_VINModelOrginal_ImportExcel(
      acceptedFiles[0] ?? []
    );
    if (response.isSuccess) {
      toast.success(t("Upload successfully!"));
      // console.log(139, response.Data.Lst_Car_Car)
      await handleRefetch();
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
  }, []);

  //==========================handle-end================================================

  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "STT",
        caption: t("STT"),
        editorType: "dxTextBox",
        visible: true,
        editorOptions: {
          disabled: true,
        },
        cellRender: ({ rowIndex }) => {
          return <>{rowIndex + 1}</>;
        },
      },
      {
        dataField: "VINCode",
        caption: t("VINCode"),
        editorType: "dxTextBox",
        visible: true,
      },
      {
        dataField: "ModelCode",
        caption: t("ModelCode"),
        editorType: "dxSelectBox",
        visible: true,
        editorOptions: {
          dataSource: dataModel ?? [],
          displayExpr: "ModelCode",
          valueExpr: "ModelCode",
        },
      },
      {
        dataField: "OrginalCode",
        caption: t("OrginalCode"),
        editorType: "dxTextBox",
        visible: true,
      },
    ];
  }, [isLoadingVINModelOrginal, isLoadingModel]);
  const toolbarItems: GridCustomerToolBarItem[] = [
    {
      text: t(`ExportTemplate`),
      onClick: (e: any, ref: any) => {
        exportExcel();
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
    {
      text: "ImportExcel",
      onClick: () => {},
      widget: "customize",
      customize: (ref) => {
        return <ImportExcel onDrop={onDrop} />;
      },
      shouldShow: (ref: any) => {
        return true;
      },
    },
  ];

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header"></AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <GridViewOne
          ref={gridRef}
          toolbarItems={[]}
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
          onSaving={handleSavingRow}
          onPageChanged={(number) => {}}
          onEditorPreparing={handleEditorPreparing}
          onRowDeleteBtnClick={handleDelete}
          onDeleteMultiBtnClick={handleDeleteMulti}
          keyExpr={["VINCode", "ModelCode", "OrginalCode"]}
          storeKey={"ThietLapNguonGocModelXe_column"}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
