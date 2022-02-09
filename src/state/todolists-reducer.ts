import { todolistsAPI, TodolistType } from '../api/api';
import { Dispatch } from 'redux';
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, StatusType } from './app-reducer';
import { handleServerNetworkAppError } from '../utils/error-utils';

// initial state
const initialState : Array<TodolistDomainType> = [];

// reducer
export const todolistsReducer = ( state : TodolistDomainType[] = initialState, action : TodolistActionType ) : TodolistDomainType[] => {
	switch ( action.type ) {
		case 'REMOVE_TODOLIST':
			return state.filter ( tl => tl.id !== action.todolistId );
		case 'ADD_TODOLIST':
			return [{ ...action.todolist, filter : 'all', entityStatus : 'idle' }, ...state];
		case 'CHANGE_TODOLIST_TITLE':
			return state.map ( tl => tl.id === action.id ? { ...tl, title : action.title } : tl );
		case 'CHANGE_TODOLIST_FILTER':
			return state.map ( tl => tl.id === action.id ? { ...tl, filter : action.filter } : tl );
		case 'CHANGE_TODOLIST_ENTITY_STATUS':
			return state.map ( tl => tl.id === action.id ? { ...tl, entityStatus : action.entityStatus } : tl );
		case 'SET_TODOLISTS':
			return action.todolists.map ( tl => ({ ...tl, filter : 'all', entityStatus : 'idle' }) );
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
export const changeTodolistEntityStatusAC = ( todolistId : string, entityStatus : StatusType ) =>
	({ type : 'CHANGE_TODOLIST_ENTITY_STATUS', id : todolistId, entityStatus } as const);
export const setTodolistsAC = ( todolists : TodolistType[] ) =>
	({ type : 'SET_TODOLISTS', todolists } as const);

// thunks
export const fetchTodolistsTC = () =>
	( dispatch : ThunkDispatchType ) => {
		dispatch ( setAppStatusAC ( 'loading' ) );
		todolistsAPI.getTodolists ()
			.then ( ( res ) => {
					dispatch ( setTodolistsAC ( res.data ) );
					dispatch ( setAppStatusAC ( 'succeeded' ) );
				}
			)
			.catch ( ( error ) => {
					handleServerNetworkAppError ( error, dispatch );
				}
			);
	};
export const removeTodolistTC = ( todolistId : string ) =>
	( dispatch : ThunkDispatchType ) => {
		dispatch ( setAppStatusAC ( 'loading' ) );
		dispatch ( changeTodolistEntityStatusAC ( todolistId, 'loading' ) );
		todolistsAPI.deleteTodolist ( todolistId )
			.then ( ( res ) => {
					dispatch ( removeTodolistAC ( todolistId ) );
					dispatch ( setAppStatusAC ( 'succeeded' ) );
				}
			);
	};
export const addTodolistTC = ( title : string ) =>
	( dispatch : ThunkDispatchType ) => {
		dispatch ( setAppStatusAC ( 'loading' ) );
		todolistsAPI.createTodolist ( title )
			.then ( ( res ) => {
				dispatch ( addTodolistAC ( res.data.data.item ) );
				dispatch ( setAppStatusAC ( 'succeeded' ) );
			} )
			.catch ( ( error ) => {
					dispatch ( setAppErrorAC ( error.message) );
					dispatch ( setAppStatusAC ( 'failed' ) );
				}
			);
	};
export const changeTodolistTitleTC = ( todolistId : string, title : string ) =>
	( dispatch : ThunkDispatchType ) => {
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
type TodolistActionType =
	| RemoveTodolistActionType
	| AddTodolistActionType
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>
	| SetTodolistsActionType
	| ReturnType<typeof changeTodolistEntityStatusAC>
export type TaskFilterType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter : TaskFilterType
	entityStatus : StatusType
}
type ThunkDispatchType = Dispatch<TodolistActionType | SetAppStatusActionType | SetAppErrorActionType>
