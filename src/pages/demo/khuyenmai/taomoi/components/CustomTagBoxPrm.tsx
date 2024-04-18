import { useClientgateApi } from "@/packages/api";
import { FlagActiveEnum } from "@/packages/types";
import { Button, CheckBox, Popup, TagBox } from "devextreme-react";
import { ToolbarItem } from "devextreme-react/popover";
import DataSource from "devextreme/data/data_source";
import { nanoid } from "nanoid";
import { useMemo, useRef, useState } from "react";
import "../style.scss";

const CustomTagBoxPrm = ({ field, append, isNhomHang }) => {
  const api = useClientgateApi();

  const { onChange, ref, ...rest } = field;

  const tagRef = useRef<any>(null);

  const [groupPrdItem, setGroupPrdItem] = useState<any>([
    { id: 1, value: false, name: "Nhóm hàng 1" },
    { id: 2, value: false, name: "Nhóm hàng 2" },
    { id: 3, value: false, name: "Nhóm hàng 3" },
  ]);

  const [popupItems, setPopupItems] = useState<any>([
    { id: 1, value: false, name: "Nhóm hàng 1" },
    { id: 2, value: false, name: "Nhóm hàng 2" },
    { id: 3, value: false, name: "Nhóm hàng 3" },
  ]);

  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  const [visible, setVisible] = useState(false);

  const handleButtonClick = () => {
    setVisible(true);
  };

  const dataSource = new DataSource({
    key: "ProvinceCode",
    byKey: async (key) => {
      const resp = await api.Mst_Province_Search({
        Ft_PageIndex: 0,
        Ft_PageSize: 100,
        KeyWord: key,
        FlagActive: FlagActiveEnum.Active,
      });

      return resp.DataList;
    },
    load: async ({ searchValue }) => {
      const resp = await api.Mst_Province_Search({
        Ft_PageIndex: 0,
        Ft_PageSize: 100,
        KeyWord: searchValue,
        FlagActive: FlagActiveEnum.Active,
      });

      return resp.DataList;
    },
  });

  const onValueChange = async (e) => {
    await onChange({
      target: {
        name: rest.name,
        value: e,
      },
    });

    append(false);
  };

  const onValueGrpChange = async (e) => {
    const result = groupPrdItem.map((item) => {
      const find = e.find((c) => c == item.id);

      if (find) {
        return {
          ...item,
          value: true,
        };
      } else {
        return {
          ...item,
          value: false,
        };
      }
    });

    setGroupPrdItem(result);
    setPopupItems(result);

    await onChange({
      target: {
        name: rest.name,
        value: result
          .filter((item: any) => item.value == true)
          ?.map((item: any) => item.id),
      },
    });

    append(true);
  };

  const handleDropdownShowing = (e, isNhomHang) => {
    const popup = e.component; // Access the popup instance

    popup.option("toolbarItems", [
      {
        widget: "dxButton",
        options: {
          text: "Tìm kiếm thêm",
          icon: "plus", // Optional icon
          onClick: () => setPopupVisible(true),
        },
      },
    ]);

    if (isNhomHang) {
      popup.option("visible", false);
    }
  };

  const handleClose = () => {
    setPopupVisible(false);
  };

  const handleCheck = (id, e) => {
    const list = popupItems;

    console.log(list);

    const find = list.some((item) => item.id == id);

    if (find) {
      const result = list.map((item: any) => {
        if (id == item.id) {
          item.value = e.value;
        }

        return item;
      });

      setPopupItems(result);
    } else {
      const result = list.push({
        id: id,
        value: e.value,
      });

      setPopupItems(result);
    }
  };

  const handleCloseGrp = () => {
    setVisible(false);
  };

  const renderTagBox = useMemo(() => {
    return (
      <TagBox
        ref={tagRef}
        {...ref}
        dataSource={isNhomHang ? groupPrdItem : dataSource}
        minSearchLength={4}
        searchEnabled
        searchExpr={isNhomHang ? "value" : "ProvinceName"}
        // defaultValue={[]}
        // showDataBeforeSearch={false}
        value={field.value}
        onValueChange={isNhomHang ? onValueGrpChange : onValueChange}
        displayExpr={isNhomHang ? "name" : "ProvinceName"}
        valueExpr={isNhomHang ? "id" : "ProvinceCode"}
        width={"80%"}
        dropDownOptions={{
          onShowing: (e) => handleDropdownShowing(e, isNhomHang),
          height: 400,
          wrapperAttr: {
            class: "demo-dropdown",
          },
        }}
      />
    );
  }, [
    groupPrdItem,
    field.value,
    onValueChange,
    dataSource,
    onValueGrpChange,
    handleDropdownShowing,
    isNhomHang,
  ]);

  const handleSave = async () => {
    await onChange({
      target: {
        name: rest.name,
        value: popupItems
          .filter((item: any) => item.value == true)
          ?.map((item: any) => item.id),
      },
    });

    setGroupPrdItem(popupItems);

    if (popupItems.some((c) => c.value == true)) {
      append(true);
    } else {
      append(false);
    }

    handleCloseGrp();
  };

  // console.log(popupItems);

  const render = useMemo(() => {
    return popupItems.map((item) => {
      const find = field.value?.find((c) => c == item.id);

      if (isNhomHang) {
        return (
          <div className="flex items-center gap-[10px]" key={nanoid()}>
            <CheckBox
              text={item.name}
              name={`GrpPrd${item.id}`}
              onValueChanged={(e) => handleCheck(item.id, e)}
              value={find ? true : item.value}
            ></CheckBox>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-[10px]" key={nanoid()}>
          <CheckBox
            text={item.name}
            name={`GrpPrd${item.id}`}
            onValueChanged={(e) => handleCheck(item.id, e)}
            value={item.value}
          ></CheckBox>
        </div>
      );
    });
  }, [popupItems, field.value]);

  return (
    <div className="flex KhuyenMai w-full">
      <div className="flex items-center w-full">
        {renderTagBox}

        <Button
          text="Chọn"
          onClick={handleButtonClick}
          stylingMode="contained"
          type="default"
        />
      </div>

      <Popup
        visible={popupVisible}
        title="Popup chọn thêm sản phẩm"
        showCloseButton
        onHiding={handleClose}
      ></Popup>

      <Popup
        visible={visible}
        onHiding={handleCloseGrp}
        showCloseButton
        width={400}
        height={300}
        title="Chọn nhóm hàng"
      >
        <div className="flex flex-col gap-[10px]">{render}</div>

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-cancel"
          options={{
            text: "Chọn",
            onClick: handleSave,
            stylingMode: "contained",
            type: "default",
          }}
        />

        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location={"after"}
          cssClass="btn-cancel"
          options={{
            text: "Thoát",
            onClick: handleCloseGrp,
            stylingMode: "contained",
            type: "default",
          }}
        />
      </Popup>
    </div>
  );
};

export default CustomTagBoxPrm;
