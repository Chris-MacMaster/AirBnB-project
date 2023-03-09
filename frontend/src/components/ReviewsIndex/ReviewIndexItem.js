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




const ReviewIndexItem = ({ review, spotId }) => {
    const history = useHistory()
    const dispatch = useDispatch()


    // const spotState = useSelector(state => state.spots)

    // console.log(review)


    useEffect(() => {
        // dispatch(fetchOneSpot(spotId))
        // dispatch(fetchReviews(spotId))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(fetchReviews(review.id))
    // }, [dispatch])
    // console.log("REVIEW UPDATED AT", review.updatedAt)
    let date = new Date(review.updatedAt)

    // console.log("PRE FORMATTED DATE", date.toLocaleDateString())

    let preFormatted = date.toLocaleDateString()
    
    const postSplit = preFormatted.split("/")
    // console.log("REVIEW", review)
    
    let dateString = postSplit[2].concat("-", postSplit[0], "-", postSplit[1])


    if (!review.User) {
        return null
    }

    return (
        <li /*onClick={handleClick}*/ className='spotIndexItem reviewIndexItem'>

            <div className='review-card' >
                {/* {review.User.lastName} */}
                <div className='user-firstname'>
                    {review.User.firstName} 
                </div>

                <div className='date-string-text'>
                    {dateString}
                </div>

                <div className='review-review-text'>
                    <p>
                        {review.review}
                    </p>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>

                <div >
                    <OpenModalButton review={review} buttonText="Delete Review" modalComponent={<ReviewDeleteModal review={review} spotId={spotId} />} />
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