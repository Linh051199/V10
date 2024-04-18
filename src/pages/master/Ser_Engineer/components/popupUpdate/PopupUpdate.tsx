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
import { FlagActiveEnum } from "@/packages/types";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSetAtom } from "jotai";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
  BOMCode?: any;
  onRefetch: () => void;
  code: any;
}
const PopupUpdateSerEngineer = forwardRef(
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
    const { t } = useI18n("Ser_Engineer_Update");
    const api = useClientgateApi();
    const refDataGrid = useRef<any>(null);
    const windowSize = useWindowSize();
    const refSubmitButton = useRef<any>(null);

    const { t: validateMessage } = useI18n("Validate");

    const methods = useForm();

    const formRef = useRef(null);

    const { data: getSerGroupRepair } = useQuery(
      ["getSerGroupRepair_"],
      async () => {
        const resp: any = await api.Ser_GroupRepair_GetAllActive();

        return resp?.DataList ?? [];
      }
    );

    const { data: getMstStaff } = useQuery(["getMstStaff"], async () => {
      const resp: any = await api.Mst_Staff_Search({
        FlagActive: FlagActiveEnum.Active,
      });

      return resp?.DataList ?? [];
    });

    console.log(getMstStaff);

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

    useImperativeHandle(ref, () => ({
      getGridViewOneRef() {
        return refDataGrid;
      },
      show() {
        showSelectCarPopup.open();
      },
      clear() {
        reset();
      },
    }));

    const showError = useSetAtom(showErrorAtom);

    const showSelectCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });

    const fetchDataByGetByFilePathVideoCode = async () => {
      const resp: any = await api.Ser_Engineer_GetByEngineerNoDL({
        EngineerNo: code.current.EngineerNo,
      });
      if (resp?.isSuccess) {
        const {
          EngineerNo,
          EngineerName,
          GroupRID,
          Note,
          IsEngineer,
          StartWorkDate,
          FinishWorkDate,
        } = resp?.Data;

        setValue("EngineerNo", EngineerNo);
        setValue("EngineerName", EngineerName);
        setValue("GroupRID", GroupRID);
        setValue("Note", Note);
        setValue("IsEngineer", IsEngineer);
        setValue("StartWorkDate", StartWorkDate);
        setValue("FinishWorkDate", FinishWorkDate);
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
        EngineerName,
        EngineerNo,
        FinishWorkDate,
        GroupRID,
        IsEngineer,
        Note,
        StartWorkDate,
      } = data;

      if (new Date(StartWorkDate) > new Date(FinishWorkDate)) {
        toast.error(
          "Ngày bắt đầu làm việc không được lớn hơn Ngày kết thúc làm việc!"
        );
        return;
      }

      const updData = {
        Ser_Engineer: {
          EngineerID: code.current.EngineerID,
          EngineerName: EngineerName,
          EngineerNo: EngineerNo,
          GroupRID: GroupRID,
          IsEngineer: IsEngineer,
          Note: Note,
          StartWorkDate: format(new Date(StartWorkDate), "yyyy-MM-dd"),
          FinishWorkDate: format(new Date(FinishWorkDate), "yyyy-MM-dd"),
          IsActive: 1,
        },
      };

      const response = await api.Ser_Engineer_Update(updData);
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
        title={t("Ser_Engineer Update")}
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
                      name={"EngineerNo"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={t("EngineerNo")}
                            error={errors.EngineerNo}
                            required
                            disabled
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: validateMessage("EngineerNo is required!"),
                        },
                      }}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name={"EngineerName"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextBoxField
                            field={field}
                            label={t("EngineerName")}
                            error={errors.EngineerName}
                            required
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: validateMessage("EngineerName is required!"),
                        },
                      }}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name={"GroupRID"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectBoxField
                            field={field}
                            label={t("GroupRID")}
                            error={errors.GroupRID}
                            dataSource={getSerGroupRepair}
                            displayExpr="GroupRName"
                            valueExpr="GroupRID"
                            required
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: validateMessage("GroupRID is required!"),
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
                <div className=" grid grid-rows-4">
                  <div className="">
                    <Controller
                      name={"IsEngineer"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectBoxField
                            field={field}
                            label={t("IsEngineer")}
                            error={errors.IsEngineer}
                            dataSource={getMstStaff}
                            displayExpr="StaffName"
                            valueExpr="StaffCode"
                            required
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: validateMessage("IsEngineer is required!"),
                        },
                      }}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name={"StartWorkDate"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <DateBoxField
                            field={field}
                            label={t("StartWorkDate")}
                            error={errors.StartWorkDate}
                            displayFormat="yyyy-MM-dd"
                            required
                            type="date"
                          />
                        );
                      }}
                      rules={{
                        required: {
                          value: true,
                          message: validateMessage(
                            "StartWorkDate is required!"
                          ),
                        },
                      }}
                    />
                  </div>
                  <div className="">
                    <Controller
                      name={"FinishWorkDate"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <DateBoxField
                            field={field}
                            label={t("FinishWorkDate")}
                            displayFormat="yyyy-MM-dd"
                            type="date"
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

export default PopupUpdateSerEngineer;
