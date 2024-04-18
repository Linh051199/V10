import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { NumberBoxField } from "@/packages/ui/hook-form-field/NumberBoxField";
import { SelectBoxField } from "@/packages/ui/hook-form-field/SelectBoxField";
import { TextAreaField } from "@/packages/ui/hook-form-field/TextAreaField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { UploadFileField } from "@/packages/ui/hook-form-field/UploadFileField";
import {
  Button,
  CheckBox,
  Gallery,
  List,
  NumberBox,
  Popup,
  SelectBox,
  TextBox,
} from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popup";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import { listDonVi } from "../../quanly/data";
import TagBoxCustom from "./TagBoxCustom/TagBoxCustom";
import UploadImage from "./UploadImage/UploadImage";

const TabThongTinChinh = ({
  control,
  errors,
  dataSource,
  t,
  currentHinhAnh,
  currentListThongTin,
  currentListThuocTinh,
  currentListDonVi,
  currentListDanhSach,
  setValue,
  customFunction,
  watch,
}) => {
  const ref: any = useRef();

  const textRef = useRef();

  const cacheRef = useRef();

  const listAttr = [
    {
      AttributeCode: "ATTRIBUTECODE.CBJ.00002",
      NetworkID: "6451164000",
      AttributeName: "Màu",
      FlagActive: "1",
      LogLUDTimeUTC: "2022-11-19",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.D16.00004",
      NetworkID: "6451164000",
      AttributeName: "Size",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-01-06",
      LogLUBy: "USER01@VELOCA.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.D16.00008",
      NetworkID: "6451164000",
      AttributeName: "Type",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-01-06",
      LogLUBy: "AUTOTN@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.D16.00009",
      NetworkID: "6451164000",
      AttributeName: "Màu sắc",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-01-06",
      LogLUBy: "USER01@VELOCA.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.D29.00013",
      NetworkID: "6451164000",
      AttributeName: "Status",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-02-09",
      LogLUBy: "AUTOTN@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.D3D.00014",
      NetworkID: "6451164000",
      AttributeName: "attribute",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-03-13",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.D4J.00015",
      NetworkID: "6451164000",
      AttributeName: "note",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-04-19",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.D4J.00016",
      NetworkID: "6451164000",
      AttributeName: "weight",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-04-19",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.DCB.00018",
      NetworkID: "6451164000",
      AttributeName: "Mausac",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-12-11",
      LogLUBy: "USER10@VELOCA.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.DCD.00021",
      NetworkID: "6451164000",
      AttributeName: "MauXe",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-12-13",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.DCI.00024",
      NetworkID: "6451164000",
      AttributeName: "MauXeERTIGA",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-12-18",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.DCI.00025",
      NetworkID: "6451164000",
      AttributeName: "MauNoiNgoaiThat",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-12-18",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.DCI.00026",
      NetworkID: "6451164000",
      AttributeName: "TT1",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-12-18",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.DCI.00027",
      NetworkID: "6451164000",
      AttributeName: "TT11",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-12-18",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.DCJ.00028",
      NetworkID: "6451164000",
      AttributeName: "chau rua",
      FlagActive: "1",
      LogLUDTimeUTC: "2023-12-19",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.E2T.00030",
      NetworkID: "6451164000",
      AttributeName: "cccccccccc",
      FlagActive: "1",
      LogLUDTimeUTC: "2024-02-29",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.E2T.00032",
      NetworkID: "6451164000",
      AttributeName: "ttttttttt1",
      FlagActive: "1",
      LogLUDTimeUTC: "2024-02-29",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.E2T.00033",
      NetworkID: "6451164000",
      AttributeName: "demo1",
      FlagActive: "1",
      LogLUDTimeUTC: "2024-02-29",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
    {
      AttributeCode: "ATTRIBUTECODE.E2T.00034",
      NetworkID: "6451164000",
      AttributeName: "a",
      FlagActive: "1",
      LogLUDTimeUTC: "2024-02-29",
      LogLUBy: "TNAUTO@INOS.VN",
      SolutionCode: null,
      FunctionActionType: null,
    },
  ];

  const handleAddThongTin = () => {
    setValue("PopupThemThongTin", true);
  };

  const handleEditThuocTinh = (value: any) => {
    setValue("PopupSuaThuocTinh", true);
    ref.current.instance.option("value", value);
    cacheRef.current = value;
  };

  const handleSuaThuocTinh = () => {
    const value = ref.current.instance.option("value");

    const result = dataSource.listSelectThuocTinh.map((item: any) => {
      if (item == cacheRef.current) {
        return value;
      }

      return item;
    });

    const resultList = currentListThuocTinh.map((item: any) => {
      if (item.AttributeCode == cacheRef.current) {
        item.AttributeCode = value;
      }

      return item;
    });

    setValue("ListSelectThuocTinh", result);
    setValue("ListThuocTinh", resultList);
    setValue("PopupSuaThuocTinh", false);
  };

  const handleClosePopupThuocTinh = () => {
    setValue("PopupSuaThuocTinh", false);
    ref.current.instance.option("value", "");
  };

  const handleEditThongTin = (value: any) => {
    setValue("PopupSuaThongTin", true);
    ref.current.instance.option("value", value);
    cacheRef.current = value;
  };

  const handleSuaThongTin = () => {
    const value = ref.current.instance.option("value");

    const result = dataSource.listSelectThongTin.map((item: any) => {
      if (item == cacheRef.current) {
        return value;
      }

      return item;
    });

    const resultList = currentListThongTin.map((item: any) => {
      if (item.TenThongTin == cacheRef.current) {
        item.TenThongTin = value;
      }

      return item;
    });

    setValue("ListSelectThongTin", result);
    setValue("ListThongTin", resultList);
    setValue("PopupSuaThongTin", false);
  };

  const handleClosePopupThongTin = () => {
    setValue("PopupSuaThongTin", false);
    ref.current.instance.option("value", "");
  };

  const visiblePopupSuaThuocTinh = watch("PopupSuaThuocTinh");
  const visiblePopupSuaThongTin = watch("PopupSuaThongTin");

  const handleChangeTenThongTin = (e, id) => {
    const result = currentListThongTin.map((item: any) => {
      if (item.id == id) {
        item.TenThongTin = e.value;
      }

      return item;
    });

    setValue("ListThongTin", result);
  };

  const handleRemoveThongTin = (id) => {
    const result = currentListThongTin.filter((item: any) => item.id != id);

    setValue("ListThongTin", result);
  };

  const handleChangeAttributeCode = (e, id) => {
    const result = currentListThuocTinh.map((item: any) => {
      if (item.id == id) {
        item.AttributeCode = e.value;
      }

      return item;
    });

    setValue("ListThuocTinh", result);
  };

  const filterListThuocTinh = (ds, current, obj) => {
    const result = ds
      ?.map((item: any) => {
        const find = current.some((c: any) => {
          return c.AttributeCode == item;
        });

        if (!find) {
          return item;
        }
      })
      .filter((item) => item);

    if (obj && obj.AttributeCode) {
      result.push(obj.AttributeCode);
    }

    return result;
  };

  const filterListThongTin = (ds, current, obj) => {
    const result = ds
      ?.map((item: any) => {
        const find = current.some((c: any) => {
          return c.TenThongTin == item;
        });

        if (!find) {
          return item;
        }
      })
      .filter((item) => item);

    if (obj && obj.TenThongTin) {
      result.push(obj.TenThongTin);
    }

    return result;
  };

  const handleRemoveDonVi = (id) => {
    const result = currentListDonVi.filter((item: any) => item.id != id);

    setValue("ListDonVi", result);
  };

  const handleAddThuocTinh = () => {
    setValue("PopupThemThuocTinh", true);
  };

  const handleRemoveThuocTinh = (id) => {
    const result = currentListThuocTinh.filter((item: any) => item.id != id);

    setValue("ListThuocTinh", result);
  };

  const handleChangeDonVi = (e, id, field) => {
    const result = currentListDonVi.map((item: any) => {
      if (item.id == id) {
        item[field] = e.value;
      }

      return item;
    });

    setValue("ListDonVi", result);
  };

  const handleChangeDanhSach = (e, id, field) => {
    if (field == "isShow" && id == 0 && e.value == false) {
      setValue("ListDanhSachHangCungLoai", []);
      return;
    }

    const result = currentListDanhSach.map((item: any) => {
      if (item.id == id) {
        item[field] = e.value;
      }

      return item;
    });

    setValue("ListDanhSachHangCungLoai", result);
  };

  const setTagListThongTin = (value, id) => {
    const result = currentListThongTin.map((item: any) => {
      if (item.id == id) {
        item.NoiDung = value;
      }

      return item;
    });

    setValue("ListThongTin", result);
  };

  const setTagListThuocTinh = (value, id) => {
    const result = currentListThuocTinh.map((item: any) => {
      if (item.id == id) {
        item.AttributeName = value;
      }

      return item;
    });

    setValue("ListThuocTinh", result);
  };

  return (
    <div className="flex flex-col ">
      <div className="p-[10px] flex gap-[10px]">
        <div className="w-[60%] grid">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="">
              <Controller
                name={"LoaiHang"}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectBoxField
                      field={field}
                      label={t("LoaiHang")}
                      error={errors.LoaiHang}
                      dataSource={dataSource.LoaiHang}
                      displayExpr="label"
                      valueExpr="value"
                      required
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"GiaMua"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={t("GiaMua")}
                      props={{
                        format: "#,##0.00",
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="">
              <Controller
                name={"MaHang"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("MaHang")}
                      error={errors.MaHang}
                      required
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"GiaBan"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={t("GiaBan")}
                      props={{
                        format: "#,##0.00",
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="">
              <Controller
                name={"BarCode"}
                control={control}
                render={({ field }) => {
                  return <TextBoxField field={field} label={t("BarCode")} />;
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"ThueVAT"}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectBoxField
                      field={field}
                      label={t("ThueVAT")}
                      error={errors.ThueVAT}
                      dataSource={dataSource.ThueVAT}
                      displayExpr="label"
                      valueExpr="value"
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="">
              <Controller
                name={"TenHang"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextBoxField
                      field={field}
                      label={t("TenHang")}
                      error={errors.TenHang}
                      required
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"TonKhoNhoNhat"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={t("TonKhoNhoNhat")}
                      props={{
                        format: "#,##0.00",
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="">
              <Controller
                name={"NhomHang"}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectBoxField
                      field={field}
                      label={t("NhomHang")}
                      error={errors.NhomHang}
                      dataSource={dataSource.NhomHang}
                      displayExpr="label"
                      valueExpr="value"
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"TonKhoToiUu"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={t("TonKhoToiUu")}
                      props={{
                        format: "#,##0.00",
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="">
              <Controller
                name={"MaBrand"}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectBoxField
                      field={field}
                      label={t("MaBrand")}
                      error={errors.MaBrand}
                      dataSource={dataSource.MaBrand}
                      displayExpr="label"
                      valueExpr="value"
                    />
                  );
                }}
              />
            </div>
            <div className="">
              <Controller
                name={"TonKhoToiDa"}
                control={control}
                render={({ field }) => {
                  return (
                    <NumberBoxField
                      field={field}
                      label={t("TonKhoToiDa")}
                      props={{
                        format: "#,##0.00",
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px]">
            <div className="">
              <Controller
                name={"GhiChu"}
                control={control}
                render={({ field }) => {
                  return (
                    <TextAreaField
                      field={field}
                      error={errors.ChuXe}
                      label={"GhiChu"}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-[10px]">
            <div className="">
              <Controller
                name={"FileDinhKem"}
                control={control}
                render={({ field }) => {
                  return (
                    <UploadFileField field={field} label={"FileDinhKem"} />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-[40%] ">
          <Gallery
            items={currentHinhAnh}
            height={300}
            elementAttr={{
              class: "custom-gallery",
            }}
            slideshowDelay={0}
            showNavButtons
            defaultSelectedIndex={0}
            swipeEnabled={false}
            loop={false}
            showIndicator={false}
            itemRender={(c) => {
              const image = c.link
                ? c.link
                : "https://www.vietravel.com/Images/no-image-available.jpg";

              return (
                <div key={c.id} className="w-full">
                  <img src={image} alt="" className="w-full h-full" />
                </div>
              );
            }}
          />

          <div className="grid grid-cols-5 gap-[5px] mt-[10px]">
            {currentHinhAnh?.map((item: any, index: any) => {
              return (
                <div className="h-[100px]" key={nanoid()}>
                  <UploadImage
                    currentItem={item}
                    setValue={setValue}
                    currentList={currentHinhAnh}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full p-[10px]">
        <List
          dataSource={[
            {
              id: 1,
              title: "Thông tin bổ sung",
              items: [1],
            },
          ]}
          height="100%"
          grouped={true}
          collapsibleGroups={true}
          groupRender={(item) => {
            return <div className="font-semibold">{item.title}</div>;
          }}
          itemRender={(z: any) => {
            return (
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px]">
                  {currentListThongTin?.map((item: any) => {
                    const ds = filterListThongTin(
                      dataSource.listSelectThongTin,
                      currentListThongTin,
                      item
                    );

                    return (
                      <div
                        className="flex items-center gap-[5px]"
                        key={item.id}
                      >
                        <Button
                          style={{
                            padding: 10,
                          }}
                          icon="/images/icons/trash.svg"
                          type="default"
                          stylingMode={"outlined"}
                          onClick={() => handleRemoveThongTin(item.id)}
                        ></Button>
                        <SelectBox
                          dataSource={ds}
                          showClearButton
                          width={200}
                          onValueChanged={(e) =>
                            handleChangeTenThongTin(e, item.id)
                          }
                          value={item.TenThongTin}
                        />
                        {item.TenThongTin ? (
                          <Button
                            style={{
                              padding: 10,
                            }}
                            icon="/images/icons/edit.svg"
                            type="default"
                            stylingMode={"outlined"}
                            onClick={() => handleEditThongTin(item.TenThongTin)}
                          ></Button>
                        ) : (
                          <Button
                            style={{
                              padding: 10,
                            }}
                            icon="/images/icons/add-icon.svg"
                            type="default"
                            stylingMode={"outlined"}
                            onClick={handleAddThongTin}
                          ></Button>
                        )}

                        <TagBoxCustom
                          data={item.NoiDung}
                          id={item.id}
                          setTagList={setTagListThongTin}
                        />
                      </div>
                    );
                  })}
                </div>
                <div>
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    onClick={customFunction.addThongTin}
                  >
                    Thêm thông tin
                  </Button>
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="flex flex-col w-full p-[10px]">
        <List
          dataSource={[
            {
              id: 1,
              title: "Thuộc tính",
              items: [1],
            },
          ]}
          height="100%"
          grouped={true}
          collapsibleGroups={true}
          groupRender={(item) => {
            return <div className="font-semibold">{item.title}</div>;
          }}
          itemRender={(item: any) => {
            return (
              <div className="flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[10px]">
                  {currentListThuocTinh?.map((c: any) => {
                    const ds = listAttr;

                    return (
                      <div className="flex items-center gap-[5px]">
                        <Button
                          style={{
                            padding: 10,
                          }}
                          icon="/images/icons/trash.svg"
                          type="default"
                          stylingMode={"outlined"}
                          onClick={() => handleRemoveThuocTinh(c.id)}
                        ></Button>
                        <SelectBox
                          dataSource={ds}
                          showClearButton
                          width={200}
                          onValueChanged={(e) =>
                            handleChangeAttributeCode(e, c.id)
                          }
                          value={c.AttributeCode}
                          valueExpr={"AttributeCode"}
                          displayExpr={"AttributeName"}
                        />
                        {c.AttributeCode ? (
                          <Button
                            style={{
                              padding: 10,
                            }}
                            icon="/images/icons/edit.svg"
                            type="default"
                            stylingMode={"outlined"}
                            onClick={() => handleEditThuocTinh(c.AttributeCode)}
                          ></Button>
                        ) : (
                          <Button
                            style={{
                              padding: 10,
                            }}
                            icon="/images/icons/add-icon.svg"
                            type="default"
                            stylingMode={"outlined"}
                            onClick={handleAddThuocTinh}
                          ></Button>
                        )}

                        <TagBoxCustom
                          data={[c.AttributeValue]}
                          id={c.id}
                          setTagList={setTagListThuocTinh}
                        />
                      </div>
                    );
                  })}
                </div>
                <div>
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    onClick={customFunction.addThuocTinh}
                  >
                    Thêm thuộc tính
                  </Button>
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="flex flex-col w-full p-[10px]">
        <List
          dataSource={[
            {
              id: 1,
              title: "Đơn vị",
              items: [1],
            },
          ]}
          height="100%"
          grouped={true}
          bounceEnabled={false}
          collapsibleGroups={true}
          groupRender={(item) => {
            return <div className="font-semibold">{item.title}</div>;
          }}
          itemRender={(item: any) => {
            return (
              <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px] items-center">
                  <div>
                    <Controller
                      name={"DonViCoBan"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <SelectBoxField
                            dataSource={listDonVi}
                            field={field}
                            displayExpr={"UnitName"}
                            valueExpr="UnitCode"
                            label="Đơn vị cơ bản"
                          />
                        );
                      }}
                    />
                  </div>
                  <div>
                    <Controller
                      name={"CoDuocBan"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <CheckBoxField field={field} label="Cờ được bán" />
                        );
                      }}
                    />
                  </div>
                  <div>
                    <Controller
                      name={"CoDuocMua"}
                      control={control}
                      render={({ field }) => {
                        return (
                          <CheckBoxField field={field} label="Cờ được mua" />
                        );
                      }}
                    />
                  </div>
                </div>

                {currentListDonVi && currentListDonVi.length > 0 && (
                  <div className="flex items-center gap-[10px]">
                    <Button
                      style={{
                        pointerEvents: "none",
                        opacity: 0,
                        padding: 10,
                      }}
                      icon="/images/icons/trash.svg"
                      type="default"
                      stylingMode={"outlined"}
                    ></Button>

                    <div className="w-[200px] font-semibold text-center">
                      Tên đơn vị
                    </div>

                    <div className="w-[200px] font-semibold text-center">
                      SL quy đổi
                    </div>

                    <div className="w-[200px] font-semibold text-center">
                      Giá bán
                    </div>

                    <div className="w-[200px] font-semibold text-center">
                      Giá mua
                    </div>
                  </div>
                )}

                {currentListDonVi?.map((c: any) => {
                  return (
                    <div
                      className="flex items-center gap-[10px]"
                      key={nanoid()}
                    >
                      <Button
                        style={{
                          padding: 10,
                        }}
                        icon="/images/icons/trash.svg"
                        type="default"
                        stylingMode={"outlined"}
                        onClick={() => handleRemoveDonVi(c.id)}
                      ></Button>

                      <TextBox
                        width={200}
                        value={c.UnitCode}
                        onValueChanged={(e) =>
                          handleChangeDonVi(e, c.id, "UnitCode")
                        }
                      />

                      <NumberBox
                        width={200}
                        format={"#,##0.00"}
                        value={c.ValConvert}
                        onValueChanged={(e) =>
                          handleChangeDonVi(e, c.id, "ValConvert")
                        }
                      />

                      <NumberBox
                        width={200}
                        format={"#,##0.00"}
                        value={c.UPSell}
                        onValueChanged={(e) =>
                          handleChangeDonVi(e, c.id, "UPSell")
                        }
                      />

                      <NumberBox
                        width={200}
                        format={"#,##0.00"}
                        value={c.UPBuy}
                        onValueChanged={(e) =>
                          handleChangeDonVi(e, c.id, "UPBuy")
                        }
                      />

                      <div className="flex items-center gap-[5px]">
                        <CheckBox
                          value={c.FlagSell}
                          onValueChanged={(e) =>
                            handleChangeDonVi(e, c.id, "FlagSell")
                          }
                        />
                        <div>Có thẻ bán</div>
                      </div>

                      <div className="flex items-center gap-[5px]">
                        <CheckBox
                          value={c.FlagBuy}
                          onValueChanged={(e) =>
                            handleChangeDonVi(e, c.id, "FlagBuy")
                          }
                        />
                        <div>Có thẻ mua</div>
                      </div>
                    </div>
                  );
                })}

                <div>
                  <Button
                    style={{
                      padding: 10,
                    }}
                    type="default"
                    onClick={customFunction.addDonVi}
                  >
                    Thêm đơn vị
                  </Button>
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="flex flex-col w-full p-[10px]">
        <List
          dataSource={[
            {
              id: 1,
              title: "Danh sách hàng cùng loại",
              items: [1],
            },
          ]}
          height="100%"
          grouped={true}
          collapsibleGroups={true}
          groupRender={(item) => {
            return <div className="font-semibold">{item.title}</div>;
          }}
          itemRender={(item: any) => {
            return (
              <div className="flex flex-col gap-[10px]">
                {currentListDanhSach && currentListDanhSach.length > 0 && (
                  <div className="flex items-center gap-[10px]">
                    <Button
                      style={{
                        pointerEvents: "none",
                        opacity: 0,
                        padding: 10,
                      }}
                      icon="/images/icons/trash.svg"
                      type="default"
                      stylingMode={"outlined"}
                    ></Button>

                    <div className="w-[200px] font-semibold text-center">
                      Hàng hóa
                    </div>

                    <div className="w-[200px] font-semibold text-center">
                      Mã hàng
                    </div>

                    <div className="w-[200px] font-semibold text-center">
                      Mã vạch
                    </div>

                    <div className="w-[200px] font-semibold text-center">
                      Đơn vị
                    </div>

                    <div className="w-[200px] font-semibold text-center">
                      Giá mua
                    </div>

                    <div className="w-[200px] font-semibold text-center">
                      Giá bán
                    </div>
                  </div>
                )}

                {currentListDanhSach?.map((c: any) => {
                  if (c.isShow == false) {
                    return <></>;
                  }
                  return (
                    <div
                      className="flex items-center gap-[10px]"
                      key={nanoid()}
                    >
                      <Button
                        style={{
                          padding: 10,
                        }}
                        icon="/images/icons/trash.svg"
                        type="default"
                        stylingMode={"outlined"}
                        onClick={() =>
                          handleChangeDanhSach({ value: false }, c.id, "isShow")
                        }
                      ></Button>

                      <TextBox
                        width={200}
                        value={c.HangHoa}
                        onValueChanged={(e) =>
                          handleChangeDanhSach(e, c.id, "HangHoa")
                        }
                      />

                      <TextBox
                        width={200}
                        value={c.MaHang}
                        onValueChanged={(e) =>
                          handleChangeDanhSach(e, c.id, "MaHang")
                        }
                      />

                      <TextBox
                        width={200}
                        value={c.MaVach}
                        onValueChanged={(e) =>
                          handleChangeDanhSach(e, c.id, "MaVach")
                        }
                      />

                      <TextBox
                        width={200}
                        value={c.DonVi}
                        onValueChanged={(e) =>
                          handleChangeDanhSach(e, c.id, "DonVi")
                        }
                      />

                      <NumberBox
                        width={200}
                        format={"#,##0"}
                        value={c.GiaMua}
                        onValueChanged={(e) =>
                          handleChangeDanhSach(e, c.id, "GiaMua")
                        }
                      />

                      <NumberBox
                        width={200}
                        format={"#,##0"}
                        value={c.GiaBan}
                        onValueChanged={(e) =>
                          handleChangeDanhSach(e, c.id, "GiaBan")
                        }
                      />
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
      </div>

      <Popup
        visible={visiblePopupSuaThuocTinh}
        width={400}
        height={200}
        title="Chỉnh sửa thuộc tính"
      >
        <TextBox
          ref={ref}
          onValueChanged={(e) => {
            textRef.current = e.value;
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-cancel"
          options={{
            text: "Sửa",
            stylingMode: "contained",
            type: "default",
            onClick: handleSuaThuocTinh,
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: "Thoát",
            stylingMode: "contained",
            type: "default",
            onClick: handleClosePopupThuocTinh,
          }}
        />
      </Popup>

      <Popup
        visible={visiblePopupSuaThongTin}
        width={400}
        height={200}
        title="Chỉnh sửa thông tin"
      >
        <TextBox
          ref={ref}
          onValueChanged={(e) => {
            textRef.current = e.value;
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-cancel"
          options={{
            text: "Sửa",
            stylingMode: "contained",
            type: "default",
            onClick: handleSuaThongTin,
          }}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          options={{
            text: "Thoát",
            stylingMode: "contained",
            type: "default",
            onClick: handleClosePopupThongTin,
          }}
        />
      </Popup>
    </div>
  );
};

export default TabThongTinChinh;
