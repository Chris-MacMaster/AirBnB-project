import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

import { useModal } from '../../context/Modal';
import { deleteSpot, fetchOneSpot } from "../../store/spot"
import OpenModalButton from '../OpenModalButton';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PostBookingModal.css"
import { editBooking } from '../../store/booking';


const EditBookingModal = ({ booking }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { closeModal } = useModal()
    const [startDate, setStartDate] = useState(new Date(
        parseInt(booking.startDate.slice(0,4)),
        // date object starts month count at zero
        parseInt(booking.startDate.slice(5,7)) - 1,
        parseInt(booking.startDate.slice(8))
        ));
    const [endDate, setEndDate] = useState(new Date(
        parseInt(booking.endDate.slice(0, 4)),
        parseInt(booking.endDate.slice(5, 7)) - 1,
        parseInt(booking.endDate.slice(8))
    ));


    const handleEdit = (e) => {
        e.preventDefault()
        const startStr = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`
        const endStr = `${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`
        const bookingBody = {
            startDate: startStr,
            endDate: endStr
        }
        console.log(bookingBody)
        dispatch(editBooking(bookingBody, booking.id))
        closeModal()
    }

    const handleNoPost = (e) => {
        e.preventDefault()
        closeModal()
    }

    return (

        <div className='delete-modal-div'>
            <p className='confirm-delete-title confirm-booking'>
                Edit Booking 
            </p>
            <p className='confirm-delete-text'>
                Please select the new dates for your booking
            </p>
            <DatePicker className='date-picker' selected={startDate} onChange={(date) => setStartDate(date)} />
            <p className='confirm-delete-text through-text'>
                Until
            </p>
            <DatePicker className='date-picker' selected={endDate} onChange={(date) => setEndDate(date)} />
            <button onClick={handleEdit} className='yes-delete-button button white-button' type='button' >Edit Booking</button>
            <button onClick={handleNoPost} className='no-delete-button button grey-keep' type='button' >Cancel</button>
        </div>



    );
};

export default EditBookingModal;