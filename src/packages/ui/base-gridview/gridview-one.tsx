import {
  Button,
  CheckBox,
  DataGrid,
  SelectBox,
  Tooltip,
} from "devextreme-react";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Button as DxButton,
  Editing,
  HeaderFilter,
  IEditingProps,
  IStateStoringProps,
  Pager,
  Paging,
  Scrolling,
  Search,
  Selection,
  StateStoring,
  Toolbar,
  Item as ToolbarItem,
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import {
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import "./base-gridview.scss";

import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@packages/hooks";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import {
  CellClickEvent,
  ContentReadyEvent,
  EditCanceledEvent,
  EditingStartEvent,
  EditorPreparingEvent,
  FocusedCellChangingEvent,
  InitNewRowEvent,
  RowClickEvent,
  RowDblClickEvent,
  RowRemovedEvent,
  RowRemovingEvent,
  SavedEvent,
  SavingEvent,
} from "devextreme/ui/data_grid";
import { differenceBy } from "lodash-es";

import { useSavedState } from "@packages/ui/base-gridview/components/use-saved-state";
import { useAtom, useSetAtom } from "jotai";
// import {
//   GridCustomerToolBarItem,
//   GridCustomToolbar,
// } from "";
import { Icon } from "@/packages/ui/icons";
import {
  dataGridAtom,
  normalGridSelectionKeysAtom,
} from "../../components/gridview-standard/store/normal-grid-store";

import { customLoad, customSave } from "@/packages/common/custom-state-store";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { searchPanelVisibleAtom } from "@/packages/layouts/content-searchpanel-layout";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { nanoid } from "nanoid";
import { showDialog, simpleConfirm } from "../dialogs/dialog-utils";
import {
  GridCustomToolbar,
  GridCustomToolBarItem,
} from "./components/grid-custom-toolbar";
import { GridviewOnePager } from "./components/gridview-one-pager";
import { GridViewMultiEditPopup } from "./gridview-multiedit-popup";
import { loadPanelAtom } from "@/packages/store/loadPanel-store";

const SelectionCheckBox = ({
  key,
  gridRef,
  rowIndex,
  isSelected,
}: {
  key: string;
  gridRef: RefObject<DataGrid>;
  rowIndex: number;
  isSelected: boolean;
}) => {
  return (
    <CheckBox
      defaultValue={isSelected}
      data-key={key}
      onValueChanged={(e: any) => {
        // console.log("select event:", e, gridRef);
        const { component, value, previousValue } = e;
        if (value) {
          gridRef.current?.instance?.selectRowsByIndexes([rowIndex]);
        } else {
          gridRef.current?.instance?.selectRowsByIndexes([]);
        }

        setTimeout(() => {
          gridRef.current?.instance.refresh();
        }, 0);
      }}
    />
  );
};

interface GridViewProps {
  id?: string;
  isHiddenCheckBox?: boolean;
  isHidenHeaderFilter?: boolean;
  enablePaging?: "auto" | "no" | "yes";
  defaultPageSize?: number;
  dataSource: CustomStore | Array<any> | any;
  onSetItemValue?: (item: any) => void;
  columns: ColumnOptions[];
  allowSelection: boolean;
  onReady?: (ref: any) => void;
  allowInlineEdit?: boolean;
  inlineEditMode?: "row" | "popup" | "form" | "batch";
  allowMultiRowEdit?: boolean;
  allowMultiRowDelete?: boolean;

  onEditorPreparing?: (e: EditorPreparingEvent<any, any>) => void;
  onSaveRow?: (option: any) => void;
  isLoading?: boolean;
  fetchData?: any;
  allowCheckDeleteConfirm?: boolean;
  autoFetchData?: boolean;
  keyExpr?: string | string[];
  onDeleteRows?: (rows: string[]) => void;
  onSelectionChanged?: (rowKeys: string[]) => void;
  editingOptions?: IEditingProps;
  onCellClick?: (e: CellClickEvent) => void;
  toolbarItems?: ToolbarItemProps[];
  customToolbarItems?: GridCustomToolBarItem[];
  onEditRowChanges?: (changes: any) => void;
  onEditingStart?: (e: EditingStartEvent) => void;
  onEditCanceled?: (e: EditCanceledEvent) => void;
  onSaved?: (e: SavedEvent) => void;
  onInitNewRow?: (e: InitNewRowEvent) => void;
  onSaving?: (e: SavingEvent) => void;
  onRowRemoved?: (e: RowRemovedEvent) => void;
  onRowRemoving?: (e: RowRemovingEvent) => void;
  onPageChanged?: (pageIndex: number) => void;
  stateStoring?: IStateStoringProps;
  storeKey: string;
  onRowEditBtnClick?: (e: any) => void;
  onRowDeleteBtnClick?: (e: any) => void;
  onDeleteMultiBtnClick?: (e: any) => void;
  onRowClick?: (e: RowClickEvent) => void;
  onRowDblClick?: (e: RowDblClickEvent) => void;
  onContentReady?: (e: ContentReadyEvent) => void;
  onFocusedCellChanging?: (e: FocusedCellChangingEvent) => void;
  focusedRowEnabled?: boolean;
  isSingleSelection?: boolean;
  editMode?: boolean;
  isShowEditCard?: boolean;
  hidenTick?: boolean;
  cssClass?: string;
  locationCustomToolbar?: "center" | "before" | "after";
  customHeight?: number | string;
  checkData?: any;
  children?: any;
  isSingleSelectionNotCheckbbox?: boolean;
}

export const GridViewOne = forwardRef(
  (
    {
      cssClass,
      onEditorPreparing,
      onSaveRow,
      isLoading = false,
      fetchData,
      autoFetchData = false,
      onFocusedCellChanging,
      focusedRowEnabled,
      keyExpr,
      onDeleteRows,
      onRowClick,
      onContentReady,
      onSelectionChanged,
      onRowDblClick,
      dataSource,
      allowCheckDeleteConfirm = false,
      onSetItemValue,
      columns,
      isHidenHeaderFilter = false,
      enablePaging = "auto",
      defaultPageSize = 100,
      onReady,
      inlineEditMode = "popup",
      allowMultiRowEdit,
      allowMultiRowDelete = true,
      allowInlineEdit = true,
      editingOptions,
      toolbarItems,
      onEditRowChanges,
      onEditingStart,
      onEditCanceled,
      onSaved,
      onInitNewRow,
      onSaving,
      onRowRemoved,
      onRowRemoving,
      onPageChanged,

      storeKey,
      onCellClick,
      onRowEditBtnClick,
      onRowDeleteBtnClick,
      onDeleteMultiBtnClick,
      editMode = false,
      customToolbarItems,
      isSingleSelection = false,
      isShowEditCard = false,
      isHiddenCheckBox = false,
      locationCustomToolbar,
      customHeight = 0,
      isSingleSelectionNotCheckbbox = false,

      id = "GridviewOne",
      checkData,
      children,
    }: GridViewProps,
    ref: any
  ) => {
    // const setHidenMore = useSetAtom(hidenMoreAtom);

    const { t: common } = useI18n("Common");
    const setLoad = useSetAtom(loadPanelAtom);
    let dataGridRef = useRef<DataGrid | null>(null);
    let pagerRef = useRef<any>(null);
    const setDataGrid = useSetAtom(dataGridAtom);
    const [pagerVisible, showPaging] = useState(
      enablePaging == "no" ? false : true
    );

    const baseClientId = useMemo(() => {
      return nanoid();
    }, []);
    //const formSettingsPopup = useRef<any>();

    useEffect(() => {
      setDataGrid(dataGridRef);

      //console.log(272, children)
    }, []);

    //const editMultiRef = useRef<any>(null);

    const selectionDivRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const customToolbarRef = useRef<any>(null);

    const [searchPanelVisible, setSearchPanelVisible] = useAtom(
      searchPanelVisibleAtom
    );
    const windowSize = useWindowSize();

    const refreshGrid = () => {
      setTimeout(() => {
        dataGridRef.current?.instance.refresh();
      }, 0);
    };
    const onChangePageSize = (pageSize: number) => {
      let change = true;
      if (
        dataGridRef.current?.instance.pageIndex() == 0 &&
        (!data || data.length == 0)
      ) {
        change = false;
      }
      dataGridRef.current?.instance.pageIndex(0);
      dataGridRef.current?.instance.pageSize(pageSize);

      pagerRef.current?.setData({
        pageIndex: 0,
        pageSize: pageSize,
        pageCount: 0,
        totalCount: 0,
        ref: dataGridRef.current,
      });

      if (change) handlePageChanged(0);
    };
    const [visible, setVisible] = useState(false);
    const { saveState, loadState } = useSavedState<ColumnOptions[]>({
      storeKey,
    });
    const chooserVisible = useVisibilityControl({ defaultVisible: false });
    // const [realColumns, setColumnsState] = useReducer(
    //   (state: any, changes: any) => {
    //     // save changes into localStorage
    //     saveState(changes);
    //     return changes;
    //   },
    //   columns
    // );

    const defaultEditingOptions: IEditingProps = {
      mode: "popup",
      useIcons: true,
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: false,

      // allowUpdating={false}
      // allowDeleting={false}
      // allowAdding={false}
      popup: {},
      form: {},
      confirmDelete: false, // custom confirm delete dialog,
    };

    const editingOptionsApply = useMemo(() => {
      var ret = { ...defaultEditingOptions, ...editingOptions };
      return ret;
    }, [editingOptions]);

    // I want to restore columns from localStorage if it exists
    useEffect(() => {
      const savedState = loadState();
      if (savedState) {
        // we need check the order of column from changes set
        const shouldHideColumns = differenceBy<ColumnOptions, ColumnOptions>(
          columns,
          savedState,
          "dataField"
        );
        for (let i = 0; i < shouldHideColumns.length; i++) {
          const column = shouldHideColumns[i];
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visible",
            false
          );
        }
        // update column with new index
        savedState.forEach((column: ColumnOptions, index: number) => {
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visibleIndex",
            index + 1
          );
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visible",
            true
          );
        });
        // setColumnsState(outputColumns);
      }
    }, [columns]);

    const onHiding = useCallback(() => {
      chooserVisible.close();
    }, []);

    const onApply = useCallback(
      (changes: any) => {
        chooserVisible.close();
        // we need check the order of column from changes set
        const shouldHideColumns = differenceBy<ColumnOptions, ColumnOptions>(
          columns,
          changes,
          "dataField"
        );
        for (let i = 0; i < shouldHideColumns.length; i++) {
          const column = shouldHideColumns[i];
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visible",
            false
          );
        }
        // update column with new index
        changes.forEach((column: ColumnOptions, index: number) => {
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visibleIndex",
            index + 1
          );
          dataGridRef.current?.instance.columnOption(
            column.dataField!,
            "visible",
            true
          );
        });
        saveState(changes);
      },
      [chooserVisible, saveState]
    );

    const onToolbarPreparing = useCallback((e: any) => {
      e.toolbarOptions.items.push({
        widget: "dxButton",
        location: "after",
        visible: false,
        options: {
          icon: "/images/icons/settings.svg",
          elementAttr: {
            id: "myColumnChooser",
          },
          onClick: () => setVisible(!visible),
        },
      });

      setTimeout(() => {
        customToolbarRef.current?.refresh(dataGridRef.current);
      }, 0);
    }, []);
    const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
    const [selectionKeys, setSelectionKeys] = useState<string[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleSelectionChanged = useCallback((e: any) => {
      if (editMode) {
        let keys = dataGridRef.current?.instance.getSelectedRowKeys();
        if (keys && keys.length > 0)
          selectionDivRef.current.style.display = "block";
        else selectionDivRef.current.style.display = "none";
      }
      //setHidenMore(e.selectedRowKeys);
      //setSelectionKeysAtom(e.selectedRowKeys);

      // console.log("e.isSingleSelection", e.selectedRowKeys);
      //setSelectionKey(e.selectedRowKeys);
      //setSelectionKeys(e.selectedRowKeys);
      onSelectionChanged?.(e);

      customToolbarRef.current?.refresh(dataGridRef.current);
    }, []);

    const handleDeleteMultiBtnClicked = (e: any) => {
      // return showConfirmDialog({
      //   message: "ok", title: "kk", t: t, yes: () => {
      //     alert('yes clicked')
      //   }
      // });
      if (onDeleteMultiBtnClick) return onDeleteMultiBtnClick(e);

      return simpleConfirm(
        common("Do you want to delete selected items?"),
        () => {
          let rows = dataGridRef.current?.instance.getVisibleRows();

          var list = getGridDataInner();

          if (rows && list && rows.length == list.length) {
            var row;
            for (var i = rows.length - 1; i >= 0; --i) {
              row = rows[i];
              if (row.isSelected) {
                list.splice(row.rowIndex, 1);
              }
            }
            setData(list);
          }
        }
      );
    };

    const [currentOption, setCurrentOption] = useState<string>("table");

    const switchEditMode = (e: any, isOn: boolean) => {
      if (isOn) {
        e.component.option("sorting.mode", "none");
        e.component.option("headerFilter.visible", false);
      } else {
        e.component.option("sorting.mode", "single");
        e.component.option("headerFilter.visible", true);
      }
    };

    const { t, tf } = useI18n("Common");

    const controlConfirmBoxVisible = useVisibilityControl({
      defaultVisible: false,
    });
    // const controlDeleteSingleConfirmBox = useVisibilityControl({
    //   defaultVisible: false,
    // });
    const listOption = [
      {
        display: t("Card View"),
        value: "card",
      },
      {
        display: t("Table View"),
        value: "table",
      },
    ];

    const handlePageChanged = useCallback((pageIndex: number) => {
      //console.log("pageIndex ", pageIndex);

      dataGridRef.current?.instance.pageIndex(pageIndex);
      onPageChanged?.(pageIndex);
      doFetchData();
    }, []);

    const allToolbarItems: ToolbarItemProps[] = [
      ...(toolbarItems || []),
      {
        location: locationCustomToolbar ? locationCustomToolbar : "before",
        render: () => (
          <GridCustomToolbar
            items={customToolbarItems}
            ref={customToolbarRef}
          />
        ),
      },
      isShowEditCard === true
        ? {
            location: "after",
            render: () => {
              return (
                <div className="flex items-center">
                  {t("Layout")}
                  <SelectBox
                    id={`custom-templates-${baseClientId}`}
                    dataSource={listOption}
                    displayExpr="display"
                    className="ml-2 w-[120px]"
                    valueExpr="value"
                    defaultValue={listOption[1].value}
                    onValueChanged={(e: any) => {
                      setCurrentOption(e.value);
                    }}
                  />
                </div>
              );
            },
          }
        : {},
      !isHidenHeaderFilter && pagerVisible
        ? {
            location: "after",
            render: () => {
              return (
                <>
                  {/* <PageSize
                  ref={pageSizeRef}
                  title={t("Showing")}
                  onChangePageSize={onChangePageSize}
                  allowdPageSizes={[1, 100, 200, 500, 1000, 3000, 5000]}
                  showAllOption={true}
                  showAllOptionText={t("ShowAll")}
                  defaultPageSize={100}
                />
                <PopupGridPageNavigator onPageChanged={handlePageChanged} />
                
                <PopupGridPageSummary /> */}

                  <GridviewOnePager
                    ref={pagerRef}
                    onPageSizeChanged={onChangePageSize}
                    allowedPageSizes={[10, 20, 100, 200, 500, 1000, 3000, 5000]}
                    data={{
                      pageIndex: 0,
                      pageCount: 0,
                      totalCount: 0,
                      pageSize: 100,
                    }}
                    onPageChanged={handlePageChanged}
                  ></GridviewOnePager>
                </>
              );
            },
          }
        : {},
    ];

    // const innerSavingRowHandler = useCallback((e: any) => {
    //   if (e.changes && e.changes.length > 0) {
    //     // we don't enable batch mode, so only 1 change at a time.
    //     const { type } = e.changes[0];
    //     if (type === "insert" || type === "update") {
    //       // pass handle to parent page
    //       onSaveRow?.(e);
    //     } else {
    //       // set selected keys, then open the confirmation
    //       setDeletingId(e.changes[0].key);
    //       // show the confirmation box of Delete single case
    //       controlDeleteSingleConfirmBox.open();

    //       // this one to clear `changes` set from grid.
    //       dataGridRef.current?.instance.cancelEditData();
    //     }
    //   }
    //   e.cancel = true;
    // }, []);

    const showInlineEditColumn = useMemo(() => {
      if (!allowInlineEdit) return false;
      if (
        editingOptions?.mode == "batch" &&
        editingOptions.allowDeleting === false
      )
        return false;
      return true;
    }, []);

    const [data, setDataSource] = useState<any>([]);
    useEffect(() => {
      if (dataSource) {
        setData(refineDataSource(dataSource));
      }

      if (
        enablePaging === "auto" &&
        pagerVisible &&
        editingOptions?.mode == "batch"
      )
        showPaging(false);
    }, []);

    const doFetchData = async () => {
      if (!fetchData) return false;

      fetchData(dataGridRef.current?.instance.pageIndex()).then((resp: any) => {
        setData(resp?.DataList);
        pagerRef.current?.setData({
          pageIndex: resp?.PageIndex ?? 0,
          pageSize: resp?.PageSize ?? 0,
          pageCount: resp?.PageCount ?? 0,
          totalCount: resp?.ItemCount ?? 0,
          ref: dataGridRef.current,
        });
        customToolbarRef.current?.refresh(dataGridRef.current);
        setLoad(false);
      });
      return true;
    };

    const setData = (data: any) => {
      dataGridRef.current?.instance.clearSelection();

      setDataSource(refineDataSource(data));

      refreshGrid();
    };

    useImperativeHandle(ref, () => ({
      refetchData(pageIndex?: number) {
        setLoad(true);
        if (!pageIndex) pageIndex = 0;
        dataGridRef.current?.instance.clearSelection();
        dataGridRef.current?.instance.pageIndex(pageIndex);

        doFetchData();
      },
      setData(data: any) {
        if (enablePaging === "auto" && pagerVisible) showPaging(false);
        setData(data);
      },

      setPageData(resp: any) {
        setData(resp?.DataList);
        if (enablePaging === "auto" && pagerVisible === false) showPaging(true);

        pagerRef.current?.setData({
          pageIndex: resp?.PageIndex ?? 0,
          pageSize: resp?.PageSize ?? 0,
          pageCount: resp?.PageCount ?? 0,
          totalCount: resp?.ItemCount ?? 0,
          ref: dataGridRef.current,
        });
        setLoad(false);
      },
      getVisibleData() {
        //saveEditingData();
        return getVisibleData();
      },
      getData() {
        //saveEditingData();
        return getGridDataInner();
      },

      saveEditingData() {
        return saveEditingData();
      },

      getSelectedRowsData() {
        return dataGridRef.current?.instance.getSelectedRowsData();
      },

      addRow() {
        dataGridRef.current?.instance.clearSelection();
        if (editingOptions?.mode == "batch") {
          saveEditingData();
          return addData([{}]);
        }
        return dataGridRef.current?.instance.addRow();
        // if (editingOptions?.mode == 'batch') {
        //   let rows = dataGridRef.current?.instance.getVisibleRows();
        //   let list = rows?.map(r => r.data);
        //   if (!list) list = [];
        //   list = [{}, ...list];
        //   setData(list);
        // }
        // else {
        //   dataGridRef.current?.instance.addRow();
        // }
      },
      async addData(data: any[]) {
        dataGridRef.current?.instance.clearSelection();

        //saveEditingData();
        dataGridRef.current?.instance.saveEditData().then(() => {
          addData(data);
        });
      },
      showEditMultiPopup() {
        handleMultiEditClick();
      },
      clearSelection() {
        dataGridRef.current?.instance.clearSelection();
      },
      getDxInstance() {
        return dataGridRef.current?.instance;
      },
    }));

    const refineData = (item: any) => {
      if (
        (editingOptions?.mode == "batch" && !keyExpr) ||
        keyExpr?.length == 0
      ) {
        if (!item._dxgridKey) item._dxgridKey = nanoid();
      }

      onSetItemValue?.(item);

      return item;
    };
    const refineDataSource = (dataSource: any) => {
      if (
        !!onSetItemValue ||
        (editingOptions?.mode == "batch" && !keyExpr) ||
        keyExpr?.length == 0
      ) {
        dataSource.forEach((e: any) => {
          refineData(e);
        });
      }

      return dataSource;
    };

    const getVisibleData = () => {
      let rows = dataGridRef.current?.instance.getVisibleRows();

      let ret = rows?.map((r) => r.data);

      return ret;
    };
    const saveEditingData = () => {
      var list = getVisibleData();
      // console.log(651, list);
      setData([...(list ?? [])]);
      //dataGridRef.current?.instance.saveEditData();

      return list;
    };

    const addData = (data: any[]) => {
      let list = dataGridRef.current?.instance.getDataSource().items();
      if (!list) list = [];
      list = [...data, ...list];

      setData(list);
    };
    const getGridDataInner = () => {
      return dataGridRef.current?.instance.getDataSource().items();
    };
    const handleMultiEditClick = () => {
      showDialog(({ onClose }) => (
        <GridViewMultiEditPopup
          columns={columns}
          onClose={onClose}
          onSubmit={(data: any) => {
            editMultiRows(data);
            onClose();
          }}
        />
      ));
    };

    useEffect(() => {
      if (autoFetchData) doFetchData();
    }, []);

    const setRef = (grref: any) => {
      dataGridRef.current = grref;

      // onReady?.(ref);
    };

    const editMultiRows = (data: any) => {
      if (data.ColName && data.Value) {
        var rows = dataGridRef.current?.instance.getVisibleRows();
        if (rows && rows.length > 0)
          for (var row of rows) {
            if (row.isSelected) {
              row.data[data.ColName] = data.Value;
            }
          }

        refreshGrid();
      }
    };

    // console.log("data ", data);

    return (
      <div className={"base-gridview grid-view-customize bg-white h-auto"}>
        <DataGrid
          className={"base-gridview grid-view-customize"}
          keyExpr={keyExpr ?? "_dxgridKey"}
          errorRowEnabled={false}
          cacheEnabled={false}
          id={id}
          onFocusedCellChanging={onFocusedCellChanging}
          height={customHeight ? customHeight : windowSize.height - 150}
          width={"100%"}
          ref={(r) => setRef(r)}
          dataSource={data}
          noDataText={checkData ? "" : t("There is no data")}
          remoteOperations={false}
          columnAutoWidth={true}
          repaintChangesOnly
          showBorders
          onInitialized={() => {
            // if (dataGridRef.current) {
            //   let cr = dataGridRef.current as any;
            //   cr.refetchData = () => {
            //     doFetchData();
            //   };
            // }

            customToolbarRef.current?.refresh(dataGridRef.current);

            onReady?.(dataGridRef);
          }}
          onContentReady={onContentReady}
          // onContentReady={() => {
          //   console.log("???????????????????????");
          //   setGridAtom({
          //     pageIndex: dataGridRef.current?.instance.pageIndex() ?? 0,
          //     pageSize: dataGridRef.current?.instance.pageSize() ?? 0,
          //     pageCount: dataGridRef.current?.instance.pageCount() ?? 0,
          //     totalCount: dataGridRef.current?.instance.totalCount() ?? 0,
          //     ref: dataGridRef.current,
          //   });
          // }}
          onRowClick={onRowClick}
          allowColumnResizing
          showColumnLines
          onCellClick={onCellClick}
          showRowLines
          focusedRowEnabled={focusedRowEnabled}
          columnResizingMode={"widget"}
          onToolbarPreparing={onToolbarPreparing}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={onEditorPreparing}
          onEditingStart={onEditingStart}
          onEditCanceled={onEditCanceled}
          onSaved={onSaved}
          onInitNewRow={onInitNewRow}
          onRowDblClick={onRowDblClick}
          onSaving={onSaving}
          onRowRemoved={onRowRemoved}
          onRowRemoving={onRowRemoving}
          loadPanel={{
            enabled: false,
          }}
          // stateStoring={stateStoring}
        >
          {/* <Scrolling mode="virtual" columnRenderingMode="virtual" /> */}
          <ColumnChooser enabled={true} mode={"select"}>
            <Search enabled={true}></Search>
          </ColumnChooser>
          <ColumnFixing enabled={true} />
          <Pager visible={false} />
          <Paging defaultPageSize={defaultPageSize} enabled={true} />
          <HeaderFilter visible={true}>
            <Search enabled={true}></Search>
          </HeaderFilter>

          <Toolbar>
            <ToolbarItem location="before" visible={!searchPanelVisible}>
              <Button
                stylingMode={"text"}
                onClick={() => setSearchPanelVisible(true)}
              >
                <div className="toggle__search mb-[1px]">
                  <Icon name={"search"} width={14} height={14} />
                </div>
              </Button>
            </ToolbarItem>
            {!!allToolbarItems &&
              allToolbarItems.map((item, index) => {
                return (
                  <ToolbarItem key={index} location={item.location}>
                    {item.widget === "dxButton" && <Button {...item.options} />}
                    {!!item.render && item.render()}
                  </ToolbarItem>
                );
              })}
            {editMode && (
              <ToolbarItem location="before" visible={true}>
                <div ref={selectionDivRef} style={{ display: "none" }}>
                  {allowMultiRowDelete && (
                    <Button
                      stylingMode={"contained"}
                      type={"default"}
                      text={t("Delete")}
                      onClick={handleDeleteMultiBtnClicked}
                    />
                  )}
                  {allowMultiRowEdit && (
                    <Button
                      stylingMode={"contained"}
                      type={"default"}
                      onClick={handleMultiEditClick}
                      text={t("Edit multi rows")}
                    />
                  )}
                </div>
              </ToolbarItem>
            )}

            <ToolbarItem location="after">
              <div
                id={`myColumnChooser_${baseClientId}`}
                className={"search-form__settings cursor-pointer"}
                onClick={() => chooserVisible.toggle()}
              >
                <Icon name={"setting"} width={14} height={14} />
                <Tooltip
                  target={`#myColumnChooser_${baseClientId}`}
                  showEvent="dxhoverstart"
                  hideEvent="dxhoverend"
                  container={`#myColumnChooser_${baseClientId}`}
                >
                  <div className={"z-[9999]"} style={{ zIndex: 9999 }}>
                    {t("ColumnToggleTooltip")}
                  </div>
                  &nbsp;
                </Tooltip>
              </div>
            </ToolbarItem>
            <ToolbarItem location="after">
              <CustomColumnChooser
                title={t("ToggleColumn")}
                applyText={t("Apply")}
                cancelText={t("Cancel")}
                selectAllText={t("SelectAll")}
                container={"#root"}
                button={`#myColumnChooser_${baseClientId}`}
                visible={chooserVisible.visible}
                columns={columns}
                onHiding={onHiding}
                onApply={onApply}
                actualColumns={columns}
                gridInstance={dataGridRef.current?.instance}
              />
            </ToolbarItem>
          </Toolbar>
          {editMode && (
            <Editing {...editingOptionsApply}>
              {/* <Texts
              confirmDeleteMessage={t("Are you sure to delete those records?")}
              ok={t("OK")}
              cancel={t("Cancel")}
            /> */}
            </Editing>
          )}
          {isSingleSelection && (
            <Column
              dataField={"SelectionCheckBox"}
              width={50}
              caption={t("")}
              showInColumnChooser={false}
              allowFiltering={false}
              allowSearch={false}
              allowResizing={false}
              cellRender={(e: any) => {
                const {
                  data,
                  row: { isSelected, rowIndex },
                  value,
                  key,
                } = e;
                return (
                  <SelectionCheckBox
                    isSelected={isSelected}
                    key={key}
                    gridRef={dataGridRef}
                    rowIndex={rowIndex}
                  />
                );
              }}
              dataType={"boolean"}
            ></Column>
          )}
          {editMode && (
            <Column
              visible={showInlineEditColumn}
              type="buttons"
              width={80}
              fixed={false}
              allowResizing={false}
            >
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="edit"
                icon={"/images/icons/edit.svg"}
                onClick={onRowEditBtnClick}
              />
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="delete"
                icon={"/images/icons/trash.svg"}
                onClick={(e: any) => {
                  if (onRowDeleteBtnClick) return onRowDeleteBtnClick(e);
                  if (allowCheckDeleteConfirm) {
                    return ConfirmComponent({
                      asyncFunction: async () => {
                        var list = getGridDataInner();
                        list?.splice(e.row.rowIndex, 1);
                        setData(list);
                      },
                      title: t("Confirm"),
                      contentConfirm: t("Do you want to delete?"),
                    });
                  } else {
                    var list = getGridDataInner();
                    list?.splice(e.row.rowIndex, 1);
                    setData(list);
                  }
                  //dataGridRef.current?.instance?.deleteRow(e.row.rowIndex);
                }}
              />
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="save"
                icon={"/images/icons/save.svg"}
              />
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="cancel"
                icon={"/images/icons/refresh.svg"}
              />
            </Column>
          )}

          <StateStoring
            enabled={!!storeKey}
            type={"custom"}
            customLoad={() => {
              if (storeKey) {
                customLoad(storeKey, dataGridRef);
              }
            }}
            customSave={(gridState: any) => {
              if (storeKey) {
                let newState = { columns: gridState.columns };
                customSave(storeKey, newState);
              }
            }}
            key={storeKey}
          />
          <Selection
            mode={
              !isHiddenCheckBox && !isSingleSelection
                ? "multiple"
                : isSingleSelectionNotCheckbbox
                ? "single"
                : "none"
            }
            selectAllMode="page"
          />
          {/* {isSingleSelection && <Selection mode={"none"} />} */}

          {!isHidenHeaderFilter && (
            <Scrolling
              renderAsync={true}
              mode={"standard"}
              showScrollbar={"always"}
              rowRenderingMode={"standard"}
            />
          )}
          {/* <GridLoadPanel enabled={true} /> */}
          {columns.map((col: any) => (
            <Column key={col.dataField} {...col}></Column>
          ))}

          {children}
        </DataGrid>
      </div>
    );
  }
);

GridViewOne.displayName = "GridViewOne";
