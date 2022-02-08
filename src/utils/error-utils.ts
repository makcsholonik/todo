import { ResponseType } from '../api/api';
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../state/app-reducer';
import { Dispatch } from 'redux';

export const handleServerErrorAppError = <D> ( data : ResponseType<D>, dispatch : Dispatch<SetAppStatusActionType | SetAppErrorActionType> ) => {
		if (data.messages.length) {
			dispatch ( setAppErrorAC ( data.messages[ 0 ] ) );
		} else {
			dispatch ( setAppErrorAC ( 'some error occurred' ) );
		}
		dispatch ( setAppStatusAC ( 'failed' ) );
	}
;