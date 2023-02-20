import React from 'react';
import { useSelector } from 'react-redux';
import { fetchOneSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';

import { fetchReviews } from "../../store/review"

import { useEffect } from 'react';

import  ReviewForm  from "../SpotForm/CreateReview"
// import SpotForm from '../SpotForm/CreateSpot'

import ReviewIndexItem from '../ReviewsIndex/ReviewIndexItem';

// import { useModal } from '../../context/Modal';

import { useParams } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
// import { useDispatch } from "react-redux"
// import { useHistory } from 'react-router-dom';

import "./SpotDetail.css"
import OpenModalButton from '../OpenModalButton';


import { normalizeArr } from '../../store/spot';
// import { fetchOneSpot } from "../../store/spot"
// import { useDispatch } from 'react-redux';

// import { useSelector } from "react-redux"


// import "./SpotIndexItem.css"


//BUILD THIS SPOT DETAIL COMPONENT

const SpotDetail = () => {
    // const history = useHistory()
    const dispatch = useDispatch()
    const spotState = useSelector(state => state.spots)
    
    
    // console.log("THIS IS THE SPOT STATE", spotState)
    // console.log("SPOT IMAGES", spotState.singleSpot.SpotImages)
    
    let spot = spotState.singleSpot
    let spotImagesArr = spot.SpotImages

    
    // console.log("SPOT IMAGES ARRAY FROM STATE", spotImagesArr)//currently an array
    console.log("SINGLE SPOT FROM STATE", spot)

    const reviewState = useSelector(state => state.reviews.spot)
    const reviews = Object.values(reviewState)


    let {spotId} = useParams()
    // console.log("SPOT")

    // console.log("SPOTID", spotId)
    useEffect(() => {
        // if (spotId) {
            console.log("SPOT ID", spotId)
            dispatch(fetchOneSpot(spotId))
            
            dispatch(fetchReviews(spotId))
            
        // }
    }, [dispatch])



    if (!spot.Owner) {
        return null
    }

    // const spotImages = normalizeArr(spotImagesArr)

    //SPOT BUG, NOT POPULATING 
    // console.log("SPOT IMAGES ARRAY", spotImagesArr)
    // console.log("SPOT IMAGES OBJ", spotImages)
    



    const getReviewsTest = () => {
        dispatch(fetchReviews(spotId))
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
                    
                    <img className="preview-image-url" src={spotImagesArr.length && spotImagesArr[0].url}
                    alt='previewImage' />
                </div>

                <div className='spot-images-subdiv'>
                    <div className='images-subdiv-row1'>
                        <div id='spot-image-1'>
                            {/* src={(spotImagesArr.length >= 2) && spotImagesArr[1].url} */}
                            <img id='img1' src='https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800'
                            alt='visual-content-1' />
                        </div>

                        <div id='spot-image-2'>
                            {/* src={(spotImagesArr.length >= 3) && spotImagesArr[2].url} */}
                            <img id='img2' src='https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
                                alt='visual-content-2' />
                        </div>
                    </div>

                    <div className='images-subdiv-row2'>
                        <div id='spot-image-3'>
                            {/* src={(spotImagesArr.length >= 4) && spotImagesArr[3].url} */}
                            <img id='img3' src='https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
                                alt='visual-content-3' />
                        </div>

                        <div className='spot-image-4'>
                            {/* src={(spotImagesArr.length >= 5) && spotImagesArr[4].url} */}
                            <img id='img4' src='https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'
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
                        {spot.description} awjfhajbfwjahbf ieawugfhiouhfo aiosuha whuf oiwaushfio aushfio usfio asuhfio uahsfo iuhsaio fhauh ioasuhfdio aufsaf
                    </p>
                </div>

                <div className='reserve-box'>
                    <div className='reserve-box-row1'>
                        <p >
                            ${spot.price} night
                        </p>

                        <div className='box-reviewAvg-reviewNum'>
                            <p >
                                &#9733; {spot.avgStarRating !== "No reviews found" ? spot.avgStarRating : "New"} &#8226; {spot.numReviews !== 1 ? spot.numReviews + " Reviews" : spot.numReviews + " Review"}
                            </p>
                            <p >
                                {/* {spot.avgStarRating !== "No reviews found" ? spot.numReviews : ""} */}
                            </p>

                        </div>
                        

                    </div>
                    

                    <div className='reserve-box-row2'> 
                        <div className='reserve-box-2'>
                            <button type='button' className='reserve-button modal-button button white-button'>
                                Reserve
                            </button>
                        </div>


                    </div>
                </div>


                </div>
                    <div className='reviewAvg-reviewNum'>
                        <p className='avgRating-text'>
                    {spot.avgRating !== "no reviews exist for this spot yet" ? spot.avgRating : "New"}
                    {/* &#9733; {spot.avgStarRating !== "No reviews found" ? spot.avgStarRating : "New"} */}
                        </p>
                        <p >
                            {/* {spot.avgStarRating !== "No reviews found" ? spot.numReviews : ""} */}
                        </p> 
                    </div>
                    {/* needs logic to only display on condition, i think ternary */}
                    <div className='avg-rating' >
                &#9733; {spot.avgStarRating !== "No reviews found" ? spot.avgStarRating : "New"} &#8226; {spot.numReviews !== 1 ? spot.numReviews + " Reviews"  : spot.numReviews + " Review"} 
                    </div>
                    <div className='open-modal-div'>
                        <OpenModalButton className="post-review-modal-button" buttonText="Post Your Review" modalComponent={<ReviewForm spotId={spotId}/>} />
                        <p >
                            Be the first to post a review!
                        </p>
                    </div>

                    {/*  */}
                    <div className='review-index'>
                        {reviews.map(review => (
                            <ReviewIndexItem review={review} spotId={spotId} key={review.id} />
                        ))}
                    </div>
                    {/* <p >
                        reviews should go here
                    </p>
                    <button onClick={getReviewsTest} type='button' className=''>LoadReviewState Test</button> */}
                </div>
    );
};

export default SpotDetail;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }