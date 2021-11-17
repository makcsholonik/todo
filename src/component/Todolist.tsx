import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TaskFilterType, TasksType } from '../App';

type TodolistPropsType = {
	title : string
	tasks : Array<TasksType>
	removeTask : ( id : string ) => void
	changeFilter : ( filter : TaskFilterType ) => void
	addTask : ( title : string ) => void
}

export function Todolist ( props : TodolistPropsType ) {


	// добавление таски ----->
	const [taskTitle, setTaskTitle] = useState<string> ( '' );
	const onNewTaskChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
		setTaskTitle ( e.currentTarget.value );
	};
	const onNewTaskClickHandler = () => {
		props.addTask ( taskTitle );
		setTaskTitle ( '' );
	};
	// добавление по нажатию на Ctrl+Enter
	const onNewTaskKeyPressHandler = ( e : KeyboardEvent<HTMLInputElement> ) => {
		if (e.ctrlKey && e.charCode === 13) {
			props.addTask ( taskTitle );
			setTaskTitle ( '' );
		}
	};
	// <----- добавление таски

	// кнопки фильтрации
	const onAllClickFilterHandler = () => props.changeFilter ( 'all' );
	const onActiveClickFilterHandler = () => props.changeFilter ( 'active' );
	const onCompletedClickFilterHandler = () => props.changeFilter ( 'completed' );

	return (
		<div>
			<h3>{ props.title }</h3>
			<div>
				<input
					value={ taskTitle }
					onChange={ onNewTaskChangeHandler }
					onKeyPress={ onNewTaskKeyPressHandler }
				/>
				<button onClick={ onNewTaskClickHandler }>+</button>
			</div>
			<ul>
				{/*Отрисовка тасок*/ }
				{
					props.tasks.map ( ( t ) => {

						// удаление таски
						const onRemoveTaskHandler = () => props.removeTask ( t.id );

						return (
							<li key={ t.id }>
								<input type="checkbox" checked={ t.isDone }/>
								<span>{ t.title }</span>
								<button onClick={ onRemoveTaskHandler }>x</button>
							</li>
						);
					} )
				}
			</ul>
			<div>
				<button onClick={ onAllClickFilterHandler }>All</button>
				<button onClick={ onActiveClickFilterHandler }>Active</button>
				<button onClick={ onCompletedClickFilterHandler }>Completed</button>
			</div>
		</div>
	);
}