import React, { useEffect, useState } from "react";
import { Table, Button, Container, Form } from "react-bootstrap";
import '../css/AssignTasksMonitoring.css'; // Import custom CSS styles

const AssignTasksMonitoring = () => {
  const [tasks, setTasks] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [assignors, setAssignors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchTasks(), fetchAssignees(), fetchAssignors()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch("https://localhost:44346/api/tasks/informations");
      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch Assignees List
  const fetchAssignees = async () => {
    try {
      const response = await fetch("https://localhost:44346/api/users");
      if (!response.ok) throw new Error("Failed to fetch assignees");

      const data = await response.json();
      setAssignees(data);
    } catch (error) {
      console.error("Error fetching assignees:", error);
    }
  };

  // Fetch Assignors List
  const fetchAssignors = async () => {
    try {
      const response = await fetch("https://localhost:44346/api/assignors");
      if (!response.ok) throw new Error("Failed to fetch assignors");

      const data = await response.json();
      setAssignors(data);
    } catch (error) {
      console.error("Error fetching assignors:", error);
    }
  };

  // Handle Task Deletion
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
        console.error("Error deleting task:", error);
      }
    }
  };

  // Handle Input Changes
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.TaskID === id ? { ...task, [name]: value } : task
      )
    );
  };

  return (
    <Container className="mt-4">
      {/* Page Header */}
      <div className="page-header">
        <Container>
          <ul className="breadcrumb">
            <li>
              <a href="/">Home /</a>
            </li>
            <li>Task Panel</li>
          </ul>
          <h1 className="dashboard-title">Task Monitoring</h1>
        </Container>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <Table striped bordered hover responsive className="modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Assignee</th>
              <th>Due Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Assignor</th>
              <th>Uploaded</th>
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

                  {/* Assignee Dropdown */}
                  <td>
                    <Form.Select
                      name="Assignee"
                      value={task.Assignee || ""}
                      onChange={(e) => handleChange(e, task.TaskID)}
                      disabled={!assignees.length}
                    >
                      <option value="">Select</option>
                      {assignees.map((user) => (
                        <option key={user.UserID} value={user.UserID}>
                          {user.Assignee}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  <td>{task.DueDate || "No due date"}</td>
                  <td>{task.Category}</td>
                  <td>{task.Description}</td>

                  {/* Assignor Dropdown */}
                  <td>
                    <Form.Select
                      name="Assignor"
                      value={task.Assignor || ""}
                      onChange={(e) => handleChange(e, task.TaskID)}
                      disabled={!assignors.length}
                    >
                      <option value="">Select</option>
                      {assignors.map((assignor) => (
                        <option key={assignor.UserID} value={assignor.UserID}>
                          {assignor.Name}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  <td>{task.UploadedDocs ? "Yes" : "No"}</td>

                  {/* Status Dropdown */}
                  <td>
                    <Form.Select
                      name="Status"
                      value={task.Status || "Pending"}
                      onChange={(e) => handleChange(e, task.TaskID)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Assigned">Assigned</option>
                    </Form.Select>
                  </td>

                  {/* Action Buttons */}
                  <td>
                    <Button variant="info" className="me-2" href={`/task/${task.TaskID}`}>
                      Read
                    </Button>
                    <Button variant="warning" className="me-2" href={`/edit-task/${task.TaskID}`}>
                      Update
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(task.TaskID)}>
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
      )}
    </Container>
  );
};

export default AssignTasksMonitoring;
