import { Button } from "devextreme-react";
import { useRef } from "react";

const UploadImage = ({ currentItem, setValue, currentList }: any) => {
  const fileInputRef = useRef<any>(null);

  const currentImage = currentItem.link
    ? currentItem.link
    : "https://www.vietravel.com/Images/no-image-available.jpg";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const find = currentList?.find((item: any) => item?.file == null);

    const result = currentList?.map((item: any) => {
      if (find.id == item.id) {
        item.file = selectedFile;
        item.link = URL.createObjectURL(selectedFile);
      }

      return item;
    });
    setValue("HinhAnh", result);
  };

  const handleOpen = () => {
    fileInputRef.current.click();
  };

  const handleClear = () => {
    const result = currentList?.map((item: any) => {
      if (item.id == currentItem.id) {
        item.file = null;
        item.link = null;
      }

      return item;
    });
    setValue("HinhAnh", result);
  };

  const handleChangeImage = () => {
    // setValue("ActiveImage", currentItem.id - 1);
  };

  return currentItem.link ? (
    <div
      className={`h-full w-full border-[1px] relative group`}
      onClick={handleChangeImage}
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPositionX: "50%",
        backgroundPositionY: "50%",
      }}
    >
      <div className="absolute h-[30px] bg-[#bebebe] w-full left-[0] top-[0] hidden justify-end group-hover:flex">
        <Button
          //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
          icon="/images/icons/camera.svg"
          stylingMode={"text"}
          type="default"
          onClick={handleOpen}
        />
        <Button
          //   visible={checkPermision("BTN_QUANTRI_QLDAILY_CREATE")}
          icon="/images/icons/close.svg"
          stylingMode={"text"}
          type="default"
          onClick={handleClear}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  ) : (
    <div
      className={`h-full w-full border-[1px] relative group cursor-pointer`}
      onClick={handleOpen}
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPositionX: "50%",
        backgroundPositionY: "50%",
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;
