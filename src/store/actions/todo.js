export const ADD_TODO = 'ADD_TODO';

export function addTodo(todo){
    return{
        type: ADD_TODO,
        payload: {todo}
    }
}

export const CHANGE_TODO = 'CHANGE_TODO';

export function changeTodo(id, prop, value){
    return{
        type: CHANGE_TODO,
        payload: {id, prop, value}
    }
}

export const DELETE_TODO = 'DELETE_TODO';

export function deleteTodo(id){
    return{
        type: DELETE_TODO,
        payload: {id}
    }
}