import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { BButton } from "@/packages/components/buttons";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { Alignment, ColumnOptions } from "@/types";
import React, { useMemo, useRef } from "react";
import { useVisibilityControl } from "@/packages/hooks";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { useAtomValue, useSetAtom } from "jotai";
import { fileAtom } from "./store";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { ImportPopup } from "./import-popup";

const Mst_BieuMauIn = () => {
  const { t } = useI18n("Mst_BieuMauIn");
  const windowSize = useWindowSize();
  const api = useClientgateApi(); // lấy danh sách api

  const showImportPopup = useVisibilityControl({ defaultVisible: false });

  const gridUploadRef = useRef<any>(null);
  const gridRef: any = useRef();

  const fileAtomValue = useAtomValue(fileAtom);

  const handleImport = () => {
    gridUploadRef.current.show();
  };

  const fetchData = async () => {
    const resp: any = await api.Mst_BieuMauIn_GetAllPrintType();

    return {
      DataList: resp?.DataList,
      PageCount: 100,
      ItemCount: length,
      PageSize: 99999,
    };
  };

  const setFileAtom = useSetAtom(fileAtom);
  const handleClickRow = async (e: any) => {
    const resp = await api.Mst_BieuMauIn_GetTempPrint(e?.data?.TempPrintType);

    if (resp.isSuccess) {
      setFileAtom({ link: resp?.Data?.LinkPDF, name: e.value });
    }
  };

  const columns: ColumnOptions[] = useMemo(
    () => [
      {
        dataField: "Idx",
        visible: true,
        caption: t("STT"),
        width: 80,
        minWidth: 80,
        alignment: "center" as Alignment,
        cellRender: (e: any) => {
          // return <span onClick={() => handleClickRow(e)}>{e.rowIndex + 1}</span>;
          return <span>{e.rowIndex + 1}</span>;
        },
      },
      {
        dataField: "DealerCode", // Tên dại lý
        caption: t("DealerCode"),
        editorType: "dxTextBox",
        dataType: "string",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
      {
        dataField: "TempPrintType", // Mã loại mẫu
        caption: t("TempPrintType"),
        editorType: "dxTextBox",
        dataType: "string",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
        cellRender: (e: any) => {
          return (
            <span className="cursor-pointer" onClick={() => handleClickRow(e)}>
              {e.value}
            </span>
          );
        },
      },
      {
        dataField: "TempPrintName", // Màn hình hiển thị mẫu in
        caption: t("TempPrintName"),
        editorType: "dxTextBox",
        dataType: "string",
        visible: true,
        editorOptions: {
          readOnly: true,
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center gap-3 justify-between">
          <ToggleSidebarButton />
          <div className="font-bold dx-font-m">{t("Mst_BieuMauIn")}</div>
        </div>
        <div className="flex justify-between items-center w-full h-[55px] pl-2">
          <div className="ml-auto">
            <BButton label={t("UploadFile")} onClick={handleImport} />
          </div>
        </div>
      </div>
      <div className={"separator"} />

      <div className="flex gap-2">
        <div className="w-[50%]">
          <div className="flex justify-between items-center px-4 pb-2 pt-2">
            <div className="text-[14px] font-bold">{t("Loại mẫu in")}</div>
          </div>
          <GridViewOne
            ref={gridRef}
            toolbarItems={[]}
            dataSource={[]} // cars
            columns={columns}
            fetchData={fetchData}
            autoFetchData={true}
            allowSelection={false}
            isLoading={false}
            customToolbarItems={[]}
            isHiddenCheckBox={true}
            customHeight={windowSize.height - 160}
            isHidenHeaderFilter={true}
            editMode={false}
            editingOptions={{
              mode: "row",
            }}
            keyExpr={["DealerCode", "TempPrintType"]}
            storeKey={"Mst_BieuMauIn"}
          />
        </div>

        <div className="w-[50%]">
          <div className="flex justify-between items-center px-4 pb-2 pt-2 w-full h-full">
            <div className="text-[14px] font-bold w-full h-full">
              {t("Loại mẫu in:") + " " + `${fileAtomValue?.name}`}
              <iframe
                src={fileAtomValue?.link}
                width="100%"
                height="100%"
                // width={windowSize.width - 870}
                // height={windowSize.height - 150}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
      <ImportPopup
        ref={gridUploadRef}
        visible={showImportPopup.visible}
        container={".dx-viewport"}
        position={"left"}
        onHidding={() => {
          showImportPopup.close();
        }}
      />
    </>
  );
};

export default Mst_BieuMauIn;
