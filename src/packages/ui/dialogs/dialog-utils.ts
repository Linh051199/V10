import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfirmDialog from './confirm';
const showDialog = (customUI?: (customUiOptions: {
    onClose: () => void
}) => React.ReactNode) => {
    confirmAlert({
        overlayClassName: "background-none",
        customUI: customUI
    });


}

const showConfirmDialog = (options: any) => {
    return ConfirmDialog(options);
}

const simpleConfirm = (message: string, yes: () => void) => {
    return ConfirmDialog({
        yes: yes,
        message: message,
        //title:'DMS',
        height: 150,
        yesBtnTitle: 'Có',
        noBtnTitle: 'Không'

    });
}


export { showConfirmDialog, showDialog, simpleConfirm }