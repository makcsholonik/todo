import { v1 } from 'uuid';
import { todolistsAPI, TodolistType } from '../api/api';
import { Dispatch } from 'redux';

// typing

type ActionType = RemoveTodolistActionType
	| AddTodolistActionType
	| ChangeTodolistTitleActionType
	| ChangeTodolistFilterActionType
	| SetTodolistsActionType

export type RemoveTodolistActionType = {
	type : 'REMOVE_TODOLIST'
	todolistId : string
}
export type AddTodolistActionType = {
	type : 'ADD_TODOLIST'
	todolist : TodolistType
}
export type ChangeTodolistTitleActionType = {
	type : 'CHANGE_TODOLIST_TITLE'
	id : string
	title : string
}
export type ChangeTodolistFilterActionType = {
	type : 'CHANGE_TODOLIST_FILTER'
	id : string
	filter : TaskFilterType
}
export type SetTodolistsActionType = {
	type : 'SET_TODOLISTS'
	todolists : TodolistType[]
}

// initial state

export const todolistId1 : string = v1 ();
export const todolistId2 : string = v1 ();

const initialState : Array<TodolistDomainType> = [];

export type TaskFilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter : TaskFilterType
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописаному type в этом action (инструкции) я поменяю state

// reducer

export const todolistsReducer = ( state : TodolistDomainType[] = initialState, action : ActionType ) : TodolistDomainType[] => {
	switch (action.type) {
		case 'REMOVE_TODOLIST': {
			return state.filter ( tl => tl.id !== action.todolistId );
		}
		// case 'ADD_TODOLIST': {
		// 	return [...state, {
		// 		id : action.todolistId,
		// 		title : action.title,
		// 		addedDate : '',
		// 		order : 0,
		// 		filter : 'all'
		// 	}];
		// }
		case 'ADD_TODOLIST': {
			const newTodolist : TodolistDomainType = {
				...action.todolist,
				filter : 'all'
			};
			return [...state, newTodolist];
		}
		case 'CHANGE_TODOLIST_TITLE': {
			let todolist = state.find ( tl => tl.id === action.id );
			if (todolist) {
				todolist.title = action.title;
			}
			return [...state];
		}
		case 'CHANGE_TODOLIST_FILTER': {
			let todolist = state.find ( tl => tl.id === action.id );
			if (todolist) {
				todolist.filter = action.filter;
			}
			return [...state];
		}
		case 'SET_TODOLISTS': {
			return action.todolists.map ( tl => {
				return {
					...tl,
					filter : 'all'
				};
			} );
		}
		default:
			return state;
	}
};

// action creator

export const removeTodolistAC = ( todolistId : string ) : RemoveTodolistActionType => {
	return { type : 'REMOVE_TODOLIST', todolistId };
};
export const addTodolistAC = ( todolist : TodolistType ) : AddTodolistActionType => {
	return { type : 'ADD_TODOLIST', todolist };
};
export const changeTodolistTitleAC = ( todolistId : string, newTodolistTitle : string ) : ChangeTodolistTitleActionType => {
	return { type : 'CHANGE_TODOLIST_TITLE', id : todolistId, title : newTodolistTitle };
};
export const changeTodolistFilterAC = ( todolistId : string, newFilter : TaskFilterType ) : ChangeTodolistFilterActionType => {
	return { type : 'CHANGE_TODOLIST_FILTER', id : todolistId, filter : newFilter };
};
export const setTodolistsAC = ( todolists : TodolistType[] ) : SetTodolistsActionType => {
	return { type : 'SET_TODOLISTS', todolists };
};

// thunk creator

// export const fetchTodolistsThunk = ( dispatch : Dispatch ) => {
// 	todolistsAPI.getTodolists ().then ( ( res ) => {
// 		dispatch ( setTodolistsAC ( res.data ) );
// 	} );
// };

export const fetchTodolistsTC = () => {
	return (
		( dispatch : Dispatch ) => {
			todolistsAPI.getTodolists ()
				.then ( ( res ) => {
					dispatch ( setTodolistsAC ( res.data ) );
				} );
		}
	);
};

export const removeTodolistTC = ( todolistId : string ) => {
	return (
		( dispatch : Dispatch ) => {
			todolistsAPI.deleteTodolist ( todolistId )
				.then ( ( res ) => {
					dispatch ( removeTodolistAC ( todolistId ) );
				} );
		}
	);
};

export const addTodolistTC = ( title : string ) => {
	return (
		( dispatch : Dispatch ) => {
			todolistsAPI.createTodolist ( title )
				.then ( ( res ) => {
					dispatch ( addTodolistAC ( res.data.data.item ) );
				} );
		}
	);
};