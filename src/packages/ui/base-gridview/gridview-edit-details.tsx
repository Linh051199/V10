import { Button, DataGrid, LoadPanel, Tooltip } from "devextreme-react";
import {
  Button as DxButton,
  Column,
  ColumnChooser,
  ColumnFixing,
  Editing,
  HeaderFilter,
  IStateStoringProps,
  Item as ToolbarItem,
  Pager,
  Paging,
  Scrolling,
  Search,
  Selection,
  StateStoring,
  Toolbar,
} from "devextreme-react/data-grid";

import { PageSize } from "@packages/ui/page-size";
import CustomStore from "devextreme/data/custom_store";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import ScrollView from "devextreme-react/scroll-view";
import "./base-gridview.scss";

import { useI18n } from "@/i18n/useI18n";
import { logger } from "@/packages/logger";
import { useVisibilityControl } from "@packages/hooks";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { IFormOptions } from "devextreme-react/form";
import { IPopupOptions } from "devextreme-react/popup";
import {
  EditorPreparingEvent,
  OptionChangedEvent,
} from "devextreme/ui/data_grid";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import {
  gridStateAtom,
  normalGridDeleteMultipleConfirmationBoxAtom,
  normalGridDeleteSingleConfirmationBoxAtom,
  normalGridSelectionKeysAtom,
  normalGridSingleDeleteItemAtom,
} from "@packages/ui/base-gridview/store/normal-grid-store";
import { useSetAtom } from "jotai";
import {
  DeleteButton,
  DeleteMultipleConfirmationBox,
  DeleteSingleConfirmationBox,
  NormalGridPageNavigator,
  NormalGridPageSummary,
  useSavedState,
} from "./components";
import { Icon } from "@packages/ui/icons";
import { differenceBy } from "lodash-es";
import { customLoad, customSave } from "@packages/common/custom-state-store";
import { checkPermision } from "@/components/PermissionContainer";

interface GridViewProps {
  permissionEdit?: string;
  permissionSave?: string;
  permissionDelete?: string;
  permissionDeleteMulti?: string;
  defaultPageSize?: number;
  dataSource: CustomStore | Array<any>;
  columns: ColumnOptions[];
  allowSelection: boolean;
  ref: ForwardedRef<any>;
  onReady?: (ref: any) => void;
  allowInlineEdit?: boolean;
  inlineEditMode?: "row" | "popup" | "form" | "batch";
  onEditorPreparing?: (e: EditorPreparingEvent<any, any>) => void;
  onSaveRow?: (option: any) => void;
  isLoading?: boolean;
  keyExpr?: string | string[];
  onDeleteRows?: (rows: string[]) => Promise<void | boolean>;
  onSelectionChanged: (rowKeys: string[]) => void;
  popupSettings?: IPopupOptions;
  formSettings?: IFormOptions;
  toolbarItems?: ToolbarItemProps[];
  onEditRowChanges?: (changes: any) => void;
  storeKey?: string;
  stateStoring?: IStateStoringProps;
  isHideActionColumn?: boolean;
  isShowIconEdit?: boolean;
  isShowIconDelete?: boolean;
  isHideSelectionColumn?: boolean;
  customHeight?: string | number;
}

const GridViewRaw = ({
  permissionEdit,
  permissionDelete,
  permissionDeleteMulti,
  permissionSave,
  ref,
  defaultPageSize = 100,
  onEditorPreparing,
  onSaveRow,
  isLoading = false,
  keyExpr,
  onDeleteRows,
  onSelectionChanged,
  dataSource,
  columns,
  customHeight,
  onReady,
  inlineEditMode = "form",
  popupSettings,
  formSettings,
  toolbarItems,
  onEditRowChanges,
  storeKey,
  stateStoring,
  isShowIconEdit = true,
  isShowIconDelete = true,
  isHideActionColumn = false,
  isHideSelectionColumn = false,
}: GridViewProps) => {
  const datagridRef = useRef<DataGrid | null>(null);
  const windowSize = useWindowSize();
  const onChangePageSize = (pageSize: number) => {
    datagridRef?.current?.instance.pageSize(pageSize);
  };
  const onChangePageIndex = (pageIndex: number) => {
    datagridRef?.current?.instance.pageIndex(pageIndex);
  };

  const chooserVisible = useVisibilityControl({ defaultVisible: false });

  const { saveState, loadState } = useSavedState<ColumnOptions[]>({
    storeKey: storeKey,
  });

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
        datagridRef.current?.instance.columnOption(
          column.dataField!,
          "visible",
          false
        );
      }
      // update column with new index
      savedState.forEach((column: ColumnOptions, index: number) => {
        datagridRef.current?.instance.columnOption(
          column.dataField!,
          "visibleIndex",
          index + 1
        );
        datagridRef.current?.instance.columnOption(
          column.dataField!,
          "visible",
          true
        );
      });
      // setColumnsState(outputColumns);
    }
  }, []);
  const onHiding = useCallback(() => {
    chooserVisible.close();
  }, []);

  const onApply = useCallback(
    (changes: any) => {
      // we need check the order of column from changes set
      const shouldHideColumns = differenceBy<ColumnOptions, ColumnOptions>(
        columns,
        changes,
        "dataField"
      );
      for (let i = 0; i < shouldHideColumns.length; i++) {
        const column = shouldHideColumns[i];
        datagridRef.current?.instance.columnOption(
          column.dataField!,
          "visible",
          false
        );
      }
      // update column with new index
      changes.forEach((column: ColumnOptions, index: number) => {
        datagridRef.current?.instance.columnOption(
          column.dataField!,
          "visibleIndex",
          index + 1
        );
        datagridRef.current?.instance.columnOption(
          column.dataField!,
          "visible",
          true
        );
      });
      saveState(changes);
      chooserVisible.close();
    },
    [chooserVisible, saveState]
  );
  const setSelectionKeysAtom = useSetAtom(normalGridSelectionKeysAtom);
  const handleSelectionChanged = (e: any) => {
    setSelectionKeysAtom(e.selectedRowKeys);
    onSelectionChanged?.(e.selectedRowKeys);
  };

  const switchEditMode = (e: any, isOn: boolean) => {
    if (isOn) {
      e.component.option("sorting.mode", "none");
      e.component.option("headerFilter.visible", false);
    } else {
      e.component.option("sorting.mode", "single");
      e.component.option("headerFilter.visible", true);
    }
  };
  const handleEditingStart = (e: any) => {
    const editMode = e.component.option("dms_editMode");
    if (editMode) {
      e.cancel = true;
    } else {
      e.component.option("dms_editMode", true);
      switchEditMode(e, true);
    }
  };
  const handleEditCancelled = (e: any) => {
    e.component.option("dms_editMode", false);
    switchEditMode(e, false);
  };

  const handleSaved = (e: any) => {
    logger.debug("saved event:", e);
    switchEditMode(e, false);
  };

  const handleNewRow = (e: any) => {
    switchEditMode(e, true);
  };
  const { t } = useI18n("Common");

  const setRef = (ref: any) => {
    datagridRef.current = ref;
    onReady?.(ref);
  };

  const onCancelDelete = () => {
    setConfirmBoxVisible(false);
    setDeleteSingleConfirmBoxVisible(false);
  };
  const onDeleteSingle = async (key: string) => {
    setDeleteSingleConfirmBoxVisible(false);
    const result = await onDeleteRows?.([key]);
    if (result) {
      setDeletingId("");
      setSelectionKeysAtom([]);
    }
  };
  const onDeleteMultiple = async (keys: string[]) => {
    setConfirmBoxVisible(false);

    const result = await onDeleteRows?.(keys);
    if (result) {
      setSelectionKeysAtom([]);
    }
  };
  const setConfirmBoxVisible = useSetAtom(
    normalGridDeleteMultipleConfirmationBoxAtom
  );
  const handleConfirmDelete = () => {
    const editMode = datagridRef.current?.instance.option("dms_editMode");
    if (editMode) {
      return;
    }

    setConfirmBoxVisible(true);
  };

  const allToolbarItems: ToolbarItemProps[] = useMemo(() => {
    return [...(toolbarItems || [])];
  }, [chooserVisible, columns]);

  const handleEditorPreparing = (e: any) => {
    onEditorPreparing?.(e);
  };

  const setDeletingId = useSetAtom(normalGridSingleDeleteItemAtom);
  const setDeleteSingleConfirmBoxVisible = useSetAtom(
    normalGridDeleteSingleConfirmationBoxAtom
  );

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
        setDeleteSingleConfirmBoxVisible(true);

        // this one to clear `changes` set from grid.
        datagridRef.current?.instance.cancelEditData();
      }
    }
    //e.cancel = true;
  }, []);

  const handleOptionChanged = (e: OptionChangedEvent) => {
    // console.log("option changed", e);
    if (e.fullName.includes("filterValues")) {
      // console.log("data source", e.component.getDataSource().items())
      // console.log("filter values", e.component.getCombinedFilter())
    }
    // console.log("Grid state:", e.component.state())
    if (e.fullName.includes(".fixed")) {
    }
  };
  return (
    <div className={"base-gridview bg-white"}>
      <ScrollView showScrollbar={"always"}>
        <LoadPanel visible={isLoading} position={{ of: "#gridContainer" }} />
        <DataGrid
          keyExpr={keyExpr}
          errorRowEnabled={false}
          cacheEnabled={false}
          id="gridContainer"
          height={customHeight ? customHeight : windowSize.height - 110}
          width={"100%"}
          ref={(r) => setRef(r)}
          dataSource={dataSource}
          noDataText={t("ThereIsNoData")}
          remoteOperations={false}
          columnAutoWidth={true}
          repaintChangesOnly
          showBorders
          onOptionChanged={handleOptionChanged}
          onContentReady={(e) => {
            // console.log("event: contentReady");
            // setGridAtom({
            //   pageIndex: e.component.pageIndex() ?? 0,
            //   pageSize: e.component.pageSize() ?? 0,
            //   pageCount: e.component.pageCount() ?? 0,
            //   totalCount: e.component.totalCount() ?? 0,
            // });
          }}
          onInitialized={(e) => {
            // e.component?.option("headerFilter.visible", true);
            onReady?.(datagridRef.current);
          }}
          allowColumnResizing
          showColumnLines
          showRowLines
          columnResizingMode={"widget"}
          allowColumnReordering={false}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={handleEditorPreparing}
          //onEditCanceled={handleEditCancelled}
          //onEditingStart={handleEditingStart}
          //onSaved={handleSaved}
          //onInitNewRow={handleNewRow}
          //onSaving={innerSavingRowHandler}
        >
          <ColumnFixing enabled={true} />

          <Scrolling
            renderAsync={true}
            mode={"standard"}
            showScrollbar={"always"}
          />
          <Toolbar>
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
            useIcons={true}
            mode={inlineEditMode}
            allowUpdating={checkPermision(permissionEdit)}
            allowDeleting={checkPermision(permissionDelete)}
            allowAdding={true}
            popup={inlineEditMode === "popup" ? popupSettings : {}}
            form={formSettings ?? {}}
            confirmDelete={false}
            //selectTextOnEditStart={true}
            onChangesChange={onEditRowChanges ? onEditRowChanges : () => {}}
          ></Editing>
          <Column
            visible={!isHideActionColumn}
            type="buttons"
            width={100}
            fixed={false}
            allowResizing={false}
          >
            {isShowIconEdit && (
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="edit"
                icon={"/images/icons/edit.svg"}
              />
            )}
            {isShowIconDelete && (
              <DxButton
                cssClass={"mx-1 cursor-pointer"}
                name="delete"
                icon={"/images/icons/trash.svg"}
              />
            )}

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
          <Selection
            mode={isHideSelectionColumn ? "none" : "multiple"}
            selectAllMode="page"
          />
          {columns.map((col: any) => {
            const { headerFilter, ...rest } = col;
            return <Column key={col.dataField} {...rest}></Column>;
          })}
        </DataGrid>
      </ScrollView>
      <DeleteMultipleConfirmationBox
        title={t("Delete")}
        message={t("DeleteMultipleConfirmationMessage")}
        onYesClick={onDeleteMultiple}
        onNoClick={onCancelDelete}
      />
      <DeleteSingleConfirmationBox
        title={t("Delete")}
        message={t("DeleteSingleItemConfirmationMessage")}
        onYesClick={onDeleteSingle}
        onNoClick={onCancelDelete}
      />
    </div>
  );
};

export const GridviewEditDetails = forwardRef(
  (props: Omit<GridViewProps, "ref">, ref: any) => {
    return props.isLoading ? null : <GridViewRaw ref={ref} {...props} />;
  }
);
GridviewEditDetails.displayName = "GridviewEditDetails";
