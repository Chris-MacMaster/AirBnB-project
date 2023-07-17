import { csrfFetch } from "./csrf"
const LOAD_BOOKINGS = "bookings/LOAD"
//**ACTIONS */
export const actionLoadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        payload: bookings
    }
}

export const normalizeArr = (arr) => {
    const newState = {};
    arr.forEach(booking => {
        newState[booking.id] = booking;
    });

    return newState;
}


//**THUNKS */

//SPOTS HOME PAGE
export const fetchBookings = () => async dispatch => {
    const response = await csrfFetch('/api/bookings');
    const bookings = await response.json();
    let convertedBookings = normalizeArr(bookings.Bookings)
    // console.log(spots)
    // console.log(convertedSpots)
    // console.log("CONVERTED SPOTS", convertedSpots)
    if (response.ok) {
        dispatch(actionLoadBookings(convertedBookings));
    }
};


//Spot initalstate
const initialState = {
    allBookings: {},
}

//**REDUCER AND CASES */
export default function bookingReducer(state = initialState, action) {
    //converted fruits shape is from previous practice mock data, not the right store shape
    switch (action.type) {

        case LOAD_BOOKINGS: {
            const newState = { allBookings: { ...state.allBookings } } 
            newState.allBookings = action.payload
            return newState
        }

        default:
            return state
    }

}



