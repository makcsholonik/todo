import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { TasksStateType } from '../App';
import { TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType } from '../api/api';
import { Dispatch } from 'redux';
import { AppRootState } from './store';

// typing

type ActionType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof updateTaskAC>
	| AddTodolistActionType
	| RemoveTodolistActionType
	| SetTodolistsActionType
	| ReturnType<typeof setTasksAC>

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
};

// actions

export const removeTaskAC = ( taskId : string, todolistId : string ) => ({
	type : 'REMOVE_TASK',
	taskId,
	todolistId
} as const);
export const addTaskAC = ( task : TaskType ) => ({ type : 'ADD_TASK', task } as const);
export const updateTaskAC = ( taskId : string, model : UpdateDomainTaskModelType, todolistId : string ) => ({
	type : 'UPDATE_TASK',
	taskId,
	model,
	todolistId
} as const);
export const setTasksAC = ( tasks : TaskType[], todolistId : string, ) => ({
	type : 'SET_TASKS',
	tasks,
	todolistId
} as const);


// thunks

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
					const task = res.data.data.item;
					const action = addTaskAC ( task );
					dispatch ( action );
				} );
		}
	);
};
export type UpdateDomainTaskModelType = {
	title? : string
	description? : string
	status? : TaskStatuses
	priority? : TaskPriorities
	startDate? : string
	deadline? : string
}
export const updateTaskTC = ( taskId : string, domainModel : UpdateDomainTaskModelType, todolistId : string ) => {
	return (
		( dispatch : Dispatch, getState : () => AppRootState ) => {

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
					const action = updateTaskAC ( taskId, domainModel, todolistId );
					dispatch ( action );
				} );
		}
	);
};