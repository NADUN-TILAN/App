import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import UserViewModel from "./viewmodels/UserViewModel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Import Components
import DashBoard from "./components/DashBoard";
import AssignTasksMonitoring from "./components/AssignTasksMonitoring";
import UserList from "./components/UserList";
import AddUserForm from "./components/AddUserForm";
import AssignTasks from "./components/AssignTasks";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import TaskDetails from "./components/TaskDetails";
import EditTask from "./components/EditTask";
import ReadUser from "./components/UserDetails";
import EditUser from "./components/EditUser";

const App = () => {
  let handleusers, handleAddUser, handleAssignTasks, handleDashboard, handleassignTasksMonitoring, handleDelete;

  try {
    ({ handleusers, handleAddUser, handleAssignTasks, handleDashboard, handleassignTasksMonitoring, handleDelete } = UserViewModel());
  } catch (error) {
    console.error("Error initializing UserViewModel:", error);
  }

  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/dashboard">Task Manager</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/assign-task">Assign Task</Nav.Link>

                {/* Users Dropdown */}
                <NavDropdown title="Users" id="users-dropdown">
                  <NavDropdown.Item as={Link} to="/add-user">Add User</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/user-list">View Users</NavDropdown.Item>
                </NavDropdown>

                {/* Tasks Dropdown */}
                <NavDropdown title="Tasks" id="tasks-dropdown">
                  <NavDropdown.Item as={Link} to="/add-task">Add Task</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/task-list">View Tasks</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Routes */}
        <Routes>
          <Route path="/dashboard" element={<DashBoard DashBoard={handleDashboard} />} />
          <Route path="/assign-task" element={<AssignTasksMonitoring assignTasksMonitoring={handleassignTasksMonitoring} />} />
          <Route path="/add-user" element={<AddUserForm onAddUser={handleAddUser} />} />
          <Route path="/add-task" element={<AssignTasks assignTasks={handleAssignTasks} />} />
          <Route path="/task-list" element={<TaskList />} />

          {/* User Routes */}
          <Route path="/user-list" element={<UserList users={handleusers} onDelete={handleDelete} />} />
          <Route path="/read-user/:id/:firstname/:lastname" element={<ReadUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />

          {/* Task Routes */}
          <Route path="/read-task/:id" element={<TaskDetails />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
};

export default App;
