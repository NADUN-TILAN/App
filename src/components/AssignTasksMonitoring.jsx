import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";

const AssignTasksMonitoring = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://localhost:44346/api/tasks/informations");
      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(`https://localhost:44346/api/tasks/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.TaskID !== id));
        } else {
          alert("Error deleting task!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container className="mt-4">
      {/* Page Header */}
      <div className="page-header">
        <Container>
          <ul className="breadcrumb">
            <li>
              <a href="index.html">Home /</a>
            </li>
            <li>Task Panel</li>
          </ul>
          <h1 className="dashboard-title">Task Monitoring</h1>
        </Container>
      </div>

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
            <th>Uploaded Docs</th>
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
                <td>{task.UploadedDocs ? "Yes" : "No"}</td>
                <td>
                  <Form.Select defaultValue={task.Status || "Pending"}>
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                  </Form.Select>
                </td>
                <td>
                  <Button
                    variant="info"
                    className="me-2"
                    href={`/task/${task.TaskID}`}
                  >
                    Read
                  </Button>
                  <Button
                    variant="warning"
                    className="me-2"
                    href={`/edit-task/${task.TaskID}`}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(task.TaskID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AssignTasksMonitoring;
