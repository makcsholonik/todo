import React, { useEffect } from 'react';
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
import { TodolistsLists } from '../features/TodolistsLists/TodolistsLists';
import { ErrorSnackbar } from '../component/ErrorSnackbar/ErrorSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { initializeAppTC, StatusType } from '../state/app-reducer';
import { Login } from '../features/Login/Login';
import { Routes, Route } from 'react-router-dom';


type AppPropsType = {
	demo? : boolean
}

export const App = React.memo ( ( { demo = false } : AppPropsType ) => {

			const status = useSelector<AppRootStateType, StatusType> ( state => state.app.status );
			const isInitialized = useSelector<AppRootStateType, boolean> ( state => state.app.isInitialized );
			const dispatch = useDispatch ();

			useEffect ( () => {
				dispatch ( initializeAppTC () );
			}, [] );

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
								<Typography variant={ 'h6' }>
									News
								</Typography>
								<Button color={ 'inherit' }>Login</Button>
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

