import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { requiredType } from "@/packages/common/Validation_Rules";
import { BButton } from "@/packages/components/buttons";
import { GridCustomToolBarItem } from "@/packages/ui/base-gridview/components/grid-custom-toolbar";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { ColumnOptions } from "@/types";
import { useVisibilityControl } from "@packages/hooks";
import { useQuery } from "@tanstack/react-query";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

interface CarListProps {
  onHandleAddNewCar: (ref: any) => void;
  onRowDeleteBtnClick: (e: any, ref: any) => void;
  dataList: any[];
}
interface QuanLyPhieuNhapKhoCreateDetail { }

export const CarList = forwardRef(
  (
    { onHandleAddNewCar, onRowDeleteBtnClick, dataList }: CarListProps,
    ref: any
  ) => {
    const { t } = useI18n("QuanLyPhieuNhapKhoCreate");
    const paramUrl = useParams();
    const [carList, setCarList] = useState<QuanLyPhieuNhapKhoCreateDetail[]>(
      []
    );
    const api = useClientgateApi();
    const { data: listModel } = useQuery(["Model"], () =>
    // api.Mst_CarModel_GetActiveAndExistSpec()
    {
      return;
    }
    );

    const { data: listColor } = useQuery(["Color"], () =>
    // api.Mst_CarColor_GetAllActive()
    {
      return;
    }
    );

    const lookupSpecDataSource = useCallback((options: any) => {
      return {
        store: new CustomStore({
          key: "SpecCode",
          loadMode: "raw",
          load: () => {
            if (!options.data?.ModelCode) {
              return carList;
            }
            return api
              .Mst_CarSpec_GetByModelCode(options.data?.ModelCode ?? "*")
              .then((respone) => {
                return respone.DataList ?? [];
              })
              .catch(() => {
                throw "Network error";
              });
          },
        }),
        filter: null,
        sort: "SpecName",
      };
    }, []);

    const lookupColorDataSource = useCallback((options: any) => {
      return {
        store: new CustomStore({
          key: "ColorExtCode",
          loadMode: "raw",
          load: () => {
            if (!options.data?.ModelCode) {
              return listColor?.DataList ?? [];
              // return api.Mst_CarColor_GetAllActive().then((respone) => {
              //     return respone.DataList ?? [];
              // });
            } else {
              // return api .Mst_CarColor_GetByModelCode(options.data?.ModelCode ?? "")
              return new Promise((resolve, reject) => { })
                .then((respone) => {
                  return respone.DataList ?? [];
                })
                .catch(() => {
                  throw "Network error";
                });
            }
          },
        }),
        filter: null,
        sort: "ColorExtName",
      };
    }, []);

    const columns: ColumnOptions[] = useMemo(() => {
      return [
        {
          dataField: "MaVatTuYeuCau",
          caption: t("MaVatTuYeuCau"),
          editorType: "dxTextBox",
          editorOptions: { readOnly: false },
          validationRules: [requiredType]
        },
        {
          dataField: "TenVatTu",
          visible: true,
          caption: t("TenVatTu"),
          editorOptions: { readOnly: false },
        },
        {
          dataField: "SoVIN",
          visible: true,
          caption: t("SoVIN"),
          editorOptions: { readOnly: true },
        },
        {
          dataField: "HinhThucDatHang",
          visible: true,
          caption: t("HinhThucDatHang"),
          // editorOptions: { readOnly: false },
          editorOptions: { searchEnabled: false, displayExpr: "SpecCode" },
          lookup: {
            dataSource: [
              {
                SpecCode: "Abc",

              }
            ],
            displayExpr: "SpecCode",
            valueExpr: "SpecCode",
          },
        },
        {
          dataField: "GhiChu",
          visible: true,
          caption: t("GhiChu"),
          editorOptions: { readOnly: false },
        },
        // {
        //   dataField: "SoLuong",
        //   visible: true,
        //   caption: t("SoLuong"),
        //   editorOptions: { readOnly: false },
        // },
        // {
        //   dataField: "GiaTruocThue",
        //   visible: true,
        //   caption: t("GiaTruocThue"),
        //   editorOptions: { readOnly: true },
        // },
        // {
        //   dataField: "GiaSauVAT",
        //   visible: true,
        //   caption: t("GiaSauVAT"),
        //   editorOptions: { readOnly: true },
        // },
        // {
        //   dataField: "ViTriDuKien",
        //   caption: t("ViTriDuKien"),
        //   editorType: "dxSelectBox",
        //   visible: true,
        //   //showEditorAlways: true,
        //   renderAsync: true,
        //   editorOptions: { searchEnabled: false, displayExpr: "SpecCode" },
        //   lookup: {
        //     dataSource: (options: any) => lookupSpecDataSource(options),
        //     displayExpr: "SpecCode",
        //     valueExpr: "SpecCode",
        //   },
        //   validationRules: [requiredType],
        //   setCellValue: (newValue: any, value: any, currentRowData: any) => {
        //     const UnitPrice = value.UnitPrice ?? 0;
        //     newValue.SpecCode = value.SpecCode;
        //     newValue.UnitPrice = UnitPrice;
        //     newValue.UnitPriceInit = UnitPrice
        //       ? UnitPrice * currentRowData.RequestedQuantity
        //       : 0;
        //     newValue.SpecDescription = value.SpecDescription;
        //     newValue.OCNDescription = value.OCNCode;
        //   },
        //   cellRender: ({ data }: any) => {
        //     return <div>{data.SpecCode}</div>;
        //   },
        // },
        // {
        //   dataField: "MoTa",
        //   visible: true,
        //   caption: t("MoTa"),
        //   editorOptions: { readOnly: false },
        // },
      ];
    }, [listModel]);

    function onEditorPreparing(e: any) {
      // if (
      //   e.parentType === "dataRow" &&
      //   (e.dataField === "ModelCode" ||
      //     e.dataField === "SpecCode" ||
      //     e.dataField === "ColorCode")
      // ) {
      //   e.editorOptions.onValueChanged = function (ev: any) {
      //     let selectedItem = ev.component.option("selectedItem");
      //     if (e && e.setValue) e.setValue(selectedItem);
      //   };
      // }
    }

    const handleSelectionChanged = (e: any) => {
      if (ref?.current) {
      }
      deleteButtonAvailable.close();
    };

    const subGridToolbars: IToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <div className={"font-bold"}>{t("CarList")}</div>;
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <BButton
              label={t("AddNew")}
              onClick={() => onHandleAddNewCar(ref)}
            />
          );
        },
      },

      {
        location: "after",
        render: () => {
          return (
            <div className={""}>{/* {t("TotalRow")}: {carList.length} */}</div>
          );
        },
      },
    ];

    const deleteButtonAvailable = useVisibilityControl({
      defaultVisible: false,
    });

    const handleSavingRow = async (e: any) => {
      if (e.changes && e.changes.length > 0) {
        const { type } = e.changes[0];
      }
      //e.cancel = true;
    };

    const deleteConfirmationVisible = useVisibilityControl({
      defaultVisible: false,
    });

    const handleExportExcel = () => { };
    const toolbarItems: GridCustomToolBarItem[] = [
      // {
      //   text: t(`ExportExcel`),
      //   onClick: (e: any, ref: any) => {
      //     if (ref) {
      //       handleExportExcel();
      //     }
      //   },

      //   shouldShow: (ref: any) => {
      //     return true;
      //   },
      // },
    ];
    return (
      <div className="w-full h-full overfolow-auto">
        <GridViewOne
          ref={ref}
          toolbarItems={subGridToolbars}
          customToolbarItems={toolbarItems}
          dataSource={dataList}
          columns={columns}
          allowSelection={true}
          allowInlineEdit={true}
          allowMultiRowEdit={false}
          editMode={true}
          editingOptions={{
            mode: "batch",
          }}
          defaultPageSize={9999999}
          onRowDeleteBtnClick={(e) => onRowDeleteBtnClick(e, ref)}
          onSaveRow={handleSavingRow}
          onSelectionChanged={handleSelectionChanged}
          onEditorPreparing={onEditorPreparing}
          customHeight={"auto"}
          storeKey={"QuanLyPhieuNhapKho-Create"}
        />
      </div>
    );
  }
);
