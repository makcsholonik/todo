import React from 'react';
import './App.css';
import { AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { TodolistsLists } from '../features/TodolistsLists/TodolistsLists';
import { ErrorSnackbar } from '../component/ErrorSnackbar/ErrorSnackbar';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../state/store';
import { StatusType } from '../state/app-reducer';

type AppPropsType = {
	demo? : boolean
}

export const App = React.memo ( ({demo = false}: AppPropsType) => {

	const status = useSelector<AppRootStateType, StatusType> ( state => state.app.status );

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
				<TodolistsLists demo={demo}/>
			</Container>
		</div>
	);
} );

