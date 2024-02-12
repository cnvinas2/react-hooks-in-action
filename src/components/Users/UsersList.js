import { useState } from 'react';
import {users} from '../../static.json';


export default function UsersList () {
   
  const [user, setUser] = useState(1)
 
  return (
    <ul className="users items-list-nav">
      {users.map(u => (
        <li
          key={u.id}
          className={u.id === user?.id ? "selected" : null}
        >
          <button
            className="btn"
            onClick={() => setUser(u)}
          >
            {u.name}
          </button>
        </li>
      ))}
    </ul>
  );
}