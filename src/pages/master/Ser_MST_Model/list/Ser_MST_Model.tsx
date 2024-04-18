import { AdminContentLayout } from "@layouts/admin-content-layout";
import { useRef, useState } from "react";
import { useClientgateApi } from "@packages/api";
import { useI18n } from "@/i18n/useI18n";
import { useAtomValue, useSetAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { useConfiguration, useVisibilityControl } from "@packages/hooks";
import { IPopupOptions } from "devextreme-react/popup";
import { IFormOptions, IItemProps } from "devextreme-react/form";
import { toast } from "react-toastify";
import { showErrorAtom } from "@packages/store";
import { EditorPreparingEvent, InitNewRowEvent } from "devextreme/ui/data_grid";
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
  Search_Ser_MST_Model,
  Ser_MST_Model,
} from "@/packages/types/master/Ser_MST_Model";
import { HeaderPart, PopupViewComponent } from "../components";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { selectedItemsAtom } from "../components/ser-mst-model";
import FormAddNew from "../components/form-add-new";
import { useColumnDetail } from "../components/use-column-detail";
import { useFormSettingDetail } from "../components/use-form-setting-detail";
import { Mst_CarModelStd } from "@/packages/types/master/Mst_CarModelStd";
import { Ser_Mst_TradeMark } from "@/packages/types/master/Ser_Mst_TradeMark";
import DataSource from "devextreme/data/data_source";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

export const Ser_MST_ModelPage = () => {
  const { t } = useI18n("Ser_MST_Model");
  let gridRef: any = useRef<DataGrid | null>(null);
  const config = useConfiguration();
  const showError = useSetAtom(showErrorAtom);

  const { isHQ } = usePermissions();
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const api = useClientgateApi();
  const setSearchPanelVisibility = useSetAtom(searchPanelVisibleAtom); // get atom searchPanelVisiableAtom từ atom
  const formAddNewRef = useRef<any>();
  const windowSize = useWindowSize();
  let searchCondition: any = useRef<Partial<Search_Ser_MST_Model>>({
    TradeMarkCode: "",
    ModelName: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
  });

  const { data: listModelCode } = useQuery(
    ["GetListModelCode_Ser_MST_Model"],
    async () => {
      // const resp = await api.Ser_MST_Model_GetAllActive_Mst_CarModelStd();
      const resp = await api.Ser_MST_Model_Search_MstCarModelStd();
      if (resp?.isSuccess) {
        // return resp.DataList as Mst_CarModelStd[];
        return [
          ...(resp.DataList as Mst_CarModelStd[]),
          {
            ModelCode: "OTHER",
            ModelName: "OTHER",
            // ModelName: "OTHER",
          },
        ];
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
    }
  );

  // const listModelCode = new DataSource({
  //   key: "ModelCode",
  //   load: async (loadOptions) => {
  //     const response = await api.Ser_MST_Model_Search_MstCarModelStd();
  //     return [
  //       ...(response.DataList as Mst_CarModelStd[]),
  //       {
  //         ModelCode: "OTHER",
  //         ModelName: "OTHER",
  //       },
  //     ];
  //   },
  //   byKey: async (loadOptions) => {
  //     const response = await api.Ser_MST_Model_Search_MstCarModelStd();

  //     return [
  //       ...(response.DataList as Mst_CarModelStd[]),
  //       {
  //         ModelCode: "OTHER",
  //         ModelName: "OTHER",
  //       },
  //     ];
  //   },
  //   pageSize: 5,
  //   loadMode: "raw",
  //   // cacheRawData: true,
  // });

  const { data: listTradeMarkCode } = useQuery(
    ["GetListTradeMarkCode_Ser_MST_Model"],
    async () => {
      const resp = await api.Ser_MST_Model_GetAllActive_Ser_MstTradeMark(
        isHQ()
      );
      if (resp?.isSuccess) {
        return resp.DataList as Ser_Mst_TradeMark[];
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
    }
  );

  // cấu hình form
  const columns = useColumn({
    data: [] ?? [],
    listModelCode,
    listTradeMarkCode,
  });
  const columnDetail = useColumnDetail({
    data: [] ?? [],
    listModelCode,
    listTradeMarkCode,
  });

  // chia cột cho giao diện
  const formSettings = useFormSettings({
    columns: columnDetail,
  });

  // chia cột cho popup chi tiết
  const formSettingDetail = useFormSettingDetail({
    columns: columnDetail,
  });

  // const fetchData = async () => {
  //   const searchParam = {
  //     ...searchCondition.current,
  //     // Ft_PageIndex: gridRef.current.getDxInstance().pageIndex() ?? 0,
  //     // Ft_PageSize: gridRef.current.getDxInstance().pageSize() ?? 1000,
  //   };
  //   const resp = await match(isHQ())
  //     .with(true, async () => {
  //       return await api.Ser_MST_Model_SearchHQ(searchParam);
  //     })
  //     .with(false, async () => {
  //       return await api.Ser_MST_Model_SearchDL(searchParam);
  //     })
  //     .otherwise(() => null);

  //   if (resp?.isSuccess) {
  //     return resp;
  //   } else {
  //     showError({
  //       message: t(resp!._strErrCode),
  //       _strErrCode: resp!._strErrCode,
  //       _strTId: resp!._strTId,
  //       _strAppTId: resp!._strAppTId,
  //       _objTTime: resp!._objTTime,
  //       _strType: resp!._strType,
  //       _dicDebug: resp!._dicDebug,
  //       _dicExcs: resp!._dicExcs,
  //     });
  //   }
  // };
  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const resp = await api.Ser_MST_Model_SearchHQ({
          TradeMarkCode: searchCondition.current.TradeMarkCode ?? "",
          ModelName: searchCondition.current.ModelName ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return resp;
      })
      .with(false, async () => {
        const resp = await api.Ser_MST_Model_SearchDL({
          TradeMarkCode: searchCondition.current.TradeMarkCode ?? "",
          ModelName: searchCondition.current.ModelName ?? "",
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
    // gridRef?.current?.addRow();
    formAddNewRef.current.openSearchCar();
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
    const data: Ser_MST_Model = e?.row?.key;
    await onDelete(data);
  };

  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: t("Ser_MST_Model_Information"),
    className: "dealer-information-popup",
    width: "740px",
    height: "420px",
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
      caption: t("TradeMarkCode"),
      dataField: "TradeMarkCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("ModelName"),
      dataField: "ModelName",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];

  // hàm cập nhật
  const onModify = async (key: any, data: Partial<Ser_MST_Model>) => {
    toast.info("upd");
    const dataSource = gridRef.current.getDxInstance().option("dataSource"); // get all data sources

    const findObj = dataSource.find(
      (obj: Ser_MST_Model) => obj.ModelID === key.ModelID
    ); // find object to update

    const modifyObj = {
      ...findObj,
      ...data,
    }; // update object

    const response: any = await api.Ser_MST_Model_UpdateDL({
      ...modifyObj,
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
  const onCreate = async (data: Ser_MST_Model & { __KEY__: string }) => {
    const { __KEY__, ...rest } = data;

    const response: any = await api.Ser_MST_Model_CreateDL({
      ...data,
      TradeMarkCode: data.TradeMarkCode ?? "",
      ProductionCode: data.ProductionCode ?? "",
      ModelName: data.ModelName ?? "",
      ModelCode: data.ModelCode ?? "",
    });
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

  const onDelete = async (key: Ser_MST_Model) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const response = await api.Ser_MST_Model_DeleteDL(key.ModelID);
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

  const handleDeleteRow = async (ids: Ser_MST_Model[]) => {
    for (let item of ids) {
      const response = await api.Ser_MST_Model_DeleteDL(item.ModelID);
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
    }
    e.cancel = true;
  };

  const handleEditorPreparing = (e: EditorPreparingEvent) => {
    if (e.dataField === "ModelCode" && !e.row?.isNewRow) {
      e.editorOptions.readOnly = true;
    }
    if (e.dataField === "TradeMarkCode" && !e.row?.isNewRow) {
      e.editorOptions.readOnly = true;
      // const isExist = listTradeMarkCode?.filter(  (item: Ser_Mst_TradeMark) => item.TradeMarkCode.toUpperCase() === e.editorOptions.value.toUpperCase() );
      e.editorOptions.displayExpr = (e_dE: any) => e.editorOptions.value;
    }
  };
  const handleInitNewRow = (e: InitNewRowEvent) => {};

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
                    storeKey="Ser_MST_Model_Search"
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
                  customHeight={windowSize.height - 120}
                  dataSource={[]} // cars
                  columns={columns}
                  fetchData={fetchData}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSelectionChanged={handleSelectionChanged}
                  keyExpr={["ModelID"]}
                  autoFetchData={false}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={[]}
                  storeKey={"ser-mst-model-management-columns"}
                  editMode={true}
                  // inlineEditMode="batch"
                  editingOptions={{
                    mode: "popup",
                    form: formSettings,
                    popup: popupSettings,
                  }}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  onInitNewRow={handleInitNewRow}
                  onRowDeleteBtnClick={handleDelete}
                  allowMultiRowDelete={false} // ẩn multi del
                  // onDeleteMultiBtnClick={handleDeleteMulti}
                  // onDeleteRows={handleDelete}
                />

                {/* chỉ có tác dụng xem view detail thôi KHÔNG CÓ TÁC DỤNG HIỆN FORM EDIT HAY ADD  */}
                <PopupViewComponent
                  onEdit={handleEdit}
                  formSettings={formSettingDetail}
                  // formSettings={formSettings}
                />

                <FormAddNew
                  ref={formAddNewRef}
                  // handleSelect={handleSelect}
                  gridRef={gridRef}
                  visible={false}
                  listModelCode={listModelCode}
                  listTradeMarkCode={listTradeMarkCode}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
