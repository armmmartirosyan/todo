import {
    ADD_TODO,
    CHANGE_TODO,
    DELETE_TODO,
} from "../actions/todo";

const initialState = {
    todoList: localStorage.hasOwnProperty('persist:root') ?
        JSON.parse(JSON.parse(localStorage.getItem('persist:root')).todo).todoList : [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO: {
            return {
                ...state,
                todoList: [...state.todoList, action.payload.todo],
            }
        }
        case DELETE_TODO: {
            return {
                ...state,
                todoList: [...state.todoList.filter((todo) => (
                    todo.id !== action.payload.id
                ))],
            }
        }
        case CHANGE_TODO: {
            let {id, prop, value} = action.payload;

            return {
                ...state,
                todoList: state.todoList.map((todo) => (
                    todo.id === id ?
                        {...todo, [prop]: value}
                        : todo
                )),
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}