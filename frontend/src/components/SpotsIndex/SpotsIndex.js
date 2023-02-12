import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"



import SpotIndexItem from "./SpotIndexItem";
import { useEffect } from "react";
import { fetchSpots, loadSpots } from "../../store/spot";





function SpotsIndex({ fruits }) {
    const dispatch = useDispatch()

    const spotState = useSelector(state => state.spots)
    const spots = Object.values(spotState)
    // console.log(spots)

    //should dispatch on inital render
    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    return (




        //jsx uses camel case class names
        <div className="fruits-index">
            <h2>
                Spots Index
            </h2>
            {spots.map(spot => (
                <SpotIndexItem spot={spot} key={spot.id} />
                // <Link to={`/fruits/${fruit.id}`} key={fruit.id}>
                //     {fruit.name}
                // </Link>
            ))}
        </div>
        //also note the list, we map over our data passed in from prop,
        //at each obj, we render link to the url with that obj id along with its name
    )
}

export default SpotsIndex;