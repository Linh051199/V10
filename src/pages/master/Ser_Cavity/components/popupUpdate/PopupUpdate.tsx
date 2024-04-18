import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useVisibilityControl } from "@/packages/hooks";
import { Popup, ScrollView } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/data-grid";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import "./update-form.scss";
// import { useColumnsDetail } from "../components/use-columns-detail";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSetAtom } from "jotai";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IProps {
  visible: true | false;
  orderListRef: any;
  gridViewOneRef: any;
  onCancel: () => void;
  fetchData?: () => void;
  BOMCode?: any;
  onRefetch: () => void;
  code: any;
}
const PopupUpdateSerCavity = forwardRef(
  (
    {
      visible,
      orderListRef,
      onCancel,
      gridViewOneRef,
      fetchData,
      BOMCode,
      onRefetch,
      code,
    }: IProps,
    ref: any
  ) => {
    const { t } = useI18n("Ser_Cavity_Update");
    const { t: common } = useI18n("Common");

    const api = useClientgateApi();
    const refDataGrid = useRef<any>(null);
    const windowSize = useWindowSize();
    const refSubmitButton = useRef<any>(null);

    const { t: validateMessage } = useI18n("Validate");

    const methods = useForm();

    const formRef = useRef(null);

    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return refDataGrid;
      },
      show() {
        showSelectCarPopup.open();
      },
    }));

    const { data: getCavityType } = useQuery(["getCavityTypeOK"], async () => {
      const resp = await api.Mst_Compartment_GetAllActive();

      return resp.DataList;
    });

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
      defaultValues: {},
      // ...
    });

    const showError = useSetAtom(showErrorAtom);

    const showSelectCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });

    const fetchDataByGetByFilePathVideoCode = async () => {
      const resp: any = await api.Ser_Cavity_GetByCavityNoDL({
        CavityNo: code.current.CavityNo,
      });
      if (resp?.isSuccess) {
        const {
          CavityNo,
          CavityName,
          CavityType,
          Note,
          Status,
          StartUseDate,
          FinishUseDate,
          DealerCode,
        } = resp?.Data;

        setValue("CavityNo", CavityNo);
        setValue("CavityName", CavityName);
        setValue("CavityType", CavityType);
        setValue("Note", Note);
        setValue("Status", Status);
        setValue("DealerCode", DealerCode);
        setValue("StartUseDate", StartUseDate);
        setValue("FinishUseDate", FinishUseDate);
      }
    };

    useEffect(() => {
      if (showSelectCarPopup.visible) {
        fetchDataByGetByFilePathVideoCode();
      }
    }, [code.current]);

    const handleSave = () => {
      methods.trigger().then((isValid) => {
        if (isValid) {
          // If form is valid, proceed with form submission
          refSubmitButton.current.click();
        }
      });
    };

    const onSubmit = async (data: any) => {
      const {
        CavityName,
        CavityNo,
        FinishUseDate,
        CavityType,
        Note,
        StartUseDate,
        Status,
        DealerCode,
      } = data;

      const updData = {
        CavityID: code.current.CavityID,
        CavityName: CavityName,
        CavityNo: CavityNo,
        CavityType: CavityType,
        Note: Note,
        StartUseDate: format(new Date(StartUseDate), "yyyy-MM-dd"),
        FinishUseDate: FinishUseDate
          ? format(new Date(FinishUseDate), "yyyy-MM-dd")
          : null,
        IsActive: 1,
        Status: Status,
        DealerCode: DealerCode,
      };

      const response = await api.Ser_Cavity_Update(updData);
      if (response?.isSuccess) {
        toast.success(t("Update successfully!"));
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

    return (
      <Popup
        visible={showSelectCarPopup.visible}
        title={t("Ser_Cavity Update")}
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
              <div className="grid grid-rows-3 mt-[20px]">
                <div className="">
                  <Controller
                    name={"CavityNo"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("CavityNo")}
                          error={errors.CavityNo}
                          required
                          disabled
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: validateMessage("CavityNo is required!"),
                      },
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"CavityName"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextBoxField
                          field={field}
                          label={t("CavityName")}
                          error={errors.CavityName}
                          required
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: validateMessage("CavityName is required!"),
                      },
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"CavityType"}
                    control={control}
                    render={({ field }) => {
                      return (
                        <SelectBoxField
                          field={field}
                          label={t("CavityType")}
                          error={errors.CavityType}
                          dataSource={getCavityType}
                          displayExpr="CompartmentName"
                          valueExpr="CompartmentCode"
                          required
                        />
                      );
                    }}
                    rules={{
                      required: {
                        value: true,
                        message: validateMessage("CavityType is required!"),
                      },
                    }}
                  />
                </div>
                <div className="">
                  <Controller
                    name={"Note"}
                    control={control}
                    render={({ field }) => {
                      return <TextBoxField field={field} label={t("Note")} />;
                    }}
                  />
                </div>
              </div>
              <div className="">
                <Controller
                  name={"StartUseDate"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <DateBoxField
                        field={field}
                        label={t("StartUseDate")}
                        error={errors.StartUseDate}
                        displayFormat="yyyy-MM-dd"
                        required
                        type="date"
                      />
                    );
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: validateMessage("StartUseDate is required!"),
                    },
                  }}
                />
              </div>
              <div className="">
                <Controller
                  name={"FinishUseDate"}
                  control={control}
                  render={({ field }) => {
                    return (
                      <DateBoxField
                        field={field}
                        label={t("FinishUseDate")}
                        displayFormat="yyyy-MM-dd"
                        type="date"
                      />
                    );
                  }}
                />
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
            text: common("Save"),
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
            text: common("Cancel"),
            onClick: () => {
              showSelectCarPopup.close();
            },
          }}
        />
      </Popup>
    );
  }
);

export default PopupUpdateSerCavity;
