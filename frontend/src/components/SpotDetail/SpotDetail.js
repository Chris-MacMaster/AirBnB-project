import React from 'react';
import { useSelector } from 'react-redux';
import { fetchOneSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';

import { fetchReviews } from "../../store/review"

import { useEffect } from 'react';

import  ReviewForm  from "../SpotForm/CreateReview"

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
    console.log("SPOT IMAGES", spotState.singleSpot.SpotImages)
    // console.log(spotState.singleSpot)

    
    let spot = spotState.singleSpot

    // const reviewState = useSelector(state => state.reviews)



    // let spotImages = spot.SpotImages

    console.log("THIS IS THE SPOT STATE", spotState)

    // const spot = spotState.singleSpot
    // console.log(spot)
    // console.log(spotState.name)

    console.log("SPOT", spot)

    //BUG HERE
    let spotImages = spot.spotImages
    console.log("SPOT IMAGES", spotImages)



    // const reviewState = useSelector(state => state.reviews)

    // console.log("REVIEW STATE", reviewState)


    useEffect(() => {
        dispatch(fetchOneSpot())
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
                {spot.city}
                {spot.state}
                {spot.country}
            </div>

            <div >
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
                            ${spot.price}night
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
                    



                    <div className='reviewAvg-reviewNum'>
                        <p >
                            &#9733; {spot.avgStarRating}
                        </p>
                        <p >
                            # reviews
                        </p> 
                        <OpenModalButton className="post-review-modal-button" buttonText="Post Your Review" modalComponent={"doesnt work yet"} />
                        {/* <button type='button' className='post-review-button' >
                            Post Your Review
                        </button> */}

                        {/* NEEDS MODAL FUNCTIONALITY */}
                    </div>


                    {/*  */}
                    {/* <div className='review-index'>
                        {fetchReviews.map(review => (
                            <ReviewIndexItem review={review} key={review.dispatch} />
                        ))}
                    </div> */}








                    

                </div>
            </div>






        
        <p >
            p
        </p>
    </div>
    );
};

export default SpotDetail;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }