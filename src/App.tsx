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
		{ id : 3, title : 'js', isDone : false }
	]);

	return (
		<div className="App">
			<Todolist
				title={ 'what to learn' }
				tasks={ tasks }
			/>
		</div>
	);
}
