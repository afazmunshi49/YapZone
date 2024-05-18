const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdate = require('../../socketHandlers/updates/friends');

const postInvite = async (req, res) => {
    const { targetMailAddress } = req.body;

    const { userId, mail } = req.user;

    // check if friend that we would like to invite is not user
    if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
        return res.status(409).send('Sorry. You cannot become friends with yourself :)');
    }

    const targetUser = await User.findOne({
        mail: targetMailAddress.toLowerCase()
    });

    if (!targetUser) {
        return res.status(404).send(`Friend of ${targetMailAddress} has not been found :( Please check mail address.`)
    }

    // check if invitation has already been sent
    const invitationAlreadyReceived = await FriendInvitation.findOne({
        senderId: userId,
        receiverId: targetUser._id,
    });

    if (invitationAlreadyReceived) {
        return res.status(409).send('Invitation has been already sent');
    }

    // check if the user which we would like to invite is already our friend
    const userAlreadyFriends = targetUser.friends.find(friendId => 
        friendId.toString() === userId.toString()    
    );

    if (userAlreadyFriends) {
        return res.status(409).send('Friend already added. Please check friends list.');
    }

    // create a new invitation in the database
    const newInvitation = await FriendInvitation.create({
        senderId: userId,
        receiverId: targetUser._id,
    });

    // if invitation has been sucessfully created we would like to update friends invitation if other user is already online
    
    // send pending invitation updates to specific user
    friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString());

    return res.status(201).send('Invitation has been sent!');
}

module.exports = postInvite;