import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { FlagActiveEnum } from "@/packages/types";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { DataGrid, LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "../components/header-part";
import { selectedItemsAtom, viewingDataAtom } from "../components/store";
import { useColumns } from "../components/use-columns";
import { CheckboxField } from "@/packages/components/checkbox-field";
import TabComponent from "./tab";

export const QuanLyNhacBaoDuongPage = () => {
  const { t } = useI18n("QuanLyNhacBaoDuong");
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const setViewingItem = useSetAtom(viewingDataAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<any>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    KeyWord: "",
    DauMuc: "",
    Model: "",
  });

  //======================CallAPI==========================================
  const fetchData = async () => {
    const data = {
      TenKhach: "Test",
      DienThoai: "Test",
      DiDong: "Test",
      Email: "Test",
      NgayVaoXuong: "Test",
      BienSo: "Test",
      NguoilienLac: "Test",
      ĐiaChiNguoiLienLac: "Test",
      EmailNguoiLienLac: "Test",
      DiDongNguoiLienLac: "Test",
      DienThoaiNguoiLienLac: "Test",
      HieuXe: "Test",
      Model: "Test",
      ChuGiai: "Test",
      NgayLienHe: "Test",
      TinhTrang: "Test",
      SokmGanNhat: "Test",
      NgayBDKhuyenNghị: "Test",
      NgayHen: "Test",
      GhiChú: "Test",
    };

    return {
      DataList: [data],
      // PageCount: length / pageSize,
      PageCount: 1,
      ItemCount: length,
      PageSize: 99999,
    };
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

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...searchCondition.current,
      ...data,
    };

    await onRefetchData();
  };

  const handleSelectionChanged = (rowKeys: any) => {
    console.log("rowKeys?.selectedRowsData ", rowKeys?.selectedRowsData);
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
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

  const onModify = async (id: string, data: any) => {
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
  const onCreate = async (data: any & { __KEY__: string }) => {
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
  // ToChuc, BienSo, SoVin, TinhTrang, DuLieuLichSu

  const searchConditions: IItemProps[] = [
    {
      caption: t("TenKH"),
      dataField: "TenKH",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("BienSo"),
      dataField: "BienSo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("SoVin"),
      dataField: "SoVin",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("KhuyenNghiBD"),
      dataField: "KhuyenNghiBD",
      editorType: "dxDateRangeBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("TinhTrang"),
      dataField: "TinhTrang",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <>
            <CheckboxField
              dataField="ChuaLienHe"
              defaultValue={false}
              onValueChanged={() => {}}
              formInstance={formComponent}
              label="Chưa liên hệ"
            />
            <br />
            <CheckboxField
              dataField="DaLienHeChoPhanHoi"
              defaultValue={false}
              onValueChanged={() => {}}
              formInstance={formComponent}
              label="Đã liên hệ"
            />
            <br />
            <CheckboxField
              dataField="KhongLienHe"
              defaultValue={false}
              onValueChanged={() => {}}
              formInstance={formComponent}
              label="Không liên hệ"
            />
          </>
        );
      },
    },
    {
      caption: t("DuLieuLichSu"),
      dataField: "DuLieuLichSu",
      editorType: "dxCheckBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];

  const columns = useColumns({});

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
                    storeKey={"QuanLyNhacBaoDuong-search-panel"}
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
                  customHeight={"auto"}
                  fetchData={fetchData}
                  onSelectionChanged={handleSelectionChanged}
                  autoFetchData={true}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={[]}
                  // onRowClick={handleRowClick}
                  editMode={false}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"MaHangBaoHiem"}
                  storeKey={"QuanLyNhacBaoDuong"}
                />
                <TabComponent />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
