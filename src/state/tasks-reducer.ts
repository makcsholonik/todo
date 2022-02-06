import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { TasksStateType } from '../App';
import { TaskPriorities, tasksAPI, TaskStatuses, TaskType } from '../api/api';
import { Dispatch } from 'redux';
import { strict } from 'assert';

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
	type : 'REMOVE_TASK'
	taskId : string
	todolistId : string
}
export type AddTaskActionType = {
	type : 'ADD_TASK'
	title : string
	todolistId : string
}
export type ChangeTaskStatusType = {
	type : 'CHANGE_TASK_STATUS'
	taskId : string
	status : TaskStatuses
	todolistId : string
}
export type ChangeTaskTitleType = {
	type : 'CHANGE_TASK_TITLE'
	taskId : string
	newTitle : string
	todolistId : string
}
export type SetTasksActionType = {
	type : 'SET_TASKS'
	tasks : TaskType[]
	todolistId : string
}

// initial state

const initialState : TasksStateType = {};

// reducer

export const tasksReducer = ( state : TasksStateType = initialState, action : ActionType ) : TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			const filteredTasks = tasks.filter ( t => t.id !== action.taskId );
			stateCopy[ action.todolistId ] = filteredTasks;
			return stateCopy;
		}
		case 'ADD_TASK': {
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
		case 'CHANGE_TASK_STATUS': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			stateCopy[ action.todolistId ] = tasks.map ( t => t.id === action.taskId ? {
				...t,
				status : action.status
			} : t );
			return stateCopy;
		}
		case 'CHANGE_TASK_TITLE': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			stateCopy[ action.todolistId ] = tasks.map ( t => t.id === action.taskId ? {
				...t,
				title : action.newTitle
			} : t );
			return stateCopy;
		}
		case 'ADD_TODOLIST': {
			const stateCopy = { ...state };
			stateCopy[ action.todolistId ] = [];
			return stateCopy;
		}
		case 'REMOVE_TODOLIST': {
			const stateCopy = { ...state };
			delete stateCopy[ action.todolistId ];
			return stateCopy;
		}
		case 'SET_TODOLISTS': {
			const stateCopy = { ...state };
			action.todolists.forEach ( tl => {
				stateCopy[ tl.id ] = [];
			} );
			return stateCopy;
		}
		case 'SET_TASKS': {
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
	return { type : 'REMOVE_TASK', taskId, todolistId };
};
export const addTaskAC = ( title : string, todolistId : string ) : AddTaskActionType => {
	return { type : 'ADD_TASK', title, todolistId };
};
export const changeTaskStatusAC = ( taskId : string, status : TaskStatuses, todolistId : string ) : ChangeTaskStatusType => {
	return { type : 'CHANGE_TASK_STATUS', taskId, status, todolistId };
};
export const changeTaskTitleAC = ( taskId : string, newTitle : string, todolistId : string ) : ChangeTaskTitleType => {
	return { type : 'CHANGE_TASK_TITLE', taskId, newTitle, todolistId };
};
export const setTasksAC = ( tasks : TaskType[], todolistId : string, ) : SetTasksActionType => {
	return { type : 'SET_TASKS', tasks, todolistId };
};

// thunk creator (получение тасок)

export const fetchTasksTC = ( todolistId : string ) => {
	return (
		( dispatch : Dispatch ) => {
			tasksAPI.getTasks ( todolistId )
				.then ( ( res ) => {

					// const tasks = res.data.items;
					// const action = setTasksAC ( tasks, todolistId );
					// dispatch ( action );
					// Заменяем всё одной строкой

					dispatch ( setTasksAC ( res.data.items, todolistId ) );
				} );
		}
	);
};

export const removeTaskTC = ( todolistId : string, taskId : string ) => {
	return (
		( dispatch : Dispatch ) => {
			tasksAPI.deleteTask ( todolistId, taskId )
				.then ( ( res ) => {
					dispatch ( removeTaskAC ( taskId, todolistId ) );
				} );
		}
	);
};

export const addTaskTC = ( todolistId : string, title : string, ) => {
	return (
		( dispatch : Dispatch ) => {
			tasksAPI.createTask ( todolistId, title )
				.then ( ( res ) => {
					dispatch ( addTaskAC ( title, todolistId ) );
				} );
		}
	);
};