import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import {
  ExcludeSpecialCharactersType,
  RequiredVietNameeseExcludeSpecialCharacters,
  requiredType,
} from "@/packages/common/Validation_Rules";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useConfiguration } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum, Mst_District, SearchParam } from "@/packages/types";
import { ColumnOptions } from "@/packages/ui/base-gridview";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { normalGridSelectionKeysAtom } from "@/packages/ui/base-gridview/store/normal-grid-store";
import { StatusButton } from "@/packages/ui/status-button";
import { useQuery } from "@tanstack/react-query";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { selectedItemsAtom } from "../components/screen-atom";
import { HeaderPart } from "./header-part";

export const Ser_MST_ROWarrantyRenewalCategoryPage = () => {
  const api = useClientgateApi();
  const config = useConfiguration();
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const { t } = useI18n("Ser_MST_ROWarrantyRenewalCategory");
  let gridRef: any = useRef<DataGrid | null>(null);
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
  const showError = useSetAtom(showErrorAtom);

  const { data: listProvince } = useQuery(
    ["listProvince"],
    () => api.Mst_Province_GetAllActive(),
    {}
  );

  const handleAddNew = () => {
    gridRef?.current?.addRow();
  };

  const handleUploadFile = async (
    file: File,
    progressCallback?: Function,
    onCLose?: Function
  ) => {
    const respone = await api.Mst_District_Upload(file);
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

  const onDownloadTemplate = async () => {
    const respone = await api.Mst_District_ExportTemplate();
    if (respone.isSuccess) {
      window.location.href = respone.Data;
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

  const columns: ColumnOptions[] = [
    {
      dataField: "STT",
      caption: t("STT"),
      visible: true,
      editorOptions: {
        readOnly: true,
      },
      width: 100,
      cellRender: ({ rowIndex }: any) => {
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      dataField: "MaHangMuc",
      caption: t("MaHangMuc"),
      editorType: "dxTextBox",
      allowFiltering: true,
      editorOptions: {
        placeholder: t("Input"),
      },
      // validationRules: [requiredType, ExcludeSpecialCharactersType],
    },
    {
      dataField: "TenHangMuc",
      caption: t("TenHangMuc"),
      editorType: "dxSelectBox",
      // validationRules: [requiredType, ExcludeSpecialCharactersType],
      // editorOptions: {
      //   placeholder: t("Select"),
      //   dataSource: listProvince?.DataList ?? [],
      //   displayExpr: "ProvinceCode",
      //   valueExpr: "ProvinceCode",
      // },
    },
    {
      dataField: "TrangThai",
      caption: t("TrangThai"),
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];

  const onDelete = async (key: string) => {
    const respone = await api.Mst_District_Delete(key);
    if (respone.isSuccess) {
      toast.success(t("Delete successfully!"));
      await onRefetch();
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
      throw new Error(respone._strErrCode);
    }
  };
  const onCreate = async (data: Mst_District) => {
    const respone = await api.Mst_District_Create(data);
    if (respone.isSuccess) {
      toast.success(t("Create successfully!"));
      gridRef?.current?.getDxInstance().cancelEditData();
      await onRefetch();
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
      throw new Error(respone._strErrCode);
    }
  };

  const onUpdate = async (key: string, data: Partial<Mst_District>) => {
    const respone = await api.Mst_District_Update(key, data);
    if (respone.isSuccess) {
      toast.success(t("Update successfully!"));
      gridRef?.current?.getDxInstance().cancelEditData();
      await onRefetch();
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
      throw new Error(respone._strErrCode);
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
      console.log(key);
      e.Promise = onUpdate(key, data);
    }
    e.cancel = true;
  };

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "DistrictCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    } else if (e.dataField === "ProvinceCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDeleteRows = async (rows: any) => {
    const list = rows.map((item: any) => {
      return {
        DistrictCode: item.DistrictCode,
        ProvinceCode: item.ProvinceCode,
      };
    });
    const respone = await api.Mst_District_Delete_Multiple(list);
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

  const onRefetch = async (number?: number) => {
    gridRef?.current?.refetchData(number);
  };

  const searchCondition = useRef<any>({
    keyword: "",
  });

  const fetchData = async () => {
    const resp: any = await api.Mst_District_Search({
      KeyWord: searchCondition?.current?.keyword,
      FlagActive: FlagActiveEnum.All,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    } as SearchParam);

    return resp;
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    if (data) {
      ConfirmComponent({
        asyncFunction: async () => {
          const respone = await api.Mst_District_Delete(data);
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
    searchCondition.current.keyword = keyword;
    gridRef?.current?.refetchData();
  };
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <PageHeaderLayout>
          <PageHeaderLayout.Slot name="Before">
            <div className="font-bold dx-font-m">
              {t("Ser_MST_ROWarrantyRenewalCategory")}
            </div>
          </PageHeaderLayout.Slot>
          <PageHeaderLayout.Slot name="Center">
            {/* <HeaderPart
              onAddNew={handleAddNew}
              onUploadFile={handleUploadFile}
              onDownloadTemplate={onDownloadTemplate}
              setCondition={setCondition}
              searchCondition={searchCondition}
            /> */}
          </PageHeaderLayout.Slot>
        </PageHeaderLayout>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
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
          // editMode={true}
          // editingOptions={{
          //   mode: "row",
          // }}
          onSaving={handleSavingRow}
          onPageChanged={(number) => onRefetch(number ?? 0)}
          onEditorPreparing={handleEditorPreparing}
          onRowDeleteBtnClick={handleDelete}
          onDeleteMultiBtnClick={handleDeleteMulti}
          keyExpr={"MaLoaiAnh"}
          storeKey="Ser_MST_ROWarrantyRenewalCategory_manager"
        />
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
