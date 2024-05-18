import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { getActions } from '../../store/actions/AlertActions';

const AlertNotification = () => {
    const dispatch = useDispatch();
    const actions = getActions(dispatch);
    const { showAlertMessage, alertMessageContent } = useSelector(state => state.alert);

    const handleClose = () => {
        actions.closeAlertMessage();
    }
    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={showAlertMessage}
            onClose={handleClose}
            autoHideDuration={6000}
        >
            <Alert severity='info'>{alertMessageContent}</Alert>
        </Snackbar>
    );
};

export default AlertNotification;