import { v1 } from 'uuid';
import { todolistsAPI, TodolistType } from '../api/api';
import { Dispatch } from 'redux';

// initial state
const initialState : Array<TodolistDomainType> = [];

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

// actions
export const removeTodolistAC = ( todolistId : string ) =>
	({ type : 'REMOVE_TODOLIST', todolistId } as const);
export const addTodolistAC = ( todolist : TodolistType ) =>
	({ type : 'ADD_TODOLIST', todolist } as const);
export const changeTodolistTitleAC = ( todolistId : string, newTodolistTitle : string ) =>
	({ type : 'CHANGE_TODOLIST_TITLE', id : todolistId, title : newTodolistTitle } as const);
export const changeTodolistFilterAC = ( todolistId : string, newFilter : TaskFilterType ) =>
	({ type : 'CHANGE_TODOLIST_FILTER', id : todolistId, filter : newFilter } as const);
export const setTodolistsAC = ( todolists : TodolistType[] ) =>
	({ type : 'SET_TODOLISTS', todolists } as const);

// thunks
export const fetchTodolistsTC = () => ( dispatch : Dispatch ) => {
	todolistsAPI.getTodolists ()
		.then ( ( res ) => {
				dispatch ( setTodolistsAC ( res.data ) );
			}
		);
};
export const removeTodolistTC = ( todolistId : string ) =>
	( dispatch : Dispatch ) => {
		todolistsAPI.deleteTodolist ( todolistId )
			.then ( ( res ) => {
					dispatch ( removeTodolistAC ( todolistId ) );
				}
			);
	};
export const addTodolistTC = ( title : string ) => ( dispatch : Dispatch ) => {
	todolistsAPI.createTodolist ( title )
		.then ( ( res ) => {
				dispatch ( addTodolistAC ( res.data.data.item ) );
			}
		);
};
export const changeTodolistTitleTC = ( todolistId : string, title : string ) => ( dispatch : Dispatch ) => {
	todolistsAPI.updateTodolistTitle ( todolistId, title )
		.then ( ( res ) => {
				dispatch ( changeTodolistTitleAC ( todolistId, title ) );
			}
		);
};

// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ActionType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>
	| SetTodolistsActionType
export type TaskFilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter : TaskFilterType
}
