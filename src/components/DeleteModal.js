import React from 'react';
import {deleteTodo} from "../store/actions/todo";
import Modal from "react-modal";
import {useDispatch} from "react-redux";
import PropTypes from 'prop-types';

function DeleteModal(props) {
    const dispatch = useDispatch();
    let {isOpenDeleteModal, openCloseDeleteModal, dynamicId} = props;

    return (
        <Modal
            isOpen={isOpenDeleteModal}
            bodyOpenClassName='off__scroll'
            className='delete__modal'
            onRequestClose={() => {
                openCloseDeleteModal('')
            }}
        >
            <p className='delete__modal__question'>Do you really want to delete this todo?</p>
            <div className="delete__modal__box">
                <button
                    className="delete__modal__btn btn"
                    onClick={() => {
                        dispatch(deleteTodo(dynamicId));
                        openCloseDeleteModal('');
                    }}>
                    Yes
                </button>
                <button
                    className="delete__modal__btn btn"
                    onClick={() => {
                        openCloseDeleteModal('')
                    }}>
                    No
                </button>
            </div>
        </Modal>
    );
}

DeleteModal.propTypes = {
    isOpenDeleteModal: PropTypes.bool.isRequired,
    openCloseDeleteModal: PropTypes.func.isRequired,
    dynamicId: PropTypes.string.isRequired,
};

export default DeleteModal;