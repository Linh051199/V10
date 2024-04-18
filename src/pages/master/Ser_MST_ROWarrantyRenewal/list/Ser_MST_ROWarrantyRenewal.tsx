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

export const Ser_MST_ROWarrantyRenewalPage = () => {
  const { t } = useI18n("Ser_MST_ROWarrantyRenewal");

  const loadingControl = useVisibilityControl({ defaultVisible: false });


  let gridRef: any = useRef<DataGrid | null>(null);
  const searchCondition = useRef<Partial<Ser_MST_ROComplaintDiagnosticErrorParams>>({
    FlagActive: FlagActiveEnum.All,
    Ft_PageIndex: 0,
    Ft_PageSize: 100,
    KeyWord: "",
    Maloi: "",
    TenLoi: "",
    LoaiLoi: ""
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
  const searchConditions: IItemProps[] = [
    {
      caption: t("VIN"),
      dataField: "VIN",
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
    },
    {
      dataField: "NgayTaoFromTo",
      caption: t("NgayTaoFromTo"),
      editorType: "dxTextBox",
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
      },
      render: (param: any) => {
        const { dataField, component: formComponent } = param;
        const formData = formComponent.option("formData");
        const value = formData[dataField];
        return (
          <div className={"flex flex-row"}>
            <DateRangeBox
              elementAttr={{
                id: "checkAgainThisCode",
                class: "checkAgainThisCode",
              }}
              width={"100%"}
              className="dateRange ml-[12px]"
              displayFormat="yyyy-MM-dd"
              showClearButton={true}
              // defaultStartDate={formData[dataField][0]}
              // defaultEndDate={formData[dataField][1]}
              useMaskBehavior={true}
              openOnFieldClick={true}
              labelMode="hidden"
              applyButtonText={"OK"}
              cancelButtonText={"Cancel"}
              onValueChanged={(e: any) => {
                formComponent.updateData(dataField, e.value);
              }}
              validationMessageMode="always"
              validationMessagePosition={"top"}
            />
          </div>
        );
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
      dataField: "NgayTao",
      caption: t("NgayTao"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      // headerFilter: {
      //   dataSource: uniqueFilterByDataField(data?.DataList, "TenLoaiCongViec"),
      // },
      // validationRules: [requiredType, ExcludeSpecialCharactersType],
    },
    {
      dataField: "VIN",
      caption: t("VIN"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,

      editorOptions: {
        readOnly: false,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "MaHangMuc",
      caption: t("MaHangMuc"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        readOnly: true,
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "TenHangMuc",
      caption: t("TenHangMuc"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "GiaHanBaoHanhDen",
      caption: t("GiaHanBaoHanhDen"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
    {
      dataField: "GhiChu",
      caption: t("GhiChu"),
      editorType: "dxTextBox",
      width: 200,
      visible: true,
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
    },
  ];
  // const columns = useDealerGridColumns({ data: data?.DataList ?? [] });

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
                    storeKey={"dealer-search-panel"}
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
                  dataSource={[
                    {
                      MaLoi: "abc",
                      TenLoi: "abcccc"
                    }
                  ]} // cars
                  columns={columns}
                  // fetchData={fetchData}
                  // onSelectionChanged={handleSelectionChanged}
                  autoFetchData={true}
                  allowSelection={false}
                  isLoading={false}
                  customToolbarItems={[]}
                  editMode={true}
                  editingOptions={{
                    mode: "batch",
                    allowUpdating: true
                    // form: formSettings,
                    // popup: popupSettings,
                  }}
                  onPageChanged={(number) => onRefetchData(number ?? 0)}
                  // onSaving={handleSavingRow}
                  // onEditorPreparing={handleEditorPreparing}
                  // onRowDeleteBtnClick={handleDelete}
                  // onDeleteMultiBtnClick={handleDeleteMulti}
                  keyExpr={"VIN"}
                  storeKey={"Ser_MST_ROWarrantyRenewal-management-columns"}
                />
                {/* <DealerPopupView
                        onEdit={handleEdit}
                        formSettings={formSettings}
                      /> */}
              </>
            )}
          </ContentSearchPanelLayout.Slot>
        </ContentSearchPanelLayout>
      </AdminContentLayout.Slot>
    </AdminContentLayout>
  );
};
