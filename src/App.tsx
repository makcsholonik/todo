import React, { useState } from 'react';
import './App.css';
import { Todolist } from './component/Todolist';

export type TasksType = {
	id : number
	title : string
	isDone : boolean
}
export type TaskFilterType = 'all' | 'active' | 'completed';

export function App () {

	const [tasks, setTasks] = useState<Array<TasksType>> ( [
		{ id : 1, title : 'html', isDone : true },
		{ id : 2, title : 'css', isDone : true },
		{ id : 3, title : 'js', isDone : false },
		{ id : 4, title : 'react', isDone : false },
	] );
	const [filter, setFilter] = useState<TaskFilterType> ( 'all');

	// удаление таски
	const removeTask = ( taskId : number ) => {
		let filteredTask = tasks.filter ( t => t.id !== taskId );
		setTasks ( filteredTask );
	};

	// фильтрация тасок
	const changeFilter = (filter: TaskFilterType) => {
		setFilter(filter);
	}
	// 1. раз значения меняются, а мы хотим чтобы после смены значения проходила перерисовк, то мы должны использовать useState
	// 2. в todolist пускаем не все таски, а отфильтрованые таски перед return (taskForTodolist)
	let taskForTodolist = tasks;
	if (filter === 'active') {
		taskForTodolist = tasks.filter (t => !t.isDone)
	}
	if (filter === 'completed') {
		taskForTodolist = tasks.filter (t => t.isDone)
	}

	return (
		<div className="App">
			<Todolist
				title={ 'what to learn' }
				tasks={ taskForTodolist }
				removeTask={removeTask}
				changeFilter={changeFilter}
			/>
		</div>
	);
}
