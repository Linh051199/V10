import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useI18n } from "@/i18n/useI18n";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { VisibilityControl } from "@packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import { useCallback, useReducer, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { Button, DataGrid, LoadPanel } from "devextreme-react";
import { Icon } from "@packages/ui/icons";
import { useAuth } from "@packages/contexts/auth";
import { match } from "ts-pattern";
import { nanoid } from "nanoid";
import { usePermissions } from "@packages/contexts/permission";
import { SearchForm } from "./search-form";
import { validateTimeStartDayOfMonth } from "@/packages/common/date_utils";
import { SearchResults } from "./search-result";
import { FrmMngDlr_PDIRequest_SearchCar_Param, FrmMngDlr_PDIRequest_SearchCar_Response } from "@/packages/types/sales/FrmMngDlr_PDIRequest";

interface SearchCarProps {
  visible: boolean;
  container: string;
  position: "left" | "right"
  onHidding: () => void;
  onSelectedCars: (cars: FrmMngDlr_PDIRequest_SearchCar_Response[]) => void;
  dataRef?: any;
}

export const SearchCar = (
  {
    visible,
    container,
    position,
    onHidding,
    dataRef,
    onSelectedCars
  }: SearchCarProps) => {
  const { t } = useI18n("SearchCar");

  const [isLoading, setIsLoading] = useState(false)
  const handleSearch = async (data: any) => {
    setSearchCondition(data)
    setIsLoading(true)
    reloading()
    await refetch();
    setIsLoading(false)
  }
  const api = useClientgateApi()
  const { isHQ } = usePermissions()
  const showError = useSetAtom(showErrorAtom)
  const [loadingKey, reloading] = useReducer(() => nanoid(), "0");

  const { data: carListResponse, refetch, remove: removeCache, isLoading: carListLoading, isRefetching } = useQuery({
    enabled: loadingKey !== "0",
    queryKey: ["FrmMngDlr_PDIRequest_SearchCar", "carList", loadingKey],
    queryFn: async () => {
      const response = await match(!isHQ())
        .with(true, async () => {
          return await api.FrmMngDlr_PDIRequest_SearchCar(searchCondition)
        })
        .otherwise(async () => {
          return await api.FrmMngDlr_PDIRequest_SearchCar(searchCondition)
        })

      if (response.isSuccess) {
        return response
      } else {
        showError({
          message: t(response._strErrCode),
          _strErrCode: response._strErrCode,
          _strTId: response._strTId,
          _strAppTId: response._strAppTId,
          _objTTime: response._objTTime,
          _strType: response._strType,
          _dicDebug: response._dicDebug,
          _dicExcs: response._dicExcs,
        });
      }
    }
  })
  const { data: dealerList } = useQuery({
    queryKey: ["DeliveryOrder", "dealerList"],
    queryFn: async () => {
      const resp = await api.Mst_Dealer_GetAllActive()
      if (resp.isSuccess) {
        return resp.DataList
      }
      return []
    }
  })
  const [searchCondition, setSearchCondition] = useState<Partial<FrmMngDlr_PDIRequest_SearchCar_Param>>({
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
      dealerList={dealerList ?? []}
    />
  }, [dealerList, searchCondition])

  const handleSelect = async () => {
    const items = resultRef.current?.instance.getSelectedRowsData() as FrmMngDlr_PDIRequest_SearchCar_Response[]
    onSelectedCars(items)
    resultRef.current?.instance.clearSelection()
    onHidding()
    await removeCache()
  }
  const handlePageChanged = async (pageIndex: number) => {
    setSearchCondition({
      ...searchCondition,
      Ft_PageIndex: pageIndex
    })
    if (loadingKey !== "0") {
      reloading()
    }

  }
  const handlePageSizeChanged = async (pageSize: number) => {
    setSearchCondition({
      ...searchCondition,
      Ft_PageSize: pageSize
    })
    if (loadingKey !== "0") {
      reloading()
    }
  }
  const resultRef = useRef<DataGrid>(null)
  return (
    <Popup
      visible={visible}
      title={t("SearchCar")}
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
          <div className={'flex h-full justify-center'}>
            <LoadPanel visible={isRefetching || carListLoading} showPane={true} showIndicator={true} />
            <SearchResults
              isLoading={isLoading}
              toolbarItems={[
                {
                  location: "before",
                  render: () => (
                    <Button
                      visible={!control.visible}
                      stylingMode={'text'}
                      onClick={() => control.toggle()}>
                      <Icon name={"search"} />
                    </Button>
                  )
                }
              ]}
              ref={resultRef}
              result={carListResponse}
              onPageSizeChanged={handlePageSizeChanged}
              onPageChanged={handlePageChanged}
              dataRef={dataRef}
            />
          </div>
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