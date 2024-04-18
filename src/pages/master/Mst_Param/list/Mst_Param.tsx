import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { usePermissions } from "@/packages/contexts/permission";
import { Mst_Param } from "@/packages/types/master/Mst_Param";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { normalGridSelectionKeysAtom } from "@/packages/ui/base-gridview/store/normal-grid-store";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useClientgateApi } from "@packages/api";
import { ProvinceDto } from "@packages/api/clientgate/Mst_ProvinceApi";
import { useConfiguration } from "@packages/hooks";
import { logger } from "@packages/logger";
import { showErrorAtom } from "@packages/store";
import { ColumnOptions } from "@packages/ui/base-gridview";
import { DataGrid } from "devextreme-react";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { match } from "ts-pattern";
import { keywordAtom, selectedItemsAtom } from "../components/screen-atom";
import "./MstParam.scss";

export const Mst_ParamPage = () => {
  const { t } = useI18n("Mst_Param");
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
    ParamType: "",
  });
  const { isHQ } = usePermissions();

  const fetchData = async () => {
    const resp = await api.Mst_Param_SearchHQ({
      ParamType: searchCondition.current.ParamType,
      DealerCode: "VS058",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    const list = resp.DataList?.filter((item: Mst_Param) => {
      return item.ParamType == "DKSC" || item.ParamType == "TOPQ";
    });

    return {
      ...resp,
      ItemCount: list?.length,
      DataList: list,
    };
  };

  useEffect(() => {
    setSelectionKeysAtom([]);
    onRefetch();
  }, []);

  const onCreate = async (data: Partial<Mst_Param>) => {
    logger.debug("onCreate", data);
    const respone = await api.Mst_Param_Create({
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

  const onUpdate = async (data: Partial<Mst_Param>) => {
    const lst = gridRef.current.getData();

    const result = lst.map((item: any) => {
      if (item.ParamCode == data.ParamCode) {
        item.ParamValue = data.ParamValue;
      }

      return item;
    });

    const param = {
      Lst_Mst_Param: result,
    };

    const respone = await api.Mst_Param_Save(param);
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

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {};

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
    const respone = await api.Mst_Param_DeleteMultiple(list);
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
    const respone = await api.Mst_Param_ImportExcel(file);
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
    const respone = await api.Mst_Param_ExportTemplate();
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
          const respone = await api.Mst_Param_Delete(data);
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
    searchCondition.current.GroupRName = keyword;
    gridRef?.current?.refetchData();
  };

  const columns: ColumnOptions[] = [
    {
      dataField: "ParamCode",
      caption: t("ParamCode"),
      editorType: "dxTextBox",
      width: 200,

      visible: true,
      editorOptions: {
        readOnly: true,
      },
    },
    {
      dataField: "ParamValue",
      caption: t("ParamValue"),
      editorType: "dxTextArea",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
        height: 300,
        inputAttr: {
          rows: 5,
        },
      },
      cellRender: ({ data }) => {
        return (
          <div
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {data.ParamValue}
          </div>
        );
      },
    },
  ];

  const handleExportExcel = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Mst_Param_ExportExcel_HQ({
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
        const response = await api.Mst_Param_ExportExcel_DL({
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
      toast.success(t("Download successfully!"));
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

  const methods = useForm();

  const {
    register,
    reset,
    unregister,
    watch,
    control,
    setValue,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      ParamType: "DKSC",
    },
  });

  const dataSource = [
    {
      type: "DKSC",
      value: "Điều khoản sửa chữa",
    },
  ];

  return (
    <FormProvider {...methods}>
      <AdminContentLayout className={"province-management Mst_Param"}>
        <AdminContentLayout.Slot name={"Header"}>
          <div className="flex flex-col py-[10px] ">
            <div className="font-semibold ml-[10px]">{t("Mst_Param")}</div>
          </div>
        </AdminContentLayout.Slot>
        <AdminContentLayout.Slot name={"Content"}>
          <div className="flex flex-col relative mt-[20px] border-[1px] p-[5px] mx-[5px] pt-[20px] border-[#bebebe]">
            <div className="text-[14px] font-semibold absolute left-[20px] top-[-10px] z-20 bg-white px-[1px]">
              {t("Type")}
            </div>

            <div className="flex items-center gap-[10px]">
              <div className="w-[400px] p-[10px]">
                <Controller
                  name={"ParamType"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectBoxField
                        field={field}
                        label={t("ParamType")}
                        dataSource={dataSource}
                        valueExpr="type"
                        displayExpr="value"
                        disabled
                      />
                    );
                  }}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-start">
                  Ghi chú:{" "}
                  <div className="flex flex-col ml-[10px]">
                    <div> - DKSC: Điều khoản sửa chữa trên báo giá</div>
                    <div> - TOPQ: Điều khoản trên báo giá phụ tùng</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
              allowDeleting: false,
            }}
            isHiddenCheckBox
            onSaving={handleSavingRow}
            onPageChanged={(number) => onRefetch(number ?? 0)}
            onEditorPreparing={handleEditorPreparing}
            onRowDeleteBtnClick={handleDelete}
            // onDeleteMultiBtnClick={handleDeleteMulti}
            keyExpr="ParamCode"
            storeKey={"Mst_Param-management-columns"}
            isHidenHeaderFilter
          />
        </AdminContentLayout.Slot>
      </AdminContentLayout>
    </FormProvider>
  );
};
