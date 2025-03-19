import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://localhost:44346/api/tasks/informations", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Task ID is undefined");
      return;
    }

    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        console.log(`Deleting task with ID: ${id}`);

        const response = await fetch(`https://localhost:44346/api/tasks/details/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(`Error deleting task: ${errorMsg}`);
        }

        setTasks((prevTasks) => prevTasks.filter((task) => task.TaskID !== id));
      } catch (error) {
        console.error("Error:", error);
        setError("Something went wrong while deleting the task.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <div className="page-header">
        <Row className="align-items-center">
          <Col md={12}>
            <ul className="breadcrumb">
              <li>
                <a href="/">Task</a> / Task List
              </li>
            </ul>
            <h1 className="dashboard-title">Assigned Task List</h1>
          </Col>
        </Row>
      </div>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task.TaskID}>
                <td>{index + 1}</td>
                <td>{task.Title}</td>
                <td>{task.DueDate ? new Date(task.DueDate).toLocaleDateString() : "No due date"}</td>
                <td>{task.Category || "N/A"}</td>
                <td>{task.Description || "N/A"}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/read-task/${task.TaskID}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => navigate(`/edit-task/${task.TaskID}`)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(task.TaskID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
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
