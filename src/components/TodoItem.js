import React, {useCallback, useState} from 'react';
import {useDrag} from 'react-dnd'
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import PropTypes from "prop-types";

function TodoItem(props) {
    let {todo} = props;
    let [dynamicId, setDynamicId] = useState('');
    let [dynamicText, setDynamicText] = useState('');
    let [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    let [isOpenEditModal, setIsOpenEditModal] = useState(false);

    const [{isDragging}, dragRef] = useDrag(() => ({
        type: "todo",
        item: {id: todo.id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }), []);

    const openCloseDeleteModal = useCallback((id) => {
        setDynamicId(id);
        setIsOpenDeleteModal(!isOpenDeleteModal);
    }, [setIsOpenDeleteModal, isOpenDeleteModal]);

    const openCloseEditModal = useCallback((id, text) => {
        setDynamicId(id);
        setDynamicText(text);
        setIsOpenEditModal(!isOpenEditModal);
    }, [setIsOpenEditModal, isOpenEditModal]);

    return (
        <>
            <div className='todo__item' ref={dragRef}>
                <p
                    className="todo__item-text"
                    onClick={() => {
                        openCloseEditModal(todo.id, todo.text)
                    }}
                >
                    {todo.text}
                </p>
                <div className="todo__item__btn">
                    <button
                        className="todo__btn btn"
                        onClick={() => {
                            openCloseDeleteModal(todo.id)
                        }}
                    >
                        Delete
                    </button>
                </div>
                <p className="todo__item__date">
                    {`${todo.isUpdated ? 'Updated' : ''} ${todo.date}`}
                </p>
            </div>

            <DeleteModal
                isOpenDeleteModal={isOpenDeleteModal}
                openCloseDeleteModal={openCloseDeleteModal}
                dynamicId={dynamicId}
            />
            <EditModal
                isOpenEditModal={isOpenEditModal}
                openCloseEditModal={openCloseEditModal}
                dynamicId={dynamicId}
                dynamicText={dynamicText}
            />
        </>
    );
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
}

export default TodoItem;