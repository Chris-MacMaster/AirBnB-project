import React from 'react';
import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
import { useDispatch } from "react-redux"



import "./SpotIndexItem.css"



const SpotIndexItem = ({ spot }) => {

    // const handleClick = (e) => {
    //     e.preventDefault()

    // }

    return (
        <li className='spotIndexItem'>
            {/* {spot.name} */}


            <div className='spot-card' >
                <div >
                    <img Link={spot.previewImage} alt="not found" />
                </div>
                <div className='card-info' >

                    {spot.previewImage}
                    {spot.city}
                    {spot.state}
                    {spot.price}
                </div>

            </div>


           
            
        </li>
    );
};

export default SpotIndexItem;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }