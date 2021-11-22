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

	const [tasks, setTasks] = useState<Array<TasksType>> ( [
		{ id : v1 (), title : 'html', isDone : true },
		{ id : v1 (), title : 'css', isDone : true },
		{ id : v1 (), title : 'js', isDone : false },
		{ id : v1 (), title : 'react', isDone : false },
	] );

	// удаление таски
	const removeTask = ( taskId : string ) => {
		let filteredTask = tasks.filter ( t => t.id !== taskId );
		setTasks ( filteredTask );
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

	const [todolists, setTodolists] = useState<Array<TodolistsType>> ( [
		{ id : v1 (), title : 'what to learn', filter : 'all' },
		{ id : v1 (), title : 'what to buy', filter : 'all' }
	] );

	return (
		<div className="App">

			{
				todolists.map ( ( tl ) => {

					let taskForTodolist = tasks;
					if (tl.filter === 'active') {
						taskForTodolist = tasks.filter ( t => !t.isDone );
					}
					if (tl.filter === 'completed') {
						taskForTodolist = tasks.filter ( t => t.isDone );
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
