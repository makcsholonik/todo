import React, { useCallback, useEffect } from 'react';
import { AddItemForm } from 'component/AddItemForm/AddItemForm';
import { EditableSpan } from 'component/EditableSpan/EditableSpan';
import { Task } from './Task/Task';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { TaskFilterType, TodolistDomainType } from 'state/todolists-reducer';
import { TaskStatuses, TaskType } from 'api/api';
import { useDispatch } from 'react-redux';
import { fetchTasksTC } from 'state/tasks-reducer';

type TodolistPropsType = {
	todolist : TodolistDomainType
	tasks : Array<TaskType>
	removeTask : ( id : string, todolistId : string ) => void
	changeFilter : ( filter : TaskFilterType, todolistId : string ) => void
	addTask : ( title : string, todolistId : string ) => void
	changeTaskStatus : ( taskId : string, status : TaskStatuses, todolistId : string ) => void
	changeTaskTitle : ( taskId : string, newTitle : string, todolistId : string ) => void
	removeTodolist : ( todolistId : string ) => void
	changeTodolistTitle : ( todolistId : string, newTitle : string ) => void
	demo? : boolean
}

export const Todolist : React.FC<TodolistPropsType> = React.memo ( ( props ) => {

	const {
		demo = false
	} = props;

	const dispatch = useDispatch ();

	useEffect ( () => {
		if (demo) {
			return;
		}
		dispatch ( fetchTasksTC ( props.todolist.id ) );
	}, [] );

	// кнопки фильтрации
	const onAllClickFilterHandler = useCallback ( () => props.changeFilter ( 'all', props.todolist.id ), [props.changeFilter, props.todolist.id] );
	const onActiveClickFilterHandler = useCallback ( () => props.changeFilter ( 'active', props.todolist.id ), [props.changeFilter, props.todolist.id] );
	const onCompletedClickFilterHandler = useCallback ( () => props.changeFilter ( 'completed', props.todolist.id ), [props.changeFilter, props.todolist.id] );

	// удаление todolist
	const removeTodolist = () => {
		props.removeTodolist ( props.todolist.id );
	};

	// изменение имени тудулиста
	const changeTodolistTitle = useCallback ( ( newTitle : string ) => {
		props.changeTodolistTitle ( props.todolist.id, newTitle );
	}, [props.changeTodolistTitle, props.todolist.id] );

	// обёртка над ф-ей AddItem
	const addTask = useCallback ( ( title : string ) => {
		props.addTask ( title, props.todolist.id );
	}, [props.addTask, props.todolist.id] );

	let taskForTodolist = props.tasks;

	if (props.todolist.filter === 'active') {
		taskForTodolist = props.tasks.filter ( t => t.status === TaskStatuses.New );
	}
	if (props.todolist.filter === 'completed') {
		taskForTodolist = props.tasks.filter ( t => t.status === TaskStatuses.Completed );
	}

	return (
		<div>
			<h3>
				<EditableSpan title={ props.todolist.title } onChange={ changeTodolistTitle }/>
				<IconButton onClick={ removeTodolist } disabled={ props.todolist.entityStatus === 'loading' }>
					<Delete/>
				</IconButton>
			</h3>
			<AddItemForm addItem={ addTask } disabled={ props.todolist.entityStatus === 'loading' }/>
			<div>
				{/*Отрисовка тасок*/ }
				{
					taskForTodolist.map ( ( task ) => {
						return (
							<Task
								key={ task.id }
								title={ props.todolist.title }
								task={ task }
								removeTask={ props.removeTask }
								changeTaskStatus={ props.changeTaskStatus }
								changeTaskTitle={ props.changeTaskTitle }
								todolistId={ props.todolist.id }
							/>
						);
					} )
				}
			</div>
			<div>
				<Button
					variant={ props.todolist.filter === 'all' ? 'contained' : 'outlined' }
					color={ 'inherit' }
					size={ 'small' }
					onClick={ onAllClickFilterHandler }>
					All
				</Button>
				<Button
					variant={ props.todolist.filter === 'active' ? 'contained' : 'outlined' }
					color={ 'primary' }
					size={ 'small' }
					onClick={ onActiveClickFilterHandler }>
					Active
				</Button>
				<Button
					variant={ props.todolist.filter === 'completed' ? 'contained' : 'outlined' }
					color={ 'secondary' }
					size={ 'small' }
					onClick={ onCompletedClickFilterHandler }>
					Completed
				</Button>
			</div>
		</div>
	);
} );

