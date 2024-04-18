import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Button, Popup, ScrollView } from "devextreme-react";
import { IToolbarItemProps, ToolbarItem } from "devextreme-react/data-grid";
import { RequiredRule } from "devextreme-react/form";
import { nanoid } from "nanoid";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { toast } from "react-toastify";
import "./create-form.scss";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useVisibilityControl } from "@/packages/hooks";
import { useColumnsDetail } from "../components/use-columns-detail";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { data } from "@/pages/carservice/NPPQuanLyChienDich/components/data";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { useDropzone } from "react-dropzone";
import { BButton } from "@/packages/components/buttons";
import { ColumnOptions } from "@/types";

interface IDataValueReal {
  keyParam?: string;
  DlvMnNo: string;
  TransporterCode: string;
  FApprovedDate: string;
  FDlvMnStatus: string;
  TDlvMnStatus: string;
  TFVCode: string;
  TFValSys: string;
  TFValReal: string;
  TPValSys: string;
  TPValReal: string;
  TFRemark: string;
}
interface IProps {
  visible: true | false;
  orderListRef: any;
  gridViewOneRef: any;
  onCancel: () => void;
  fetchData?: () => void;
  BOMCode: any;
  onRefetchData: () => void;
}

const ImportExcel = ({ onDrop }: { onDrop: any }) => {
  const { t } = useI18n("BOM_Create_Popup");
  const { getRootProps } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()}>
        <BButton className={"btn-browse-file"} label={t("ImportExcel")} />
      </div>
    </div>
  );
};

const CreateForm = forwardRef(
  (
    {
      visible,
      orderListRef,
      onCancel,
      gridViewOneRef,
      fetchData,
      BOMCode,
      onRefetchData,
    }: IProps,
    ref: any
  ) => {
    const { t } = useI18n("BOM_Create_Popup");
    const api = useClientgateApi();
    const refDataGrid = useRef<any>(null);
    const windowSize = useWindowSize();
    const refSubmitButtonCreate = useRef<any>(null);
    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return refDataGrid;
      },
      show() {
        showCreateCarPopup.open();
      },
    }));

    const {
      register,
      reset,
      unregister,
      watch,
      control,
      setValue,
      handleSubmit,
      setError,
      getValues,
      formState: { errors },
    } = useForm<any>({
      defaultValues: {
        BOMCode: "",
        BOMDesc: "",
        FlagActive: "",
      },
    });
    const showError = useSetAtom(showErrorAtom);
    const fetchDataByBOMCode = async () => {
      const resp: any = await api.BOM_GetByBOMCode(BOMCode.current);
      if (resp?.isSuccess) {
        const mstBom = resp.Data?.Lst_Mst_BOM[0]!;
        // const mstBomDtl = resp.Data.Lst_Mst_BOMDtl
        if (mstBom) {
          setValue("BOMCode", mstBom.BOMCode!);
          setValue("BOMDesc", mstBom.BOMDesc!);
        }

        return {
          ...resp,
          DataList: resp.Data.Lst_Mst_BOMDtl,
        };
      }
    };
    useEffect(() => {
      if (visible) {
        fetchDataByBOMCode();
      }
    }, [BOMCode.current]);

    const showCreateCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });

    const handleSelectionChanged = (e: any) => {};

    const onDrop = useCallback(async (acceptedFiles: any) => {
      // setIsLoading(true);
      const response = await api.BOM_Import(acceptedFiles[0] ?? []);
      if (response.isSuccess) {
        toast.success(t("Upload successfully!"));
        // handleSelectedCars(response.Data.Lst_Car_VIwN);
        gridViewOneRef.current.setPageData({
          DataList: response.Data,
        });
        // setIsLoading(false);
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
      // setIsLoading(false);
    }, []);
    const formRef = useRef<any>();

    const handleSave = () => {
      refSubmitButtonCreate.current.click();
    };

    const onSubmit = async (data: any) => {
      const newBOMDtl = gridViewOneRef.current
        .getDxInstance()
        .getDataSource()._items;
      console.log(156, newBOMDtl);
      const condition = {
        Mst_BOM: {
          BOMCode: data.BOMCode,
          BOMDesc: data.BOMDesc,
        },
        Lst_Mst_BOMDtl: newBOMDtl,
      };

      const response = await api.BOM_Create(condition);
      if (response?.isSuccess) {
        // setSelectedRowKeys([]);
        toast.success(t("Update successfully!"));
        showCreateCarPopup.close();
        await onRefetchData();
        // return response;
      } else {
        showError({
          message: t(response!._strErrCode),
          _strErrCode: response!._strErrCode,
          _strTId: response!._strTId,
          _strAppTId: response!._strAppTId,
          _objTTime: response!._objTTime,
          _strType: response!._strType,
          _dicDebug: response!._dicDebug,
          _dicExcs: response!._dicExcs,
        });
      }
    };

    const subGridToolbars: IToolbarItemProps[] = [
      // {
      //   location: "before",
      //   render: () => {
      //     return <Button
      //       stylingMode={"contained"}
      //       type="default"
      //       text={t("AddNew")}
      //       onClick={() => {
      //         handleAddNew()
      //       }}
      //       className={"mx-1"}
      //     />
      //   }
      // },
      {
        location: "before",
        render: () => {
          return (
            <div>
              <ImportExcel onDrop={onDrop} />
            </div>
          );
        },
      },
    ];

    const methods = useForm();

    const columns: ColumnOptions[] = [
      {
        dataField: "PartCode",
        caption: t("PartCode"),
        visible: true,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorOptions: {
          readOnly: false,
        },
      },
      {
        dataField: "PartName",
        caption: t("PartName"),
        visible: true,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: false,
        },
      },
      {
        dataField: "Unit",
        caption: t("Unit"),
        visible: true,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: false,
        },
      },
      {
        dataField: "QtyMin",
        caption: t("QtyMin"),
        visible: true,
        columnIndex: 1,
        groupKey: "BASIC_INFORMATION",
        editorType: "dxTextBox",
        editorOptions: {
          readOnly: false,
        },
      },
    ];
    const { t: validateMessage } = useI18n("Validate");

    return (
      <div>
        <Popup
          visible={showCreateCarPopup.visible}
          title={t("BOM_Create")}
          showCloseButton={true}
          onHiding={() => {
            showCreateCarPopup.close();
            onCancel();
          }}
        >
          <ScrollView
            style={{
              scrollBehavior: "smooth",
            }}
            className=""
            useNative
          >
            <FormProvider {...methods}>
              <form
                className="flex flex-col ttkh"
                id={"editForm"}
                // ref={formRef}
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid  mt-[20px] gap-[10px]">
                  <div className="col-span-4 grid-cols-2 grid">
                    <div className="row-span-2 relative ml-[5px]">
                      <div className="grid grid-cols-1 gap-[10px] px-[5px] pt-[10px]">
                        <div className="ttc">
                          {""}
                          <div className="">
                            <Controller
                              name={"BOMCode"}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextBoxField
                                    // disabled={true}
                                    required
                                    field={field}
                                    label={t("BOMCode")}
                                    error={errors.BOMCode}
                                  />
                                );
                              }}
                              rules={{
                                required: {
                                  value: true,
                                  message: validateMessage(
                                    "BOMCode is required!"
                                  ),
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-[10px]  px-[5px]">
                        <div>
                          {" "}
                          <div className="">
                            <Controller
                              name={"BOMDesc"}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextBoxField
                                    // disabled={true}
                                    required={true}
                                    field={field}
                                    label={t("BOMDesc")}
                                    error={errors.BOMDesc}
                                  />
                                );
                              }}
                              rules={{
                                required: {
                                  value: true,
                                  message: validateMessage(
                                    "BOMDesc is required!"
                                  ),
                                },
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  hidden={true}
                  ref={refSubmitButtonCreate}
                  type={"submit"}
                  form={"editForm"}
                ></button>
              </form>
            </FormProvider>

            <GridViewOne
              ref={gridViewOneRef}
              dataSource={[]} // cars
              columns={columns}
              onSelectionChanged={handleSelectionChanged}
              // autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              // fetchData={fetchDataByBOMCode}
              customToolbarItems={[]}
              customHeight={windowSize.height - 450}
              editMode={true}
              toolbarItems={subGridToolbars}
              editingOptions={{
                mode: "batch",
              }}
              onEditRowChanges={() => {}}
              // onPageChanged={(number) => onRefetchData(number ?? 0)}
              // onSaving={handleSavingRow}
              // onEditorPreparing={handleEditorPreparing}
              // onRowDeleteBtnClick={handleDelete}
              // onDeleteMultiBtnClick={handleDeleteMulti}
              keyExpr={"PartCode"}
              storeKey={"BOM-create-form"}
            />
          </ScrollView>
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: t("Select"),
              type: "default",
              stylingMode: "contained",
              onClick: handleSave,
            }}
          />
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: t("Cancel"),
              onClick: () => {
                gridViewOneRef.current.setPageData({
                  DataList: [],
                });
                reset("BOMCode");
                reset("BOMDesc");
                console.log(407, formRef);
                showCreateCarPopup.close();
              },
            }}
          />
        </Popup>
      </div>
    );
  }
);

export default CreateForm;
