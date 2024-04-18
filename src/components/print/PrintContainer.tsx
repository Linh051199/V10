import { Worker } from "@react-pdf-viewer/core";

const workerUrl =
  "https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { ReactNode } from "react";

const PrintContainer = ({ children }: { children: ReactNode }) => {
  return <Worker workerUrl={workerUrl}>{children}</Worker>;
};

export default PrintContainer;
