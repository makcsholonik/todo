import React, { useState } from 'react';
import './App.css';
import { Todolist } from './component/Todolist';
import { v1 } from 'uuid';
import AddItemForm from './component/AddItemForm';

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

export function App () {

	const todolistId1 : string = v1 ();
	const todolistId2 : string = v1 ();

	const [todolists, setTodolists] = useState<Array<TodolistsType>> ( [
		{ id : todolistId1, title : 'what to learn', filter : 'all' },
		{ id : todolistId2, title : 'what to buy', filter : 'all' }
	] );

	// храним таски в ассоциативном массиве
	// 1. генерируем id-шники (const todolistId1 = v1(); const todolistId2 = v1())
	// 2. создаём ассоциативный массив
	const [tasks, setTasks] = useState<TasksStateType> ( {
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
		const newTask = { id : v1 (), title : title, isDone : false };
		// достанем нужный массив по todolistId:
		let tasksTodolist = tasks[ todolistId ];
		// перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
		tasks[ todolistId ] = [newTask, ...tasksTodolist];
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks ( { ...tasks } );
	};

	const removeTask = ( taskId : string, todolistId : string ) => {
		// достанем нужный массив по todolistId:
		let tasksTodolist = tasks[ todolistId ];
		// перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
		tasks[ todolistId ] = tasksTodolist.filter ( t => t.id !== taskId );
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks ( { ...tasks } );
	};

	const changeTaskStatus = ( taskId : string, isDone : boolean, todolistId : string ) => {
		// достанем нужный массив по todolistId:
		let taskTodolist = tasks[ todolistId ];
		// найдём нужную таску:
		let task = taskTodolist.find ( t => t.id === taskId );
		// изменим таску, если она нашлась
		if (task) {
			task.isDone = isDone;
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks ( { ...tasks } );
		}
	};

	const changeTaskTitle = ( taskId : string, newTitle : string, todolistId : string ) => {
		// достанем нужный массив по todolistId:
		let taskTodolist = tasks[ todolistId ];
		// найдём нужную таску:
		let task = taskTodolist.find ( t => t.id === taskId );
		// изменим таску, если она нашлась
		if (task) {
			task.title = newTitle;
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks ( { ...tasks } );
		}
	};

	// фильтрация тасок
	// 1. раз значения меняются, а мы хотим чтобы после смены значения проходила перерисовк, то мы должны использовать useState
	// 2. в todolist пускаем не все таски, а отфильтрованые таски перед return (taskForTodolist)
	const changeFilter = ( filter : TaskFilterType, todolistId : string ) => {
		let todolist = todolists.find ( tl => tl.id === todolistId );
		if (todolist) {
			todolist.filter = filter;
			setTodolists ( [...todolists] );
		}
	};

	// добавление тудулиста
	// 1. создаём новый todolist
	// 2. сэтаем
	// 3. создаём новое свойство для тасок (ключ: id тудулиста, значение: пустой массив тасок)
	const addTodolist = ( title : string ) => {
		const newTodolist : TodolistsType = { id : v1 (), title : title, filter : 'all' };
		setTodolists ( [...todolists, newTodolist] );
		setTasks ( { ...tasks, [ newTodolist.id ] : [] } );
	};

	// удаление тудулиста
	const removeTodolist = ( todolistId : string ) => {
		let filteredTodo = todolists.filter ( tl => tl.id !== todolistId );
		setTodolists ( filteredTodo );
		// удаляем таски из удаленного тудулиста
		delete tasks[ todolistId ];
		setTasks ( { ...tasks } );
	};

	// изменение названия тудулиста
	const changeTodolistTitle = ( todolistId : string, newTitle : string ) => {
		// поиск нужного тудулиста
		let todo = todolists.find ( tl => tl.id === todolistId );
		if (todo) {
			todo.title = newTitle;
			setTodolists ( [...todolists] );
		}
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
