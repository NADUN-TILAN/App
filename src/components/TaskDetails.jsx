import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner } from "react-bootstrap";

const TaskDetails = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch task details by ID
    fetch(`https://localhost:44346/api/tasks/details/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch task details");
        }
        return res.json();
      })
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Container className="mt-4 text-danger text-center">Error: {error}</Container>;
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h3>Task Details</h3>
        </Card.Header>
        <Card.Body>
          <p><strong>Title:</strong> {task.Title}</p>
          <p><strong>Due Date:</strong> {task.DueDate || "No due date"}</p>
          <p><strong>Category:</strong> {task.Category}</p>
          <p><strong>Description:</strong> {task.Description}</p>
          <p><strong>Status:</strong> {task.Status || "Pending"}</p>
          <Button variant="secondary" onClick={() => navigate(-1)}>Go Back</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TaskDetails;
