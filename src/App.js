import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserViewModel from "./viewmodels/UserViewModel";

import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import AssignTasks from "./components/AssignTasks";
import TaskList from "./components/TaskList";
import DashBoard from "./components/DashBoard";

const App = () => {
  const { users, handleAddUser, handleAssignTasks, handleDashboard} = UserViewModel();

  return (
    <Router>
      <div>
        <h1>Management App</h1>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/DashBoard">Dashboard</Link></li>
            <li><Link to="/add-user">Add User</Link></li>
            <li><Link to="/assign-tasks">Assign Tasks</Link></li>
          </ul>
        </nav>

        {/* Routes */}
          <Routes>
          <Route path="/DashBoard" element={<DashBoard DashBoard={handleDashboard} />} />
          <Route path="/users" element={<UserList users={users} />} /> 
          <Route path="/add-user" element={<AddUserForm onAddUser={handleAddUser} />} />         
          <Route path="/assign-tasks" element={<AssignTasks assignTasks={handleAssignTasks} />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
