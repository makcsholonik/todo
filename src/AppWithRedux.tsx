import React, { useCallback } from 'react';
import './App.css';
import { Todolist } from './component/Todolist';
import { AddItemForm } from './component/AddItemForm';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC
} from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type TasksType = {
	id : string
	title : string
	isDone : boolean
}
export type TaskFilterType = 'all' | 'active' | 'completed';
export type TodolistsType = {
	id : string
	title : string
	filter : TaskFilterType
}
export type TasksStateType = {
	[ key : string ] : Array<TasksType>
}

export const AppWithRedux = React.memo ( () => {

	// получаем ф-ию dispatch которая в стор может задиспатчить экшн.
	const dispatch = useDispatch ();

	// достаём тудулисты и таски
	const todolists = useSelector<AppRootState, Array<TodolistsType>> ( state => state.todolists );
	const tasks = useSelector<AppRootState, TasksStateType> ( state => state.tasks );

	// tasks
	const addTask = useCallback ( ( title : string, todolistId : string ) => {
		dispatch ( addTaskAC ( title, todolistId ) );
	}, [] );
	const removeTask = useCallback ( ( taskId : string, todolistId : string ) => {
		dispatch ( removeTaskAC ( taskId, todolistId ) );
	}, [] );
	const changeTaskStatus = useCallback ( ( taskId : string, isDone : boolean, todolistId : string ) => {
		dispatch ( changeTaskStatusAC ( taskId, isDone, todolistId ) );
	}, [] );
	const changeTaskTitle = useCallback ( ( taskId : string, newTitle : string, todolistId : string ) => {
		dispatch ( changeTaskTitleAC ( taskId, newTitle, todolistId ) );
	}, [] );

	// todolists
	const changeFilter = useCallback ( ( filter : TaskFilterType, todolistId : string ) => {
		dispatch ( changeTodolistFilterAC ( todolistId, filter ) );
	}, [] );
	const addTodolist = useCallback ( ( title : string ) => {
		dispatch ( addTodolistAC ( title ) );
	}, [] );
	const removeTodolist = useCallback ( ( todolistId : string ) => {
		dispatch ( removeTodolistAC ( todolistId ) );
	}, [] );
	const changeTodolistTitle = useCallback ( ( todolistId : string, newTitle : string ) => {
		dispatch ( changeTodolistTitleAC ( todolistId, newTitle ) );
	}, [] );

	return (
		<div className="App">
			<AddItemForm addItem={ addTodolist }/>
			{
				todolists.map ( ( tl ) => {

					let taskForTodolist = tasks[ tl.id ];
					if (tl.filter === 'active') {
						taskForTodolist = taskForTodolist.filter ( t => !t.isDone );
					}
					if (tl.filter === 'completed') {
						taskForTodolist = taskForTodolist.filter ( t => t.isDone );
					}

					return (
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
					);
				} )
			}
		</div>
	);
} );
