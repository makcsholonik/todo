// initial state
import { authAPI, AuthDataType } from '../api/api';
import { handleServerErrorAppError, handleServerNetworkAppError } from '../utils/error-utils';
import { Dispatch } from 'redux';
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from './app-reducer';

const initialState : InitialStateType = {
	isLoggedIn : false
};

// reducer
export const authReducer = ( state : InitialStateType = initialState, action : AuthActionType ) : InitialStateType => {
	switch ( action.type ) {
		case 'auth/SET_IS_LOGGED_IN':
			return { ...state, isLoggedIn : action.isLoggedIn };
	}
	return state;
};

// actions
export const setIsLoggedInAC = ( isLoggedIn : boolean ) => ({ type : 'auth/SET_IS_LOGGED_IN', isLoggedIn } as const);

// thunks
export const authTC = ( data : AuthDataType ) => ( dispatch : ThunkDispatchType ) => {
	dispatch ( setAppStatusAC ( 'loading' ) );
	authAPI.login ( data )
		.then ( ( res ) => {
			if (res.data.resultCode === 0) {
				dispatch ( setIsLoggedInAC ( true ) );
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
type ThunkDispatchType = Dispatch<AuthActionType | SetAppStatusActionType | SetAppErrorActionType>
