// initial state
const initialState : InitialStateType = {
	status : 'idle',
	error : null
};

// reducer
export const appReducer = ( state : InitialStateType = initialState, action : ActionType ) : InitialStateType => {
	switch ( action.type ) {
		case 'APP/SET-STATUS':
			return { ...state, status : action.status };
		case 'APP/SET-ERROR':
			return { ...state, error : action.error };
		default:
			return state;
	}
};

// actions
export const setStatusAC = ( status : StatusType ) => ({ type : 'APP/SET-STATUS', status } as const);
export const setErrorAC = ( error : string | null ) => ({ type : 'APP/SET-ERROR', error } as const);

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
	status : StatusType,
	error : string | null
}
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type ActionType = ReturnType<typeof setStatusAC> | SetErrorActionType
