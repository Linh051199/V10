import TextBox from "devextreme-react/text-box";
import dxForm from "devextreme/ui/form";
import "./uploadFile-field.scss";
import { Button, FileUploader, Validator } from "devextreme-react";
import { ValidationRule } from "devextreme-react/common";
import { useApiHeaders } from "@/packages/api/headers";
import { useClientgateApi } from "@/packages/api";
import { useEffect, useReducer, useRef, useState } from "react";
import { UploadedFile } from "@/packages/types";
import { nanoid } from "nanoid";
import { useVisibilityControl } from "@/packages/hooks";
import { Icon } from "@/packages/ui/icons";
import { SelectedFile } from "./selected-file";
import axios from "axios";
import { toast } from "react-toastify";
import { useI18n } from "@/i18n/useI18n";

enum FileActionEnum {
  Init = "Init",
  Add = "Add",
  Remove = "Remove",
  Uploading = "Uploading",
  Uploaded = "Uploaded",
}

// An interface for our actions
interface FileAction {
  type: FileActionEnum;
  payload: Partial<UploadedFile>;
}

interface TextFieldProps {
  formInstance: dxForm;
  dataField: string;
  maxFileDisplay: number;
  onValueChanged: (files: any) => void;
  placeholder?: string;
  width?: any;
  readOnly?: boolean;
  validationRules?: ValidationRule[];
  validationGroup?: string;
  defaultValue?: string;
  showClearButton?: boolean;
  hiddenRemoveIcon?: boolean;
  className?: string;
  controlFileInput?: string[];
}

export const UploadFilesField = ({
  formInstance,
  dataField,
  width = 270,
  placeholder,
  validationRules,
  validationGroup,
  onValueChanged,
  readOnly = false,
  defaultValue,
  showClearButton = false,
  hiddenRemoveIcon = false,
  maxFileDisplay = 3,
  controlFileInput = [],
  className,
}: TextFieldProps) => {
  const uploadRef = useRef<any>(null);
  const { headers, baseURL } = useApiHeaders();
  const { t } = useI18n("UploadFilesField");
  const [uploadedFiles, dispatchFileAction] = useReducer(fileReducer, []);
  const toggleExpandControl = useVisibilityControl({ defaultVisible: false });
  const displayFiles = toggleExpandControl.visible
    ? uploadedFiles
    : uploadedFiles.slice(0, Math.min(maxFileDisplay, uploadedFiles.length));
  useEffect(() => {
    const files = formInstance?.option(
      "formData.uploadFiles"
    ) as unknown as UploadedFile[];

    files?.forEach((file: UploadedFile) => {
      dispatchFileAction({
        type: FileActionEnum.Init,
        payload: { ...file, FileId: nanoid() },
      });
    });
  }, [formInstance]);
  function fileReducer(state: Partial<UploadedFile>[], action: FileAction) {
    const { type, payload } = action;
    switch (type) {
      case FileActionEnum.Init:
        return [...state, payload];
      case FileActionEnum.Remove:
        const newState = state.filter((file) => file.FileId !== payload.FileId);
        onValueChanged(newState);
        return newState;
      case FileActionEnum.Uploading:
        return [
          ...state,
          {
            ...payload,
            isUploading: true,
          },
        ];
      case FileActionEnum.Uploaded:
        const afterUploadedState = state.map((file) => {
          if (file.FileFullName === payload.FileFullName && !file.FileId) {
            return {
              ...file,
              ...payload,
              isUploading: false,
            };
          }
          return file;
        });
        onValueChanged(afterUploadedState);
        return afterUploadedState;
      default:
        return state;
    }
  }

  const handleChanged = (e: any) => {
    if (!onValueChanged) {
      formInstance.updateData(dataField, e.value);
    } else {
      onValueChanged(e);
    }
  };

  const getFileType = (name: string): string => {
    return name.split(".").pop() ?? "";
  };

  const handleUploadStart = (e: any) => {
    const { file, component } = e;
    const getFile = getFileType(file.name);
    if (controlFileInput.length > 0) {
      if (
        controlFileInput
          .map((item: any) => item.toUpperCase())
          .includes(getFile?.toUpperCase())
      ) {
        dispatchFileAction({
          type: FileActionEnum.Uploading,
          payload: {
            FileFullName: file.name,
            FileType: file.type,
            FileSize: file.size,
          },
        });
      } else {
        toast.error(t("Upload file wrong please try again!"));
      }
    } else {
      dispatchFileAction({
        type: FileActionEnum.Uploading,
        payload: {
          FileFullName: file.name,
          FileType: file.type,
          FileSize: file.size,
        },
      });
    }
  };
  const api = useClientgateApi();
  const [dataprogress, setData] = useState<any>(0);

  const handleUploadFile = async (file: File, callback: any) => {
    const resp = await api.File_UploadFile(file, onSetData);

    if (resp.isSuccess) {
      dispatchFileAction({
        type: FileActionEnum.Uploaded,
        payload: {
          ...resp.Data,
          FileType: file.type,
        },
      });
    }
  };
  const onSetData = (e: any) => {
    setData((e.loaded / e.total) * 100);
  };
  const handleRemoveFile = (file: Partial<UploadedFile>) => {
    dispatchFileAction({
      type: FileActionEnum.Remove,
      payload: file,
    });
  };

  return (
    <div className={`files-uploader ${className}`}>
      <FileUploader
        ref={uploadRef}
        id="file-uploader"
        multiple={true}
        dropZone={"none"}
        accept={"*"}
        uploadUrl={`${baseURL}/File/UploadFile`}
        uploadMode="instantly"
        onValueChanged={handleChanged}
        uploadHeaders={{
          ...headers,
          "Content-Type": "multipart/form-data",
        }}
        onUploadStarted={handleUploadStart}
        uploadFile={handleUploadFile}
        selectButtonText="Upload"
        labelText=""
        showFileList={false}
      />
      <div className={"flex flex-wrap"}>
        {displayFiles.map((file: Partial<UploadedFile>) => {
          return (
            <SelectedFile
              hiddenRemoveIcon={hiddenRemoveIcon}
              disabled={false}
              keyData={nanoid()}
              progress={dataprogress}
              file={file}
              uploaderRef={uploadRef}
              onRemoveFile={(file) => handleRemoveFile(file)}
            />
          );
        })}
      </div>
      {uploadedFiles.length > maxFileDisplay && (
        <div className={"flex items-center mt-1 p-1"}>
          <Button
            onClick={() => toggleExpandControl.toggle()}
            stylingMode={"text"}
            className={"flex items-center"}
          >
            <Icon
              name="WarningIcon"
              className={`${toggleExpandControl.visible ? "rotate-180" : ""}`}
            />
            <span className={"mx-1"}>
              {toggleExpandControl.visible ? "Show Less" : "Show More"}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};
