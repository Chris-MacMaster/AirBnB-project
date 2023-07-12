import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import './SearchResults.css'
import SpotIndexItem from "../SpotsIndex/SpotIndexItem"

const SearchResults = () => {
    // const dispatch = useDispatch(
    const { parameters } = useParams()


    const spotState = useSelector(state => state.searchResults.allSpots)
    const spots = Object.values(spotState)



    useEffect(() => {
        console.log(parameters)
    }, [parameters])

    if (!spots.length) return null


    return (
        <div className='groups-index search-component'>
            <div className='g-detail-top-background search-top'>
                "
            </div>

            <div className="groupIndex search-groups-div">
                {Object.values(spots).filter(spot => spot.name.toLowerCase().includes(parameters.toLowerCase())).map(spot => (
                    <SpotIndexItem title={spot.name} spot={spot} key={spot.id} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
