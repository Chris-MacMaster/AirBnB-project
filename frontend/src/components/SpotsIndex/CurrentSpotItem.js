import React from 'react';
// import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';

import { deleteSpot, fetchOneSpot } from "../../store/spot"
import OpenModalButton from '../OpenModalButton';
import "./CurrentSpotItem.css"
// import { useDispatch } from 'react-redux';

// import { useSelector } from "react-redux"
import DeleteSpotModal from "./DeleteSpotModal.js"
// import 

import "./SpotIndexItem.css"




const CurrentSpotItem = ({ spot }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        // console.log("clicked")
        dispatch(fetchOneSpot(spot.id))
        history.push(`/spots/${spot.id}`)

    }
    // to go when the tile needs to redirect
    // onClick = { handleClick }


    
    const handleDelete = (e) => {
        e.preventDefault()

        

        // <OpenModalButton />
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
        <li  className='spotIndexItem'>

            <div  className='spot-card-div current-card-div' >
                <div className='spot-name'>
                    {spot.name}
                </div>
                <div >
                    <img src={spot.previewImage}
                        alt='previewImage' />

                </div>
                <div className='card-info' >
                    <div className='card-row1'>
                        <div className='city-state' >
                            {spot.city}, {spot.state}
                        </div>
                        <div className='avg-rating' >&#9733; 
                            {/* {spot.avgRating} */}
                            {spot.avgRating !== "no reviews exist for this spot yet" ? spot.avgRating : "New"}
                        </div>

                    </div >
                    <div className='card-row2'>
                        <p className='price'>${spot.price} night</p>
                        <div className='div-buttons'>
                            <button onClick={handleUpdate} className='update-button button' type='button' >Update</button>
                            <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpotModal spot={spot} />}/>
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