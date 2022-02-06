import { addTodolistAC, TodolistDomainType, todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';
import { TasksStateType } from '../app/App';
import { TodolistType } from '../api/api';

test ( 'ids should be equals', () => {
	const startTasksState : TasksStateType = {};
	const startTodolistsState : Array<TodolistDomainType> = [];
	let todolist : TodolistType = {
		id : '123',
		title : 'new todolist',
		addedDate : '',
		order : 0
	};

	const action = addTodolistAC ( todolist );
	const endTasksState = tasksReducer ( startTasksState, action );
	const endTodolistsState = todolistsReducer ( startTodolistsState, action );

	const keys = Object.keys ( endTasksState );
	const idFromTasks = keys[ 0 ];
	const idFromTodolists = endTodolistsState[ 0 ].id;

	expect ( idFromTasks ).toBe ( action.todolist.id );
	expect ( idFromTodolists ).toBe ( action.todolist.id );
} );
