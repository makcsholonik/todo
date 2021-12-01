import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2 } from './todolists-reducer';

// typing

type ActionType = RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusType
	| ChangeTaskTitleType
	| AddTodolistActionType
	| RemoveTodolistActionType

export type RemoveTaskActionType = {
	type : 'REMOVE-TASK'
	taskId : string
	todolistId : string
}
export type AddTaskActionType = {
	type : 'ADD-TASK'
	title : string
	todolistId : string
}
export type ChangeTaskStatusType = {
	type : 'CHANGE-TASK-STATUS'
	taskId : string
	isDone : boolean
	todolistId : string
}
export type ChangeTaskTitleType = {
	type : 'CHANGE-TASK-TITLE'
	taskId : string
	newTitle : string
	todolistId : string
}

// initial state

const initialState : TasksStateType = {
	[ todolistId1 ] : [
		{ id : v1 (), title : 'html', isDone : true },
		{ id : v1 (), title : 'css', isDone : true },
		{ id : v1 (), title : 'js', isDone : false },
		{ id : v1 (), title : 'react', isDone : false },
	],
	[ todolistId2 ] : [
		{ id : v1 (), title : 'book', isDone : true },
		{ id : v1 (), title : 'tea', isDone : true },
		{ id : v1 (), title : 'milk', isDone : false },
	]
};

// reducer

export const tasksReducer = ( state : TasksStateType = initialState, action : ActionType ) : TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			const filteredTasks = tasks.filter ( t => t.id !== action.taskId );
			stateCopy[ action.todolistId ] = filteredTasks;
			return stateCopy;
		}
		case 'ADD-TASK': {
			const newTask = { id : v1 (), title : action.title, isDone : false };
			const stateCopy = { ...state };
			const tasksTodolist = stateCopy[ action.todolistId ];
			stateCopy[ action.todolistId ] = [newTask, ...tasksTodolist];
			return stateCopy;
		}
		case 'CHANGE-TASK-STATUS': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			const task = tasks.find ( t => t.id === action.taskId );
			if (task) {
				task.isDone = action.isDone;
			}
			return stateCopy;
		}
		case 'CHANGE-TASK-TITLE': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			const task = tasks.find ( t => t.id === action.taskId );
			if (task) {
				task.title = action.newTitle;
			}
			return stateCopy;
		}
		case 'ADD-TODOLIST': {
			const stateCopy = { ...state };
			stateCopy[ action.todolistId ] = [];
			return stateCopy;
		}
		case 'REMOVE-TODOLIST': {
			const stateCopy = { ...state };
			delete stateCopy[ action.todolistId ];
			return stateCopy;
		}
		default:
			return state;
	}
};

// action creator

export const removeTaskAC = ( taskId : string, todolistId : string ) : RemoveTaskActionType => {
	return { type : 'REMOVE-TASK', taskId, todolistId };
};
export const addTaskAC = ( title : string, todolistId : string ) : AddTaskActionType => {
	return { type : 'ADD-TASK', title, todolistId };
};
export const changeTaskStatusAC = ( taskId : string, isDone : boolean, todolistId : string ) : ChangeTaskStatusType => {
	return { type : 'CHANGE-TASK-STATUS', taskId, isDone, todolistId };
};
export const changeTaskTitleAC = ( taskId : string, newTitle : string, todolistId : string ) : ChangeTaskTitleType => {
	return { type : 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId };
};