export const OPEN_CHAT = 'OPEN_CHAT';
export const CLOSE_CHAT = 'CLOSE_CHAT';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';

export const openChatAction = (name, image) => ({ type: OPEN_CHAT, payload: { name, image } });
export const closeChatAction = () => ({ type: CLOSE_CHAT });
export const loadMessagesAction = (messages) => ({ type: LOAD_MESSAGES, payload: messages });