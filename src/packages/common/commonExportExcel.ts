import { exportPivotGrid } from "devextreme/excel_exporter";
import { ExportingEvent } from "devextreme/ui/pivot_grid";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { toast } from "react-toastify";
// handle export excel pivotgrid
export const commonExportExcel = (
  e: ExportingEvent,
  fileName: string,
  t: Function
) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(fileName);
  exportPivotGrid({
    component: e.component,
    worksheet,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        fileName
      );
      toast.success(t("Download successfully!"));
    });
  });
};
