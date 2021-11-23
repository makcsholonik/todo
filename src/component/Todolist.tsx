import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TaskFilterType, TasksType } from '../App';

type TodolistPropsType = {
	title : string
	tasks : Array<TasksType>
	removeTask : ( id : string, todolistId : string ) => void
	changeFilter : ( filter : TaskFilterType, todolistId : string ) => void
	addTask : ( title : string, todolistId : string ) => void
	changeTaskStatus : ( taskId : string, isDone : boolean, todolistId : string ) => void
	filter : TaskFilterType
	todolistId : string
}

export function Todolist ( props : TodolistPropsType ) {

	const [taskTitle, setTaskTitle] = useState<string> ( '' );
	const [error, setError] = useState<string | null> ( null );

	const onNewTaskClickHandler = () => {
		// title не равен пустой строке и отсекаем пробелы
		let newTitle = taskTitle.trim ();
		if (newTitle !== '') {
			props.addTask ( newTitle, props.todolistId );
			setTaskTitle ( '' );
		} else {
			setError ( 'title is required' );
		}
	};

	const onNewTaskChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
		setTaskTitle ( e.currentTarget.value );
	};

	// добавление по нажатию на Enter
	const onNewTaskKeyPressHandler = ( e : KeyboardEvent<HTMLInputElement> ) => {
		setError ( null ); // убирает ошибку - title is required, при нажатии любой клавиши
		if (e.charCode === 13) {
			onNewTaskClickHandler ();
		}
	};

	// кнопки фильтрации
	const onAllClickFilterHandler = () => props.changeFilter ( 'all', props.todolistId );
	const onActiveClickFilterHandler = () => props.changeFilter ( 'active', props.todolistId );
	const onCompletedClickFilterHandler = () => props.changeFilter ( 'completed', props.todolistId );

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
						const onRemoveTaskHandler = () => props.removeTask ( t.id, props.todolistId );

						// изменение статуса таски (checkbox)
						const onChangeStatusHandler = ( e : ChangeEvent<HTMLInputElement> ) => props.changeTaskStatus ( t.id, e.currentTarget.checked, props.todolistId );

						return (
							<li key={ t.id } className={ t.isDone ? 'is-done' : '' }>
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
				<button
					onClick={ onAllClickFilterHandler }
					className={ props.filter === 'all' ? 'active-filter' : '' }>
					All
				</button>
				<button
					onClick={ onActiveClickFilterHandler }
					className={ props.filter === 'active' ? 'active-filter' : '' }>
					Active
				</button>
				<button
					onClick={ onCompletedClickFilterHandler }
					className={ props.filter === 'completed' ? 'active-filter' : '' }>
					Completed
				</button>
			</div>
		</div>
	);
}