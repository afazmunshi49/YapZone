const serverStore = require('../serverStore');
const friendsUpdate = require('./updates/friends');

const newConnectionHandler = async (socket, io) => {
    const userDetails = socket.user;

    serverStore.addNewConnectedUser({
        socketId: socket.id,
        userId: userDetails.userId,
    });

    // update pending friends invitations list
    // Note: calling this function will emit the pending list invitation for the user
    friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

    // update friends list
    friendsUpdate.updateFriends(userDetails.userId);
}

module.exports = newConnectionHandler;