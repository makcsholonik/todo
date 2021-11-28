import { TodolistsType } from '../App';

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
		default:
			return state;
	}
};
