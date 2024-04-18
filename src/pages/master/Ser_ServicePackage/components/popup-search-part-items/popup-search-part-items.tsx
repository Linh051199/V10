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
import { dataPartItemsQuickEditAtom } from "../screen-atom";
import { useQuery } from "@tanstack/react-query";

interface IPopupSearchPartItemsProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  dataInputSearchRef: any;
  onSearch: any;
  gridMainRef: any;
  onChoose: (data: any) => void;
  onSelect: (data: any) => void;
  searchFromData: any;
}

export const PopupSearchPartItems = forwardRef(
  (
    {
      visible,
      container,
      position,
      onHidding,
      dataInputSearchRef,
      onSearch,
      gridMainRef,
      onChoose,
      onSelect,
      searchFromData,
    }: IPopupSearchPartItemsProps,
    popupRef: any
  ) => {
    const { t } = useI18n("Ser_ServicePackagePartItems_Search");
    const windowSize = useWindowSize();
    const api = useClientgateApi();

    const showError = useSetAtom(showErrorAtom); // hiển thị lỗi
    const setDataPartItemsQuickEdit = useSetAtom(dataPartItemsQuickEditAtom);

    const showPopup = useVisibilityControl({ defaultVisible: visible });
    const showAddPopup = useVisibilityControl({ defaultVisible: false });
    const editAddPopup = useVisibilityControl({ defaultVisible: false });

    const gridRef = useRef<any>(null);
    const formRef = useRef<any>(null);

    const ref = useRef<any>(null);
    const addPopupRef = useRef<any>(null);
    const editPopupRef = useRef<any>(null);
    const searchCondition = useRef<Partial<any>>({
      PartCode: "",
      VieName: "",
      Ft_PageIndex: 0,
      Ft_PageSize: 100,
    });

    useEffect(() => {
      searchCondition.current = {
        ...searchCondition.current,
        VieName: dataInputSearchRef?.current?.props?.formData?.VieName,
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

    //============================callAPI================================================
    const fetchData = async () => {
      const resp = await api.Ser_MST_Part_SearchDL({
        PartID: "",
        PartCode: searchFromData?.current?.PartCode ?? "",
        EngName: "",
        VieName: searchFromData?.current?.VieName ?? "",
        CusTypeID: "",
        FreqUsed: "",
        IsActive: "",
        PartGroupID: "",
        Ft_PageIndex: 0,
        Ft_PageSize: 100,
      });
      return resp;
    };
    const { data: listPartTypeID } = useQuery(
      ["Ser_ServicePackagePartItems_Search-listPartTypeID"],
      async () => {
        const resp = await api.Ser_ServicePackage_Ser_MST_PartType({
          PartTypeID: "",
          TypeName: "",
          IsActive: "1",
        } as any);
        if (resp.isSuccess) {
          // return [
          //   {
          //     PartTypeID: "",
          //     TypeName: "All",
          //   },
          //   ...(resp.DataList as any[]),
          // ];
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
    const { data: listPartGroupID } = useQuery(
      ["Ser_ServicePackagePartItems_Search-Ser_MST_PartGroup"],
      async () => {
        const resp =
          await api.Ser_ServicePackage_Ser_MST_PartGroup_GetAllActive();
        if (resp.isSuccess && resp.DataList) {
          // return [
          //   {
          //     PartGroupID: "",
          //     GroupCode: "All",
          //     GroupName: "Tất cả",
          //   },
          //   ...resp.DataList,
          // ];
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
    //============================callAPI-end================================================

    //=============================handle===================================
    const handleClose = () => {
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
      [searchFromData.current]
    );

    const handleAddNew = () => {
      addPopupRef?.current?.show();
    };

    const handleEditingStart = (e: any) => {
      setDataPartItemsQuickEdit(e.data);
      editPopupRef.current.show();
    };
    const onRefetch = async (number?: number) => {
      gridRef?.current?.refetchData(number);
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
        dataField: "PartCode",
        caption: t("PartCode"),
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
        dataField: "VieName",
        caption: t("VieName"),
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
        dataField: "EngName",
        caption: t("EngName"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Unit",
        caption: t("Unit"),
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
      {
        dataField: "Model",
        caption: t("Model"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "InStockQuantity",
        caption: t("InStockQuantity"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
    ];
    //=============================columns-end===================================
    return (
      <Popup
        visible={showPopup.visible}
        title={t("PopupSearchPartItems")}
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
              <div className="search-results  h-full">
                {/* <LoadPanel
                  visible={isLoading}
                  showIndicator={true}
                  showPane={true}
                /> */}
                <ScrollView className={" h-full"} showScrollbar={"always"}>
                  <GridViewOne
                    ref={gridRef}
                    fetchData={fetchData}
                    keyExpr={"PartCode"}
                    customHeight={windowSize.height - 270}
                    isLoading={false}
                    allowMultiRowDelete={false}
                    dataSource={[]}
                    editMode={true}
                    onPageChanged={(number) => onRefetch(number ?? 0)}
                    editingOptions={{
                      mode: "row",
                      allowDeleting: false,
                    }}
                    // defaultPageSize={999}
                    columns={columns}
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
                    storeKey={"Ser_ServicePackagePartItems_Search"}
                    allowSelection={false}
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
          listPartGroupID={listPartGroupID}
          listPartTypeID={listPartTypeID}
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
          listPartGroupID={listPartGroupID}
          listPartTypeID={listPartTypeID}
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
