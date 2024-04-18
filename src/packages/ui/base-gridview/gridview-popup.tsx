import { Button, DataGrid, LoadPanel } from "devextreme-react";
import {
  Column,
  ColumnChooser,
  ColumnFixing,
  Button as DxButton,
  Editing,
  LoadPanel as GridLoadPanel,
  HeaderFilter,
  IStateStoringProps,
  Pager,
  Paging,
  Scrolling,
  Search,
  Selection,
  StateStoring,
  Texts,
  Toolbar,
  ToolbarItem,
} from "devextreme-react/data-grid";

import { PageSize } from "@packages/ui/page-size";
import CustomStore from "devextreme/data/custom_store";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import ScrollView from "devextreme-react/scroll-view";
import "./base-gridview.scss";

import { useI18n } from "@/i18n/useI18n";
import { logger } from "@/packages/logger";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { customLoad, customSave } from "@packages/common/custom-state-store";
import { useVisibilityControl } from "@packages/hooks";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { PopupGridPageNavigator } from "@packages/ui/base-gridview/components/popup-grid-page-navigator";
import { PopupGridPageSummary } from "@packages/ui/base-gridview/components/popup-grid-page-summary";
import { useSavedState } from "@packages/ui/base-gridview/components/use-saved-state";
import { popupGridStateAtom } from "@packages/ui/base-gridview/store/popup-grid-store";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { IFormOptions } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import {
  EditingStartEvent,
  EditorPreparingEvent,
} from "devextreme/ui/data_grid";
import { useAtom, useSetAtom } from "jotai";
import { differenceBy } from "lodash-es";
import { DeleteConfirmationBox } from "../modal";
import { checkPermision } from "@/components/PermissionContainer";
import { DeleteButton } from "./components";
import { normalGridSelectionKeysAtom } from "./store/normal-grid-store";

interface GridViewProps {
  permissionEdit?: string;
  permissionDelete?: string;
  permissionDeleteMulti?: string;
  defaultPageSize?: number;
  dataSource: CustomStore | Array<any>;
  columns: ColumnOptions[];
  allowSelection: boolean;
  ref: ForwardedRef<any>;
  onReady?: (ref: any) => void;
  allowInlineEdit?: boolean;
  onEditorPreparing?: (e: EditorPreparingEvent<any, any>) => void;
  onSaveRow?: (option: any) => void;
  isLoading?: boolean;
  keyExpr?: string | string[];
  onDeleteRows?: (rows: string[]) => void;
  onSelectionChanged: (rowKeys: string[]) => void;
  popupSettings?: IPopupOptions;
  formSettings?: IFormOptions;
  toolbarItems?: ToolbarItemProps[];
  onEditRowChanges?: (changes: any) => void;
  onEditingStart?: (e: EditingStartEvent) => void;
  stateStoring?: IStateStoringProps;
  storeKey: string;
  onEditRow?: (e: any) => void;
}

const GridViewRaw = ({
  permissionEdit,
  permissionDeleteMulti,
  permissionDelete,
  ref,
  onEditorPreparing,
  onSaveRow,
  isLoading = false,
  keyExpr,
  onDeleteRows,
  onSelectionChanged,
  dataSource,
  columns,
  onReady,
  allowInlineEdit = true,
  popupSettings,
  formSettings,
  toolbarItems,
  onEditRowChanges,
  onEditingStart,
  storeKey,
  onEditRow,
}: GridViewProps) => {
  const dataGridRef = useRef<DataGrid | null>(null);

  const popupSettingsMemo = useMemo(() => popupSettings, [popupSettings]);
  const formSettingsPopup = useRef<any>();
  useEffect(() => {
    formSettingsPopup.current = { ...formSettings };
  });
  const windowSize = useWindowSize();
  const onChangePageSize = (pageSize: number) => {
    dataGridRef.current?.instance.pageSize(pageSize);
  };
  const [visible, setVisible] = useState(false);

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({ storeKey });

  const [realColumns, setColumnsState] = useReducer(
    (state: any, changes: any) => {
      // save changes into localStorage
      // saveState(changes);
      return changes;
    },
    columns
  );
  const [isLoadingState, setIsLoadingState] = useState(true);
  // I want to restore columns from localStorage if it exists
  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
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
      setIsLoadingState(false);
    }
  }, []);

  const onHiding = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onApply = useCallback(
    (changes: any) => {
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
      setVisible(false);
    },
    [setColumnsState, setVisible]
  );

  const onToolbarPreparing = useCallback((e: any) => {
    e.toolbarOptions.items.push({
      widget: "dxButton",
      location: "after",
      options: {
        icon: "/images/icons/settings.svg",
        elementAttr: {
          id: "myColumnChooser",
        },
        onClick: () => setVisible(!visible),
      },
    });
  }, []);
  const [selectionKeys, setSelectionKeys] = useAtom(
    normalGridSelectionKeysAtom
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const handleSelectionChanged = useCallback((e: any) => {
    setSelectionKeys(e.selectedRowKeys);
    onSelectionChanged?.(e.selectedRowKeys);
  }, []);

  const handleEditingStart = useCallback((e: EditingStartEvent) => {
    logger.debug("e:", e);
    onEditingStart?.(e);
  }, []);
  const handleEditCancelled = useCallback(() => {}, []);

  const handleSaved = useCallback((e: any) => {
    logger.debug("saved event:", e);
  }, []);
  const handleAddingNewRow = () => {};

  const { t, tf } = useI18n("Common");
  let innerGridRef = useRef<DataGrid>(null);

  const setRef = (ref: any) => {
    dataGridRef.current = ref;
    innerGridRef = ref;
  };

  const onCancelDelete = useCallback(() => {}, []);
  const onDelete = useCallback(() => {
    onDeleteRows?.(selectionKeys);
  }, [selectionKeys]);
  const onDeleteSingle = useCallback(() => {
    if (deletingId) {
      onDeleteRows?.([deletingId]);
    }
  }, [deletingId]);
  const controlConfirmBoxVisible = useVisibilityControl({
    defaultVisible: false,
  });
  const controlDeleteSingleConfirmBox = useVisibilityControl({
    defaultVisible: false,
  });
  const handleConfirmDelete = useCallback(() => {
    controlConfirmBoxVisible.open();
  }, []);
  const handlePageChanged = useCallback((pageIndex: number) => {
    dataGridRef.current?.instance.pageIndex(pageIndex);
  }, []);
  const allToolbarItems: ToolbarItemProps[] = [
    ...(toolbarItems || []),

    {
      location: "after",
      render: () => {
        return (
          <PageSize
            title={t("Showing")}
            onChangePageSize={onChangePageSize}
            allowdPageSizes={[100, 200, 500, 1000, 3000, 5000]}
            showAllOption={true}
            showAllOptionText={t("ShowAll")}
            defaultPageSize={100}
          />
        );
      },
    },
    {
      location: "after",
      render: () => {
        return <PopupGridPageNavigator onPageChanged={handlePageChanged} />;
      },
    },
    {
      location: "after",
      render: () => {
        return <PopupGridPageSummary />;
      },
    },
    {
      location: "after",
      render: () => {
        return (
          <CustomColumnChooser
            title={t("ToggleColumn")}
            applyText={t("Apply")}
            cancelText={t("Cancel")}
            selectAllText={t("SelectAll")}
            container={"#root"}
            button={"#myColumnChooser"}
            visible={visible}
            columns={columns}
            actualColumns={realColumns}
            onHiding={onHiding}
            onApply={onApply}
            gridInstance={dataGridRef.current?.instance}
          />
        );
      },
    },
  ];

  const innerSavingRowHandler = useCallback((e: any) => {
    if (e.changes && e.changes.length > 0) {
      // we don't enable batch mode, so only 1 change at a time.
      const { type } = e.changes[0];
      if (type === "insert" || type === "update") {
        // pass handle to parent page
        onSaveRow?.(e);
      } else {
        // set selected keys, then open the confirmation
        setDeletingId(e.changes[0].key);

        // show the confirmation box of Delete single case
        controlDeleteSingleConfirmBox.open();

        // this one to clear `changes` set from grid.
        dataGridRef.current?.instance.cancelEditData();
      }
    }
    e.cancel = true;
  }, []);
  const setGridAtom = useSetAtom(popupGridStateAtom);
  return (
    <div className={"base-gridview bg-white"}>
      <ScrollView
        showScrollbar={"always"}
        height={windowSize.height - 50}
        className={"mb-5"}
      >
        <LoadPanel visible={isLoading} position={{ of: "#gridContainer" }} />
        <DataGrid
          keyExpr={keyExpr}
          errorRowEnabled={false}
          cacheEnabled={false}
          id="gridContainer"
          height={`${windowSize.height - 115}px`}
          width={"100%"}
          ref={(r) => setRef(r)}
          dataSource={dataSource}
          noDataText={t("There is no data")}
          remoteOperations={false}
          columnAutoWidth={true}
          repaintChangesOnly
          showBorders
          onInitialized={() => {
            onReady?.(dataGridRef);
          }}
          onContentReady={() => {
            setGridAtom({
              pageIndex: dataGridRef.current?.instance.pageIndex() ?? 0,
              pageSize: dataGridRef.current?.instance.pageSize() ?? 0,
              pageCount: dataGridRef.current?.instance.pageCount() ?? 0,
              totalCount: dataGridRef.current?.instance.totalCount() ?? 0,
            });
          }}
          allowColumnResizing
          showColumnLines
          showRowLines
          columnResizingMode={"widget"}
          onToolbarPreparing={onToolbarPreparing}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={onEditorPreparing}
          onEditingStart={handleEditingStart}
          onEditCanceled={handleEditCancelled}
          onSaved={handleSaved}
          onInitNewRow={handleAddingNewRow}
          onSaving={innerSavingRowHandler}
          onRowRemoved={(e: any) => {
            // to support custom delete confirmation
            e.cancel = true;
          }}
          onRowRemoving={(e: any) => {
            // to support custom delete confirmation
            e.cancel = true;
          }}
        >
          <ColumnChooser enabled={true} allowSearch={true} mode={"select"} />
          <ColumnFixing enabled={true} />
          <Pager visible={false} />
          <Paging enabled={true} defaultPageSize={100} />
          <HeaderFilter visible={true} dataSource={dataSource}>
            <Search enabled={true} />
          </HeaderFilter>
          <Toolbar>
            {/* {!!allToolbarItems &&
              allToolbarItems.map((item, index) => {
                return (
                  <ToolbarItem key={index} location={item.location}>
                    {item.widget === "dxButton" && <Button {...item.options} />}
                    {!!item.render && item.render()}
                  </ToolbarItem>
                );
              })} */}
            {!!allToolbarItems &&
              allToolbarItems.map((item, index) => {
                return (
                  <ToolbarItem key={index} location={item.location}>
                    {item.widget === "dxButton" && <Button {...item.options} />}
                    {!!item.render && item.render()}
                  </ToolbarItem>
                );
              })}
            <ToolbarItem
              location="before"
              visible={checkPermision(permissionDeleteMulti)}
            >
              <DeleteButton onClick={handleConfirmDelete} />
            </ToolbarItem>
          </Toolbar>
          <Editing
            mode={"popup"}
            useIcons={true}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
            popup={popupSettingsMemo}
            form={formSettingsPopup.current ?? {}}
            confirmDelete={false} // custom confirm delete dialog
            onChangesChange={onEditRowChanges}
          >
            <Texts
              confirmDeleteMessage={t("Are you sure to delete those records?")}
              ok={t("OK")}
              cancel={t("Cancel")}
            />
          </Editing>
          <Column
            visible={allowInlineEdit}
            type="buttons"
            width={110}
            fixed={false}
            allowResizing={false}
          >
            <DxButton
              visible={checkPermision(permissionEdit)}
              cssClass={"mx-1 cursor-pointer"}
              name="edit"
              icon={"/images/icons/edit.svg"}
              onClick={(e: any) => {
                onEditRow?.(e);
              }}
            />
            <DxButton
              visible={checkPermision(permissionDelete)}
              cssClass={"mx-1 cursor-pointer"}
              name="delete"
              icon={"/images/icons/trash.svg"}
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
          <Selection mode="multiple" selectAllMode="page" />
          <Scrolling
            renderAsync={true}
            mode={"standard"}
            showScrollbar={"always"}
            rowRenderingMode={"standard"}
          />
          <GridLoadPanel enabled={true} />
          {columns.map((col: any) => (
            <Column key={col.dataField} {...col} allowSorting={true} />
          ))}
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
                customSave(storeKey, gridState);
              }
            }}
            key={storeKey}
          />
        </DataGrid>
      </ScrollView>
      <DeleteConfirmationBox
        control={controlConfirmBoxVisible}
        title={t("Are you sure to delete selected records")}
        onYesClick={onDelete}
        onNoClick={onCancelDelete}
      />
      <DeleteConfirmationBox
        control={controlDeleteSingleConfirmBox}
        title={tf("Are you sure to delete this {0} record?", deletingId)}
        onYesClick={onDeleteSingle}
        onNoClick={onCancelDelete}
      />
    </div>
  );
};

export const GridViewPopup = forwardRef(
  (props: Omit<GridViewProps, "ref">, ref: any) => {
    if (props.isLoading) {
      return null;
    } else {
      return <GridViewRaw ref={ref} {...props} />;
    }
  }
);
GridViewPopup.displayName = "GridViewPopup";
