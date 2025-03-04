import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Make sure this URL matches the correct API endpoint
    fetch("https://localhost:44346/api/tasks/informations")
      .then((res) => res.json())  // Parse JSON response
      .then((data) => setTasks(data))  // Store data in state
      .catch((error) => console.error("Error fetching tasks:", error));  // Handle errors
  }, []); // Empty dependency array ensures this runs once when the component mounts

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
      {/* <h2 className="text-center mb-4">List of Assigned Tasks</h2> */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Assignee</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Assignor</th>
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
                <td>{task.Assignee}</td>
                <td>{task.DueDate ? task.DueDate : "No due date"}</td>
                <td>{task.Category}</td>
                <td>{task.Description}</td>
                <td>{task.Assignor}</td>
                <td>{task.Status ? task.Status : "Pending"}</td>
                <td>
                  <Button variant="success" size="sm">
                    Complete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
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
