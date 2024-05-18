import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { validateMail } from '../../shared/utils/validators';
import { DialogTitle, Typography } from '@mui/material';
import InputWithLabel from '../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import { useDispatch } from 'react-redux';
import { getActions } from '../../store/actions/friendsActions';

const AddFriendDialog = ({
    isDialogOpen, 
    closeDialogHandler,
}) => {
    const dispatch = useDispatch();
    const actions = getActions(dispatch);

    const [mail, setMail] = useState('');
    const [isFormValid, setIsFormValid] = useState('');

    const handleSendInvitation = () => {
        // send friend request to server
        actions.sendFriendInvitation({
            targetMailAddress: mail,
        }, closeDialogHandler);
    }

    const handleCloseDialog = () => {
        closeDialogHandler();
        setMail('');
    };

    useEffect(() => {
        setIsFormValid(validateMail(mail));
    }, [mail, setIsFormValid]);

  return (
    <div>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>
                <Typography>Invite a Friend</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography>
                        Enter e-mail address of friend which you would like to invite
                    </Typography>
                </DialogContentText>
                <InputWithLabel 
                    label='Mail'
                    type='text'
                    value={mail}
                    setValue={setMail}
                    placeholder='Enter mail address'
                />
            </DialogContent>
            <DialogActions>
                <CustomPrimaryButton
                    onClick={handleSendInvitation}
                    disabled={!isFormValid}
                    label='Send'
                    additionalStyles = {{
                        marginLeft: '15px',
                        marginRight: '15px',
                        marginBottom: '10px',
                    }}
                />
            </DialogActions>
        </Dialog>
    </div>
  );
};

export default AddFriendDialog;