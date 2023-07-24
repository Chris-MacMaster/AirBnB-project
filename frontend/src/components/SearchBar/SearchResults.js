import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import './SearchResults.css'
import SpotIndexItem from "../SpotsIndex/SpotIndexItem"

const SearchResults = () => {
    const { parameters } = useParams()


    const spotState = useSelector(state => state.searchResults.allSpots)
    const spots = Object.values(spotState)



    useEffect(() => {
        console.log(parameters)
    }, [parameters])

    if (!spots.length) return null


    return (
        <div className='groups-index search-component'>
          
            <div className='landing search-div'>
                <div className='landing-top'>
                    <p className='landing-p landing-p-top'>
                        Results for "{parameters}""
                    </p>
                    <p className='landing-p landing-p-bottom'>
                        {!Object.values(spots).filter(spot => spot.name.toLowerCase().includes(parameters.toLowerCase())).length &&
                            "No results matching that query"}
                    </p>
                </div>

            </div>

            <div className="spotIndex">
                {Object.values(spots).filter(spot => spot.name.toLowerCase().includes(parameters.toLowerCase())).map(spot => (
                    <SpotIndexItem title={spot.name} spot={spot} key={spot.id} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
