import React, { useReducer } from 'react';
import './App.css';
import { Todolist } from './component/Todolist';
import { v1 } from 'uuid';
import AddItemForm from './component/AddItemForm';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	todolistsReducer
} from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './state/tasks-reducer';

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

export function AppWithRedux () {

	const todolistId1 : string = v1 ();
	const todolistId2 : string = v1 ();

	const [todolists, dispatchToTodolistsReducer] = useReducer ( todolistsReducer, [
		{ id : todolistId1, title : 'what to learn', filter : 'all' },
		{ id : todolistId2, title : 'what to buy', filter : 'all' }
	] );

	const [tasks, dispatchToTasksReducer] = useReducer ( tasksReducer, {
		[ todolistId1 ] : [
			{ id : v1 (), title : 'html', isDone : true },
			{ id : v1 (), title : 'css', isDone : true },
			{ id : v1 (), title : 'js', isDone : false },
			{ id : v1 (), title : 'react', isDone : false },
		],
		[ todolistId2 ] : [
			{ id : v1 (), title : 'book', isDone : true },
			{ id : v1 (), title : 'tea', isDone : true },
			{ id : v1 (), title : 'milk', isDone : false },
		]
	} );

	const addTask = ( title : string, todolistId : string ) => {
		dispatchToTasksReducer ( addTaskAC ( title, todolistId ) );
	};

	const removeTask = ( taskId : string, todolistId : string ) => {
		dispatchToTasksReducer ( removeTaskAC ( taskId, todolistId ) );
	};

	const changeTaskStatus = ( taskId : string, isDone : boolean, todolistId : string ) => {
		dispatchToTasksReducer ( changeTaskStatusAC ( taskId, isDone, todolistId ) );
	};

	const changeTaskTitle = ( taskId : string, newTitle : string, todolistId : string ) => {
		dispatchToTasksReducer ( changeTaskTitleAC ( taskId, newTitle, todolistId ) );
	};

	const changeFilter = ( filter : TaskFilterType, todolistId : string ) => {
		dispatchToTodolistsReducer ( changeTodolistFilterAC ( todolistId, filter ) );
	};

	const addTodolist = ( title : string ) => {
		dispatchToTodolistsReducer ( addTodolistAC ( title ) );
		dispatchToTasksReducer ( addTodolistAC ( title ) );
	};

	const removeTodolist = ( todolistId : string ) => {
		dispatchToTodolistsReducer ( removeTodolistAC ( todolistId ) );
		dispatchToTasksReducer ( removeTodolistAC ( todolistId ) );
	};

	const changeTodolistTitle = ( todolistId : string, newTitle : string ) => {
		dispatchToTodolistsReducer ( changeTodolistTitleAC ( todolistId, newTitle ) );
	};

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
}
