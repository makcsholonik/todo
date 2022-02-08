import { todolistsAPI, TodolistType } from '../api/api';
import { Dispatch } from 'redux';
import { setStatusAC, SetStatusActionType } from './app-reducer';

// initial state
const initialState : Array<TodolistDomainType> = [];

// reducer
export const todolistsReducer = ( state : TodolistDomainType[] = initialState, action : ActionType ) : TodolistDomainType[] => {
	switch ( action.type ) {
		case 'REMOVE_TODOLIST':
			return state.filter ( tl => tl.id !== action.todolistId );
		case 'ADD_TODOLIST':
			return [{ ...action.todolist, filter : 'all' }, ...state];
		case 'CHANGE_TODOLIST_TITLE':
			return state.map ( tl => tl.id === action.id ? { ...tl, title : action.title } : tl );
		case 'CHANGE_TODOLIST_FILTER':
			return state.map ( tl => tl.id === action.id ? { ...tl, filter : action.filter } : tl );
		case 'SET_TODOLISTS':
			return action.todolists.map ( tl => ({ ...tl, filter : 'all' }) );
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
export const fetchTodolistsTC = () => ( dispatch : Dispatch<ActionType | SetStatusActionType> ) => {
	dispatch ( setStatusAC ( 'loading' ) );
	todolistsAPI.getTodolists ()
		.then ( ( res ) => {
				dispatch ( setTodolistsAC ( res.data ) );
				dispatch ( setStatusAC ( 'succeeded' ) );
			}
		);
};
export const removeTodolistTC = ( todolistId : string ) =>
	( dispatch : Dispatch<ActionType> ) => {
		todolistsAPI.deleteTodolist ( todolistId )
			.then ( ( res ) => {
					dispatch ( removeTodolistAC ( todolistId ) );
				}
			);
	};
export const addTodolistTC = ( title : string ) => ( dispatch : Dispatch<ActionType | SetStatusActionType> ) => {
	dispatch ( setStatusAC ( 'loading' ) );
	todolistsAPI.createTodolist ( title )
		.then ( ( res ) => {
				dispatch ( addTodolistAC ( res.data.data.item ) );
				dispatch ( setStatusAC ( 'succeeded' ) );
			}
		);
};
export const changeTodolistTitleTC = ( todolistId : string, title : string ) => ( dispatch : Dispatch<ActionType> ) => {
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
