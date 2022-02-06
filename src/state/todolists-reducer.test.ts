import { v1 } from 'uuid';
import {
	addTodolistAC,
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	removeTodolistAC,
	setTodolistsAC,
	TaskFilterType,
	TodolistDomainType,
	todolistsReducer
} from './todolists-reducer';
import { TodolistType } from '../api/api';


// тестирование (тест состоит из 3-х частей)
// 1. Стартовые данные
// 2. Action
// 3. Проверка (expect)

export const todolistId1 : string = v1 ();
export const todolistId2 : string = v1 ();

test ( 'correct todolist should be removed', () => {

	const startState : Array<TodolistDomainType> = [
		{
			id : todolistId1,
			title : 'What to learn',
			addedDate : '',
			order : 0,
			filter : 'all'
		},
		{
			id : todolistId2,
			title : 'What to buy',
			addedDate : '',
			order : 0,
			filter : 'all'
		}
	];

	const endState = todolistsReducer ( startState, removeTodolistAC ( todolistId1 ) );

	expect ( endState.length ).toBe ( 1 );
	expect ( endState[ 0 ].id ).toBe ( todolistId2 );
} );

test ( 'correct todolist should be added', () => {

	let todolist : TodolistType = {
		id : '123',
		title : 'New Todolist',
		addedDate : '',
		order : 0
	};

	const startState : Array<TodolistDomainType> = [
		{
			id : todolistId1,
			title : 'What to learn',
			addedDate : '',
			order : 0,
			filter : 'all'
		},
		{
			id : todolistId2,
			title : 'What to buy',
			addedDate : '',
			order : 0,
			filter : 'all'
		}
	];

	const endState = todolistsReducer ( startState, addTodolistAC ( todolist ) );

	expect ( endState.length ).toBe ( 3 );
	expect ( endState[ 2 ].title ).toBe ( todolist.title );
	expect ( endState[ 2 ].filter ).toBe ( 'all' );
} );

test ( 'correct todolist should change its name', () => {

	let newTodolistTitle = 'New Todolist';

	const startState : Array<TodolistDomainType> = [
		{
			id : todolistId1,
			title : 'What to learn',
			addedDate : '',
			order : 0,
			filter : 'all'
		},
		{
			id : todolistId2,
			title : 'What to buy',
			addedDate : '',
			order : 0,
			filter : 'all'
		}
	];

	const endState = todolistsReducer ( startState, changeTodolistTitleAC ( todolistId2, newTodolistTitle ) );

	expect ( endState[ 0 ].title ).toBe ( 'What to learn' );
	expect ( endState[ 1 ].title ).toBe ( newTodolistTitle );
} );

test ( 'correct filter of todolist should be changed', () => {

	let newFilter : TaskFilterType = 'completed';

	const startState : Array<TodolistDomainType> = [
		{
			id : todolistId1,
			title : 'What to learn',
			addedDate : '',
			order : 0,
			filter : 'all'
		},
		{
			id : todolistId2,
			title : 'What to buy',
			addedDate : '',
			order : 0,
			filter : 'all'
		}
	];

	const endState = todolistsReducer ( startState, changeTodolistFilterAC ( todolistId2, newFilter ) );

	expect ( endState[ 0 ].filter ).toBe ( 'all' );
	expect ( endState[ 1 ].filter ).toBe ( newFilter );
} );

test ( 'todolist should be set to the state', () => {

	const startState : Array<TodolistDomainType> = [
		{
			id : todolistId1,
			title : 'What to learn',
			addedDate : '',
			order : 0,
			filter : 'all'
		},
		{
			id : todolistId2,
			title : 'What to buy',
			addedDate : '',
			order : 0,
			filter : 'all'
		}
	];

	const endState = todolistsReducer ( [], setTodolistsAC ( startState ) );

	expect ( endState.length ).toBe ( 2 );
	expect ( endState[ 0 ].title ).toBe ( 'What to learn' );
	expect ( endState[ 1 ].title ).toBe ( 'What to buy' );
} );

