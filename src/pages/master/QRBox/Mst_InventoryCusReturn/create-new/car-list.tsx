import { BButton } from "@/packages/components/buttons";
import { forwardRef, ReactNode, useCallback, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@packages/hooks";
import { ColumnOptions } from "@/types";
import { useClientgateApi } from "@/packages/api";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import DropDownButton, {
  Item as DropDownButtonItem,
  Item,
} from "devextreme-react/drop-down-button";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useQuery } from "@tanstack/react-query";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { TextField } from "@/packages/components/text-field";
import "../Mst_InventoryCusReturn.scss";
import { NumberBox, Tabs, TextArea, TextBox } from "devextreme-react";
import { PopupInputLocation } from "../popup-input-location/PopupInputLocation";
import { TotalProduct } from "../components/InputNumberCustom/TotalProduct";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

interface CarListProps {
  calculateRef?: any;
}

export const CarList = forwardRef(
  ({ calculateRef }: CarListProps, ref: any) => {
    const { t } = useI18n("Car_DocReqListDL_create_carlist");
    const api = useClientgateApi();
    const popupInputLocationRef = useRef<any>(null);
    const totalProductRef = useRef<any>(null);

    const { data: GetAllDealer } = useQuery(
      ["Mst_Dealer_GetAllActive"],
      async () => {
        const response = await api.Mst_Dealer_GetAllActive();
        if (response.isSuccess) {
          return response.DataList;
        }
      }
    );
    const dataFake = [
      {
        CarId: "22222",
        DealerCode: "33333",
        Total: 0.0,
        VinColorCode: 0.0,
        VIN: 0.0,
        Sale: 0.0,
      },
      {
        CarId: "222223",
        DealerCode: "33333",
        Total: 0.0,
        VinColorCode: 0.0,
        VIN: 0.0,
        Sale: 0.0,
      },
      {
        CarId: "222224",
        DealerCode: "33333",
        Total: 0.0,
        VinColorCode: 0.0,
        VIN: 0.0,
        Sale: 0.0,
      },
    ];
    const formatNumber = (num: any) => {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: "VND",
      }).format(num);
    };

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
        dataField: "CarId",
        caption: t("CarId"),
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "VinColorCode",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Số lượng"),
        setCellValue: (newData: any, value: any, currentRowData: any) => {
          newData.VinColorCode = value;
          newData.Total = value * (currentRowData.VIN - currentRowData.Sale);
        },
        cellRender: (e: any) => {
          const {
            component: gridInstance,
            value,
            column: { dataField },
            rowIndex,
            columnIndex,
          } = e;
          totalProductRef.current?.setTotalProduct();
          return (
            <NumberBox
              className="Mst_Inventory_TextField"
              format="#,##0.00"
              onValueChanged={(ev: any) => {
                gridInstance.cellValue(rowIndex, dataField, ev.value);
                gridInstance.saveEditData();
              }}
              defaultValue={value}
            />
          );
        },
      },
      {
        dataField: "VIN",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Giá nhập"),
        setCellValue: (newData: any, value: any, currentRowData: any) => {
          newData.VIN = value;
          newData.Total =
            currentRowData?.VinColorCode * (value - currentRowData.Sale);
        },
        cellRender: (e: any) => {
          const {
            component: gridInstance,
            value,
            column: { dataField },
            rowIndex,
            columnIndex,
          } = e;

          return (
            <NumberBox
              className="Mst_Inventory_TextField"
              format="#,##0.00"
              onValueChanged={(ev: any) => {
                gridInstance.cellValue(rowIndex, dataField, ev.value);
                gridInstance.saveEditData();
              }}
              defaultValue={value ?? 0.0}
            />
          );
        },
      },
      {
        dataField: "Sale",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Giảm giá"),
        setCellValue: (newData: any, value: any, currentRowData: any) => {
          newData.Sale = value;
          newData.Total =
            currentRowData?.VinColorCode * (currentRowData.VIN - value);
        },
        cellRender: (e: any) => {
          const {
            component: gridInstance,
            value,
            column: { dataField },
            rowIndex,
            columnIndex,
          } = e;

          return (
            <NumberBox
              className="Mst_Inventory_TextField"
              format="#,##0.00"
              onValueChanged={(ev: any) => {
                gridInstance.cellValue(rowIndex, dataField, ev.value);
                gridInstance.saveEditData();
              }}
              defaultValue={value ?? 0.0}
            />
          );
        },
      },
      {
        dataField: "Total",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Tổng tiền"),
        cellRender: (e: any) => {
          const {
            component: gridInstance,
            value,
            column: { dataField },
            rowIndex,
            data,
            columnIndex,
          } = e;
          calculateRef.current.setTotal();

          return (
            <NumberBox
              className="Mst_Inventory_TextField"
              format="#,##0.00"
              readOnly={true}
              defaultValue={value ?? 0.0}
              value={data.VinColorCode * (data.VIN - data.Sale) ?? 0.0}
            />
          );
        },
      },

      {
        dataField: "DealerCodeRecieve",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DealerCodeRecieve"),
        cellRender: (e: any) => {
          const {
            component: gridInstance,
            value,
            column: { dataField },
            rowIndex,
            columnIndex,
          } = e;

          return (
            <div className="flex items-center justify-center gap-1">
              <TextField
                className="Mst_Inventory_TextField"
                formInstance={gridInstance}
                dataField={dataField}
                defaultValue={value}
                readOnly={true}
                width={"100%"}
              />
              <div>
                <BButton
                  label={""}
                  classNameIcon={""}
                  iconName="add"
                  onClick={() => {
                    popupInputLocationRef.current.setOpenPopup();
                  }}
                />
              </div>
            </div>
          );
        },
      },
      {
        dataField: "DealerNameRecieve",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DealerNameRecieve"),
        cellRender: (e: any) => {
          const {
            component: gridInstance,
            value,
            column: { dataField },
            rowIndex,
            columnIndex,
          } = e;

          return <TextArea className="Mst_Inventory_TextAreaField" />;
        },
      },
    ];

    const [carList, setCarList] = useState<any[]>([]);
    const showSelectCarPopup = useVisibilityControl({ defaultVisible: false });
    const showError = useSetAtom(showErrorAtom);

    const deleteConfirmationVisible = useVisibilityControl({
      defaultVisible: false,
    });
    const onDrop = useCallback(async (acceptedFiles: any) => {
      // const response = await api.CarDocReq_ImportForCarDocReqDL(
      //   acceptedFiles[0] ?? []
      // );
      // if (response.isSuccess) {
      //   toast.success(t("UploadSuccessfully"));
      //   handleSelectedCars(response.Data.Lst_Car_CarForCarDocReq);
      // } else {
      //   showError({
      //     message: t(response._strErrCode),
      //     _strErrCode: response._strErrCode,
      //     _strTId: response._strTId,
      //     _strAppTId: response._strAppTId,
      //     _objTTime: response._objTTime,
      //     _strType: response._strType,
      //     _dicDebug: response._dicDebug,
      //     _dicExcs: response._dicExcs,
      //   });
      // }
    }, []);

    const onDownloadTemplate = async () => {
      // const response = await api.CarDocReq_ExportTplForCarDocReqDL();
      // if (response.isSuccess) {
      //   toast.success(t("Download Successfully"));
      //   (window.location.href as any) = response.Data;
      // } else {
      //   showError({
      //     message: t(response._strErrCode),
      //     _strErrCode: response._strErrCode,
      //     _strTId: response._strTId,
      //     _strAppTId: response._strAppTId,
      //     _objTTime: response._objTTime,
      //     _strType: response._strType,
      //     _dicDebug: response._dicDebug,
      //     _dicExcs: response._dicExcs,
      //   });
      // }
    };

    const subGridToolbars: IToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <div className={"font-bold mx-2"}>{t("Hàng hóa")}</div>;
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <TextBox
              width={350}
              placeholder={t("Quét mã vạch hoặc nhập mã để tìm kiếm")}
              className="Mst_Inventory_TextField mx-2"
            />
          );
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <BButton
              classNameIcon=""
              label=""
              iconName="callmissed"
              onClick={() => {}}
            />
          );
        },
      },
      {
        location: "after",
        render: () => {
          return <TotalProduct ref={totalProductRef} gridRef={ref} />;
        },
      },
    ];

    const windowSize = useWindowSize();
    const toolbarItems: any[] = [
      {
        text: t(``),
        onClick: (e: any, ref: any) => {},
        shouldShow: (ref: any) => {
          return true;
        },
        widget: "customize",
        customize: (ref: any) => {
          const selectedRowsData =
            ref?.current?.instance?.getSelectedRowsData?.();

          const listsButtonDropDown: {
            content: ReactNode;
            visible?: boolean;
          }[] = [
            {
              content: <span className="text-[13px]">{t("Nhập excel")}</span>,
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Nhập hàng hóa")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Nhập lô")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Nhập serial")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <span className="text-[13px]">
                  {t("Xuất file excel template")}
                </span>
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Xuất hàng hóa")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Xuất lô")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
            {
              content: (
                <BButton
                  className="w-full text-center my-[2px] btn-center-text"
                  label={t("Xuất serial")}
                  onClick={() => {}}
                />
              ),
              visible: true,
            },
          ];
          return (
            <>
              <DropDownButton
                visible={true}
                icon="more"
                showArrowIcon={false}
                dropDownOptions={{
                  width: 200,
                }}
              >
                {listsButtonDropDown.map(
                  (
                    btn: { content: ReactNode; visible?: any },
                    index: number
                  ) => {
                    return (
                      <Item
                        key={index}
                        render={() => {
                          return <>{btn.content}</>;
                        }}
                        visible={btn.visible}
                      ></Item>
                    );
                  }
                )}
              </DropDownButton>
            </>
          );
        },
      },
    ];
    return (
      <div>
        <Tabs
          width={200}
          dataSource={[{ id: 0, text: "Danh mục hàng hóa" }]}
          keyExpr={"id"}
          defaultSelectedIndex={0}
          onSelectedIndexChange={(value) => {
            console.log(428, value);
          }}
        />
        <div className="mt-2">
          <GridViewOne
            isHiddenCheckBox={true}
            customHeight={windowSize.height - 280}
            isHidenHeaderFilter={true}
            ref={ref}
            keyExpr={"CarId"}
            dataSource={dataFake ?? []}
            columns={columns}
            isLoading={false}
            autoFetchData={false}
            allowSelection={false}
            storeKey={"Mst_CarDocReqDL-createNew-List"}
            fetchData={() => {}}
            editMode={true}
            editingOptions={{
              mode: "row",
              allowUpdating: false,
            }}
            customToolbarItems={toolbarItems ?? []}
            toolbarItems={subGridToolbars}
            // onSelectionGetData={handleSelectionChanged}
          />
        </div>
        <PopupInputLocation ref={popupInputLocationRef} />
      </div>
    );
  }
);
