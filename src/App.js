import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
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
import UserDetails from "./components/UserDetails"; 
import EditUser from "./components/EditUser"; 

const App = () => {
  const { handleusers, handleAddUser, handleAssignTasks, handleDashboard, handleassignTasksMonitoring, handleDelete } = UserViewModel();

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/DashBoard">Task Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/DashBoard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/assign-task">Assign Task</Nav.Link>
                {/* <Nav.Link as={Link} to="/user-list">View User</Nav.Link> */}

                {/* Dropdown 1 for Task Management */}
                <NavDropdown title="Users" id="task-dropdown">
                  <NavDropdown.Item as={Link} to="/add-user">Add User</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user-list">View User</NavDropdown.Item>
                  {/* <NavDropdown.Item as={Link} to="/tasks">View Task</NavDropdown.Item> */}
                </NavDropdown>

                {/* Dropdown 2 for Task Management */}
                <NavDropdown title="Tasks" id="task-dropdown">
                  {/* <NavDropdown.Item as={Link} to="/assign-task">Assign Task</NavDropdown.Item> */}
                  <NavDropdown.Item as={Link} to="/add-tasks">Add Task</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/tasks">View Task</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Routes */}
        <Routes>
          <Route path="/DashBoard" element={<DashBoard DashBoard={handleDashboard} />} />
          <Route path="/assign-task" element={<AssignTasksMonitoring assignTasksMonitoring={handleassignTasksMonitoring} />} />
          {/* <Route path="/user-list" element={<UserList users={handleusers} />} /> */}
          <Route path="/add-user" element={<AddUserForm onAddUser={handleAddUser} />} />
          <Route path="/add-tasks" element={<AssignTasks assignTasks={handleAssignTasks} />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/user-list" element={<UserList users={handleusers} onDelete={handleDelete} />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />

    </Router>
  );
};

export default App;
