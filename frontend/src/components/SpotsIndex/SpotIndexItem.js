import React from 'react';
// import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchOneSpot } from "../../store/spot"
// import { useDispatch } from 'react-redux';

// import { useSelector } from "react-redux"


import "./SpotIndexItem.css"




const SpotIndexItem = ({ spot }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    //toggle with the import of useSelector
    // const spotState = useSelector(state => state.spots)

    // const singleSpot = spotState.singleSpot

    const handleClick = (e) => {
        e.preventDefault()
        // console.log("clicked")
        dispatch(fetchOneSpot(spot.id))
        history.push(`/spots/${spot.id}`)
    
    }

    useEffect(() => {
        dispatch(fetchOneSpot(spot.id))
    }, [dispatch])

    return (
        <li onClick={handleClick} className='spotIndexItem'>
            

            <div className='spot-card' >
                <div >
                    <img scr={spot.previewImage} alt="not found" />
                    
                </div>
                <div className='card-info' >
                    <div className='card-row1'>
                        <div className='city-state' >
                    {spot.city}, {spot.state}
                        </div>
                    <div className='avg-rating' >&#9733; {spot.avgRating}</div>

                    </div >

                    <div className='card-row2' >
                        <p className='price'>${spot.price} night</p>
                       

                    </div>
                </div>

            </div>
        </li>
    );
};

export default SpotIndexItem;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }









/*
css lecture




*/