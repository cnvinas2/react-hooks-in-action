
import {Link, useNavigate} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";
import React from 'react';

export default function BookablesList ({bookable, bookables, getUrl}:any) {
  const group = bookable?.group;
  const bookablesInGroup = bookables?.filter((b:any) => b.group === group);
  const groups = [...new Set(bookables?.map((b:any) => b.group))];

  const navigate = useNavigate();

  function changeGroup (event:any) {
    const bookablesInSelectedGroup = bookables.filter(
      (b:any) => b.group === event.target.value
    );
    navigate(getUrl(bookablesInSelectedGroup[0].id));
  }

  function nextBookable () {
    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    navigate(getUrl(nextBookable.id));
  }

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map((g:any) => <option value={g} key={g}>{g}</option>)}
      </select>

      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b:any) => (
          <li
            key={b.id}
            className={b.id === bookable.id ? "selected" : undefined}
          >
            <Link
              to={getUrl(b.id)}
              className="btn"
              replace={true}
            >
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          onClick={nextBookable}
          autoFocus
        >
          <FaArrowRight/>
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}