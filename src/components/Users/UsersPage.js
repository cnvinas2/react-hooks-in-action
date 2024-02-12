import UsersList from "./UsersList";

export default function UsersPage () {
  
  return (
    <main className="users-page">
      <p>Users!</p>
      <UsersList
        user={1}
      />
    </main>
  );
}