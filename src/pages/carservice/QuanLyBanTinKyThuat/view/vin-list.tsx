import ScrollView from "devextreme-react/scroll-view";
import { SubGrid } from "@/packages/components/sub-grid";
import { CarDeliveryOrder, CarDeliveryOrderDetail } from "@packages/types";
import DataGrid, { IToolbarItemProps } from "devextreme-react/data-grid";
import { BButton } from "@/packages/components/buttons";
import {
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useCallback,
  useRef,
} from "react";
import { useI18n } from "@/i18n/useI18n";
import { useNetworkNavigate, useVisibilityControl } from "@packages/hooks";
import { Alignment, ColumnOptions } from "@/types";
import { DeleteConfirmationBox } from "@packages/ui/modal";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StatusValue } from "@/packages/components/status-value/status-value";
import {
  QuanLyBanTinKyThuat,
  QuanLyBanTinKyThuat_Item,
} from "@/packages/types/carservice/QuanLyBanTinKyThuat";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useDropzone } from "react-dropzone";

interface CarListProps {
  order: any;
  cars: any[];
  onDeleteSingle: (key: string) => void;
  onDeleteMultiple: (keys: string[]) => void;
  queryKey: string[];
}

export const VINList = forwardRef(
  (
    { cars, order, onDeleteSingle, onDeleteMultiple, queryKey }: CarListProps,
    ref: ForwardedRef<DataGrid>
  ) => {
    const { t } = useI18n("StoTranspReqPage");
    const params = useParams();
    const navigate = useNetworkNavigate();

    console.log("car", cars);

    const columns: ColumnOptions[] = [
      {
        dataField: "STT",
        caption: t("STT"),
        visible: true,
        cellRender: ({ rowIndex }: any) => {
          return <div>{rowIndex + 1}</div>;
        },
      },
      {
        dataField: "VIN",
        visible: true,
        caption: t("VIN"),
      },
      {
        dataField: "TrangThai ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("TrangThai "),
      },
      {
        dataField: "DaiLy ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("DaiLy "),
      },
    ];
    const handleDelete = () => {
      const gridRef = ref as MutableRefObject<DataGrid>;
      if (
        gridRef &&
        gridRef.current &&
        gridRef.current.instance.getSelectedRowKeys().length === 0
      ) {
        return;
      }
      controlConfirmBoxVisible.open();
    };

    const deleteVisible = useVisibilityControl({ defaultVisible: false });
    const handleSelectionChanged = (e: any) => {
      const gridRef = ref as MutableRefObject<DataGrid>;
      if (
        gridRef &&
        gridRef.current &&
        gridRef.current?.instance.getSelectedRowsData().length > 0
      ) {
        deleteVisible.open();
      } else {
        deleteVisible.close();
      }
    };
    const onCancelDelete = () => {
      controlConfirmBoxVisible.close();
    };
    const onCancelDeleteSingle = () => {
      confirmDeleteSingleVisible.close();
      localStorage.removeItem("carDeliveryOrderDeleteItem");
    };
    const onDelete = async () => {
      const gridRef = ref as MutableRefObject<DataGrid>;
      const keys = gridRef.current?.instance.getSelectedRowKeys();
      onDeleteMultiple(keys);
    };

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
          return <div className={"font-bold mr-2"}>{t("VINList")}</div>;
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
      {
        location: "before",
        render: () => {
          return (
            <BButton label={t("ExportTemplate")} onClick={onDownloadTemplate} />
          );
        },
      },

      {
        location: "before",
        render: () => {
          return (
            <BButton
              label={t("Delete")}
              onClick={handleDelete}
              visible={deleteVisible.visible}
            />
          );
        },
      },
      {
        location: "after",
        render: () => {
          return (
            <div className={""}>
              {t("TotalRow")}: {cars.length}
            </div>
          );
        },
      },
    ];
    const handleStartDelete = (key: string) => {
      // set value to input via ref
      localStorage.setItem("carDeliveryOrderDeleteItem", key);
      confirmDeleteSingleVisible.open();
    };
    const handleDeleteSingle = () => {
      // get selected item from input via ref
      const selectedItem = localStorage.getItem("carDeliveryOrderDeleteItem");
      if (selectedItem) {
        onDeleteSingle(selectedItem);
        localStorage.removeItem("carDeliveryOrderDeleteItem");
      }
    };
    const deletingItemRef = useRef<any>(null);
    const controlConfirmBoxVisible = useVisibilityControl({
      defaultVisible: false,
    });
    const confirmDeleteSingleVisible = useVisibilityControl({
      defaultVisible: false,
    });
    return (
      <ScrollView>
        {/* <SubGrid
          ref={ref}
          toolbarItems={subGridToolbars}
          dataSource={cars}
          columns={columns}
          onSelectionChanged={handleSelectionChanged}
          onStartDelete={handleStartDelete}
          showActions={true}
          keyExpr={"CarId"}
        /> */}
        <GridViewOne
          autoFetchData={true}
          editMode={false}
          ref={ref}
          dataSource={cars}
          columns={columns}
          allowSelection={true}
          onSelectionChanged={handleSelectionChanged}
          toolbarItems={subGridToolbars}
          keyExpr={"VIN"}
          storeKey={"QuanLyBanTinKyThuat-view-list"}
        />

        <input type={"hidden"} ref={deletingItemRef} value={""} />
        <div>
          <DeleteConfirmationBox
            control={controlConfirmBoxVisible}
            title={t("Are you sure to delete selected records")}
            onYesClick={onDelete}
            onNoClick={onCancelDelete}
          />
        </div>
        <div>
          <DeleteConfirmationBox
            control={confirmDeleteSingleVisible}
            title={t("DeleteSingleConfirm")}
            onYesClick={handleDeleteSingle}
            onNoClick={onCancelDeleteSingle}
          />
        </div>
      </ScrollView>
    );
  }
);
