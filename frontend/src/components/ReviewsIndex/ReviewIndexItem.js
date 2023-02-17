import React from 'react';
// import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchOneSpot } from "../../store/spot"

import { fetchReviews } from '../../store/review';
// import { useDispatch } from 'react-redux';

// import { useSelector } from "react-redux"


import "./ReviewIndexItem.css"
import OpenModalButton from '../OpenModalButton';

import ReviewDeleteModal from '../ReviewDeleteModal/ReviewDeleteModal';




const ReviewIndexItem = ({ review }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    // console.log(review)


    // useEffect(() => {
    //     dispatch(fetchReviews(review.id))
    // }, [dispatch])
    // console.log("REVIEW UPDATED AT", review.updatedAt)
    let date = new Date(review.updatedAt)

    // console.log("PRE FORMATTED DATE", date.toLocaleDateString())

    let preFormatted = date.toLocaleDateString()


    
    const postSplit = preFormatted.split("/")
    
    let dateString = postSplit[2].concat("/", postSplit[0], "/", postSplit[1])


    // console.log(postFormatted)


    // let updated = review.updatedAt


    // console.log("DATE STRING", updated)

    // if (!review) {
    //     return null
    // }

    if (!review) {
        return null
    }

    return (
        <li /*onClick={handleClick}*/ className='spotIndexItem'>

            <div className='review-card' >
                <div >
                    {review.User.firstName} {review.User.lastName}
                </div>

                <div >
                    {dateString}
                </div>

                <div >
                    {review.review}
                </div>

                <div >
                    <OpenModalButton review={review} buttonText="Delete Review" modalComponent={<ReviewDeleteModal review={review} />} />
                    {/* <button type='button'>Delete Button No Work Yet</button> */}
                </div>
            </div>
        </li>
    );
};

export default ReviewIndexItem;








//toggle with the import of useSelector
// const spotState = useSelector(state => state.spots)

// const singleSpot = spotState.singleSpot

// const handleClick = (e) => {
//     e.preventDefault()
//     // console.log("clicked")
//     dispatch(fetchOneSpot(spot.id))
//     history.push(`/spots/${spot.id}`)

// }

// useEffect(() => {
// dispatch(fetchOneSpot(spot.id))
// }, [dispatch])