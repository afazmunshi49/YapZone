import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const ChosenOptionLabel = () => {
    const {chosenChatDetails} = useSelector(state => state.chat);
    const name = chosenChatDetails?.name;
  return (
    <Typography
            sx={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}
        >
            {name && (
                <>
                    <span style={{ fontStyle: '' }}>Yapping with</span> {name} 
                </>
            )}
        </Typography>
  );
};

export default ChosenOptionLabel;