import ScrollView from "devextreme-react/scroll-view";
import { SubGrid } from "@/packages/components/sub-grid";
import { Car_CarForLXX } from "@packages/types";
import DataGrid, { IToolbarItemProps } from "devextreme-react/data-grid";
import { BButton } from "@/packages/components/buttons";
import {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { useI18n } from "@/i18n/useI18n";
import { useVisibilityControl } from "@packages/hooks";
import { ColumnOptions } from "@/types";
import { LoadPanel, TextArea, TextBox } from "devextreme-react";
import { DeleteMultipleConfirmationBox } from "@/packages/components/delete-confirm-box";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useClientgateApi } from "@/packages/api";
import { useDropzone } from "react-dropzone";
import { QuanLyBanTinKyThuat_Item } from "@/packages/types/carservice/QuanLyBanTinKyThuat";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { SearchObject } from "../search-object/search-object";

interface CarListProps {}

export const ObjectList = forwardRef(
  ({}: CarListProps, ref: ForwardedRef<DataGrid>) => {
    const { t } = useI18n("QuanLyDonDatHangNCC");
    const [carList, setCarList] = useState<any[]>([
      {
        MaVatTu: "",
        TenVatTu: "",
      },
    ]);
    const showError = useSetAtom(showErrorAtom);
    const api = useClientgateApi();
    const [isLoading, setIsLoading] = useState(false);
    const windowSize = useWindowSize();
    const showSelectCarPopup = useVisibilityControl({ defaultVisible: false });

    const handleStartAddCar = () => {
      showSelectCarPopup.open();
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
        dataField: "MaVatTu", // được chỉnh sửa
        caption: t("MaVatTu"),
        visible: true,
        editorOptions: {
          readOnly: true,
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
            <div>
              <TextBox
                // elementAttr={{
                //   class: "customize-value-right-in-numberbox",
                // }}
                defaultValue={value}
                onValueChanged={(ev: any) => {
                  gridInstance.cellValue(rowIndex, dataField, ev.value);
                  // gridInstance.saveEditData();
                }}
                onEnterKey={handleStartAddCar}
              ></TextBox>
            </div>
          );
        },
      },

      // {
      //   dataField: "MaVatTu",
      //   visible: true,
      //   caption: t("MaVatTu"),
      // },
      {
        dataField: "TenVatTu",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("TenVatTu"),
      },
      {
        dataField: "DonViTinh ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DonViTinh"),
      },
      {
        dataField: "SoLuongDatToiThieu ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoLuongDatToiThieu"),
      },
      {
        dataField: "SoLuongDat ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoLuongDat"),
      },
      {
        dataField: "GhiChu ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("GhiChu"),
      },
      {
        dataField: "DonGiaTruocCK ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DonGiaTruocCK"),
      },
      {
        dataField: "ThanhTienTruocCK ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("ThanhTienTruocCK"),
      },
      {
        dataField: "ChieuKhau ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("ChieuKhau"),
      },
      {
        dataField: "DonGiaSauCK ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DonGiaSauCK"),
      },
      {
        dataField: "ThanhTienSauCK ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("ThanhTienSauCK"),
      },
      {
        dataField: "VAT ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("VAT"),
      },
      {
        dataField: "TienVAT ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("TienVAT"),
      },
      {
        dataField: "TongTienSauVAT ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("TongTienSauVAT"),
      },
    ];

    const onDownloadTemplate = async () => {
      // const response = await api.Sto_TranspReq_ExportTemplateCarHQ();
      // if (response.isSuccess) {
      //   toast.success(t("Download Successfully"));
      //   window.location.href = response.Data;
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
    const handleDeleteCars = () => {
      deleteConfirmationVisible.open();
    };
    const onDrop = useCallback(async (acceptedFiles: any) => {
      // const response = await api.Sto_TranspReq_ImportCarHQ(acceptedFiles[0] ?? [])
      // setIsLoading(true)
      // if (response.isSuccess) {
      //   toast.success(t("Upload successfully!"))
      //   // console.log(139, response.Data.Lst_Car_Car)
      //   handleSelectedCars(response.Data.Lst_Car_Car)
      //   setIsLoading(false)
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
    const { getRootProps } = useDropzone({ onDrop });
    const subGridToolbars: IToolbarItemProps[] = [
      {
        location: "before",
        render: () => {
          return <div className={"font-bold"}>{t("Thông tin vật tư")}</div>;
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <BButton
              visible={deleteButtonAvailable.visible}
              label={t("Delete")}
              onClick={handleDeleteCars}
            />
          );
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <div {...getRootProps()}>
              <BButton className={"btn-browse-file"} label={t("ImportExcel")} />
            </div>
          );
        },
      },
      // {
      //   location: "before",
      //   render: () => {
      //     return (
      //       <BButton label={t("ExportTemplate")} onClick={onDownloadTemplate} />
      //     );
      //   },
      // },
      {
        location: "after",
        render: () => {
          return (
            <div className={""}>
              {t("TotalRow")}: {carList.length}
            </div>
          );
        },
      },
    ];

    // ******************** NẾU KHÔNG XÓA ĐƯỢC THÌ CHECK LẠI là CarID hay CarId
    const handleSelectedCars = (selectedCars: QuanLyBanTinKyThuat_Item[]) => {
      // // filter out items in `selectedCars` and already in `carList`
      // const newItems = selectedCars.filter((item) => {
      //   return !carList.some((selectedCar) => {
      //     return item.CarID === selectedCar.CarID
      //   })
      // })
      // setCarList([
      //   ...carList,
      //   ...(newItems ?? [])
      // ]);
    };
    const deleteButtonAvailable = useVisibilityControl({
      defaultVisible: false,
    });
    const handleSelectionChanged = (e: any) => {
      if (ref) {
        const gridRef = ref as MutableRefObject<DataGrid>;
        if (
          gridRef &&
          gridRef.current.instance.getSelectedRowKeys().length > 0
        ) {
          deleteButtonAvailable.open();
          return;
        }
      }
      deleteButtonAvailable.close();
    };

    const handleDeleteRows = (keys: any[]) => {
      // setCarList(carList.filter((item) => !keys.includes(item.CarID)));
      DataRef.current?.current.instance.deselectRows(keys);
    };
    const deleteConfirmationVisible = useVisibilityControl({
      defaultVisible: false,
    });
    const onCancelDelete = () => {
      deleteConfirmationVisible.close();
    };
    const onDeleteConfirmed = () => {
      const gridRef = ref as MutableRefObject<DataGrid>;
      const selectedRows = gridRef.current?.instance.getSelectedRowKeys();
      if (selectedRows?.length > 0) {
        // setCarList(remainingCarList)
      }
      DataRef.current?.current.instance.deselectRows(selectedRows);
      deleteConfirmationVisible.close();
    };
    const DataRef = useRef<any>();
    return (
      <ScrollView>
        {/* Hiển thị danh sách các item feature, button toggle column  */}
        <GridViewOne
          ref={ref}
          keyExpr={"MaVatTu"}
          toolbarItems={subGridToolbars}
          dataSource={carList}
          columns={columns}
          onSelectionChanged={handleSelectionChanged}
          storeKey={"QuanLyDonDatHangNCC-create-obj-list"}
          onDeleteRows={handleDeleteRows}
          allowSelection={false}
          customHeight={windowSize.height - 500}
        />
        <SearchObject
          visible={showSelectCarPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => showSelectCarPopup.close()}
          onSelectedCars={handleSelectedCars}
          dataRef={DataRef}
        />
        {/* <LoadPanel
          container={".dx-viewport"}
          shadingColor="rgba(0,0,0,0.4)"
          position={"center"}
          visible={isLoading}
          showIndicator={true}
          showPane={true}
        /> */}
        {/* <DeleteMultipleConfirmationBox
          title={t("Delete")}
          message={t("DeleteMultipleConfirmationMessage")}
          onYesClick={onDeleteConfirmed}
          visible={deleteConfirmationVisible.visible}
          onNoClick={onCancelDelete}
        /> */}
      </ScrollView>
    );
  }
);
