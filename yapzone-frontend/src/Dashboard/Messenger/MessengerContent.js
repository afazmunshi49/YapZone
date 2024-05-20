import React, { useEffect } from 'react';
import {styled} from '@mui/system';
import Messages from './Messages/Messages';
import NewMessageInput from './NewMessageInput';

const Wrapper = styled('div')({
    flexGrow: 1
});

const MessengerContent = ({chosenChatDetails}) => {
    useEffect(() => {
        // TODO
        // fetching chat history from specific user id
        console.log('Chat changed');
    }, [chosenChatDetails]);
  
    return (
    <Wrapper>
        <Messages chosenChatDetails={chosenChatDetails} />
        <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;