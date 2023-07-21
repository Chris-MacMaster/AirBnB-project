import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';

import { useModal } from '../../context/Modal';
import { deleteSpot, fetchOneSpot } from "../../store/spot"
import OpenModalButton from '../OpenModalButton';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PostBookingModal.css"
import { postBooking } from '../../store/booking';


const PostBookingModal = ({ spot }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const userId = user?.id

    const { closeModal } = useModal()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const handlePost = (e) => {
        e.preventDefault()
        const newBooking = {
            spotId: spot.id,
            userId,
            startDate,
            endDate
        }
        dispatch(postBooking(newBooking))
        closeModal()
    }

    const handleNoPost = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (

        <div className='delete-modal-div'>
            <p className='confirm-delete-title confirm-booking'>
                Confirm Booking
            </p>
            <p className='confirm-delete-text'>
                Please select the dates for your booking
            </p>
            <DatePicker className='date-picker' selected={startDate} onChange={(date) => setStartDate(date)} />
            <p className='confirm-delete-text through-text'>
                Until
            </p>
            <DatePicker className='date-picker' selected={endDate} onChange={(date) => setEndDate(date)} />
            <button onClick={handlePost} className='yes-delete-button button white-button' type='button' >Confirm Booking</button>
            <button onClick={handleNoPost} className='no-delete-button button grey-keep' type='button' >Cancel</button>
        </div>



    );
};

export default PostBookingModal;