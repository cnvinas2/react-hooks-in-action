import * as React from 'react';
import {useEffect} from "react";
import Spinner from "../UI/Spinner";
import {useQuery} from "react-query"; // import useQuery
import getData from "../../utils/api"; // import data-fetcher

import { useUser } from './UserContext';
interface User {
  id: number | string; // Adjust type based on your data
  name: string;
}
export default function UserPicker () {
  const [user, setUser] :any = useUser();
  // switch from useFetch to useQuery
  const {data: users = [], status}:any = useQuery(
    "users",
    () => getData("http://localhost:3001/users")
  );
  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect (e:any) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find((u:any) => u.id === selectedID);
    setUser(selectedUser);
  }

  if (status === "loading") {
    return <Spinner/>
  }

  if (status === "error") {
    return <span>Error!</span>
  }

  return (
    <select
      className="user-picker"
      onChange={handleSelect}
      value={user?.id}
    >
      {users.map((u:any) => (
        <option key={u.id} value={u.id}>{u.name}</option>
      ))}
    </select>
  );
}