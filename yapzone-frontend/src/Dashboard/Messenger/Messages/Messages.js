import React from 'react';
import {styled} from '@mui/system';
import MessagesHeader from './MessagesHeader';
import Message from './Message';
import { useSelector } from 'react-redux';
import DateSeprator from './DateSeperator';

const MainContainer = styled('div')({
    height: 'calc(100% - 60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const convertDateToHumanRedable = (date, format) => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear(),
    };

    return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
}

const Messages = ({chosenChatDetails}) => {
    const {messages} = useSelector(state => state.chat);

  return (
    <MainContainer>
        <MessagesHeader name={chosenChatDetails?.name} />
        {messages.map((message, index) => {
            const sameAuthor = index > 0 && 
            messages[index].author._id === messages[index-1].author._id;

            const sameDay = index > 0 &&
             convertDateToHumanRedable(new Date(message.date), 'mm/dd/yy') === 
             convertDateToHumanRedable(new Date(messages[index-1].date), 'mm/dd/yy');

            return(
                <div key={message._id} style={{width: '97%'}}>
                    {(!sameDay || index === 0) && (
                        <DateSeprator 
                        date={convertDateToHumanRedable(new Date(message.date), 'mm/dd/yy')}
                    />
                )}
                    <Message
                    content={message.content}
                    username={message.author.username}
                    sameAuthor={sameAuthor}
                    date={convertDateToHumanRedable(new Date(message.date), 'mm/dd/yy')}
                    sameDay={sameDay}
                />
                </div> 
            );
        })}
    </MainContainer>
  );
};

export default Messages;