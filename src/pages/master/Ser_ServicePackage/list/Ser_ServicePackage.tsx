import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { PageHeaderLayout } from "@/packages/layouts/page-header-layout";
import { HeaderPart } from "./header-part";
import { useEffect, useMemo, useRef } from "react";
import { DataGrid, DateRangeBox, LoadPanel } from "devextreme-react";
import { useClientgateApi } from "@/packages/api";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { useAtomValue, useSetAtom } from "jotai";
import {
  dataViewAtom,
  isUpdateAtom,
  keywordAtom,
  selectedItemsAtom,
} from "../components/screen-atom";
import { normalGridSelectionKeysAtom } from "@/packages/ui/base-gridview/store/normal-grid-store";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { showErrorAtom } from "@/packages/store";
import { Ser_ServicePackage } from "@/packages/types/master/Ser_ServicePackage";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { IItemProps } from "devextreme-react/form";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { format } from "date-fns";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { PopupAddNew } from "../popup-add/popup-add";
import { useVisibilityControl } from "@/packages/hooks";
import { Link } from "@/packages/components/link/link";
import { ViewPopup } from "../popup-view/popup-view";
import { useQuery } from "@tanstack/react-query";
import { usePermissions } from "@/packages/contexts/permission";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const Ser_ServicePackagePage = () => {
  const { t } = useI18n("Ser_ServicePackage");
  const api = useClientgateApi();
  const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
  const windowSize = useWindowSize();
  const permissionStore = usePermissions();
  const { isHQ, DealerCode } = usePermissions();

  const showCreateNewPopup = useVisibilityControl({ defaultVisible: false });
  const showViewPopup = useVisibilityControl({ defaultVisible: false });

  const keyword = useAtomValue(keywordAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
  const setDataView = useSetAtom(dataViewAtom);
  const setIsUpdate = useSetAtom(isUpdateAtom);
  const setLoad = useSetAtom(loadPanelAtom);

  const viewPopupRef = useRef<any>(null);
  const createNewPopupRef = useRef<any>(null);
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<any>({
    ServicePackageNo: "",
    ServicePackageName: "",
    IsPublicFlag: "",
    CreatedDateFromTo: [validateTimeStartDayOfMonth, new Date()],
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

  //===========================CallAPI======================================
  const fetchData = async () => {
    const resp = await api.Ser_ServicePackage_SearchDL({
      ServicePackageID: "",
      TakingTimeFrom: "",
      TakingTimeTo: "",
      Creator: "",
      ServicePackageNo: searchCondition.current?.ServicePackageNo ?? "",
      ServicePackageName: searchCondition.current?.ServicePackageName ?? "",
      IsPublicFlag: searchCondition.current?.IsPublicFlag ? "1" : "0",
      CreatedDateFrom: searchCondition.current.CreatedDateFromTo[0]
        ? format(
            searchCondition.current.CreatedDateFromTo[0] as Date,
            "yyyy-MM-dd"
          )
        : "",
      CreatedDateTo: searchCondition.current.CreatedDateFromTo[1]
        ? format(
            searchCondition.current.CreatedDateFromTo[1] as Date,
            "yyyy-MM-dd"
          )
        : "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    return resp;
  };
  // const {
  //   data: SerMSTService_GetAllActive,
  //   isLoading: isGettingSerMSTService_GetAllActive,
  // } = useQuery(
  //   ["SerMSTService_GetAllActive", "withAllOption"],
  //   async () => {
  //     const resp = await api.SerMSTService_GetAllActive();
  //     if (resp.isSuccess) {
  //       return [...(resp.DataList ?? [])];
  //     }
  //   },
  //   {}
  // );
  //===========================CallAPI-end======================================

  //===========================handle======================================
  const handleAddNew = () => {
    // gridRef?.current?.addRow();
    createNewPopupRef.current.show();
  };
  const handleViewDetail = async (key: any) => {
    // gridRef?.current?.addRow();
    setLoad(true);
    const resp = await api.Ser_ServicePackage_GetByServicePackageIDDL({
      ServicePackageID: key,
      DealerCode: permissionStore?.DealerCode,
    });
    if (resp?.isSuccess) {
      if (resp?.Data) {
        setDataView(resp?.Data);
        viewPopupRef?.current.show();
        setLoad(false);
      }
    }
    setLoad(false);
  };

  const handleEditingStart = async (e: any) => {
    setLoad(true);
    const resp = await api.Ser_ServicePackage_GetByServicePackageIDDL({
      ServicePackageID: e?.data?.ServicePackageID,
      DealerCode: permissionStore?.DealerCode,
    });
    if (resp?.isSuccess) {
      if (resp?.Data) {
        setDataView(resp.Data);
        createNewPopupRef.current.show();
        setIsUpdate(true);
      }
    }
    setLoad(false);
  };

  const onRefetch = async (number?: number) => {
    gridRef?.current?.refetchData(number);
  };

  const setCondition = (keyword: string) => {
    searchCondition.current.keyword = keyword;
    gridRef?.current?.refetchData();
  };

  const handleSelectionChanged = (rowKeys: any) => {
    setSelectedItems(rowKeys?.selectedRowsData ?? []);
  };

  const handleEditorPreparing = (e: EditorPreparingEvent<any, any>) => {
    if (e.dataField === "PortCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "PortType") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
    }
    if (e.dataField === "ProvinceCode") {
      e.editorOptions.readOnly = !e.row?.isNewRow;
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

    await onRefetchData();
  };

  // khi mà tác động vào thằng row thì gọi thằng này
  const handleSavingRow = async (e: any) => {
    if (e.changes && e.changes.length > 0) {
      const { type } = e.changes[0];
      if (type === "remove") {
        const id = e.changes[0].key;
        e.promise = onDelete(id);
      } else if (type === "insert") {
        const data: Ser_ServicePackage = e.changes[0].data!;
        e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onUpdate(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const onUpdate = async (key: string, data: Partial<Ser_ServicePackage>) => {};

  const onDelete = async (id: string) => {
    ConfirmComponent({
      asyncFunction: async () => {
        setLoad(true);
        const respone = await api.Ser_ServicePackage_Delete({
          ServicePackageID: id,
        });
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
        setLoad(false);
      },
      title: t("Confirm"),
      contentConfirm: t("Do you want to delete?"),
    });
  };

  const onCreate = async (data: Ser_ServicePackage) => {};

  const handleUploadFile = async (
    file: File,
    progressCallback?: Function,
    onClose?: Function
  ) => {};

  const onDownloadTemplate = async () => {};

  const handleDelete = async (e: any) => {
    const data = e?.row?.key;

    await onDelete(data);
  };

  const handleDeleteRow = async (ids: string[]) => {
    setLoad(true);
    let check = false;
    let checkSuccess = false;

    for (let item of ids) {
      const respone = await api.Ser_ServicePackage_Delete({
        ServicePackageID: item,
      });
      if (respone.isSuccess) {
        checkSuccess = true;
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
      gridRef.current?.refetchData();
      toast.success(t("Delete successfully!"));
    }
    setLoad(false);
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

  //===========================handle-end======================================

  //===========================columns======================================
  const columns: ColumnOptions[] = useMemo(() => {
    return [
      {
        dataField: "STT",
        caption: t("STT"),
        visible: true,
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },
      {
        dataField: "ServicePackageNo",
        caption: t("ServicePackageNo"),
        editorType: "dxTextBox",
        visible: true,
        cellRender: (e: any) => {
          return (
            <Link
              label={e.value}
              onClick={() => {
                handleViewDetail(e?.data?.ServicePackageID);
              }}
            />
          );
        },
      },
      {
        dataField: "ServicePackageName",
        caption: t("ServicePackageName"),
        editorType: "dxTextBox",
        visible: true,
      },
      {
        dataField: "TakingTime",
        caption: t("TakingTime"),
        editorType: "dxTextBox",
        visible: true,
      },
      {
        dataField: "IsPublicFlag",
        caption: t("IsPublicFlag"),
        editorType: "dxTextBox",
        visible: true,
        cellRender: (e: any) => {
          if (e.value === "1") {
            return <span>{t("Dùng chung")}</span>;
          } else {
            return <span>{t("Riêng tư")}</span>;
          }
        },
      },
      {
        dataField: "CreatedDate",
        caption: t("CreatedDate"),
        editorType: "dxTextBox",
        visible: true,
      },
      {
        dataField: "Description",
        caption: t("Description"),
        editorType: "dxTextBox",
        visible: true,
      },
      {
        dataField: "IsUserBasePrice",
        caption: t("IsUserBasePrice"),
        editorType: "dxTextBox",
        visible: true,
        cellRender: (e: any) => {
          if (e.value === "1") {
            return <span>{t("Giá chung")}</span>;
          } else {
            return <span>{t("Giá theo gói dịch vụ")}</span>;
          }
        },
      },
    ];
  }, []);
  //===========================columns-end======================================
  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("ServicePackageNo"),
      dataField: "ServicePackageNo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "ServicePackageName",
      caption: t("ServicePackageName"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "CreatedDateFromTo",
      caption: t("CreatedDateFromTo"),
      visible: true,
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              width={"100%"}
              className="dateRange "
              displayFormat=" yyyy-MM-dd"
              showClearButton={true}
              defaultStartDate={searchCondition?.current.CreatedDateFromTo[0]}
              defaultEndDate={searchCondition?.current.CreatedDateFromTo[1]}
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
    {
      dataField: "IsPublicFlag",
      caption: t("IsPublicFlag"),
      visible: true,
      label: {
        visible: false,
        text: t("IsPublicFlag"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        return (
          <div className={"flex flex-row"}>
            <CheckboxField
              label={t("IsPublicFlag")}
              dataField={dataField}
              formInstance={formComponent}
              defaultValue={formData?.[dataField]}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
            />
          </div>
        );
      },
    },
  ];
  //==========================searchConditions-end================================================

  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <HeaderPart
          onAddNew={handleAddNew}
          onUploadFile={handleUploadFile}
          onDownloadTemplate={onDownloadTemplate}
          searchCondition={searchCondition}
          setCondition={setCondition}
        />
      </AdminContentLayout.Slot>
      <AdminContentLayout.Slot name="Content">
        <ContentSearchPanelLayout
          // searchPermissionCode="BTN_QUANTRI_BTN_QUANTRI_QLDAILY_CREATE_SEARCH"
          searchPermissionCode=""
        >
          <ContentSearchPanelLayout.Slot name={"SearchPanel"}>
            <PermissionContainer
              // permission={"BTN_QUANTRI_BTN_QUANTRI_QLDAILY_CREATE_SEARCH"}
              permission={""}
              children={
                <div className={"w-[300px]"}>
                  <SearchPanelV2
                    conditionFields={searchConditions}
                    data={searchCondition.current}
                    onSearch={handleSearch}
                    storeKey={"Ser_ServicePackage-search-panel"}
                  />
                </div>
              }
            />
          </ContentSearchPanelLayout.Slot>
          <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
            {/* <LoadPanel
              container={".dx-viewport"}
              shadingColor="rgba(0,0,0,0.4)"
              position={"center"}
              visible={isGettingSerMSTService_GetAllActive}
              showIndicator={true}
              showPane={true}
            /> */}
            <GridViewOne
              ref={gridRef}
              toolbarItems={[]}
              dataSource={[]} // cars
              columns={columns}
              fetchData={fetchData}
              onSelectionChanged={handleSelectionChanged}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              customToolbarItems={[]}
              editMode={true}
              editingOptions={{
                mode: "row",
              }}
              onEditingStart={handleEditingStart}
              onSaving={handleSavingRow}
              onPageChanged={(number) => onRefetch(number ?? 0)}
              onEditorPreparing={handleEditorPreparing}
              onRowDeleteBtnClick={handleDelete}
              customHeight={windowSize.height - 130}
              onDeleteMultiBtnClick={handleDeleteMulti}
              keyExpr="ServicePackageID"
              storeKey="Ser_ServicePackage-columns"
            />
            <PopupAddNew
              ref={createNewPopupRef}
              visible={showCreateNewPopup.visible}
              container={".dx-viewport"}
              position={"left"}
              onHidding={() => {
                showCreateNewPopup.close();
              }}
              gridRef={gridRef}
              viewPopupRef={viewPopupRef}
            />
            <ViewPopup
              ref={viewPopupRef}
              visible={showViewPopup.visible}
              container={".dx-viewport"}
              position={"left"}
              onHidding={() => {
                showViewPopup.close();
              }}
              createNewPopupRef={createNewPopupRef}
            />
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
