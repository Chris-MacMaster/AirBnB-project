import React from 'react';
import { Link } from 'react-router-dom';
// import { actionDeleteReport } from '../store/report';
import { useDispatch } from "react-redux"



const SpotIndexItem = ({ spot }) => {

    return (
        <li>
            {spot.name}
           
            
        </li>
    );
};

export default SpotIndexItem;



// {/* <Link to={`/reports/${report.id}`}>Report #{report.id}</Link> */ }
// {/* <Link to={`/reports/${report.id}/edit`}>Edit</Link> */ }