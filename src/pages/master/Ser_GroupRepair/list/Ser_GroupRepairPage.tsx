import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { usePermissions } from "@/packages/contexts/permission";
import { Ser_GroupRepair } from "@/packages/types/master/Ser_GroupRepair";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { normalGridSelectionKeysAtom } from "@/packages/ui/base-gridview/store/normal-grid-store";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { PageHeaderLayout } from "@layouts/page-header-layout";
import { useClientgateApi } from "@packages/api";
import { ProvinceDto } from "@packages/api/clientgate/Mst_ProvinceApi";
import { requiredType } from "@packages/common/Validation_Rules";
import { useConfiguration } from "@packages/hooks";
import { logger } from "@packages/logger";
import { showErrorAtom } from "@packages/store";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";

export const Ser_GroupRepairPage = () => {
  const { t } = useI18n("Ser_GroupRepair");

  const { t: common } = useI18n("Common");

  const api = useClientgateApi();
  const config = useConfiguration();
  let gridRef: any = useRef<DataGrid | null>(null);
  const keyword = useAtomValue(keywordAtom);
  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
  const [isProcessing, setProcessing] = useState(false);
  const searchCondition = useRef<any>({
    GroupRName: "",
    GroupRID: "",
    DealerCode: "",
    IsActive: "",
    GroupRNo: "",
  });
  const { isHTV } = usePermissions();

  const fetchData = async () => {
    const resp = await api.Ser_GroupRepair_SearchDL({
      GroupRID: searchCondition.current.GroupRID,
      DealerCode: searchCondition.current.DealerCode,
      GroupRNo: searchCondition.current.GroupRNo,
      GroupRName: searchCondition.current.GroupRName,
      IsActive: searchCondition.current.IsActive,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (resp?.isSuccess) {
      resp.DataList = resp.DataList?.sort((a, b) => {
        const dateA = new Date(a.LogLUDateTime);
        const dateB = new Date(b.LogLUDateTime);
        return dateB.getTime() - dateA.getTime();
      });

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

    return resp;
  };

  useEffect(() => {
    setSelectionKeysAtom([]);
    onRefetch();
  }, []);

  const onCreate = async (data: Partial<Ser_GroupRepair>) => {
    const respone = await api.Ser_GroupRepair_Create({
      ...data,
      IsActive: 1,
    });

    if (respone.isSuccess) {
      toast.success(common("Create successfully!"));
      gridRef?.current?.getDxInstance().cancelEditData();
      await onRefetch();
      return true;
    } else {
      console.log(respone);
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

  const onUpdate = async (data: Partial<Ser_GroupRepair>) => {
    const respone = await api.Ser_GroupRepair_Update(data);
    if (respone.isSuccess) {
      toast.success(common("Update successfully!"));
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
    if (["GroupRNo"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
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
        const key = e.changes[0].key;

        const l = e.component.getVisibleRows();

        const c = e.changes[0].data!;

        const f = l?.find((item: any) => item.key == key);

        const d = f?.data;

        const updData = { ...d, ...c };

        e.promise = onUpdate(updData);
      }
    }
    e.cancel = true;
  };

  const handleUploadFile = async (
    file: File,
    progressCallback?: Function,
    onCLose?: Function
  ) => {
    const respone = await api.Ser_GroupRepair_ImportExcel(file);
    if (respone.isSuccess) {
      toast.success(common("Upload successfully!"));
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
    const respone = await api.Ser_GroupRepair_ExportTemplate();
    if (respone.isSuccess) {
      toast.success(common("Download successfully!"));
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
          const respone = await api.Ser_GroupRepair_Delete(data);
          if (respone.isSuccess) {
            toast.success(common("Delete successfully"));
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
        title: common("Confirm"),
        contentConfirm: common("Do you want to delete?"),
      });
    }
  };

  const setCondition = (keyword: string) => {
    searchCondition.current.GroupRName = keyword;
    searchCondition.current.GroupRNo = keyword;
    gridRef?.current?.refetchData();
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "GroupRNo",
      caption: t("GroupRNo"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [requiredType],
    },
    {
      dataField: "GroupRName",
      caption: t("GroupRName"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [requiredType],
    },
    {
      dataField: "Note",
      caption: t("Note"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
    },
  ];

  const handleExportExcel = async () => {
    const resp = await match(isHTV)
      .with(true, async () => {
        const response = await api.Ser_GroupRepair_ExportExcel_HQ({
          GroupRID: searchCondition.current.GroupRID,
          DealerCode: searchCondition.current.DealerCode,
          GroupRNo: searchCondition.current.GroupRNo,
          GroupRName: searchCondition.current.GroupRName,
          IsActive: searchCondition.current.IsActive,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_GroupRepair_ExportExcel_DL({
          GroupRID: searchCondition.current.GroupRID,
          DealerCode: searchCondition.current.DealerCode,
          GroupRNo: searchCondition.current.GroupRNo,
          GroupRName: searchCondition.current.GroupRName,
          IsActive: searchCondition.current.IsActive,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      });
    if (resp?.isSuccess) {
      toast.success(common("Download successfully!"));
      window.location.href = resp.Data;
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

  return (
    <AdminContentLayout className={"province-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name={"Before"}>
            <div className="page-title">{t("Ser_GroupRepairManagement")}</div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name={"Center"}>
            <HeaderPart
              onAddNew={handleAddNew}
              onUploadFile={handleUploadFile}
              onDownloadTemplate={handleDownloadTemplate}
              onExportExcel={handleExportExcel}
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
          // onDeleteMultiBtnClick={handleDeleteMulti}
          keyExpr="GroupRID"
          storeKey={"Ser_GroupRepair-management-columns"}
          isHiddenCheckBox
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
