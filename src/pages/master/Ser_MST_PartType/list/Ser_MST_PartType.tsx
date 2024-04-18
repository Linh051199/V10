import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, SearchParam } from "@/packages/types";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "../components/header-part";
import { requiredType } from "@/packages/common/Validation_Rules";
import { normalGridSelectionKeysAtom } from "@/packages/ui/base-gridview/store/normal-grid-store";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { selectedItemsAtom } from "../components/Ser_MST_PartType";
import { Ser_MST_PartType } from "@/packages/types/master/Ser_MST_PartType";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

export const Ser_MST_PartTypePage = () => {
  const { t } = useI18n("Ser_MST_PartType");
  const config = useConfiguration();
  let gridRef: any = useRef<DataGrid | null>(null);
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const { isHQ } = usePermissions();
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const searchCondition = useRef<any>({
    keyword: "",
    TypeName: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        dataField: "TypeName",
        caption: t("TypeName"),
        editorType: "dxTextBox",
        visible: true,
        validationRules: [requiredType],
        allowFiltering: true,
      },
    ],
    []
  );

  const setCondition = (keyword: string) => {
    searchCondition.current.keyword = keyword;
    searchCondition.current.TypeName = keyword;
    gridRef?.current?.refetchData();
  };

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        return await api.Ser_MST_PartType_SearchHQ({
          KeyWord: searchCondition?.current?.keyword,
          FlagActive: FlagActiveEnum.All,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        } as SearchParam);
      })
      .with(false, async () => {
        return await api.Ser_MST_PartType_SearchDL({
          KeyWord: searchCondition?.current?.keyword,
          FlagActive: FlagActiveEnum.All,
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        } as SearchParam);
      })
      .otherwise(() => null);

    if (resp?.isSuccess) {
      return resp;
    } else {
      showError({
        message: t(resp!._strErrCode),
        _strErrCode: resp!._strErrCode,
        _strTId: resp!._strTId,
        _strAppTId: resp!._strAppTId,
        _objTTime: resp!._objTTime,
        _strType: resp!._strType,
        _dicDebug: resp!._dicDebug,
        _dicExcs: resp!._dicExcs,
      });
    }
  };

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData(number);
  };
  useEffect(() => {
    setSelectionKeysAtom([]);
    onRefetch();
  }, []);

  const handleAddNew = () => {
    gridRef?.current?.addRow();
  };

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };
  const onRefetch = async (number?: number) => {
    gridRef?.current?.refetchData(number);
  };

  const onCreate = async (data: Partial<Ser_MST_PartType>) => {
    const respone = await api.Ser_MST_PartType_Create(data);
    if (respone.isSuccess) {
      toast.success(t("Created Successfully"));
      gridRef?.current?.getDxInstance().cancelEditData();
      gridRef?.current?.refetchData();
      return true;
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

  const onUpdate = async (key: string, data: Partial<Ser_MST_PartType>) => {
    const respone = await api.Ser_MST_PartType_Update(key, data);
    if (respone.isSuccess) {
      toast.success(t("Update successfully!"));
      gridRef?.current?.getDxInstance().cancelEditData();
      gridRef?.current?.refetchData();
      return true;
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

  const onDelete = async (key: string) => {};

  const handleDelete = async (e: any) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Ser_MST_PartType_Delete(e.row.key);
        if (respone.isSuccess) {
          toast.success(t("Delete successfully!"));
          gridRef?.current?.refetchData();
          return true;
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
      contentConfirm: t("Do you want to save ?"),
    });
  };

  const handleDeleteRow = async (ids: Ser_MST_PartType[]) => {
    for (let item of ids) {
      const respone = await api.Ser_MST_PartType_Delete(item.PartTypeID);
      if (respone.isSuccess) {
        toast.success(t("Delete successfully!"));
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
    }
  };

  const handleDeleteMulti = async () => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current
          ?.getDxInstance()
          ?.getSelectedRowKeys();

        await handleDeleteRow(listChecked);
        gridRef.current?.refetchData();
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete ?"),
    });
  };

  const handleUploadFile = async (
    file: File,
    progressCallback?: Function,
    onCLose?: Function
  ) => {
    const respone = await api.Ser_MST_PartType_ImportExcel(file);
    if (respone.isSuccess) {
      toast.success(t("Upload Successfully"));
      return true;
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

  const onDownloadTemplate = async () => {
    const respone = await api.Ser_MST_PartType_ExportTemplate();
    if (respone.isSuccess) {
      toast.success(t("Download Successfully"));
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

  const handleSavingRow = async (e: any) => {
    const { type } = e.changes[0];
    if (type === "remove") {
      const key = e.changes[0].key;
      e.Promise = onDelete(key);
    } else if (type === "insert") {
      const data = {
        ...e.changes[0].data,
      };
      e.Promise = onCreate(data);
    } else if (type === "update") {
      const data = e.changes[0].data;
      const key = e.changes[0].key;
      e.Promise = onUpdate(key, data);
    }
    e.cancel = true;
  };
  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {};

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">{t("Ser_MST_PartType")}</div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center">
            <HeaderPart
              setCondition={setCondition}
              searchCondition={searchCondition}
            />
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <GridViewOne
          ref={gridRef}
          toolbarItems={[]}
          // editMode={true} // Mst 1
          editMode={false}
          dataSource={[]} // cars
          columns={columns}
          fetchData={fetchData}
          onSelectionChanged={handleSelectionChanged}
          customHeight={windowSize.height - 120}
          autoFetchData={true}
          isHiddenCheckBox={true}
          allowSelection={false}
          isLoading={false}
          customToolbarItems={[]}
          editingOptions={{
            mode: "row",
          }}
          onSaving={handleSavingRow}
          onPageChanged={(number) => onRefetchData(number ?? 0)}
          onEditorPreparing={handleEditorPreparing}
          onRowDeleteBtnClick={handleDelete}
          allowMultiRowDelete={false} // ẩn multi del
          // onDeleteMultiBtnClick={handleDeleteMulti}
          keyExpr="PartTypeID"
          storeKey="Ser_MST_PartType"
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
