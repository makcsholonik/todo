// initial state

import { Dispatch } from 'redux';
import { authAPI } from '../api/api';
import { updateTaskAC } from './tasks-reducer';
import { AuthActionType, setIsLoggedInAC } from './auth-reducer';

const initialState : InitialStateType = {
	status : 'idle',
	error : null,
	initialized : false
};

// reducer
export const appReducer = ( state : InitialStateType = initialState, action : AppActionType ) : InitialStateType => {
	switch ( action.type ) {
		case 'app/SET_STATUS':
			return { ...state, status : action.status };
		case 'app/SET_ERROR':
			return { ...state, error : action.error };
		case 'app/SET_IS_INITIALIZED':
			return { ...state, initialized : action.initialized };
		default:
			return state;
	}
};

// actions
export const setAppStatusAC = ( status : StatusType ) => ({ type : 'app/SET_STATUS', status } as const);
export const setAppErrorAC = ( error : string | null ) => ({ type : 'app/SET_ERROR', error } as const);
export const setAppIsInitializedAC = ( initialized : boolean ) => ({
	type : 'app/SET_IS_INITIALIZED',
	initialized
} as const);

// thunks
export const initializeAppTC = () => ( dispatch : ThunkDispatchType ) => {
	authAPI.me ()
		.then ( ( res ) => {
			if (res.data.resultCode === 0) {
				dispatch ( setIsLoggedInAC ( true ) );
			} else {
			}
			dispatch ( setAppIsInitializedAC ( true ) );
		} );
};

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
	// происходит ли сейчас взаимодействие с сервером
	status : StatusType,
	// если произойдёт глобальная ошибка, мы запишем текст сюда
	error : string | null
	// true - когда приложение проинициализировалось
	initialized : boolean
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type AppActionType =
	| SetAppStatusActionType
	| SetAppErrorActionType
	| ReturnType<typeof setAppIsInitializedAC>
type ThunkDispatchType = Dispatch<AppActionType | AuthActionType>
