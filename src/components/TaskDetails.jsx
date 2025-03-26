import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner, Alert, Card } from "react-bootstrap";

const TaskDetailsModal = ({ show, onHide, taskID, category }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      const fetchReadTask = async () => {
        try {
          const response = await fetch(`https://localhost:44346/api/tasks/details/${taskID}/${category}`);
          if (!response.ok) {
            throw new Error("Failed to fetch task details");
          }
          const data = await response.json();
          if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Task not found or empty response.");
          }
          setTask(data[0]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchReadTask();
    }
  }, [show, taskID, category]);

  const formattedDueDate = task?.DueDate
    ? new Date(task.DueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No due date";

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p>Loading task details...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Card>
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
              <h3 className="text-center">{task?.Title ?? "N/A"}</h3>
              <p className="text-center text-muted">{task?.Category ?? "Uncategorized"}</p>
              <hr />
              <p>
                <strong>Due Date:</strong> {formattedDueDate}
              </p>
              <p>
                <strong>Category:</strong> {task?.Category ?? "No category available"}
              </p>
              <p>
                <strong>Description:</strong> {task?.Description ?? "No description available"}
              </p>
            </Card.Body>
          </Card>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDetailsModal;
