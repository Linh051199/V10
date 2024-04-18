import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useVisibilityControl } from "@/packages/hooks";
import { Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { toast } from "react-toastify";
import "./update-form.scss";
// import { useColumnsDetail } from "../components/use-columns-detail";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { format } from "date-fns";
import { useSetAtom } from "jotai";
import { useDropzone } from "react-dropzone";
import { Controller, FormProvider, useForm } from "react-hook-form";

interface IProps {
  visible: true | false;
  orderListRef: any;
  gridViewOneRef: any;
  onCancel: () => void;
  fetchData?: () => void;
  onRefetch: () => void;
}
const PopupCreateSerCampaign = forwardRef(
  (
    {
      visible,
      orderListRef,
      onCancel,
      gridViewOneRef,
      fetchData,
      onRefetch,
    }: IProps,
    ref: any
  ) => {
    const { t } = useI18n("Ser_Mst_FilePathVideoCreate");

    const formRef = useRef(null);
    const { t: validateMessage } = useI18n("Validate");

    const api = useClientgateApi();
    const refDataGrid = useRef<any>(null);
    const windowSize = useWindowSize();
    const refSubmitButton = useRef<any>(null);
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
    } = useForm<any>({});
    const showError = useSetAtom(showErrorAtom);

    const showSelectCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });

    const handleSave = () => {
      refSubmitButton.current.click();
    };

    const onSubmit = async (data: any) => {
      const { CamName, CamNo, Note, StartDate } = data;

      const createData = {
        Ser_Campaign: {
          CamName: CamName,
          CamNo: CamNo,
          Note: Note,
          StartDate: format(new Date(StartDate), "yyyy-MM-dd"),
          IsActive: 1,
        },
      };

      const response = await api.Ser_Campaign_Create(createData);
      if (response?.isSuccess) {
        toast.success(t("Create successfully!"));
        showSelectCarPopup.close();
        onRefetch();
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
    const onDrop = useCallback(async (acceptedFiles: any) => {}, []);

    // const columnsDetail = useColumnsDetail({});
    const { getRootProps } = useDropzone({ onDrop });
    const methods = useForm();
    return (
      <Popup
        visible={showSelectCarPopup.visible}
        title={t("Ser_Campaign Update")}
        showCloseButton={true}
        onHiding={() => {
          showSelectCarPopup.close();
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
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 mt-[20px] gap-[10px]">
                <div className=" grid grid-rows-4">
                  <div className="">
                    <Controller
                      name={"CamNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={t("CamNo")}
                            error={errors.CamNo}
                            required
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: validateMessage("CamNo is required!"),
                        },
                      }}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name={"CamName"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={t("CamName")}
                            error={errors.CamName}
                            required
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: validateMessage("CamName is required!"),
                        },
                      }}
                    />
                  </div>
                </div>
                <div className="  grid grid-rows-4">
                  <div className="">
                    <Controller
                      name={"StartDate"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <DateBoxField
                            field={field}
                            label={t("StartDate")}
                            error={errors.StartDate}
                            displayFormat="yyyy-MM-dd"
                            required
                            type="date"
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: validateMessage("StartDate is required!"),
                        },
                      }}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name={"Note"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={t("Note")}
                            error={errors.Note}
                          />
                        );
                      }}
                    />
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
            text: t("Save"),
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
              showSelectCarPopup.close();
            },
          }}
        />
      </Popup>
    );
  }
);

export default PopupCreateSerCampaign;
