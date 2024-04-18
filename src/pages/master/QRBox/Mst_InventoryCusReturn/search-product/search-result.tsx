import { useI18n } from "@/i18n/useI18n";
import { BusinessGrid } from "@/packages/components/business-grid";
import { ColumnOptions, ToolbarItemProps } from "@/types";

import { ForwardedRef, forwardRef } from "react";

import { LoadPanel } from "devextreme-react";
import "./search-result.scss";
import { GridViewStandard } from "@/packages/components/gridview-standard/gridview-standard";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

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
      isLoading,

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

    return (
      <div className="search-results">
        <GridViewOne
          id="search-car-car_doc_Req"
          customHeight={"420px"}
          ref={ref}
          keyExpr={"CarId"}
          dataSource={[]}
          columns={columns}
          isLoading={false}
          autoFetchData={false}
          allowSelection={false}
          storeKey={"Mst_CarDocReqSearchCar-List"}
          fetchData={fetchData}
          // onSelectionGetData={handleSelectionChanged}
        />
      </div>
    );
  }
);
