import PermissionContainer from "@/components/PermissionContainer";
import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useVisibilityControl } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { FlagActiveEnum, SearchParam } from "@/packages/types";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { SearchPanelV2 } from "@/packages/ui/search-panel";
import { StatusButton } from "@/packages/ui/status-button";
import { DataGrid, LoadPanel } from "devextreme-react";
import { IItemProps } from "devextreme-react/form";
import { useRef } from "react";
import { toast } from "react-toastify";
import { HeaderPart } from "../components/header-part";

export const Mst_CompartmentPage = () => {
  const { t } = useI18n("Mst_Compartment");

  const loadingControl = useVisibilityControl({ defaultVisible: false });

  const api = useClientgateApi();
  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<SearchParam>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    KeyWord: "",
  });

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
  const searchConditions: IItemProps[] = [];
  //==========================searchConditions-end================================================
  const columns: any = [
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
      dataField: "CompartmentCode",
      caption: t("CompartmentCode"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "CompartmentName",
      caption: t("CompartmentName"),
      editorType: "dxTextBox",
      visible: true,
    },
    {
      dataField: "FlagActive",
      caption: t("FlagActive"),
      allowFiltering: false,
      editorType: "dxSwitch",
      dataType: "string",
      visible: true,
      width: 135,
      cellRender: ({ data }: any) => {
        return <StatusButton isActive={data.FlagActive} />;
      },
    },
  ];
  // const columns = useDealerGridColumns({ data: data?.DataList ?? [] });

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
  const onCreate = async (data: any & { __KEY__: string }) => {};
  const onDelete = async (id: string) => {};

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

  const fetchData = async () => {
    const resp: any = await api.Mst_Compartment_Search(searchCondition.current);

    resp.DataList = resp.DataList.sort(
      (a, b) => b.CompartmentCode - a.CompartmentCode
    );

    console.log(
      resp.DataList.sort((a, b) => a.CompartmentCode - b.CompartmentCode)
    );

    return resp;
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
              permission={""}
              children={
                <div className={"w-[300px]"}>
                  <SearchPanelV2
                    conditionFields={searchConditions}
                    data={searchCondition}
                    onSearch={handleSearch}
                    storeKey={"any-search-panel"}
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
                  editMode={false}
                  isHiddenCheckBox={true}
                  editingOptions={{
                    mode: "row",
                    // form: formSettings,
                    // popup: popupSettings,
                  }}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  onSaving={handleSavingRow}
                  // onEditorPreparing={handleEditorPreparing}
                  // onRowDeleteBtnClick={handleDelete}
                  // onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"CompartmentCode"}
                  storeKey={"Mst_Compartment-management-columns"}
                />
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
