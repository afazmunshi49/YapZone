const FriendInvitation = require("../../models/friendInvitation");
const friendsUpdate = require('../../socketHandlers/updates/friends');

const postReject = async (req, res) => {
    try {
        const {id} = req.body;
        const {userId} = req.user;

        // remove that invitation from the friend invitations collections
        const invitationExists = await FriendInvitation.exists({_id: id});

        if (invitationExists) {
            await FriendInvitation.findByIdAndDelete(id);
        }

        // update pending invitation
        friendsUpdate.updateFriendsPendingInvitations(userId);

        return res.status(200).send('Invitation sucessfully rejected.');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Something went wrong please try again.');
    }
};

module.exports = postReject;