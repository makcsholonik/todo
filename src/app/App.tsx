import React from 'react';
import './App.css';
import { AppBar, Box, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { TodolistsLists } from '../features/TodolistsLists/TodolistsLists';
import { ErrorSnackbar } from '../component/ErrorSnackbar/ErrorSnackbar';


export const App = React.memo ( () => {

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
					<LinearProgress color="secondary" />
				</AppBar>
			</Box>
			<ErrorSnackbar/>
			<Container fixed>
				<TodolistsLists/>
			</Container>
		</div>
	);
} );

