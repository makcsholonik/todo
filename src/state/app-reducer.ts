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
export const setAppStatusAC = ( status : StatusType ) => ({ type : 'APP/SET-STATUS', status } as const);
export const setAppErrorAC = ( error : string | null ) => ({ type : 'APP/SET-ERROR', error } as const);

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
	status : StatusType,
	error : string | null
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type ActionType = SetAppStatusActionType | SetAppErrorActionType
