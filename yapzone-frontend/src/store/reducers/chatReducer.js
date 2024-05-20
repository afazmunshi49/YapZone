import { chatActions } from "../actions/chatActions"

const initState = {
    chosenChatDetails: null,
    chatType: null,
    messages: [],
}

const chatReducer = (state=initState, actions) => {
    switch (actions.type) {
        case chatActions.SET_CHOSEN_CHAT_DETAILS:
            return {
                ...state,
                chosenChatDetails: actions.chatDetails,
                chatType: actions.chatType,
                messages: [],
            };
        case chatActions.SET_MESSAGES:
            return {
                ...state, 
                messages: actions.messages,
            };
        default:
            return state;
    }
};

export default chatReducer;