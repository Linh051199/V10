import { Button } from "devextreme-react";

const CreateColumns = () => {
  const columns = [
    "CavityID",
    "DealerCode",
    "CavityNo",
    "CavityName",
    "CavityType",
    "Status",
    "IsActive",
    "Note",
    "LogLUDateTime",
    "LogLUBy",
    "StartUseDate",
    "FinishUseDate",
    "CreatedDate",
    "CreatedBy",
  ];

  const createColumns = () => {
    const result = columns.map((item) => ({
      dataField: item,
      visible: true,
      caption: `t("${item}")`,
      width: 200,
      minWidth: 200,
    }));

    // Convert the array of objects to a JSON string
    const jsonResult = JSON.stringify(result, null, 2);

    // Create a Blob with the JSON data
    const blob = new Blob([jsonResult], { type: "application/json" });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "columns.json";

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Trigger a click on the link to start the download
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="p-5">
      <Button
        text="Create"
        onClick={createColumns}
        stylingMode="contained"
        style={{
          background: "#00703c",
        }}
      ></Button>
    </div>
  );
};

export default CreateColumns;
