import { TaskFilterType, TodolistsType } from '../App';
import { v1 } from 'uuid';

type ActionType = RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
	type : 'REMOVE-TODOLIST'
	id : string
}
export type AddTodolistActionType = {
	type : 'ADD-TODOLIST'
	title : string
}
export type ChangeTodolistTitleActionType = {
	type : 'CHANGE-TODOLIST-TITLE'
	id : string
	title : string
}
export type ChangeTodolistFilterActionType = {
	type : 'CHANGE-TODOLIST-FILTER'
	id : string
	filter : TaskFilterType
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
		case 'CHANGE-TODOLIST-FILTER': {
			let todolist = state.find ( tl => tl.id === action.id );
			if (todolist) {
				todolist.filter = action.filter;
			}
			return [...state];
		}
		default:
			return state;
	}
};