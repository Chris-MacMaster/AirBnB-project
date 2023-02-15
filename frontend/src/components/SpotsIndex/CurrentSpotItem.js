import React from 'react';
// import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

import { deleteSpot, fetchOneSpot } from "../../store/spot"
import "./CurrentSpotItem.css"
// import { useDispatch } from 'react-redux';

// import { useSelector } from "react-redux"


// import "./SpotIndexItem.css"




const CurrentSpotItem = ({ spot }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    
    const handleDelete = (e) => {
        e.preventDefault()
        // console.log("delete button test")
        dispatch(deleteSpot(spot.id))
        // history.push(`/spots/${spot.id}`)
        history.push(`/spots/current`)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log("update button test")
        history.push(`/spots/current/${spot.id}`)
    }
    


    return (
        <li className='CurrentspotIndexItem'>

            <div className='current-spot-card' >
                <div >
                    <img scr={spot.previewImage} alt="not found" />

                </div>
                <div className='current-card-info' >
                    <div className='current-card-row1'>
                        <div className='current-city-state' >
                            {spot.city}, {spot.state}
                        </div>
                        <div className='current-avg-rating' >&#9733; {spot.avgRating}</div>

                    </div >
                    <div className='current-card-row2'>
                        <p className='current-price'>${spot.price} night</p>
                        <div className='div-buttons'>
                            <button onClick={handleUpdate} className='update-button button' type='button' >Update</button>
                            <button onClick={handleDelete} className='delete-button button' type='button' >Delete</button>
                        </div>
                    </div>
                </div>

            </div>
        </li>
    );
};

export default CurrentSpotItem;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }









/*
css lecture




*/