import axios from 'axios';


// instance
const instance = axios.create ( {
	baseURL : 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials : true,
	headers : {
		'api-key' : 'f0cc0942-0306-4a5b-86b9-c3852c7f7cf3'
	}
} );

// todolist api
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
export const tasksAPI = {
	getTasks ( todolistId : string ) {
		return instance.get<GetTasksResponseType> ( `todo-lists/${ todolistId }/tasks` );
	},
	createTask ( todolistId : string, taskTitle : string ) {
		return instance.post<ResponseType<{ item : TaskType }>> ( `todo-lists/${ todolistId }/tasks`, { title : taskTitle } );
	},
	deleteTask ( todolistId : string, taskId : string ) {
		return instance.delete<ResponseType> ( `todo-lists/${ todolistId }/tasks/${ taskId }` );
	},
	updateTasks ( todolistId : string, taskId : string, model : UpdateTaskModelType ) {
		return instance.put<ResponseType> ( `todo-lists/${ todolistId }/tasks/${ taskId }`, model );
	}
};

// auth api
export const authAPI = {
	login ( data : AuthDataType ) {
		return instance.post<ResponseType<{ userId? : number }>> ( `auth/login`, data );
	}
};

// types
export type ResponseType<D = {}> = {
	resultCode : number
	messages : string[],
	data : D
}
type GetTasksResponseType = {
	items : TaskType[]
	totalCount : number
	error : string | null
}
export type TodolistType = {
	id : string
	title : string
	addedDate : string
	order : number
}
export type TaskType = {
	description : string
	title : string
	status : TaskStatuses
	priority : TaskPriorities
	startDate : string
	deadline : string
	id : string
	todoListId : string
	order : number
	addedDate : string
}
export type UpdateTaskModelType = {
	title : string
	description : string
	status : TaskStatuses
	priority : TaskPriorities
	startDate : string
	deadline : string
}
export type TasksStateType = {
	[ key : string ] : Array<TaskType>
}
export type AuthDataType = {
	email : string
	password : string
	rememberMe : boolean
	captcha? : string
}

// enums
export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}