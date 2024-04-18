import DataGrid, {
  Column,
  Item as ToolbarItem,
  Toolbar,
  Selection,
  Pager,
  Paging,
  ColumnFixing,
  Scrolling,
  StateStoring,
  HeaderFilter,
  Search,
} from "devextreme-react/data-grid";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { Button, LoadPanel, Tooltip } from "devextreme-react";
import { Icon } from "@packages/ui/icons";
import { useAtom } from "jotai";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { useI18n } from "@/i18n/useI18n";
import { match, P } from "ts-pattern";
import { PageSize } from "@packages/ui/page-size";
import { PageNavigator } from "@packages/ui/page-navigator";
import { nanoid } from "nanoid";
import { PagerSummary } from "@packages/ui/pager-summary";
import CustomColumnChooser from "@packages/ui/column-toggler/custom-column-chooser";
import { useVisibilityControl } from "@packages/hooks";
import { useSavedState } from "@packages/ui/base-gridview/components";
import "./business-grid.scss";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { differenceBy } from "lodash-es";
import dxDataGrid from "devextreme/ui/data_grid";
import { customLoad, customSave } from "@packages/common/custom-state-store";

interface BusinessGridProps {
  columns: ColumnOptions[];
  toolbarItems: ToolbarItemProps[];
  data: any[];
  onPageChanged: (pageIndex: number) => void;
  itemCount?: number;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  onPageSizeChanged: (pageSize: number) => void;
  storeKey: string;
  isLoading?: boolean;
  onSelectionChanged?: (e: any) => void;
  keyExpr?: string;
  customerHeight?: any;
}

export const BusinessGrid = forwardRef(
  (
    {
      columns,
      toolbarItems,
      data,
      onPageChanged,
      itemCount = 0,
      pageCount = 0,
      pageIndex = 0,
      pageSize = 100,
      onPageSizeChanged,
      storeKey,
      isLoading,
      keyExpr,
      onSelectionChanged,
      customerHeight,
    }: BusinessGridProps,
    ref: ForwardedRef<any>
  ) => {
    const { t } = useI18n("Common");
    const datagridRef = useRef<DataGrid | null>(null);
    const [searchPanelVisible, setSearchPanelVisible] = useAtom(
      searchPanelVisibleAtom
    );
    const summaryText = t("{0}-{1} in {2}");

    const allToolbarItems = [...toolbarItems];
    const onChangePageSize = (pageSize: number) => {
      datagridRef.current?.instance.pageSize(pageSize);
      onPageSizeChanged(pageSize);
    };

    const { saveState, loadState } = useSavedState<ColumnOptions[]>({
      storeKey: storeKey,
    });

    const [realColumns, setColumnsState] = useReducer(
      (state: ColumnOptions[], changes: ColumnOptions[]) => {
        // save changes into localStorage
        saveState(changes);
        return changes;
      },
      columns
    );

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
      }
    }, []);

    const onHiding = useCallback(() => {
      chooserVisible.close();
    }, []);
    const onApply = useCallback(
      (changes: any) => {
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
      [columns, saveState, datagridRef]
    );

    const setRef = (r: DataGrid | null) => {
      datagridRef.current = r;
      ref && (typeof ref === "function" ? ref(r) : (ref.current = r));
    };
    const chooserVisible = useVisibilityControl({ defaultVisible: false });
    const windowSize = useWindowSize();
    return (
      <DataGrid
        ref={(r) => setRef(r)}
        width={"100%"}
        dataSource={data}
        id="#gridContainer-searchGrid"
        columnAutoWidth
        columnResizingMode={"widget"}
        allowColumnResizing
        showColumnLines={true}
        hoverStateEnabled={true}
        showRowLines={true}
        showBorders={true}
        className={"dms-business-grid"}
        height={customerHeight ? customerHeight : windowSize.height - 150}
        keyExpr={keyExpr}
        onSelectionChanged={onSelectionChanged ? onSelectionChanged : () => {}}
      >
        <HeaderFilter visible={true} dataSource={data}>
          <Search enabled={true}></Search>
        </HeaderFilter>
        <LoadPanel visible={isLoading} />
        <Scrolling showScrollbar={"always"} />
        <ColumnFixing enabled={true} />
        <Paging enabled={true} defaultPageSize={pageSize} />
        <Pager visible={false} />
        <Selection
          mode="multiple"
          showCheckBoxesMode="always"
          selectAllMode="page"
        />
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
                <ToolbarItem
                  key={index}
                  location={item.location}
                  visible={item?.visible !== undefined ? item?.visible : true}
                >
                  {match(item.render)
                    .with(P.nullish, () => null)
                    .otherwise(() => item.render?.(ref))}
                </ToolbarItem>
              );
            })}
          <ToolbarItem location="after">
            <PageSize
              title={t("Showing")}
              onChangePageSize={onChangePageSize}
              allowdPageSizes={[100, 200, 500, 1000]}
              showAllOption={true}
              showAllOptionText={t("ShowAll")}
              defaultPageSize={pageSize}
            />
          </ToolbarItem>
          <ToolbarItem location={"after"}>
            <PagerSummary
              summaryTemplate={summaryText}
              currentPage={pageIndex}
              pageSize={pageSize}
              totalCount={itemCount}
            />
          </ToolbarItem>
          <ToolbarItem location="after">
            <PageNavigator
              itemCount={itemCount}
              currentPage={pageIndex}
              onPageChanged={onPageChanged}
              pageSize={datagridRef.current?.instance.pageSize() ?? 0}
              pageCount={pageCount ?? 0}
            />
          </ToolbarItem>
          <ToolbarItem location="after">
            <div
              id={"myColumnChooser"}
              className={"search-form__settings cursor-pointer"}
              onClick={() => chooserVisible.toggle()}
            >
              <Icon name={"setting"} width={14} height={14} />
              <Tooltip
                target="#myColumnChooser"
                showEvent="dxhoverstart"
                hideEvent="dxhoverend"
                container={"#myColumnChooser"}
              >
                {/*&nbsp; is required to make it display at top level*/}
                <div className={"z-[9999] "} style={{ zIndex: 9999 }}>
                  {t("ColumnToggleTooltip")}
                </div>
                &nbsp;
              </Tooltip>
            </div>
          </ToolbarItem>

          <ToolbarItem location={"after"}>
            <CustomColumnChooser
              title={t("ToggleColumn")}
              applyText={t("Apply")}
              cancelText={t("Cancel")}
              selectAllText={t("SelectAll")}
              container={"#root"}
              button={"#myColumnChooser"}
              visible={chooserVisible.visible}
              columns={columns}
              onHiding={onHiding}
              onApply={onApply}
              actualColumns={columns}
              gridInstance={datagridRef.current?.instance}
            />
          </ToolbarItem>
        </Toolbar>

        {realColumns.map((column: ColumnOptions) => {
          return <Column key={nanoid()} {...column} />;
        })}
        <StateStoring
          enabled={!!storeKey}
          type={"custom"}
          storageKey={storeKey}
          customLoad={() => {
            if (storeKey) {
              customLoad(storeKey, datagridRef);
            }
          }}
          customSave={(gridState: any) => {
            customSave(storeKey, gridState);
          }}
        />
      </DataGrid>
    );
  }
);
