import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ChosenOptionLabel = () => {
    const {chosenChatDetails} = useSelector(state => state.chat);
    const {userDetails} = useSelector(state => state.auth);
    const username = userDetails.username;
    const name = chosenChatDetails?.name;
  return (
    <Typography
            sx={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}
        >
            {name ? (
                <>
                    <span>Hello, {username}! Yapping with </span>{name}
                </>
            ) : (
                <span>Hello, {username}!</span>
            )}
        </Typography>
  );
};

export default ChosenOptionLabel;