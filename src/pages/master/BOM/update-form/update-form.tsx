import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Popup, ScrollView } from "devextreme-react";
import { IToolbarItemProps, ToolbarItem } from "devextreme-react/data-grid";
import { RequiredRule } from "devextreme-react/form";
import { nanoid } from "nanoid";
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import "./update-form.scss";
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
  gridViewOneRef: any
  onCancel: () => void
  fetchData?: () => void
  BOMCode: any
}
const UpdateForm = forwardRef(
  ({ visible, orderListRef, onCancel, gridViewOneRef, fetchData, BOMCode }: IProps, ref: any) => {
    const { t } = useI18n("Sto_DlvMinutes_HQ_UpdateValRealPopup");
    const api = useClientgateApi();
    const refDataGrid = useRef<any>(null);
    const windowSize = useWindowSize()
    const refSubmitButton = useRef<any>(null)
    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return refDataGrid;
      },
      show() {
        showSelectCarPopup.open();
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
        FlagActive: ""
      },
    });
    const showError = useSetAtom(showErrorAtom);
    const fetchDataByBOMCode = async () => {
      const resp: any = await api.BOM_GetByBOMCode(BOMCode.current);
      if (resp?.isSuccess) {
        const mstBom = resp.Data?.Lst_Mst_BOM[0]!
        // const mstBomDtl = resp.Data.Lst_Mst_BOMDtl

        if (mstBom) {
          setValue("BOMCode", mstBom.BOMCode!)
          setValue("BOMDesc", mstBom.BOMDesc!)
        }

        return {
          ...resp,
          DataList: resp.Data.Lst_Mst_BOMDtl
        };
      }
    };
    useEffect(() => {
      if (visible) {
        fetchDataByBOMCode()
      }
    }, [BOMCode.current])

    const showSelectCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });

    const handleSelectionChanged = (e: any) => { };

    const subGridToolbars: IToolbarItemProps[] = [
      // {
      //   location: "after",
      //   render: () => {
      //     return (
      //       <BButton label={t("SaveTFValReal")} onClick={handleSaveTFValReal} />
      //     );
      //   },
      // },
      // {
      //   location: "after",
      //   render: () => {
      //     return (
      //       <BButton label={t("SaveTPValReal")} onClick={handleSaveTPValReal} />
      //     );
      //   },
      // },
      // {
      //   location: "before",
      //   render: () => {
      //     return (
      //       <div className={""}>
      //         {t("TotalRow")}:
      //         {
      //           // refDataGrid.current.getDxInstance().current.option("dataSource")
      //           //   .length
      //         }
      //         {/* {t("TotalRow")}: {dataList.length} */}
      //       </div>
      //     );
      //   },
      // },
    ];
    const customeToolbars = [
      // {
      //   text: t(`SaveTFValReal`),
      //   onClick: (e: any, ref: any) => {
      //     if (ref.current) {
      //       handleSaveTFValReal();
      //     }
      //   },
      //   shouldShow: (ref: any) => {
      //     let check = false;
      //     if (ref.current) {
      //       if (ref.current?._instance?.getSelectedRowsData().length >= 1) {
      //         check = true;
      //       }
      //       return check;
      //     } else {
      //       return check;
      //     }
      //   },
      // },

    ];


    const handleSave = () => {
      gridViewOneRef.current.getDxInstance().saveEditData()
      refSubmitButton.current.click()
    }

    const onSubmit = async (data: any) => {
      const newBOMDtl = gridViewOneRef.current.getDxInstance().getDataSource()._items
      console.log(173, newBOMDtl)
      const condition = {
        Mst_BOM: {
          BOMCode: data.BOMCode,
          BOMDesc: data.BOMDesc,
          FlagActive: data.FlagActive,
        },
        Lst_Mst_BOMDtl: newBOMDtl,
      }

      const response = await api.BOM_Update(condition)
      if (response?.isSuccess) {
        // setSelectedRowKeys([]);      
        toast.success(t("Update successfully!"));
        showSelectCarPopup.close();
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
    }

    const columnsDetail = useColumnsDetail({});
    const methods = useForm();
    return (
      <div>
        <Popup
          visible={showSelectCarPopup.visible}
          title={t("BOM_Update")}
          showCloseButton={true}
          onHiding={() => {
            showSelectCarPopup.close();
            onCancel()
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
                                    disabled={true}
                                    field={field}
                                    label={t("BOMCode")}
                                    error={errors.BOMCode}
                                  />
                                );
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
                                    field={field}
                                    label={t("BOMDesc")}
                                    error={errors.BOMDesc}
                                  />
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row-span-2 relative ml-[5px]">
                      <div className="grid grid-cols-1 gap-[10px] px-[5px] pt-[10px]">
                        <div className="ttc">
                          {""}
                          <div className="">
                            <Controller
                              name={"FlagActive"}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <SelectBoxField
                                    // disabled={true}
                                    field={field}
                                    label={t("FlagActive")}
                                    error={errors.FlagActive}
                                    dataSource={[
                                      { label: t('All'), value: '' },
                                      { label: t('Active'), value: '1' },
                                      { label: t('Inactive'), value: '0' },
                                    ]}
                                    displayExpr={"label"}
                                    valueExpr="value"
                                  />
                                );
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
                  ref={refSubmitButton}
                  type={"submit"}
                  form={"editForm"}
                ></button>
              </form>
            </FormProvider>

            <GridViewOne
              ref={gridViewOneRef}
              dataSource={[]} // cars
              columns={columnsDetail}
              onSelectionChanged={handleSelectionChanged}
              autoFetchData={false}
              allowSelection={false}
              isLoading={false}
              fetchData={fetchDataByBOMCode}
              customToolbarItems={[]}
              customHeight={windowSize.height - 450}
              editMode={true}
              editingOptions={{
                mode: "batch",
                allowDeleting: false,
                onChangesChange: (value: any) => {
                  gridViewOneRef.current.getDxInstance().saveEditData()
                  // return 0
                }
              }}
              onEditRowChanges={() => {
                console.log(338)
                gridViewOneRef.current.getDxInstance().saveEditData()
              }
              }
              // onPageChanged={(number) => onRefetchData(number ?? 0)}
              // onSaving={handleSavingRow}
              // onEditorPreparing={handleEditorPreparing}
              // onRowDeleteBtnClick={handleDelete}
              // onDeleteMultiBtnClick={handleDeleteMulti}
              keyExpr={"PartCode"}
              storeKey={"BOM-update-form"}
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
              onClick: handleSave
            }}
          />
          <ToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location={"after"}
            options={{
              text: t("Cancel"),
              onClick: () => {
                showSelectCarPopup.close();
              }
            }}
          />
        </Popup>
      </div>
    );
  }
);

export default UpdateForm;
