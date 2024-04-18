import { useI18n } from "@/i18n/useI18n";
import { PagerSummary } from "@packages/ui/pager-summary";
import { SelectBox } from "devextreme-react";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { PageNavigator } from "../../page-navigator";

export interface GridviewPagerParams {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  ref?: any;
}
export const GridviewOnePager = forwardRef(
  (
    {
      data,
      allowedPageSizes,
      onPageChanged,
      onPageSizeChanged,
    }: {
      data: GridviewPagerParams;
      allowedPageSizes: number[];
      onPageChanged: (pageIndex: number) => void;
      onPageSizeChanged: (pageSize: number) => void;
    },
    ref: any
  ) => {
    const { t } = useI18n("Common");

    const summaryText = t("{0}-{1} in {2}");

    const [state, setState] = useState(data);

    useImperativeHandle(ref, () => ({
      setData(p: GridviewPagerParams) {
        setState(p);
      },
    }));

    let options = allowedPageSizes.map((item) => ({
      value: item,
      text: item + "",
    }));

    const handlePageChanged = useCallback((pageIndex: number) => {
      setState((old) => {
        return { ...old, pageIndex: pageIndex };
      });
      onPageChanged?.(pageIndex);
    }, []);

    return (
      <div className="flex items-center">
        <div className={"min-w-fit flex items-center PageSize"}>
          <label className={"mr-2"}>{t("Showing")}</label>
          <SelectBox
            items={options}
            displayExpr={"text"}
            valueExpr={"value"}
            className={"flex w-[80px] mx-1"}
            placeholder={""}
            // defaultValue={value}
            value={state.pageSize}
            onValueChanged={(e) => {
              setState((old) => {
                return { ...old, pageSize: e.value };
              });

              onPageSizeChanged?.(e.value);
            }}
          />
        </div>
        <PageNavigator
          itemCount={state.totalCount ?? 0}
          currentPage={state.pageIndex}
          onPageChanged={handlePageChanged}
          pageSize={state.pageSize}
          pageCount={state.pageCount ?? 0}
        />
        <PagerSummary
          summaryTemplate={summaryText}
          currentPage={state.pageIndex}
          pageSize={state.pageSize}
          totalCount={state.totalCount}
        />
      </div>
    );
  }
);
