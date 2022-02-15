import { Dispatch } from 'redux';
import { authAPI } from 'api/api';
import { AuthActionType, setIsLoggedInAC } from './auth-reducer';

// actions
export enum AppActionTypes {
	SET_STATUS = 'app/SET_STATUS',
	SET_ERROR = 'app/SET_ERROR',
	SET_IS_INITIALIZED = 'app/SET_IS_INITIALIZED'
}

// initial state
const initialState : InitialStateType = {
	status : 'idle',
	error : null,
	isInitialized : false // true - приложение инициализированно (проверили пользователя, получили настройки и т.д.)
};

// reducer
export const appReducer = ( state : InitialStateType = initialState, action : AppActionType ) : InitialStateType => {
	switch ( action.type ) {
		case AppActionTypes.SET_STATUS:
			return { ...state, status : action.status };
		case AppActionTypes.SET_ERROR:
			return { ...state, error : action.error };
		case AppActionTypes.SET_IS_INITIALIZED:
			return { ...state, isInitialized : action.isInitialized };
		default:
			return state;
	}
};

// action creators
export const setAppStatusAC = ( status : StatusType ) => ({ type : AppActionTypes.SET_STATUS, status } as const);
export const setAppErrorAC = ( error : string | null ) => ({ type : AppActionTypes.SET_ERROR, error } as const);
export const setAppIsInitializedAC = ( isInitialized : boolean ) => ({
	type : AppActionTypes.SET_IS_INITIALIZED,
	isInitialized
} as const);

// thunk creators
export const initializeAppTC = () => ( dispatch : AppThunkDispatchType ) => {
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
	isInitialized : boolean
}
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type AppActionType =
	| SetAppStatusActionType
	| SetAppErrorActionType
	| ReturnType<typeof setAppIsInitializedAC>
type AppThunkDispatchType = Dispatch<AppActionType | AuthActionType>;