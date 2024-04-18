import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { Tabs } from "devextreme-react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import HtmlEditorCustom from "./HtmlEditor/HtmlEditorCustom";

const TabThongTinKhac = ({
  control,
  t,
  errors,
  dataSource,
  setValue,
  watch,
  listRef,
  backupRef,
  currentParentTab,
}) => {
  const currentTab = watch("CurrentTabKhac");
  const [tabSelected, setTabSelected] = useState(0);

  const listHtmlEditor = [
    {
      id: 1,
      component: (
        <HtmlEditorCustom
          ref={listRef.ref1}
          backupRefTab={backupRef.backupRefTab1}
        />
      ),
    },
    {
      id: 2,
      component: (
        <HtmlEditorCustom
          ref={listRef.ref2}
          backupRefTab={backupRef.backupRefTab2}
        />
      ),
    },
    {
      id: 3,
      component: (
        <HtmlEditorCustom
          ref={listRef.ref3}
          backupRefTab={backupRef.backupRefTab3}
        />
      ),
    },
  ];
  useEffect(() => {
    if (tabSelected === 2) {
      listRef.ref3.current?.instance.option(
        "value",
        backupRef.backupRefTab3.current
      );
    }
    if (tabSelected === 1) {
      listRef.ref2.current?.instance.option(
        "value",
        backupRef.backupRefTab2.current
      );
    }
    if (tabSelected === 0) {
      listRef.ref1.current?.instance.option(
        "value",
        backupRef.backupRefTab1.current
      );
    }
  }, [tabSelected, currentParentTab]);

  // useEffect(() => {
  //   setValue("listHtml", [
  //     backupRef.backupRefTab1.current,
  //     backupRef.backupRefTab2.current,
  //     backupRef.backupRefTab3.current,
  //   ]);
  // }, [
  //   backupRef.backupRefTab3.current,
  //   backupRef.backupRefTab2.current,
  //   backupRef.backupRefTab1.current,
  //   tabSelected,
  // ]);

  // console.log(listHtmlEditor.find((c) => c.id - 1 == currentTab)?.id);

  return (
    <div className="flex flex-col p-[10px]">
      <div className="grid grid-cols-3 gap-[10px]">
        <div className="">
          <Controller
            name={"TenTiengAnh"}
            control={control}
            render={({ field }) => {
              return <TextBoxField field={field} label={t("Tên Tiếng Anh")} />;
            }}
          />
        </div>
        <div className="">
          <Controller
            name={"XuatXu"}
            control={control}
            render={({ field }) => {
              return <TextBoxField field={field} label={t("Xuất xứ")} />;
            }}
          />
        </div>
        <div className="">
          <Controller
            name={"QuyCach"}
            control={control}
            render={({ field }) => {
              return <TextBoxField field={field} label={t("Quy cách")} />;
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[10px]">
        <div className="">
          <Controller
            name={"TieuChuan"}
            control={control}
            render={({ field }) => {
              return <TextBoxField field={field} label={t("Tiêu chuẩn")} />;
            }}
          />
        </div>
        <div className="">
          <Controller
            name={"HanSuDung"}
            control={control}
            render={({ field }) => {
              return <TextBoxField field={field} label={t("Hạn sử dụng")} />;
            }}
          />
        </div>
        <div className="">
          <Controller
            name={"LinkQTSX"}
            control={control}
            render={({ field }) => {
              return (
                <TextBoxField field={field} label={t("Link Quy trình SX")} />
              );
            }}
          />
        </div>
      </div>

      <div className="flex items-center gap-[10px] pl-[100px]">
        <div>
          <Controller
            name={"QuanLySerial"}
            control={control}
            render={({ field }) => {
              return <CheckBoxField field={field} label="Quản lý Serial" />;
            }}
          />
        </div>
        <div>
          <Controller
            name={"QuanLyLOT"}
            control={control}
            render={({ field }) => {
              return <CheckBoxField field={field} label="Quản lý LOT" />;
            }}
          />
        </div>
      </div>

      <Tabs
        dataSource={dataSource.TabKhac}
        width={400}
        className="m-[10px]"
        keyExpr={"id"}
        defaultSelectedIndex={currentTab}
        onSelectedIndexChange={(value) => {
          setTabSelected(value);
          setValue("CurrentTabKhac", value);
        }}
      />

      {listHtmlEditor.find((c) => c.id - 1 == currentTab)?.component}
    </div>
  );
};

export default TabThongTinKhac;
