import React from 'react';
import { styled } from '@mui/system';
import FriendsListItems from './FriendsListItems';
import { useSelector } from 'react-redux';

const MainContainer = styled('div')({
    flexGrow: 1,
    width: '100%',
});

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  return friends.map((f) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
    return {
      ...f,
      isOnline: isUserOnline ? true : false
    };
  });
};

const FriendsList = () => {
  const { friends, onlineUsers } = useSelector(state => state.friends);
  const friendsWithOnlineOfflineStatus = checkOnlineUsers(friends, onlineUsers);

  return (
    <MainContainer>
      {friendsWithOnlineOfflineStatus.map(f => (
        <FriendsListItems 
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

export default FriendsList;