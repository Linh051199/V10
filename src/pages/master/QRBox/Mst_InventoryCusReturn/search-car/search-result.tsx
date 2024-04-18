import { useI18n } from "@/i18n/useI18n";
import { BusinessGrid } from "@/packages/components/business-grid";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { ApiResponse, Car_CarForLXX } from "@packages/types";
import { ForwardedRef, forwardRef } from "react";

import { LoadPanel } from "devextreme-react";
import "./search-result.scss";
import { GridViewStandard } from "@/packages/components/gridview-standard/gridview-standard";

interface SearchResultProps {
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  dataRef?: any;
  fetchData?: any;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { t } = useI18n("Common");
    const {
      toolbarItems,
      isLoading,
      dataRef,
      onPageSizeChanged,
      onPageChanged,
      fetchData,
    } = props;
    const columns: ColumnOptions[] = [
      {
        dataField: "MyIdxSeq",
        visible: true,
        caption: t("STT"),
        cellRender: ({ rowIndex }: any) => {
          return <span>{rowIndex + 1}</span>;
        },
      },
      {
        dataField: "RefNo",
        visible: true,
        caption: t("RefNo"),
      },
      {
        dataField: "LCTemp",
        visible: true,
        caption: t("LCTemp"),
      },
      {
        dataField: "OrderMonth",
        visible: true,
        caption: t("OrderMonth"),
      },
    ];
    const handlePageChanged = (pageIndex: number) => {
      onPageChanged?.(pageIndex);
    };
    const handlePageSizeChanged = (pageSize: number) => {
      onPageSizeChanged?.(pageSize);
    };
    const setRef = (r: any) => {
      ref.current = r;
      dataRef.current = r;
    };
    return (
      <div className="search-results">
        <LoadPanel visible={isLoading} showIndicator={true} showPane={true} />
        {!isLoading && (
          <GridViewStandard
            fetchData={fetchData}
            keyExpr={"LCTemp"}
            customerHeight={"95%"}
            isLoading={isLoading}
            onReady={(r) => setRef(r)}
            dataSource={[]}
            columns={columns}
            toolbarItems={toolbarItems ?? []}
            storeKey={
              "CT_ContractOversdelivery-order-detail-car-search-result-list"
            }
            allowSelection={false}
          />
        )}
      </div>
    );
  }
);
