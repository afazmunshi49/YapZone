import React from 'react';
import { styled } from '@mui/system';
import PendingInvitationListItems from './PendingInvitationListItems';
import { useSelector } from 'react-redux';

const MainContainer = styled('div')({
    width: '100%',
    height: '22%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
});

const PendingInvitationList = () => {
  const { friends, pendingFriendsInvitations, onlineUsers } = useSelector(state => state.friends);

  return (
    <MainContainer>
        {pendingFriendsInvitations.map(invitation => (
          <PendingInvitationListItems 
            key={invitation._id}
            id={invitation._id}
            username={invitation.senderId.username}
            mail={invitation.senderId.mail}
          />
        ))}
    </MainContainer>
  );
};

export default PendingInvitationList;