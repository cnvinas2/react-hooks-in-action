import * as React from 'react';
import { FaEdit } from 'react-icons/fa';
import Booking from './Booking';
import { useUser } from '../Users/UserContext'; // import custom hook

export default function BookingDetails({ booking, bookable }: BookingDetailsProps) {
  const [user] = useUser(); // use custom hook
  const isBooker = booking && user && booking.bookerId === user.id;

  return (
    <div className="booking-details">
      <h2>
        Booking Details
        {isBooker && (
          <span className="controls">
            <button className="btn">
              <FaEdit />
            </button>
          </span>
        )}
      </h2>

      {booking ? (
        <Booking booking={booking} bookable={bookable} />
      ) : (
        <div className="booking-details-fields">
          <p>Select a booking or a booking slot.</p>
        </div>
      )}
    </div>
  );
}

interface BookingDetailsProps {
  booking: {
    bookerId: number | string;
  };
  bookable: Object;
}