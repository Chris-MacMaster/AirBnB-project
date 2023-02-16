import React from 'react';
import { useSelector } from 'react-redux';
import { fetchOneSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';

import { fetchReviews } from "../../store/review"

import { useEffect } from 'react';

import  ReviewForm  from "../SpotForm/CreateReview"

// import { useModal } from '../../context/Modal';

// import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
// import { useDispatch } from "react-redux"
// import { useHistory } from 'react-router-dom';

import "./SpotDetail.css"
import OpenModalButton from '../OpenModalButton';
// import { fetchOneSpot } from "../../store/spot"
// import { useDispatch } from 'react-redux';

// import { useSelector } from "react-redux"


// import "./SpotIndexItem.css"


//BUILD THIS SPOT DETAIL COMPONENT

const SpotDetail = () => {
    // const history = useHistory()
    const dispatch = useDispatch()
    const spotState = useSelector(state => state.spots)
    
    
    console.log("THIS IS THE SPOT STATE", spotState)
    console.log("SPOT IMAGES", spotState.singleSpot.SpotImages)
    
    
    let spot = spotState.singleSpot
    console.log("SPOT", spot)

    //BUG HERE
    // let spotImages = spot.SpotImages
    // console.log("SPOT IMAGES", spotImages)
    console.log("SPOT IMAGES", spot.SpotImages)

    // const reviewState = useSelector(state => state.reviews)

    // console.log("REVIEW STATE", reviewState)


    //need to pass an id here?
    useEffect(() => {
        dispatch(fetchOneSpot(spot.id))
        // dispatch(fetchReviews())
    }, [dispatch])


    return (
    <div >
        <h1 >

        </h1>
            <p >
                {spot.name}
            </p>
            <div >
                <p >
                {spot.city}, {spot.state}, {spot.country}, 

                </p>
            </div>

            <div className='spot-images-div'>
                <div className='preview-image'>
                    previewImage
                </div>

                <div className='spot-images-subdiv'>
                    <div className='images-subdiv-row1'>
                        <div className='spot-image-1'>
                            spot image 1
                        </div>

                        <div className='spot-image-2'>
                            spot image 2
                        </div>
                    </div>

                    <div className='images-subdiv-row2'>
                        <div className='spot-image-3'>
                            spot image 3
                        </div>

                        <div className='spot-image-4'>
                            spot image 4
                        </div>

                    </div>

                </div>

                {/* <p >
                    {spotImages[0].url}
                </p> */}
                {/* careful iterating on this till initial state is done, theres a bug here */}
                {/* {spotImages.map(image => (
                    <img src={image.url} alt='no found' key={image.id}/>
                ))}  */}
            </div>


            <div className='hosted-row'>
                <div>
                    <p className='hosted-title'>
                        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
                    </p>
                    <p className='hosted-description'>
                        {spot.description}
                    </p>
                </div>

                <div className='reserve-box'>
                    <div className='reserve-box-row1'>
                        <p >
                            ${spot.price} night
                        </p>

                        <div className='box-reviewAvg-reviewNum'>
                            <p >
                                &#9733; {spot.avgStarRating}
                            </p>
                            <p >
                                # reviews
                            </p>

                        </div>
                        
                        <div className='reserve-box-2'>
                            <button type='button' className='reserve-button'>
                                reserve
                            </button>

                        </div>
                    </div>
                </div>


                </div>
                    <div className='reviewAvg-reviewNum'>
                        <p className='avgRating-text'>
                            &#9733; {spot.avgStarRating!=="No reviews found" ? spot.avgStarRating : "New"}
                        </p>
                        <p >
                            # reviews
                        </p> 
                    </div>
                    {/* needs logic to only display on condition, i think ternary */}
                    <OpenModalButton className="post-review-modal-button" buttonText="Post Your Review" modalComponent={"doesnt work yet"} />

                    {/*  */}
                    {/* <div className='review-index'>
                        {fetchReviews.map(review => (
                            <ReviewIndexItem review={review} key={review.dispatch} />
                        ))}
                    </div> */}
                    <p >
                        p
                    </p>
                </div>
    );
};

export default SpotDetail;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }