import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useI18n } from "@/i18n/useI18n";
import { WithSearchPanelLayout } from "@/packages/components/layout/layout-with-search-panel";
import { VisibilityControl, useVisibilityControl } from "@packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { useClientgateApi } from "@packages/api";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@packages/store";
import { Button, DataGrid, LoadPanel } from "devextreme-react";
import { Icon } from "@packages/ui/icons";
import { nanoid } from "nanoid";
import { usePermissions } from "@packages/contexts/permission";
import { SearchForm } from "./search-form";
import { Mst_Dealer } from "@/packages/types";
import {
  formatDate,
  validateMajorTimeStartDayOfMonth,
} from "@/packages/common/date_utils";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import {
  Ser_Inv_StockInDtl,
  Ser_Inv_StockIn_Search,
} from "@/packages/types/carservice/Ser_Inv_StockIn";
import { Search_Ser_MST_Part } from "@/packages/types/master/Ser_MST_Part";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { BButton } from "@/packages/components/buttons";
import { ModifyForm } from "../create-new/modify-form/modify-form";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { toast } from "react-toastify";

interface SearchCarProps {
  searchConditionPart: any;
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
  dataRef?: any;
  formRef?: any;
  formInputRef?: any;
  onSelectedCars: (cars: Ser_Inv_StockInDtl[]) => void;
}

export const SearchCar = forwardRef(
  (
    {
      searchConditionPart,
      visible,
      formInputRef,
      container,
      position,
      dataRef,
      formRef,
      onHidding,
      onSelectedCars,
    }: SearchCarProps,
    ref: any
  ) => {
    const { t } = useI18n("SerInvStockIn_SearchCarCreate");
    const [isLoading, setIsLoading] = useState(false);

    const windowSize = useWindowSize();
    const api = useClientgateApi();
    const formModifyRef = useRef<any>(null);
    const { isHQ } = usePermissions();
    const showError = useSetAtom(showErrorAtom);
    const [loadingKey, reloading] = useReducer(() => nanoid(), "0");
    const resultRef = useRef<any>(null);
    const gridRef = useRef<any>(null);
    const showSelectCarPopup = useVisibilityControl({ defaultVisible: false });

    const [formData, setFormData] = useState({
      PartGroupID: "",
      PartCode: "",
      Model: "",
      Cost: "",
      MinQuantity: "",
      Quantity: "",
      VAT: "",
      VieName: "",
      EngName: "",
      Price: "",
      Unit: "",
      PartTypeID: "",
      FreqUsed: "",
      Note: "",
    });
    useImperativeHandle(ref, () => ({
      getGridRef() {
        return gridRef;
      },
      openSearchCar() {
        showSelectCarPopup.open();
      },
      closeSearchCar() {
        showSelectCarPopup.close();
      },
    }));
    const searchCondition = useRef<Partial<Search_Ser_MST_Part>>({
      PartCode: "",
      VieName: searchConditionPart ? searchConditionPart.VieName : "",
      Ft_PageIndex: 0,
      Ft_PageSize: 99999999,
    });

    const { data: listDealerCodes } = useQuery({
      queryKey: ["SerInvStockIn_listDealerCodes", "listDealerCodes"],
      queryFn: async () => {
        const resp = await api.Mst_Dealer_GetAllActive();
        if (resp.isSuccess) {
          return [
            { DealerCode: "", DealerName: "All" },
            ...(resp.DataList as Mst_Dealer[]),
          ];
        } else {
          return [];
        }
      },
    });
    const renderSearchForm = useCallback(
      (control: VisibilityControl) => {
        return (
          <SearchForm
            formRef={formRef}
            data={searchCondition.current}
            onClose={() => control.close()}
            onSearch={handleSearch}
            listDealerCodes={(listDealerCodes as Mst_Dealer[]) ?? []}
          />
        );
      },
      [listDealerCodes, searchCondition.current]
    );

    // useEffect(() => {
    //   handleSearch(formInputRef.current?.instance.option("formData"));
    // }, [formInputRef.current?.instance.option("formData").VieName]);

    const handleSearch = async (condition: any) => {
      const dxInstance = gridRef.current.getDxInstance();

      condition.Ft_PageIndex = dxInstance.pageIndex() ?? 0;
      condition.Ft_PageSize = dxInstance.pageSize() ?? 1000;
      searchCondition.current = {
        ...searchCondition.current,
        ...condition,
      };
      dataRef?.current?.current?.refetchData();
      // dataRef?.current?.current?.clearSelection();
      fetchData();
      reloading();
    };
    const fetchData = async () => {
      const dxInstance = gridRef.current.getDxInstance();
      // if (loadingKey !== "0") {
      const response = await api.Ser_MST_Part_SearchForSerInvStockInDL({
        ...searchCondition.current,
        Ft_PageIndex: dxInstance.pageIndex() ?? 0,
        Ft_PageSize: dxInstance.pageSize() ?? 1000,
      });

      if (response?.isSuccess) {
        gridRef.current.setPageData(response);
        // return response;
      } else {
        showError({
          message: t(response!._strErrCode),
          _strErrCode: response?._strErrCode,
          _strTId: response?._strTId,
          _strAppTId: response?._strAppTId,
          _objTTime: response?._objTTime,
          _strType: response?._strType,
          _dicDebug: response?._dicDebug,
          _dicExcs: response?._dicExcs,
        });
      }
      // }
      // gridRef.current.setPageData(DUMMY_DATA);
      // return DUMMY_DATA;
    };
    const handleSelect = async () => {
      // const items =
      //   resultRef.current?.current?.instance.getSelectedRowsData() as Car_CarDtl[];
      const items =
        gridRef?.current?.getSelectedRowsData() as Ser_Inv_StockInDtl[];

      onSelectedCars(items);
      // resultRef.current?.instance.clearSelection();
      // onHidding();
      showSelectCarPopup.close();
      // await removeCache();
    };
    const columns: ColumnOptions[] = [
      {
        dataField: "PartID",
        caption: t("PartID"),
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
      },
      {
        dataField: "PartCode",
        caption: t("PartCode"),
        visible: true,
        editorOptions: {
          readOnly: true,
          disabled: true,
        },
      },
      {
        dataField: "VieName",
        caption: t("VieName"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "EngName",
        caption: t("EngName"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Unit",
        caption: t("Unit"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Cost", // Giá nhập
        caption: t("Cost"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Price", // Giá hãng
        caption: t("Price"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "VAT", // VAT
        caption: t("VAT"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "Model", // VAT
        caption: t("Model"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "InventoryQuantity",
        caption: t("InventoryQuantity"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
    ];
    const handleAddNew = () => {
      formModifyRef.current.openModifyForm();
    };
    const handleSaveForm = () => {
      console.log("gridRef", gridRef);
      ConfirmComponent({
        asyncFunction: async () => {
          const formRef = formModifyRef.current.getModifyFormRef();
          const formData = formRef?.current?._instance.option("formData");
          const response = await api.Ser_MST_Part_Create({
            ...formData,
          });
          if (response.isSuccess) {
            toast.success(`${t("CreateSuccessfully")}`);
            gridRef?.current?.refetchData();
            handleSearch({ PartCode: "", VieName: formData.VieName });
            formModifyRef.current.closeModifyForm();
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
        },
        title: t("Confirm save"),
        contentConfirm: t("Do you want to save ?"),
      });
    };
    return (
      <Popup
        visible={showSelectCarPopup.visible}
        title={t("SerInvStockIn_SearchCarCreate")}
        container={container}
        showCloseButton={true}
        onHiding={() => {
          showSelectCarPopup.close();
        }}
        wrapperAttr={{
          class: "search-car-popup",
        }}
      >
        <Position
          at={`${position} top`}
          my={`${position} top`}
          of={`${container}`}
          offset={{ x: 150, y: 100 }}
        />
        <ModifyForm
          ref={formModifyRef}
          dataForm={formData}
          onSaveForm={handleSaveForm}
        />
        <WithSearchPanelLayout
          searchPanelRender={renderSearchForm}
          contentPanelRender={(control: VisibilityControl) => (
            <div className={"flex h-full justify-center"}>
              <div className="search-results">
                <LoadPanel
                  visible={isLoading}
                  showIndicator={true}
                  showPane={true}
                />
                <GridViewOne
                  ref={gridRef}
                  keyExpr={"PartID"}
                  customHeight={windowSize.height - 250}
                  isLoading={false}
                  dataSource={[]}
                  columns={columns}
                  //onPageChanged={(pageIndex) => { }}
                  toolbarItems={[
                    {
                      location: "before",
                      render: () => (
                        <Button
                          visible={!control.visible}
                          stylingMode={"text"}
                          onClick={() => control.toggle()}
                        >
                          <Icon name={"search"} />
                        </Button>
                      ),
                    },
                    {
                      location: "before",
                      render: () => (
                        <BButton label={t("AddNew")} onClick={handleAddNew} />
                      ),
                    },
                  ]}
                  storeKey={"Ser_Inv_StockIn-detail-car-search-result-list"}
                  allowSelection={false}
                />
              </div>
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
            onClick: handleSelect,
          }}
        />

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: t("Cancel"),
            onClick: onHidding,
            elementAttr: {
              class: "search-car-popup cancel-button",
            },
          }}
        />
      </Popup>
    );
  }
);
