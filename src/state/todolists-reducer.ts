import { TodolistsType } from '../App';
import { v1 } from 'uuid';

type ActionType = {
	type : string
	[ key : string ] : any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state
export const todolistsReducer = ( state : TodolistsType[], action : ActionType ) : TodolistsType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST': {
			return state.filter ( tl => tl.id !== action.id );
		}
		case 'ADD-TODOLIST': {
			return [...state, {
				id : v1 (),
				title : action.title,
				filter : 'all'
			}];
		}
		case 'CHANGE-TODOLIST-TITLE': {
			let todolist = state.find ( tl => tl.id === action.id );
			if (todolist) {
				todolist.title = action.title;
			}
			return [...state];
		}
		default:
			return state;
	}
};
