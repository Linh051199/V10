import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Button, NumberBox, Popup, ScrollView } from "devextreme-react";
import { IToolbarItemProps, ToolbarItem } from "devextreme-react/data-grid";
import { RequiredRule } from "devextreme-react/form";
import { nanoid } from "nanoid";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import "./update-form.scss";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useVisibilityControl } from "@/packages/hooks";
// import { useColumnsDetail } from "../components/use-columns-detail";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { data } from "@/pages/carservice/NPPQuanLyChienDich/components/data";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
import { BButton } from "@/packages/components/buttons";
import { useDropzone } from "react-dropzone";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";

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
  BOMCode?: any
  onRefetch: () => void
  code: any
}
const PopupUpdateVideoTuVan = forwardRef(
  ({ visible, orderListRef, onCancel, gridViewOneRef, fetchData, BOMCode, onRefetch, code }: IProps, ref: any) => {
    const { t } = useI18n("Ser_Mst_FilePathVideoCreate");
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
        FlagActive: "",
        FilePathAvatar: ""
      },
    });
    const showError = useSetAtom(showErrorAtom);

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

    const fetchDataByGetByFilePathVideoCode = async () => {
      const resp: any = await api.Ser_Mst_FilePathVideoApi_GetByFilePathVideoCode(code);
      if (resp?.isSuccess) {
        setValue("FilePathVideoCode", resp.Data.FilePathVideoCode)
        setValue("FilePathVideoName", resp.Data.FilePathVideoName)
        setValue("FlagActive", resp.Data.FlagActive)
        setValue("FilePathVideo", resp.Data.FilePathVideo)
        setValue("FilePathAvatar", resp.Data.FilePathAvatar)
        setValue("IdxView", resp.Data.IdxView)
      }
    };

    useEffect(() => {
      if (showSelectCarPopup.visible) {
        fetchDataByGetByFilePathVideoCode()
      }
    }, [code.current])

    const handleSave = () => {
      // gridViewOneRef.current.getDxInstance().saveEditData()
      refSubmitButton.current.click()
    }

    const onSubmit = async (data: any) => {
      console.log(172, data)
      const condition = {
        Ser_Mst_FilePathVideo: {
          FilePathVideoCode: data.FilePathVideoCode,
          FilePathVideoName: data.FilePathVideoName,
          FlagActive: data.FlagActive ? 1 : 0,
          IdxView: data.IdxView,
          FilePathVideo: data.FilePathVideo,
          FilePathAvatar: data.FilePathAvatar,
          Remark: data.Remark
        }
      }

      const response = await api.Ser_Mst_FilePathVideoApi_Update(condition)
      if (response?.isSuccess) {
        // setSelectedRowKeys([]);      
        toast.success(t("Update successfully!"));
        showSelectCarPopup.close();
        onRefetch()
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
    const onDrop = useCallback(async (acceptedFiles: any) => {
      // console.log(208, acceptedFiles)
    }, [])

    // const columnsDetail = useColumnsDetail({});
    const { getRootProps } = useDropzone({ onDrop });
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
                <div className="grid mt-[20px] gap-[10px]">
                  <div className="col-span-4 grid-cols-2 grid">
                    <div className="row-span-2 relative ml-[5px]">
                      <div className="grid grid-cols-1 gap-[10px] px-[5px] pt-[10px]">
                        <div className="ttc">
                          {""}
                          <div className="">
                            <Controller
                              name={"FilePathVideoCode"}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextBoxField
                                    disabled={true}
                                    field={field}
                                    label={t("FilePathVideoCode")}
                                    error={errors.FilePathVideoCode}
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
                              name={"FilePathVideoName"}
                              control={control}
                              render={({ field }) => {
                                return (
                                  <TextBoxField
                                    // disabled={true}
                                    field={field}
                                    label={t("FilePathVideoName")}
                                    error={errors.FilePathVideoName}
                                  />
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 grid-cols-1 grid">
                    <div className="grid grid-cols-1 gap-[10px] ml-[5px] px-[5px]">
                      <div>
                        {" "}
                        <div className="">
                          <Controller
                            name={"FilePathVideo"}
                            control={control}
                            render={({ field }) => {
                              return (
                                <TextBoxField
                                  // disabled={true}
                                  field={field}
                                  label={t("FilePathVideo")}
                                  error={errors.FilePathVideo}
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 grid-cols-6 grid d-flex">
                    <div className="grid grid-cols-1 col-span-5  gap-[10px] ml-[5px] px-[5px]">
                      <div>
                        {" "}
                        <div className="">
                          <Controller
                            name={"FilePathAvatar"}
                            control={control}
                            render={({ field }) => {
                              return (
                                <TextBoxField
                                  disabled={true}
                                  field={field}
                                  label={t("FilePathAvatar")}
                                  error={errors.FilePathAvatar}
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 col-span-1 gap-[10px] mt-[5px] ml-[5px] px-[5px]">
                      <div>
                        {/* <div {...getRootProps()}> */}
                        {/* <BButton className={"btn-browse-file"} label={t("ImportExcel")} /> */}
                        <Button
                          style={{
                            background: "#00703c",
                            color: "#fff",
                            margin: 0,
                          }}
                          text="Browse"
                          onClick={() => {
                            setValue("FilePathAvatar", "https://i.pinimg.com/originals/b6/f4/89/b6f489bfe0e45f4e839322d7d158cba1.jpg")
                          }}
                        // onClick={handleOpenImage}
                        ></Button>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 grid-cols-1 grid d-flex">
                    <div className="grid grid-cols-1 col-span-1  gap-[10px] ml-[5px] px-[5px]">
                      <div>
                        {" "}
                        <div className="h-96">
                          <Controller
                            name={"FilePathAvatar"}
                            control={control}
                            render={({ field }) => {
                              return (
                                <div>
                                  <span>Preview</span>
                                  <div className="border-[1px] border-[#bebebe] h-[500px] flex justify-center">
                                    {
                                      field.value ?
                                        <div className="h-[100%]">
                                          <img src={field.value} alt="" className="h-full" />
                                        </div>
                                        :
                                        <span>No image data</span>
                                    }
                                  </div>
                                </div>

                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 grid-cols-4 grid d-flex">
                    <div className="grid grid-cols-1 col-span-1  gap-[10px] ml-[5px] px-[5px]">
                      <div>
                        {" "}
                        <div className="h-96">
                          <Controller
                            name={"IdxView"}
                            control={control}
                            render={({ field }) => {
                              return (
                                <NumberBoxField
                                  // disabled={true}
                                  field={field}
                                  label={t("IdxView")}
                                  error={errors.IdxView}
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 grid-cols-4 grid d-flex">
                    <div className="grid grid-cols-1 col-span-1  gap-[10px] ml-[5px] px-[5px]">
                      <div>
                        {" "}
                        <div className="h-96">
                          <Controller
                            name={"FlagActive"}
                            control={control}
                            render={({ field }) => {
                              return (
                                <CheckBoxField
                                  // disabled={true}
                                  field={field}
                                  label={t("FlagActive")}
                                // error={errors.FlagActive}
                                />
                              );
                            }}
                          />
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

export default PopupUpdateVideoTuVan;
