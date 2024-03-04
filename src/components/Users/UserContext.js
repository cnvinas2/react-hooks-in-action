import React,{createContext, useContext, useState} from "react";

const UserContext = createContext();
const UserSetContext = createContext();

export function UserProvider ({children}) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={user}>
      <UserSetContext.Provider value={setUser}>
        {children}
      </UserSetContext.Provider>
    </UserContext.Provider>
  );
}

//Hook para acceder al contexto
export function useUser () {

  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);
debugger
  if (!setUser) {
    throw new Error("The UserProvider is missing.");
  }

  return [user, setUser];
}