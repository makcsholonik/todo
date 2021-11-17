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
	const onChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
		setTaskTitle ( e.currentTarget.value );
	};
	const onClickHandler = () => {
		props.addTask ( taskTitle );
		setTaskTitle ( '' );
	};
	// добавление по нажатию на Enter
	const onKeyPressHandler = ( e : KeyboardEvent<HTMLInputElement> ) => {
		if (e.ctrlKey && e.charCode === 13) {
			props.addTask ( taskTitle );
			setTaskTitle ( '' );
		}
	};
	// <----- добавление таски

	return (
		<div>
			<h3>{ props.title }</h3>
			<div>
				<input
					value={ taskTitle }
					onChange={ onChangeHandler }
					onKeyPress={ onKeyPressHandler }
				/>
				<button onClick={ onClickHandler }>+</button>
			</div>
			<ul>
				{/*Отрисовка тасок*/ }
				{
					props.tasks.map ( ( t ) => {
						return (
							<li key={ t.id }>
								<input type="checkbox" checked={ t.isDone }/>
								<span>{ t.title }</span>
								<button onClick={ () => props.removeTask ( t.id ) }>x</button>
							</li>
						);
					} )
				}
			</ul>
			<div>
				<button onClick={ () => props.changeFilter ( 'all' ) }>All</button>
				<button onClick={ () => props.changeFilter ( 'active' ) }>Active</button>
				<button onClick={ () => props.changeFilter ( 'completed' ) }>Completed</button>
			</div>
		</div>
	);
}