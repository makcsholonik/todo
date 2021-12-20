import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer';
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer';
import { TasksStateType } from '../App';
import { TaskPriorities, TaskStatuses } from '../api/api';

test ( 'correct task should be deleted from correct array', () => {
	const startState : TasksStateType = {
		'todolistId1' : [
			{
				description : '',
				title : 'CSS',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'JS',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'React',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			}
		],
		'todolistId2' : [
			{
				description : '',
				title : 'bread',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'milk',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'tea',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			}
		]
	};

	const endState = tasksReducer ( startState, removeTaskAC ( '2', 'todolistId2' ) );

	expect ( endState[ 'todolistId1' ].length ).toBe ( 3 );
	expect ( endState[ 'todolistId2' ].length ).toBe ( 2 );
	expect ( endState[ 'todolistId2' ].every ( t => t.id != '2' ) ).toBeTruthy ();
	expect ( endState[ 'todolistId2' ][ 0 ].id ).toBe ( '1' );
	expect ( endState[ 'todolistId2' ][ 1 ].id ).toBe ( '3' );
} );

test ( 'correct task should be added to correct array', () => {
	const startState : TasksStateType = {
		'todolistId1' : [
			{
				description : '',
				title : 'CSS',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'JS',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'React',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			}
		],
		'todolistId2' : [
			{
				description : '',
				title : 'bread',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'milk',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'tea',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			}
		]
	};

	const endState = tasksReducer ( startState, addTaskAC ( 'juce', 'todolistId2' ) );

	expect ( endState[ 'todolistId1' ].length ).toBe ( 3 );
	expect ( endState[ 'todolistId2' ].length ).toBe ( 4 );
	expect ( endState[ 'todolistId2' ][ 0 ].id ).toBeDefined ();
	expect ( endState[ 'todolistId2' ][ 0 ].title ).toBe ( 'juce' );
} );

test ( 'status of specified task should be changed', () => {
	const startState : TasksStateType = {
		'todolistId1' : [
			{
				description : '',
				title : 'CSS',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'JS',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'React',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			}
		],
		'todolistId2' : [
			{
				description : '',
				title : 'bread',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'milk',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'tea',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			}
		]
	};

	const endState = tasksReducer ( startState, changeTaskStatusAC ( '2', TaskStatuses.Completed, 'todolistId2' ) );

	expect ( endState[ 'todolistId2' ][ 1 ].status ).toBeFalsy ();
	expect ( endState[ 'todolistId1' ][ 1 ].status ).toBeTruthy ();
} );

test ( 'title of specified task should be changed', () => {
	const startState : TasksStateType = {
		'todolistId1' : [
			{
				description : '',
				title : 'CSS',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'JS',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'React',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			}
		],
		'todolistId2' : [
			{
				description : '',
				title : 'bread',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'milk',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'tea',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			}
		]
	};

	const endState = tasksReducer ( startState, changeTaskTitleAC ( '2', 'Milkyway', 'todolistId2' ) );

	expect ( endState[ 'todolistId2' ][ 1 ].title ).toBe ( 'Milkyway' );
	expect ( endState[ 'todolistId1' ][ 1 ].title ).toBe ( 'JS' );
} );

test ( 'new array should be added when new todolist is added', () => {
	const startState : TasksStateType = {
		'todolistId1' : [
			{
				description : '',
				title : 'CSS',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'JS',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'React',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			}
		],
		'todolistId2' : [
			{
				description : '',
				title : 'bread',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'milk',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'tea',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			}
		]
	};

	const endState = tasksReducer ( startState, addTodolistAC ( 'new todolist' ) );

	const keys = Object.keys ( endState );
	const newKey = keys.find ( k => k != 'todolistId1' && k != 'todolistId2' );
	if ( !newKey) {
		throw Error ( 'new key should be added' );
	}

	expect ( keys.length ).toBe ( 3 );
	expect ( endState[ newKey ] ).toEqual ( [] );
} );

test ( 'property with todolistId should be deleted', () => {
	const startState : TasksStateType = {
		'todolistId1' : [
			{
				description : '',
				title : 'CSS',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'JS',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'React',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId1',
				order : 0,
				addedDate : ''
			}
		],
		'todolistId2' : [
			{
				description : '',
				title : 'bread',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '1',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'milk',
				status : TaskStatuses.Completed,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '2',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			},
			{
				description : '',
				title : 'tea',
				status : TaskStatuses.New,
				priority : TaskPriorities.Low,
				startDate : '',
				deadline : '',
				id : '3',
				todoListId : 'todolistId2',
				order : 0,
				addedDate : ''
			}
		]
	};

	const endState = tasksReducer ( startState, removeTodolistAC ( 'todolistId2' ) );

	const keys = Object.keys ( endState );

	expect ( keys.length ).toBe ( 1 );
	expect ( endState[ 'todolistId2' ] ).not.toBeDefined ();
} );

test ( 'empty arrays should be added when we set todolist ', () => {

	const action = setTodolistsAC ( [
		{ id : '1', title : 'title 1', order : 0, addedDate : '' },
		{ id : '2', title : 'title 2', order : 0, addedDate : '' }
	] );

	const endState = tasksReducer ( {}, action );

	const keys = Object.keys ( endState );

	expect ( keys.length ).toBe ( 2 );
	expect ( endState[ '1' ] ).toBeDefined ();
	expect ( endState[ '2' ] ).toBeDefined ();
} );




