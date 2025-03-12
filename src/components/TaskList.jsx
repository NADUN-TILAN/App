import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch tasks from the API
    fetch("https://localhost:44346/api/tasks/informations")
      .then((res) => res.json())  // Parse JSON response
      .then((data) => setTasks(data))  // Store data in state
      .catch((error) => console.error("Error fetching tasks:", error));  // Handle errors
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleUpdate = (task) => {
    // Logic for updating the task (e.g., open a form to edit the task)
    alert(`Updating task: ${task.Title}`);
    // You can implement the logic to show a modal or redirect to an edit page
  };

  const handleDelete = (taskId) => {
    // Logic for deleting the task
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`https://localhost:44346/api/tasks/${taskId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          setTasks(tasks.filter((task) => task.TaskID !== taskId)); // Remove task from state
        })
        .catch((error) => console.error("Error deleting task:", error));
    }
  };

  return (
    <Container className="mt-4">
      {/* Enhanced Page Header */}
      <div className="page-header">
        <Row className="align-items-center">
          <Col md={12}>
            <ul className="breadcrumb">
              <li>
                <a href="index.html">Task /</a>
              </li>
              <li>Task List</li>
            </ul>
            <h1 className="dashboard-title">Assigned Task List</h1>
          </Col>
        </Row>
      </div>

      {/* Task Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task.TaskID}>
                <td>{index + 1}</td>
                <td>{task.Title}</td>
                <td>{task.DueDate ? task.DueDate : "No due date"}</td>
                <td>{task.Category}</td>
                <td>{task.Description}</td>
                <td>{task.Status ? task.Status : "Pending"}</td>
                <td>
                  <Button variant="info" size="sm" onClick={() =>
                      navigate(`/read-task/${task.TaskID}`)
                    }
                     >
                    View
                  </Button>
                  <Button variant="warning" size="sm" onClick={() => handleUpdate(task)} className="mx-2">
                    Update
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(task.TaskID)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskList;
