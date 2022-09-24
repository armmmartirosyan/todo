import React, {useCallback, useEffect, useState} from 'react';
import {changeTodo} from "../store/actions/todo";
import Modal from "react-modal";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment/moment";

function EditModal(props) {
    const dispatch = useDispatch();

    let {isOpenEditModal, openCloseEditModal, dynamicId, dynamicText} = props;
    let [editInputValue, setEditInputValue] = useState(`${dynamicText}`);

    useEffect(() => {
        setEditInputValue(dynamicText);
    }, [dynamicId]);

    const handleEdit = useCallback((e) => {
        e.preventDefault();
        let reg = /^.*\w+.*$/;

        if (reg.test(editInputValue)) {
            let date = new Date();
            date = moment(date).format('L LT');

            dispatch(changeTodo(dynamicId, 'text', editInputValue));
            dispatch(changeTodo(dynamicId, 'isUpdated', true));
            dispatch(changeTodo(dynamicId, 'date', date));
            openCloseEditModal('', '');
            setEditInputValue('');
        } else {
            alert('Please enter value for update text!');
        }
    }, [editInputValue, dispatch, dynamicId, openCloseEditModal]);

    const handleChangeEditInputValue = useCallback((e) => {
        setEditInputValue(e.target.value);
    }, [setEditInputValue]);

    return (
        <Modal
            isOpen={isOpenEditModal}
            bodyOpenClassName='off__scroll'
            className='edit__modal'
            onRequestClose={() => {
                openCloseEditModal('', '');
                setEditInputValue('');
            }}
        >
            <p className="edit__modal__title">Enter text to change.</p>
            <form className="edit__modal__form">
                <input
                    type="text"
                    className="edit__modal__input"
                    value={editInputValue}
                    onChange={handleChangeEditInputValue}/>
                <button
                    className="edit__modal__btn btn"
                    onClick={handleEdit}>
                    Edit
                </button>
                <button
                    className="edit__modal__btn btn"
                    onClick={(e) => {
                        e.preventDefault();
                        openCloseEditModal('', '');
                        setEditInputValue('');
                    }}>
                    Cancel
                </button>
            </form>
        </Modal>
    );
}

EditModal.propTypes = {
    isOpenEditModal: PropTypes.bool.isRequired,
    dynamicId: PropTypes.string.isRequired,
    openCloseEditModal: PropTypes.func.isRequired,
};

export default EditModal;