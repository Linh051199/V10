import { useI18n } from "@/i18n/useI18n";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { VisibilityControl, useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Button, Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SearchForm } from "./search-form";
import { ColumnOptions } from "@/types";
import { Icon } from "@/packages/ui/icons";
import { BButton } from "@/packages/components/buttons";
import { useClientgateApi } from "@/packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { Link } from "@/packages/components/link/link";
import { PopupAddNew } from "./popup-addnew";
import { PopupEdit } from "./popup-edit";
import { toast } from "react-toastify";
import { dataServiceItemsQuickEditAtom } from "../screen-atom";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";
import { EditorPreparingEvent } from "devextreme/ui/data_grid";

interface IPopupSearchServiceIemsProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  dataInputSearchRef: any;
  onSearch: any;
  searchFromData: any;
  gridMainRef: any;
  onChoose: (data: any) => void;
  onSelect: (data: any) => void;
}

export const PopupSearchServiceIems = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      dataInputSearchRef,
      onSearch,
      searchFromData,
      gridMainRef,
      onChoose,
      onSelect,
    }: IPopupSearchServiceIemsProps,
    popupRef: any
  ) => {
    console.log(" ~ searchFromData:", searchFromData);
    const { t } = useI18n("Ser_ServicePackageServiceItems_Search");
    const windowSize = useWindowSize();
    const api = useClientgateApi();

    const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
    const setDataServiceItemsQuickEdit = useSetAtom(
      dataServiceItemsQuickEditAtom
    );
    const setLoad = useSetAtom(loadPanelAtom);

    const showPopup = useVisibilityControl({ defaultVisible: visible });
    const showAddPopup = useVisibilityControl({ defaultVisible: false });
    const editAddPopup = useVisibilityControl({ defaultVisible: false });

    const gridRef = useRef<any>(null);
    const formRef = useRef<any>(null);

    const ref = useRef<any>(null);
    const addPopupRef = useRef<any>(null);
    const editPopupRef = useRef<any>(null);
    const searchCondition = useRef<Partial<any>>({
      SerCode: "",
      SerName: "",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    useEffect(() => {
      searchCondition.current = {
        ...searchCondition.current,
        SerName: dataInputSearchRef?.current?.props?.formData?.SerName,
      };
    });

    useImperativeHandle(popupRef, () => ({
      getGridViewOneRef() {
        return gridRef;
      },
      show() {
        showPopup.open();
      },
      close() {
        showPopup.close();
      },
    }));

    //=============================callAPI===================================
    const fetchData = async () => {
      const resp = await api.Ser_MST_Service_SearchDL_Ser_ServicePackage({
        SerID: "",
        DealerCode: "",
        SerCode: searchFromData?.current?.SerCode ?? "",
        SerName: searchFromData?.current?.SerName ?? "",
        CustTypeID: "",
        IsActive: "",
        Ft_PageIndex: gridRef?.current?.getDxInstance().pageIndex() ?? 0,
        Ft_PageSize: gridRef?.current?.getDxInstance().pageSize() ?? 100,
      });

      return resp;
    };
    //=============================callAPI-end===================================

    //=============================handle===================================
    const handleClose = () => {
      searchCondition.current = {
        ...searchCondition.current,
        SerCode: "",
      };
      showPopup.close();
      onHidding();
    };
    const handleSelect = () => {
      const items = gridRef.current?.getSelectedRowsData();
      if (items.length === 0) {
        toast.warning(t("Please select items!!!"));
      } else {
        onSelect(items);
        handleClose();
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

    const renderSearchForm = useCallback(
      (control: VisibilityControl) => {
        return (
          <SearchForm
            formRef={formRef}
            data={searchFromData.current}
            onClose={() => control.close()}
            onSearch={handleSearch}
          />
        );
      },
      [searchFromData]
    );

    const handleAddNew = () => {
      addPopupRef?.current?.show();
    };

    const handleEditingStart = (e: any) => {
      setDataServiceItemsQuickEdit(e.data);
      editPopupRef.current.show();
    };

    //=============================handle-end===================================
    //=============================columns===================================
    const columns: ColumnOptions[] = [
      {
        dataField: "STT",
        caption: t("STT"),
        visible: true,
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },
      {
        dataField: "SerCode",
        caption: t("SerCode"),
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
        cellRender: (e: any) => {
          return (
            <Link
              label={e.value}
              onClick={() => {
                onChoose(e?.data);
              }}
            />
          );
        },
      },
      {
        dataField: "SerName",
        caption: t("SerName"),
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
        cellRender: (e: any) => {
          return (
            <Link
              label={e.value}
              onClick={() => {
                onChoose(e?.data);
              }}
            />
          );
        },
      },
      {
        dataField: "Model",
        caption: t("Model"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Price",
        caption: t("Price"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "VAT",
        caption: t("VAT"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
    ];

    const onRefetch = async (number?: number) => {
      gridRef?.current?.refetchData(number);
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
    const handleSavingRow = async (e: any) => {};
    //=============================columns-end===================================
    return (
      <Popup
        visible={showPopup.visible}
        title={t("PopupSearchServiceIems")}
        container={container}
        showCloseButton={true}
        wrapperAttr={{
          class: "popup-fill",
        }}
        onHiding={handleClose}
        height={windowSize.height - 100}
        width={windowSize.width - 150}
      >
        {/* <LoadPanel
            container={".dx-viewport"}
            shadingColor="rgba(0,0,0,0.4)"
            position={"center"}
            visible={isGetDataProvince}
            showIndicator={true}
            showPane={true}
          /> */}
        <WithSearchPanelLayout
          searchPanelRender={renderSearchForm}
          contentPanelRender={(control: VisibilityControl) => (
            <div className={"flex h-full justify-center"}>
              <div className="search-results">
                {/* <LoadPanel
                  visible={isLoading}
                  showIndicator={true}
                  showPane={true}
                /> */}
                <ScrollView className={" h-full"} showScrollbar={"always"}>
                  <GridViewOne
                    ref={gridRef}
                    keyExpr={"SerCode"}
                    fetchData={fetchData}
                    customHeight={windowSize.height - 270}
                    // defaultPageSize={999}
                    isLoading={false}
                    allowMultiRowDelete={false}
                    dataSource={[]}
                    editMode={true}
                    editingOptions={{
                      mode: "row",
                      allowDeleting: false,
                    }}
                    columns={columns}
                    onPageChanged={(number) => onRefetch(number ?? 0)}
                    onEditingStart={(e) => handleEditingStart(e)}
                    toolbarItems={[
                      {
                        location: "before",
                        render: () => (
                          <Button
                            visible={!control.visible}
                            stylingMode={"text"}
                            onClick={() => control.toggle()}
                          >
                            <Icon name={"search"} />
                          </Button>
                        ),
                      },
                      {
                        location: "before",
                        render: () => (
                          <BButton label={t("AddNew")} onClick={handleAddNew} />
                        ),
                      },
                    ]}
                    storeKey={"Ser_ServicePackageServiceItems_Search"}
                    allowSelection={false}
                    onSaving={handleSavingRow}
                    onEditorPreparing={handleEditorPreparing}
                  />
                </ScrollView>
              </div>
            </div>
          )}
        />
        <PopupAddNew
          ref={addPopupRef}
          visible={showAddPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            showAddPopup.close();
          }}
          handleSearch={handleSearch}
          gridRef={gridRef}
          formRefMain={formRef}
          searchFromData={searchFromData}
        />
        <PopupEdit
          ref={editPopupRef}
          visible={editAddPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            editAddPopup.close();
          }}
          gridRef={gridRef}
          handleSearch={handleSearch}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Select"),
            type: "default",
            stylingMode: "contained",
            onClick: handleSelect,
          }}
        />

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: handleClose,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
