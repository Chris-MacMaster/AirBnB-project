import React from 'react';
// import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';


import { Modal, useModal } from '../../context/Modal';
import { deleteReview } from '../../store/review';

import { deleteSpot, fetchOneSpot } from "../../store/spot"
// import OpenModalButton from '../OpenModalButton';


import "../SpotsIndex/DeleteSpotModal.css"

const ReviewDeleteModal = ({ review }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { closeModal } = useModal()



    const handleDelete = (e) => {
        e.preventDefault()

        dispatch(deleteReview(review.id))
        // history.push(`/spots/${spot.id}`)
        closeModal()
    }

    const handleNoDelete = (e) => {
        e.preventDefault()
        closeModal()

        // history.push(`/spots/current`)

    }

    return (

        <div className='delete-modal-div'>
            <p className='confirm-delete-title'>
                Confirm Delete
            </p>
            <p className='confirm-delete-text'>
                Are you sure you want to delete this review?
            </p>
            <button onClick={handleDelete} className='yes-delete-button button' type='button' >Yes (Delete Review)</button>
            <button onClick={handleNoDelete} className='no-delete-button button' type='button' >No (Keep Review)</button>
        </div>



    );
};

export default ReviewDeleteModal;