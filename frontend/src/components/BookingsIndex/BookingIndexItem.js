import React from 'react';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';


const BookingIndexItem = ({ booking }) => {
    const history = useHistory()
    const dispatch = useDispatch()


    return (
        <li  className='spotIndexItem'>

            <div className='spot-card-div' >
               <p >
                ID: {booking.id}
               </p>
               <p >
                
               </p>

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