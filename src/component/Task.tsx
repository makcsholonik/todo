import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from './EditableSpan';
import { TasksType } from '../AppWithRedux';
import { RemoveCircleOutline } from '@material-ui/icons';
import { Checkbox, IconButton } from '@material-ui/core';

type TaskPropsType = {
	title : string
	task : TasksType
	removeTask : ( id : string, todolistId : string ) => void
	changeTaskStatus : ( taskId : string, isDone : boolean, todolistId : string ) => void
	changeTaskTitle : ( taskId : string, newTitle : string, todolistId : string ) => void
	todolistId : string
}
export const Task = React.memo ( ( props : TaskPropsType ) => {
	// удаление таски
	const onRemoveTaskHandler = () => props.removeTask ( props.task.id, props.todolistId );

	// изменение статуса таски (checkbox)
	const onChangeStatusHandler = ( e : ChangeEvent<HTMLInputElement> ) => props.changeTaskStatus ( props.task.id,
		e.currentTarget.checked, props.todolistId );

	// изменяем имя таски
	const onChangeTitleHandler = useCallback ( ( newTitle : string ) => props.changeTaskTitle ( props.task.id, newTitle, props.todolistId
	), [props.changeTaskTitle, props.task.id, props.todolistId] );

	return (
		<div key={ props.task.id } className={ props.task.isDone ? 'is-done' : '' }>
			<Checkbox
				size={ 'small' }
				color={ 'secondary' }
				checked={ props.task.isDone }
				onChange={ onChangeStatusHandler }
			/>
			<EditableSpan title={ props.task.title } onChange={ onChangeTitleHandler }/>
			<IconButton onClick={ onRemoveTaskHandler } color={ 'default' } size={ 'small' }>
				<RemoveCircleOutline/>
			</IconButton>
		</div>
	);
} );