import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom"

// import SpotIndexItem from "./SpotIndexItem";
import { useEffect } from "react";
import { fetchCurrentSpots } from "../../store/spot";


import "./SpotIndex.css"
import CurrentSpotItem from "./CurrentSpotItem";


import { useHistory } from "react-router-dom"




function CurrentSpotsIndex() {
    const dispatch = useDispatch()
    const history = useHistory()

    const spotState = useSelector(state => state.spots)
    // console.log("spot State", spotState)
    // console.log(spotState["allSpots"])
    // console.log("AllSpots", spotState.allSpots)
    const spots = Object.values(spotState.allSpots)
    // console.log(spots)

    //should dispatch on inital render
    useEffect(() => {
        dispatch(fetchCurrentSpots())
    }, [dispatch])


    const toNewSpot = (e) => {
        history.push("/spots/new")
    }

    return (




        //jsx uses camel case class names
        <div className="current-spots-index">
            <h2>
                Manage Spots
            </h2>
            <button id="current-spot-create-button" onClick={toNewSpot} className='update-button button' type='button' >Create New Spot</button>

            <div className="current-spotIndex">
                {spots.map(spot => (
                    <CurrentSpotItem spot={spot} key={spot.id} />
                    // <Link to={`/fruits/${fruit.id}`} key={fruit.id}>
                    //     {fruit.name}
                    // </Link>
                ))}

            </div>
        </div>
        //also note the list, we map over our data passed in from prop,
        //at each obj, we render link to the url with that obj id along with its name
    )
}

export default CurrentSpotsIndex;




//store = { session: {}, spots: { allSpots: { [spotId]: { spotData, }, optionalOrderedList: [], }, singleSpot: { spotData, SpotImages: [imagesData], Owner: { ownerData, }, }, }, reviews: { spot: { [reviewId]: { reviewData, User: { userData, }, ReviewImages: [imagesData], }, optionalOrderedList: [], }, user: { [reviewId]: { reviewData, User: { userData, }, Spot: { spotData, }, ReviewImages: [imagesData], }, optionalOrderedList: [], }, }, bookings: { user: { [bookingId]: { bookingData, Spot: { spotData, }, }, optionalOrderedList: [], }, spot: { [bookingId]: { bookingData, }, optionalOrderedList: [], }, }, };

