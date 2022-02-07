import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/store';
import {
	addTodolistTC,
	changeTodolistFilterAC,
	changeTodolistTitleTC,
	fetchTodolistsTC,
	removeTodolistTC,
	TaskFilterType,
	TodolistDomainType
} from '../../state/todolists-reducer';
import { addTaskTC, removeTaskTC, updateTaskTC } from '../../state/tasks-reducer';
import { TasksStateType, TaskStatuses } from '../../api/api';
import { Grid, Paper } from '@material-ui/core';
import { AddItemForm } from '../../component/AddItemForm/AddItemForm';
import { Todolist } from './Todolist/Todolist';

export const TodolistsLists : React.FC = () => {
	const dispatch = useDispatch ();

	// достаём тудулисты и таски
	const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>> ( state => state.todolists );
	const tasks = useSelector<AppRootStateType, TasksStateType> ( state => state.tasks );

	// отрисовка тудулистов с сервера
	useEffect ( () => {
		dispatch ( fetchTodolistsTC () );
	}, [] );


	// tasks
	// добавление таски в тудулист
	const addTask = useCallback ( ( title : string, todolistId : string ) => {
		dispatch ( addTaskTC ( todolistId, title ) );
	}, [dispatch] );

	// удаление таски из тудулиста
	const removeTask = useCallback ( ( taskId : string, todolistId : string ) => {
		dispatch ( removeTaskTC ( todolistId, taskId ) );
	}, [dispatch] );

	const changeTaskStatus = useCallback ( ( taskId : string, status : TaskStatuses, todolistId : string ) => {
		const thunk = updateTaskTC ( taskId, { status }, todolistId );
		dispatch ( thunk );
	}, [dispatch] );

	const changeTaskTitle = useCallback ( ( taskId : string, newTitle : string, todolistId : string ) => {
		const thunk = updateTaskTC ( taskId, { title : newTitle }, todolistId );
		dispatch ( thunk );
	}, [dispatch] );

	// todolists
	const changeFilter = useCallback ( ( filter : TaskFilterType, todolistId : string ) => {
		dispatch ( changeTodolistFilterAC ( todolistId, filter ) );
	}, [dispatch] );

	// добавление тудулиста
	const addTodolist = useCallback ( ( title : string ) => {
		const thunk = addTodolistTC ( title );
		dispatch ( thunk );
	}, [dispatch] );

	// удаление тудулиста
	const removeTodolist = useCallback ( ( todolistId : string ) => {
		const thunk = removeTodolistTC ( todolistId );
		dispatch ( thunk );
	}, [dispatch] );

	// изменение заголовка тудулиста
	const changeTodolistTitle = useCallback ( ( todolistId : string, newTitle : string ) => {
		const thunk = changeTodolistTitleTC ( todolistId, newTitle );
		dispatch ( thunk );
	}, [dispatch] );

	return (
		<>
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
						);
					} )
				}
			</Grid>
		</>
	);
};