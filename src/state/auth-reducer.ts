import { authAPI, AuthDataType } from 'api/api';
import { handleServerErrorAppError, handleServerNetworkAppError } from 'utils/error-utils';
import { Dispatch } from 'redux';
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from './app-reducer';

// actions
export enum AuthActionTypes {
	SET_IS_LOGGED_IN = 'auth/SET_IS_LOGGED_IN'
}

// initial state
const initialState : InitialStateType = {
	isLoggedIn : false // true - пользователь залогинен (т.е. есть кука)
};

// reducer
export const authReducer = ( state : InitialStateType = initialState, action : AuthActionType ) : InitialStateType => {
	switch ( action.type ) {
		case AuthActionTypes.SET_IS_LOGGED_IN:
			return { ...state, isLoggedIn : action.isLoggedIn };
	}
	return state;
};

// action creators
export const setIsLoggedInAC = ( isLoggedIn : boolean ) => ({ type : AuthActionTypes.SET_IS_LOGGED_IN, isLoggedIn } as const);

// thunk creators
export const loginTC = ( data : AuthDataType ) => ( dispatch : AuthThunkDispatchType ) => {
	dispatch ( setAppStatusAC ( 'loading' ) );
	authAPI.login ( data )
		.then ( ( res ) => {
			if (res.data.resultCode === 0) {
				dispatch ( setIsLoggedInAC ( true ) ); // залогинены удачно!
				dispatch ( setAppStatusAC ( 'succeeded' ) );
			} else {
				handleServerErrorAppError ( res.data, dispatch );
			}
		} )
		.catch ( ( error ) => {
				handleServerNetworkAppError ( error, dispatch );
			}
		);
};
export const logoutTC = () => ( dispatch : AuthThunkDispatchType ) => {
	dispatch ( setAppStatusAC ( 'loading' ) );
	authAPI.logout ()
		.then ( ( res ) => {
			if (res.data.resultCode === 0) {
				dispatch ( setIsLoggedInAC ( false ) ); // залогинены удачно!
				dispatch ( setAppStatusAC ( 'succeeded' ) );
			} else {
				handleServerErrorAppError ( res.data, dispatch );
			}
		} )
		.catch ( ( error ) => {
				handleServerNetworkAppError ( error, dispatch );
			}
		);
};

// types
export type InitialStateType = {
	isLoggedIn : boolean
}
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
type AuthThunkDispatchType = Dispatch<AuthActionType | SetAppStatusActionType | SetAppErrorActionType>
