import {useEffect, useState} from "react";
import Spinner from "../UI/Spinner";

export default function UserPicker () {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function getUsers() {
    const resp = await fetch(url);
    const data = await (resp.json());
    setUsers(data);
    }
    getUsers();
  }, []);

  if (users === null) {
    return <Spinner/>
  }

  return (
    <select>
      {users.map(u => (
        <option key={u.id}>{u.name}</option>
      ))}
    </select>
  );
}