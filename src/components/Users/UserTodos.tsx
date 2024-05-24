import React from 'react';
import {useQuery} from "react-query";
import getData from "../../utils/api";

export default function UserTodos ({id}: any) {
  const {data: todos}:any = useQuery(
    ["todos", id],
    () => getData(
      `http://localhost:3001/todos?userId=${id}`,
      1500
    ),
    {suspense: true}
  );

  return (
    <div className="user-todos">
      <h3>User Todos</h3>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo: any) => <li key={todo.id}>{todo.todo}</li>)}
        </ul>
      ) : (
        <p>Nothing to do!</p>
      )}
    </div>
  )
}