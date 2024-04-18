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
import { SerCustomerSearch } from "../search-car/search-car";
import { toast } from "react-toastify";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useClientgateApi } from "@/packages/api";
import { useDropzone } from "react-dropzone";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { isAlertDuplicateFunc } from "@/packages/common";

interface SerCustomerProps {}

export const SerCustomerList = forwardRef(
  ({}: SerCustomerProps, ref: ForwardedRef<DataGrid>) => {
    const { t } = useI18n("FrmMngDlr_PDIRequestCreateNew");
    const windowSize = useWindowSize();
    const columns: ColumnOptions[] = [
      {
        caption: t("STT"),
        dataField: "STT",
        cellRender: ({ rowIndex }) => {
          return <span>{rowIndex + 1}</span>;
        },
        visible: true,
        alignment: "center",
        width: 70,
        allowSorting: false,
        allowFiltering: false,
      },

      {
        dataField: "CusName",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("CusName"),
        columns: [
          {
            dataField: "Tel",
            visible: true,
            editorOptions: {
              readOnly: true,
            },
            caption: t("Tel"),
          },
        ],
      },
      {
        dataField: "Tel",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Tel"),
      },
      {
        dataField: "Mobile",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Mobile"),
      },
      {
        dataField: "Email",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Email"),
      },
      {
        dataField: "Address",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("Address"),
      },
      {
        dataField: "ContName",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("ContName"),
      },
      {
        dataField: "SoKhung",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoKhung"),
      },
      {
        dataField: "SoKhung",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoKhung"),
      },
      {
        dataField: "SoKhung",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoKhung"),
      },
      {
        dataField: "SoKhung",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoKhung"),
      },
      {
        dataField: "SoKhung",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoKhung"),
      },
      {
        dataField: "SoKhung",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoKhung"),
      },
      {
        dataField: "SoKhung",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoKhung"),
      },
      {
        dataField: "SoKhung",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        caption: t("SoKhung"),
      },
    ];

    const [SerCustomer, setSerCustomer] = useState<any[]>([]);
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
            <BButton label={t("Thêm khách hàng")} onClick={handleStartAddCar} />
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
              {t("TotalRow")}: {SerCustomer.length}
            </div>
          );
        },
      },
    ];

    // ******************** NẾU KHÔNG XÓA ĐƯỢC THÌ CHECK LẠI là CarID hay CarId
    const handleSelectedCars = (selectedCars: any[]) => {
      // filter out items in `selectedCars` and already in `SerCustomer`
      const newItems = selectedCars.filter((item) => {
        return !SerCustomer.some((selectedCar) => {
          return item.DlrContractNo === selectedCar.DlrContractNo;
        });
      });
      // setSerCustomer([
      //   ...SerCustomer,
      //   ...(newItems ?? [])
      // ]);
      gridRef.current.setPageData({
        DataList: [...selectedCars],
      });
    };

    // const handleSelectedCars = (selectedCars: any) => {
    //   // filter out items in `selectedCars` and already in `carList`
    //   const newItems = selectedCars.filter((item: any) => {
    //     return !SerCustomer.some((selectedCar: any) => {
    //       return item.ModelCode === selectedCar.ModelCode;
    //     });
    //   });
    //   setSerCustomer([...SerCustomer, ...(newItems ?? [])]);
    //   gridRef.current.setPageData({
    //     DataList: {
    //       ...selectedCars
    //     }
    //   })
    // };
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
      setSerCustomer(
        SerCustomer.filter((item) => !keys.includes(item.DlrContractNo))
      );
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
        setSerCustomer(
          SerCustomer.filter(
            (item) => !selectedRows.includes(item.DlrContractNo)
          )
        );
        // setSerCustomer(remainingSerCustomer)
      }
      DataRef.current?.current.instance.deselectRows(selectedRows);
      deleteConfirmationVisible.close();
    };
    const DataRef = useRef<any>();
    const gridRef = useRef<any>(null);

    return (
      <ScrollView>
        {/* Hiển thị danh sách các item feature, button toggle column  */}
        <GridViewOne
          ref={gridRef}
          keyExpr={"DlrContractNo"}
          toolbarItems={subGridToolbars}
          dataSource={[]}
          columns={columns}
          isHidenHeaderFilter={true}
          // onSelectionChanged={handleSelectionChanged}
          storeKey={"quanlykykhaosat-create-car-list-columns"}
          onDeleteRows={handleDeleteRows}
          allowSelection={false}
        />
        <SerCustomerSearch
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
