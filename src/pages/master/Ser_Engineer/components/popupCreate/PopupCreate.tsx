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
import { FlagActiveEnum } from "@/packages/types";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useSetAtom } from "jotai";
import { useDropzone } from "react-dropzone";
import { Controller, FormProvider, useForm } from "react-hook-form";

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
}
const PopupCreateSerEngineer = forwardRef(
  (
    {
      visible,
      orderListRef,
      onCancel,
      gridViewOneRef,
      fetchData,
      BOMCode,
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

    const { data: getSerGroupRepair } = useQuery(
      ["getSerGroupRepair_"],
      async () => {
        const resp: any = await api.Ser_GroupRepair_GetAllActive();

        resp.DataList = resp.DataList?.sort((a, b) => {
          const dateA = new Date(a.LogLUDateTime);
          const dateB = new Date(b.LogLUDateTime);
          return dateB.getTime() - dateA.getTime();
        });

        return resp?.DataList ?? [];
      }
    );

    const { data: getMstStaff } = useQuery(["getMstStaff"], async () => {
      const resp: any = await api.Mst_Staff_Search({
        FlagActive: FlagActiveEnum.Active,
      });

      return resp?.DataList ?? [];
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
      defaultValues: {
        BOMCode: "",
        BOMDesc: "",
        FlagActive: "",
        FilePathAvatar: "",
      },
    });

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

    const handleSave = () => {
      // gridViewOneRef.current.getDxInstance().saveEditData()
      refSubmitButton.current.click();
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

      const createData = {
        Ser_Engineer: {
          EngineerName: EngineerName,
          EngineerNo: EngineerNo,
          GroupRID: GroupRID,
          IsEngineer: IsEngineer,
          Note: Note,
          StartWorkDate: format(new Date(StartWorkDate), "yyyy-MM-dd"),
          FinishWorkDate: FinishWorkDate
            ? format(new Date(FinishWorkDate), "yyyy-MM-dd")
            : null,
          IsActive: 1,
        },
      };

      const response = await api.Ser_Engineer_Create(createData);
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
    const onDrop = useCallback(async (acceptedFiles: any) => {
      // console.log(208, acceptedFiles)
    }, []);

    // const columnsDetail = useColumnsDetail({});
    const { getRootProps } = useDropzone({ onDrop });
    const methods = useForm();
    return (
      <Popup
        visible={showSelectCarPopup.visible}
        title={t("Ser_Engineer Create")}
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
              id={"create"}
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
                form={"create"}
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

export default PopupCreateSerEngineer;
