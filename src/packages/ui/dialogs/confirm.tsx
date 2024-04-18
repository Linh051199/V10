import { Button, Popup } from 'devextreme-react';
import { ToolbarItem } from 'devextreme-react/popup';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
export default function ConfirmDialog(options: any) {

    if (!options.t) options.t = (s: any) => { return s };

    confirmAlert({
        overlayClassName: "background-none",
        customUI: ({ onClose }) => {
            return (
                <Popup
                    showCloseButton={true}
                    visible={true}
                    dragEnabled={false}
                    showTitle={options.title ? true : false}
                    title={options.title}
                    height={options.height ?? 200}
                    width={options.width ?? 400}
                    onHiding={onClose}
                    className={"confirmation-box"}
                    wrapperAttr={{
                        class: "confirmation-box",
                    }}
                >
                    <div className={"confirm-content"}>{options.message}</div>
                    <ToolbarItem location="after" toolbar={"bottom"}>
                        <Button
                            className="w-[65px]"
                            type="default"
                            stylingMode="contained"
                            text={options.yesBtnTitle ?? options.t("Yes")}
                            onClick={() => {

                                onClose();
                                options.yes?.();

                            }}
                        />
                    </ToolbarItem>
                    <ToolbarItem location="after" toolbar={"bottom"}>
                        <Button
                            className="min-w-[65px] search-car-popup cancel-button"
                            text={options.noBtnTitle ?? options.t("No")}
                            onClick={onClose}
                            stylingMode="contained"
                        />
                    </ToolbarItem>
                </Popup>
            );
        }
    });
}