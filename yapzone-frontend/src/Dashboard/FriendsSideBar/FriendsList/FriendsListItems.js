import React from 'react';
import Button from '@mui/material/Button'
import Avatar from '../../../shared/components/Avatar';
import { Typography } from '@mui/material';
import OnlineIndicator from './OnlineIndicator';
import { chatTypes } from '../../../store/actions/chatActions';
import { useDispatch } from 'react-redux';
import { getActions } from '../../../store/actions/chatActions';

const FriendsListItems = ({ id, username, isOnline }) => {
    const dispatch = useDispatch();
    const actions = getActions(dispatch);

    const handleChooseActiveConversation = () => {
        actions.setChosenChatDetails({id: id, name: username}, chatTypes.DIRECT)
    }

  return (
    <Button
        onClick={handleChooseActiveConversation}
        style={{
            width: '100%',
            height: '42px',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            color: 'black',
            position: 'relative',
            textTransform: 'none'
        }}
    >
        <Avatar username={username} />
        <Typography
            style={{
                marginLeft: '7px',
                fontWeight: 700,
                color: '#8e9297',
            }}
            variant='subtitle1'
            align='left'
        >
            {username}
        </Typography>
        {isOnline && <OnlineIndicator />}
    </Button>
  );
};

export default FriendsListItems;