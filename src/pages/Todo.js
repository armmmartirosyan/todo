import React, {useCallback} from 'react';
import Form from "../components/Form";
import TodoList from "../components/TodoList";
import {useDrop} from "react-dnd";
import {changeTodo} from "../store/actions/todo";
import {useDispatch} from "react-redux";

function Todo() {
    const dispatch = useDispatch();

    const [{isOverWaiting}, dropRefWaiting] = useDrop(() => ({
        accept: "todo",
        drop: (item) => changeTodoStatus(item.id, 'waiting'),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const [{isOverProcess}, dropRefProcess] = useDrop(() => ({
        accept: "todo",
        drop: (item) => changeTodoStatus(item.id, 'inProgress'),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const [{isOverDone}, dropRefDone] = useDrop(() => ({
        accept: "todo",
        drop: (item) => changeTodoStatus(item.id, 'done'),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));

    const changeTodoStatus = useCallback((id, status) => {
        dispatch(changeTodo(id, 'status', status));
    }, [dispatch]);

    return (
        <div className="todo">
            <Form/>
            <div className="todo__container">
                <div className="todo__list todo__all__list" ref={dropRefWaiting}>
                    <h3 className="todo__list__title">Todos</h3>
                    <TodoList status='waiting'/>
                </div>
                <div className="todo__list todo__progress__list" ref={dropRefProcess}>
                    <h3 className="todo__list__title">In progress todos</h3>
                    <TodoList status='inProgress'/>
                </div>
                <div className="todo__list todo__done__list" ref={dropRefDone}>
                    <h3 className="todo__list__title">Done todos</h3>
                    <TodoList status='done'/>
                </div>
            </div>
        </div>
    );
}

export default Todo;