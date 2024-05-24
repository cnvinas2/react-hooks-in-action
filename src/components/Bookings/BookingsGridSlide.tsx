import React from "react";
import {animated} from "react-spring";
import {useSlide} from "./bookingsHooks";
import BookingsGrid from "./BookingsGrid";

export default function BookingsGridSlide (props:any) {
  const {week, bookable, booking, setBooking} = props;

  const transitions: any = useSlide(bookable, week);

  return (
    <div className="grid-wrapper">
      {transitions.map(({item, props, key}:any) => (
        <animated.div
          className="grid"
          style={{...props}}
          key={key}
        >
          <BookingsGrid
            key={key}
            week={item?.week}
            bookable={item?.bookable}
            booking={booking}
            setBooking={setBooking}
          />
        </animated.div>
      ))}
    </div>
  );
}