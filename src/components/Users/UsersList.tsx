import {useQuery} from "react-query";
import getData from "../../utils/api";

export default function UsersList ({user, setUser}:any) {
  const {data: users = []} :any= useQuery(
    "users",
    () => getData("http://localhost:3001/users"),
    {suspense: true}
  );

  return (
    <ul className="users items-list-nav">
      {users.map((u:any) => (
        <li
          key={u.id}
          className={u.id === user?.id ? "selected" : undefined}
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