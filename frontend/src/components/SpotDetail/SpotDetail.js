import React from 'react';
import { useSelector } from 'react-redux';
import { fetchOneSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { fetchReviews } from "../../store/review"
import { useEffect } from 'react';
import  ReviewForm  from "../SpotForm/CreateReview"
import ReviewIndexItem from '../ReviewsIndex/ReviewIndexItem';
import { useParams } from 'react-router-dom';
import "./SpotDetail.css"
import OpenModalButton from '../OpenModalButton';
import { normalizeArr } from '../../store/spot';
import {useState} from "react"
import OpenModalStyled from '../OpenModalButton/OpenModalStyled';
import PostBookingModal from '../BookingsIndex/PostBookingModal';
import OpenModalReserve from '../OpenModalButton/OpenModalReserve';

// testing datepicker
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const SpotDetail = () => {
    const dispatch = useDispatch()
    const spotState = useSelector(state => state.spots)
    const user = useSelector(state => state.session.user)

    const userId = user?.id

    let spot = spotState.singleSpot
    let spotImagesArr = spot.SpotImages

    const reviewState = useSelector(state => state.reviews.spot)
    const reviews = Object.values(reviewState)

    const [hasReview, setHasReview] = useState(false)
    // const [startDate, setStartDate] = useState(new Date());

    const checkReview = (reviews) => {
        
        for (let i = 0; i < reviews.length; i++) {
            let review = reviews[i]

            if (review.userId === userId) {
                return true
            }
        }
        return false
    }

    useEffect(() => {
        
        
        if (checkReview(reviews) === true) {
            setHasReview(true)
        } 
        else if (checkReview(reviews) === false) {
            setHasReview(false)
        }

    }, [reviewState, reviews])

    const yourReviewExists = (reviewState) => {
        if (reviewState && reviewState.user) {
            for (const key in reviewState){
                const reviewAuthorUserID = reviewState[key].userId
                console.log("KEY USER ID", key)
                console.log("USER.ID", user.id)
                if (reviewAuthorUserID === user.id){
                    return true
                }
            }
        }
        return false
    }

    const checkNoReviews = () => {
        if (!reviewState) {
            return true
        }
        return false
    }

    const isOwner = (spot?.Owner?.id === user?.id)
    const notOwnerLogged = !isOwner && user

    let {spotId} = useParams()

    useEffect(() => {
        dispatch(fetchOneSpot(spotId))
        dispatch(fetchReviews(spotId))
    }, [dispatch, spotId])

    if (!spot.Owner) {
        return null
    }

    if (!Object.values(reviewState)) {
        return null
    }

    const getReviewsTest = () => {
        dispatch(fetchReviews(spotId))
    }

    const handleReserve = () => {
        window.alert("Feature Coming Soon...")
    }

    function toDecimal(num) {
        const convertedNum = `${num}`

        if (convertedNum.length >= 4) {
            return convertedNum.slice(0, 4)
        } else if (convertedNum.length === 3) {
            return convertedNum
        } else {
            if (!convertedNum.includes("0")) {
                return convertedNum.concat(".0")
            }
        }
        return convertedNum
    }

    if (!reviewState) {
        return null
    }


    return (
    <div >
        <h1 >

        </h1>
            <p className='spot-name'>
                {spot.name}
            </p>
            <div >
                <p className='spot-line2'>
                {spot.city}, {spot.state}, {spot.country}, 

                </p>
            </div>

            <div className='spot-images-div'>
                <div className='preview-image'>
                    {/* src={spotImagesArr.length && spotImagesArr[0].url} */}
                    
                    <img className="preview-image-url detail-img" src={spotImagesArr.length && spotImagesArr[0].url}
                    alt='previewImage' />
                </div>

                <div className='spot-images-subdiv'>
                    <div className='images-subdiv-row1'>
                        <div id='spot-image-1'>
                            {/* src={(spotImagesArr.length >= 2) && spotImagesArr[1].url} */}
                            <img className='detail-img' id='img1' src='https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800'
                            alt='visual-content-1' />
                        </div>

                        <div id='spot-image-2'>
                            {/* src={(spotImagesArr.length >= 3) && spotImagesArr[2].url} */}
                            <img className='detail-img' id='img2' src='https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                alt='visual-content-2' />
                        </div>
                    </div>

                    <div className='images-subdiv-row2'>
                        <div id='spot-image-3'>
                            {/* src={(spotImagesArr.length >= 4) && spotImagesArr[3].url} */}
                            <img className='detail-img' id='img3' src='https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg'
                                alt='visual-content-3' />
                        </div>

                        <div id='spot-image-4'>
                            {/* src={(spotImagesArr.length >= 5) && spotImagesArr[4].url} */}
                            <img className='detail-img' id='img4' src='https://images.pexels.com/photos/813692/pexels-photo-813692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                alt='visual-content-4' />
                        </div>

                    </div>

                </div>

            </div>


            <div className='hosted-row'>
                <div className='hosted-div'>
                    <p className='hosted-title'>
                        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
                    </p>
                    <p className='hosted-description'>
                        {spot.description}
                    </p>
                </div>

                <div className='reserve-box'>
                    <div className='reserve-box-row1'>
                        <p id='price-night'>
                            ${spot.price} night
                        </p>

                        <div className='box-reviewAvg-reviewNum'>
                            <p >
                                &#9733; {spot.avgStarRating !== "No reviews found" ? toDecimal(spot.avgStarRating) : "New"}  
                            </p>
                            {spot.numReviews !== 0 && <div className='box-dot-reviews'>
                                &#8226; {spot.numReviews !== 1 ? spot.numReviews + " reviews" : spot.numReviews + " review"}
                            </div>}
                            <p >
                                {/* {spot.avgStarRating !== "No reviews found" ? spot.numReviews : ""} */}
                            </p>

                        </div>
                        

                    </div>
                    

                    <div className='reserve-box-row2'> 
                        <div className='reserve-box-2'>
                            {user && 
                            <OpenModalReserve buttonText="Reserve" modalComponent={<PostBookingModal booking={spot} />} />
                            }
                            {!user &&
                            <p className='login-reserve'>
                                Login to Reserve
                            </p>}
                        </div>


                    </div>
                </div>


                </div>
                    <div className='avg-rating' >
                &#9733; {spot.avgStarRating !== "No reviews found" ? toDecimal(spot.avgStarRating) : "New"}
                    
                    {spot.numReviews !==0 && <div className='x-reviews'>
                        &#8226; {spot.numReviews !== 1 ? spot.numReviews + " reviews"  : spot.numReviews + " review"} 
                    </div>}

                    </div>
            {(notOwnerLogged && (hasReview === false)) &&
                    <div className='open-modal-div'>
                        <OpenModalButton className="post-review-modal-button" buttonText="Post Your Review" modalComponent={<ReviewForm spotId={spotId}/>} />
                    </div>
                    }
            {((notOwnerLogged) && spot.numReviews === 0) && <div className='first-post-div'>
                        <p >
                            Be the first to post a review!
                        </p>
                    </div>}

                    <div className='review-index r-i-background'>
                        {reviews.map(review => (
                            <ReviewIndexItem review={review} spotId={spotId} key={review.id} />
                        ))}
                    </div>
                    {spot.numReviews === 0 && <div className='visit-spot'>
                        Please visit a spot to post a review
                    </div>}
                </div>
    );
};

export default SpotDetail;
