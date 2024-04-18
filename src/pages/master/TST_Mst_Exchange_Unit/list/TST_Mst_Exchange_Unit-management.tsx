import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { PageHeaderLayout } from "@layouts/page-header-layout";
import { useClientgateApi } from "@packages/api";
import { ProvinceDto } from "@packages/api/clientgate/Mst_ProvinceApi";
import { filterByFlagActive, uniqueFilterByDataField } from "@packages/common";
import {
  ExcludeSpecialCharactersType,
  requiredType,
} from "@packages/common/Validation_Rules";
import { useConfiguration } from "@packages/hooks";
import { logger } from "@packages/logger";
import { showErrorAtom } from "@packages/store";
import { FlagActiveEnum, SearchParam } from "@packages/types";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { StatusButton } from "@packages/ui/status-button";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";
import {
  Search_TST_Mst_Exchange_Unit,
  TST_Mst_Exchange_Unit,
} from "@/packages/types/master/TST_Mst_Exchange_Unit";
import { normalGridSelectionKeysAtom } from "@/packages/ui/base-gridview/store/normal-grid-store";

export const TST_Mst_Exchange_UnitManagementPage = () => {
  const { t } = useI18n("TST_Mst_Exchange_UnitManagement");
  const api = useClientgateApi();
  const config = useConfiguration();
  let gridRef: any = useRef<DataGrid | null>(null);
  const keyword = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
  const [isProcessing, setProcessing] = useState(false);
  const searchCondition = useRef<any>({
    TSTPartCode: "",
  });

  const fetchData = async () => {
    const resp: any = await api.TST_Mst_Exchange_Unit_Search({
      TSTPartCode: searchCondition?.current?.TSTPartCode,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    } as Search_TST_Mst_Exchange_Unit);

    return resp;
  };

  useEffect(() => {
    setSelectionKeysAtom([]);
    onRefetch();
  }, []);

  const onCreate = async (data: Partial<TST_Mst_Exchange_Unit>) => {
    logger.debug("onCreate", data);
    const respone = await api.TST_Mst_Exchange_Unit_Create({
      ...data,
    });
    if (respone.isSuccess) {
      toast.success(t("CreateSuccessfully"));
      gridRef?.current?.getDxInstance().cancelEditData();
      await onRefetch();
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

  const onUpdate = async (
    key: string,
    data: Partial<TST_Mst_Exchange_Unit>
  ) => {
    const respone = await api.TST_Mst_Exchange_Unit_Update(key, data);
    if (respone.isSuccess) {
      toast.success(t("UpdateSuccessfully"));
      gridRef?.current?.getDxInstance().cancelEditData();
      await onRefetch();
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

  const onDelete = async (key: string) => {
    const respone = await api.Mst_Province_Delete(key);
    if (respone.isSuccess) {
      toast.success(t("DeleteSuccessfully"));
      await onRefetch();
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

  const handleAddNew = () => {
    gridRef?.current?.addRow();
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    // if (e.dataField === "ProvinceCode") {
    //   e.editorOptions.readOnly = !e.row?.isNewRow;
    // } else if (e.dataField === "FlagActive") {
    //   if (e.row?.isNewRow) {
    //     e.editorOptions.value = true;
    //   }
    // }
  };

  const handleDeleteRows = async (rows: any[]) => {
    const list = rows.map((item: any) => {
      return {
        TSTPartCode: item.TSTPartCode,
        VieName: item.VieName,
        TSTUnit: item.TSTUnit,
        DMSUnit: item.DMSUnit,
        ExchangeRate: item.ExchangeRate,
      };
    });
    const respone = await api.TST_Mst_Exchange_Unit_DeleteMultiple(list);
    if (respone.isSuccess) {
      toast.success(t("Delete successfully!"));
      setSelectionKeysAtom([]);
      await onRefetch();
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

  const handleSavingRow = async (e: any) => {
    logger.debug("e:", e);
    // stop grid behaviour
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        let newData: ProvinceDto = e.changes[0].data!;
        // if doesn't change flag active. set it as active by default
        if (!Object.keys(newData).includes("FlagActive")) {
          newData = {
            ...newData,
            FlagActive: true,
          };
        }
        e.promise = onCreate(newData);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
    logger.debug("e after:", e);
  };

  const handleUploadFile = async (
    file: File,
    progressCallback?: Function,
    onCLose?: Function
  ) => {
    const respone = await api.TST_Mst_Exchange_Unit_ImportExcel(file);
    if (respone.isSuccess) {
      toast.success(t("Upload Successfully"));
      onCLose?.();
      await onRefetch();
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
  const handleDownloadTemplate = async () => {
    const respone = await api.TST_Mst_Exchange_Unit_ExportTemplate();
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
  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };
  const onRefetch = async (number?: number) => {
    gridRef?.current?.refetchData(number);
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    if (data) {
      ConfirmComponent({
        asyncFunction: async () => {
          const respone = await api.TST_Mst_Exchange_Unit_Delete(data);
          if (respone.isSuccess) {
            toast.success(t("Delete successfully!"));
            gridRef?.current?.refetchData();
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
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to delete?"),
      });
    }
  };
  
  const handleDeleteMulti = async (e: any) => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current?.getSelectedRowsData();
        await handleDeleteRows(listChecked);
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };

  const setCondition = (keyword: string) => {
    searchCondition.current.TSTPartCode = keyword;
    gridRef?.current?.refetchData();
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "TSTPartCode",
      caption: t("TSTPartCode"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      // headerFilter: {
      //   dataSource: uniqueFilterByDataField(data?.DataList, "TenLoaiCongViec"),
      // },
      validationRules: [requiredType],
    },
    {
      dataField: "VieName",
      caption: t("VieName"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      // headerFilter: {
      //   dataSource: uniqueFilterByDataField(data?.DataList, "TenLoaiCongViec"),
      // },
      validationRules: [requiredType],
    },
    {
      dataField: "TSTUnit",
      caption: t("TSTUnit"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      // headerFilter: {
      //   dataSource: uniqueFilterByDataField(data?.DataList, "TenLoaiCongViec"),
      // },
      validationRules: [requiredType],
    },
    {
      dataField: "DMSUnit",
      caption: t("DMSUnit"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      // headerFilter: {
      //   dataSource: uniqueFilterByDataField(data?.DataList, "TenLoaiCongViec"),
      // },
      validationRules: [requiredType],
    },
    {
      dataField: "ExchangeRate",
      caption: t("ExchangeRate"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      // headerFilter: {
      //   dataSource: uniqueFilterByDataField(data?.DataList, "TenLoaiCongViec"),
      // },
      validationRules: [requiredType],
    },
  ];

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name={"Before"}>
            <div className="page-title">
              {t("TST_Mst_Exchange_UnitManagement")}
            </div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name={"Center"}>
            <HeaderPart
              onAddNew={handleAddNew}
              onUploadFile={handleUploadFile}
              onDownloadTemplate={handleDownloadTemplate}
              setCondition={setCondition}
              searchCondition={searchCondition}
            />
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
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
          customToolbarItems={[]}
          editMode={true}
          editingOptions={{
            mode: "row",
          }}
          onSaving={handleSavingRow}
          onPageChanged={(number) => onRefetch(number ?? 0)}
          onEditorPreparing={handleEditorPreparing}
          onRowDeleteBtnClick={handleDelete}
          onDeleteMultiBtnClick={handleDeleteMulti}
          keyExpr="TSTPartCode"
          storeKey={"TST_Mst_Exchange_Unit-management-columns"}
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
