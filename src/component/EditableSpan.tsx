import React, { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
	title : string
	onChange : ( newTitle : string ) => void
}
export const EditableSpan = React.memo ( ( props : EditableSpanPropsType ) => {

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
			? <input value={ title } onBlur={ activateViewMode } onChange={ onChangeTitle } autoFocus/>
			: <span onDoubleClick={ activateEditMode }>{ props.title }</span>
	);
} );