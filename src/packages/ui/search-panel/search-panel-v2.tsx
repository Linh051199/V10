import { useI18n } from "@/i18n/useI18n";
import { searchPanelVisibleAtom } from "@layouts/content-searchpanel-layout";
import { useVisibilityControl } from "@packages/hooks";
import { useWindowSize } from "@packages/hooks/useWindowSize";
import { useSavedState } from "@packages/ui/base-gridview/components/use-saved-state";
import Form, {
  ButtonItem,
  ButtonOptions,
  GroupItem,
  IItemProps,
  SimpleItem,
} from "devextreme-react/form";
import { useSetAtom } from "jotai";
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
import { Header } from "./header";

import { ColumnOptions } from "@/types";
import FieldToggler from "@packages/ui/field-toggler/field-toggler";
import { useAtomValue } from "jotai";
import "./search-panel-v2.scss";

interface ItemProps extends IItemProps {
  order?: number;
}

interface SearchPanelProps {
  conditionFields: ItemProps[];
  data?: any;
  onSearch?: (data: any) => void;
  storeKey: string;
  enableColumnToggler?: boolean;
  isProcessing?: boolean;
  formRefWH?: any;
}

export const SearchPanelV2 = forwardRef(
  (
    {
      conditionFields = [],
      data,
      onSearch,
      storeKey,
      enableColumnToggler = true,
      isProcessing = false,
      formRefWH,
    }: SearchPanelProps,
    ref: ForwardedRef<Form>
  ) => {
    const { t } = useI18n("Common");
    const { loadState, saveState } = useSavedState<ColumnOptions[]>({
      storeKey: `search-panel-settings-${storeKey}`,
    });
    const searchPanelVisible = useAtomValue(searchPanelVisibleAtom);

    const [isLoading, setIsLoading] = useState(true);
    const [realColumns, setRealColumns] = useReducer(
      (state: any, changes: any) => {
        // save changes into localStorage
        saveState(changes);
        return changes;
      },
      conditionFields
    );

    useEffect(() => {
      // setIsLoading(true);
      const savedState = loadState();
      if (savedState) {
        // savedState is an array of ColumnOptions objects
        // we need merge this array with `columns` array.
        // which column exists in savedState will be set to be visible
        // otherwise will be hide
        const outputColumns = conditionFields.map((column: ColumnOptions) => {
          const filterResult = savedState.filter(
            (c: ColumnOptions) => c.dataField === column.dataField && c.visible
          );
          column.visible = filterResult.length > 0;
          return column;
        });
        setRealColumns(outputColumns);
      }
      // setIsLoading(false);
    }, []);

    const setSearchPanelVisible = useSetAtom(searchPanelVisibleAtom);
    const onToggleSettings = () => {
      settingPopupVisible.toggle();
    };
    const onClose = () => {
      setSearchPanelVisible(false);
    };
    const formRef = useRef<Form | null>(null);
    const settingPopupVisible = useVisibilityControl({ defaultVisible: false });
    const handleSearch = (e: any) => {
      const data = formRef.current?.instance?.option("formData");
      onSearch?.(data);
      e.preventDefault();
    };
    const items = useMemo(() => {
      return [...realColumns];
    }, [realColumns]);

    const handleApplySettings = useCallback((items: ItemProps[]) => {
      setRealColumns(items);
      settingPopupVisible.close();
    }, []);

    const handleCloseSearchSettings = useCallback(() => {
      settingPopupVisible.close();
    }, []);
    const windowSize = useWindowSize();
    const htmlFormRef = useRef(null);
    const setupRef = (r: any) => {
      if (r) {
        if (formRefWH) {
          formRefWH.current = r;
        }
        formRef.current = r;
        ref = r;
      }
    };

    return (
      <div
        className={`${searchPanelVisible
            ? "search-panel-visible-v2"
            : "search-panel-hidden-v2"
          }`}
        id={"search-panel-v2"}
      >
        <Header
          enableColumnToggler={enableColumnToggler}
          onCollapse={onClose}
          onToggleSettings={onToggleSettings}
        />
        <div>
          {/* <LoadPanel visible={isLoading} /> */}
          {/* {!isLoading && ( */}
          <form ref={htmlFormRef} className={"h-full"} onSubmit={handleSearch}>
            <Form
              id={"form-search"}
              ref={(r) => setupRef(r)}
              formData={data}
              labelLocation={"top"}
              colCount={1}
              validationGroup={"form"}
              height={windowSize.height - 210}
              className={"p-2 ml-2 pr-2 h-full w-full"}
              scrollingEnabled
            >
              <GroupItem cssClass="form-group-item-first-child">
                {items.map((item, idx) => {
                  return <SimpleItem key={idx} {...item} />;
                })}
              </GroupItem>

              <GroupItem cssClass="form-group-item-last-child">
                <ButtonItem
                  horizontalAlignment={"center"}
                  cssClass={"btn-search-v2"}
                >
                  <ButtonOptions
                    text={t("Search")}
                    icon={"search"}
                    stylingMode={"contained"}
                    width={"100%"}
                    type={"default"}
                    disabled={isProcessing}
                    useSubmitBehavior={true}
                  />
                </ButtonItem>
              </GroupItem>
            </Form>
          </form>
          {/*   )} */}
        </div>
        {enableColumnToggler && (
          <FieldToggler
            title={t("SearchPanelSettings")}
            applyText={t("Apply")}
            cancelText={t("Cancel")}
            selectAllText={t("SelectAll")}
            container={"body"}
            button={"#toggle-search-settings"}
            onHiding={handleCloseSearchSettings}
            onApply={handleApplySettings}
            visible={settingPopupVisible.visible}
            columns={conditionFields}
            actualColumns={realColumns}
            position={"left"}
            storeKey={storeKey}
          />
        )}
      </div>
    );
  }
);
