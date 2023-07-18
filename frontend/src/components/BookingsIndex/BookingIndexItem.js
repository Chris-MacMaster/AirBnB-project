import React from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import "./BookingIndexItem.css"
import { useSelector } from 'react-redux';
import DeleteBookingModal from './DeleteBookingModal';
import OpenModalStyled from '../OpenModalButton/OpenModalStyled';



const BookingIndexItem = ({ booking }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleUpdate = (e) => {
        e.preventDefault()
        // history.push(`/bookings/manage/${booking.id}`)
    }


    return (
        <li  className='spotIndexItem'>

            <div  className='spot-card-div' >
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
                    <div className='card-row2' >
                        <p className='price'>${booking.Spot.price} <span id='night'>night</span></p>
                    </div>
                </div>
                <div className='booking-dates'>
                    {booking.startDate} - {booking.endDate}
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