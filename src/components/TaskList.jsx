import React, { useEffect, useState } from "react";
import { Table, Button, Container, Row, Col, Alert, Modal } from "react-bootstrap"; // Added Modal
import { useNavigate } from "react-router-dom";
import TaskDetailsModal from "./TaskDetails";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal state for delete confirmation
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("https://localhost:44346/api/tasks/informations");

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      console.log("Fetched tasks:", data);

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No tasks found or empty response.");
      }

      // Ensure TaskID is valid and fallback to a unique identifier if necessary
      const tasksWithValidIDs = data.map((task, index) => ({
        ...task,
        TaskID: task.TaskID || index + 1, // Use index as fallback if TaskID is missing or zero
      }));

      setTasks(tasksWithValidIDs);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        const response = await fetch(
          `https://localhost:44346/api/tasks/details/${selectedTask.TaskID}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(`Error deleting task: ${errorMsg}`);
        }

        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.TaskID !== selectedTask.TaskID)
        );
        setShowDeleteModal(false); // Close modal after successful deletion
      } catch (error) {
        console.error("Error:", error);
        setError("Something went wrong while deleting the task.");
      }
    }
  };

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  const handleViewTask = (taskID, category) => {
    setSelectedTask({ taskID, category });
    setShowModal(true);
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
            tasks.map((task, index) => {
              console.log("Task object:", task); // Debugging log
              return (
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
                      onClick={() => handleViewTask(task.TaskID, task.Category)}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => navigate(`/edit-task/${task.TaskID}`)} // Updated Edit button
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => openDeleteModal(task)} // Open modal
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {selectedTask && (
        <TaskDetailsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          taskID={selectedTask.taskID}
          category={selectedTask.category}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the task{" "}
          <strong>{selectedTask?.Title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TaskList;
