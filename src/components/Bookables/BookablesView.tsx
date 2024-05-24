import React from 'react';
import {Link, useParams} from "react-router-dom";
import {FaPlus} from "react-icons/fa";

import {useQuery} from "react-query";
import getData from "../../utils/api";

import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";

export default function BookablesView () {
  const {data: bookables = []}: any = useQuery(
    "bookables",
    () => getData("http://localhost:3001/bookables"),
    {
      suspense: true
    }
  );

  const {id}: any = useParams();
  const bookable = bookables.find(
    (b: any)=> b.id === parseInt(id, 10)
  ) || bookables[0];

  return (
    <main className="bookables-page">
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables}
          getUrl={(id: any) => `/bookables/${id}`}
        />

        <p className="controls">
          <Link
            to="/bookables/new"
            replace={true}
            className="btn">
            <FaPlus/>
            <span>New</span>
          </Link>
        </p>
      </div>

      <BookableDetails bookable={bookable}/>
    </main>
  );
}