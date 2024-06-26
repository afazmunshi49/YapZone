const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async (userId) => {
    try {
        // find all active connections of a specific userId
        // Note: This will return a list of sockets for this specific user
        const receiverList = serverStore.getActiveConnections(userId);
        
        if (receiverList.length > 0) {
            const pendingInvitations = await FriendInvitation.find({
                receiverId: userId
            }).populate('senderId', '_id username mail');
    
            const io = serverStore.getSocketServerInstance();
    
            // Emit the evet to receiver socket ids
            receiverList.forEach(receiverSocketId => {
                io.to(receiverSocketId).emit('friends-invitations', {
                    pendingInvitations: pendingInvitations ? pendingInvitations : [],
                });
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const updateFriends = async (userId) => {
    try {

        // find active connections of specific ids (online users)
        const receiverList = serverStore.getActiveConnections(userId);

        if (receiverList.length > 0) {
            const user = await User.findById(userId, {_id: 1, friends: 1}).populate(
                'friends',
                '_id username mail'
            );
    
            if (user) {
                const friendsList = user.friends.map(f => {
                    return {
                        id: f._id,
                        mail: f.mail,
                        username: f.username
                    };
                });
    
                // get io server instance
                const io = serverStore.getSocketServerInstance();
    
                receiverList.forEach(receiverSocketId => {
                    io.to(receiverSocketId).emit('friends-list', {
                        friends: friendsList ? friendsList : []
                    });
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    updateFriendsPendingInvitations,
    updateFriends
}