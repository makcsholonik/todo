import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps> ( function Alert (
	props,
	ref,
) {
	return <MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />;
} );

export const ErrorSnackbar = () => {
	// const [open, setOpen] = React.useState ( true );

	const handleClose = ( event? : React.SyntheticEvent | Event, reason? : string ) => {
		if (reason === 'clickaway') {
			return;
		}
		// setOpen ( false );
	};

	const error = useSelector<AppRootStateType, string | null> ( state => state.app.error );
	const open = error !== null;

	return (
		<Snackbar open={ open } autoHideDuration={ 6000 } onClose={ handleClose }>
			<Alert onClose={ handleClose } severity="error" sx={ { width : '100%' } }>
				This is an error message!
			</Alert>
		</Snackbar>
	);
};