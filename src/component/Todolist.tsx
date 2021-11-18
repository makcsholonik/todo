import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TaskFilterType, TasksType } from '../App';

type TodolistPropsType = {
	title : string
	tasks : Array<TasksType>
	removeTask : ( id : string ) => void
	changeFilter : ( filter : TaskFilterType ) => void
	addTask : ( title : string ) => void
	changeTaskStatus : ( taskId : string, isDone : boolean ) => void
}

export function Todolist ( props : TodolistPropsType ) {

	// добавление таски ----->
	const [taskTitle, setTaskTitle] = useState<string> ( '' );
	const onNewTaskChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
		setTaskTitle ( e.currentTarget.value );
	};
	const onNewTaskClickHandler = () => {
		// title не равен пустой строке и отсекаем пробелы (1 вариант)
		if (taskTitle.trim () !== '') {
			props.addTask ( taskTitle );
			setTaskTitle ( '' );
		} else {
			setError ( 'title is required' );
		}
	};
	// добавление по нажатию на Ctrl+Enter
	const onNewTaskKeyPressHandler = ( e : KeyboardEvent<HTMLInputElement> ) => {
		setError ( null ); // убирает ошибку - title is required, при нажатии любой клавиши
		// title не равен пустой строке и отсекаем пробелы  (2 вариант)
		if (taskTitle.trim () === '') {
			setError ( 'title is required' );
		}
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

	// error
	// 1. доваляем className input & div (title is required)
	// 2. добавляем зависимость классов от ошибки

	const [error, setError] = useState<string | null> ( null );

	return (
		<div>
			<h3>{ props.title }</h3>
			<div>
				<input
					value={ taskTitle }
					onChange={ onNewTaskChangeHandler }
					onKeyPress={ onNewTaskKeyPressHandler }
					className={ error ? 'error' : '' }
				/>
				<button onClick={ onNewTaskClickHandler }>+</button>
				{ error ? <div className={ 'error-message' }>{ error }</div> : '' }
			</div>
			<ul>
				{/*Отрисовка тасок*/ }
				{
					props.tasks.map ( ( t ) => {

						// удаление таски
						const onRemoveTaskHandler = () => props.removeTask ( t.id );

						// изменение статуса таски (checkbox)
						const onChangeStatusHandler = ( e : ChangeEvent<HTMLInputElement> ) => props.changeTaskStatus ( t.id, e.currentTarget.checked );

						return (
							<li key={ t.id }>
								<input
									type="checkbox"
									checked={ t.isDone }
									onChange={ onChangeStatusHandler }
								/>
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