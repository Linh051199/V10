import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { showErrorAtom } from "@/packages/store";
import { Ser_MST_ROMaintanceSetting_Params } from "@/packages/types/master/Ser_MST_ROMaintanceSetting";
import { CustomHeaderTitle } from "@/packages/ui/HeaderTitle/CustomHeaderTitle";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { DataGrid } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "../components/header-part";
export const Ser_MST_ROMaintanceSettingPage = () => {
  const { t } = useI18n("Ser_MST_ROMaintanceSetting");

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const api = useClientgateApi();
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<Ser_MST_ROMaintanceSetting_Params>>({
    ROMSID: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    Km: null,
  });
  const fixedPointFormatLabel = { "aria-label": "Fixed Poing Format" };
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

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...searchCondition.current,
      ...data,
    };

    await onRefetchData();
  };
  //==========================searchConditions-end================================================
  const columns: any = [
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
      dataField: "Km",
      caption: t("Km"),
      editorType: "dxNumberBox",
      width: 200,
      visible: true,
      // format: "#,##0.00",
      // inputAttr: { fixedPointFormatLabel },
      editorOptions: {
        // placeholder: t("Input"),
        // readOnly: true,
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Maintances",
      caption: t("Maintances"),
      editorType: "dxNumberBox",
      alignment: "right",
      width: 200,
      visible: true,
      editorOptions: {
        readOnly: false,
        max: 1000000000,
        min: 0,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
  ];
  // const columns = useDealerGridColumns({ data: data?.DataList ?? [] });
  const showError = useSetAtom(showErrorAtom);
  const onModify = async (
    id: string,
    data: any,
    dataList: any,
    type: string
  ) => {
    console.log(id, data);
    const typeToast = type === "update" ? "Update" : "Create";
    const rowData = dataList.find((item: any) => {
      return item.ROMSID === id;
    });
    const respone = await api.Ser_MST_ROMaintanceSetting_Save(id, {
      ...rowData,
      ...data,
    });
    if (respone.isSuccess) {
      toast.success(t(`${typeToast} Successfully`));
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
    // throw new Error(respone._strErrCode);
    // toast.warning("Chưa có api nhé!");
  };
  // Section: CRUD operations
  const onDelete = async (id: string) => {
    // ConfirmComponent({
    //   asyncFunction: async () => {
    //     const respone = await api.Mst_Dealer_Delete(id);
    //     if (respone.isSuccess) {
    //       toast.success(t("Delete successfully!"));
    //       await refetch();
    //       return true;
    //     }
    //     showError({
    //       message: t(respone._strErrCode),
    //       _strErrCode: respone._strErrCode,
    //       _strTId: respone._strTId,
    //       _strAppTId: respone._strAppTId,
    //       _objTTime: respone._objTTime,
    //       _strType: respone._strType,
    //       _dicDebug: respone._dicDebug,
    //       _dicExcs: respone._dicExcs,
    //     });
    //     throw new Error(respone._strErrCode);
    //   },
    //   title: t("Confirm"),
    //   contentConfirm: t("Do you want to delete?"),
    // });
    toast.warning("Chưa có api nhé!");
  };

  const handleSavingRow = (e: any) => {
    // stop grid behaviour
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
        // } else if (type === "insert") {
        //   const data = e.changes[0].data!;
        //   e.promise = onCreate(data);
      } else if (type === "update" || type === "insert") {
        const dataList = e.component.getDataSource()._items;
        e.promise = onModify(
          e.changes[0].key,
          e.changes[0].data!,
          dataList,
          type
        );
      }
    }
    e.cancel = true;
  };

  const fetchData = async () => {
    const resp: any = await api.Ser_MST_ROMaintanceSetting_Search({
      ...searchCondition.current,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    return resp;
  };

  const setCondition = (keyword: string) => {
    searchCondition.current.Km = keyword;
    gridRef?.current?.refetchData();
  };

  const handleExportExcel = async () => {
    const response = await api.Ser_MST_ROMaintanceSetting_ExportHQ({
      ...searchCondition.current,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    // setIsProcessing(false);
    if (response.isSuccess) {
      toast.success(t("ExportExcelSuccess"));
      window.location.href = response.Data!;
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

  return (
    <div className="page-header-customs">
      <AdminContentLayout className={"province-management"}>
        <AdminContentLayout.Slot name={"Header"}>
          <PageHeaderLayout>
            <PageHeaderLayout.Slot name={"Before"}>
              <CustomHeaderTitle
                displayName="Ser_MST_ROMaintanceSetting"
                isSearch={false}
              />
            </PageHeaderLayout.Slot>
            <PageHeaderLayout.Slot name={"Center"}>
              <HeaderPart
                onAddNew={handleAddNew}
                searchCondition={searchCondition}
                setCondition={setCondition}
                onExportExcel={handleExportExcel}
                handleRefetch={function (): void {
                  gridRef.current.refetchData();
                }}
              />
            </PageHeaderLayout.Slot>
            <PageHeaderLayout.Slot name="Before"></PageHeaderLayout.Slot>
          </PageHeaderLayout>
        </AdminContentLayout.Slot>
        <AdminContentLayout.Slot name={"Content"}>
          <GridViewOne
            ref={gridRef}
            dataSource={[]} // cars
            columns={columns}
            fetchData={fetchData}
            // onSelectionChanged={handleSelectionChanged}
            autoFetchData={true}
            allowSelection={false}
            isLoading={false}
            customToolbarItems={[]}
            editMode={true}
            isHiddenCheckBox={true}
            editingOptions={{
              mode: "row",
              allowDeleting: false,
            }}
            onSaving={handleSavingRow}

            // onPageChanged={(number) => onRefetch(number ?? 0)}
            // onEditorPreparing={handleEditorPreparing}
            // onRowDeleteBtnClick={handleDelete}
            // onDeleteMultiBtnClick={handleDeleteMulti}
            keyExpr="Km"
            storeKey={"Ser-mst-ro-maintance-setting-management-columns"}
          />
        </AdminContentLayout.Slot>
      </AdminContentLayout>
    </div>
  );
};
