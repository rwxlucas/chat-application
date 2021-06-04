import { OPEN_CHAT, CLOSE_CHAT, LOAD_MESSAGES } from '../actions/chatAction';

const initialState = {
	open: false,
	name: '',
	image: '',
	messages: []
};

export const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_CHAT:
			return {
				...state,
				open: true,
				name: action.payload.name,
				image: action.payload.image
			};
		case LOAD_MESSAGES:
			return {
				...state,
				messages: [...state.messages, ...action.messages]
			};
		case CLOSE_CHAT:
			return { open: false };

		default: return state;
	};
};