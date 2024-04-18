import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { selectedItemsAtom } from "../components/store";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useEffect, useRef } from "react";
import { DataGrid, DateRangeBox, LoadPanel } from "devextreme-react";
import {
  SearchSer_Inv_PartPriceParam,
  Ser_Inv_PartPrice,
} from "@/packages/types/master/Ser_Inv_PartPrice";
import { FlagActiveEnum } from "@/packages/types";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { toast } from "react-toastify";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { IItemProps } from "devextreme-react/form";
import { useColumns } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-setting";
import { IPopupOptions } from "devextreme-react/popup";
import { HeaderPart } from "../components/header-part";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Ser_Inv_PartPrice_PopupView } from "../components/use-popup-view";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { usePermissions } from "@/packages/contexts/permission";

export const Ser_Inv_PartPricePage = () => {
  const { t } = useI18n("Ser_Inv_PartPrice");
  const { isHQ, DealerCode } = usePermissions();

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);

  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<SearchSer_Inv_PartPriceParam>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    KeyWord: "",

    MaPhuTung: "",
    TenPhuTung: "",
    BatDauHieuLucFrom: "",
    BatDauHieuLucTo: "",
    BatDauHieuLucFromTo: [validateTimeStartDayOfMonth, new Date()],
  });

  useEffect(() => {
    if (DealerCode === "HTC") {
      toast.warn(
        t(
          "You are signed in with your HTC account, please log out and log in with your Dealer account!"
        ),
        { autoClose: 5000 }
      );
    }
  }, []);

  //======================CallAPI==========================================
  const fetchData = async () => {
    // const resp: any = await api.Mst_Dealer_Search({
    //   ...searchCondition,
    //   Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
    //   Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    // });

    // return resp;

    return {
      DataList: [
        {
          MaPhuTung: "test",
          TenPhuTungTVHTV: "test",
          TenPhuTungTV: "test",
          TenPhuTungTA: "test",
          DonViDatHang: "test",
          DonViTinh: "test",
          VAT: "test",
          GiaHieuLucHienTai: "test",
          NgayHieuLucGiaMoi: "test",
          NgayHTVSuaChuaGanNhat: "test",
          NguoiSua: "test",
          MaNhomVatTu: "test",
          MaPhanNhomVatTu: "test",
          TenNhomVatTu: "test",
          TenPhanNhomVatTu: "test",
          SLDatHangToiThieu: "test",
          GiaBaoHanh: "test",
          GhiChu: "test",
        },
      ],
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
      BatDauHieuLucFrom: data?.BatDauHieuLucFromTo[0],
      BatDauHieuLucTo: data?.BatDauHieuLucFromTo[1],
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
    const data = e?.row?.key;

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

  const onModify = async (id: string, data: Ser_Inv_PartPrice) => {
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
  const onCreate = async (data: Ser_Inv_PartPrice & { __KEY__: string }) => {
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
  const searchConditions: IItemProps[] = [
    {
      caption: t("MaPhuTung"),
      dataField: "MaPhuTung",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "TenPhuTung",
      caption: t("TenPhuTung"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: "BatDauHieuLucFromTo",
      dataField: "BatDauHieuLucFromTo",
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              width={"100%"}
              className="dateRange "
              displayFormat="yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={
                searchCondition.current?.BatDauHieuLucFromTo[0] ?? ""
              }
              defaultEndDate={
                searchCondition.current?.BatDauHieuLucFromTo[1] ?? ""
              }
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.instance().updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
  ];
  //==========================searchConditions-end================================================

  const columns = useColumns({});

  const formSettings = useFormSettings({
    columns,
  });

  const popupSettings: IPopupOptions = {
    showTitle: true,
    height: "500px",
    width: "1100px",
    title: t("Dealer Information"),
    className: "dealer-information-popup",
    toolbarItems: [
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Save"),
          stylingMode: "contained",
          type: "default",
          onClick: handleSubmit,
        },
      },
      {
        toolbar: "bottom",
        location: "after",
        widget: "dxButton",
        options: {
          text: t("Cancel"),
          type: "default",
          stylingMode: "contained",
          onClick: handleCancel,
        },
      },
    ],
  };
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
        <ContentSearchPanelLayout searchPermissionCode="BTN_QUANTRI_BTN_QUANTRI_QLDAILY_CREATE_SEARCH">
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <PermissionContainer
              permission={"BTN_QUANTRI_BTN_QUANTRI_QLDAILY_CREATE_SEARCH"}
              children={
                <div className={"w-[300px]"}>
                  <SearchPanelV2
                    conditionFields={searchConditions}
                    data={searchCondition}
                    onSearch={handleSearch}
                    storeKey={"Ser_Inv_PartPrice-search-panel"}
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
                    mode: "popup",
                    form: formSettings,
                    popup: popupSettings,
                  }}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"MaPhuTung"}
                  storeKey={"Ser_Inv_PartPrice"}
                />
                <Ser_Inv_PartPrice_PopupView
                  onEdit={handleEdit}
                  formSettings={formSettings}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
