import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { TasksStateType } from '../App';
import { TaskPriorities, TaskStatuses, TaskType } from '../api/api';

// typing

type ActionType = RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusType
	| ChangeTaskTitleType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| SetTasksActionType

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
	status : TaskStatuses
	todolistId : string
}
export type ChangeTaskTitleType = {
	type : 'CHANGE-TASK-TITLE'
	taskId : string
	newTitle : string
	todolistId : string
}
export type SetTasksActionType = {
	type : 'SET-TASKS'
	todolistId : string
	tasks : TaskType[]
}

// initial state

const initialState : TasksStateType = {};

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
			const newTask : TaskType = {
				description : '',
				title : action.title,
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : v1 (),
				todoListId : action.todolistId,
				order : 0,
				addedDate : ''
			};
			const stateCopy = { ...state };
			const tasksTodolist = stateCopy[ action.todolistId ];
			stateCopy[ action.todolistId ] = [newTask, ...tasksTodolist];
			return stateCopy;
		}
		case 'CHANGE-TASK-STATUS': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			stateCopy[ action.todolistId ] = tasks.map ( t => t.id === action.taskId ? {
				...t,
				status : action.status
			} : t );
			return stateCopy;
		}
		case 'CHANGE-TASK-TITLE': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			stateCopy[ action.todolistId ] = tasks.map ( t => t.id === action.taskId ? {
				...t,
				title : action.newTitle
			} : t );
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
		case 'SET-TODOLISTS': {
			const stateCopy = { ...state };
			action.todolists.forEach ( tl => {
				stateCopy[ tl.id ] = [];
			} );
			return stateCopy;
		}
		case 'SET-TASKS': {
			const stateCopy = { ...state };
			stateCopy[ action.todolistId ] = action.tasks;
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
export const changeTaskStatusAC = ( taskId : string, status : TaskStatuses, todolistId : string ) : ChangeTaskStatusType => {
	return { type : 'CHANGE-TASK-STATUS', taskId, status, todolistId };
};
export const changeTaskTitleAC = ( taskId : string, newTitle : string, todolistId : string ) : ChangeTaskTitleType => {
	return { type : 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId };
};
export const setTasksAC = ( todolistId : string, tasks : TaskType[] ) : SetTasksActionType => {
	return { type : 'SET-TASKS', todolistId, tasks };
};