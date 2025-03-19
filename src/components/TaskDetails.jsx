import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap";

const ReadTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadTask = async () => {
      try {
        console.log(`Fetching Task: ID=${id}`);

        const response = await fetch(`https://localhost:44346/api/tasks/details/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch task details (HTTP ${response.status})`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        if (!data || (Array.isArray(data) && data.length === 0)) {
          throw new Error("Task not found or empty response.");
        }

        // Handle case where API response is an object instead of an array
        const taskData = Array.isArray(data) ? data[0] : data;
        setTask(taskData);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchReadTask();
  }, [id]);

  useEffect(() => {
    console.log("Updated Task State:", task);
  }, [task]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading task details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          <p>Error: {error}</p>
        </Alert>
      </Container>
    );
  }

  if (!task) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          <p>No task details found.</p>
        </Alert>
      </Container>
    );
  }

  // Format Due Date
  const formattedDueDate = task.DueDate
    ? new Date(task.DueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No due date";

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="task-details-card shadow-sm">
            <Card.Body>
              <div className="text-center mb-3">
                <Card.Img
                  variant="top"
                  src={task.ImageUrl || "https://i.pinimg.com/736x/bb/e7/51/bbe751a2160a413de436abafeebcf4ee.jpg"}
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                  alt="Task"
                />
              </div>
              <h3 className="text-center">{task.Title ?? "N/A"}</h3>
              <p className="text-center text-muted">{task.Category ?? "Uncategorized"}</p>
              <hr />
              <p>
                <strong>Due Date:</strong> {formattedDueDate}
              </p>
              <p>
                <strong>Description:</strong> {task.Description ?? "No description available"}
              </p>
              <p>
                <strong>Status:</strong> {task.Status ?? "Pending"}
              </p>
              <div className="text-center mt-3">
                <Button variant="secondary" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReadTask;
