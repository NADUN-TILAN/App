import React from "react";
import UserViewModel from "./viewmodels/UserViewModel";
//import logo from './logo.svg';
//import './App.css';
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";

const App = () => {
  const { users, handleAddUser } = UserViewModel();

  return (
      <div>
          <h1>Management App</h1>
          <AddUserForm onAddUser={handleAddUser} />
          <UserList users={users} />
      </div>
  );
};

export default App;
