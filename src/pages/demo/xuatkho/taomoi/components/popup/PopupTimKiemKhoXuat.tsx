import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { faker } from "@faker-js/faker";
import { Button, Popup } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

const PopupTimKiemKhoXuat = ({ visible, handleClose, setValue }) => {
  const refSubmitButton = useRef();

  const form = useForm({
    defaultValues: {
      Search: null,
      List: [],
    },
  });

  const fields = useFieldArray({
    control: form.control,
    name: "List",
  });

  const List = form.watch("List");

  const onSubmit = (data) => {
    const result = Array.from({ length: 10 }, (_, i) => {
      const c = faker.address.countryCode();

      return {
        MaKhoXuat: c,
        TenKhoXuat: faker.commerce.productAdjective(),
        checked: false,
      };
    });

    form.setValue("List", result);
  };

  const handleSearch = () => {
    refSubmitButton.current.click();
  };

  const handleCheck = (index) => {
    const result = List.map((item, i) => {
      if (index == i) {
        return {
          ...item,
          checked: true,
        };
      }

      return {
        ...item,
        checked: false,
      };
    });

    form.setValue("List", result);
  };

  const handleSave = () => {
    const result = List.find((item, i) => {
      return item.checked == true;
    });

    if (result) {
      setValue("KhoXuat", result?.MaKhoXuat);
    }

    handleClose();
  };

  return (
    <Popup
      visible={visible}
      showCloseButton
      onHiding={handleClose}
      title="Tìm kiếm kho xuất"
      width={500}
      wrapperAttr={{
        class: "popup-ton-kho",
      }}
    >
      <form id="search_KhoXuat" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px] w-full">
            <div className="flex-grow">
              <Controller
                name={"Search"}
                control={form.control}
                render={({ field }) => {
                  return <TextBoxField field={field} />;
                }}
              />
            </div>

            <Button
              style={{
                padding: 10,
              }}
              type="default"
              onClick={handleSearch}
            >
              Tìm kiếm
            </Button>
          </div>

          <table>
            <tr>
              <th></th>
              <th>Mã kho</th>
              <th>Tên kho</th>
            </tr>
            {fields.fields?.map((item, index) => {
              return (
                <tr>
                  <td>
                    <input
                      type="radio"
                      name=""
                      id=""
                      checked={item.checked}
                      onClick={() => {
                        handleCheck(index);
                      }}
                    />
                  </td>
                  <td>{item.MaKhoXuat}</td>
                  <td>{item.TenKhoXuat}</td>
                </tr>
              );
            })}
          </table>
        </div>

        <button
          hidden={true}
          ref={refSubmitButton}
          type={"submit"}
          form={"search_KhoXuat"}
        ></button>
      </form>

      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location={"after"}
        cssClass="btn-cancel"
        options={{
          text: "Lưu",
          onClick: handleSave,
          stylingMode: "contained",
          type: "default",
        }}
      />
    </Popup>
  );
};

export default PopupTimKiemKhoXuat;
