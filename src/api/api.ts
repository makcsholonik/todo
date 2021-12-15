import axios from 'axios';

const instance = axios.create ( {
	baseURL : 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials : true,
	headers : {
		'api-key' : 'f0cc0942-0306-4a5b-86b9-c3852c7f7cf3'
	}
} );

export type TodolistType = {
	id : string
	title : string
	addedDate : string
	order : number
}

type ResponseType<D = {}> = {
	resultCode : number
	messages : string[],
	data : D
}

export const todolistsAPI = {
	getTodolists () {
		return instance.get<TodolistType[]> ( 'todo-lists' );
	},
	createTodolist ( title : string ) {
		return instance.post <ResponseType<{ item : TodolistType }>> ( 'todo-lists', { title : title } );
	},
	deleteTodolist ( id : string ) {
		return instance.delete<ResponseType> ( `todo-lists/${ id }` );
	},
	updateTodolistTitle ( id : string, title : string ) {
		return instance.put<ResponseType> ( `todo-lists/${ id }`, { title : title } );
	}
};

export const tasksAPI = {};