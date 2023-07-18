import React from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import "./BookingIndexItem.css"
import { useSelector } from 'react-redux';
import DeleteBookingModal from './DeleteBookingModal';
import OpenModalStyled from '../OpenModalButton/OpenModalStyled';
import { fetchOneSpot } from '../../store/spot';



const BookingIndexItem = ({ booking }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleUpdate = (e) => {
        e.preventDefault()
        // history.push(`/bookings/manage/${booking.id}`)
    }

    const convertDate = (dateStr) => {
        return dateStr.slice(5)
    }

    const dateYear = (dateStr) => {
        return dateStr.slice(0, 4)
    }

    const handleClickBooking = (e) => {
        e.preventDefault()
        // console.log("clicked")
        dispatch(fetchOneSpot(booking.Spot.id))
        history.push(`/spots/detail/${booking.Spot.id}`)

    }

    return (
        <li  className='spotIndexItem'>

            <div onClick={handleClickBooking} className='spot-card-div' >
                <div className='spot-name'>
                    {booking.Spot.name}
                </div>
                <div >
                    <img id='prev-img' src={booking.Spot.previewImage} alt='Invalid URL' />
                </div>
                <div className='card-info' >
                    <div className='card-row1'>
                        <div className='city-state' >
                            {booking.Spot.city}, {booking.Spot.state} 
                        </div>
                    </div >
                    <div className='booking-dates'>
                        {dateYear(booking.startDate)} {convertDate(booking.startDate)} - {convertDate(booking.endDate)}
                    </div>
                </div>

            </div>

            <div className='bookings-buttons-div'>
                    <button onClick={handleUpdate} className='button update-booking' type='button' >Update</button>
                    <OpenModalStyled buttonText="Delete" modalComponent={<DeleteBookingModal booking={booking} />} />
            </div>
        </li>
    );
};

export default BookingIndexItem;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }









/*
css lecture




*/