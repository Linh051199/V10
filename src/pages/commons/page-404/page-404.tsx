import React from "react";
import { Box } from "devextreme-react";
import { useI18n } from "@/i18n/useI18n";
import { useWindowSize } from "@/packages/hooks/useWindowSize";

export const Page404 = () => {
  const { t } = useI18n("Common");
  React.useEffect(() => {
    document.title = t("pageNotFound");
    return () => {
      document.title = t("pageNotFound");
    };
  }, []);
  //   <div>
  //   <img
  //     className="w-full h-full"
  //     src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif"
  //     alt=""
  //   />
  // </div>
  const windowSize = useWindowSize();
  return (
    <>
      <div className="flex justify-center">
        <div
          style={{
            height: `${windowSize.height}`,
            width: `${windowSize.width}`,
          }}
        >
          <img
            className="w-full h-full"
            src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif"
            alt=""
          />
        </div>
      </div>
    </>
  );
};
