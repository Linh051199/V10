import { useDropzone } from "react-dropzone";
import { BButton } from "../buttons";
import { useI18n } from "@/i18n/useI18n";

interface IImportExcel {
  onDrop: (file: File[]) => void;
}
export const ImportExcel = ({ onDrop }: IImportExcel) => {
  const { t } = useI18n("ImportExcelBtn");
  // const onDrop = useCallback(async (acceptedFiles: any) => {}, []);
  const { getRootProps } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()}>
        <BButton className={"btn-browse-file"} label={t("ImportExcel")} />
      </div>
    </div>
  );
};
