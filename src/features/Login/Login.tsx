import React from 'react';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	TextField,
	Button,
	Grid
} from '@material-ui/core';
import { useFormik, FormikErrors } from 'formik';

type FormValuesType = {
	email : string
	password : string
	rememberMe : boolean
}

export const Login = () => {

		const validate = ( values : FormValuesType ) => {
			const errors : FormikErrors<FormValuesType> = {};
			if ( !values.email) {
				errors.email = 'Required';
			} else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test ( values.email )) {
				errors.email = 'Invalid email address';
			}
			if ( !values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 5) {
				errors.password = 'Must be 5 characters or less';
			}
			return errors;
		};

		const formik = useFormik ( {
			initialValues : {
				email : '',
				password : '',
				rememberMe : false
			},
			validate,
			onSubmit : values => {
				alert ( JSON.stringify ( values, null, 2 ) );
			},
		} );


		return <Grid container justify="center">
			<Grid item xs={ 4 }>
				<form onSubmit={ formik.handleSubmit }>
					<FormControl>
						<FormLabel>
							<p>To log in get registered
								<a href={ 'https://social-network.samuraijs.com/' }
									target={ '_blank' }>here
								</a>
							</p>
							<p>or use common test account credentials:</p>
							<p>Email: free@samuraijs.com</p>
							<p>Password: free</p>
						</FormLabel>
						<FormGroup>
							<TextField
								label={ 'Email' }
								margin={ 'normal' }
								{ ...formik.getFieldProps ( 'email' ) }
							/>
							{ formik.errors.email ? <div>{ formik.errors.email }</div> : null }
							<TextField
								type={ 'password' }
								label={ 'Password' }
								margin={ 'normal' }
								{ ...formik.getFieldProps ( 'password' ) }
							/>
							{ formik.errors.password ? <div>{ formik.errors.password }</div> : null }
							<FormControlLabel
								label={ 'Remember me' }
								control={ <Checkbox
									{ ...formik.getFieldProps ( 'rememberMe' ) }
								/> }
							/>
							<Button type={ 'submit' } variant={ 'contained' } color={ 'primary' }>Login</Button>
						</FormGroup>
					</FormControl>
				</form>
			</Grid>
		</Grid>;
	}
;
