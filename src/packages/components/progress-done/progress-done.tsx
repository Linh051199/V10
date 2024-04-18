import {Popup} from "devextreme-react/popup";
import {Icon} from "@packages/ui/icons";

interface ProgressDoneProps {
  visible: boolean;
  text: string;
  onHidding: () => void;
}
export const ProgressDone = (props: ProgressDoneProps) => {
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
      showTitle={true}
      showCloseButton={true}
      visible={visible}>
      <div className={'flex flex-col items-center justify-center w-full h-full'}>
        <Icon name={'done'} size={68}/>
        <div className={"text-[#E48203] text-2xl mt-2"}>
          {text}
        </div>
      </div>
    </Popup>
  )
}
