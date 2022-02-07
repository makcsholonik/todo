// initial state
const initialState : InitialStateType = {
	status : 'idle',
	error : null
};

// reducer
export const appReducer = ( state : InitialStateType = initialState, action : ActionsType ) : InitialStateType => {
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
export const setErrorAC = ( error : string | null ) => ({ type : 'APP/SET-ERROR', error });

// types
export type InitialStateType = {
	status : 'idle' | 'loading' | 'succeeded' | 'failed',
	error : string | null
}
type ActionsType = any
