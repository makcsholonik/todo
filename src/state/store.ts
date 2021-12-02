import { combineReducers, createStore } from 'redux';
import { todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';


// объединяем редьюсеры в один общий
const rootReducer = combineReducers ( {
	todolists : todolistsReducer,
	tasks : tasksReducer
} );

// типизируем редьюсер
export type AppRootState = ReturnType<typeof rootReducer>

// получаем store
export const store = createStore ( rootReducer );

// @ts-ignore
window.store = store;

