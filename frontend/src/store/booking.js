import { csrfFetch } from "./csrf"
const LOAD_BOOKINGS = "bookings/LOAD"
const DELETE_BOOKING = "bookings/DELETE"
const POST_BOOKING = "bookings/POST"


//**ACTIONS */
export const actionLoadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        payload: bookings
    }
}

export const actionPostBooking = (booking) => {
    return {
        type: POST_BOOKING,
        payload: booking
    }
}

export const actionDeleteBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        payload: id
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
    // console.log("BOOKINGS", bookings)
    let convertedBookings = normalizeArr(bookings.Bookings)
   
    if (response.ok) {
        dispatch(actionLoadBookings(convertedBookings));
    }
};


export const postBooking = (bookingBody) => async dispatch => {
    const { spotId, userId, startDate, endDate } = bookingBody
    const method = "POST"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
        spotId,
        userId,
        startDate, 
        endDate
    })
    const options = { method, headers, body }
    const response = await csrfFetch('/api/bookings', options)

    if (response.ok) {
        const booking = await response.json()
        dispatch(actionPostBooking(booking))
        return booking
    }
}

export const editBooking = (bookingBody, bookingId) => async dispatch => {
    // need booking id
    const { startDate, endDate } = bookingBody

    const method = "PUT"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
        startDate,
        endDate
    })
    const options = { method, headers, body }
    console.log("OPTIONS", options)
    const response = await csrfFetch(`/api/bookings/${bookingId}`, options)
    const booking = await response.json()
    if (response.ok) {
        return booking
    }

}


const initialState = {
    allBookings: {},
}

//**REDUCER AND CASES */
export default function bookingReducer(state = initialState, action) {
    switch (action.type) {

        case LOAD_BOOKINGS: {
            const newState = { allBookings: { ...state.allBookings } } 
            newState.allBookings = action.payload
            return newState
        }

        case POST_BOOKING: {
            const newState = { allBookings: { ...state.allBookings } } 
            newState.allBookings[action.payload.id] = action.payload
            return newState
        }

        case DELETE_BOOKING: {
            const newState = { allBookings: { ...state.allBookings } }
            delete newState.allBookings[action.payload]
            return newState
        }

        default:
            return state
    }

}



