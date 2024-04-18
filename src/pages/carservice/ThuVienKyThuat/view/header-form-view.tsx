import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { useI18n } from "@/i18n/useI18n";
import { StatusValue } from "@packages/components/status-value/status-value";

interface HeaderFormViewProps {
  data: Sto_CBReq | undefined;
}

export const HeaderFormView = ({ data }: HeaderFormViewProps) => {
  const { t } = useI18n("ThuVienKyThuatView");
  return (
    <div className={"p-2"}>
      <Form colCount={2} formData={data} labelLocation={"left"}>
        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("MaKyThuat"),
            }}
            dataField={"MaKyThuat"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("Loai"),
            }}
            dataField={"Loai"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("Dealer"),
            }}
            dataField={"Dealer"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("BienSo"),
            }}
            dataField={"BienSo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("Model"),
            }}
            dataField={"Model"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("DongCo"),
            }}
            dataField={"DongCo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("HopSo"),
            }}
            dataField={"HopSo"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("DoiXe"),
            }}
            dataField={"DoiXe"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("LoaiHinhSuaChuaPhanTu"),
            }}
            dataField={"LoaiHinhSuaChuaPhanTu"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
        </GroupItem>

        <GroupItem colCount={1}>
          <SimpleItem
            label={{
              text: t("NoiDungSuaChuaTruoc"),
            }}
            dataField={"NoiDungSuaChuaTruoc"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("YKienKhachHangPhanTu_TrieuChung"),
            }}
            dataField={"YKienKhachHangPhanTu_TrieuChung"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("NguyenNhan"),
            }}
            dataField={"NguyenNhan"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("GiaiPhapKhacPhuc"),
            }}
            dataField={"GiaiPhapKhacPhuc"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
          <SimpleItem
            label={{
              text: t("KiemTraLoaiTru"),
            }}
            dataField={"KiemTraLoaiTru"}
            render={({ component: formInstance, dataField }: any) => {
              const formData = formInstance.option("formData");
              const value = formData[dataField];
              return <span className={"display-text"}>{value}</span>;
            }}
          ></SimpleItem>
        </GroupItem>
      </Form>
    </div>
  );
};
