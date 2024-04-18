import { useI18n } from "@/i18n/useI18n";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { HeaderPart } from "../components/header-part";
import { useVisibilityControl } from "@/packages/hooks";
import { useSetAtom } from "jotai";
import {
  dataViewAtom,
  isUpdateAtom,
  selectedItemsAtom,
} from "../components/store";
import { showErrorAtom } from "@/packages/store";
import { MutableRefObject, useEffect, useRef } from "react";
import { DataGrid, LoadPanel } from "devextreme-react";
import {
  SearchSer_CustomerCarParam,
  Ser_CustomerCar,
} from "@/packages/types/master/Ser_CustomerCar";
import { toast } from "react-toastify";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";
import { IItemProps } from "devextreme-react/form";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { PopupAddNew } from "../popup_add/use-popup-add";
import { match } from "ts-pattern";
import { usePermissions } from "@/packages/contexts/permission";
import { useClientgateApi } from "@/packages/api";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { BButton } from "@/packages/components/buttons";
import { useDropzone } from "react-dropzone";
import { Alignment, ToolbarItemProps } from "@/types";
import { PopupView } from "../popup_view/use-popup-view";
import { Link } from "@/packages/components/link/link";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

function BBImportExecl({ onDrop }: any) {
  const { t } = useI18n("Mst_Training");

  const { getRootProps } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()}>
        <BButton className={"btn-browse-file"} label={t("ImportExcel")} />
      </div>
    </div>
  );
}

export const Ser_CustomerCarPage = () => {
  const { t } = useI18n("Ser_CustomerCar");
  const { isHQ, DealerCode } = usePermissions();
  const api = useClientgateApi();
  const windowSize = useWindowSize();

  const showCreateNewPopup = useVisibilityControl({ defaultVisible: false });
  const showViewPopup = useVisibilityControl({ defaultVisible: false });
  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const setisUpdate = useSetAtom(isUpdateAtom);
  const setLoad = useSetAtom(loadPanelAtom);
  const setSelectedItems = useSetAtom(selectedItemsAtom);
  const showError = useSetAtom(showErrorAtom);
  const setDataView = useSetAtom(dataViewAtom);

  const createNewPopupRef = useRef<any>(null);
  const viewPopupRef = useRef<any>(null);
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<SearchSer_CustomerCarParam>>({
    CusID: "",
    CusName: "",
    DealerCode: "",
    Address: "",
    Phone: "",
    PlateNo: "",
    FrameNo: "",
    EngineNo: "",
    TradeMarkCode: "",
    ModelId: "",
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
    const response = await api.Ser_CustomerCar_SearchDL({
      CusID: searchCondition.current?.CusID ?? "",
      CusName: searchCondition.current?.CusName ?? "",
      DealerCode: searchCondition.current?.DealerCode ?? "",
      Address: searchCondition.current?.Address ?? "",
      Phone: searchCondition.current?.Phone ?? "",
      PlateNo: searchCondition.current?.PlateNo ?? "",
      FrameNo: searchCondition.current?.FrameNo ?? "",
      EngineNo: searchCondition.current?.EngineNo ?? "",
      TradeMarkCode: searchCondition.current?.TradeMarkCode ?? "",
      ModelId: searchCondition.current?.ModelId ?? "",
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (response?.isSuccess) {
      return response;
    }
  };
  //======================CallAPI-end==========================================

  //==========================handle================================================
  const handleAddNew = () => {
    // gridRef?.current?.addRow();
    createNewPopupRef.current.show();
  };

  const handleEditingStart = async (e: any) => {
    const response = await api.Ser_CustomerCar_SerCarSearchDL({
      CarID: "",
      CusID: e?.data?.CusID,
      PlateNo: "",
      FrameNo: "",
      EngineNo: "",
      ModelId: "",
      TradeMarkCode: "",
      DealerCode: "",
      SalesCarID: "",
      InsNo: "",
      IsActive: "1",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    if (response?.isSuccess) {
      if (response?.DataList) {
        setDataView((prev: any) => {
          return {
            ...prev,
            CustomerInfo: e?.data,
            CarInfo: response?.DataList,
          };
        });
        setisUpdate(true);
        createNewPopupRef.current.show();
      }
    }
  };

  const handleEdit = (rowIndex: number) => {
    createNewPopupRef.current.show();
    setisUpdate(true);
  };

  const handleRefetch = () => {
    gridRef?.current?.refetchData();
  };
  const handleViewDetail = async (data: any) => {
    const response = await api.Ser_CustomerCar_SerCarSearchDL({
      CarID: "",
      CusID: data?.CusID,
      PlateNo: "",
      FrameNo: "",
      EngineNo: "",
      ModelId: "",
      TradeMarkCode: "",
      DealerCode: "",
      SalesCarID: "",
      InsNo: "",
      IsActive: "1",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    if (response?.isSuccess) {
      if (response?.DataList) {
        setDataView((prev: any) => {
          return {
            ...prev,
            CustomerInfo: data,
            CarInfo: response?.DataList,
          };
        });
        viewPopupRef?.current.show();
      }
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

  const handleSelectionChanged = (rowKeys: any) => {
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

  const handleDeleteRow = async (ids: any) => {
    setLoad(true);
    let check = false;
    let checkSuccess = false;

    // for (let item of ids) {
    //   const resp = await api.Ser_CustomerCar_Delete({
    //     CusId: item?.CusID,
    //   });
    //   if (resp.isSuccess) {
    //     checkSuccess = true;
    //   } else {
    //     check = true;
    //     showError({
    //       message: t(resp._strErrCode),
    //       _strErrCode: resp._strErrCode,
    //       _strTId: resp._strTId,
    //       _strAppTId: resp._strAppTId,
    //       _objTTime: resp._objTTime,
    //       _strType: resp._strType,
    //       _dicDebug: resp._dicDebug,
    //       _dicExcs: resp._dicExcs,
    //     });
    //   }
    // }
    // if (check) {
    //   toast.warning(t("Delete failed"));
    // }
    // if (checkSuccess) {
    //   gridRef.current?.refetchData();
    //   toast.success(t("Delete successfully!"));
    // }
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

  const onModify = async (id: string, data: Ser_CustomerCar) => {};
  const onCreate = async (data: Ser_CustomerCar & { __KEY__: string }) => {};
  const onDelete = async (id: any) => {
    ConfirmComponent({
      asyncFunction: async () => {
        setLoad(true);
        const resp1 = await api.Ser_CustomerCar_SerCarSearchDL({
          CarID: "",
          CusID: id?.CusID,
          PlateNo: "",
          FrameNo: "",
          EngineNo: "",
          ModelId: "",
          TradeMarkCode: "",
          DealerCode: "",
          SalesCarID: "",
          InsNo: "",
          IsActive: "1",
          Ft_PageIndex: 0,
          Ft_PageSize: 100,
        });

        if (resp1?.isSuccess && resp1.DataList) {
          if (resp1?.DataList?.length > 0) {
            toast.warning(t("Khách hàng này đang có xe!"));
          } else {
            const resp = await api.Ser_CustomerCar_Delete({
              CusId: id?.CusID,
            });
            if (resp.isSuccess) {
              toast.success(t("Delete successfully!"));
              gridRef?.current?.refetchData();
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
        }

        setLoad(false);
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

  const handleExportExcel = async () => {
    setLoad(true);
    const resp = await match(isHQ())
      .with(true, async () => {
        const response = await api.Ser_CustomerCar_ExportHQ({
          CusID: searchCondition.current?.CusID ?? "",
          CusName: searchCondition.current?.CusName ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          Address: searchCondition.current?.Address ?? "",
          Phone: searchCondition.current?.Phone ?? "",
          PlateNo: searchCondition.current?.PlateNo ?? "",
          FrameNo: searchCondition.current?.FrameNo ?? "",
          EngineNo: searchCondition.current?.EngineNo ?? "",
          TradeMarkCode: searchCondition.current?.TradeMarkCode ?? "",
          ModelId: searchCondition.current?.ModelId ?? "",
        });
        return response;
      })
      .otherwise(async () => {
        const response = await api.Ser_CustomerCar_ExportDL({
          CusID: searchCondition.current?.CusID ?? "",
          CusName: searchCondition.current?.CusName ?? "",
          DealerCode: searchCondition.current?.DealerCode ?? "",
          Address: searchCondition.current?.Address ?? "",
          Phone: searchCondition.current?.Phone ?? "",
          PlateNo: searchCondition.current?.PlateNo ?? "",
          FrameNo: searchCondition.current?.FrameNo ?? "",
          EngineNo: searchCondition.current?.EngineNo ?? "",
          TradeMarkCode: searchCondition.current?.TradeMarkCode ?? "",
          ModelId: searchCondition.current?.ModelId ?? "",
        });
        return response;
      });
    if (resp?.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = resp.Data;
    }
    setLoad(false);
  };
  const handleExportTemplate = async () => {
    const responsive = await api.Ser_CustomerCar_ExportTemplate();
    if (responsive.isSuccess) {
      toast.success(t("ExportExcelSuccess"));
      window.location.href = responsive.Data!;
    } else {
      showError({
        message: t(responsive._strErrCode),
        _strErrCode: responsive._strErrCode,
        _strTId: responsive._strTId,
        _strAppTId: responsive._strAppTId,
        _objTTime: responsive._objTTime,
        _strType: responsive._strType,
        _dicDebug: responsive._dicDebug,
        _dicExcs: responsive._dicExcs,
      });
    }
  };
  const onDrop = async (acceptedFiles: any) => {
    const responsive = await api.Ser_CustomerCar_Import(acceptedFiles[0] ?? []);
    if (responsive.isSuccess) {
      toast.success(t("Upload successfully!"));
      gridRef?.current?.refetchData();
    } else {
      showError({
        message: t(responsive._strErrCode),
        _strErrCode: responsive._strErrCode,
        _strTId: responsive._strTId,
        _strAppTId: responsive._strAppTId,
        _objTTime: responsive._objTTime,
        _strType: responsive._strType,
        _dicDebug: responsive._dicDebug,
        _dicExcs: responsive._dicExcs,
      });
    }
  };

  //==========================handle-end================================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("CusName"),
      dataField: "CusName",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("FrameNo"),
      dataField: "FrameNo",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "Phone",
      caption: t("Phone"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("Address"),
      dataField: "Address",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];
  //==========================searchConditions-end================================================

  //==================toolbarItems==============================================
  const subGridToolbars: ToolbarItemProps[] = [
    {
      location: "before",
      render: (gridRef: MutableRefObject<DataGrid>) => {
        return <BBImportExecl onDrop={onDrop} />;
      },
    },
    {
      location: "before",
      render: (gridRef: MutableRefObject<DataGrid>) => {
        return <BButton label={t("ExportExcel")} onClick={handleExportExcel} />;
      },
    },
    {
      location: "before",
      render: (gridRef: MutableRefObject<DataGrid>) => {
        return (
          <BButton label={t("ExportTemplate")} onClick={handleExportTemplate} />
        );
      },
    },
  ];
  //==================toolbarItems-end==============================================
  //=====================Columns===========================================
  const columns: any = [
    {
      dataField: "Idx",
      visible: true,
      caption: t("STT"),
      width: 80,
      minWidth: 80,
      alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return <span>{e.rowIndex + 1}</span>;
      },
    },
    {
      dataField: "CusID",
      visible: true,
      caption: t("CusID"),
      // alignment: "center" as Alignment,
      cellRender: (e: any) => {
        return (
          <Link
            label={e.value}
            onClick={() => {
              handleViewDetail(e?.data);
            }}
          />
        );
      },
    },
    {
      dataField: "CusName",
      visible: true,
      caption: t("CusName"),
      // alignment: "center" as Alignment,
      sortIndex: 0,
      allowFiltering: true,
      sortingMethod: function (value1: any, value2: any) {
        if (!value1 && value2) return -1;
        if (!value1 && !value2) return 0;
        if (value1 && !value2) return 1;
        // Determines whether two strings are equivalent in the current locale
        return value1.localeCompare(value2);
      },
    },

    {
      dataField: "DOB",
      caption: t("DOB"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      customizeText: (e: any) => {
        if (e.value) {
          var timestamp = e.value;

          var date = new Date(
            timestamp.replace(
              /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
              "$1-$2-$3T$4:$5:$6"
            )
          );

          var year = date.getFullYear();
          var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
          var day = String(date.getDate()).padStart(2, "0");

          var formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        }
      },
    },

    {
      dataField: "Sex",
      caption: t("Sex"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      cellRender: ({ data, rowIndex, value }: any) => {
        if (value) {
          return <span>Nam</span>;
        } else if (value === null) {
          return <span></span>;
        } else {
          return <span>Nữ</span>;
        }
      },
    },

    {
      dataField: "PlateNo",
      caption: t("PlateNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "TradeMarkCode",
      caption: t("TradeMarkCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ModelName",
      caption: t("ModelName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "FrameNo",
      caption: t("FrameNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "EngineNo",
      caption: t("EngineNo"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ProductYear",
      caption: t("ProductYear"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ColorCode",
      caption: t("ColorCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "InsVieName",
      caption: t("InsVieName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Address",
      caption: t("Address"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Mobile",
      caption: t("Mobile"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Tel",
      caption: t("Tel"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "Email",
      caption: t("Email"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ContName",
      caption: t("ContName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "ContTel",
      caption: t("ContTel"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
    {
      dataField: "LogLUDateTime",
      caption: t("LogLUDateTime"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      customizeText: (e: any) => {
        if (e.value) {
          var timestamp = e.value;

          var date = new Date(
            timestamp.replace(
              /(\d{4})(\d{2})(\d{2})(\d{2}):(\d{2}):(\d{2})/,
              "$1-$2-$3T$4:$5:$6"
            )
          );

          var year = date.getFullYear();
          var month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
          var day = String(date.getDate()).padStart(2, "0");

          var formattedDate = `${year}-${month}-${day}`;
          return formattedDate;
        }
      },
    },
    {
      dataField: "MemberCarID",
      caption: t("MemberCarID"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
    },
  ];
  //=====================Columns-end===========================================
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
                    data={searchCondition}
                    onSearch={handleSearch}
                    storeKey={"Ser_CustomerCar-search-panel"}
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
                  autoFetchData={false}
                  // defaultPageSize={10}
                  isHiddenCheckBox
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={[]}
                  editMode={true}
                  editingOptions={{
                    mode: "row",
                  }}
                  onEditingStart={handleEditingStart}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  onEditorPreparing={handleEditorPreparing}
                  toolbarItems={subGridToolbars}
                  onRowDeleteBtnClick={handleDelete}
                  customHeight={windowSize.height - 120}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={["CusID", "CarID"]}
                  storeKey={"Ser_CustomerCar"}
                />

                <PopupAddNew
                  ref={createNewPopupRef}
                  visible={showCreateNewPopup.visible}
                  container={".dx-viewport"}
                  onHidding={() => {
                    showCreateNewPopup.close();
                  }}
                  gridRef={gridRef}
                  viewPopupRef={viewPopupRef}
                />
                <PopupView
                  ref={viewPopupRef}
                  visible={showViewPopup.visible}
                  container={".dx-viewport"}
                  onHidding={() => {
                    showViewPopup.close();
                  }}
                  createNewPopupRef={createNewPopupRef}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
