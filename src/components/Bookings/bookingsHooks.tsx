import {useMemo, useEffect, useRef} from "react";
import {useSearchParams} from "react-router-dom";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {useTransition} from "react-spring";

import {shortISO, isDate} from "../../utils/date-wrangler";
import getData, {createItem, editItem, deleteItem} from "../../utils/api";
import {getGrid, transformBookings} from "./grid-builder";

export function useBookings (bookableId: any, startDate: any, endDate: any) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);

  const urlRoot = "http://localhost:3001/bookings";

  const queryString = `bookableId=${bookableId}` +
    `&date_gte=${start}&date_lte=${end}`;

  const query = useQuery(
    ["bookings", bookableId, start, end],
    () => getData(`${urlRoot}?${queryString}`)
  );

  return {
    bookings: query.data ? transformBookings(query.data) : {},
    ...query
  };
}

export function useGrid (bookable: any, startDate: any) {
  return useMemo(
    () => bookable ? getGrid(bookable, startDate) : {},
    [bookable, startDate]
  );
}

export function useBookingsParams () {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchDate: any = searchParams.get("date");
  const bookableId: any = searchParams.get("bookableId");

  const date = isDate(searchDate)
    ? new Date(searchDate)
    : new Date();

  const idInt = parseInt(bookableId, 10);
  const hasId = !isNaN(idInt);

  function setBookingsDate (date: any) {
    const params: any = {};

    if (hasId) {
      params.bookableId = bookableId
    }
    if (isDate(date)) {
      params.date = date
    }

    if (params.date || params.bookableId !== undefined) {
      setSearchParams(params, {replace: true});
    }
  }

  return {
    date,
    bookableId: hasId ? idInt : undefined,
    setBookingsDate
  };
}

export function useCreateBooking (key: any) : any {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    item => createItem("http://localhost:3001/bookings", item),
    {
      onSuccess: (booking) => {
        queryClient.invalidateQueries(key);
        const bookings: any = queryClient.getQueryData(key) || [];
        queryClient.setQueryData(key, [...bookings, booking]);
      }
    }
  );

  return {
    createBooking: mutation.mutate,
    isCreating: mutation.isLoading
  };
}

export function useUpdateBooking (key: any) {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (item: any) => editItem(`http://localhost:3001/bookings/${item.id}`, item),
    {
      onSuccess: (booking) => {
        queryClient.invalidateQueries(key);
        const bookings: any = queryClient.getQueryData(key) || [];
        const bookingIndex = bookings.findIndex((b: any) => b.id === booking.id);
        bookings[bookingIndex] = booking;
        queryClient.setQueryData(key, bookings);
      }
    }
  );

  return {
    updateBooking: mutation.mutate,
    isUpdating: mutation.isLoading
  };
}

export function useDeleteBooking (key: any) : any{
  const queryClient = useQueryClient();
  const mutation = useMutation(
    id => deleteItem(`http://localhost:3001/bookings/${id}`),
    {
      onSuccess: (resp, id) => {
        queryClient.invalidateQueries(key);
        const bookings: any = queryClient.getQueryData(key) || [];
        queryClient.setQueryData(key, bookings.filter((b: any) => b.id !== id))
      }
    }
  );

  return {
    deleteBooking: mutation.mutate,
    isDeleting: mutation.isLoading
  };
}

function getSlideStyles (date1: any, date2: any) {
  // vertical transition
  if (date1 === date2) {
    return {
      from: {opacity: 1, transform: "translate3d(0, -100%, 0)"},
      enter: {opacity: 1, transform: "translate3d(0, 0, 0)"},
      leave: {opacity: 0, transform: "translate3d(0, 20%, 0)"}
    }
  }

  // horizontal transition
  const percent = date1 < date2 ? 100 : -100;
  return {
    from: {opacity: 1, transform: `translate3d(${percent}%, 0, 0)`},
    enter: {opacity: 1, transform: "translate3d(0, 0, 0)"},
    leave: {opacity: 0, transform: `translate3d(${-percent}%, 0, 0)`}
  };
}

export function useSlide (bookable: any, week: any) {
  const weekStart = shortISO(week.start);
  const weekRef = useRef(weekStart);

  useEffect(() => {weekRef.current = weekStart}, [weekStart])

  const itemProps = (item:any) => ({
    key: `<span class="math-inline">{item.bookable.id}_${shortISO(item?.week.start)}</span>`, // Combine bookable ID and week start
    style: getSlideStyles(weekRef.current, weekStart) // Apply styles
  });
  
  return useTransition({ bookable, week }, itemProps, [weekStart]);
  
}