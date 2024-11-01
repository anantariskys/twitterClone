import React from "react";

type User = {
  id: string;
  email: string;
  username: string;
};

type MainProps = {
  user: User;
};

const Main: React.FC<MainProps> = ({ user }) => {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <p>User ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </main>
  );
};

export default Main;
