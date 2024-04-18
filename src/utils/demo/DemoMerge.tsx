// PdfMergeComponent.js
import usePrint from "@/components/print/usePrint";
import { PDFDocument } from "pdf-lib";
import { useState } from "react";

const Demo = () => {
  const [listArr, setListArr] = useState<any>([]);

  const { quickPrint } = usePrint();

  const handleChangeFile = (e) => {
    setListArr(e.target.files);
  };

  const mergePDFs = async () => {
    if (!listArr || listArr.length <= 0) {
      alert("Please select both PDF files");
      return;
    }

    const pdfDoc = await PDFDocument.create();
    //

    const pdfBytesArray = await Promise.all(
      Array.from(listArr).map((file) => file.arrayBuffer())
    );

    for (const pdfBytes of pdfBytesArray) {
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => pdfDoc.addPage(page));
    }

    //

    // console.log(listArr?.map((item: any) => item?.arrayBuffer()));

    // const pdfByte = await Promise.all(
    //   listArr?.map((item: any) => item?.arrayBuffer())
    // );

    // const listPdf = await Promise.all(
    //   pdfByte?.map((item: any) => PDFDocument.load(item))
    // );

    // listPdf.map(async (item: any) => {
    //   const copiedPages = await pdfDoc.copyPages(item, item.getPageIndices());
    //   copiedPages.forEach((page) => pdfDoc.addPage(page));
    // });

    // const copiedPages = await pdfDoc.copyPages(
    //   firstPdf,
    //   firstPdf.getPageIndices()
    // );
    // copiedPages.forEach((page) => pdfDoc.addPage(page));

    // const copiedPages2 = await pdfDoc.copyPages(
    //   secondPdf,
    //   secondPdf.getPageIndices()
    // );
    // copiedPages2.forEach((page) => pdfDoc.addPage(page));

    const mergedPdfBytes = await pdfDoc.save();

    // You can save, display, or do whatever you want with the merged PDF bytes here.

    const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

    // Create a download link and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "merged.pdf";
    downloadLink.click();
  };

  const mergePDFsLink = async () => {
    const pdfUrls = [
      "https://rptsvc.inos.vn/rp/preview?key=2-f1d75348-c95f-43f7-90d8-bd7a7f62a4dd&outputFormat=pdf#toolbar=0",
      "https://rptsvc.inos.vn/Temps/c7347174-352a-4122-9b03-d55a0a2d1a6c.pdf#toolbar=0",
    ];

    const pdfDoc = await PDFDocument.create();

    try {
      for (const url of pdfUrls) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF from ${url}`);
        }
        const pdfBytes = new Uint8Array(await response.arrayBuffer());
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await pdfDoc.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => pdfDoc.addPage(page));
      }

      const mergedPdfBytes = await pdfDoc.save();

      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });

      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "merged.pdf";
      // downloadLink.click();
      quickPrint({
        url: downloadLink.href,
      });
    } catch (error) {
      console.error("Error merging PDFs:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <h2>PDF Merge</h2>
      <input type="file" accept=".pdf" onChange={handleChangeFile} multiple />
      <button
        onClick={() => mergePDFs()}
        className="bg-red-300 w-[200px] px-4 py-2"
      >
        Merge PDFs
      </button>
      <button
        onClick={mergePDFsLink}
        className="bg-red-300 w-[200px] px-4 py-2"
      >
        Merge PDFs Link
      </button>
    </div>
  );
};

export default Demo;
