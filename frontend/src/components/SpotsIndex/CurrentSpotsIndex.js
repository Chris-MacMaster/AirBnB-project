import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchCurrentSpots } from "../../store/spot";
import { actionResetReviews } from "../../store/review";


import "./SpotIndex.css"
import SpotIndexItem from "./SpotIndexItem";


import { useHistory } from "react-router-dom"
import DeleteSpotModal from "./DeleteSpotModal"

import "./CurrentSpotsIndex.css"
import OpenModalStyled from "../OpenModalButton/OpenModalStyled";




function CurrentSpotsIndex() {
    const dispatch = useDispatch()
    const history = useHistory()

    const spotState = useSelector(state => state.spots)
    const spots = Object.values(spotState.allSpots)
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(fetchCurrentSpots())
        dispatch(actionResetReviews())
    }, [dispatch])


    const toNewSpot = (e) => {
        history.push("/spots/create")
    }

    const handleUpdate = (spotId) => {
        if (user) {
            history.push(`/spots/manage/${spotId}`)
        }
    }

    return (

        <div className="current-spots-index">
            <h2>
                Manage Spots
            </h2>
            {!spots.length && <button id="current-spot-create-button" onClick={toNewSpot} className='update-button button' type='button' >Create New Spot</button>}

            <div className="current-spotIndex">
                {spots.map(spot => (

                    <div className="current-div"> 
                        <SpotIndexItem spot={spot} key={spot.id} />

                        {/* onClick={handleUpdate(spot.id)}  */}
                        <div className='div-buttons'>
                                <button onClick={() => history.push(`/spots/manage/${spot.id}`)} className='update-button button update-styled' type='button' >Update</button>
                                <OpenModalStyled className="spot-delete-button" buttonText="Delete" modalComponent={<DeleteSpotModal spot={spot} />}/>
                        </div>

                    </div>

                    
                   
                ))}

            </div>
        </div>
    )
}

export default CurrentSpotsIndex;


