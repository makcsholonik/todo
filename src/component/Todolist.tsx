import React, { useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { TaskFilterType, TasksType } from '../AppWithRedux';
import { Task } from './Task';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

type TodolistPropsType = {
	title : string
	tasks : Array<TasksType>
	removeTask : ( id : string, todolistId : string ) => void
	changeFilter : ( filter : TaskFilterType, todolistId : string ) => void
	addTask : ( title : string, todolistId : string ) => void
	changeTaskStatus : ( taskId : string, isDone : boolean, todolistId : string ) => void
	changeTaskTitle : ( taskId : string, newTitle : string, todolistId : string ) => void
	filter : TaskFilterType
	todolistId : string
	removeTodolist : ( todolistId : string ) => void
	changeTodolistTitle : ( todolistId : string, newTitle : string ) => void
}

export const Todolist = React.memo ( ( props : TodolistPropsType ) => {

	// кнопки фильтрации
	const onAllClickFilterHandler = useCallback ( () => props.changeFilter ( 'all', props.todolistId ), [props.changeFilter, props.todolistId] );
	const onActiveClickFilterHandler = useCallback ( () => props.changeFilter ( 'active', props.todolistId ), [props.changeFilter, props.todolistId] );
	const onCompletedClickFilterHandler = useCallback ( () => props.changeFilter ( 'completed', props.todolistId ), [props.changeFilter, props.todolistId] );

	// удаление todolist
	const removeTodolist = () => {
		props.removeTodolist ( props.todolistId );
	};

	// изменение имени тудулиста
	const changeTodolistTitle = useCallback ( ( newTitle : string ) => {
		props.changeTodolistTitle ( props.todolistId, newTitle );
	}, [props.changeTodolistTitle, props.todolistId] );

	// обёртка над ф-ей AddItem
	const addTask = useCallback ( ( title : string ) => {
		props.addTask ( title, props.todolistId );
	}, [props.addTask, props.todolistId] );

	let taskForTodolist = props.tasks;

	if (props.filter === 'active') {
		taskForTodolist = props.tasks.filter ( t => !t.isDone );
	}
	if (props.filter === 'completed') {
		taskForTodolist = props.tasks.filter ( t => t.isDone );
	}

	return (
		<div>
			<h3>
				<EditableSpan title={ props.title } onChange={ changeTodolistTitle }/>
				<IconButton onClick={ removeTodolist } color={ 'inherit' } size={ 'small' }>
					<Delete/>
				</IconButton>
			</h3>
			<AddItemForm addItem={ addTask }/>
			<ul>
				{/*Отрисовка тасок*/ }
				{
					taskForTodolist.map ( ( task ) => {
						return (
							<Task
								key={ task.id }
								title={ props.title }
								task={ task }
								removeTask={ props.removeTask }
								changeTaskStatus={ props.changeTaskStatus }
								changeTaskTitle={ props.changeTaskTitle }
								todolistId={ props.todolistId }
							/>
						);
					} )
				}
			</ul>
			<div>
				<Button
					variant={ 'outlined' }
					size={ 'small' }
					onClick={ onAllClickFilterHandler }
					className={ props.filter === 'all' ? 'active-filter' : '' }>
					All
				</Button>
				<Button
					variant={ 'outlined' }
					size={ 'small' }
					onClick={ onActiveClickFilterHandler }
					className={ props.filter === 'active' ? 'active-filter' : '' }>
					Active
				</Button>
				<Button
					variant={ 'outlined' }
					size={ 'small' }
					onClick={ onCompletedClickFilterHandler }
					className={ props.filter === 'completed' ? 'active-filter' : '' }>
					Completed
				</Button>
			</div>
		</div>
	);
} );

