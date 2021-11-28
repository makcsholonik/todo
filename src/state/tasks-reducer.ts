import { TasksStateType } from '../App';
import { v1 } from 'uuid';

// typing

type ActionType = RemoveTaskActionType
	| AddTaskActionType

export type RemoveTaskActionType = {
	type : 'REMOVE-TASK'
	taskId : string
	todolistId : string
}
export type AddTaskActionType = {
	type : 'ADD-TASK'
	title: string
	todolistId: string
}

// reducer

export const tasksReducer = ( state : TasksStateType, action : ActionType ) : TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = { ...state };
			const tasks = state[ action.todolistId ];
			const filteredTasks = tasks.filter ( t => t.id !== action.taskId );
			stateCopy[ action.todolistId ] = filteredTasks;
			return stateCopy;
		}
		case 'ADD-TASK': {
			const newTask = { id : v1 (), title : action.title, isDone : false }
			const stateCopy = { ...state };
			let tasksTodolist = stateCopy[ action.todolistId ];
			stateCopy[ action.todolistId ] = [newTask, ...tasksTodolist]
			return stateCopy
		}
		default:
			return state;
	}
};

// action creator

export const removeTaskAC = ( taskId : string, todolistId : string ) : RemoveTaskActionType => {
	return { type : 'REMOVE-TASK', taskId : taskId, todolistId : todolistId };
};
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
	return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}