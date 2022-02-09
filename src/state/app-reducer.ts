// initial state
const initialState : InitialStateType = {
	status : 'idle',
	error : null
};

// reducer
export const appReducer = ( state : InitialStateType = initialState, action : ActionType ) : InitialStateType => {
	switch ( action.type ) {
		case 'app/SET_STATUS':
			return { ...state, status : action.status };
		case 'app/SET_ERROR':
			return { ...state, error : action.error };
		default:
			return state;
	}
};

// actions
export const setAppStatusAC = ( status : StatusType ) => ({ type : 'app/SET_STATUS', status } as const);
export const setAppErrorAC = ( error : string | null ) => ({ type : 'app/SET_ERROR', error } as const);

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
	status : StatusType,
	error : string | null
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type ActionType = SetAppStatusActionType | SetAppErrorActionType
