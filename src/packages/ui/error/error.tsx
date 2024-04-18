import { ErrorMessage, clearErrorAtom, useErrorStore } from "@/packages/store";
import { ScrollView } from "devextreme-react";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import { useSetAtom } from "jotai";

import { useI18n } from "@/i18n/useI18n";
import Button from "devextreme-react/button";
import { useState } from "react";
import "./error.scss";

const ErrorDetail = ({ error }: { error: ErrorMessage }) => {
  const { t } = useI18n("Error");
  const objDebugInfo = error._dicDebug;
  const _dicExcs = error._dicExcs;

  const Lst_c_K_DT_SysInfo = _dicExcs?.Lst_c_K_DT_SysInfo;
  const Lst_c_K_DT_SysError = _dicExcs?.Lst_c_K_DT_SysError;
  const Lst_c_K_DT_SysWarning = _dicExcs?.Lst_c_K_DT_SysWarning;

  const errorCode =
    Lst_c_K_DT_SysInfo != null && Lst_c_K_DT_SysInfo.length > 0
      ? Lst_c_K_DT_SysInfo[0].ErrorCode
      : "";

  const detailError = error.detail;

  const errorType = error._strType;
  const errorMessage = t(errorCode);

  return (
    <div>
      {!!_dicExcs && (
        <div className="error__excresult">
          <div className="error__excresult-title font-bold">
            {t("Exception Result")}:
          </div>
          <div className="error__excresult__key">ErrorType: {errorType}</div>
          <div className="error__excresult__key">ErrorCode: {errorCode}</div>
          <div className="error__excresult__key">
            ErrorMessage: {errorMessage}
          </div>
          -----------------------------------------
          <div className="error__excresult__key font-bold ">
            Lst_c_K_DT_SysInfo:
          </div>
          {Lst_c_K_DT_SysInfo != null && Lst_c_K_DT_SysInfo.length > 0 ? (
            Lst_c_K_DT_SysInfo.map((item, index) => {
              return (
                <div key={item.Tid} className="">
                  {Object.entries(item).map(([key, value]) => {
                    return (
                      <div key={`${key}_${index}`}>
                        <div className="error__debuginfo__key">
                          {key}: {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <></>
          )}
          <div className="error__excresult__key font-bold mt-[10px]">
            Lst_c_K_DT_SysError:
          </div>
          {Lst_c_K_DT_SysError != null && Lst_c_K_DT_SysError.length > 0 ? (
            Lst_c_K_DT_SysError.map((item, index) => {
              return (
                <div key={item.PCode} className="mb-[10px]">
                  {Object.entries(item).map(([key, value]) => {
                    return (
                      <div key={`${key}_${index}`}>
                        <div className="error__debuginfo__key">
                          {key}: {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <></>
          )}
          <div className="error__excresult__key font-bold">
            Lst_c_K_DT_SysWarning:
          </div>
          {Lst_c_K_DT_SysWarning != null && Lst_c_K_DT_SysWarning.length > 0 ? (
            Lst_c_K_DT_SysWarning.map((item, index) => {
              return (
                <div key={item.PCode}>
                  {Object.entries(item).map(([key, value]) => {
                    return (
                      <div key={`${key}_${index}`}>
                        <div className="error__debuginfo__key">
                          {key}: {value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      )}
      <div>-----------------------------------------</div>
      {!!objDebugInfo && (
        <div className="error__debuginfo">
          <div className="error__debuginfo-title font-bold">
            {t("Debug information:")}
          </div>
          {Object.entries(objDebugInfo).map(([key, value]) => {
            return (
              <div key={key}>
                <div className="error__debuginfo__key">
                  {key}:{JSON.stringify(value, null, 2)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {detailError && (
        <>
          <div>-----------------------------------------</div>
          {detailError}
        </>
      )}
    </div>
  );
};

export default function Error() {
  const [size, setSize] = useState<"short" | "full">("short");
  const viewModeSizes = {
    short: {
      width: 500,
      height: 200,
    },
    full: {
      width: 550,
      height: 600,
    },
  };

  const { t } = useI18n("Error");
  const { errors } = useErrorStore();
  const clear = useSetAtom(clearErrorAtom);
  const hasErrors = !!errors && errors.length > 0;

  const handleClose = () => {
    clear();
  };

  const handleZoom = () => {
    setSize(size === "short" ? "full" : "short");
  };

  const title = t("ErrorTitle");

  return (
    <Popup
      titleRender={(item: any) => (
        <div className="error-title">
          <Button
            icon={"/images/icons/warning.svg"}
            hoverStateEnabled={false}
            activeStateEnabled={false}
            focusStateEnabled={false}
            stylingMode={"text"}
          />
          {title}
        </div>
      )}
      // container=".dx-viewport"
      visible={hasErrors}
      position={"center"}
      width={viewModeSizes[size].width}
      height={viewModeSizes[size].height}
      onHiding={() => setSize("short")}
      wrapperAttr={{
        class: "error-popup",
      }}
    >
      <Position at="bottom" my="center" />
      <ToolbarItem
        widget="dxButton"
        toolbar="bottom"
        location="after"
        options={{
          text: t(size === "short" ? "ViewDetail" : "Collapse"),
          onClick: handleZoom,
          stylingMode: "contained",
        }}
      />
      <ToolbarItem toolbar="bottom" location="after">
        <Button
          text={t("Close")}
          className="cancel-button"
          onClick={handleClose}
        />
      </ToolbarItem>
      <ScrollView
        width={520}
        showScrollbar={size === "full" ? "always" : "never"}
      >
        <div
          className=""
          style={{
            overflowX: "hidden",
          }}
        >
          {errors.map((item, index) => {
            if (item) {
              return (
                <div className="error-item" key={index}>
                  {/* <div
                    className="error__main"
                    onClick={() => {
                      document.getElementById("editable").focus();
                    }}
                  > */}
                  <div className="error__main font-bold">{item?.message}</div>
                  {size === "full" && (
                    <div className="error__detail">
                      <ErrorDetail error={item} />
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </ScrollView>
    </Popup>
  );
}
