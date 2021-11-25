import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { TaskFilterType, TasksType } from '../App';
import AddItemForm from './AddItemForm';

type TodolistPropsType = {
	title : string
	tasks : Array<TasksType>
	removeTask : ( id : string, todolistId : string ) => void
	changeFilter : ( filter : TaskFilterType, todolistId : string ) => void
	addTask : ( title : string, todolistId : string ) => void
	changeTaskStatus : ( taskId : string, isDone : boolean, todolistId : string ) => void
	filter : TaskFilterType
	todolistId : string
	removeTodolist : ( todolistId : string ) => void
}

export function Todolist ( props : TodolistPropsType ) {

	// кнопки фильтрации
	const onAllClickFilterHandler = () => props.changeFilter ( 'all', props.todolistId );
	const onActiveClickFilterHandler = () => props.changeFilter ( 'active', props.todolistId );
	const onCompletedClickFilterHandler = () => props.changeFilter ( 'completed', props.todolistId );

	// удаление todolist
	const removeTodolist = () => {
		props.removeTodolist ( props.todolistId );
	};

	// обёртка над ф-ей AddItem
	const addTask =(title: string) => {
		props.addTask (title, props.todolistId)
	}

	return (
		<div>
			<h3>{ props.title }
				<button onClick={ removeTodolist }>x</button>
			</h3>
			<AddItemForm addItem={ addTask }/>
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