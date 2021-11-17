import React from 'react';
import { TaskFilterType, TasksType } from '../App';

type TodolistPropsType = {
	title : string
	tasks : Array<TasksType>
	removeTask : ( id : string ) => void
	changeFilter: (filter: TaskFilterType) => void
}

export function Todolist ( props : TodolistPropsType ) {
	return (
		<div>
			<h3>{ props.title }</h3>
			<div>
				<input/>
				<button>+</button>
			</div>
			<ul>
				{/*Отрисовка тасок*/ }
				{
					props.tasks.map ( ( t ) => {
						return (
							<li key={t.id}>
								<input type="checkbox" checked={ t.isDone }/>
								<span>{ t.title }</span>
								<button onClick={ () => props.removeTask ( t.id ) }>x</button>
							</li>
						);
					} )
				}
			</ul>
			<div>
				<button onClick={() => props.changeFilter('all')}>All</button>
				<button onClick={() => props.changeFilter('active')}>Active</button>
				<button onClick={() => props.changeFilter('completed')}>Completed</button>
			</div>
		</div>
	);
}