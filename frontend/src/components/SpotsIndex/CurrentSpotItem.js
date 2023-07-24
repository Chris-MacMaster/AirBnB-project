import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';

import { deleteSpot, fetchOneSpot } from "../../store/spot"
import OpenModalButton from '../OpenModalButton';
import "./CurrentSpotItem.css"

import DeleteSpotModal from "./DeleteSpotModal.js"

import "./SpotIndexItem.css"
import OpenModalStyled from '../OpenModalButton/OpenModalStyled';




const CurrentSpotItem = ({ spot }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(fetchOneSpot(spot.id))
        history.push(`/spots/${spot.id}`)

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        if (user) {
            history.push(`/spots/manage/${spot.id}`)
        }
    }


   function toDecimal(num) {
        const convertedNum = `${num}`

        if (convertedNum.length >= 4) {
            return convertedNum.slice(0, 4)
        } else {
            if (!convertedNum.includes("0")) {
                return convertedNum.concat(".0")
            }
        }
        return convertedNum
    }

    return (
        <li className='spotIndexItem current-card-div'>

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
                            {spot.avgRating !== "no reviews exist for this spot yet" ? toDecimal(spot.avgRating) : "New"}
                        </div>

                    </div >
                    <div className='card-row2'>
                        <p className='price'>${spot.price} night</p>
                        <div className='div-buttons'>
                            <button onClick={handleUpdate} className='update-button button' type='button' >Update</button>
                            <OpenModalStyled buttonText="Delete" modalComponent={<DeleteSpotModal spot={spot} />}/>
                        </div>
                    </div>
                </div>

            </div>
        </li>
    );
};

export default CurrentSpotItem;





