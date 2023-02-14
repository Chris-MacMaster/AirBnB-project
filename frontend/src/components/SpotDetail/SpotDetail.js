import React from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
// import { useDispatch } from "react-redux"
// import { useHistory } from 'react-router-dom';



import "./SpotDetail.css"
// import { fetchOneSpot } from "../../store/spot"
// import { useDispatch } from 'react-redux';

// import { useSelector } from "react-redux"


// import "./SpotIndexItem.css"


//BUILD THIS SPOT DETAIL COMPONENT

const SpotDetail = () => {
    // const history = useHistory()
    // const dispatch = useDispatch()
    const spotState = useSelector(state => state.spots)
    console.log("these are the spot Images", spotState.singleSpot.SpotImages)
    // console.log(spotState.singleSpot)

    let spot = spotState.singleSpot


    // let spotImages = spot.SpotImages



    console.log("THIS IS THE SPOT STATE", spotState)

    // const spot = spotState.singleSpot
    // console.log(spot)
    // console.log(spotState.name)


    // let spotImages = spot.spotImages
    // console.log(spotImages)


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

            <h2>
                <div className='first-reserve-display'>
                    <div className='host-box'>
                        {/* owner first and last */}
                    </div>

                    <div className='reserve-box'>

                    </div>
                </div>

            </h2>
                <div >
                    {/* star avg rating */}
                </div>

                <div >
                    {/* make a react component, review */}
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