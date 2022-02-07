import { appReducer, InitialStateType, setErrorAC } from './app-reducer';

let startState : InitialStateType;

beforeEach ( () => {
	startState = {
		status : 'idle',
		error : null
	};
} );


test ( 'correct error message should be set', () => {
	const endState = appReducer ( startState, setErrorAC ( 'some error' ) );

	expect ( endState.error ).toBe ( 'some error' );
} );