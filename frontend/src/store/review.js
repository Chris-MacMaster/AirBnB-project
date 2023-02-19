import { csrfFetch } from "./csrf"



const LOAD_REVIEWS = "reviews/LOAD"
const RESET_REVIEWS = "reviews/LOAD"
// const LOAD_SPOT = "spots/LOAD/ONE"
// const DELETE_SPOT = "spots/DELETE"
// //**ACTIONS */


export const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews

    }
}

export const actionResetReviews = () => {
    return {
        type: RESET_REVIEWS
    }
}

// export const loadOneSpot = (spot) => {
//     return {
//         type: LOAD_SPOT,
//         payload: spot
//     }
// }

// export const actionDeleteSpot = () => {
//     return {
//         type: DELETE_SPOT
//     }
// }

export const normalizeArr = (arr) => {
    console.log("NORMALIZE ARRAY INPUT, FETCH REVIEWS RESPONSE OBJ", arr)
    const newState = {};
    arr.forEach(spot => {
        newState[spot.id] = spot;
    });

    return newState;
}


//Review initalstate
const initialState = {
    spot: {},
    user: {}
}

//**REDUCER AND CASES */
export default function reviewReducer(state = initialState, action) {
    //converted fruits shape is from previous practice mock data, not the right store shape
    let newState
    switch (action.type) {

        case LOAD_REVIEWS: {
            //neccessary to render all, bug to fix
            newState = {
                ...state, //...action.payload
            }
            newState.spot = action.payload
            // console.log("NEWSTATE", newState)
            //creates key error, shouldnt be a problem
            return newState
        }
        case RESET_REVIEWS: {
            newState = { ...state }
            // newState.reviews.spot = {}
            return newState
        }

        default:
            return state
    }

}


// //**THUNKS */

// //SPOT DETAIL PAGE
export const fetchReviews = (id) => async dispatch => {

    const response = await fetch(`/api/spots/${id}/reviews`);

    // console.log("FETCH REVIEWS RESPONSE", response)

    const reviews = await response.json();
    console.log("FETCH REVIEWS RESPONSE", reviews)
    //reviews can come back as an errors object

    if (reviews.message === "No spots with that id exist") {

    }
    
    console.log(reviews)
    // console.log(spots)
    // console.log(convertedReviews)
    console.log(response.ok)
    if (response.ok){
        let convertedReviews = normalizeArr(reviews)
        dispatch(loadReviews(convertedReviews));
        return reviews
    }
    dispatch(loadReviews([]))

};


// CREATE NEW REVIEW
export const makeReview = (reviewBody, spotId) => async dispatch => {
    console.log("REVIEW BODY", reviewBody)

    const { review, stars } = reviewBody
    const method = "POST"
    const headers = { "Content-Type": "application/json" }

    const body = JSON.stringify({
        review,
        stars,
        //...formdata placeholder
        // "review": "This was an awesome spot!",
        // "stars": 5,
    })

    console.log("BODY", body)
    const options = { method, headers, body }
    // console.log("POST STRINGIFIED REVIEW BODY", body)
    // console.log("stars", stars)

    console.log("OPTIONS", options)

    //CHANGE/CUSTOMIZE, need to pull reviews by spot ID
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, options);

    //testing logs
    const reviewData = await response.json();
    // console.log("POST RESPONSE DATA OBJ",reviewData)

    if (response.ok) {
        dispatch(loadReviews(reviewData));
        return reviewData
    }

};


//DELETE REVIEW 
export const deleteReview = (id) => async dispatch => {
    //extract id
    const method = "DELETE"
    const headers = { "Content-Type": "application/json" }
    const url = `/api/reviews/${id}`
    const options = {
        method,
        headers
    }
    const response = await csrfFetch(url, options)
    const deleteData = await response.json()

    console.log("DELETE RESPONSE DATA OBJ", deleteData)

    //loadupdated list of spots
    const getRes = await fetch('/api/spots/current');
    const reviewsArr = await getRes.json();
    let convertedReviews = normalizeArr(reviewsArr.Spots)

    if (response.ok) {
        dispatch(loadReviews(convertedReviews))
    }
}




// //SPOT MANAGE PAGE
// export const fetchCurrentSpots = () => async dispatch => {
//     // console.log("triggers")
//     const response = await fetch('/api/spots/current');
//     const spots = await response.json();


//     console.log(spots)
//     let convertedSpots = normalizeArr(spots.Spots)
//     // console.log(convertedSpots)

//     dispatch(loadSpots(convertedSpots));
// };

// //SPOT DETAIL PAGE
// export const fetchOneSpot = (id) => async dispatch => {
//     // console.log(id)
//     const response = await fetch(`/api/spots/${id}`);
//     const spot = await response.json();
//     // console.log("triggers fetchOneSpot")
//     // console.log(spot)//the correct object
//     if (response.ok) {
//         dispatch(loadOneSpot(spot));
//         return spot
//     }
// };
// //dispatch works, find where the dispatch is triggered, and load the appropriate data



// //CREATE NEW SPOT
// export const makeSpot = (spotBody) => async dispatch => {
//     // console.log("SPOT BODY", spotBody)


//     const { address, city, state, country, lat, lng, name, description, price } = spotBody
//     const method = "POST"
//     const headers = { "Content-Type": "application/json" }

//     const body = JSON.stringify({
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price
//         //...formdata placeholder
//         // "address": "123 Disney Lane",
//         // "city": "San Francisco",
//         // "state": "California",
//         // "country": "United States of America",
//         // "lat": 37.7645358,
//         // "lng": -122.4730327,
//         // "name": "App Academy",
//         // "description": "Place where web developers are created",
//         // "price": 123

//     })
//     const options = { method, headers, body }
//     // console.log("POST STRINGIFIED SPOT BODY", body)
//     // console.log("address", address)

//     //fails here
//     const response = await csrfFetch(`/api/spots`, options);

//     //testing logs
//     const spot = await response.json();
//     // console.log("POST RESPONSE DATA OBJ",spot)

//     if (response.ok) {
//         dispatch(loadSpots(spot));
//         return spot
//     }

// };






// //EDIT SPOT
// export const editSpot = (spotBody) => async dispatch => {
//     // console.log(id)
//     const { address, city, state, country, lat, lng, name, description, price, spotId } = spotBody

//     // const spotId = {spotBody}
//     const method = "PUT"
//     const headers = { "Content-Type": "application/json" }
//     const body = JSON.stringify({
//         address,
//         city,
//         state,
//         country,
//         lat,
//         lng,
//         name,
//         description,
//         price
//         //...formdata placeholder
//         // "address": "edited",
//         // "city": "edited",
//         // "state": "edited",
//         // "country": "United States of America",
//         // "lat": 37.7645358,
//         // "lng": -122.4730327,
//         // "name": "App Academy",
//         // "description": "Place where web developers are created",
//         // "price": 321
//     })
//     const options = { method, headers, body }

//     // let spotId;//We need to get the spotId in there 
//     //
//     // const response = await csrfFetch(`/api/spots/${spotId}`, options);
//     const response = await csrfFetch(`/api/spots/${spotId}`, options);
//     const spot = await response.json();
//     //testing logs
//     console.log("PUT RESPONSE DATA OBJ", spot)

//     // if (response.ok) {
//     //     dispatch(loadSpots(spots));
//     //     return spots
//     // }

//     //loadupdated list of spots
//     const getRes = await fetch('/api/spots/current');
//     const spots = await getRes.json();
//     let convertedSpots = normalizeArr(spots.Spots)

//     if (response.ok) {
//         dispatch(loadSpots(convertedSpots))
//     }

// };


