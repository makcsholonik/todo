import axios from 'axios';

const instance = axios.create ( {
	baseURL : '',
	withCredentials : true,
	headers : {
		'api-key' : ''
	}
} );

export const todolistAPI = {
	getTodolists () {
		return instance.get ();
	},
	createTodolist () {
		return instance.post ();
	},
	deleteTodolist () {
		return instance.delete ();
	},
	updateTodolistTitle () {
		return instance.put ();
	}
};