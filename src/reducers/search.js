import {ADD_SEARCH} from '../constants/search';

const initalState = {
	text: 'demo'
};

export default function search(state = initalState, action) {
	switch(action.type) {
		
		case ADD_SEARCH:
			return {
				text: action.text
			}

		default:
			return state
	}
}