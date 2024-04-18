import { useI18n } from "@/i18n/useI18n";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Popup, ScrollView } from "devextreme-react";
import { useAtom } from "jotai";
import { useMemo } from "react";
import PrintContainer from "./PrintContainer";
import { printPopupAtom, printUrlAtom } from "./usePrint";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PrintPopup = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [popupVisble, setPopupVisible] = useAtom(printPopupAtom);

  const [printUrl] = useAtom(printUrlAtom);

  const { t: common } = useI18n("Common");

  const handleCancel = () => {
    setPopupVisible(false);
  };

  const renderPrint = useMemo(() => {
    if (!printUrl) {
      return (
        <Popup
          showTitle={true}
          hideOnOutsideClick
          height={300}
          width={400}
          showCloseButton
          visible={popupVisble}
          onHidden={handleCancel}
        >
          <div className="h-full flex items-center justify-center font-semibold text-base">
            {common("Invalid PDF File")}
          </div>
        </Popup>
      );
    }

    return (
      <>
        <Popup
          visible={popupVisble}
          showTitle={false}
          hideOnOutsideClick={true}
          onHidden={handleCancel}
          height={600}
        >
          <ScrollView disabled>
            <PrintContainer>
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.3)",
                  height: 600,
                }}
              >
                <Viewer
                  fileUrl={printUrl}
                  initialPage={1}
                  plugins={[defaultLayoutPluginInstance]}
                  renderError={() => (
                    <div className="flex items-center justify-center h-full">
                      <div className="bg-red-600 p-3 rounded-md t">
                        {common("Invalid PDF File")}
                      </div>
                    </div>
                  )}
                />
              </div>
            </PrintContainer>
          </ScrollView>
        </Popup>
      </>
    );
  }, [printUrl, popupVisble]);

  return renderPrint;
};

export default PrintPopup;
