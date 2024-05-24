import "../../static.json";
import {addDays, shortISO} from "../../utils/date-wrangler";

export function getGrid (bookable: any, startDate: any) {

  const dates = bookable.days.sort().map(
    (d: any) => shortISO(addDays(startDate, d))
  );

  const sessions = bookable.sessions.map((i: any) => sessions[i]);

  const grid = {};

  sessions.forEach((session: any) => {
    let grid: any;
    grid[session] = {};
    dates.forEach((date: any) => grid[session][date] = {
      session,
      date,
      bookableId: bookable.id,
      title: ""
    });
  });

  return {
    grid,
    dates,
    sessions
  };
}

export function transformBookings (bookingsArray: any) {
  return bookingsArray.reduce((bookings: any, booking: any) => {

    const {session, date} = booking;

    if (!bookings[session]) {
      bookings[session] = {};
    }

    bookings[session][date] = booking;

    return bookings;
  }, {});
}