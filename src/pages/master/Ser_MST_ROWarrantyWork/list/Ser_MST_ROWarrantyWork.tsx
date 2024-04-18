import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { HeaderPart } from "../components/header-part";
import { useRef } from "react";
import { DataGrid, DateRangeBox, LoadPanel } from "devextreme-react";
import { FlagActiveEnum } from "@/packages/types";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import PermissionContainer from "@/components/PermissionContainer";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { IItemProps } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@/packages/hooks";
import { Ser_MST_ROComplaintDiagnosticErrorParams } from "@/packages/types/master/Ser_MST_ROComplaintDiagnosticError";
import { ColumnOptions } from "@/types";
import { DateRangeField } from "@/packages/components/date-range-field";
import { StatusButton } from "@/packages/ui/status-button";
import { useClientgateApi } from "@/packages/api";
import Ser_MST_ROWarrantyWorkPopup from "../Ser_MST_ROWarrantyWorkPopup";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { toast } from "react-toastify";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

export const Ser_MST_ROWarrantyWorkPage = () => {
  const { t } = useI18n("Ser_MST_ROWarrantyWork");
  const showError = useSetAtom(showErrorAtom);
  const loadingControl = useVisibilityControl({ defaultVisible: false });
  const setLoad = useSetAtom(loadPanelAtom);
  const api = useClientgateApi();
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<any>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    ROWWorkCode: "",
    ROWWorkName: "",
    Model: ""
  });
  const { t: common } = useI18n("Common");
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
  //==========================handle-end================================================

  //==========================searchConditions================================================
  const searchConditions: IItemProps[] = [
    {
      caption: t("ROWWorkCode"),
      dataField: "ROWWorkCode",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("ROWWorkName"),
      dataField: "ROWWorkName",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      caption: t("Model"),
      dataField: "Model",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
  ];
  //==========================searchConditions-end================================================
  const columns = [
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
      dataField: "ROWWorkCode",
      caption: t("ROWWorkCode"),
      editorType: "dxTextBox",
      classNames: '',
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      cellRender: ({ data }: any) => {
        return <span onClick={() => {
          gridUpdateFormRef.current.show()
          gridUpdateFormRef.current.getData(data)
        }}
          className="cursor-pointer hover:text-[#2da500]"
        >{data.ROWWorkCode}</span>
      },
    },
    {
      dataField: "ROWWorkName",
      caption: t("ROWWorkName"),
      editorType: "dxTextBox",

      visible: true,

      editorOptions: {
        readOnly: false,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Model",
      caption: t("Model"),
      editorType: "dxTextBox",

      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "RateHour",
      caption: t("RateHour"),
      editorType: "dxNumberBox",

      visible: true,
      editorOptions: {
        readOnly: false,
        max: 12,
        min: 0,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "RatePrice",
      caption: t("RatePrice"),
      editorType: "dxNumberBox",

      visible: true,
      editorOptions: {
        readOnly: false,
        max: 100000000,
        min: 0,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Price",
      caption: t("Price"),
      editorType: "dxNumberBox",

      visible: true,
      editorOptions: {
        readOnly: false,
        max: 100000000,
        min: 0,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "VAT",
      caption: t("VAT"),
      editorType: "dxNumberBox",

      visible: true,
      editorOptions: {
        readOnly: false,
        max: 100000000,
        min: 0,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "Remark",
      caption: t("Remark"),
      editorType: "dxTextBox",

      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "FlagActive",
      caption: t("FlagActive"),
      editorType: "dxTextBox",

      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
    {
      dataField: "MaCongViecHTV",
      caption: t("MaCongViecHTV"),
      editorType: "dxTextBox",

      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
  ];

  const fetchData = async () => {
    const resp: any = await api.Ser_MST_ROWarrantyWork_Search({
      ...searchCondition,
      Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
      Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
    });
    if (resp.isSuccess) {
      return resp;
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
  };

  const handleDeleteMulti = async () => {
    return ConfirmComponent({
      asyncFunction: async () => {
        setLoad(true)
        const selected = gridRef.current.getDxInstance().getSelectedRowsData()
        const condition = {
          Lst_Ser_MST_ROWarrantyWork: selected
        }
        const resp = await api.Ser_MST_ROWarrantyWork_Delete(condition)
        if (resp.isSuccess) {
          setLoad(false)
          toast.success(t('Delete successfully!'))
          onRefetchData()
        } else {
          setLoad(false)
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

      },
      title: common("Confirm"),
      contentConfirm: common("Do you want to delete selected items?"),
    });
  }


  let gridViewOneRef: any = useRef(null);
  const gridUpdateFormRef = useRef<any>(null);
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
                    storeKey={"QuanLyVideoTuVan-search-panel"}
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
                  onDeleteMultiBtnClick={(data: any) => {
                    // console.log(326, data)
                    handleDeleteMulti()
                  }}
                  editingOptions={{
                    mode: "popup",
                  }}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  keyExpr={"ROWWorkCode"}
                  storeKey={"Ser_MST_ROWarrantyWork-management-columns"}
                />
                <Ser_MST_ROWarrantyWorkPopup
                  orderListRef={gridRef}
                  ref={gridUpdateFormRef}
                  visible={false}
                  gridViewOneRef={gridViewOneRef}
                  onRefetch={handleRefetch}
                // code={getByFilePathVideoCodeCondition}
                />
              </>

            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout >
  );
};
