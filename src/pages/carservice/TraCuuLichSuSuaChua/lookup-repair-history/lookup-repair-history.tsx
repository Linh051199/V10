import { useI18n } from "@/i18n/useI18n";
import { useClientgateApi } from "@/packages/api";
import { Popup } from "devextreme-react";
import { IToolbarItemProps } from "devextreme-react/data-grid";
import { RequiredRule } from "devextreme-react/form";
import { nanoid } from "nanoid";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import { GridViewOne } from "@/packages/ui/base-gridview/gridview-one";
import { useVisibilityControl } from "@/packages/hooks";
import { TextField } from "@/packages/components/text-field";
import Form, { SimpleItem } from "devextreme-react/form";
import { useWindowSize } from "@/packages/hooks/useWindowSize";
import { Button } from "devextreme-react";
import { useSetAtom } from "jotai";
import { showErrorAtom } from "@/packages/store";
interface IProps {
  visible: true | false;
}
import "./style.scss";
const LookupRepairHistory = forwardRef(
  ({ visible }: IProps, gridViewOneRef: any) => {
    const { t } = useI18n("TraCuuLichSuaSuaChua_LookupRepairHistoryPopup");
    const api = useClientgateApi();
    const refDataGrid = useRef<any>(null);
    const windowSize = useWindowSize();
    const formRef = useRef<Form>(null);
    const showError = useSetAtom(showErrorAtom);
    useImperativeHandle(gridViewOneRef, () => ({
      getGridViewOneRef() {
        return refDataGrid;
      },
      show() {
        showSelectCarPopup.open();
      },
    }));
    const showSelectCarPopup = useVisibilityControl({
      defaultVisible: visible,
    });

    //
    const fetchData = async () => {
      const searchCondition = formRef.current?.instance.option("formData");
      // const resp =   await api.TraCuuLichSuSuaChuaHQ_SearchHQ({
      //       ...searchCondition.current,
      //       Ft_PageIndex: gridRef.current.getDxInstance().pageIndex() ?? 0,
      //       Ft_PageSize: gridRef.current.getDxInstance().pageSize() ?? 1000,
      //     });
      let resp: any = {
        isSuccess: true,
      };

      if (resp?.isSuccess) {
        // setSelectedRowKeys([]);
        // return resp;
        return {
          DataList: [
            {
              SoKN: `${searchCondition.LookupRepairHistory} - ${
                Math.random() * 100
              }`,
              NgayTao: `${Math.random() * 100}`,
              NgayXuLy: `${Math.random() * 100}`,
              DaiLy: `${Math.random() * 100}`,
              ChiTiet: `${Math.random() * 100}`,
              MoTaXuLy: `${Math.random() * 100}`,
            },
            {
              SoKN: `${searchCondition.LookupRepairHistory} - ${
                Math.random() * 100
              }`,
              NgayTao: `${Math.random() * 100}`,
              NgayXuLy: `${Math.random() * 100}`,
              DaiLy: `${Math.random() * 100}`,
              ChiTiet: `${Math.random() * 100}`,
              MoTaXuLy: `${Math.random() * 100}`,
            },
            {
              SoKN: `${searchCondition.LookupRepairHistory} - ${
                Math.random() * 100
              }`,
              NgayTao: `${Math.random() * 100}`,
              NgayXuLy: `${Math.random() * 100}`,
              DaiLy: `${Math.random() * 100}`,
              ChiTiet: `${Math.random() * 100}`,
              MoTaXuLy: `${Math.random() * 100}`,
            },
          ],
        };
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
    };

    const columns = useMemo(() => {
      return [
        {
          dataField: "SoKN",
          caption: t("SoKN"),
          visible: true,
          editorOptions: {
            readOnly: true,
            disabled: true,
          },
        },
        {
          dataField: "NgayTao",
          caption: t("NgayTao"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
        {
          dataField: "NgayXuLy",
          caption: t("NgayXuLy"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
        {
          dataField: "DaiLy",
          caption: t("DaiLy"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
        {
          dataField: "ChiTiet",
          caption: t("ChiTiet"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
        {
          dataField: "MoTaXuLy",
          caption: t("MoTaXuLy"),
          visible: true,
          editorOptions: {
            readOnly: true,
          },
        },
      ];
    }, [visible]);

    const handleExportExcel = async () => {
      toast.info("exportExcel");
    };

    const searchFields: any[] = [
      {
        visible: true,
        dataField: "LookupRepairHistory",
        label: {
          text: t("LookupRepairHistory"),
          visible: false,
        },
        cssClass: "dms-form-field",
        render: (param: any) => {
          const { dataField, component: formComponent } = param;
          const formData = formComponent.option("formData");
          const value = formData[dataField];
          return (
            <div className={"flex flex-row dms-form-field"}>
              <TextField
                dataField={dataField}
                formInstance={formComponent}
                defaultValue={value}
                onValueChanged={(e: any) => {
                  formComponent.updateData(dataField, e.value);
                }}
                placeholder={t("Input")}
              />
            </div>
          );
        },
      },
    ];
    const handleSearch = () => {
      refDataGrid?.current?.refetchData();
    };
    return (
      <Popup
        visible={showSelectCarPopup.visible}
        title={t("TraCuuLichSuaSuaChua_LookupRepairHistoryPopup")}
        showCloseButton={true}
        onHiding={() => {
          showSelectCarPopup.close();
        }}
      >
        <div className="flex">
          <form className={"min-w-[300px]"} onSubmit={handleSearch}>
            <Form
              ref={formRef}
              formData={{
                LookupRepairHistory: "",
              }}
              colCount={1}
              scrollingEnabled={true}
              validationGroup={"form"}
              showValidationSummary={true}
            >
              {searchFields
                .filter((f) => f.visible)
                .map((field, index) => {
                  const found = searchFields.find(
                    (f) => f.dataField == field.dataField
                  );
                  return <SimpleItem key={index} {...found} />;
                })}
            </Form>
          </form>
          <Button
            text={"Search"}
            onClick={handleSearch}
            type={"default"}
            stylingMode={"contained"}
          ></Button>
          <Button
            text={"ExportExcel"}
            onClick={handleExportExcel}
            type={"default"}
            stylingMode={"contained"}
          ></Button>
        </div>
        <GridViewOne
          ref={refDataGrid}
          customHeight={window.innerHeight - 300}
          editMode={false}
          fetchData={fetchData}
          autoFetchData={true}
          allowSelection={true}
          isLoading={false}
          allowMultiRowEdit={true}
          dataSource={[]}
          columns={columns}
          keyExpr={["SoKN"]}
          id="LookupRepairHistory"
          storeKey={"TraCuuLichSuaSuaChua_LookupRepairHistoryPopup"}
        />
      </Popup>
    );
  }
);

export default LookupRepairHistory;
