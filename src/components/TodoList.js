import React from 'react';
import _ from "lodash";
import {useSelector} from "react-redux";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

export default function TodoList(props) {
    let {status} = props;
    let todoList = useSelector(state => state.todo.todoList);

    return (
        <div className='todo__list__body'>
            {
                !_.isEmpty(todoList) && (
                    <TransitionGroup className="todo-list">
                        {
                            todoList.map((todo) => todo.status === status && (
                                <CSSTransition timeout={500} classNames="animated" key={todo.id}>
                                    <TodoItem todo={todo}/>
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                )
            }
        </div>
    );
}

TodoList.propTypes = {
    status: PropTypes.string.isRequired,
}