import React, {useEffect, useRef} from 'react';
import {FaArrowRight} from "react-icons/fa";
import Spinner from "../UI/Spinner";
import getData from "../../utils/api";

export default function BookablesList ({state, dispatch}: any) {
  const {group, bookableIndex, bookables}: any = state;
  const {isLoading, error}: any = state;

  const bookablesInGroup = bookables.filter((b: any )=> b.group === group);
  const groups = [...new Set(bookables.map((b : any)=> b.group))];

  const nextButtonRef: any = useRef();

  useEffect(() => {
    dispatch({type: "FETCH_BOOKABLES_REQUEST"});

    getData("http://localhost:3001/bookables")
      .then(bookables => dispatch({
        type: "FETCH_BOOKABLES_SUCCESS",
        payload: bookables
      }))
      .catch(error => dispatch({
        type: "FETCH_BOOKABLES_ERROR",
        payload: error
      }));
  }, [dispatch]);

  function changeGroup (e: any) {
    dispatch({
      type: "SET_GROUP",
      payload: e.target.value
    });
  }

  function changeBookable (selectedIndex: any) {
    dispatch({
      type: "SET_BOOKABLE",
      payload: selectedIndex
    });
    nextButtonRef.current.focus();
  }

  function nextBookable () {
    dispatch({type: "NEXT_BOOKABLE"});
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p><Spinner/> Loading bookables...</p>
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g: any) => <option value={g} key={g}>{g}</option>)}
      </select>

      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b: any, i: any) => (
          <li
            key={b.id}
            className={i === bookableIndex ? "selected" : undefined}
          >
            <button
              className="btn"
              onClick={() => changeBookable(i)}
            >
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          onClick={nextBookable}
          ref={nextButtonRef}
          autoFocus
        >
          <FaArrowRight/>
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}