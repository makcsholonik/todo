import {
	AddTodolistActionType,
	RemoveTodolistActionType,
	SetTodolistsActionType,
	TodolistsActionTypes
} from './todolists-reducer';
import { TaskPriorities, tasksAPI, TasksStateType, TaskStatuses, TaskType, UpdateTaskModelType } from 'api/api';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from './app-reducer';
import { handleServerErrorAppError, handleServerNetworkAppError } from 'utils/error-utils';

// actions
export enum TasksActionTypes {
	REMOVE_TASK = 'REMOVE_TASK',
	ADD_TASK = 'ADD_TASK',
	UPDATE_TASK = 'UPDATE_TASK',
	// ADD_TODOLIST = 'ADD_TODOLIST',
	// REMOVE_TODOLIST = 'REMOVE_TODOLIST',
	// SET_TODOLISTS = 'SET_TODOLISTS',
	SET_TASKS = 'SET_TASKS'
}

// initial state
const initialState : TasksStateType = {};

// reducer
export const tasksReducer = ( state : TasksStateType = initialState, action : TaskActionType ) : TasksStateType => {
	switch ( action.type ) {
		case TasksActionTypes.REMOVE_TASK:
			return { ...state, [ action.todolistId ] : state[ action.todolistId ].filter ( t => t.id !== action.taskId ) };
		case TasksActionTypes.ADD_TASK:
			return { ...state, [ action.task.todoListId ] : [action.task, ...state[ action.task.todoListId ]] };
		case TasksActionTypes.UPDATE_TASK:
			return {
				...state,
				[ action.todolistId ] : state[ action.todolistId ]
					.map ( t => t.id === action.taskId ? { ...t, ...action.model } : t )
			};
		case TodolistsActionTypes.ADD_TODOLIST:
			return { ...state, [ action.todolist.id ] : [] };
		case TodolistsActionTypes.REMOVE_TODOLIST: {
			const stateCopy = { ...state };
			delete stateCopy[ action.todolistId ];
			return stateCopy;
		}
		case TodolistsActionTypes.SET_TODOLISTS: {
			const stateCopy = { ...state };
			action.todolists.forEach ( tl => {
				stateCopy[ tl.id ] = [];
			} );
			return stateCopy;
		}
		case TasksActionTypes.SET_TASKS:
			return { ...state, [ action.todolistId ] : action.tasks };
		default:
			return state;
	}
};

// action creators
export const removeTaskAC = ( taskId : string, todolistId : string ) =>
	({ type : TasksActionTypes.REMOVE_TASK, taskId, todolistId } as const);
export const addTaskAC = ( task : TaskType ) =>
	({ type : TasksActionTypes.ADD_TASK, task } as const);
export const updateTaskAC = ( taskId : string, model : UpdateDomainTaskModelType, todolistId : string ) =>
	({ type : TasksActionTypes.UPDATE_TASK, taskId, model, todolistId } as const);
export const setTasksAC = ( tasks : TaskType[], todolistId : string, ) =>
	({ type : TasksActionTypes.SET_TASKS, tasks, todolistId } as const);


// thunk creators
export const fetchTasksTC = ( todolistId : string ) => ( dispatch : ThunkDispatchType ) => {
	dispatch ( setAppStatusAC ( 'loading' ) );
	tasksAPI.getTasks ( todolistId )
		.then ( ( res ) => {
				dispatch ( setTasksAC ( res.data.items, todolistId ) );
				dispatch ( setAppStatusAC ( 'succeeded' ) );
			}
		);
};
export const removeTaskTC = ( todolistId : string, taskId : string ) => ( dispatch : ThunkDispatchType ) => {
	tasksAPI.deleteTask ( todolistId, taskId )
		.then ( ( res ) => {
				dispatch ( removeTaskAC ( taskId, todolistId ) );
			}
		);
};
export const addTaskTC = ( todolistId : string, title : string, ) => ( dispatch : ThunkDispatchType ) => {
	dispatch ( setAppStatusAC ( 'loading' ) );
	tasksAPI.createTask ( todolistId, title )
		.then ( ( res ) => {
			if (res.data.resultCode === 0) {
				dispatch ( addTaskAC ( res.data.data.item ) );
				dispatch ( setAppStatusAC ( 'succeeded' ) );
			} else {
				handleServerErrorAppError ( res.data, dispatch );
			}
		} )
		.catch ( ( error ) => {
				handleServerNetworkAppError ( error, dispatch );
			}
		);
};
export const updateTaskTC = ( taskId : string, domainModel : UpdateDomainTaskModelType, todolistId : string ) =>
	( dispatch : ThunkDispatchType, getState : () => AppRootStateType ) => {
		dispatch ( setAppStatusAC ( 'loading' ) );
		// Получаем state
		const state = getState ();
		// Получаем таску нужного тудулиста
		const task = state.tasks[ todolistId ].find ( t => t.id === taskId );
		// Прерываем если таска не нашлась
		if ( !task) {
			console.warn ( 'task not found in the state' );
			return;
		}
		const apiModel : UpdateTaskModelType = {
			title : task.title,
			description : task.description,
			priority : TaskPriorities.Low,
			startDate : task.startDate,
			deadline : task.deadline,
			status : task.status,
			...domainModel
		};
		tasksAPI.updateTasks ( todolistId, taskId, apiModel )
			.then ( ( res ) => {
				if (res.data.resultCode === 0) {
					dispatch ( updateTaskAC ( taskId, domainModel, todolistId ) );
					dispatch ( setAppStatusAC ( 'succeeded' ) );
				} else {
					handleServerErrorAppError ( res.data, dispatch );
				}
			} )
			.catch ( ( error ) => {
					handleServerNetworkAppError ( error, dispatch );
				}
			);
	};

// types
export type UpdateDomainTaskModelType = {
	title? : string
	description? : string
	status? : TaskStatuses
	priority? : TaskPriorities
	startDate? : string
	deadline? : string
}
type TaskActionType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof updateTaskAC>
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| ReturnType<typeof setTasksAC>
type ThunkDispatchType = Dispatch<TaskActionType | SetAppStatusActionType | SetAppErrorActionType>