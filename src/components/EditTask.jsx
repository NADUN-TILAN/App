import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

const EditTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        console.log(`Fetching Task: ID=${id}`);

        const response = await fetch(`https://localhost:44346/api/tasks/details/${id}`);
        if (!response.ok) throw new Error("Failed to fetch task details");

        const data = await response.json();
        console.log("API Response Data:", data);

        if (!data || (Array.isArray(data) && data.length === 0)) {
          throw new Error("Task not found or empty response.");
        }

        setTask(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!task) {
      setError("Task data is not loaded yet!");
      return;
    }

    try {
      const response = await fetch(`https://localhost:44346/api/tasks/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error("Failed to update task");

      setSuccess(true);
      setTimeout(() => navigate("/task-list"), 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!task) return <Alert variant="warning">No task data found.</Alert>;

  return (
    <Container className="mt-4">
      <h2>Edit Task</h2>
      {success && <Alert variant="success">Task updated successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="Title"
            value={task.Title || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="DueDate"
            value={task.DueDate ? new Date(task.DueDate).toISOString().split("T")[0] : ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="Category"
            value={task.Category || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="Description"
            value={task.Description || ""}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Task
        </Button>
      </Form>
    </Container>
  );
};

export default EditTask;
