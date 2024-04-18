import Form, { GroupItem } from "devextreme-react/form";
import { Popup } from "devextreme-react/popup";
import { useI18n } from "@/i18n/useI18n";
import ScrollView from "devextreme-react/scroll-view";
import { nanoid } from "nanoid";
import { GroupField } from "@packages/ui/group-field";
import { FormOptions } from "@/types";

export interface PopupViewProps {
  visible?: boolean;
  handleCancel: () => void;
  handleEdit: () => void;
  handleDelete?:any;
  formSettings: FormOptions;
  title: string;
  data: any;
  width?: any;
  height?: any;
  colCount?: number;
}

export const PopupView = ({
  visible,
  handleCancel,
  handleEdit,
  handleDelete,
  formSettings,
  title,
  data,
  width = 700,
  height,
  colCount,
}: PopupViewProps) => {
  const { t } = useI18n("Common");

  const innerHandleCancel = () => {
    handleCancel();
  };
  const innerHandleEdit = () => {
    handleEdit();
  };
  const innerHandleDelete = () => {
    handleDelete();
  };
  return (
    <Popup
      visible={visible}
      showTitle={true}
      title={title}
      width={width}
      height={height} // cài đặt chiều dài của popup để vừa với dữ liệu - LinhPV
      wrapperAttr={{
        class: "popup-form",
      }}
      toolbarItems={[
        {
          toolbar: "bottom",
          location: "after",
          widget: "dxButton",
          options: {
            text: t("Edit"),
            stylingMode: "contained",
            type: "default",
            onClick: innerHandleEdit,
          },
        },
        {
          toolbar: "bottom",
          location: "after",
          visible: handleDelete ? true : false,
          widget: "dxButton",
          options: {
            text: t("Xóa"),
            stylingMode: "contained",
            type: "default",
            onClick: innerHandleDelete,
          },
        },
        {
          toolbar: "bottom",
          location: "after",
          widget: "dxButton",
          options: {
            text: t("Cancel"),
            stylingMode: "contained",
            type: "default",
            onClick: innerHandleCancel,
          },
        },
       
      ]}
    >
      <ScrollView height={"100%"}>
        <Form className={""} id={"view-form"} formData={data} readOnly={true}>
          {formSettings.items?.map((item) => {
            return (
              <GroupItem
                key={nanoid()}
                render={({}) => {
                  return (
                    <GroupField
                      colCount={colCount}
                      visiableHeader={item.visiableHeader}
                      item={item}
                      formData={data}
                      disableCollapsible={item.disableCollapsible}
                    />
                  );
                }}
              />
            );
          })}
        </Form>
      </ScrollView>
    </Popup>
  );
};
