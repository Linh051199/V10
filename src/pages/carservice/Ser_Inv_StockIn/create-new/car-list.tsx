import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { requiredType } from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@packages/hooks";
import { useQuery } from "@tanstack/react-query";
import {
  GroupItem,
  IToolbarItemProps,
  RequiredRule,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import SearchInforPart from "./search-infor-part";
import {
  ContentReadyEvent,
  EditorPreparingEvent,
  KeyDownEvent,
  RowClickEvent,
  RowDblClickEvent,
} from "devextreme/ui/data_grid";
import { isNumber } from "lodash-es";
import { MathRounding, showErrorAtom } from "@/packages/store";
import { isAlertDuplicateFunc } from "@/packages/common";
import { useAtom, useSetAtom } from "jotai";
import { openPopupWarningDuplicateCreateAtom } from "@/packages/ui/warning-duplicate-create/atom";
import { ImportExcel } from "@/packages/components/import-excel/import-excel";
import { toast } from "react-toastify";
import DataSource from "devextreme/data/data_source";
import { match } from "ts-pattern";
import { SearchCar } from "../search-car/search-car";
import { Ser_Inv_StockInDtl } from "@/packages/types/carservice/Ser_Inv_StockIn";
import { TextField } from "@/packages/components/text-field";
import { Form, TextBox } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import "./style.scss";
interface CarListProps {
  // onRowDeleteBtnClick: (e: any, ref: any) => void;
  dataList: any[];
  dataUpdate: any;
}

export const CarList = forwardRef(
  (
    {
      dataUpdate,
      //  onRowDeleteBtnClick
      dataList,
    }: CarListProps,
    ref: any
  ) => {
    const { t } = useI18n("SerInvStockInCreate");
    const paramUrl = useParams();
    const [carList, setCarList] = useState<Ser_Inv_StockInDtl[]>([]);
    const formRefPart = useRef<any>(null);
    const formRef = useRef<any>(null);
    const [formDataPart, setFormDataPart] = useState({
      VieName: "",
    });
    const gridRef = useRef<any>();
    const DataRef = useRef<any>();
    const refSearchCar = useRef<any>();
    const [openWarningDuplicate, setOpenWarningDuplicate] = useAtom(
      openPopupWarningDuplicateCreateAtom
    );
    const showSelectCarPopup = useVisibilityControl({ defaultVisible: false });

    const gridSearchInforPart = useRef<any>(null);
    const api = useClientgateApi();
    const showError = useSetAtom(showErrorAtom);

    useImperativeHandle(ref, () => ({
      getGridRef() {
        return gridRef;
      },
    }));

    const { data: listModel } = useQuery(["Model"], () =>
      // api.Mst_CarModel_GetActiveAndExistSpec()
      {
        return;
      }
    );

    const { data: listLocationID } = useQuery(
      ["listLocationID", "xxx"],
      async () => {
        const response = await api.Ser_Mst_Location_GetAllActive();
        return response.DataList;
      }
    );
    useEffect(() => {
      gridRef.current.setData(dataUpdate?.lst_Ser_Inv_StockInDetail ?? []);
    }, [paramUrl.idUpdate]);
    // const listLocationID = new DataSource({
    //   key: "LocationID",
    //   load: async (loadOptions) => {
    //     const response = await api.Ser_Mst_Location_GetAllActive();

    //     return response.DataList;
    //   },
    //   byKey: async (loadOptions) => {
    //     const response = await api.Ser_Mst_Location_GetAllActive();

    //     return response.DataList;
    //   },
    //   pageSize: 5,
    //   loadMode: "raw",
    //   // cacheRawData: true,
    // });

    const handleSelectedCars = (selectedCars: Ser_Inv_StockInDtl[]) => {
      // debugger;
      // filter out items in `selectedCars` and already in `carList`
      const isAlertDuplicate = isAlertDuplicateFunc(
        gridRef?.current?.getData() ?? [],
        selectedCars,
        "PartCode"
      );
      if (isAlertDuplicate) {
        setOpenWarningDuplicate(true);
      } else {
        // filter out items in `selectedCars` and already in `carList`
        const newItems = selectedCars.filter((item) => {
          return !carList.some((selectedCar) => {
            return item.PartCode === selectedCar.PartCode;
          });
        });
        // setCarList([...carList, ...(newItems ?? [])]);
        // gridRef.current.setData([...carList, ...(newItems ?? [])]);
        gridRef.current.setData([
          ...gridRef.current.getData(),
          ...(newItems ?? []),
        ]);
      }
    };

    const columns: ColumnOptions[] = useMemo(() => {
      return [
        {
          dataField: "PartID",
          visible: false,
          caption: t("PartID"),
          editorOptions: { readOnly: paramUrl.code ? true : false },
        },
        {
          dataField: "PartCode",
          visible: true,
          caption: t("PartCode"),
          width: 200,
          editorOptions: {
            readOnly: paramUrl.code ? true : false,
            validationMessageMode: "always",
            max: 100000000000,
            min: 0,
            format: ",##0.###",
            validationErrors: [RequiredRule],
          },
          allowSorting: paramUrl.code ? true : false,
          editorType: "dxNumberBox",
          format: ",##0.###",
          multiRowEditorOptions: {
            editorType: "dxNumberBox",
          },
        },

        {
          dataField: "VieName",
          visible: true,
          width: 200,
          caption: t("VieName"),
          editorOptions: { readOnly: paramUrl.code ? true : false },
        },
        {
          dataField: "Unit",
          visible: true,
          width: 200,
          caption: t("Unit"),
          editorOptions: { readOnly: true },
        },
        {
          dataField: "Price",
          visible: true,
          width: 200,
          caption: t("Price"),
          editorOptions: { readOnly: paramUrl.code ? true : false },
        },
        {
          dataField: "VAT",
          visible: true,
          width: 200,
          caption: t("VAT"),
          editorOptions: { readOnly: paramUrl.code ? true : false },
        },
        {
          dataField: "Quantity",
          visible: true,
          width: 200,
          caption: t("Quantity"),
          editorOptions: {
            readOnly: false,
            validationMessageMode: "always",
            max: 100000000000,
            min: 0,
            format: ",##0.###",
            validationErrors: [RequiredRule],
          },
          editorType: "dxNumberBox",
          format: ",##0.###",
        },

        {
          dataField: "GiaSauVAT",
          visible: true,
          width: 200,
          caption: t("GiaSauVAT"),
          editorOptions: {
            readOnly: true,
            validationMessageMode: "always",
            max: 100000000000,
            min: 0,
            format: ",##0.###",
            validationErrors: [RequiredRule],
          },
          editorType: "dxNumberBox",
          format: ",##0.###",
          calculateCellValue: (event: any) => {
            if (isNumber(+event.Quantity)) {
              const value = event.Price * (1 + event.VAT / 100);
              return MathRounding(value, 1);
            }
            return null;
          },
        },
        {
          dataField: "PlanLocationID",
          caption: t("PlanLocationID"),
          editorType: "dxSelectBox",
          visible: true,
          width: 200,
          //showEditorAlways: true,
          renderAsync: true,
          editorOptions: {
            readOnly: paramUrl.code ? true : false,
            searchEnabled: false,
            // dataSource: listLocationID ?? [],
            // displayExpr: "LocationName",
            // valueExpr: "LocationID",
          },
          validationRules: [requiredType],

          lookup: {
            dataSource: listLocationID ?? [],
            displayExpr: "LocationName",
            valueExpr: "LocationID",
          },

          multiRowEditorOptions: {
            editorType: "dxSelectBox",
            editorOptions: {
              dataSource: listLocationID ?? [],
              displayExpr: "LocationName",
              valueExpr: "LocationID",
            },
          },
          // cellRender: async (ev: any) => {
          //   // const locationName = res.filter(
          //   //   (item: any) => item.LocationID === ev.PlanLocationID
          //   // );
          //   return <div>{ev.LocationID}</div>;
          // },
        },
        {
          dataField: "Description",
          visible: true,
          caption: t("Description"),
          editorOptions: { readOnly: paramUrl.code ? true : false },
        },
      ];
    }, [listModel]);
    const onDrop = async (acceptedFiles: any) => {
      const response = await api.Ser_Inv_StockIn_Import(acceptedFiles[0] ?? []);

      if (response.isSuccess) {
        toast.success(t("Upload successfully!"));
        // handleSelectedCars(response.Data.Lst_Car_VIN);
        gridRef.current.setData(response.Data.lst_Ser_Inv_StockInDetail);
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
    };
    function onEditorPreparing(e: EditorPreparingEvent) {
      if (e.parentType === "dataRow" && !paramUrl.code) {
        e.editorOptions.onKeyDown = (ev: any) => {
          if (ev.event.originalEvent.code === "Enter")
            gridSearchInforPart.current.show();
        };
      }
      if (
        (e.parentType === "dataRow" && e.dataField === "PartCode") ||
        e.dataField === "Quantity" ||
        e.dataField === "Price" ||
        e.dataField === "VAT" ||
        e.dataField === "GiaSauVAT" ||
        e.dataField === "Description"
      ) {
        e.editorOptions.onValueChanged = function (ev: any) {
          let valueChanged = ev.component.option("value");
          if (e && e.setValue) {
            e.setValue(valueChanged);
            gridRef?.current.saveEditingData();
          }
        };
      }
    }

    // const handleRowDblClick = (e: RowDblClickEvent) => {
    //   const selectedData: any = e.data; // new data when selected
    //   const currentData = gridRef?.current
    //     ?.getDxInstance()
    //     .option("dataSource"); // old data

    //   const newItems = [selectedData].filter((item: any) => {
    //     return !currentData.some((y: any) => {
    //       return item?.PartCode === y.PartCode;
    //     });
    //   });

    //   // Ensure resultData is an array or provide a default empty array
    //   const resultData: any[] = newItems.map((item: any) => {
    //     return {
    //       PartID: item?.PartID,
    //       PartCode: item?.PartCode,
    //       VieName: item.VieName,
    //       Unit: item.Unit,
    //       Price: item.Price,
    //       VAT: item.VAT,
    //       Quantity: item.Quantity,
    //       GiaTruocThue: 0,
    //       GiaSauVAT: 0,
    //       PlanLocationID: item.PlanLocationID,
    //       Description: item.Description,
    //     };
    //   });

    //   const updateData = [...(currentData ?? []), ...(resultData ?? [])].filter(
    //     (item: any) => {
    //       return !(item.PartCode === null);
    //     }
    //   );

    //   gridRef?.current?.setData(updateData);
    //   gridSearchInforPart.current.close();
    // };
    // const onCellClick = (e: any) => {
    //   // chặn không cho mở popup
    //   if (paramUrl.code) {
    //     return;
    //   }
    //   const data = gridRef.current.getDxInstance().option("dataSource");
    //   const isEmptyData = data.some((item: any) => {
    //     return item.PartCode === "" || item.PartCode === null;
    //   });

    //   if (e.rowType === "header") {
    //     if (isEmptyData) {
    //       return;
    //     }
    //     gridRef?.current?.addData([
    //       {
    //         PartID: "",
    //         PartCode: "",
    //         VieName: "",
    //         Unit: "",
    //         Price: 0,
    //         VAT: 0,
    //         Quantity: 0,
    //         GiaTruocThue: 0,
    //         GiaSauVAT: 0,
    //         PlanLocationID: "",
    //         Description: "",
    //       },
    //     ]);
    //   }
    // };
    const handleStartAddCar = () => {
      // showSelectCarPopup.open();
      const formData = formRefPart?.current?._instance.option("formData");
      formRef.current?.instance.option("formData", {
        PartCode: "",
        VieName: formData.VieName,
      });
      setTimeout(async () => {
        const response = await api.Ser_MST_Part_SearchForSerInvStockInDL({
          VieName: formData.VieName,
          PartCode: "",
          Ft_PageIndex: 0,
          Ft_PageSize: 100,
        });

        if (response?.isSuccess) {
          refSearchCar.current.getGridRef()?.current.setPageData(response);
          refSearchCar.current.getGridRef()?.current.refetchData();
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
      }, 500);
      refSearchCar.current.openSearchCar();
    };

    const handleSearchPart = async (event: any) => {
      event.preventDefault();
      refSearchCar.current.openSearchCar();
      const formData = formRefPart?.current?._instance.option("formData");
      formRef.current?.instance.option("formData", {
        PartCode: "",
        VieName: formData.VieName,
      });
      setTimeout(async () => {
        const response = await api.Ser_MST_Part_SearchForSerInvStockInDL({
          VieName: formData.VieName,
          PartCode: "",
          Ft_PageIndex: 0,
          Ft_PageSize: 100,
        });

        if (response?.isSuccess) {
          refSearchCar.current.getGridRef()?.current.setPageData(response);
          refSearchCar.current.getGridRef()?.current.refetchData();
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
      }, 500);
    };
    const onDownloadTemplate = async () => {
      const response = await api.Ser_Inv_StockIn_ExportTemplate();
      if (response.isSuccess) {
        toast.success(t("Download Successfully"));
        window.location.href = response.Data;
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
    };
    const searchFields = [
      {
        visible: true,
        dataField: "VieName",
        label: {
          text: t("VieName"),
          visible: false,
        },
        cssClass: "dms-form-field",
        render: (param: any) => {
          const { dataField, component: formComponent } = param;
          const formData = formComponent.option("formData");

          return (
            <div className={"flex flex-row dms-form-field"}>
              <TextField
                width={270}
                dataField={dataField}
                formInstance={formComponent}
                defaultValue={formData?.[dataField]}
                onValueChanged={(e: any) => {
                  formComponent.updateData(dataField, e.value);
                }}
                placeholder={t("Input")}
              />
            </div>
          );
        },
      },
    ];
    const subGridToolbars: IToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <div className={"font-bold"}>{t("Information")}</div>;
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <div className="flex flex-row">
              <form
                className={"FormSearch_SerInvStockInModify"}
                onSubmit={handleSearchPart}
              >
                <Form
                  ref={formRefPart}
                  formData={formDataPart}
                  // labelLocation={"top"}
                  colCount={1}
                  validationGroup={"form"}
                  // scrollingEnabled={true}
                >
                  {searchFields
                    .filter((f) => f.visible)
                    .map((field, index) => {
                      const found = searchFields.find(
                        (f) => f.dataField == field.dataField
                      );
                      return <SimpleItem key={index} {...found} />;
                    })}
                </Form>
              </form>
              <div>
                <BButton label={t("SearchPart")} onClick={handleStartAddCar} />
              </div>
            </div>
          );
        },
      },
      {
        location: "before",
        render: () => {
          return <ImportExcel onDrop={onDrop} />;
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <BButton label={t("ExportTemplate")} onClick={onDownloadTemplate} />
          );
        },
      },
    ];

    return (
      <div className="w-full h-full overfolow-auto">
        <GridViewOne
          ref={gridRef}
          // onCellClick={onCellClick} // bản cũ
          toolbarItems={subGridToolbars}
          // customToolbarItems={customToolbarItems}
          // dataSource={dataList}
          allowSelection={true}
          dataSource={[]}
          columns={columns}
          isHiddenCheckBox={true}
          allowInlineEdit={true}
          allowMultiRowEdit={true}
          editMode={true}
          editingOptions={{
            mode: "batch",
          }}
          allowCheckDeleteConfirm={true}
          keyExpr={["PartCode"]}
          defaultPageSize={9999999}
          // onRowDeleteBtnClick={(e) => onRowDeleteBtnClick(e, ref)}
          onEditorPreparing={onEditorPreparing}
          customHeight={window.innerHeight - 270}
          storeKey={"SerInvStockInCreate"}
        >
          <Summary>
            <TotalItem
              column={"GiaSauVAT"}
              summaryType={"sum"}
              displayFormat={`${t("Sum")} : {0}`}
            ></TotalItem>
          </Summary>
        </GridViewOne>
        <SearchCar
          formRef={formRef}
          formInputRef={formRefPart}
          searchConditionPart={formDataPart}
          dataRef={DataRef}
          ref={refSearchCar}
          visible={showSelectCarPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => {
            refSearchCar.current.closeSearchCar();
          }}
          onSelectedCars={handleSelectedCars}
        />

        {/* Bản cũ */}
        {/* <SearchInforPart
          ref={gridSearchInforPart}
          visible={false}
          onRowDblClick={handleRowDblClick}
        /> */}
      </div>
    );
  }
);
