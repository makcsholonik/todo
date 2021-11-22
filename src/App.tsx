import React, { useState } from 'react';
import './App.css';
import { Todolist } from './component/Todolist';
import { v1 } from 'uuid';

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

export function App () {

	// удаление таски
	// 1. добавляет todolistId, чтобы знать с какого тудулиста удалять таску
	// 2. достаём все таски из конкретного тудулиста
	// 3. удаляем найденную таску из массива
	// 4. заменяем таски отфильтрованными тасками
	// 5. сэтаем чтобы перерисовать

	const removeTask = ( taskId : string, todolistId : string ) => {
		let taskTodolist = tasks[ todolistId ]; // 2
		let filteredTasks = taskTodolist.filter ( t => t.id !== taskId ); // 3
		tasks[ todolistId ] = filteredTasks; // 4
		setTasks ( { ...tasks } ); // 5
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

	// добавление таски
	// 1. генерируем новую таску
	// 2. в качестве callback передаём в todolist
	// 3. в todolist создаём useState что прочитать значение(value) input
	// 4. useState (taskTitle,setTaskTitle), считывание значения input c помощью ф-ии onChangeHandler

	const addTask = ( title : string ) => {
		const newTask = { id : v1 (), title : title, isDone : false };
		setTasks ( [...tasks, newTask] );
	};

	// изменение статуса таски (checkbox)

	const changeTaskStatus = ( taskId : string, isDone : boolean ) => {
		let task = tasks.find ( t => t.id === taskId );
		// псевдоистина/псевдоложь !!!
		if (task) {
			task.isDone = isDone;
		}
		setTasks ( [...tasks] );
	};

	const todolistId1 = v1 ();
	const todolistId2 = v1 ();

	const [todolists, setTodolists] = useState<Array<TodolistsType>> ( [
		{ id : todolistId1, title : 'what to learn', filter : 'all' },
		{ id : todolistId2, title : 'what to buy', filter : 'all' }
	] );

	// храним таски в ассоциативном массиве
	// 1. генерируем id-шники (const todolistId1 = v1(); const todolistId2 = v1())
	// 2. создаём ассоциативный массив

	const [tasks, setTasks] = useState ( {
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


	return (
		<div className="App">

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
							filter={ tl.filter }
							todolistId={ tl.id }
						/>
					);
				} )
			}
		</div>
	);
}
