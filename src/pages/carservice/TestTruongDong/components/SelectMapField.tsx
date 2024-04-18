import { Button, Form, SelectBox, TextBox } from "devextreme-react";
import {
  ButtonItem,
  GroupItem,
  Label,
  SimpleItem,
} from "devextreme-react/form";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { ValueChangedEvent } from "devextreme/ui/text_box";
import { faker } from "@faker-js/faker";
import "./styles.scss";

const listFieldType = [
  {
    text: "Only",
    value: "only",
  },
  {
    text: "Only 2",
    value: "only2",
  },
  {
    text: "Multi",
    value: "multi",
  },
];

const un_expand = "/images/icons/un-expand.svg";
const expand = "/images/icons/expand.svg";

interface IProps {
  defaultValue: string;
  gridInstance: any;
  rowIndex: number;
  dataField: string;
  dataRow: any;
}
export const SelectMapField = forwardRef(
  (
    { defaultValue, gridInstance, dataField, rowIndex, dataRow }: IProps,
    ref
  ) => {
    const formRef: any = useRef();
    const [value, setValue] = useState(defaultValue);
    const [fields, setFields] = useState<any[]>(() => dataRow.JsonForm);
    const [visibleForm, setVisibleForm] = useState<boolean>(false);

    // custom handle pass into ref // chưa dùng tới
    useImperativeHandle(ref, () => {
      return {
        getFormRef: () => {
          return formRef;
        },
      };
    });

    // customize my function handle similar cellValue(rowIndex, dataField, newValue)
    const updateCellValue = (
      rowIndex: number,
      columnName: string,
      newValue: any
    ) => {
      // Get the row data
      const rowData = gridInstance.option("dataSource")[rowIndex];

      // Update the specific field value
      rowData[columnName] = newValue;

      // Update the row data in the data source
      const updatedDataSource = [...gridInstance.option("dataSource")];
      updatedDataSource[rowIndex] = rowData;

      // Save the edited data
      gridInstance.option("dataSource", updatedDataSource);
      gridInstance.saveEditData();
    };

    // handle save data source
    const onSaveDataSource = (dataFieldChanged: any) => {
      // debugger;

      // use method of DataGrid component => Cách này có 1 nhược điểm phải render cái field cần update vào props columns của bảng
      // gridInstance.cellValue(rowIndex, "JsonForm", dataFieldChanged); // => cập nhật giá trị JsonForm mới vào hàng đang thao tác
      // gridInstance.saveEditData(); // => lưu data thay đổi vào gridviewone

      // use my customize cellValue => Tạo ra 1 hàm tương tự cellValue giống của thư viện
      updateCellValue(rowIndex, "JsonForm", dataFieldChanged);
    };

    // render dynamic fields
    const generateFormFields = (fieldName: string) => {
      const listFields = fields?.map((field: any, index: number) => (
        <SimpleItem
          key={`${fieldName}${index}`}
          dataField={fieldName}
          render={(e) => {
            return (
              <TextBox
                inputAttr={{}}
                width={"100%"}
                defaultValue={field.Code}
                onValueChanged={(eventChanged: ValueChangedEvent) => {
                  eventChanged.component.option("value", eventChanged.value);
                  setFields((prev) => {
                    const coupleFieldModify = prev.find((item: any) => {
                      return item.Idx === field.Idx;
                    });
                    const dataFieldChanged = fields.map((item: any) => {
                      if (item.Idx === coupleFieldModify.Idx) {
                        return {
                          Idx: item.Idx,
                          ...item,
                          [fieldName]: eventChanged.value,
                        };
                      }
                      return item;
                    });
                    // debugger;
                    onSaveDataSource(dataFieldChanged);
                    return dataFieldChanged;
                  });
                }}
              />
            );
          }}
        >
          <Label text={`${fieldName} ${index + 1}`} />
        </SimpleItem>
      ));
      return listFields;
    };

    // xóa trường động trong form
    const handleDeleteField = (field: any) => {
      // console.log("🟡 ~ field:", field); // => { "Idx": "QXB6W1", "Code": "FieldCode1", "Name": "FieldName1" }

      // xóa field của row thì phải cũng phải set lại data trong gridviewone
      setFields((prev) => {
        // debugger;

        // Find the index of the field to delete
        const indexToDelete = prev.findIndex(
          (item: any) => item.Idx === field.Idx
        );

        if (indexToDelete !== -1) {
          // Create a new array that excludes the field to delete
          const updatedFields = [
            ...fields.slice(0, indexToDelete), // [0, idxDel) // spread những phần tử từ đầu mảng tới vị trí bị xóa
            ...fields.slice(indexToDelete + 1), // (idxDel, endArray] spread những phần tử còn lại từ vị trí xóa tới cuối mảng
          ];

          // Update the state with the new array
          onSaveDataSource(updatedFields); // save vào dataSource gridviewone
          return updatedFields;
        }
        onSaveDataSource(prev); // save vào dataSource gridviewone
        return [...prev]; // không có gì thay đối
      });
    };

    // thêm field động vào form
    const handleAddField = () => {
      setFields((prev: any) => {
        return [
          ...prev,
          {
            Idx: faker.random.alphaNumeric(6).toUpperCase(),
            Code: "",
            Name: "",
          },
        ];
      });
    };

    return (
      <>
        {" "}
        <div className="select-map-field-container flex justify-between">
          <SelectBox
            // className="flex-grow-1"
            defaultValue={defaultValue}
            items={listFieldType ?? []}
            value={value}
            displayExpr={"text"}
            valueExpr={"value"}
            placeholder="Choose..."
            showClearButton={true}
            onValueChanged={(ev: any) => {
              setValue(ev.value);
              gridInstance.cellValue(rowIndex, dataField, ev.value); // Nhớ đoạn này phải truyền đối số thứ 2 là dataField
              gridInstance.saveEditData();
            }}
          />
          {["multi"].includes(value) && (
            <Button
              // className="w-[20px]"
              icon={visibleForm ? un_expand : expand}
              onClick={() => {
                setVisibleForm(!visibleForm);
              }}
            ></Button>
          )}
        </div>
        {value === "multi" && visibleForm && (
          <Form
            ref={formRef}
            id="form"
            className="form-select-map-field-container"
            colCount={3}
            key={rowIndex}
            // minColWidth={"auto"}
            width={"auto"}
          >
            <GroupItem cssClass="form-select-map-field-group-item" name="Code">
              {generateFormFields("Code")}
            </GroupItem>

            <GroupItem cssClass="form-select-map-field-group-item" name="Name">
              {generateFormFields("Name")}
            </GroupItem>

            <GroupItem cssClass="form-select-map-field-group-item" name="Del">
              {fields?.map((item: any, index: number) => (
                <ButtonItem
                  key={nanoid()}
                  horizontalAlignment="left"
                  cssClass={"mt-[22px]"}
                  buttonOptions={{
                    icon: "trash",
                    text: "",
                    onClick: (e: any) => {
                      handleDeleteField(item);
                    },
                  }}
                ></ButtonItem>
              ))}
            </GroupItem>

            <ButtonItem
              horizontalAlignment="left"
              cssClass="btn-add-dynamic-field"
              buttonOptions={{
                icon: "add",
                text: "Add",
                onClick: () => {
                  handleAddField();
                },
              }}
            ></ButtonItem>
          </Form>
        )}
      </>
    );
  }
);

// // CON HÀNG UPDATE LOẰNG NGOẰNG
// // tìm ra cái row id mà mình update
// // debugger;
// const modifyData = gridInstance
//   .option("dataSource")
//   .find(
//     (item: any) => item.FieldCode === dataRow.FieldCode
//   );

// // tìm ra cái thằng con trong JsonForm muốn update
// const modifyChild = dataRow.JsonForm.find((item: any) => {
//   return item[fieldName] === eventChanged.previousValue;
// });

// // lưu ngược lại  data vừa thay đổi trong array
// const dataFieldChanged = fields.map((item: any) => {
//   if (item.Idx === modifyChild.Idx) {
//     return {
//       Idx: item.Idx,
//       ...item,
//       [fieldName]: eventChanged.value,
//     };
//   }
//   return item;
// });

// // tiếp tục lưu ngược lại data form vào chính cái datagridview
// // gridInstance.cellValue(rowIndex, dataField, ev.value)
// const dataSource = gridInstance
//   .option("dataSource")
//   .map((item: any) => {
//     if (item.FieldCode === modifyData.FieldCode) {
//       return {
//         ...item,
//         JsonForm: dataFieldChanged,
//       };
//     }
//     return item;
//   });

// gridInstance.option("dataSource", dataSource);
// gridInstance.saveEditData();

// //
// setFields((prev) => {
//   return [...dataFieldChanged];
// });
