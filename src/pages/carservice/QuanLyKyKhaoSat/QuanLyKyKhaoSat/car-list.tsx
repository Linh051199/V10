import ScrollView from "devextreme-react/scroll-view";
import { SubGrid } from "@/packages/components/sub-grid";
import { Car_CarForLXX } from "@packages/types";
import DataGrid, {
  IToolbarItemProps,
  RequiredRule,
} from "devextreme-react/data-grid";
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
import { Alignment, ColumnOptions } from "@/types";
import {
  LoadPanel,
  SelectBox,
  TextArea,
  TextBox,
  Validator,
} from "devextreme-react";
import { DeleteMultipleConfirmationBox } from "@/packages/components/delete-confirm-box";
import { SearchCar } from "../search-car/search-car";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useClientgateApi } from "@/packages/api";
import { useDropzone } from "react-dropzone";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";

interface CarListProps {
  data: any;
}

export const CarList = forwardRef(
  ({ data }: CarListProps, ref: ForwardedRef<DataGrid>) => {
    const { t } = useI18n("Dlr_ContractCancel");
    const columns = [
      {
        dataField: "Idx",
        visible: true,
        caption: t("STT"),
        width: 80,
        minWidth: 80,
        editorOptions: {
          readOnly: true,
        },
        alignment: "center" as Alignment,
        cellRender: (e: any) => {
          return <span>{e.rowIndex + 1}</span>;
        },
      },
      {
        dataField: "MaKyKhaoSat",
        visible: true,
        caption: t("MaKyKhaoSat"),
        width: 200,
        minWidth: 200,
        editorOptions: {
          readOnly: true,
        },
        alignment: "center" as Alignment,
        // cellRender: (e: any) => {
        //   return (
        //     <Link
        //       label={e.value}
        //       onClick={() => {
        //         handleViewDetail(e.value);
        //       }}
        //     />
        //   );
        // },
      },
      {
        dataField: "NoiDung",
        visible: true,
        caption: t("NoiDung"),
        width: 200,
        minWidth: 200,
        alignment: "center" as Alignment,
      },
      {
        dataField: "ThoiGianBatDau",
        visible: true,
        caption: t("ThoiGianBatDau"),
        width: 200,
        minWidth: 200,
        alignment: "center" as Alignment,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "ThoiGianKetThuc",
        visible: true,
        caption: t("ThoiGianKetThuc"),
        width: 200,
        minWidth: 200,
        alignment: "center" as Alignment,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "TrangThaiKhaoSat",
        visible: true,
        caption: t("TrangThaiKhaoSat"),
        width: 200,
        minWidth: 200,
        alignment: "center" as Alignment,
      },
    ];

    const [carList, setCarList] = useState<any[]>([]);
    const showSelectCarPopup = useVisibilityControl({ defaultVisible: false });
    const showError = useSetAtom(showErrorAtom);
    const api = useClientgateApi();
    const handleStartAddCar = () => {
      showSelectCarPopup.open();
    };
    const [isLoading, setIsLoading] = useState(false);

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
          return <div className={"font-bold"}>{t("ContractList")}</div>;
        },
      },
      {
        location: "before",
        render: () => {
          return (
            <BButton label={t("AddNewContract")} onClick={handleStartAddCar} />
          );
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
    const handleSelectedCars = (selectedCars: any[]) => {
      // filter out items in `selectedCars` and already in `carList`
      const newItems = selectedCars.filter((item) => {
        return !carList.some((selectedCar) => {
          return item.DlrContractNo === selectedCar.DlrContractNo;
        });
      });
      setCarList([...carList, ...(newItems ?? [])]);
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
      setCarList(carList.filter((item) => !keys.includes(item.DlrContractNo)));
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
        setCarList(
          carList.filter((item) => !selectedRows.includes(item.DlrContractNo))
        );
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
          autoFetchData={false}
          allowSelection={true}
          isLoading={false}
          // onReady={(refValue: any) => {
          //   gridRef = refValue;
          // }}
          ref={DataRef}
          dataSource={[
            {
              MaKyKhaoSat: "abc",
            },
          ]}
          // fetchData={fetchData}
          columns={columns}
          editMode={true}
          editingOptions={{
            mode: "row",
          }}
          // customToolbarItems={toolbarItems}
          // onSelectionChanged={handleSelectionChanged}
          keyExpr={"MaKyKhaoSat"}
          storeKey={"QuanLyKyKhaoSat-order-list"}
        />
        <SearchCar
          visible={showSelectCarPopup.visible}
          container={".dx-viewport"}
          position={"left"}
          onHidding={() => showSelectCarPopup.close()}
          onSelectedCars={handleSelectedCars}
          dataRef={DataRef}
        />
        <LoadPanel
          container={".dx-viewport"}
          shadingColor="rgba(0,0,0,0.4)"
          position={"center"}
          visible={isLoading}
          showIndicator={true}
          showPane={true}
        />
        <DeleteMultipleConfirmationBox
          title={t("Delete")}
          message={t("DeleteMultipleConfirmationMessage")}
          onYesClick={onDeleteConfirmed}
          visible={deleteConfirmationVisible.visible}
          onNoClick={onCancelDelete}
        />
      </ScrollView>
    );
  }
);
