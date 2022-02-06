import React from 'react';
import './App.css';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { TodolistsLists } from '../features/TodolistsLists/TodolistsLists';


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
				</AppBar>
			</Box>

			<Container fixed>
				<TodolistsLists/>
			</Container>
		</div>
	);
} );

