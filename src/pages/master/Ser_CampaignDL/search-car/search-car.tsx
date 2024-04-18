import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useI18n } from "@/i18n/useI18n";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { VisibilityControl } from "@packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useCallback, useReducer, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { Button, DataGrid, LoadPanel, ScrollView } from "devextreme-react";
import { Icon } from "@packages/ui/icons";
import { useAuth } from "@packages/contexts/auth";
import { match } from "ts-pattern";
import { nanoid } from "nanoid";
import { usePermissions } from "@packages/contexts/permission";
import { SearchForm } from "./search-form";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { SearchResults } from "./search-result";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

interface SerCustomerSearchProps {
  visible: boolean;
  container: string;
  position: "left" | "right"
  onHidding: () => void;
  onSelectedCars: (cars: any[]) => void;
  dataRef?: any;
}

export const SerCustomerSearch = (
  {
    visible,
    container,
    position,
    onHidding,
    dataRef,
    onSelectedCars
  }: SerCustomerSearchProps) => {
  const { t } = useI18n("SerCustomerSearch");
  const gridRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false)
  const handleSearch = async (data: any) => {
    // setSearchCondition(data)
    delete data.current
    searchCondition.current = {
      ...data
    }
    gridRef.current.refetchData()
  }

  const api = useClientgateApi()
  const { isHQ } = usePermissions()
  const showError = useSetAtom(showErrorAtom)
  // const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  // const { data: carListResponse, refetch, remove: removeCache, isLoading: carListLoading, isRefetching } = useQuery({
  //   enabled: loadingKey !== "0",
  //   queryKey: ["Ser_CustomerCar_Search", "carList", loadingKey],
  //   queryFn: async () => {
  //     const response = await match(!isHQ())
  //       .with(true, async () => {
  //         return await api.Ser_CustomerCar_SearchHQ(searchCondition)
  //       })
  //       .otherwise(async () => {
  //         return await api.Ser_CustomerCar_SearchDL(searchCondition)
  //       })

  //     if (response.isSuccess) {
  //       return response
  //     } else {
  //       showError({
  //         message: t(response._strErrCode),
  //         _strErrCode: response._strErrCode,
  //         _strTId: response._strTId,
  //         _strAppTId: response._strAppTId,
  //         _objTTime: response._objTTime,
  //         _strType: response._strType,
  //         _dicDebug: response._dicDebug,
  //         _dicExcs: response._dicExcs,
  //       });
  //     }
  //   }
  // })


  // const { data: dealerList } = useQuery({
  //   queryKey: ["DeliveryOrder", "dealerList"],
  //   queryFn: async () => {
  //     const resp = await api.Mst_Dealer_GetAllActive()
  //     if (resp.isSuccess) {
  //       return resp.DataList
  //     }
  //     return []
  //   }
  // })
  const searchCondition = useRef<any>({
    DCDDlrContractNo: "",
    CCVIN: "",
    CCModelCode: "",
    Ft_PageIndex: 0,
    Ft_PageSize: 100
  })
  const renderSearchForm = useCallback((control: VisibilityControl) => {
    return <SearchForm
      data={searchCondition}
      onClose={() => control.close()}
      onSearch={handleSearch}
    // dealerList={dealerList ?? []}
    />
  }, [searchCondition])

  const handleSelect = async () => {
    const items = gridRef.current?.getDxInstance().getSelectedRowsData() as any[]
    onSelectedCars(items)
    resultRef.current?.instance.clearSelection()
    onHidding()
    // await removeCache()
  }
  const handlePageChanged = async (pageIndex: number) => {
    // setSearchCondition({
    //   ...searchCondition,
    //   Ft_PageIndex: pageIndex
    // })
    // if (loadingKey !== "0") {
    //   reloading()
    // }

  }
  const handlePageSizeChanged = async (pageSize: number) => {
    // setSearchCondition({
    //   ...searchCondition,
    //   Ft_PageSize: pageSize
    // })
    // if (loadingKey !== "0") {
    //   reloading()
    // }
  }

  const columns: ColumnOptions[] = [
    {
      "dataField": "CusName",
      visible: true,
      "caption": t("CusName")
    },
    {
      "dataField": "Email",
      visible: true,
      "caption": t("Email")
    },
    {
      "dataField": "DOB",
      visible: true,
      "caption": t("DOB")
    },
    {
      "dataField": "Address",
      visible: true,
      "caption": t("Address")
    },
    {
      "dataField": "Tel",
      visible: true,
      "caption": t("Tel")
    },
    {
      "dataField": "PlateNo",
      visible: true,
      "caption": t("PlateNo")
    },
    {
      "dataField": "TradeMarkCode",
      visible: true,
      "caption": t("TradeMarkCode")
    },
    {
      "dataField": "SoYeuCauXuatNCC",
      visible: true,
      "caption": t("SoYeuCauXuatNCC")
    },
  ]

  const fetchData = async () => {
    const response =
      await api.Ser_CustomerCar_SearchDL({
        ...searchCondition.current,
        Ft_PageIndex: gridRef.current?.getDxInstance().pageIndex() ?? 0,
        // Ft_PageSize: gridRef.current?.getDxInstance().pageSize() ?? 100,
        Ft_PageSize: 999999999

      })

    if (response?.isSuccess) {
      // gridRef.current.setPageData(response.Data);
      setIsLoading(false)
      console.log(205, response)
      return response;
    } else {
      setIsLoading(false)
      showError({
        message: t(response!._strErrCode),
        _strErrCode: response!._strErrCode,
        _strTId: response!._strTId,
        _strAppTId: response!._strAppTId,
        _objTTime: response!._objTTime,
        _strType: response!._strType,
        _dicDebug: response!._dicDebug,
        _dicExcs: response!._dicExcs,
      });
    }
  };

  const resultRef = useRef<DataGrid>(null)
  const windowSize = useWindowSize()
  return (
    <Popup
      visible={visible}
      title={t("SerCustomerSearch")}
      container={container}
      showCloseButton={true}
      onHiding={onHidding}
    >
      <Position
        at={`${position} top`}
        my={`${position} top`}
        of={`${container}`}
        offset={{ x: 100, y: 100 }}
      />
      <WithSearchPanelLayout
        searchPanelRender={renderSearchForm}
        contentPanelRender={(control: VisibilityControl) => (
          // <div className={'flex h-full justify-center'}>
          <ScrollView height={"100%"}>
            <LoadPanel visible={isLoading} showPane={true} showIndicator={true} />
            <GridViewOne
              keyExpr={"CusID"}
              isLoading={isLoading}
              ref={gridRef}
              isHidenHeaderFilter={true}
              customHeight={windowSize.height - 330}
              fetchData={fetchData}
              dataSource={[]}
              columns={columns}
              toolbarItems={[]}
              storeKey={"Ser_CampaignDL-search-result-list"}
              allowSelection={false}
              defaultPageSize={99999999}
            />
          </ScrollView>
          // </div>
        )}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Select"),
          type: "default",
          stylingMode: "contained",
          onClick: handleSelect
        }}
      />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        options={{
          text: t("Cancel"),
          onClick: onHidding
        }}
      />
    </Popup>
  )
}