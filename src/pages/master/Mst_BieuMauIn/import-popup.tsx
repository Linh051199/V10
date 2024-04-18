import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { RequiredField } from "@/packages/common/Validation_Rules";
import ConfirmComponent from "@/packages/components/ConfirmComponent";
import { BButton, BButtonProps } from "@/packages/components/buttons";
import { SelectField } from "@/packages/components/select-field";
import { TextField } from "@/packages/components/text-field";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { showErrorAtom } from "@/packages/store";
import { useQuery } from "@tanstack/react-query";
import { Form, LoadPanel, Popup } from "devextreme-react";
import { GroupItem, SimpleItem } from "devextreme-react/form";
import { Position, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

interface IImportPopupProps {
  visible: boolean;
  container: string;
  position: "left" | "right";
  onHidding: () => void;
}

const ImportExcel = ({ onDrop }: { onDrop: any }) => {
  const { t } = useI18n("Mst_BieuMauIn");
  const { getRootProps } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()}>
        <BButton className={"btn-browse-file"} label={t("Choose File")} />
      </div>
    </div>
  );
};

export const ImportPopup = forwardRef(
  (
    { visible, container, position, onHidding }: IImportPopupProps,
    formPopupRef: any
  ) => {
    const { t } = useI18n("Mst_BieuMauIn_ImportPopup");
    const ref = useRef<any>(null);
    const showError = useSetAtom(showErrorAtom);
    const api = useClientgateApi();

    const [formData, setFormData] = useState({
      TempPrintType: "",
      ChooseFile: "",
    });
    useImperativeHandle(formPopupRef, () => ({
      getGridViewOneRef() {
        return ref;
      },
      show() {
        showUploadPopup.open();
      },
    }));
    const showUploadPopup = useVisibilityControl({ defaultVisible: visible });

    const { data, isLoading } = useQuery(["TempPrintType"], () =>
      api.Mst_BieuMauIn_GetAllPrintType()
    );

    const onDrop = async (acceptedFiles: any) => {
      setFormData({
        ...formData,
        ChooseFile: acceptedFiles[0],
      });
    };

    const handleClose = () => {
      setFormData({
        ChooseFile: "",
        TempPrintType: "",
      });
      showUploadPopup.close();
      onHidding();
    };

    const handleSave = async () => {
      ConfirmComponent({
        asyncFunction: async () => {
          const validate = ref.current?.instance.validate();
          if (!validate?.isValid) {
            return;
          }
          const dataMap = data?.DataList?.filter(
            (item: any) =>
              item.TempPrintType === ref?.current?.props.formData.TempPrintType
          )[0];
          const TempPrintAPI = await api.Mst_BieuMauIn_GetTempPrint(
            ref?.current?.props.formData.TempPrintType
          );

          const dataSave = {
            DealerCode: dataMap.DealerCode,
            file: ref?.current?.props.formData.ChooseFile,
            TempPrint: TempPrintAPI?.Data?.TempPrint,
            TempPrintType: dataMap.TempPrintType,
            TempPrintName: dataMap.TempPrintName,
            Remark: dataMap.Remark ?? "",
          };

          const responsive =
            await api.Mst_BieuMauIn_SaveDlrMstDealerContractFormPrint(dataSave);
          if (responsive.isSuccess) {
            toast.success(t("Update successfully!"));
            handleClose();
          } else {
            showError({
              message: t(responsive._strErrCode),
              _strErrCode: responsive._strErrCode,
              _strTId: responsive._strTId,
              _strAppTId: responsive._strAppTId,
              _objTTime: responsive._objTTime,
              _strType: responsive._strType,
              _dicDebug: responsive._dicDebug,
              _dicExcs: responsive._dicExcs,
            });
          }
        },
        title: t("Confirm"),
        contentConfirm: t("Do you want to update?"),
      });
    };

    const windowSize = useWindowSize();
    return (
      <Popup
        visible={showUploadPopup.visible}
        title={t("Mst_BieuMauIn_ImportPopup")}
        container={container}
        showCloseButton={true}
        onHiding={handleClose}
        height={windowSize.height - 350}
        width={windowSize.width - 550}
      >
        <LoadPanel
          container={".dx-viewport"}
          shadingColor="rgba(0,0,0,0.4)"
          position={"center"}
          visible={isLoading}
          showIndicator={true}
          showPane={true}
        />
        <Position
          at={`${position} top`}
          my={`${position} top`}
          of={`${container}`}
          offset={{ x: 100, y: 100 }}
        />
        <div className={" mx-3"}>
          <Form
            ref={ref}
            formData={formData}
            labelLocation={"left"}
            validationGroup={"main"}
          >
            <GroupItem colCount={1}>
              <SimpleItem
                label={{
                  text: t("TempPrintType"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("TempPrintType")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                dataField={"TempPrintType"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <SelectField
                      width={"100%"}
                      formInstance={formInstance}
                      dataField={dataField}
                      items={data?.DataList}
                      valueExpr={"TempPrintType"}
                      displayExpr={"TempPrintType"}
                      onValueChanged={(e: any) => {
                        formInstance.updateData(dataField, e.value);
                      }}
                      defaultValue={value}
                      showClearButton={false}
                      placeholder={t("Select")}
                      validationRules={[
                        RequiredField(t("TempPrintTypeIsRequired")),
                      ]}
                      validationGroup={formInstance.option("validationGroup")}
                    />
                  );
                }}
              ></SimpleItem>

              <SimpleItem
                label={{
                  text: t("ChooseFile"),
                }}
                isRequired={true}
                validationRules={[
                  {
                    type: "required",
                  },
                  RequiredField(t("ChooseFile")),
                ]}
                editorOptions={{
                  validationMessageMode: "always",
                }}
                cssClass="w-full"
                dataField={"ChooseFile"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  const value = formData[dataField];
                  return (
                    <div className="flex item-center gap-2 justify-between">
                      <div className="w-full">
                        <TextField
                          formInstance={formInstance}
                          dataField={dataField}
                          defaultValue={value.path}
                          readOnly={true}
                          width={"100%"}
                          validationRules={[
                            RequiredField(t("ChooseFileIsRequired")),
                          ]}
                          validationGroup={formInstance.option(
                            "validationGroup"
                          )}
                        />
                      </div>
                      <div>
                        <ImportExcel onDrop={onDrop} />
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>
            </GroupItem>
          </Form>
        </div>
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
      </Popup>
    );
  }
);
