import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@packages/api";
import { useApiHeaders } from "@packages/api/headers";
import { useVisibilityControl } from "@packages/hooks";
import { UploadedFile } from "@packages/types";
import { Icon } from "@packages/ui/icons";
import Button from "devextreme-react/button";
import { FileUploader } from "devextreme-react/file-uploader";
import { nanoid } from "nanoid";
import { useEffect, useReducer, useRef, useState } from "react";
import { toast } from "react-toastify";
import { SelectedFile } from "./selected-file";

// An enum with all the types of actions to use in our reducer
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

// Our reducer function that uses a switch statement to handle our actions

interface UploadFilesFieldProps {
  readonly?: boolean;
  data: any;
  maxFileDisplay?: number;
  onValueChanged: (files: any) => void;
  controlFileInput?: string[];
  className?: any;
  hiddenRemoveIcon?: boolean;
}

export const UploadFieldCustom = ({
  readonly = false,
  data = [],
  maxFileDisplay = 3,
  onValueChanged,
  className,
  hiddenRemoveIcon,
  controlFileInput = [],
}: UploadFilesFieldProps) => {
  // use reducers to append value into a list
  const [uploadedFiles, dispatchFileAction] = useReducer(fileReducer, []);
  const [isUploading, setIsUploading] = useState(false);
  const uploaderRef = useRef<FileUploader>(null);
  const { headers, baseURL } = useApiHeaders();
  const { t } = useI18n("Upload File");

  useEffect(() => {
    data?.forEach((file: UploadedFile) => {
      dispatchFileAction({
        type: FileActionEnum.Init,
        payload: { ...file, FileId: nanoid() },
      });
    });
  }, []);

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

  const handleAFileUploaded = (e: any) => {
    const { file, request } = e;
    dispatchFileAction({
      type: FileActionEnum.Uploaded,
      payload: {
        FileFullName: file.name,
        FileType: file.type,
        FileSize: file.size,
      },
    });
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
          .map((item) => item.toUpperCase())
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
  const handleRemoveFile = async (file: Partial<any>) => {
    dispatchFileAction({
      type: FileActionEnum.Remove,
      payload: file,
    });

    // const resp: any = await api.ETTicketAttachFile_DeleteMultiple([
    //   {
    //     TicketID: file.TicketID,
    //     Idx: file.Idx,
    //   },
    // ]);
  };
  const toggleExpandControl = useVisibilityControl({ defaultVisible: false });
  const displayFiles = toggleExpandControl.visible
    ? uploadedFiles
    : uploadedFiles.slice(0, Math.min(maxFileDisplay, uploadedFiles.length));
  const api = useClientgateApi();
  const handleUploadFile = async (file: File, callback: any) => {
    const resp = await api.File_UploadFile(file);
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

  return (
    <div className={`files-uploader ${className} m-h-[30px]`}>
      <form>
        <FileUploader
          readOnly={readonly}
          ref={uploaderRef}
          name={"file"}
          multiple={true}
          uploadMode={"instantly"}
          showFileList={false}
          uploadHeaders={{
            ...headers,
            "Content-Type": "multipart/form-data",
          }}
          uploadUrl={`${baseURL}/File/UploadFile`}
          disabled={isUploading || readonly}
          onUploadStarted={handleUploadStart}
          // onUploaded={handleAFileUploaded}
          uploadFile={handleUploadFile}
        />
      </form>
      <div className={"flex flex-col"}>
        <div className={"flex flex-wrap"}>
          {displayFiles.map((file: Partial<UploadedFile>) => {
            return (
              <SelectedFile
                hiddenRemoveIcon={hiddenRemoveIcon}
                disabled={readonly}
                key={nanoid()}
                file={file}
                uploaderRef={uploaderRef}
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
                name={"expandDown"}
                className={`${toggleExpandControl.visible ? "rotate-180" : ""}`}
              />
              <span className={"mx-1"}>
                {toggleExpandControl.visible ? "Show Less" : "Show More"}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
