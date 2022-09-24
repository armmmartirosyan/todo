import React, {createRef, useCallback, useEffect, useState} from 'react';
import {addTodo} from "../store/actions/todo";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";

function Form() {
    const dispatch = useDispatch();
    let [value, setValue] = useState('');
    let todoList = useSelector(state => state.todo.todoList);
    let nextId = 0;

    useEffect(() => {
        if (!_.isEmpty(todoList)) nextId = +todoList[todoList.length - 1].id + 1;
    }, [todoList]);

    const handleChangeInput = useCallback((e) => {
        setValue(e.target.value);
    }, [setValue]);

    const handleAddTodo = useCallback((e, text) => {
        e.preventDefault();
        let reg = /^.*\w+.*$/;

        if (reg.test(text)) {
            let date = moment(new Date()).format('L LT');

            dispatch(addTodo({
                id: `${++nextId}`,
                status: 'waiting',
                text: text,
                isUpdated: false,
                nodeRef: createRef(null),
                date,
            }));

            setValue('');
        } else {
            alert('Please enter text');
        }
    }, [dispatch]);

    return (
        <form className="todo__form">
            <input
                type="text"
                className="todo__input"
                value={value}
                onChange={handleChangeInput}
            />
            <button
                className="btn todo__form__btn"
                onClick={(e) => {
                    handleAddTodo(e, value)
                }}
            >
                Add
            </button>
        </form>
    );
}

export default Form;