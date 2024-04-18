import { ApiResponse, Car_CarForLXX } from "@packages/types";
import { ColumnOptions, ToolbarItemProps } from "@/types";
import { useI18n } from "@/i18n/useI18n";
import { ForwardedRef, forwardRef, useRef } from "react";
import { BusinessGrid } from "@/packages/components/business-grid";

import "./search-result.scss"
import { LoadPanel } from "devextreme-react";
import { GridViewStandard } from "@/packages/components/gridview-standard/gridview-standard";
import { Dlr_ContractCancel_Item } from "@/packages/types/sales/Dlr_ContractCancel";
import { FrmMngDlr_PDIRequest_SearchCar_Response } from "@/packages/types/sales/FrmMngDlr_PDIRequest";

interface SearchResultProps {
  result?: ApiResponse<FrmMngDlr_PDIRequest_SearchCar_Response>
  toolbarItems?: ToolbarItemProps[]
  isLoading?: boolean
  onPageChanged?: (pageIndex: number) => void;
  onPageSizeChanged?: (pageSize: number) => void
  dataRef?: any;
}

export const SearchResults = forwardRef((props: SearchResultProps, ref: any) => {
  const { t } = useI18n("Common")
  const {
    result = {} as ApiResponse<FrmMngDlr_PDIRequest_SearchCar_Response>,
    toolbarItems,
    isLoading,
    dataRef,
    onPageSizeChanged,
    onPageChanged
  } = props
  const columns: ColumnOptions[] = [
    {
      "dataField": "VIN",
      visible: true,
      "caption": t("VIN")
    },
    {
      "dataField": "CVModelCode",
      visible: true,
      "caption": t("CVModelCode")
    },
    {
      "dataField": "CVSpecCode",
      visible: true,
      "caption": t("CVSpecCode")
    },
    {
      "dataField": "SpecDescription",
      visible: true,
      "caption": t("SpecDescription")
    },
    {
      "dataField": "CVColorCode",
      visible: true,
      "caption": t("CVColorCode")
    },
    {
      "dataField": "Color_VN",
      visible: true,
      "caption": t("Color_VN")
    },
  ]
  const handlePageChanged = (pageIndex: number) => {
    onPageChanged?.(pageIndex)

  }
  const handlePageSizeChanged = (pageSize: number) => {
    onPageSizeChanged?.(pageSize)
  }

  const setRef = (r: any) => {
    ref.current = r;
    dataRef.current = r;
  };
  return (
    <div className="search-results">
      <LoadPanel visible={isLoading} showIndicator={true} showPane={true} />
      {!isLoading &&
        <GridViewStandard
          keyExpr={"VIN"}
          customerHeight={"95%"}
          isLoading={isLoading}
          onReady={(r) => setRef(r)}
          dataSource={result?.DataList ?? []}
          columns={columns}
          toolbarItems={toolbarItems ?? []}
          storeKey={"Dlr_ContractCancel-search-result-list"}
          allowSelection={false}
        />
      }
    </div>

  )
})