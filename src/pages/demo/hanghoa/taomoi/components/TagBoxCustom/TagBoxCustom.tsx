import { TagBox } from "devextreme-react";
import { nanoid } from "nanoid";
import { memo, useRef } from "react";

export default memo(function TagboxCustom({ setTagList, data, id }: any) {
  const currentData = data?.map((item: any) => {
    return {
      TagName: item,
      TagID: nanoid(),
    };
  });

  const tagRef = useRef();

  const onCustomItemCreating = (args: any) => {
    if (!args.text) {
      args.customItem = null;
      return;
    }
    const { component, text } = args;

    const tagFound = false;
    if (tagFound) {
      const check = "a";
    } else {
      const currentItems = component.option("items");
      const newItem = {
        TagID: text.trim(),
        TagName: text.trim(),
        Slug: "",
      };
      const itemInDataSource = currentItems.find(
        (item: any) => item.TagName === newItem.TagName
      );
      if (itemInDataSource) {
        args.customItem = itemInDataSource;
      } else {
        const result = currentData?.map((item: any) => item.TagName);

        const lst = [...result, newItem.TagName];

        setTagList(lst, id);
        currentItems.push(newItem);
        component.option("items", currentItems);
        args.customItem = newItem;
        // tagRef.current.instance.getButton("myCustomButton").focus();
      }
    }
  };

  const onKeyDown = (e: any) => {
    if (e.event.code === "Enter") {
      const event = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13,
        which: 13,
      });
      const target = e.event.target;
      target.dispatchEvent(event);
    }
  };

  console.log(currentData);

  return (
    <TagBox
      width={300}
      ref={tagRef}
      readOnly={false}
      inputAttr={{ "aria-label": "Product" }}
      searchEnabled={true}
      // defaultValue={dataDefault}
      items={currentData}
      displayExpr="TagName"
      valueExpr="TagName"
      acceptCustomValue={true}
      onCustomItemCreating={onCustomItemCreating}
      onKeyDown={onKeyDown}
      value={currentData}
      dropDownOptions={{
        visible: false,
      }}
      // onValueChanged={(e) => handleChangeTags(e, id)}
    />
  );
});
