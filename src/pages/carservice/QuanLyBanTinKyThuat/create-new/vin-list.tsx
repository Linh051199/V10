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
import { LoadPanel, TextArea } from "devextreme-react";
import { DeleteMultipleConfirmationBox } from "@/packages/components/delete-confirm-box";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useClientgateApi } from "@/packages/api";
import { useDropzone } from "react-dropzone";
import { QuanLyBanTinKyThuat_Item } from "@/packages/types/carservice/QuanLyBanTinKyThuat";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

interface CarListProps {}

export const VINList = forwardRef(
  ({}: CarListProps, ref: ForwardedRef<DataGrid>) => {
    const { t } = useI18n("QuanLyBanTinKyThuat");
    const [carList, setCarList] = useState<QuanLyBanTinKyThuat_Item[]>([]);
    const showError = useSetAtom(showErrorAtom);
    const api = useClientgateApi();
    const [isLoading, setIsLoading] = useState(false);
    const windowSize = useWindowSize();

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
        dataField: "VIN ",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("VIN "),
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
          return <div className={"font-bold"}>{t("VINList")}</div>;
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
      {
        location: "before",
        render: () => {
          return (
            <BButton label={t("ExportTemplate")} onClick={onDownloadTemplate} />
          );
        },
      },
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
          keyExpr={"VIN"}
          toolbarItems={subGridToolbars}
          dataSource={carList}
          columns={columns}
          onSelectionChanged={handleSelectionChanged}
          storeKey={"QuanLyBanTinKyThuat-create-vin-list"}
          onDeleteRows={handleDeleteRows}
          allowSelection={false}
          customHeight={windowSize.height - 500}
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
