import {Popup} from "devextreme-react/popup";
import LoadIndicator from "devextreme-react/load-indicator";

interface ProgressPaneProps {
  visible: boolean;
  text: string;
  onHidding: () => void;
}
export const ProgressPane = (props: ProgressPaneProps) => {
  const {
    visible,
    text,
    onHidding
  } = props
  return (
    <Popup 
      width={450}
      height={200}
      wrapperAttr={{
        className: 'progress-pane-wrapper'
      }}
      onHiding={onHidding}
      showTitle={false}
      showCloseButton={false}
      visible={visible}>
      <div className={'flex flex-col items-center justify-center w-full h-full'}>
      <LoadIndicator width={68} height={68}/>
        <div className={"text-[#E48203] text-2xl mt-2"}>
          {text}
        </div>
      </div>
    </Popup>
  )
}