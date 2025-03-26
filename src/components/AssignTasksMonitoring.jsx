import React, { useEffect, useState } from "react";
import { Card, Button, Container, Form, Row, Col, Spinner, Collapse } from "react-bootstrap";
import '../css/AssignTasksMonitoring.css'; // Import custom CSS styles

const AssignTasksMonitoring = () => {
  const [tasks, setTasks] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [assignors, setAssignors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTask, setExpandedTask] = useState(null); // Track expanded task

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

  const toggleDetails = (taskId) => {
    setExpandedTask((prev) => (prev === taskId ? null : taskId));
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
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading tasks...</p>
        </div>
      ) : (
        <Row>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Col md={6} lg={4} key={task.TaskID} className="mb-4">
                <Card className="task-card">
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      {task.Title}
                      <Button
                        variant="link"
                        onClick={() => toggleDetails(task.TaskID)}
                        aria-expanded={expandedTask === task.TaskID}
                        aria-controls={`task-details-${task.TaskID}`}
                      >
                        {expandedTask === task.TaskID ? "▲" : "▼"}
                      </Button>
                    </Card.Title>
                    <Collapse in={expandedTask === task.TaskID}>
                      <div id={`task-details-${task.TaskID}`}>
                        <Card.Text>
                          <strong>Due Date:</strong> {task.DueDate || "No due date"} <br />
                          <strong>Category:</strong> {task.Category} <br />
                          <strong>Description:</strong> {task.Description} <br />
                          <strong>Uploaded:</strong> {task.UploadedDocs ? "Yes" : "No"}
                        </Card.Text>

                        {/* Assignee Dropdown */}
                        <Form.Group className="mb-3">
                          <Form.Label>Assignee</Form.Label>
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
                        </Form.Group>

                        {/* Assignor Dropdown */}
                        <Form.Group className="mb-3">
                          <Form.Label>Assignor</Form.Label>
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
                        </Form.Group>

                        {/* Status Dropdown */}
                        <Form.Group className="mb-3">
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            name="Status"
                            value={task.Status || "Pending"}
                            onChange={(e) => handleChange(e, task.TaskID)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Assigned">Assigned</option>
                          </Form.Select>
                        </Form.Group>

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between mt-3">
                          <Button variant="info" href={`/task/${task.TaskID}`}>
                            Read
                          </Button>
                          <Button variant="warning" href={`/edit-task/${task.TaskID}`}>
                            Update
                          </Button>
                          <Button variant="danger" onClick={() => handleDelete(task.TaskID)}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Collapse>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center">
              <p>No tasks available</p>
            </div>
          )}
        </Row>
      )}
    </Container>
  );
};

export default AssignTasksMonitoring;
