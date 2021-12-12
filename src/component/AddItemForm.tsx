import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, TextField } from '@material-ui/core';

export type AddItemPropsType = {
	addItem : ( newTitle : string ) => void
}

export const AddItemForm = React.memo ( ( props : AddItemPropsType ) => {

	console.log ( 'AddItemForm is called' );

	const [taskTitle, setTaskTitle] = useState<string> ( '' );
	const [error, setError] = useState<string | null> ( null );

	const onNewTaskClickHandler = () => {
		// title не равен пустой строке и отсекаем пробелы
		let newTitle = taskTitle.trim ();
		if (newTitle !== '') {
			props.addItem ( newTitle );
			setTaskTitle ( '' );
		} else {
			setError ( 'title is required' );
		}
	};

	const onNewTaskChangeHandler = ( e : ChangeEvent<HTMLInputElement> ) => {
		setTaskTitle ( e.currentTarget.value );
	};

	// добавление item по нажатию на Enter
	const onNewTaskKeyPressHandler = ( e : KeyboardEvent<HTMLInputElement> ) => {
		// дополнительно не перерисовывает
		if (error !== null) {
			setError ( null ); // убирает ошибку - title is required, при нажатии любой клавиши
		}
		if (e.charCode === 13) {
			onNewTaskClickHandler ();
		}
	};

	return (
		<div>
			<TextField
				label={ 'type value' }
				variant={'standard'}
				color={'primary'}
				size={'small'}
				value={ taskTitle }
				onChange={ onNewTaskChangeHandler }
				onKeyPress={ onNewTaskKeyPressHandler }
				error={!!error}
				helperText={error}
			/>
			<Button variant={'outlined'} size={'small'} onClick={ onNewTaskClickHandler }>+</Button>
			{/*заменили helperText*/}
			{/*{ error ? <div className={ 'error-message' }>{ error }</div> : '' }*/}
		</div>
	);
} );
