import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { TaskPriorities, tasksAPI, TasksStateType, TaskStatuses, TaskType, UpdateTaskModelType } from '../api/api';
import { Dispatch } from 'redux';
import { AppRootStateType } from './store';
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from './app-reducer';
import { handleServerErrorAppError, handleServerNetworkAppError } from '../utils/error-utils';

// initial state
const initialState : TasksStateType = {};

// reducer
export const tasksReducer = ( state : TasksStateType = initialState, action : TaskActionType ) : TasksStateType => {
	switch ( action.type ) {
		case 'REMOVE_TASK':
			return { ...state, [ action.todolistId ] : state[ action.todolistId ].filter ( t => t.id !== action.taskId ) };
		case 'ADD_TASK':
			return { ...state, [ action.task.todoListId ] : [action.task, ...state[ action.task.todoListId ]] };
		case 'UPDATE_TASK':
			return {
				...state,
				[ action.todolistId ] : state[ action.todolistId ]
					.map ( t => t.id === action.taskId ? { ...t, ...action.model } : t )
			};
		case 'ADD_TODOLIST':
			return { ...state, [ action.todolist.id ] : [] };
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
		case 'SET_TASKS':
			return { ...state, [ action.todolistId ] : action.tasks };
		default:
			return state;
	}
};

// actions
export const removeTaskAC = ( taskId : string, todolistId : string ) =>
	({ type : 'REMOVE_TASK', taskId, todolistId } as const);
export const addTaskAC = ( task : TaskType ) =>
	({ type : 'ADD_TASK', task } as const);
export const updateTaskAC = ( taskId : string, model : UpdateDomainTaskModelType, todolistId : string ) =>
	({ type : 'UPDATE_TASK', taskId, model, todolistId } as const);
export const setTasksAC = ( tasks : TaskType[], todolistId : string, ) =>
	({ type : 'SET_TASKS', tasks, todolistId } as const);


// thunks
export const fetchTasksTC = ( todolistId : string ) => ( dispatch : ThunkDispatchType ) => {
	dispatch ( setAppStatusAC ( 'loading' ) );
	tasksAPI.getTasks ( todolistId )
		.then ( ( res ) => {

				// const tasks = res.data.items;
				// const action = setTasksAC ( tasks, todolistId );
				// dispatch ( action );
				// Заменяем всё одной строкой

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
type TaskActionType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof updateTaskAC>
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| ReturnType<typeof setTasksAC>
export type UpdateDomainTaskModelType = {
	title? : string
	description? : string
	status? : TaskStatuses
	priority? : TaskPriorities
	startDate? : string
	deadline? : string
}
type ThunkDispatchType = Dispatch<TaskActionType | SetAppStatusActionType | SetAppErrorActionType>


// delete
/*
export const tasksReducer = ( state : TasksStateType = initialState, action : ActionType ) : TasksStateType => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			const filteredTasks = tasks.filter ( t => t.id !== action.taskId );
			stateCopy[ action.todolistId ] = filteredTasks;
			return stateCopy;
		}
		// case 'ADD_TASK': {
		// 	const newTask : TaskType = {
		// 		description : '',
		// 		title : action.title,
		// 		status : TaskStatuses.New,
		// 		priority : TaskPriorities.Low,
		// 		startDate : '',
		// 		deadline : '',
		// 		id : v1 (),
		// 		todoListId : action.todolistId,
		// 		order : 0,
		// 		addedDate : ''
		// 	};
		// 	const stateCopy = { ...state };
		// 	const tasksTodolist = stateCopy[ action.todolistId ];
		// 	stateCopy[ action.todolistId ] = [newTask, ...tasksTodolist];
		// 	return stateCopy;
		// }
		case 'ADD_TASK': {
			const newTask : TaskType = action.task;
			const stateCopy = { ...state };
			const tasksTodolist = stateCopy[ newTask.todoListId ];
			stateCopy[ newTask.todoListId ] = [newTask, ...tasksTodolist];
			return stateCopy;
		}
		case 'UPDATE_TASK': {
			const stateCopy = { ...state };
			const tasks = stateCopy[ action.todolistId ];
			stateCopy[ action.todolistId ] = tasks.map ( t => t.id === action.taskId ? {
				...t,
				...action.model
			} : t );
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
};*/
