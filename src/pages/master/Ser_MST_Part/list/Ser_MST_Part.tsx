import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useRef, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { useI18n } from "@/i18n/useI18n";
import { useSetAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { useConfiguration, useVisibilityControl } from "@packages/hooks";
import { IPopupOptions } from "devextreme-react/popup";
import { IFormOptions, IItemProps } from "devextreme-react/form";
import { toast } from "react-toastify";
import { showErrorAtom } from "@packages/store";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import {
  ContentSearchPanelLayout,
  searchPanelVisibleAtom,
} from "@layouts/content-searchpanel-layout";

import { DataGrid, LoadPanel } from "devextreme-react";
import { useColumn } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-settings";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import PermissionContainer, {
  checkPermision,
} from "@/components/PermissionContainer";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import {
  Search_Ser_MST_Part,
  Ser_MST_Part,
} from "@/packages/types/master/Ser_MST_Part";
import { HeaderPart, PopupViewComponent } from "../components";
import { selectedItemsAtom } from "../components/ser-mst-part";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { Ser_Inv_Stock } from "@/packages/types/master/Ser_Inv_Stock";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Ser_MST_PartGroup } from "@/packages/types/master/Ser_MST_PartGroup";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";

export const Ser_MST_PartPage = () => {
  const { t } = useI18n("Ser_MST_Part");
  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom);
  const { isHQ } = usePermissions();
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const api = useClientgateApi();
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom); // get atom searchPanelVisiableAtom từ atom
  const windowSize = useWindowSize();
  let searchCondition: any = useRef<Partial<Search_Ser_MST_Part>>({
    PartID: "",
    DealerCode: "",
    PartCode: "",
    EngName: "",
    VieName: "",
    CusTypeID: "",
    FreqUsed: "",
    IsActive: "",
    PartGroupID: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const listIsActive = [
    {
      value: "",
      text: t("All"),
    },
    {
      value: "1",
      text: t("1 - Active"),
    },
    {
      value: "0",
      text: t("0 - Inactive"),
    },
  ];
  const listFreqUsed = [
    {
      value: "",
      text: t("All"),
    },
    {
      value: "1",
      text: t("1 - Used"),
    },
    {
      value: "0",
      text: t("0 - NotUsed"),
    },
  ];
  const { data: listStockNo }: { data: Ser_Inv_Stock | any } = useQuery(
    ["GetAllActiveStockNo_Ser_MST_Part"],
    async () => {
      const resp = await api.Ser_Inv_Stock_GetAllActive();
      if (resp.isSuccess) {
        return resp.DataList;
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
    }
  );
  const { data: listPartTypeID } = useQuery(
    ["GetAllActivePartTypeID_listPartTypeID"],
    async () => {
      const resp = await api.Ser_MST_PartType_SearchDL({
        PartTypeID: "",
        TypeName: "",
        IsActive: "1",
      } as any);
      if (resp.isSuccess) {
        return [
          {
            PartTypeID: "",
            TypeName: "All",
          },
          ...(resp.DataList as any[]),
        ];
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
    }
  );
  const { data: listPartGroupID }: { data: Ser_MST_PartGroup | any } = useQuery(
    ["GetAllActivePartGroupID_Ser_MST_PartGroup"],
    async () => {
      const resp = await api.Ser_MST_PartGroup_GetAllActive();
      if (resp.isSuccess) {
        return [
          {
            PartGroupID: "",
            GroupCode: "All",
            GroupName: "Tất cả",
          },
          ...(resp.DataList as Ser_MST_PartGroup[]),
        ];
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
    }
  );
  // const columns = useColumnField({});
  const columns = useColumn({
    data: [] ?? [],
    listPartTypeID,
    listPartGroupID,
  });
  // .filter((item) => item.dataField !== "VAT");

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const resp = await api.Ser_MST_Part_SearchHQ({
          PartID: searchCondition.current.PartID ?? "",
          DealerCode: searchCondition.current.DealerCode ?? "",
          PartCode: searchCondition.current.PartCode ?? "",
          EngName: searchCondition.current.EngName ?? "",
          VieName: searchCondition.current.VieName ?? "",
          CusTypeID: searchCondition.current.CusTypeID ?? "",
          FreqUsed: searchCondition.current.FreqUsed ?? "",
          IsActive: searchCondition.current.IsActive ?? "",
          PartGroupID: searchCondition.current.PartGroupID ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return resp;
      })
      .with(false, async () => {
        const resp = await api.Ser_MST_Part_SearchDL({
          PartID: searchCondition.current.PartID ?? "",
          DealerCode: searchCondition.current.DealerCode ?? "",
          PartCode: searchCondition.current.PartCode ?? "",
          EngName: searchCondition.current.EngName ?? "",
          VieName: searchCondition.current.VieName ?? "",
          CusTypeID: searchCondition.current.CusTypeID ?? "",
          FreqUsed: searchCondition.current.FreqUsed ?? "",
          IsActive: searchCondition.current.IsActive ?? "",
          PartGroupID: searchCondition.current.PartGroupID ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return resp;
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
  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...searchCondition.current,
      ...data,
    };
    gridRef?.current?.refetchData();
  };
  const handleRefetch = () => {
    gridRef?.current?.refetchData();
  };

  const handleToggleSearchPanel = () => {
    setSearchPanelVisibility((visible) => !visible);
  };

  const handleSelectionChanged = (rows: any) => {
    setSelectedItems(rows?.selectedRowKeys ?? []);
  };

  const handleAddNew = () => {
    gridRef?.current?.addRow();
  };

  const handleCancel = () => {
    gridRef.current?.getDxInstance()?.cancelEditData();
  };

  const handleEdit = (rowIndex: number) => {
    gridRef.current?.getDxInstance()?.editRow(rowIndex);
  };

  const handleSubmit = () => {
    gridRef.current?.getDxInstance()?.saveEditData();
  };

  const handleDelete = async (e: any) => {
    const data: Ser_MST_Part = e?.row?.key;
    await onDelete(data);
  };

  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: t("Ser_MST_Part_Information"),
    className: "dealer-information-popup",
    height: "auto",
    width: windowSize.width - 400,
    toolbarItems: [
      {
        toolbar: "bottom", // 'bottom' | 'top';
        location: "after", // 'after' | 'before' | 'center';
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
          stylingMode: "contained",
          text: t("Cancel"),
          type: "default",
          onClick: handleCancel,
        },
      },
    ],
  };

  const formItems: IItemProps[] = [
    {
      caption: t("PartCode"), // Mã phụ tùng
      dataField: "PartCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("VieName"), // Tên phụ tùng
      dataField: "VieName",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("PartGroupID"), // Loại phụ tùng
      dataField: "PartGroupID",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        dropDownOptions: { resizeEnabled: true },
        showClearButton: true,
        searchEnabled: true,
        dataSource: listPartGroupID ?? [],
        displayExpr: (e: any) => {
          let displayExpr =
            `${e?.PartGroupID} - ${e?.GroupCode} - ${e?.GroupName}`.trim();
          if (e?.PartGroupID === "") {
            displayExpr = displayExpr.substring(1).trim();
          } else if (e?.PartGroupID === undefined) {
            displayExpr = "All";
          }
          return displayExpr;
        },
        valueExpr: "PartGroupID",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      caption: t("IsActive"), // Trạng thái
      dataField: "IsActive",
      editorType: "dxSelectBox",
      visible: true,
      editorOptions: {
        searchEnabled: true,
        dataSource: listIsActive ?? [],
        displayExpr: "text",
        valueExpr: "value",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },

    {
      caption: t("FreqUsed"), // Tình trạng sử dụng
      dataField: "FreqUsed",
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        dataSource: listFreqUsed ?? [],
        displayExpr: "text",
        valueExpr: "value",
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
  ];
  // chia cột cho giao diện
  const formSettings = useFormSettings({
    columns,
  });

  // hàm cập nhật
  const onModify = async (key: any, data: Partial<Ser_MST_Part>) => {
    const dataSource = gridRef.current.getDxInstance().option("dataSource"); // get all data sources

    const findObj = dataSource.find(
      (obj: Ser_MST_Part) => obj.PartID === key.PartID
    ); // find object to update

    const modifyObj = {
      ...findObj,
      ...data,
      Quantity: data.Quantity ?? "0",
      MinQuantity: data.MinQuantity ?? "0",
      FreqUsed: data.FreqUsed ? "1" : "0",
    }; // update object

    const response: any = await api.Ser_MST_Part_Update({
      ...modifyObj,
    });
    if (response.isSuccess) {
      gridRef.current?.getDxInstance()?.cancelEditData();
      gridRef.current?.refetchData();
      toast.success(t("Update successfully!"));
      return true;
    }
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
  };
  // Section: CRUD operations
  const onCreate = async (data: Ser_MST_Part & { __KEY__: string }) => {
    const { __KEY__, ...rest } = data;

    const response = await api.Ser_MST_Part_Create({
      PartGroupID: `${data.PartGroupID}` ?? "",
      PartTypeID: `${data.PartTypeID}` ?? "",
      // PartGroupID: `${data.PartGroupID}` ?? "",
      // PartTypeID: `${data.PartTypeID}` ?? "",
      PartCode: data.PartCode ?? "",
      EngName: data.EngName ?? "",
      VieName: data.VieName ?? "",
      Note: data.Note ?? "", //
      Unit: data.Unit ?? "",
      Location: data.Location ?? "",
      VAT: `${data.VAT}` ?? "",
      // VAT: `${data.VAT}` ?? "",
      Quantity: `${data.Quantity ?? "0"}`, //
      MinQuantity: `${data.MinQuantity ?? "0"}`, //
      Cost: `${data.Cost}` ?? "",
      Price: `${data.Price}` ?? "",
      // Cost: `${data.Cost}` ?? "",
      // Price: `${data.Price}` ?? "",
      Model: data.Model ?? "",
      FreqUsed: data.FreqUsed ? "1" : "0",
    } as any);
    if (response.isSuccess) {
      gridRef.current?.getDxInstance()?.cancelEditData();
      handleRefetch();
      toast.success(t("Create successfully!"));
      // await refetch();
      return true;
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

  const onDelete = async (key: Ser_MST_Part) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const response = await api.Ser_MST_Part_Delete(key.PartID);
        if (response.isSuccess) {
          toast.success(t("Delete successfully!"));
          gridRef.current?.refetchData();
          return true;
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
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };

  const handleDeleteRow = async (ids: Ser_MST_Part[]) => {
    for (let item of ids) {
      const response = await api.Ser_MST_Part_Delete(item.PartID);
      if (response.isSuccess) {
        toast.success(t("Delete successfully!"));
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
      // NGĂN KHÔNG CHO CHỈNH SỬA KHI CÓ 1 ĐIỀU KIỆN NÀO ĐÓ
      // } else if (type === "update" && e.row.data.FlagActive !== "0") {
      //   e.promise = onModify(e.changes[0].key, e.changes[0].data!);
      // }
    }
    e.cancel = true;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (
      [
        "PartCode",
        "PartTypeID",
        "PartGroupID",
        "Price",
        "MinQuantity",
      ].includes(e.dataField!)
    ) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }

    if (
      ["VAT", "Unit"].includes(e.dataField!) &&
      e.row?.data?.FlagInTST === "1"
    ) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }

    if (
      ["MinQuantity", "PartTypeID", "PartGroupID"].includes(e.dataField!) &&
      e.row?.data?.FlagInTST === "0"
    ) {
      e.editorOptions.readOnly = false;
    }

    if (["FreqUsed"].includes(e.dataField!)) {
      // e.editorOptions.value = e.row?.data.FreqUsed ? true : false;
      e.editorOptions.value = e.row?.data.FreqUsed === "1" ? true : false;
    }
  };
  const handleActive = (e: any) => {
    toast.info("Chưa Có API");
  };
  const toolbarItems: GridCustomToolBarItem[] = [
    {
      permissionCode: "BTN_BH_QLYEUCAUDONGTHUNG_IN", // P.Quyen
      text: t(`Active/InActive`),
      onClick: (e: any, ref: any) => {
        if (ref) {
          handleActive(ref?.current.instance.getSelectedRowsData());
        }
      },

      shouldShow: (ref: any) => {
        let check = false;
        if (ref) {
          if (ref?.current?.instance?.getSelectedRowsData().length === 1) {
            check = true;
          }
          return check;
        } else {
          return check;
        }
      },
    },
  ];

  return (
    <AdminContentLayout className={"dealer-management"}>
      <AdminContentLayout.Slot name={"Header"}>
        <HeaderPart
          handleRefetch={handleRefetch}
          onAddNew={handleAddNew}
          searchCondition={searchCondition.current}
        ></HeaderPart>
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name={"Content"}>
        <ContentSearchPanelLayout searchPermissionCode="">
          {" "}
          {/* // BTN_QUANTRI_BTN_QUANTRI_QLTAIKHOANNGANHANG_CREATE_SEARCH{" "} */}
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <PermissionContainer
              permission={""} // BTN_QUANTRI_BTN_QUANTRI_QLTAIKHOANNGANHANG_CREATE_SEARCH
              children={
                <div className={"w-[300px]"}>
                  <SearchPanelV2
                    conditionFields={formItems}
                    storeKey="Ser_MST_Part_Search"
                    data={searchCondition.current}
                    onSearch={handleSearch}
                  />

                  <div className="parent"></div>
                  <div className="parent"></div>
                  <div className="parent children"></div>
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
                  toolbarItems={[]}
                  dataSource={[]} // cars
                  columns={columns}
                  fetchData={fetchData}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSelectionChanged={handleSelectionChanged}
                  keyExpr={["PartID"]}
                  autoFetchData={false}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={toolbarItems}
                  storeKey={"ser-mst-part-management-columns"}
                  customHeight={windowSize.height - 120}
                  editMode={true}
                  // inlineEditMode="batch"
                  editingOptions={{
                    mode: "popup",
                    form: formSettings,
                    popup: popupSettings,
                  }}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  allowMultiRowDelete={false} // ẩn multi del
                  // onDeleteMultiBtnClick={handleDeleteMulti}
                  // onDeleteRows={handleDelete}
                />

                {/* chỉ có tác dụng xem view detail thôi KHÔNG CÓ TÁC DỤNG HIỆN FORM EDIT HAY ADD  */}
                <PopupViewComponent
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
