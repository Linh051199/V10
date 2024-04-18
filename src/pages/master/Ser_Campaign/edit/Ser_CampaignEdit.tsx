import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { useNetworkNavigate } from "@/packages/hooks";
import { AdminContentLayout } from "@/packages/layouts/admin-content-layout";
import { ContentSearchPanelLayout } from "@/packages/layouts/content-searchpanel-layout";
import { showErrorAtom } from "@/packages/store";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Button } from "devextreme-react";
import { useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./components/style.scss";

const Ser_CampaignEdit = () => {
  const { type, code } = useParams();

  const { t: common } = useI18n("Common");
  const { t } = useI18n("Ser_Campaign");
  const { t: validateMessage } = useI18n("Validate");

  const navigate = useNetworkNavigate();

  const api = useClientgateApi();

  const methods = useForm();

  const refSubmitButton = useRef();

  const showError = useSetAtom(showErrorAtom);

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

  const onSubmit = async (data) => {
    const { CamNo, CamName, StartDate, FinishedDate, Note } = data;

    if (new Date(FinishedDate) < new Date(StartDate)) {
      toast.error("Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc!");
      return;
    }

    if (type == "add") {
      const param = {
        Ser_Campaign: {
          CamNo,
          CamName,
          StartDate,
          FinishedDate,
          Note,
          IsActive: 1,
        },
      };

      const resp = await api.Ser_Campaign_Create(param);

      if (resp.isSuccess) {
        toast.success(common("Create successfully!"));
        navigate("/admin/Ser_Campaign");
      } else {
        showError({
          message: t(resp!._strErrCode),
          _strErrCode: resp!._strErrCode,
          _strTId: resp!._strTId,
          _strAppTId: resp!._strAppTId,
          _objTTime: resp!._objTTime,
          _strType: resp!._strType,
          _dicDebug: resp!._dicDebug,
          _dicExcs: resp!._dicExcs,
        });
      }
    } else {
      const param = {
        Ser_Campaign: {
          CamID: code,
          CamNo,
          CamName,
          StartDate,
          FinishedDate,
          Note,
          IsActive: 1,
        },
      };

      const resp = await api.Ser_Campaign_Update(param);

      if (resp.isSuccess) {
        toast.success(common("Update successfully!"));
        navigate("/admin/Ser_Campaign");
      } else {
        showError({
          message: t(resp!._strErrCode),
          _strErrCode: resp!._strErrCode,
          _strTId: resp!._strTId,
          _strAppTId: resp!._strAppTId,
          _objTTime: resp!._objTTime,
          _strType: resp!._strType,
          _dicDebug: resp!._dicDebug,
          _dicExcs: resp!._dicExcs,
        });
      }
    }
  };

  const getFormData = async (CamID) => {
    const resp = await api.Ser_CampaignDL_DetailDL(CamID);

    const data = resp.Data;

    setValue("CamNo", data.CamNo);
    setValue("CamName", data.CamName);
    setValue("StartDate", data.StartDate);
    setValue("FinishedDate", data.FinishedDate);
    setValue("Note", data.Note);
  };

  useEffect(() => {
    if (code) {
      getFormData(code);
    }
  }, [type, code]);

  const handleBack = () => {
    navigate("/admin/Ser_Campaign");
  };

  const handleSave = () => {
    refSubmitButton.current.click();
  };

  return (
    <div className="ser_campaignedit">
      <FormProvider {...methods}>
        <AdminContentLayout>
          <AdminContentLayout.Slot name="Header">
            <div className="flex items-center justify-between w-full py-[10px]">
              <div className="flex items-center gap-[10px] pl-[5px]">
                <div
                  className="text-[13px] hover:text-[#00703c] hover:underline hover:cursor-pointer font-semibold"
                  onClick={handleBack}
                >
                  Quản lý chiến dịch
                </div>
                <div>{`>`}</div>
                <div>
                  {type == "add" ? "Tạo mới chiến dịch" : "Chi tiết chiến dịch"}{" "}
                </div>
              </div>
              <div>
                <Button
                  //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
                  stylingMode={"contained"}
                  type="default"
                  text={common("Save")}
                  onClick={handleSave}
                />
                {type == "edit" && (
                  <Button
                    //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
                    stylingMode={"contained"}
                    type="default"
                    text={common("Delete")}
                  />
                )}
              </div>
            </div>
          </AdminContentLayout.Slot>
          <AdminContentLayout.Slot name="Content">
            <ContentSearchPanelLayout searchPermissionCode="">
              <ContentSearchPanelLayout.Slot
                name={"SearchPanel"}
              ></ContentSearchPanelLayout.Slot>
              <ContentSearchPanelLayout.Slot name={"ContentPanel"}>
                <form id={"editForm"} onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col w-full">
                    <div className="grid grid-cols-3 p-[10px] gap-[10px]">
                      <div className="grid grid-rows-2">
                        <div>
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
                                  disabled={type == "edit"}
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
                        <div>
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
                                message: validateMessage(
                                  "CamName is required!"
                                ),
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid grid-rows-2">
                        <div>
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
                                message: validateMessage(
                                  "StartDate is required!"
                                ),
                              },
                            }}
                          />
                        </div>
                        <div>
                          <Controller
                            name={"FinishedDate"}
                            control={control}
                            render={({ field }) => {
                              return (
                                <DateBoxField
                                  field={field}
                                  label={t("FinishedDate")}
                                  error={errors.FinishedDate}
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
                                  "FinishedDate is required!"
                                ),
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="">
                          <Controller
                            name={"Note"}
                            control={control}
                            render={({ field }) => {
                              return (
                                <TextAreaField
                                  field={field}
                                  label={t("Note")}
                                  cssClass=""
                                />
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="separator"></div>

                    <div className="flex items-center gap-[10px] p-[10px]">
                      <div>Danh sách khách hàng</div>
                      <Button
                        //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
                        stylingMode={"contained"}
                        type="default"
                        text={t("Add Customer")}
                      />
                      <Button
                        //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
                        stylingMode={"contained"}
                        type="default"
                        text={common("Delete")}
                      />
                      <Button
                        //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
                        stylingMode={"contained"}
                        type="default"
                        text={common("ExportExcel")}
                      />
                    </div>
                  </div>

                  <button
                    hidden={true}
                    ref={refSubmitButton}
                    type={"submit"}
                    form={"editForm"}
                  ></button>
                </form>
              </ContentSearchPanelLayout.Slot>
            </ContentSearchPanelLayout>
          </AdminContentLayout.Slot>
        </AdminContentLayout>
      </FormProvider>
    </div>
  );
};

export default Ser_CampaignEdit;
