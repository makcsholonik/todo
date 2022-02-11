import React, { useEffect } from 'react';
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	TextField
} from '@material-ui/core';
import { FormikErrors, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from 'state/auth-reducer';
import { AuthDataType } from 'api/api';
import { useNavigate } from 'react-router-dom';
import { AppRootStateType } from 'state/store';

export const Login : React.FC = () => {

		const dispatch = useDispatch ();
		const navigate = useNavigate ();

		// если мы залогинены переходим на главную страницу
		const isLoggedIn = useSelector<AppRootStateType, boolean> ( state => state.auth.isLoggedIn );
		useEffect ( () => {
			if (isLoggedIn) {
				return navigate ( '/' );
			}
		}, [isLoggedIn] );

		const validate = ( values : AuthDataType ) => {
			const errors : FormikErrors<AuthDataType> = {};
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
				rememberMe : false,
				captcha : ''
			},
			validate,
			onSubmit : values => {
				dispatch ( loginTC ( values ) );
			},
		} );


		return <Grid container justify="center">
			<Grid item xs={ 4 }>
				<form onSubmit={ formik.handleSubmit }>
					<FormControl>
						<FormLabel>
							<p>To log in get registered <a
								href={ 'https://social-network.samuraijs.com/' }
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
