import { useState } from 'react';
import {users} from '../../static.json';

export default function UserPicker () {
  const [user, setUser] = useState(1)

  return (
    <select onChange={e => setUser(e.target.value)}>
      {users.map(u=>(
        <option value={u.id} 
          className={u.id === user?.id ? "selected" : null}
          >{u.name}</option>
      )
      )}
    </select>
  );
}