import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom"

import { useEffect } from "react";
import { actionResetReviews } from "../../store/review";


import { fetchBookings } from "../../store/booking";
import BookingIndexItem from "./BookingIndexItem";




function BookingsIndex() {
    const dispatch = useDispatch()

    const bookingState = useSelector(state => state.bookings.allBookings)

    useEffect(() => {
        dispatch(fetchBookings())
    }, [dispatch])


    const bookings = Object.values(bookingState)
    if (!bookings.length) return null
    

    return (

        <div className="spots-index">
            <h2>
                Manage Bookings
            </h2>

            <div className="spotIndex">
                {bookings.length && bookings.map(booking => (
                    <BookingIndexItem booking={booking} key={booking.id} />
                ))}
                
            </div>
        </div>

    )
}

export default BookingsIndex;





