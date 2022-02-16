import React, { useCallback, useEffect } from 'react';
import './App.css';
import {
	AppBar,
	Box,
	Button,
	CircularProgress,
	Container,
	IconButton,
	LinearProgress,
	Toolbar,
	Typography
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { TodolistsLists } from 'features/TodolistsLists/TodolistsLists';
import { ErrorSnackbar } from 'component/ErrorSnackbar/ErrorSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from 'state/store';
import { initializeAppTC, StatusType } from 'state/app-reducer';
import { Login } from 'features/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { logoutTC } from 'state/auth-reducer';
import { Avatar, Stack } from '@mui/material';


type AppPropsType = {
	demo? : boolean
}

export const App : React.FC<AppPropsType> = React.memo ( ( props ) => {

			const {
				demo = false
			} = props;

			const status = useSelector<AppRootStateType, StatusType> ( state => state.app.status );
			const isInitialized = useSelector<AppRootStateType, boolean> ( state => state.app.isInitialized );
			const isLoggedIn = useSelector<AppRootStateType, boolean> ( state => state.auth.isLoggedIn );

			const dispatch = useDispatch ();

			useEffect ( () => {
				dispatch ( initializeAppTC () );
			}, [] );

			const logoutHandler = useCallback ( () => {
				const thunk = logoutTC ();
				dispatch ( thunk );
			}, [dispatch] );


			if ( !isInitialized) {
				return (
					<Box sx={ { display : 'block', textAlign : 'center' } }>
						<CircularProgress/>
					</Box>
				);
			}

			return (
				<div className="App">
					<Box>
						<AppBar position={ 'static' } color={ 'primary' }>
							<Toolbar>
								<IconButton edge={ 'start' } color={ 'inherit' } aria-label={ 'menu' }>
									<Menu/>
								</IconButton>
								<Stack>
									<Avatar alt="Remy Sharp" src="" />
								</Stack>
								{ isLoggedIn && <Button color={ 'inherit' } onClick={ logoutHandler }>Log out</Button> }
							</Toolbar>
							{ status === 'loading' && <LinearProgress color="secondary"/> }
						</AppBar>
					</Box>
					<ErrorSnackbar/>
					<Container fixed>
						<Routes>
							<Route path={ '/' } element={ <TodolistsLists demo={ demo }/> }/>
							<Route path={ '/login' } element={ <Login/> }/>
						</Routes>
					</Container>
				</div>
			);
		}
	)
;

