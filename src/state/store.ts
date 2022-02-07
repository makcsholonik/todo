import { applyMiddleware, combineReducers, createStore } from 'redux';
import { todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';
import thunk from 'redux-thunk';
import { appReducer } from './app-reducer';


// объединяем редьюсеры в один общий
const rootReducer = combineReducers ( {
	todolists : todolistsReducer,
	tasks : tasksReducer,
	app : appReducer
} );

// типизируем редьюсер
export type AppRootStateType = ReturnType<typeof rootReducer>

// получаем store
export const store = createStore ( rootReducer, applyMiddleware ( thunk ) );

// @ts-ignore
window.store = store;

