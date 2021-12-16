import axios from 'axios';

const instance = axios.create ( {
	baseURL : 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials : true,
	headers : {
		'api-key' : 'f0cc0942-0306-4a5b-86b9-c3852c7f7cf3'
	}
} );

// todolist api

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


// task api

export type TaskType = {
	description : string
	title : string
	completed : boolean
	status : number
	priority : number
	startDate : string
	deadline : string
	id : string
	todoListId : string
	order : number
	addedDate : string
}

type GetTasksResponseType = {
	items : TaskType[]
	totalCount : number
	error : string | null
}

type UpdateTaskType = {
	title : string
	description : string
	completed : boolean
	status : number
	priority : number
	startDate : string
	deadline : string
}

export const tasksAPI = {
	getTasks ( todolistId : string ) {
		return instance.get<GetTasksResponseType> ( `todo-lists/${ todolistId }/tasks` );
	},
	createTask ( todolistId : string, title : string ) {
		return instance.post<ResponseType> ( `todo-lists/${ todolistId }/tasks`, { title : title } );
	},
	deleteTask ( todolistId : string, taskId : string ) {
		return instance.get<ResponseType> ( `todo-lists/${ todolistId }/tasks/${ taskId }` );
	},
	updateTasks ( todolistId : string, taskId : string, title : string, description : string, completed : boolean, status : number, priority : number, startDate : string, deadline : string ) {
		return instance.put<UpdateTaskType> ( `todo-lists/${ todolistId }/tasks/${ taskId }`, {
			title : title,
			description : description,
			completed : completed,
			status : status,
			priority : priority,
			startDate : startDate,
			deadline : deadline
		} );
	}
};