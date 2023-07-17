import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom"

import SpotIndexItem from "./SpotIndexItem";
import { useEffect } from "react";
import { fetchSpots } from "../../store/spot";
import { actionResetReviews } from "../../store/review";


import "./SpotIndex.css"




function BookingsIndex() {
    const dispatch = useDispatch()

    const spotState = useSelector(state => state.spots.allSpots)

    const spots = Object.values(spotState)
    useEffect(() => {
        dispatch(fetchSpots())
        dispatch(actionResetReviews())
    }, [dispatch])

    return (

        <div className="spots-index">
            <h2>
                {/* Spots Index */}
            </h2>

            <div className="spotIndex">
                {spots.map(spot => (
                    <SpotIndexItem title={spot.name} spot={spot} key={spot.id} />
                ))}

            </div>
        </div>

    )
}

export default BookingsIndex;





