import React, { useState } from 'react';
import './App.css';
import { Todolist } from './component/Todolist';

export type TasksType = {
	id : number
	title : string
	isDone : boolean
}

export function App () {

	const [tasks, setTasks] = useState<Array<TasksType>> ( [
		{ id : 1, title : 'html', isDone : true },
		{ id : 2, title : 'css', isDone : true },
		{ id : 3, title : 'js', isDone : false },
		{ id : 4, title : 'react', isDone : false },
	] );

	// удаление таски
	const removeTask = ( taskId : number ) => {
		let filteredTask = tasks.filter ( t => t.id !== taskId );
		setTasks ( filteredTask );
	};

	return (
		<div className="App">
			<Todolist
				title={ 'what to learn' }
				tasks={ tasks }
				removeTask={removeTask}
			/>
		</div>
	);
}
