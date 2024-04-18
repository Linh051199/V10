import { ApiResponse, Car_CarForLXX } from "@packages/types";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useI18n } from "@/i18n/useI18n";
import { ForwardedRef, forwardRef, useRef } from "react";
import { BusinessGrid } from "@/packages/components/business-grid";

import "./search-result.scss";
import { LoadPanel } from "devextreme-react";
import { GridViewStandard } from "@/packages/components/gridview-standard/gridview-standard";

interface SearchResultProps {
  result?: any;
  toolbarItems?: ToolbarItemProps[];
  isLoading?: boolean;
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void;
  dataRef?: any;
}

export const SearchResults = forwardRef(
  (props: SearchResultProps, ref: any) => {
    const { t } = useI18n("SearchObject");
    const {
      result = {} as ApiResponse<any>,
      toolbarItems,
      isLoading,
      dataRef,
      onPageSizeChanged,
      onPageChanged,
    } = props;
    const columns: ColumnOptions[] = [
      {
        dataField: "MyIdxSeq",
        caption: t("STT"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },
      {
        dataField: "MaVatTu",
        visible: true,
        caption: t("MaVatTu"),
      },
      {
        dataField: "TenVatTu",
        visible: true,
        caption: t("TenVatTu"),
      },
      {
        dataField: "DonViTinh",
        visible: true,
        caption: t("DonViTinh"),
      },
      {
        dataField: "VAT",
        visible: true,
        caption: t("VAT"),
      },
      {
        dataField: "SoLuongDatToiThieu",
        visible: true,
        caption: t("SoLuongDatToiThieu"),
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
            keyExpr={"MaVatTu"}
            customerHeight={"95%"}
            isLoading={isLoading}
            onReady={(r) => setRef(r)}
            dataSource={result?.DataList ?? []}
            columns={columns}
            toolbarItems={toolbarItems ?? []}
            storeKey={"QuanLyDonDatHang-search-result-list"}
            allowSelection={false}
          />
        )}
      </div>
    );
  }
);
