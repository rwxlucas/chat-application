import { OPEN_CHAT, CLOSE_CHAT, LOAD_MESSAGES } from '../actions/chatAction';

const initialState = {
	open: false,
	name: '',
	image: '',
	id: '',
	messages: []
};

export const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_CHAT:
			return {
				...state,
				open: true,
				name: action.payload.name,
				image: action.payload.image,
				id: action.payload.id
			};
		case LOAD_MESSAGES:
			return {
				...state,
				messages: [...state.messages, action.payload]
			};
		case CLOSE_CHAT:
			return { open: false };

		default: return state;
	};
};