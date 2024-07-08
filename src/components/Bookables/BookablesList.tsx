import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface Bookable {
  id: number;
  group: string;
  title: string;
}

interface BookablesListProps {
  bookable: Bookable | undefined;
  bookables: Bookable[];
  getUrl: (id: number) => string;
}

const BookablesList: React.FC<BookablesListProps> = ({
  bookable,
  bookables,
  getUrl
}) => {
  const group = bookable?.group;
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const groups = [...new Set(bookables.map(b => b.group))];

  const navigate = useNavigate();

  const changeGroup = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const bookablesInSelectedGroup = bookables.filter(
      b => b.group === event.target.value
    );
    navigate(getUrl(bookablesInSelectedGroup[0].id));
  };

  const nextBookable = () => {
    const i = bookablesInGroup.indexOf(bookable as Bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    navigate(getUrl(nextBookable.id));
  };

  return (
    <div>
      <select value={group} onChange={changeGroup}>
        {groups.map(g => (
          <option value={g} key={g}>
            {g}
          </option>
        ))}
      </select>

      <ul className="bookables items-list-nav">
        {bookablesInGroup.map(b => (
          <li key={b.id} className={b.id === bookable?.id ? "selected" : ""}>
            <Link to={getUrl(b.id)} className="btn" replace={true}>
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <button className="btn" onClick={nextBookable} autoFocus>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
};

export default BookablesList;