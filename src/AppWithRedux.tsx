import React, { useCallback } from 'react';
import './App.css';
import { Todolist } from './component/Todolist';
import { AddItemForm } from './component/AddItemForm';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	TaskFilterType,
	TodolistDomainType
} from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { TaskType } from './api/api';

export type TasksStateType = {
	[ key : string ] : Array<TaskType>
}

export const AppWithRedux = React.memo ( () => {

	// получаем ф-ию dispatch которая в стор может задиспатчить экшн.
	const dispatch = useDispatch ();

	// достаём тудулисты и таски
	const todolists = useSelector<AppRootState, Array<TodolistDomainType>> ( state => state.todolists );
	const tasks = useSelector<AppRootState, TasksStateType> ( state => state.tasks );

	// tasks
	const addTask = useCallback ( ( title : string, todolistId : string ) => {
		dispatch ( addTaskAC ( title, todolistId ) );
	}, [dispatch] );
	const removeTask = useCallback ( ( taskId : string, todolistId : string ) => {
		dispatch ( removeTaskAC ( taskId, todolistId ) );
	}, [dispatch] );
	const changeTaskStatus = useCallback ( ( taskId : string, isDone : boolean, todolistId : string ) => {
		dispatch ( changeTaskStatusAC ( taskId, isDone, todolistId ) );
	}, [dispatch] );
	const changeTaskTitle = useCallback ( ( taskId : string, newTitle : string, todolistId : string ) => {
		dispatch ( changeTaskTitleAC ( taskId, newTitle, todolistId ) );
	}, [dispatch] );

	// todolists
	const changeFilter = useCallback ( ( filter : TaskFilterType, todolistId : string ) => {
		dispatch ( changeTodolistFilterAC ( todolistId, filter ) );
	}, [dispatch] );
	const addTodolist = useCallback ( ( title : string ) => {
		dispatch ( addTodolistAC ( title ) );
	}, [dispatch] );
	const removeTodolist = useCallback ( ( todolistId : string ) => {
		dispatch ( removeTodolistAC ( todolistId ) );
	}, [dispatch] );
	const changeTodolistTitle = useCallback ( ( todolistId : string, newTitle : string ) => {
		dispatch ( changeTodolistTitleAC ( todolistId, newTitle ) );
	}, [dispatch] );

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
				<Grid container style={ { padding : '20px' } }>
					<AddItemForm addItem={ addTodolist }/>
				</Grid>
				<Grid container spacing={ 5 }>
					{
						todolists.map ( ( tl ) => {

							let taskForTodolist = tasks[ tl.id ];

							return (
								<Grid item>
									<Paper elevation={ 2 } style={ { padding : '10px' } }>
										<Todolist
											key={ tl.id }
											title={ tl.title }
											tasks={ taskForTodolist }
											removeTask={ removeTask }
											changeFilter={ changeFilter }
											addTask={ addTask }
											changeTaskStatus={ changeTaskStatus }
											changeTaskTitle={ changeTaskTitle }
											filter={ tl.filter }
											todolistId={ tl.id }
											removeTodolist={ removeTodolist }
											changeTodolistTitle={ changeTodolistTitle }
										/>
									</Paper>
								</Grid>
							)
								;
						} )
					}
				</Grid>
			</Container>
		</div>
	);
} );
