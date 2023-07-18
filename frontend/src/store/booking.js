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

//BOOKINGS HOME PAGE
export const fetchBookings = () => async dispatch => {
    const response = await csrfFetch('/api/bookings/current');
    const bookings = await response.json();
    console.log("BOOKINGS", bookings)
    let convertedBookings = normalizeArr(bookings.Bookings)
   
    if (response.ok) {
        dispatch(actionLoadBookings(convertedBookings));
    }
};


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



