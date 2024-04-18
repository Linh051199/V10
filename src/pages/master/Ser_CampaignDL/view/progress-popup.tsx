import {Popup} from "devextreme-react/popup";
import LoadIndicator from "devextreme-react/load-indicator";
import React, {ForwardedRef} from "react";
import {Icon} from "@packages/ui/icons";
import {fixedForwardRef} from "@/types";

interface ProgressPopupProps {
  visible: boolean;
  text: string;
  isDone: boolean;
  doneText: string;
  onHidding: () => void;
}

export const ProgressPopup = fixedForwardRef<HTMLDivElement, ProgressPopupProps>((props: ProgressPopupProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {
    visible,
    text,
    isDone=false,
    doneText='Done',
    onHidding
  } = props;
  return (
    <Popup
      width={450}
      height={200}
      wrapperAttr={{
        className: 'progress-pane-wrapper'
      }}
      showTitle={isDone}
      showCloseButton={isDone}
      hideOnOutsideClick={false}
      onHiding={onHidding}
      visible={visible}>
      <div ref={ref} className={'flex flex-col items-center justify-center w-full h-full'}>
        {!isDone && <LoadIndicator width={68} height={68}/> }
        {!isDone && <div className={"text-[#E48203] text-2xl mt-2"}>
          {text}
        </div>
        }
        {isDone && (
          <>
            <Icon name={'done'} size={68}/>
            <div className={"text-[#E48203] text-2xl mt-2"}>
              {doneText}
            </div>
          </>
        )}
      </div>
    </Popup>
  )
})