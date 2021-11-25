import React from 'react';

type EditableSpan = {
	title : string
}
export const EditableSpan = ( props : EditableSpan ) => {
	return (
		<span>
			{ props.title }
		</span>
	);
};