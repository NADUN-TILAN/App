import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserViewModel from "./viewmodels/UserViewModel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import DashBoard from "./components/DashBoard";
import AssignTasksMonitoring from "./components/AssignTasksMonitoring";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import AssignTasks from "./components/AssignTasks";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer"; 

const App = () => {
  const { handleusers, handleAddUser, handleAssignTasks, handleDashboard, handleassignTasksMonitoring } = UserViewModel();

  return (
    <Router>
      <div>
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
          <Route path="/assign-task" element={<AssignTasksMonitoring assignTasksMonitoring={handleassignTasksMonitoring} />} /> 
          <Route path="/user-list" element={<UserList users={handleusers} />} /> 
          <Route path="/add-user" element={<AddUserForm onAddUser={handleAddUser} />} />         
          <Route path="/add-tasks" element={<AssignTasks assignTasks={handleAssignTasks} />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
