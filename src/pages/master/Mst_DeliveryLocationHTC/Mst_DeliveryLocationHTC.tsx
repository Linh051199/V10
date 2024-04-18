import { useRef } from "react";
import { match } from "ts-pattern";

import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { usePermissions } from "@/packages/contexts/permission";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import {
  Mst_DeliveryLocation,
  SearchMst_DeliveryLocationParam,
} from "@/packages/types/master/Mst_DeliveryLocation";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { StatusButton } from "@/packages/ui/status-button";
import { ColumnOptions } from "@/types";
import { HeaderPart } from "./components/header-part";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { IPopupOptions } from "devextreme-react/popup";
import { useFormSettings } from "./components/use-form-setting";
import { selectedItemsAtom } from "./components/store";
import { useVisibilityControl } from "@/packages/hooks";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { useQuery } from "@tanstack/react-query";
import {
  ExcludeSpecialCharactersType,
  RequiredField,
  requiredType,
} from "@/packages/common/Validation_Rules";
import { SearchForm } from "./components/search-form";
import { SearchFormDL } from "./components/search-formDL";
import { HeaderPartDL } from "./components/header-partDL";

export const Mst_DeliveryLocationHTCPage = () => {
  const { t } = useI18n("Mst_DeliveryLocation");
  const { isHQ, isHTC, DealerCode } = usePermissions();
  const api = useClientgateApi();
  const windowSize = useWindowSize();
  const showError = useSetAtom(showErrorAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const loadingControl = useVisibilityControl({ defaultVisible: false });

  let gridRef: any = useRef(null);
  const searchCondition = useRef<Partial<SearchMst_DeliveryLocationParam>>({
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    DeliveryLocationCode: "",
    DealerCode: "ALL",
    DeliveryLocationName: "",
    FlagActive: "",
  });
  //================================CallAPI================================================
  // const fetchData = async () => {
  //   const response = await api.Mst_DeliveryLocation_SearchHQ({
  //     DeliveryLocationCode: searchCondition.current?.DeliveryLocationCode ?? "",
  //     DealerCode:
  //       searchCondition.current?.DealerCode === "ALL"
  //         ? ""
  //         : searchCondition.current?.DealerCode,
  //     DeliveryLocationName: searchCondition.current?.DeliveryLocationName ?? "",
  //     FlagActive: searchCondition.current?.FlagActive ?? "",
  //     Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
  //     Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
  //   });

  //   if (response?.isSuccess) {
  //     return response;
  //   }
  // };
  const fetchData = async () => {
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Mst_DeliveryLocation_SearchHQ({
          DeliveryLocationCode:
            searchCondition.current?.DeliveryLocationCode ?? "",
          DealerCode:
            searchCondition.current?.DealerCode === "ALL"
              ? ""
              : searchCondition.current?.DealerCode,
          DeliveryLocationName:
            searchCondition.current?.DeliveryLocationName ?? "",
          FlagActive: searchCondition.current?.FlagActive ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Mst_DeliveryLocation_SearchDL({
          DeliveryLocationCode:
            searchCondition.current?.DeliveryLocationCode ?? "",
          DealerCode: DealerCode ?? "",
          DeliveryLocationName:
            searchCondition.current?.DeliveryLocationName ?? "",
          FlagActive: searchCondition.current?.FlagActive ?? "",
          Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
          Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
        });
        return response;
      });
    if (resp?.isSuccess) {
      return resp;
    }
  };
  const { data: Dealer_GetAllActive, isLoading } = useQuery(
    ["Dealer_GetAllActive-Mst_DeliveryLocation"],
    async () => {
      const resp = await api.Dealer_GetAllActive();
      if (resp.DataList) {
        return [{ DealerCode: "ALL", DealerName: "Tất cả" }, ...resp.DataList];
      }
    }
  );
  //================================CallAPI-end================================================

  //================================Handle================================================
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
    searchCondition.current = data;
    gridRef?.current?.refetchData();
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
    if (
      ["DeliveryLocationCode", "DealerCode", "DealerName"].includes(
        e.dataField!
      )
    ) {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
  };

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    await onDelete(data);
  };

  const handleDeleteRow = async (ids: any) => {
    let check = false;
    let checkSuccess = false;

    for (let item of ids) {
      const respone = await api.Mst_DeliveryLocation_Delete(item);
      if (respone.isSuccess) {
        checkSuccess = true;

        gridRef.current?.refetchData();
      } else {
        check = true;
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
    if (check) {
      toast.warning(t("Delete failed"));
    }
    if (checkSuccess) {
      toast.success(t("Delete successfully!"));
    }
  };

  const handleDeleteMulti = async () => {
    return ConfirmComponent({
      asyncFunction: async () => {
        const listChecked = gridRef?.current
          ?.getDxInstance()
          ?.getSelectedRowsData();

        await handleDeleteRow(listChecked);
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };

  const onModify = async (id: string, data: Mst_DeliveryLocation) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const finDataUpdate = (array: any, searchObject: any) => {
          return array.find((item: any) =>
            Object.keys(searchObject).every(
              (key) => item[key] === searchObject[key]
            )
          );
        };
        const findData = finDataUpdate(gridRef?.current?.getVisibleData(), id);
        const dataUpdate = { ...findData, ...data };
        const dataCall = {
          DeliveryLocationCode: dataUpdate?.DeliveryLocationCode ?? "",
          DealerCode: dataUpdate?.DealerCode ?? "",
          DeliveryLocationName: dataUpdate?.DeliveryLocationName ?? "",
          FlagActive: dataUpdate?.FlagActive ? "1" : "0",
        };
        const respone = await api.Mst_DeliveryLocation_Update(dataCall, data);
        if (respone.isSuccess) {
          toast.success(t("Update successfully!"));
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
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to update?"),
    });
  };
  // Section: CRUD operations
  const onCreate = async (data: Mst_DeliveryLocation & { __KEY__: string }) => {
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Mst_DeliveryLocation_Create({
          DeliveryLocationCode: data?.DeliveryLocationCode ?? "",
          DealerCode: data?.DealerCode ?? "",
          DeliveryLocationName: data?.DeliveryLocationName ?? "",
          FlagActive: data?.FlagActive ? "1" : "0",
        });
        if (respone.isSuccess) {
          toast.success(t("Create successfully!"));
          gridRef.current?.getDxInstance()?.cancelEditData();
          gridRef?.current?.refetchData();
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
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to create?"),
    });
  };
  const onDelete = async (value: any) => {
    const finDataUpdate = (array: any, searchObject: any) => {
      return array.find((item: any) =>
        Object.keys(searchObject).every(
          (key) => item[key] === searchObject[key]
        )
      );
    };
    const findData = finDataUpdate(gridRef?.current?.getVisibleData(), value);
    ConfirmComponent({
      asyncFunction: async () => {
        const respone = await api.Mst_DeliveryLocation_Delete(findData);
        if (respone.isSuccess) {
          toast.success(t("Delete successfully!"));
          gridRef?.current?.refetchData();
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
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
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

  //================================Handle-end================================================

  //================================Columns================================================
  const columns: ColumnOptions[] = [
    {
      dataField: "DeliveryLocationCode",
      caption: t("DeliveryLocationCode"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
      validationRules: [requiredType, ExcludeSpecialCharactersType],
    },
    {
      dataField: "DeliveryLocationName",
      caption: t("DeliveryLocationName"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
      validationRules: [requiredType],
    },
    {
      dataField: "DealerCode",
      caption: t("DealerCode"),
      editorType: "dxSelectBox",
      validationRules: [requiredType, ExcludeSpecialCharactersType],
      editorOptions: {
        placeholder: t("Select"),
        dataSource: Dealer_GetAllActive ?? [],
        displayExpr: "DealerCode",
        valueExpr: "DealerCode",
      },
      setCellValue: (rowData: any, value: any) => {
        rowData.DealerCode = value;
        rowData.DealerName = Dealer_GetAllActive?.find(
          (item: any) => item.DealerCode === value
        )?.DealerName;
      },
    },
    {
      dataField: "DealerName",
      caption: t("DealerName"),
      editorType: "dxTextBox",
      visible: true,
      allowSorting: false,
      allowFiltering: false,
    },
    {
      dataField: "FlagActive",
      caption: t("Flag Active"),
      allowFiltering: false,
      editorType: "dxSwitch",
      dataType: "string",
      visible: true,
      alignment: "center",
      width: 135,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
  ];
  //================================Columns-end================================================
  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      dataField: "DealerCode",
      visible: true,
      caption: t("DealerCode"),
      editorType: "dxSelectBox",
      editorOptions: {
        displayExpr: "DealerName",
        valueExpr: "DealerCode",
        items: Dealer_GetAllActive,
        validationRules: [RequiredField("IsRequired")],
        validationMessageMode: "always",
        validationGroup: "form",
      },
      validationRules: [requiredType],
    },
  ];
  //==========================searchConditions-end================================================
  const formSettings = useFormSettings({
    columns,
  });
  const popupSettings: IPopupOptions = {
    showTitle: true,
    height: "550px",
    width: "1100px",
    title: t("Ser_Inv_Stock"),
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
        {isHTC ? (
          <HeaderPart
            onAddNew={handleAddNew}
            searchCondition={searchCondition}
            handleRefetch={handleRefetch}
            gridRef={gridRef}
          ></HeaderPart>
        ) : (
          <HeaderPartDL
            onAddNew={handleAddNew}
            searchCondition={searchCondition}
            handleRefetch={handleRefetch}
            gridRef={gridRef}
          ></HeaderPartDL>
        )}
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <ContentSearchPanelLayout>
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <PermissionContainer
              permission={""}
              children={
                <div className={"w-[300px]"}>
                  {/* <SearchPanelV2
                    conditionFields={searchConditions}
                    data={searchCondition}
                    onSearch={handleSearch}
                    storeKey={"Ser_Inv_Stock-search-panel"}
                  /> */}
                  {isHTC ? (
                    <SearchForm
                      data={searchCondition.current}
                      onSearch={handleSearch}
                      Dealer_GetAllActive={Dealer_GetAllActive}
                    />
                  ) : (
                    <SearchFormDL
                      data={searchCondition.current}
                      onSearch={handleSearch}
                      Dealer_GetAllActive={Dealer_GetAllActive}
                    />
                  )}
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
            {isHTC ? (
              <GridViewOne
                ref={gridRef}
                dataSource={[]} // cars
                columns={columns}
                fetchData={fetchData}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                customToolbarItems={[]}
                editMode={true}
                editingOptions={{
                  mode: "row",
                }}
                onPageChanged={(number) => onRefetchData(number ?? 0)}
                onSelectionChanged={handleSelectionChanged}
                onSaving={handleSavingRow}
                onEditorPreparing={handleEditorPreparing}
                onRowDeleteBtnClick={handleDelete}
                onDeleteMultiBtnClick={handleDeleteMulti}
                customHeight={windowSize.height - 120}
                keyExpr={["DeliveryLocationCode"]}
                storeKey={"Mst_DeliveryLocation_HTC"}
              />
            ) : (
              <GridViewOne
                ref={gridRef}
                dataSource={[]} // cars
                columns={columns}
                fetchData={fetchData}
                autoFetchData={false}
                allowSelection={false}
                isLoading={false}
                isHiddenCheckBox
                customToolbarItems={[]}
                onPageChanged={(number) => onRefetchData(number ?? 0)}
                onSelectionChanged={handleSelectionChanged}
                onSaving={handleSavingRow}
                onEditorPreparing={handleEditorPreparing}
                onRowDeleteBtnClick={handleDelete}
                onDeleteMultiBtnClick={handleDeleteMulti}
                customHeight={windowSize.height - 120}
                keyExpr={["DeliveryLocationCode"]}
                storeKey={"Mst_DeliveryLocation_DL"}
              />
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
