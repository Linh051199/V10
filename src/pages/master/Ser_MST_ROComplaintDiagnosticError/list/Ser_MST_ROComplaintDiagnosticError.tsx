import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { FlagActiveEnum } from "@/packages/types";
import { Ser_MST_ROComplaintDiagnosticErrorParams } from "@/packages/types/master/Ser_MST_ROComplaintDiagnosticError";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { DataGrid, LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import { useRef } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "../components/header-part";
import { useColumn } from "../components/use-columns";
import { useFormSettings } from "../components/use-form-settings";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { Icon } from "@/packages/ui/icons";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

interface HeaderProps {
  rightButtons: BButtonProps[];
}

const Header = ({ rightButtons }: HeaderProps) => {
  const { t } = useI18n("QuanLyKhieuNaiDonHangCreate");
  // const navigate = useNavigate();
  // const paramUrl = useParams();
  const handleGoBack = () => {
    // navigate(-1);
  };

  return (
    <div className="w-full flex items-center justify-between h-[55px] p-2 ml-[16px] page-header">
      <div className={"flex items-center justify-center"}>
        <div
          className={
            "screen text-[#5F7D95] font-[400] text-[14px] hover:cursor-pointer"
          }
          onClick={handleGoBack}
        >
          {t("QuanLyKhieuNaiDonHang")}
        </div>
        <Icon name={"chevronRight"} className={"mx-2"} />
        <div
          className={"screen screen-leaf text-[#0E223D] text-[14px] font-[600]"}
        >
          {t(`QuanLyKhieuNaiDonHangCreate`)}
        </div>
      </div>
      <div>
        {rightButtons.map((button, idx) => (
          <BButton key={idx} {...button} />
        ))}
      </div>
    </div>
  );
};

export const Ser_MST_ROComplaintDiagnosticErrorPage = () => {
  const { t } = useI18n("Ser_MST_ROComplaintDiagnosticError");
  const setLoad = useSetAtom(loadPanelAtom);
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<
    Partial<Ser_MST_ROComplaintDiagnosticErrorParams>
  >({
    // FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    ErrorCode: "",
    ErrorName: "",
    ErrorTypeCode: "",
  });
  const showError = useSetAtom(showErrorAtom);
  //==========================handle================================================
  const handleAddNew = () => {
    gridRef?.current?.addRow();
  };

  const handleRefetch = () => {
    gridRef?.current?.refetchData();
  };

  const onRefetchData = async (number?: number) => {
    gridRef.current?.refetchData();
  };

  const handleSearch = async (data: any) => {
    searchCondition.current = {
      ...searchCondition.current,
      ...data,
    };

    // await onRefetchData();
    gridRef.current?.refetchData();
  };
  //==========================handle-end================================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("ErrorCode"),
      dataField: "ErrorCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "ErrorName",
      caption: t("ErrorName"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "ErrorType",
      caption: t("ErrorType"),
      visible: true,
      editorType: "dxSelectBox",
      editorOptions: {
        searchEnabled: true,
        valueExpr: "value",
        displayExpr: "text",
        items: [
          {
            value: "",
            text: t("All"),
          },
          {
            value: "PN",
            text: "PN - Phàn nàn",
          },
          {
            value: "CD",
            text: "CD - Chẩn đoán",
          },
        ],
      },
    },
  ];


  const columns = useColumn({ data: [] ?? [] });

  const onModify = async (id: string, data: any) => {
    // const getData = gridRef.current.getDataByKeys(id)
    const dataSource = gridRef.current.getDxInstance().option("dataSource");
    const findObj = dataSource.find(
      (obj: any) => obj.ErrorCode === id
    ); // find object to update
    console.log(173, findObj)
    const respone = await api.Ser_MST_ROComplaintDiagnosticError_Save({
      ...findObj,
      ...data
    });
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
    // throw new Error(respone._strErrCode);
    // toast.warning("Chưa có api nhéeeeeeeeeeeeee!");
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
  const onDelete = async (data: any) => {
    ConfirmComponent({
      asyncFunction: async () => {
        setLoad(true)
        // console.log(213, data)
        const respone = await api.Ser_MST_ROComplaintDiagnosticError_Delete(
          data
        );
        if (respone.isSuccess) {
          setLoad(false)
          toast.success(t("Delete successfully!"));
          onRefetchData()
        } else {
          setLoad(false)
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
        }
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
        // } else if (type === "insert") {
        //   const data = e.changes[0].data!;
        //   e.promise = onCreate(data);
      } else if (type === "update") {
        e.promise = onModify(e.changes[0].key, e.changes[0].data!);
      }
    }
    e.cancel = true;
  };

  const api = useClientgateApi();
  const fetchData = async () => {
    console.log(261, gridRef?.current?.getDxInstance().pageIndex())
    const respone: any = await api.Ser_MST_ROComplaintDiagnosticError_Search({
      ...searchCondition.current,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });

    if (respone.isSuccess) {
      return respone;
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

  const formSettings = useFormSettings({
    columns,
  });

  const handleSubmit = () => {
    gridRef.current?.getDxInstance()?.saveEditData();
  };

  const handleCancel = () => {
    gridRef.current?.getDxInstance()?.cancelEditData();
  };

  const popupSettings: IPopupOptions = {
    showTitle: true,
    title: t("Ser_MST_ROComplaintDiagnosticError"),
    className: "dealer-information-popup",
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

  const rightButtons: BButtonProps[] = [
    {
      label: t(`${"Save"}`),
      className: "p-0 select-button",
      type: "normal",
      stylingMode: "outlined",
      // onClick: handleSend,
      render: () => {
        return <span> Hehehe </span>
      }
    },
    {
      label: t("Cancel"),
      className: "p-0 cancel-button",
      type: "normal",
      stylingMode: "outlined",
      onClick: () => {
        // navigate(-1);
      },
    },
  ];

  const handleDeleteMulti = (e: any) => {
    // console.log(355, gridRef.current.getDxInstance().getSelectedRowsData())
    onDelete(gridRef.current.getDxInstance().getSelectedRowsData())
    // console.log('ahihihihi')

  }


  const handleDelete = (e: any) => {
    // console.log(349, e.row.data)

    onDelete([e.row.data])
  }

  const handleExportExcel = async () => {
    const respone = await api.Ser_MST_ROComplaintDiagnosticError_ExportExcel(
      searchCondition.current
    );
    if (respone.isSuccess) {
      toast.success(t("Download successfully!"));
      window.location.href = respone.Data!;
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
  return (
    <AdminContentLayout>
      <AdminContentLayout.Slot name="Header">
        <HeaderPart
          handleExportExcel={handleExportExcel}
          onAddNew={handleAddNew}
          searchCondition={searchCondition.current}
          handleRefetch={handleRefetch}
          rightButtons={rightButtons}
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
                    storeKey={"Ser_MST_ROComplaintDiagnosticError-search-panel"}
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
                  // onSelectionChanged={handleSelectionChanged}
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
                  // onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  // onEditorPreparing={handleEditorPreparing}
                  onRowDeleteBtnClick={handleDelete}
                  onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"ErrorCode"}
                  storeKey={
                    "Ser_MST_ROComplaintDiagnosticError-management-columns"
                  }
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout >
  );
};
