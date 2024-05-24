import * as React from 'react';
import {FaSpinner} from "react-icons/fa";

export default function Spinner (props:any) {
  return (
    <span {...props}>
      <FaSpinner className="icon-loading"/>
    </span>
  );
}