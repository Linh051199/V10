import { TextField } from "@/packages/components/text-field";
import { Form } from "devextreme-react";
import { SimpleItem } from "devextreme-react/form";
import React, { useRef } from "react";

const Service = () => {
  const formData = {};
  const formRef: any = useRef();

  return (
    <Form className="heu" ref={formRef}>
      <SimpleItem dataField="NguoiBaoGia" colSpan={4} editorType="dxTextArea" />
      <SimpleItem
        dataField="NguoiBaoGia"
        colSpan={4}
        label={{
          location: "left",
        }}
        cssClass="w-[300px]"
        render={({ component: formInstance, dataField }: any) => {
          const formData = formInstance.option("formData");
          const value = formData[dataField];
          return (
            <div className="flex item-center gap-2 justify-between">
              <div className="w-full">
                <TextField
                  formInstance={formInstance}
                  dataField={dataField}
                  readOnly={true}
                  width={"100%"}
                  onValueChanged={(e: any) => {
                    formInstance.updateData(dataField, e.value);
                  }}
                />
              </div>
            </div>
          );
        }}
      />
    </Form>
  );
};

export default Service;
