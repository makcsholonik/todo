import React, { ChangeEvent, useState } from 'react';
import { TextField } from '@material-ui/core';

type EditableSpanPropsType = {
	title : string
	onChange : ( newTitle : string ) => void
}
export const EditableSpan : React.FC<EditableSpanPropsType> = React.memo ( ( props ) => {

	const [editMode, setEditMode] = useState<boolean> ( false );
	const [title, setTitle] = useState<string> ( '' );

	const activateEditMode = () => {
		setEditMode ( true );
		setTitle ( props.title );
	};
	const activateViewMode = () => {
		setEditMode ( false );
		props.onChange ( title );
	};

	const onChangeTitle = ( e : ChangeEvent<HTMLInputElement> ) => setTitle ( e.currentTarget.value );

	return (
		editMode
			? <TextField value={ title } onBlur={ activateViewMode } onChange={ onChangeTitle } autoFocus/>
			: <span onDoubleClick={ activateEditMode }>{ props.title }</span>
	);
} );