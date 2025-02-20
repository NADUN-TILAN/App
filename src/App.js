import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserViewModel from "./viewmodels/UserViewModel";

import DashBoard from "./components/DashBoard";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import AssignTasks from "./components/AssignTasks";
import TaskList from "./components/TaskList";

const App = () => {
  const { handleusers, handleAddUser, handleAssignTasks, handleDashboard} = UserViewModel();

  return (
    <Router>
      <div>
        <h1>Management App</h1>

        {/* Navigation Links */}
        <nav>
          <ul>
            <li><Link to="/DashBoard">Dashboard</Link></li>
            <li><Link to="/assign-task">Task Assign</Link></li>
            <li><Link to="/add-user">Add User</Link></li>
            <li><Link to="/user-list">View User </Link></li>
            <li><Link to="/add-tasks">Add Task</Link></li>
            <li><Link to="/tasks">View Task</Link></li>            
          </ul>
        </nav>

        {/* Routes */}
          <Routes>
          <Route path="/DashBoard" element={<DashBoard DashBoard={handleDashboard} />} />
          <Route path="/user-list" element={<UserList users={handleusers} />} /> 
          <Route path="/add-user" element={<AddUserForm onAddUser={handleAddUser} />} />         
          <Route path="/add-tasks" element={<AssignTasks assignTasks={handleAssignTasks} />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
