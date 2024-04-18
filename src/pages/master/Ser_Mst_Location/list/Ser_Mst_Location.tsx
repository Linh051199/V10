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
  Search_Ser_Mst_Location,
  Ser_Mst_Location,
} from "@/packages/types/master/Ser_Mst_Location";
import { HeaderPart, PopupViewComponent } from "../components";
import { selectedItemsAtom } from "../components/ser-mst-location";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { Ser_Inv_Stock } from "@/packages/types/master/Ser_Inv_Stock";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

export const Ser_Mst_LocationPage = () => {
  const { t } = useI18n("Ser_Mst_Location");
  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom);
  const { isHQ } = usePermissions();
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const api = useClientgateApi();
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom); // get atom searchPanelVisiableAtom từ atom
  const windowSize = useWindowSize();
  let searchCondition: any = useRef<Partial<Search_Ser_Mst_Location>>({
    LocationID: "",
    LocationCode: "",
    LocationName: "",
    LocationType: "",
    IsActive: "",
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
      text: t("Active"),
    },
    {
      value: "0",
      text: t("Inactive"),
    },
  ];

  const { data: listStockNo }: { data: Ser_Inv_Stock | any } = useQuery(
    ["GetAllActiveStockNo_Ser_Mst_Location"],
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

  const columns = useColumn({ data: [] ?? [], listStockNo });

  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const resp = await api.Ser_Mst_Location_SearchHQ({
          LocationID: searchCondition.current.LocationID ?? "",
          LocationCode: searchCondition.current.LocationCode ?? "",
          LocationName: searchCondition.current.LocationName ?? "",
          LocationType: searchCondition.current.LocationType ?? "",
          IsActive: searchCondition.current.IsActive ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return resp;
      })
      .with(false, async () => {
        const resp = await api.Ser_Mst_Location_SearchDL({
          LocationID: searchCondition.current.LocationID ?? "",
          LocationCode: searchCondition.current.LocationCode ?? "",
          LocationName: searchCondition.current.LocationName ?? "",
          LocationType: searchCondition.current.LocationType ?? "",
          IsActive: searchCondition.current.IsActive ?? "",
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
    const data: Ser_Mst_Location = e?.row?.key;
    await onDelete(data);
  };

  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: t("Ser_Mst_Location_Information"),
    className: "dealer-information-popup",
    height: "auto",
    width: "700",
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
    // {
    //   caption: t("LocationID"),
    //   dataField: "LocationID",
    //   editorType: "dxTextBox",
    //   visible: true,
    //   editorOptions: {
    //     placeholder: t("Input"),
    //   },
    // },
    {
      caption: t("LocationName"),
      dataField: "LocationName",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("LocationCode"),
      dataField: "LocationCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },

    // {
    //   caption: t("LocationType"),
    //   dataField: "LocationType",
    //   editorType: "dxTextBox",
    //   visible: true,
    //   editorOptions: {
    //     placeholder: t("Input"),
    //   },
    // },
    // {
    //   caption: t("IsActive"),
    //   dataField: "IsActive",
    //   editorType: "dxSelectBox",
    //   visible: true,
    //   editorOptions: {
    //     dataSource: listIsActive ?? [],
    //     displayExpr: "text",
    //     valueExpr: "value",
    //     placeholder: t("Input"),
    //   },
    // },
  ];
  // chia cột cho giao diện
  const formSettings = useFormSettings({
    columns,
  });

  // hàm cập nhật
  const onModify = async (key: any, data: Partial<Ser_Mst_Location>) => {
    // debugger;
    const dataSource = gridRef.current.getDxInstance().option("dataSource"); // get all data sources

    const findObj = dataSource.find(
      (obj: Ser_Mst_Location) => obj.LocationID === key.LocationID
    ); // find object to update

    const modifyObj = {
      ...findObj,
      ...data,
    }; // update object

    const response: any = await api.Ser_Mst_Location_Update({
      LocationID: `${modifyObj.LocationID}`,
      LocationName: `${modifyObj.LocationName}`,
      LocationType: `${modifyObj.LocationType}`,
      LocationSurface: `${modifyObj.LocationSurface}`,
      LocationHight: `${modifyObj.LocationHight}`,
      LocationCode: `${modifyObj.LocationCode}`,
      StockNo: `${modifyObj.StockNo}`,
    });
    if (response.isSuccess) {
      gridRef.current?.getDxInstance()?.cancelEditData();
      gridRef.current?.refetchData();
      toast.success(t("Update successfully!"));
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
  // Section: CRUD operations
  const onCreate = async (data: Ser_Mst_Location & { __KEY__: string }) => {
    const { __KEY__, ...rest } = data;

    const response = await api.Ser_Mst_Location_Create({
      ...data,
      LocationCode: data.LocationCode ?? "",
      LocationName: data.LocationName ?? "",
      LocationType: data.LocationType ?? "",
      LocationHight: data.LocationHight ?? "",
      LocationSurface: data.LocationSurface ?? "",
      StockNo: data.StockNo ?? "",
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

  const onDelete = async (key: Ser_Mst_Location) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const response = await api.Ser_Mst_Location_Delete(key.LocationID);
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

  const handleDeleteRow = async (ids: Ser_Mst_Location[]) => {
    for (let item of ids) {
      const response = await api.Ser_Mst_Location_Delete(item.LocationID);
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
    if (["LocationCode"].includes(e.dataField!)) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };
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
                    storeKey="Ser_Mst_Location_Search"
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
                  toolbarItems={
                    [
                      // {
                      //   location: "before",
                      //   widget: "dxButton",
                      //   options: {
                      //     visible: checkPermision(""), // BTN_QUANTRI_BTN_QUANTRI_QLTAIKHOANNGANHANG_CREATE_SEARCH
                      //     icon: "search",
                      //     onClick: handleToggleSearchPanel,
                      //   },
                      // },
                    ]
                  }
                  dataSource={[]} // cars
                  columns={columns}
                  fetchData={fetchData}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSelectionChanged={handleSelectionChanged}
                  keyExpr={["LocationID"]}
                  autoFetchData={false}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={[]}
                  storeKey={"ser-mst-location-management-columns"}
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
