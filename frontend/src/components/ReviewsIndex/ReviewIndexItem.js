import React from 'react';
// import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
import { useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchOneSpot } from "../../store/spot"

import { fetchReviews } from '../../store/review';
// import { useDispatch } from 'react-redux';

import { useSelector } from "react-redux"


import "./ReviewIndexItem.css"
import OpenModalButton from '../OpenModalButton';

import ReviewDeleteModal from '../ReviewDeleteModal/ReviewDeleteModal';
import ManageReviewDeleteModal from '../ReviewDeleteModal/ManageReviewDeleteModal';
import OpenModalStyled from '../OpenModalButton/OpenModalStyled';




const ReviewIndexItem = ({ review, spotId, otherButton }) => {
    const history = useHistory()
    const dispatch = useDispatch()


    // const spotState = useSelector(state => state.spots)

    // console.log(review)


    useEffect(() => {
        console.log("MONTH TO NAME OF 3", monthToName(3))
        // dispatch(fetchOneSpot(spotId))
        // dispatch(fetchReviews(spotId))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(fetchReviews(review.id))
    // }, [dispatch])
    // console.log("REVIEW UPDATED AT", review.updatedAt)
    // if ()
    let date = new Date(review.updatedAt)
    // let otherButton

    // console.log("PRE FORMATTED DATE", date.toLocaleDateString())

    let preFormatted = date.toLocaleDateString()
    
    const postSplit = preFormatted.split("/")
    // console.log("POST SPLIT", postSplit)
    //postSplit[0] === date as number
   let splitMonthNum = postSplit[0]
//    console.log("SPLIT MONTH NUM", splitMonthNum)
   let monthName = monthToName(parseInt(splitMonthNum))
//    console.log("MONTH NAME", monthName)

   

    const userState = useSelector(state => state.session.user)
    const userId = userState?.id
    
    const isReviewUser = (userId === review.userId)
    // console.log("REVIEW", review)
    
    let dateString = postSplit[2]?.concat("-", postSplit[0], "-", postSplit[1])
    if (!postSplit) {
        return null
    }
    // let year = postSplit?[2]
    let dateStringMonth = monthName?.concat(" ", postSplit[2])


    if (!review.User) {
        return null
    }

    const handleUpdate = (e) => {
        e.preventDefault()


        history.push(`/reviews/manage/${review.id}`)
    }

    return (
        <li /*onClick={handleClick}*/ className='reviewIndexItem'>

            <div className='review-card' >
                {/* {review.User.lastName} */}
                <div className='user-firstname'>
                    {review.User.firstName} 
                </div>

                <div className='date-string-text'>
                    {/* {dateString} */}
                    {dateStringMonth}
                </div>

                <div className='review-review-text'>
                    <p>
                        {review.review}
                    </p>
                </div>
                
                <div >
                    {(isReviewUser && otherButton !== true) && <OpenModalStyled review={review} buttonText="Delete Review" modalComponent={<ReviewDeleteModal review={review} spotId={spotId} />} />}
                </div>
                <div className='review-buttons'>
                <div >
                        {(otherButton === true) && <OpenModalStyled review={review} buttonText="Delete Review" modalComponent={<ManageReviewDeleteModal loadUser={true} review={review} spotId={spotId} />} />}
                </div>
                <div >
                        {(otherButton === true) && <button onClick={handleUpdate} className='update-button button update-styled'>Update Review</button>}
                </div>

                </div>
            </div>
        </li>
    );
};

export default ReviewIndexItem;



export const monthToName = (num) => {
    switch (num) {
        case 1:
            return "January"
        case 2: 
            return "February"
        case 3:
            return "March"
        case 4:
            return "April"
        case 5:
            return "May"
        case 6:
            return "June"
        case 7:
            return "July"
        case 8:
            return "August"
        case 9:
            return "September"
        case 10:
            return "October"
        case 11:
            return "November"
        case 12:
            return "December"
        default:
            return num
    }
}


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